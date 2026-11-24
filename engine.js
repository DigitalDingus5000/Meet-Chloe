// ============================================================================
// MEET CHLOE — CHAPTER ONE: CORE GAMEPLAY, MEMORY & MATRIX ENGINE (engine.js)
// Depends on: characters.js (CHARACTERS, recordWitnessedTone, knowsLaura, isGirlHot, getGirlStatus)
// ============================================================================

const INITIAL_STATE = () => ({
  episode: 1,
  sceneId: "warmup_1",
  presentNPCs: [], // Anti-omnipresence: strictly tracks who is physically in the room

  // Visible Life Tiers (Shown in HUD)
  cash: 120,
  grades: "B", // C, B-, B, B+, A-, A

  // Hidden Psychological Stats (Strictly hidden until Episode 2 Finale Dossier)
  aura: 50,
  mastery: 50,
  control: 50,
  outlook: 50,
  luck: 50,

  // Exact Original Chloe Comfort & Tension Matrix (Hidden until Finale Dossier)
  comfort: 15,
  tension: 10,
  chloeMode: "CONTROL", // tension >= 24 => PURSUE, else CONTROL

  // 4 Ambiguous Opening Calibration Questions Flag
  warmupComplete: false,

  // Four-Tone Matrix Tracking
  toneCounts: {
    complimentary: 0,
    factual: 0,
    tease: 0,
    bully: 0
  },
  lastTone: null,
  toneStreak: 0,

  // Scene-Scoped Witness Logs (Anti-Omnipresence)
  witnessedTones: {},

  // Structured Choice-Memory System (Characters remember what they witnessed)
  memoryLog: [], // Array of { id, tag, npcId, text, episode, sceneId, witnesses: [], sharedWith: [] }

  // In-Scene "Get to Know You" Beat Runner (Minimum 5 beats per in-scene character)
  activeArc: null, // { npcId, beatIndex, minBeats: 5, returnSceneId }
  completedArcs: {}, // { "ep1_chloe_lunch": 5, ... }

  // Individual NPC Reputations
  rep: {
    chloe: 0,
    maya: 5,
    laura: 0,
    brandy: 0,
    mandy: 0,
    tanya: 0,
    brandon: 0,
    rob: 0,
    malik: 0,
    elliot: -2,
    nate: -2,
    max: 0
  },

  // Narrative Continuity Flags
  mem: {
    knowsLaura: false,
    helpedMaya: false,
    satWithChloe: false,
    wonHideAndSeek: false,
    brandonBond: false,
    hangoutGirlsKissed: [],
    chloeMeltdownTriggered: false,
    chloeMeltdownType: null, // "CONTROL" or "PURSUE"
    assKisserPenalty: false,
    seriousPenalty: false,
    canTakeSeriousPenalty: false,
    bullyPenalty: false
  },

  // Phone Correspondence / DM Log System
  dmThreads: {}, // Keyed by npcId: { npcId, name, handle, unread, messages: [{ sender, text, time, isPlayer }] }
  activeDMThread: null,

  // Active Consequence Timer
  timerHandle: null,
  timerRemaining: 0
});

let state = INITIAL_STATE();

// ============================================================================
// 1. EXACT ORIGINAL CHLOE MATRIX (NEVER ALTERED)
// ============================================================================
function updateMatrix() {
  state.comfort = clamp(state.comfort, 0, 50);
  state.tension = clamp(state.tension, 0, 50);
  state.chloeMode = state.tension >= 24 ? "PURSUE" : "CONTROL";
}

function adjustChloeMatrix(dComfort = 0, dTension = 0) {
  state.comfort += dComfort;
  state.tension += dTension;
  updateMatrix();
}

// ============================================================================
// 2. AMBIGUOUS OPENING CALIBRATION HANDLER (QUESTIONS 1–4)
// ============================================================================
function applyWarmup(deltas = {}) {
  if (deltas.aura) state.aura = clamp(state.aura + deltas.aura, 0, 100);
  if (deltas.mastery) state.mastery = clamp(state.mastery + deltas.mastery, 0, 100);
  if (deltas.control) state.control = clamp(state.control + deltas.control, 0, 100);
  if (deltas.outlook) state.outlook = clamp(state.outlook + deltas.outlook, 0, 100);
  if (deltas.luck) state.luck = clamp(state.luck + deltas.luck, 0, 100);
  if (deltas.cash) state.cash = Math.max(0, state.cash + deltas.cash);
  renderHUD();
}

