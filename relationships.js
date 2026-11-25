// ===== relationships.js — load LAST =====
const PUBLIC_WITNESSES = ["chloe","maya","brandy","mandy","laura","tanya"];
const PRIVATE_POOL = ["maya","brandy","mandy","laura"];

function rel() {
  const m = state.mem;
  m.partners = m.partners || [];
  m.nateDirt = m.nateDirt || [];
  m.cheatExposure = m.cheatExposure || [];
  m.cheatSeen = m.cheatSeen || {};
  return m;
}
function girlName(g) {
  const c = CHARACTERS[g];
  return c ? c.name.split(" ")[0] : g.charAt(0).toUpperCase() + g.slice(1);
}

// ---- Partners (single source of truth) ----
function syncLegacyPartners() {
  const m = rel();
  if (m.isChloeBoyfriend === true || m.chloeGirlfriend) addPartner("chloe");
  if (m.girlfriend) addPartner(m.girlfriend);
}
function addPartner(g) {
  const m = rel();
  if (m.partners.includes(g)) return;
  const others = [...m.partners];
  m.partners.push(g);
  if (others.length) runCheatCheck(g, { betrayed: others }); // 2nd partner = cheating on the first
}
function dropPartner(g) {
  const m = rel();
  m.partners = m.partners.filter((p) => p !== g);
  if (g === "chloe") { m.isChloeBoyfriend = false; m.chloeGirlfriend = false; }
  if (m.girlfriend === g) m.girlfriend = null;
}
function partners() { syncLegacyPartners(); return rel().partners; }
function isDating(g) { return partners().includes(g); }
function relStatusText() {
  const p = partners();
  if (!p.length) return "";
  return p.length === 1 ? "Taken — " + girlName(p[0]) : "Playing a dangerous game";
}

// Fix the Ep1/Ep2 flag mismatches
function ep2IsChloeGirlfriend() { return isDating("chloe"); }
function ep2SleptWithChloe() {
  const m = state.mem;
  return !!(m.sleptWithChloe || ["chloe_dorm_sfw", "chloe_boyfriend_accepted", "chloe_boyfriend_refused"].includes(m.night1Ending));
}
function ep2RejectedChloeBoyfriend() {
  return state.mem.night1Ending === "chloe_boyfriend_refused" || !!state.mem.rejectedChloeBoyfriend;
}

// ---- Nate ----
function syncNate() {
  const r = state.mem.councilRole;
  if (r === "fresher_liaison" || r === "policy_coordinator") rel().nateWatching = true;
}

// ---- Cheating check ----
function runCheatCheck(girl, opts = {}) {
  const m = rel();
  const betrayed = opts.betrayed || m.partners.filter((p) => p !== girl);
  if (!betrayed.length) return null;
  if (m.nateWatching) m.nateDirt.push({ girl, scene: state.sceneId });

  let seen = [];
  if (opts.pub) {
    seen = (state.presentNPCs || []).filter((n) => n !== girl && PUBLIC_WITNESSES.includes(n));
  } else if (Math.random() * 100 >= state.luck) {   // luck 50 = 50% unseen; tune here
    const pool = PRIVATE_POOL.filter((n) => n !== girl && !betrayed.includes(n) && !(opts.exclude || []).includes(n));
    if (pool.length) seen = [pool[Math.floor(Math.random() * pool.length)]];
  }
  const direct = [], snitches = [], liars = [];
  seen.forEach((w) => {
    if (betrayed.includes(w)) direct.push(w);
    else if (w === "maya" || !isGirlHot(w, state)) snitches.push(w);  // Maya always tells
    else liars.push(w);                                               // HOT girls cover for you
  });
  if (snitches.length || direct.length) {
    m.cheatExposure.push({ girl, betrayed, by: snitches[0] || direct[0] });
    if (snitches.length || direct.some((d) => d !== "chloe")) m.cheatPending = true;
  }
  return { seen, direct, snitches, liars };
}

