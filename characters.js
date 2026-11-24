// ============================================================================
// MEET CHLOE — CHAPTER ONE: CANONICAL CHARACTER BIBLE & WITNESS ENGINE (characters.js)
// Locked rules:
// 1. Exact canonical traits (Chloe, Maya girl-next-door, Brandon aspiring rapper w/ locs, etc.)
// 2. Anti-Omnipresence: NPCs ONLY track tones & actions in scenes where they are physically present.
// 3. Female NPC HOT/NOT evaluates strictly from personally witnessed tones + Aura.
// ============================================================================

const CHARACTERS = {
  chloe: {
    id: "chloe",
    name: "Chloe Reed",
    age: 19,
    role: "Lead / Fresher",
    appearance: "Golden-blonde college fresher with a girl-next-door foundation transitioning into a baddie aesthetic.",
    personality: "Masks academic anxiety and secret creative passions behind dry sarcasm, witty banter, and phone-scrolling.",
    matrixRules: {
      initialComfort: 15,
      initialTension: 10,
      pursueThreshold: 24, // tension >= 24 => PURSUE, else CONTROL
      meltdownComfortThreshold: 22 // kissing >1 girl in front of her when comfort < 22 triggers CONTROL vs PURSUE meltdown
    }
  },
  maya: {
    id: "maya",
    name: "Maya",
    role: "Chloe's Childhood Best Friend",
    appearance: "Soft-spoken, grounded girl-next-door aesthetic.",
    personality: "Loyal, observant, protective of Chloe, quietly perceptive.",
    hotRule: "Must witness Complimentary behavior, must never witness Bully, Aura >= 52 (with high Control or stairwell help)."
  },
  laura: {
    id: "laura",
    name: "Laura",
    role: "Goth Outsider",
    appearance: "Moody goth student in oversized black layers.",
    personality: "Avoids mainstream campus events, deadpan, drawn to blunt honesty over fake charm.",
    continuityRule: "Gated by state.mem.knowsLaura — cannot be named or noticed missing unless met at Orientation.",
    hotRule: "Defaults to HOT; likes you more if you Bully her or are Too Serious/Factual in front of her; flips to NOT only if she witnesses you being Too Complimentary or Too Teasing."
  },
  brandy: {
    id: "brandy",
    name: "Brandy",
    role: "Latina Twin (Bold Baddie)",
    appearance: "Identical Latina twin to Mandy with a bold, flashy baddie style.",
    personality: "Direct, status-aware, hates sycophants, respects sharp playful banter.",
    hotRule: "Must not witness Ass-Kisser/Complimentary spam, must witness Tease, Aura >= 58 (or rep >= 24)."
  },
  mandy: {
    id: "mandy",
    name: "Mandy",
    role: "Latina Twin (Sharp-Tongued Baddie)",
    appearance: "Identical Latina twin to Brandy with a contrasting, playful baddie style.",
    personality: "Quick-witted, irreverent, allergic to stiff overly serious lectures.",
    hotRule: "Must not witness Too Serious/Factual spam, must witness Tease, Aura >= 56 (or Mastery >= 60 / rep >= 24)."
  },
  tanya: {
    id: "tanya",
    name: "Tanya",
    role: "Student Council President",
    appearance: "Commanding, dark-skinned Haitian Student Council President and campus queen bee.",
    personality: "Composed, authoritative, respects competence and seriousness, despises kiss-ups.",
    hotRule: "Must witness Serious/Factual competence, must not witness Ass-Kisser/Complimentary spam, Aura >= 60 (or rep >= 24)."
  },
  brandon: {
    id: "brandon",
    name: "Brandon",
    role: "Aspiring Rapper / Bad Boy",
    appearance: "Charming, dark-skinned Black aspiring rapper with tapered locs and wired studio headphones.",
    personality: "Laid-back, rhythmic, writing lyrics in a beat-up notebook and tapping beats; restricted to Scene 5 Hallway Detention and pre-hangout bond."
  },
  rob: {
    id: "rob",
    name: "Rob",
    role: "Campus Jock",
    appearance: "Broad-shouldered white jock holding down the back row.",
    personality: "Competitive, blunt, loyal once you prove you aren't soft."
  },
  malik: {
    id: "malik",
    name: "Malik",
    role: "Back-Row Jokester",
    appearance: "Tall, braided light-skinned jokester and Rob's best friend.",
    personality: "Sharp comedic timing, reads social dynamics fast, instigator-in-chief."
  },
  elliot: {
    id: "elliot",
    name: "Elliot",
    role: "Academic Rival / Teacher's Pet",
    appearance: "Small, skinny Indian overachiever in glasses.",
    personality: "Hyper-competitive grade-chaser who schemes behind the scenes."
  },
  nate: {
    id: "nate",
    name: "Nate",
    role: "Student Council Vice President",
    appearance: "Egotistical, wealthy Student Council Vice President / rich genius.",
    personality: "Arrogant, transactional, constantly measuring status and leverage."
  },
  max: {
    id: "max",
    name: "Max",
    role: "Australian Track Athlete",
    appearance: "High-energy Australian track athlete.",
    personality: "Upbeat, relentlessly energetic, runs Get Active conditioning and campus Hide & Seek."
  }
};