// ============================================================================
// 3. IN-SCENE "GET TO KNOW YOU" BEAT ENGINE (MIN 5 BEATS PER IN-SCENE PERSON)
// ============================================================================
function getRelationshipTier(npcId) {
  if (npcId === "chloe") {
    if (state.chloeMode === "PURSUE" && state.comfort >= 20) return "high_chemistry";
    if (state.chloeMode === "PURSUE") return "pursue_guarded";
    if (state.comfort >= 22) return "comfort_warm";
    return "control_guarded";
  }
  const score = state.rep[npcId] || 0;
  if (score >= 12) return "warm";
  if (score <= -5) return "guarded";
  return "neutral";
}

function startGetToKnowYouArc(arcKey, npcId, returnSceneId, minBeats = 5) {
  state.activeArc = {
    arcKey,
    npcId,
    beatIndex: 1,
    minBeats: Math.max(5, minBeats),
    returnSceneId,
    tier: getRelationshipTier(npcId)
  };
  return state.activeArc;
}

function advanceGetToKnowYouBeat() {
  if (!state.activeArc) return { done: true, beatIndex: 0 };
  state.activeArc.beatIndex += 1;
  state.activeArc.tier = getRelationshipTier(state.activeArc.npcId);

  if (state.activeArc.beatIndex > state.activeArc.minBeats) {
    const finished = { ...state.activeArc };
    state.completedArcs[finished.arcKey] = finished.beatIndex - 1;
    state.activeArc = null;
    return { done: true, returnSceneId: finished.returnSceneId };
  }
  return {
    done: false,
    beatIndex: state.activeArc.beatIndex,
    tier: state.activeArc.tier
  };
}

// ============================================================================
// 4. STRUCTURED CHOICE-MEMORY TRACKING SYSTEM (ANTI-OMNIPRESENCE)
// ============================================================================
function recordChoiceMemory(tag, primaryNpcId, text, extraWitnesses = []) {
  const witnesses = Array.from(
    new Set([...(state.presentNPCs || []), primaryNpcId, ...extraWitnesses].filter(Boolean))
  );

  // Prevent duplicate identical tag spam in same scene
  const existing = state.memoryLog.find((m) => m.tag === tag && m.sceneId === state.sceneId);
  if (existing) {
    existing.text = text;
    existing.witnesses = Array.from(new Set([...existing.witnesses, ...witnesses]));
    return existing;
  }

  const entry = {
    id: "mem_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    tag,
    npcId: primaryNpcId,
    text,
    episode: state.episode,
    sceneId: state.sceneId,
    witnesses,
    sharedWith: []
  };
  state.memoryLog.push(entry);
  return entry;
}

// Checks whether a specific NPC actually knows/remembers a given choice tag
function npcRemembers(npcId, tag) {
  return state.memoryLog.some(
    (m) =>
      m.tag === tag &&
      (m.witnesses.includes(npcId) || m.sharedWith.includes(npcId))
  );
}

// Allows a witness to explicitly tell another NPC off-screen (only when narratively triggered)
function shareMemoryWithNPC(tag, targetNpcId) {
  state.memoryLog.forEach((m) => {
    if (m.tag === tag && !m.sharedWith.includes(targetNpcId)) {
      m.sharedWith.push(targetNpcId);
    }
  });
}

function getMemoriesKnownBy(npcId) {
  return state.memoryLog.filter(
    (m) => m.witnesses.includes(npcId) || m.sharedWith.includes(npcId)
  );
}

