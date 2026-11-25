const SCENES = Object.assign({}, EPISODE1_SCENES, EPISODE2_PART1_SCENES, EPISODE2_PART2_SCENES);

// ---- Visible life tiers (the numbers stay hidden inside the engine) ----
const CASH_LABELS = { low: "Brokie", mid: "Good Enough", high: "Stacked" };
const GRADE_LABELS = { low: "Retard", mid: "Good Enough", high: "Nerd" };

function cashTier() {
  if (state.cash < 60) return CASH_LABELS.low;
  if (state.cash >= 220) return CASH_LABELS.high;
  return CASH_LABELS.mid;
}

function gradeTier() {
  const g = state.grades;
  if (g === "C" || g === "B-") return GRADE_LABELS.low;
  if (g === "A-" || g === "A") return GRADE_LABELS.high;
  return GRADE_LABELS.mid;
}

// ---- Opening: profile + Chloe intro ----
SCENES.setup_profile = {
  id: "setup_profile",
  chapter: "CHAPTER I · PROLOGUE",
  title: "Reader Profile",
  presentNPCs: [],
  render: () => ({
    text: [
      "Configure your profile. Your inner psychology stays hidden—only your Cash and Grades stay visible as the semester unfolds."
    ],
    choices: []
  }),
  afterRender: (deck) => {
    const wrap = document.createElement("div");
    wrap.className = "setup-form";

    const l1 = document.createElement("label");
    l1.htmlFor = "inp-name";
    l1.textContent = "First Name";
    const name = document.createElement("input");
    name.type = "text";
    name.id = "inp-name";
    name.maxLength = 20;
    name.value = state.playerName || "Shane";

    const l2 = document.createElement("label");
    l2.htmlFor = "inp-skin";
    l2.textContent = "Complexion";
    const sel = document.createElement("select");
    sel.id = "inp-skin";
    ["Dark-skinned", "Brown-skinned", "Light-skinned", "Olive-toned", "Fair-skinned"].forEach((s) => {
      const o = document.createElement("option");
      o.value = s;
      o.textContent = s;
      sel.appendChild(o);
    });

    const go = document.createElement("button");
    go.type = "button";
    go.className = "choice-btn";
    go.textContent = "Continue →";
    go.addEventListener("click", () => {
      state.playerName = name.value.trim() || "Shane";
      state.playerSkin = sel.value;
      goToScene("chloe_intro");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    [l1, name, l2, sel, go].forEach((el) => wrap.appendChild(el));
    deck.appendChild(wrap);
  }
};

SCENES.chloe_intro = {
  id: "chloe_intro",
  chapter: "CHAPTER I · PROLOGUE",
  title: "Meet Chloe",
  presentNPCs: [],
  render: () => ({
    text: [
      "Welcome, " + (state.playerName || "Shane") + ". You are a " + (state.playerSkin || "dark-skinned").toLowerCase() + " fresher about to walk onto this campus.",
      "Nineteen and stepping onto campus for her first week as a college fresher, Chloe Reed carries a natural girl-next-door look that she deliberately pushes toward a baddie aesthetic—golden-blonde hair, a leather jacket, gold hoops, manicured nails, and her phone permanently in hand.",
      "CHLOE (19) — Witty, socially active, and fluent in acting completely unbothered. Behind the detached, phone-scrolling front, she didn't even choose this degree—she's only here to satisfy her parents' high expectations while hiding a real creative passion and quiet anxiety underneath the sarcasm.",
      "She has zero patience for fake energy, reads people faster than they expect, and only lets her guard down around someone who feels real—and keeps her guessing.",
      "Before Day One begins, four quick instincts will quietly calibrate how you carry yourself when you step onto campus."
    ],
    choices: [
      {
        label: "Begin Chapter One: Episode One →",
        action: () => {
          state.profileDone = true;
          goToScene("warmup_1");
        }
      }
    ]
  })
};

// ---- HUD ----
function renderHUD() {
  document.getElementById("hud-social-read").textContent = computeSocialRead(state);
  document.getElementById("hud-cash").textContent = cashTier();
  document.getElementById("hud-grades").textContent = gradeTier();
  const unread = getTotalUnreadDMs();
  const badge = document.getElementById("dm-unread-badge");
  badge.textContent = unread;
  badge.classList.toggle("visible", unread > 0);
}

// ---- Scene runner ----
function goToScene(sceneId) {
  // Every new run starts with the profile + intro
  if (sceneId === "warmup_1" && !state.profileDone) sceneId = "setup_profile";

  const scene = SCENES[sceneId];
  if (!scene) { console.error("Missing scene:", sceneId); return; }

  state.sceneId = sceneId;
  if (sceneId.startsWith("ep2_")) state.episode = 2;
  state.presentNPCs = Array.isArray(scene.presentNPCs) ? [...scene.presentNPCs] : [];

  const rendered = scene.render();

  document.getElementById("scene-chapter").textContent = scene.chapter || "CHAPTER I";
  document.getElementById("scene-title").textContent = scene.title || "Meet Chloe";

  const beatEl = document.getElementById("beat-indicator");
  if (state.activeArc) {
    beatEl.style.display = "inline-block";
    beatEl.textContent = "Scene Depth · Beat " + Math.min(state.activeArc.beatIndex, state.activeArc.minBeats) + " of " + state.activeArc.minBeats;
  } else {
    beatEl.style.display = "none";
  }

  let lines = rendered.text || [];
  if (sceneId === "ep2_finale_dossier") {
    lines = lines.map((t) =>
      t.replace(/CASH: \$\d+/, "CASH: " + cashTier())
       .replace(/GRADES: [ABC][+-]?/, "GRADES: " + gradeTier())
    );
  }

  const bodyEl = document.getElementById("narrative-body");
  bodyEl.innerHTML = "";
  lines.forEach((t) => {
    const p = document.createElement("p");
    p.textContent = t;
    bodyEl.appendChild(p);
  });

  const choicesEl = document.getElementById("choices-deck");
  choicesEl.innerHTML = "";
  (rendered.choices || []).forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = c.label;
    btn.addEventListener("click", () => {
      c.action();
      renderHUD();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    choicesEl.appendChild(btn);
  });
  if (typeof scene.afterRender === "function") scene.afterRender(choicesEl);

  renderHUD();
}

// ---- Messages drawer ----
function renderCorrespondenceDrawer() {
  const container = document.getElementById("dm-threads-container");
  container.innerHTML = "";
  const threads = Object.values(state.dmThreads);
  if (!threads.length) {
    const p = document.createElement("p");
    p.style.color = "#9a9a9a";
    p.textContent = "No campus messages yet. Keep moving through the day.";
    container.appendChild(p);
    return;
  }
  threads.forEach((thread) => {
    const card = document.createElement("div");
    card.className = "dm-thread";
    const sender = document.createElement("div");
    sender.className = "dm-sender";
    sender.textContent = thread.name + " " + (thread.handle || "");
    card.appendChild(sender);

    thread.messages.forEach((m) => {
      const b = document.createElement("div");
      b.className = "dm-bubble" + (m.isPlayer ? " player" : "");
      b.textContent = m.text;
      card.appendChild(b);
    });

    if (Array.isArray(thread.replyOptions)) {
      const list = document.createElement("div");
      list.className = "dm-reply-list";
      thread.replyOptions.forEach((opt, i) => {
        const rb = document.createElement("button");
        rb.type = "button";
        rb.className = "dm-reply-btn";
        rb.textContent = opt.playerText;
        rb.addEventListener("click", () => {
          thread.unread = 0;
          replyToDM(thread.npcId, i);
        });
        list.appendChild(rb);
      });
      card.appendChild(list);
    }
    container.appendChild(card);
  });
}

document.getElementById("btn-open-dm").addEventListener("click", () => {
  document.getElementById("dm-overlay").classList.add("open");
  Object.values(state.dmThreads).forEach((t) => (t.unread = 0));
  renderCorrespondenceDrawer();
  renderHUD();
});
document.getElementById("btn-close-dm").addEventListener("click", () => {
  document.getElementById("dm-overlay").classList.remove("open");
});
document.getElementById("dm-overlay").addEventListener("click", (e) => {
  if (e.target.id === "dm-overlay") e.target.classList.remove("open");
});
document.getElementById("btn-restart").addEventListener("click", () => {
  state = INITIAL_STATE();
  renderHUD();
  goToScene("warmup_1");
});

goToScene("warmup_1");
// END OF game.js
  