// Ensures NPCs are NEVER omnipresent: only NPCs in state.presentNPCs log tones/reputation
function recordWitnessedTone(state, tone) {
  const present = Array.isArray(state.presentNPCs) ? state.presentNPCs : [];
  if (!state.witnessedTones) state.witnessedTones = {};

  present.forEach((npcId) => {
    if (!state.witnessedTones[npcId]) {
      state.witnessedTones[npcId] = { complimentary: 0, factual: 0, tease: 0, bully: 0 };
    }
    state.witnessedTones[npcId][tone] = (state.witnessedTones[npcId][tone] || 0) + 1;

    // Scene-scoped reputation reactions (ONLY for characters physically in the room)
    if (npcId === "laura") {
      if (tone === "bully" || tone === "factual") state.rep.laura = (state.rep.laura || 0) + 3;
      if (tone === "complimentary" || tone === "tease") state.rep.laura = (state.rep.laura || 0) - 3;
    } else if (npcId === "brandy") {
      if (tone === "tease") state.rep.brandy = (state.rep.brandy || 0) + 3;
      if (tone === "complimentary") state.rep.brandy = (state.rep.brandy || 0) - 4;
    } else if (npcId === "mandy") {
      if (tone === "tease") state.rep.mandy = (state.rep.mandy || 0) + 3;
      if (tone === "factual") state.rep.mandy = (state.rep.mandy || 0) - 4;
    } else if (npcId === "maya") {
      if (tone === "complimentary") state.rep.maya = (state.rep.maya || 0) + 3;
      if (tone === "bully") state.rep.maya = (state.rep.maya || 0) - 6;
    } else if (npcId === "tanya") {
      if (tone === "factual") state.rep.tanya = (state.rep.tanya || 0) + 3;
      if (tone === "complimentary") state.rep.tanya = (state.rep.tanya || 0) - 4;
    }
  });
}

function knowsLaura(state) {
  return Boolean(state && state.mem && state.mem.knowsLaura);
}

// Evaluates HOT vs NOT strictly from what THAT specific girl personally witnessed + Aura
function isGirlHot(girlId, state) {
  const s = state;
  const w = (s.witnessedTones && s.witnessedTones[girlId]) || { complimentary: 0, factual: 0, tease: 0, bully: 0 };
  const rep = s.rep || {};
  const mem = s.mem || {};

  switch (girlId) {
    case "laura": {
      // Defaults to HOT; only flips to NOT if Laura personally witnessed >= 2 Complimentary or >= 2 Tease responses
      if (w.complimentary >= 2 || w.tease >= 2) return false;
      return true;
    }
    case "brandy": {
      // Must NOT witness Ass-Kisser/Complimentary spam; must witness Tease; Aura >= 58 (or rep >= 24)
      if (w.complimentary >= 2) return false;
      return (w.tease >= 1 && s.aura >= 58) || (rep.brandy || 0) >= 24;
    }
    case "mandy": {
      // Must NOT witness Too Serious/Factual spam; must witness Tease; Aura >= 56 (or Mastery >= 60 / rep >= 24)
      if (w.factual >= 2) return false;
      return (w.tease >= 1 && (s.aura >= 56 || s.mastery >= 60)) || (rep.mandy || 0) >= 24;
    }
    case "maya": {
      // Must witness Complimentary; must NEVER witness Bully; Aura >= 52 (with Control >= 58 or helpedMaya)
      if (w.bully >= 1) return false;
      return (w.complimentary >= 1 && s.aura >= 52 && (s.control >= 58 || mem.helpedMaya)) || (rep.maya || 0) >= 24;
    }
    case "tanya": {
      // Must witness Serious/Factual; must NOT witness Ass-Kisser/Complimentary spam; Aura >= 60 (or rep >= 24)
      if (w.complimentary >= 2) return false;
      return (w.factual >= 1 && s.aura >= 60) || (rep.tanya || 0) >= 24;
    }
    default:
      return false;
  }
}

function getGirlStatus(girlId, state) {
  return isGirlHot(girlId, state) ? "HOT" : "NOT";
}