// ============================================================================
// 5. 70/30 FOUR-TONE MATRIX ENGINE + ANTI-OMNIPRESENCE WITNESSING
// ============================================================================
function applyTone(tone, options = {}) {
  const validTones = ["complimentary", "factual", "tease", "bully"];
  if (!validTones.includes(tone)) return;

  if (state.lastTone === tone) {
    state.toneStreak += 1;
  } else {
    state.lastTone = tone;
    state.toneStreak = 1;
  }

  state.toneCounts[tone] = (state.toneCounts[tone] || 0) + 1;

  // Anti-omnipresence: ONLY NPCs physically in state.presentNPCs log this tone
  recordWitnessedTone(state, tone);

  const chloePresent = state.presentNPCs.includes("chloe") || Boolean(options.chloeDirect);

  if (tone === "tease") {
    if (state.toneStreak === 1) {
      if (chloePresent) adjustChloeMatrix(1, 3);
      state.aura = clamp(state.aura + 2, 0, 100);
    } else if (state.toneStreak === 2) {
      if (chloePresent) adjustChloeMatrix(0, 1);
      state.aura = clamp(state.aura + 1, 0, 100);
    } else {
      state.mem.canTakeSeriousPenalty = true;
      if (chloePresent) adjustChloeMatrix(-1, -3);
      state.control = clamp(state.control - 3, 0, 100);
      state.mastery = clamp(state.mastery - 2, 0, 100);
    }
  } else if (tone === "factual") {
    if (state.toneStreak === 1) {
      if (chloePresent) adjustChloeMatrix(1, 0);
      state.mastery = clamp(state.mastery + 3, 0, 100);
      state.control = clamp(state.control + 1, 0, 100);
    } else if (state.toneStreak === 2) {
      if (chloePresent) adjustChloeMatrix(0, -1);
      state.mastery = clamp(state.mastery + 2, 0, 100);
    } else {
      state.mem.seriousPenalty = true;
      if (chloePresent) adjustChloeMatrix(-3, -3);
      state.aura = clamp(state.aura - 2, 0, 100);
    }
  } else if (tone === "complimentary") {
    if (state.toneStreak === 1) {
      if (chloePresent) adjustChloeMatrix(4, -2);
      state.outlook = clamp(state.outlook + 2, 0, 100);
    } else if (state.toneStreak === 2) {
      if (chloePresent) adjustChloeMatrix(2, -3);
      state.aura = clamp(state.aura - 1, 0, 100);
    } else {
      state.mem.assKisserPenalty = true;
      if (chloePresent) adjustChloeMatrix(-4, -6);
      state.aura = clamp(state.aura - 4, 0, 100);
      state.control = clamp(state.control - 3, 0, 100);
    }
  } else if (tone === "bully") {
    if (state.toneStreak === 1) {
      if (chloePresent) adjustChloeMatrix(-5, 2);
      state.control = clamp(state.control + 2, 0, 100);
    } else if (state.toneStreak === 2) {
      if (chloePresent) adjustChloeMatrix(-6, -1);
      state.aura = clamp(state.aura - 2, 0, 100);
    } else {
      state.mem.bullyPenalty = true;
      if (chloePresent) adjustChloeMatrix(-8, -5);
      state.aura = clamp(state.aura - 4, 0, 100);
      state.outlook = clamp(state.outlook - 4, 0, 100);
    }
  }

  if (options.memoryTag && options.memoryText) {
    recordChoiceMemory(options.memoryTag, options.targetNpc || state.presentNPCs[0] || "chloe", options.memoryText);
  }

  renderHUD();
}

// ============================================================================
// 6. LIVE 12-STATE SOCIAL READ EVALUATOR (VISIBLE IN HUD)
// ============================================================================
function computeSocialRead(s = state) {
  const tc = s.toneCounts || { complimentary: 0, factual: 0, tease: 0, bully: 0 };
  const entries = [
    { key: "complimentary", count: tc.complimentary || 0 },
    { key: "tease", count: tc.tease || 0 },
    { key: "factual", count: tc.factual || 0 },
    { key: "bully", count: tc.bully || 0 }
  ];

  const maxCount = Math.max(...entries.map((e) => e.count));
  if (maxCount === 0) return "You are a nobody";

  const top = entries.filter((e) => e.count === maxCount).map((e) => e.key);
  if (top.length >= 3) return "You are a shapeshifter";

  if (top.length === 1) {
    switch (top[0]) {
      case "complimentary":
        return "Simp";
      case "tease":
        return "You are a such a tease";
      case "factual":
        return "Mr Tough Guy";
      case "bully":
        return "YOU BULLY";
    }
  }

  const has = (k) => top.includes(k);
  if (has("complimentary") && has("tease")) return "You pimping simp";
  if (has("complimentary") && has("factual")) return "Mr Pay for It";
  if (has("complimentary") && has("bully")) return "Red pilled";
  if (has("tease") && has("factual")) return "Daddy";
  if (has("tease") && has("bully")) return "Bad Boy";
  if (has("factual") && has("bully")) return "You are a pain in ass";

  return "You are a nobody";
}

