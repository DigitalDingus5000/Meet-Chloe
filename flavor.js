// ---- Extra lines layered onto your scenes (episode files stay untouched) ----
function nm() { return state.playerName || "Shane"; }
function pick(map, key) { return map[key] || map.average; }

const HEIGHT_LINE = {
  tall: "You have a few inches on most of the room, and you notice people tilting their heads up to read you.",
  average: "You're exactly the height of everyone else, which makes it easy to blend in or choose not to.",
  short: "You're shorter than most of the room, and you carry it like it's other people's problem."
};

const NATE_HEIGHT = {
  tall: "Nate has to tilt his chin up to look down at you, and he clearly hates it.",
  average: "Nate's gaze flicks over you, finding nothing to sneer at except your confidence.",
  short: "Nate smirks at your height, then seems to remember Tanya is watching and drops it."
};

const ROB_REACT = {
  ripped: "Rob gives your build a slow, approving once-over from the top bench.",
  fat: "Rob takes in your solid frame and nods, like he respects anyone who isn't afraid to take up space.",
  skinny: "Rob takes in your lean frame and smirks, already wondering whether you can keep up with the back row.",
  average: "Rob barely glances at your frame, which from him counts as acceptance."
};

const MAX_REACT = {
  ripped: `Max whistles low at your build. "Now there's a bloke who actually lifts. Don't slack on me, mate."`,
  fat: `Max doesn't crack a single joke about your frame—he just grins. "Good on you for turning up, mate. Pace yourself."`,
  skinny: `Max looks you over. "Lean's perfect for sprint work, mate. Let's see what you've got."`,
  average: `Max claps your shoulder like you're just another legend in the lineup.`
};

// Places where generic "new guy" wording becomes your name
const NAME_SWAPS = [
  [/Told you the new guy has eyes/g, () => "Told you " + nm() + " has eyes"],
  [/Okay, new guy—/g, () => "Okay, " + nm() + "—"]
];

// Extra paragraphs added just before a scene's last paragraph
const SCENE_EXTRAS = {
  ep1_scene1: () => [pick(ROB_REACT, state.playerBuild), pick(HEIGHT_LINE, state.playerHeight)],
  ep1_scene2: () => [`Malik squints at the roster and points your way. "${nm()}, you're up after Elliot."`],
  ep1_scene5: () => [`Vance's finger stops on the roster. "${nm()}," he reads, without looking up.`],
  ep2_orientation: () =>
    state.aura >= 54 && state.control >= 52
      ? [`Tanya glances at her clipboard and nods your way. "${nm()}, right? You're on my list."`]
      : [],
  ep2_get_active: () => [pick(MAX_REACT, state.playerBuild)],
  ep2_student_council: () => [
    pick(NATE_HEIGHT, state.playerHeight),
    `Tanya checks her list. "${nm()}, I assume you've got something to say?"`
  ],
  ep2_finale_dossier: () => [
    "FILE — " + nm() + " · " + labelOf(HEIGHT_OPTIONS, state.playerHeight) + " · " + labelOf(BUILD_OPTIONS, state.playerBuild) + " · " + (state.playerSkin || "")
  ]
};

function applySwaps(t) {
  let out = t;
  NAME_SWAPS.forEach(([rx, fn]) => { out = out.replace(rx, fn); });
  return out;
}

Object.keys(SCENES).forEach((id) => {
  const scene = SCENES[id];
  const baseRender = scene.render;
  if (!baseRender || scene._flavored) return;
  scene._flavored = true;
  scene.render = function () {
    const r = baseRender.apply(this, arguments);
    r.text = (r.text || []).map(applySwaps);
    const extra = SCENE_EXTRAS[id] ? SCENE_EXTRAS[id]() : [];
    if (extra.length) r.text.splice(Math.max(0, r.text.length - 1), 0, ...extra);
    return r;
  };
});
// END OF flavor.js