// Hangout kisses: public, so everyone present sees
const _kiss = registerHangoutKiss;
registerHangoutKiss = function (girlId) {
  const base = _kiss(girlId);
  syncLegacyPartners();
  if (girlId !== "chloe" && rel().partners.length && !rel().partners.includes(girlId)) {
    const r = runCheatCheck(girlId, { pub: true });
    if (r && r.direct.includes("chloe") && !base && !state.mem.chloeMeltdownTriggered) {
      state.mem.chloeMeltdownTriggered = true;
      return state.chloeMode; // reuses your meltdown scene
    }
  }
  return base;
};

// Private intimacy events, detected from the memory tags your scenes already write
const CHEAT_TAGS = [
  { match: /^ep2_sleepover_(threesome|foursome|fivesome)$/, run: () => {
      const g = state.mem.sleepoverGroup || [];
      runCheatCheck(g[0], { betrayed: rel().partners.filter((p) => !g.includes(p)), exclude: g });
  }},
  { match: /^ep2_vip_ally_dorm_sfw$/, run: () => runCheatCheck("ally") },
  { match: /^ep2_vip_ended_with_tanya$/, run: () => runCheatCheck("tanya") },
  { match: /^ep2_chloe_(first|gf)_sfw$/, run: () => runCheatCheck("chloe") }
];
function scanCheatTags() {
  const m = rel();
  state.memoryLog.forEach((e) => CHEAT_TAGS.forEach((t) => {
    if (m.cheatSeen[e.tag] || !t.match.test(e.tag)) return;
    m.cheatSeen[e.tag] = true;
    t.run();
  }));
}

// ---- Scene routing ----
const _go = goToScene;
goToScene = function (id) {
  syncLegacyPartners(); syncNate();
  const m = rel();
  if (id === "ep2_finale_dossier" && m.cheatPending) id = "ep2_cheat_confront";
  if (id === "ep2_vip_alone" && state.activeArc && state.activeArc.beatIndex === 7 &&
      m.nateWatching && m.partners.length && !m.nateExposed) id = "ep2_vip_alone_exposed";
  _go(id);
  scanCheatTags();
  renderHUD();
};

// ---- HUD ----
const _hud = renderHUD;
renderHUD = function () {
  _hud();
  const stats = document.querySelector(".hud-stats");
  if (!stats) return;
  let el = document.getElementById("hud-rel");
  if (!el) {
    const item = document.createElement("div");
    item.className = "hud-item";
    item.id = "hud-rel-item";
    item.innerHTML = '<span class="hud-label">Status</span><span class="hud-value" id="hud-rel"></span>';
    stats.appendChild(item);
    el = document.getElementById("hud-rel");
  }
  const t = relStatusText();
  el.textContent = t;
  document.getElementById("hud-rel-item").style.display = t ? "" : "none";
};

// ---- Dossier line ----
const _dos = SCENES.ep2_finale_dossier.render;
SCENES.ep2_finale_dossier.render = function () {
  const r = _dos.apply(this, arguments);
  r.text.splice(1, 0, "RELATIONSHIP STATUS: " + (relStatusText() || "Single"));
  return r;
};

// ---- Scene: she found out ----
function hurt(g, c, t) { if (g === "chloe") adjustChloeMatrix(c, t); else state.rep[g] = (state.rep[g] || 0) + c; }