// ============================================================================
// 7. MULTI-GIRL KISS MELTDOWN TRIGGER (CONTROL VS PURSUE BOX)
// ============================================================================
function registerHangoutKiss(girlId) {
  if (!state.mem.hangoutGirlsKissed.includes(girlId)) {
    state.mem.hangoutGirlsKissed.push(girlId);
  }
  const otherGirls = state.mem.hangoutGirlsKissed.filter((g) => g !== "chloe");
  const chloeWatching = state.presentNPCs.includes("chloe");

  if (
    chloeWatching &&
    otherGirls.length >= 2 &&
    state.comfort < CHARACTERS.chloe.matrixRules.meltdownComfortThreshold &&
    !state.mem.chloeMeltdownTriggered
  ) {
    state.mem.chloeMeltdownTriggered = true;
    state.mem.chloeMeltdownType = state.chloeMode; // "CONTROL" or "PURSUE"
    return state.chloeMode;
  }
  return null;
}

// ============================================================================
// 8. 1-IN-10 GLOBAL LUCK ENGINE (10 GOOD / 10 BAD EVENTS)
// ============================================================================
const LUCK_EVENTS = {
  good: [
    { text: "A crumpled $20 bill catches beneath your boot outside the lecture hall.", apply: (s) => { s.cash += 20; s.luck += 2; } },
    { text: "The lecturer drops a surprise hint about Friday's quiz right as you glance up.", apply: (s) => { s.mastery += 3; promoteGrade(s); } },
    { text: "Your phone battery stays at 14% through two back-to-back halls without dimming.", apply: (s) => { s.control += 2; } },
    { text: "A barista slides an extra espresso shot across the counter before closing.", apply: (s) => { s.aura += 2; s.outlook += 2; } },
    { text: "The corridor crowd parts cleanly just as the bell rings.", apply: (s) => { s.aura += 2; } },
    { text: "Someone left an untouched study guide on the back bench with clean margin notes.", apply: (s) => { s.mastery += 3; } },
    { text: "A sudden breeze catches your jacket cleanly as you step onto the quad.", apply: (s) => { s.aura += 3; } },
    { text: "The vending machine drops two cold bottles for the price of one.", apply: (s) => { s.cash += 5; s.outlook += 2; } },
    { text: "You catch a dropped pen mid-air before it hits the tile.", apply: (s) => { s.aura += 2; s.control += 2; } },
    { text: "Your seat happens to be the only one out of the afternoon glare.", apply: (s) => { s.control += 2; } }
  ],
  bad: [
    { text: "A loose floor tile splashes rainwater across your cuff.", apply: (s) => { s.aura -= 2; s.luck -= 2; } },
    { text: "Your pen leaks ink across the margin of your notes mid-sentence.", apply: (s) => { s.control -= 2; } },
    { text: "A $10 note slips out of your pocket somewhere between the stairs and the quad.", apply: (s) => { s.cash = Math.max(0, s.cash - 10); } },
    { text: "Your chair leg squeaks loud enough to turn two rows of heads.", apply: (s) => { s.aura -= 3; } },
    { text: "Campus Wi-Fi drops right as a message tries to send.", apply: (s) => { s.control -= 2; } },
    { text: "The vending machine swallows your bill and refuses to vend.", apply: (s) => { s.cash = Math.max(0, s.cash - 5); s.outlook -= 2; } },
    { text: "You misread the room number and have to double back down the corridor.", apply: (s) => { s.aura -= 2; } },
    { text: "A cold draft hits the back of your neck all through the lecture.", apply: (s) => { s.outlook -= 2; } },
    { text: "Your shoelace snaps right before you cross the courtyard.", apply: (s) => { s.aura -= 2; s.control -= 1; } },
    { text: "Someone bumps your shoulder in the doorway, knocking your notebook flat.", apply: (s) => { s.control -= 2; } }
  ]
};

function rollGlobalLuck() {
  if (Math.random() >= 0.1) return null; // Strict 1-in-10 chance
  const isGood = Math.random() * 100 < state.luck;
  const pool = isGood ? LUCK_EVENTS.good : LUCK_EVENTS.bad;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  pick.apply(state);
  return { type: isGood ? "FORTUNE" : "MISFORTUNE", text: pick.text };
}

