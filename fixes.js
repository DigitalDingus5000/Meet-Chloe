// ---- Fix: Brandon belongs only to Episode 2, Scene 5 (the after-class side event) ----
// Episode 1's detention branch now plays out with you alone in the corridor.
SCENES.ep1_detention_brandon = {
  id: "ep1_detention_brandon",
  chapter: "CHAPTER I · EPISODE I",
  title: "Hallway Detention",
  presentNPCs: [],
  render: () => {
    state.activeArc = null; // drop the leftover "get to know" arc from the old scene
    return {
      text: [
        "Outside Lecture Room 4, the long tiled corridor is empty except for the low hum of the vending machines. Through the door, Professor Vance's voice carries muffled and steady, the rest of the afternoon going on without you.",
        "A wooden bench sits outside the department office. Somewhere behind frosted glass, the clerk's heels click once and fade. You have the rest of the period to yourself."
      ],
      choices: [
        {
          label: "Use the quiet to work through Friday's diagnostic packet.",
          action: () => {
            state.mastery = clamp(state.mastery + 3, 0, 100);
            goToScene("ep1_detention_end");
          }
        },
        {
          label: "Lean back, scroll your phone, and let the time run out.",
          action: () => {
            goToScene("ep1_detention_end");
          }
        },
        {
          label: "Stand by the door and listen to how the class reacts without you.",
          action: () => {
            state.control = clamp(state.control + 2, 0, 100);
            goToScene("ep1_detention_end");
          }
        }
      ]
    };
  }
};

SCENES.ep1_detention_end = {
  id: "ep1_detention_end",
  chapter: "CHAPTER I · EPISODE I",
  title: "Hallway Detention",
  presentNPCs: [],
  render: () => ({
    text: [
      "The final afternoon bell rings down the corridor, vibrating through the bench. Doors open, chairs scrape, and the rest of the seminar pours out onto the dusk-lit quad."
    ],
    choices: [
      {
        label: "Join the dispersal on the East Quad.",
        action: () => {
          goToScene("ep1_dusk_quad");
        }
      }
    ]
  })
};
// END OF fixes.js