SCENES.ep2_cheat_confront = {
  id: "ep2_cheat_confront", chapter: "CHAPTER I · END OF EPISODE II", title: "Word Gets Around",
  presentNPCs: [],
  render: () => {
    const m = rel();
    const e = m.cheatExposure[0] || {};
    const victim = (e.betrayed && e.betrayed[0]) || "chloe";
    const mayaSaw = e.by === "maya";
    state.presentNPCs = [victim];
    const finish = (msg) => {
      m.confrontResult = msg; m.cheatPending = false; m.cheatExposure = []; state.activeArc = null;
      goToScene("ep2_cheat_result");
    };
    return {
      text: [
        mayaSaw
          ? "Maya saw you with " + girlName(e.girl) + " and never considered keeping it from her best friend. By morning, " + girlName(victim) + " knows."
          : girlName(e.by) + " saw you with " + girlName(e.girl) + " and wasn't about to cover for you. By morning, " + girlName(victim) + " knows.",
        girlName(victim) + " is waiting outside your door."
      ],
      choices: [
        { label: "Own it. No excuses.", action: () => {
            const stays = victim === "chloe" ? state.comfort >= 20 : (state.rep[victim] || 0) >= 12;
            if (stays) { hurt(victim, -4, 0); finish(girlName(victim) + " is furious, but your honesty buys you a second chance."); }
            else { dropPartner(victim); hurt(victim, -6, -4); finish(girlName(victim) + " listens to every word, then ends it."); }
        }},
        { label: "Lie to her face.", action: () => {
            if (!mayaSaw && state.control >= 58) finish(girlName(victim) + " wants to believe you, so she does. For now.");
            else { dropPartner(victim); hurt(victim, -8, -6); state.aura = clamp(state.aura - 4, 0, 100); state.mem.bitter_meltdown = true;
                   finish("The lie falls apart in seconds. " + girlName(victim) + " is done."); }
        }},
        { label: "End it before she can.", action: () => {
            dropPartner(victim); state.control = clamp(state.control + 3, 0, 100);
            finish("You cut it first. It's cleaner, but it's still a loss.");
        }}
      ]
    };
  }
};
SCENES.ep2_cheat_result = {
  id: "ep2_cheat_result", chapter: "CHAPTER I · END OF EPISODE II", title: "Fallout", presentNPCs: [],
  render: () => ({
    text: [rel().confrontResult || "The night ends."],
    choices: [{ label: "Unlock Chapter One Finale Dossier →", action: () => goToScene("ep2_finale_dossier") }]
  })
};

// ---- Scene: Nate plays his dirt at the VIP party (replaces beat 7 of the solo route) ----
SCENES.ep2_vip_alone_exposed = {
  id: "ep2_vip_alone_exposed", chapter: "CHAPTER I · BONUS CHAPTER", title: "VIP Mixer — Nate's Folder",
  presentNPCs: ["tanya", "nate"],
  render: () => {
    const m = rel();
    const hasDirt = m.nateDirt.length > 0;
    const done = (msg) => { m.nateExposed = true; m.vipExposedResult = msg; state.activeArc = null; goToScene("ep2_night2_close"); };
    return {
      text: [
        "Before Tanya can reach you, Nate steps in with his phone raised. \"Ask the new liaison who he went home with. Quick question: does " + girlName(m.partners[0]) + " know he's here?\"",
        hasDirt ? "He scrolls through screenshots. Council-role access has let him watch you all week." : "He has no proof, only a smirk and a name.",
        "Tanya's smile disappears. She turns to you and waits."
      ],
      choices: [
        { label: "Own it, plainly.", action: () => { state.rep.tanya -= 2; state.aura = clamp(state.aura - 2, 0, 100);
            done("Tanya respects the honesty, not the situation. She leaves you at the rail."); } },
        { label: "Deny it.", action: () => {
            if (!hasDirt && state.control >= 58) { state.rep.tanya += 4; state.rep.nate -= 4; done("You hold her gaze. Without proof, Nate looks like a jealous liar."); }
            else { state.rep.tanya -= 8; state.aura = clamp(state.aura - 6, 0, 100); done("The screenshots end the denial. Tanya walks away."); }
        }},
        { label: "Turn it on Nate. Ask how he got that footage.", action: () => {
            if (state.mastery >= 56) { state.rep.nate -= 6; state.rep.tanya += 3; done("Tanya turns on Nate. Spying on a council member is worse than anything he's accusing you of."); }
            else { state.aura = clamp(state.aura - 4, 0, 100); done("It sounds like a deflection, and everyone hears it that way."); }
        }}
      ]
    };
  }
};
const _nightClose = SCENES.ep2_night2_close.render;
SCENES.ep2_night2_close.render = function () {
  const r = _nightClose.apply(this, arguments);
  if (rel().vipExposedResult) { r.text.unshift(rel().vipExposedResult); rel().vipExposedResult = null; }
  return r;
};
// END OF relationships.js