// ============================================================================
// 9. PHONE CORRESPONDENCE / DM LOG SYSTEM
// ============================================================================
function pushDM(npcId, handle, text, replyOptions = null, timeLabel = "Now") {
  const charObj = CHARACTERS[npcId];
  const senderName = charObj ? charObj.name : npcId;

  if (!state.dmThreads[npcId]) {
    state.dmThreads[npcId] = {
      npcId,
      name: senderName,
      handle,
      unread: 0,
      messages: [],
      replyOptions: null
    };
  }

  const thread = state.dmThreads[npcId];
  thread.messages.push({
    sender: senderName,
    text,
    time: timeLabel,
    isPlayer: false
  });
  thread.unread += 1;
  if (replyOptions) {
    thread.replyOptions = replyOptions;
  }

  renderHUD();
  if (typeof renderCorrespondenceDrawer === "function") {
    renderCorrespondenceDrawer();
  }
}

function replyToDM(npcId, optionIndex) {
  const thread = state.dmThreads[npcId];
  if (!thread || !thread.replyOptions || !thread.replyOptions[optionIndex]) return;

  const chosen = thread.replyOptions[optionIndex];
  thread.messages.push({
    sender: "You",
    text: chosen.playerText,
    time: "Sent",
    isPlayer: true
  });
  thread.replyOptions = null;

  // Apply tone & memory strictly with this NPC as the recipient/witness
  const prevPresent = [...state.presentNPCs];
  state.presentNPCs = [npcId];
  if (chosen.tone) {
    applyTone(chosen.tone, {
      chloeDirect: npcId === "chloe",
      targetNpc: npcId,
      memoryTag: chosen.memoryTag,
      memoryText: chosen.memoryText
    });
  } else if (chosen.memoryTag && chosen.memoryText) {
    recordChoiceMemory(chosen.memoryTag, npcId, chosen.memoryText, [npcId]);
  }
  state.presentNPCs = prevPresent;

  if (chosen.npcReply) {
    thread.messages.push({
      sender: thread.name,
      text: chosen.npcReply,
      time: "Just now",
      isPlayer: false
    });
    thread.unread += 1;
  }

  if (typeof chosen.onComplete === "function") {
    chosen.onComplete();
  }

  renderHUD();
  if (typeof renderCorrespondenceDrawer === "function") {
    renderCorrespondenceDrawer();
  }
}

function getTotalUnreadDMs() {
  return Object.values(state.dmThreads).reduce((sum, t) => sum + (t.unread || 0), 0);
}

// ============================================================================
// 10. VISIBLE HUD, GRADES & TIMERS
// ============================================================================
function promoteGrade(s = state) {
  const ladder = ["C", "B-", "B", "B+", "A-", "A"];
  const idx = ladder.indexOf(s.grades);
  if (idx >= 0 && idx < ladder.length - 1) s.grades = ladder[idx + 1];
}

function demoteGrade(s = state) {
  const ladder = ["C", "B-", "B", "B+", "A-", "A"];
  const idx = ladder.indexOf(s.grades);
  if (idx > 0) s.grades = ladder[idx - 1];
}

function startConsequenceTimer(seconds, onExpire) {
  clearConsequenceTimer();
  state.timerRemaining = seconds;
  const bar = document.getElementById("consequence-timer-bar");
  const label = document.getElementById("consequence-timer-label");
  if (bar && label) {
    bar.style.display = "block";
    label.textContent = `DECISION WINDOW: ${state.timerRemaining}s`;
  }
  state.timerHandle = setInterval(() => {
    state.timerRemaining -= 1;
    if (label) label.textContent = `DECISION WINDOW: ${Math.max(0, state.timerRemaining)}s`;
    if (state.timerRemaining <= 0) {
      clearConsequenceTimer();
      if (typeof onExpire === "function") onExpire();
    }
  }, 1000);
}

function clearConsequenceTimer() {
  if (state.timerHandle) {
    clearInterval(state.timerHandle);
    state.timerHandle = null;
  }
  const bar = document.getElementById("consequence-timer-bar");
  if (bar) bar.style.display = "none";
}

function renderHUD() {
  const cashEl = document.getElementById("hud-cash");
  const gradesEl = document.getElementById("hud-grades");
  const readEl = document.getElementById("hud-social-read");
  const dmBadge = document.getElementById("hud-dm-count");

  if (cashEl) cashEl.textContent = `$${state.cash}`;
  if (gradesEl) gradesEl.textContent = state.grades;
  if (readEl) readEl.textContent = computeSocialRead(state);
  if (dmBadge) {
    const unread = getTotalUnreadDMs();
    dmBadge.textContent = unread > 0 ? `(${unread})` : "";
  }
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
