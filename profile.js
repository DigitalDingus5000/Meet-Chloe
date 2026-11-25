// ---- Look options shown on the profile screen ----
const SKIN_OPTIONS = ["Dark-skinned", "Brown-skinned", "Light-skinned", "Olive-toned", "Fair-skinned"];
const HEIGHT_OPTIONS = [
  ["tall", "Tall"],
  ["average", "Like everyone else"],
  ["short", "Short king"]
];
const BUILD_OPTIONS = [
  ["fat", "Fat"],
  ["skinny", "Skinny"],
  ["average", "Nothing special"],
  ["ripped", "Ripped"]
];

// Optional hidden-stat nudges. All empty, so your balance is untouched.
// Example: ripped: { aura: 3 }
const LOOK_EFFECTS = {
  height: { tall: {}, average: {}, short: {} },
  build: { fat: {}, skinny: {}, average: {}, ripped: {} }
};

function labelOf(list, key) {
  const hit = list.find((o) => o[0] === key);
  return hit ? hit[1] : (key || "");
}

function applyLookEffects() {
  [LOOK_EFFECTS.height[state.playerHeight], LOOK_EFFECTS.build[state.playerBuild]].forEach((fx) => {
    Object.keys(fx || {}).forEach((k) => {
      state[k] = clamp(state[k] + fx[k], 0, 100);
    });
  });
}

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
    const add = (text, el) => {
      const l = document.createElement("label");
      l.textContent = text;
      wrap.appendChild(l);
      wrap.appendChild(el);
    };
    const makeSelect = (opts) => {
      const s = document.createElement("select");
      opts.forEach((o) => {
        const op = document.createElement("option");
        op.value = Array.isArray(o) ? o[0] : o;
        op.textContent = Array.isArray(o) ? o[1] : o;
        s.appendChild(op);
      });
      return s;
    };

    const name = document.createElement("input");
    name.type = "text";
    name.maxLength = 20;
    name.value = state.playerName || "Shane";
    const skin = makeSelect(SKIN_OPTIONS);
    const height = makeSelect(HEIGHT_OPTIONS);
    height.value = "average";
    const build = makeSelect(BUILD_OPTIONS);
    build.value = "average";

    add("First Name", name);
    add("Complexion", skin);
    add("Height", height);
    add("Build", build);

    const go = document.createElement("button");
    go.type = "button";
    go.className = "choice-btn";
    go.textContent = "Continue →";
    go.addEventListener("click", () => {
      state.playerName = name.value.trim() || "Shane";
      state.playerSkin = skin.value;
      state.playerHeight = height.value;
      state.playerBuild = build.value;
      applyLookEffects();
      goToScene("chloe_intro");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    wrap.appendChild(go);
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
      "Welcome, " + (state.playerName || "Shane") + ".",
      "Height: " + labelOf(HEIGHT_OPTIONS, state.playerHeight) + " · Build: " + labelOf(BUILD_OPTIONS, state.playerBuild) + " · Complexion: " + (state.playerSkin || ""),
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

// Re-draw the opening with the new profile screen
goToScene("setup_profile");
// END OF profile.js
