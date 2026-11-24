// ============================================================================
// MEET CHLOE — CHAPTER ONE: EPISODE TWO, PART 2 (episode2_part2.js)
// Covers Scenes 5–6, Bonus Scenes (10 beats each), & Finale Dossier:
// - Scene 5 Router: Post-Afternoon Class (4 beats/person, Low/High Aura entry, Yesterday's Homework)
//   OR Conditional Brandon Side-Event (only if failed all job checks, failed Teacher's Pet, & alone)
// - Convergence Bridge: 4:30 PM West Pines Path -> Scene 6 School Hangout
// - Scene 6: School Hangout (6 beats/person, 8-person Truth or Dare, 5-turn Spin the Bottle,
//   CONTROL vs PURSUE Multi-Girl Kiss Meltdown + High/Low Control intervention)
// - Winding Down -> Extended 10-Beat Bonus Scenes:
//     * Group Sleepover: Good vs Bad girl combos + High vs Low Emotional Control outcome
//     * Private Dorm Night with Chloe (Chloe's dorm or yours)
//     * Invite-Only VIP Mixer Party: Go Alone (Tanya + Nate sabotage) OR Go With Chloe
//       (Joined by Max -> Low Aura = Max leaves w/ Chloe; High Aura + High Control & Mastery = Chloe stays;
//        High Aura + Low Control = Fight Max option -> guaranteed loss)
// - Episode 2 Finale Dossier (Reveals Hidden Stats, 2x2 Matrix, HOT/NOT, & Choice-Memory Log)
// Depends on: characters.js, engine.js, episode2_part1.js
// ============================================================================

const EPISODE2_PART2_SCENES = {
  // ==========================================================================
  // SCENE 5 ROUTER: POST-AFTERNOON CLASS VS CONDITIONAL BRANDON SIDE-EVENT
  // ==========================================================================
  ep2_scene5_router: {
    id: "ep2_scene5_router",
    chapter: "CHAPTER I · EPISODE II",
    title: "1:54 PM — Block B Corridor",
    presentNPCs: [],
    render: () => {
      const failedAllJobs = !state.mem.passedJobCheck;
      const failedTeachersPet = !npcRemembers("elliot", "ep1_outshone_elliot");
      const isAlone = !state.mem.lunchCompanion || state.mem.lunchCompanion === "alone";

      if (failedAllJobs && failedTeachersPet && isAlone) {
        startGetToKnowYouArc("ep2_brandon_side", "brandon", "ep2_post_class_convergence", 4);
        return {
          text: [
            "You walk down the Block B corridor alone at 1:54 PM—no Council liaison badge, no Teacher's Pet leverage from yesterday, and the heavy oak door to Lecture Room 4 already latched shut with Vance's voice booming behind the glass.",
            "On the wooden bench outside the stairwell alcove sits a familiar figure with tapered locs, wired studio headphones around his collar, and a beat-up lyric notebook balanced on one knee."
          ],
          choices: [
            {
              label: "Drop onto the bench beside Brandon instead of knocking on Vance's locked door.",
              action: () => {
                goToScene("ep2_scene5_brandon");
              }
            }
          ]
        };
      }

      const companionMap = {
        chloe_maya: ["chloe", "maya", "elliot", "rob", "malik"],
        twins: ["brandy", "mandy", "elliot", "chloe", "rob", "malik"],
        laura: ["laura", "elliot", "chloe", "rob", "malik"],
        backrow: ["rob", "malik", "elliot", "chloe"],
        alone: ["chloe", "elliot", "rob", "malik"]
      };
      const primaryMap = {
        chloe_maya: "chloe",
        twins: "brandy",
        laura: "laura",
        backrow: "malik",
        alone: "elliot"
      };
      const key = state.mem.lunchCompanion || "alone";
      state.mem.scene5Present = companionMap[key];
      startGetToKnowYouArc("ep2_scene5_class_arc", primaryMap[key], "ep2_post_class_convergence", 4);

      return {
        text: [
          "You reach the heavy double doors of Block B Lecture Room 4 seven minutes past the bell—stuck with the exact company you spent lunch with as Professor Vance's voice carries through the transom."
        ],
        choices: [
          {
            label: "Push open the door and step inside.",
            action: () => {
              goToScene("ep2_scene5_class");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 5 SIDE BRANCH: BRANDON (4 BEATS -> CONVERGES TO POST-CLASS QUAD)
  // ==========================================================================
  ep2_scene5_brandon: {
    id: "ep2_scene5_brandon",
    chapter: "CHAPTER I · EPISODE II",
    title: "Side Alcove — Brandon",
    presentNPCs: ["brandon"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_brandon_side", "brandon", "ep2_post_class_convergence", 4);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Brandon looks up from his lyric notebook, tapping his pen twice against his knee as he recognizes you. \"Look who's locked out of the circus,\" he says with an easy, laid-back smirk. \"No Council badge, no front-row gold star—just out here breathing actual air.\""
          ],
          choices: [
            {
              label: "\"Turns out playing politics at Orientation wasn't worth the headache. How's the tape coming?\"",
              action: () => {
                state.rep.brandon += 4;
                state.mem.brandonBond = true;
                applyTone("factual", { targetNpc: "brandon", memoryTag: "ep2_brandon_side_bond", memoryText: "Skipped the locked afternoon door and talked beats with Brandon in the corridor alcove." });
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene5_brandon");
              }
            },
            {
              label: "\"Somebody had to keep you company out here so you don't start rapping to the vending machines.\"",
              action: () => {
                state.rep.brandon += 4;
                state.mem.brandonBond = true;
                applyTone("tease", { targetNpc: "brandon", memoryTag: "ep2_brandon_side_bond", memoryText: "Traded jokes with Brandon outside Room 4 while skipping the afternoon lecture." });
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene5_brandon");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            "Brandon laughs, sliding one wired headphone cup off his ear and handing it over so you can hear the raw beat looping from his phone—crisp snare, heavy sub-bass, and an unmixed vocal hook he cut last night.",
            "\"People around here stress over who sits where at lunch like it's life or death,\" Brandon says, shaking his tapered locs back. \"Meanwhile half of them couldn't survive five minutes without a group chat telling them what to think.\""
          ],
          choices: [
            {
              label: "\"Beat knocks hard. Keep that hook raw—don't over-polish it.\"",
              action: () => {
                state.rep.brandon += 3;
                state.aura = clamp(state.aura + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene5_brandon");
              }
            },
            {
              label: "\"True. Half the fresher class is terrified of standing alone for ten minutes.\"",
              action: () => {
                state.control = clamp(state.control + 3, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene5_brandon");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "Brandon tucks his notebook away as the clock above the stairwell hits 4:10 PM. \"I've got a 5 o'clock session downtown, so I'm ghost before the west pines hangout starts,\" he says, standing up and offering a solid fist bump. \"Don't let those kids at the pavilion get in your head tonight.\""
          ],
          choices: [
            {
              label: "Return the fist bump as the doors of Lecture Room 4 finally swing open down the hall.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene5_brandon");
              }
            }
          ]
        };
      }

      return {
        text: [
          "Brandon heads down the side stairwell toward the street gate just as the rest of the cohort pours out of Block B onto the afternoon quad—tying you seamlessly back into the evening crowd."
        ],
        choices: [
          {
            label: "Rejoin the cohort heading toward the West Pines Pavilion →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_post_class_convergence");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 5 MAIN: POST-AFTERNOON CLASS (4 BEATS/PERSON, AURA ENTRY, HOMEWORK)
  // ==========================================================================
  ep2_scene5_class: {
    id: "ep2_scene5_class",
    chapter: "CHAPTER I · EPISODE II",
    title: "Post-Afternoon Lecture",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot"],
    render: () => {
      state.presentNPCs = state.mem.scene5Present || ["chloe", "elliot", "rob", "malik"];
      const arc = state.activeArc || startGetToKnowYouArc("ep2_scene5_class_arc", "chloe", "ep2_post_class_convergence", 4);
      const beat = arc.beatIndex;
      const highAura = state.aura >= 55;
      const companion = state.mem.lunchCompanion || "alone";

      if (beat === 1) {
        const companionDesc =
          companion === "chloe_maya"
            ? "Chloe and Maya slide into the back-left bench right beside you, exchanging a quick, stifled look as the door clicks shut."
            : companion === "twins"
              ? "Brandy and Mandy take the aisle seats beside you, unbothered despite arriving eight minutes past the bell."
              : companion === "laura"
                ? "Laura slips into the shadowed corner seat beside you, pulling her oversized black sleeve over her wrist."
                : companion === "backrow"
                  ? "Rob and Malik squeeze onto the top wooden bench beside you, trying not to creak the floorboards."
                  : "You take an open bench near the rear aisle on your own.";

        return {
          text: [
            highAura
              ? "Because your Aura carries weight across the room, the latch clicks loud enough that Professor Vance stops mid-sentence, half the class turns their heads in unison, and Elliot immediately smirks from row two at your late arrival."
              : "With a low, understated Aura, you and your lunch company slip quietly through the rear door into the back row without Vance even glancing up from the chalkboard.",
            companionDesc
          ],
          choices: [
            {
              label: highAura
                ? "Meet Vance's stare calmly without apologizing and take your seat."
                : "Settle smoothly into the bench and open your notebook before anyone notices.",
              action: () => {
                if (highAura) state.control = clamp(state.control + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene5_class");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        const hasHomework =
          state.mem.night1Ending === "flipped_lib" ||
          state.mem.middayRoute === "library" ||
          npcRemembers("elliot", "ep1_outshone_elliot");

        return {
          text: [
            "Ten minutes into the lecture, Vance sets down his chalk and taps the lectern. \"Before we move to pricing models, pass yesterday's diagnostic homework down to the aisle. No extensions.\"",
            "Elliot snaps his crisp, stapled packet onto the aisle desk within two seconds, looking back toward your row to see if you're empty-handed.",
            hasHomework
              ? "Because you put the hours into yesterday's work, your completed diagnostic sits right inside your folder—clean, annotated, and ready."
              : "Your folder is light—yesterday's social detours left yesterday's diagnostic half-finished."
          ],
          choices: hasHomework
            ? [
                {
                  label: "Pass your completed homework down the row cleanly—holding your academic standing.",
                  action: () => {
                    state.mastery = clamp(state.mastery + 3, 0, 100);
                    promoteGrade();
                    recordChoiceMemory("ep2_submitted_homework", "elliot", "Turned in yesterday's homework cleanly during the post-afternoon class.");
                    advanceGetToKnowYouBeat();
                    goToScene("ep2_scene5_class");
                  }
                }
              ]
            : [
                {
                  label: "Hand in the partial outline with a straight face—taking the minor grade hit without flinching.",
                  action: () => {
                    demoteGrade();
                    recordChoiceMemory("ep2_missed_homework", "elliot", "Got caught short when Vance collected yesterday's homework.");
                    advanceGetToKnowYouBeat();
                    goToScene("ep2_scene5_class");
                  }
                },
                {
                  label: "Bluff smoothly that you uploaded the digital draft before the 1:45 cutoff.",
                  action: () => {
                    if (state.control >= 56) {
                      state.control = clamp(state.control + 2, 0, 100);
                    } else {
                      demoteGrade();
                    }
                    advanceGetToKnowYouBeat();
                    goToScene("ep2_scene5_class");
                  }
                }
              ]
        };
      }

      if (beat === 3) {
        const banterText =
          companion === "chloe_maya"
            ? "Under the desk, Chloe slides a folded corner of paper toward your wrist with two words scribbled in ink: 'Pavilion. 6 PM.' Maya gives a small, approving nod beside her."
            : companion === "twins"
              ? "Mandy leans over whispering bets on who's folding first at tonight's shelter hangout while Brandy rolls her eyes with a smirk."
              : companion === "laura"
                ? "Laura scribbles a single black star on the corner of your page—confirming she's actually showing up to the pavilion tonight."
                : companion === "backrow"
                  ? "Malik whispers the speaker playlist he lined up for the pavilion shelter tonight while Rob nods along."
                  : "Across the aisle, Malik signals two fingers toward the west pines—tonight's shelter hangout is still on.";

        return {
          text: [
            "The lesson rolls forward through supply shocks and elasticity curves as afternoon sunlight turns amber across the chalkboard.",
            banterText
          ],
          choices: [
            {
              label: "Give a subtle nod as the clock ticks toward dismissal.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene5_class");
              }
            }
          ]
        };
      }

      return {
        text: [
          "At 4:25 PM sharp, the dismissal chime echoes down Block B. Notebooks snap shut and the entire fresher cohort streams out toward the west pines for the evening hangout."
        ],
        choices: [
          {
            label: "Step out of Block B and converge with the crowd →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_post_class_convergence");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // CONVERGENCE BRIDGE: 4:30 PM WEST PINES PATH (ALL SCENE 5 BRANCHES REJOIN)
  // ==========================================================================
  ep2_post_class_convergence: {
    id: "ep2_post_class_convergence",
    chapter: "CHAPTER I · EPISODE II",
    title: "Dusk Trail to the Pavilion",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot"],
    render: () => {
      if (knowsLaura(state) && !state.presentNPCs.includes("laura")) {
        state.presentNPCs.push("laura");
      }

      return {
        text: [
          "By 5:45 PM, the gravel footpath winding behind the west pines hums with footsteps, portable bass speakers, and paper bags of snacks.",
          "Every detour from the afternoon converges at the timber-framed Pavilion Shelter overlooking the lower pond—where string lights flicker on above wooden benches and the core fresher circle gathers for the night."
        ],
        choices: [
          {
            label: "Step under the pavilion lights and join the circle (Scene 6: The School Hangout).",
            action: () => {
              startGetToKnowYouArc("ep2_hangout_arc", "chloe", "ep2_winding_down", 6);
              goToScene("ep2_scene6_hangout");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 6: THE SCHOOL HANGOUT (6 BEATS + TRUTH OR DARE + 5-TURN SPIN THE BOTTLE + MELTDOWNS)
  // ==========================================================================
  ep2_scene6_hangout: {
    id: "ep2_scene6_hangout",
    chapter: "CHAPTER I · EPISODE II",
    title: "The School Hangout — West Pines Pavilion",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot"],
    render: () => {
      const baseCast = ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot"];
      if (knowsLaura(state)) baseCast.push("laura");
      state.presentNPCs = baseCast;

      const arc = state.activeArc || startGetToKnowYouArc("ep2_hangout_arc", "chloe", "ep2_winding_down", 6);
      const beat = arc.beatIndex;

      if (beat === 1) {
        const lauraLine = knowsLaura(state)
          ? "Near the shadowed corner post, Laura leans against the timber beam in her black layers, nursing a canned soda with a deadpan half-smirk."
          : "An unfamiliar goth girl in black layers sits quietly near the far post, keeping to herself outside the main circle.";

        return {
          text: [
            "Eight voices overlap under the warm string lights of the West Pines Pavilion. Malik drops a Bluetooth speaker onto the center crate while Rob passes out cold sodas.",
            "Chloe sits cross-legged on the wide bench beside Maya, golden hair catching the amber bulbs; Brandy and Mandy claim the opposite rail; Elliot sits stiffly at the edge trying to prove he isn't a square; and " + lauraLine,
            "Malik claps twice. \"Eight-person Truth or Dare queue first—no dodging, no weak answers. Starting with you.\""
          ],
          choices: [
            {
              label: "Take Truth: \"Tell the circle who in this pavilion is hiding the biggest secret behind their reputation.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep2_tod_truth", memoryText: "Picked Truth at the pavilion hangout and hinted at hidden reputations." });
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            },
            {
              label: "Take Dare: \"Let Malik read your last three sent DMs out loud without flinching.\"",
              action: () => {
                state.aura = clamp(state.aura + 3, 0, 100);
                state.rep.malik += 3;
                applyTone("factual", { chloeDirect: true, targetNpc: "malik", memoryTag: "ep2_tod_dare", memoryText: "Took Malik's DM dare in front of the entire pavilion without flinching." });
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            },
            {
              label: "Take Truth: \"Admit Maya is the only person here who actually kept everyone sane today.\"",
              action: () => {
                state.rep.maya += 4;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            },
            {
              label: "Take Dare: \"Call out Elliot's highlighters and Nate's fake VIP act in one breath.\"",
              action: () => {
                state.rep.elliot -= 4;
                state.rep.brandy += 2;
                applyTone("bully", { chloeDirect: true, targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            "The Truth or Dare queue whips around the eight-person circle—Brandy dares Elliot to chug warm ginger ale without blinking; Maya chooses Truth and admits she almost took a train home on day one; Chloe takes Dare and swaps jackets with Rob for ten minutes.",
            "Then Malik sets an empty glass bottle flat on the center plank and spins it hard. \"Five-turn Spin the Bottle,\" Malik grins. \"Wherever the neck lands, if she's feeling you, you don't chicken out.\""
          ],
          choices: [
            {
              label: "Step into Turn 1 of Spin the Bottle.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        const brandyHot = isGirlHot("brandy", state);
        return {
          text: [
            "Turn 1 lands on Chloe—she locks eyes with you across the crate, a slow spark flashing under the string lights before Malik spins again and Turn 2 lands squarely on Brandy.",
            brandyHot
              ? "Brandy doesn't blink—she leans forward onto her knees, glossy lips curving in a challenge because you've got the Aura and sharp banter she respects."
              : "Brandy crosses her arms with a dry laugh, waving two fingers dismissively—she's not giving freebies to someone who hasn't earned her interest."
          ],
          choices: [
            {
              label: "Lean in and kiss Chloe smoothly—slow, controlled, letting the tension hang in the air.",
              action: () => {
                registerHangoutKiss("chloe");
                adjustChloeMatrix(2, 4);
                state.aura = clamp(state.aura + 2, 0, 100);
                recordChoiceMemory("ep2_kissed_chloe_bottle", "chloe", "Kissed Chloe during Spin the Bottle at the pavilion hangout.");
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            },
            ...(brandyHot
              ? [
                  {
                    label: "Take Brandy's dare—kiss her boldly with a confident smirk while the circle cheers.",
                    action: () => {
                      const meltdown = registerHangoutKiss("brandy");
                      state.rep.brandy += 5;
                      if (meltdown) {
                        goToScene("ep2_chloe_meltdown");
                        return;
                      }
                      advanceGetToKnowYouBeat();
                      goToScene("ep2_scene6_hangout");
                    }
                  }
                ]
              : []),
            {
              label: "Play it cool with a teasing half-smile and pass the spin to the next turn.",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "brandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        const mandyHot = isGirlHot("mandy", state);
        const mayaHot = isGirlHot("maya", state);
        return {
          text: [
            "The bottle clatters across the wood—Turn 3 points at Mandy, and Turn 4 spins past Rob straight toward Maya.",
            mandyHot
              ? "Mandy tilts her head with a playful, wicked grin, tapping her silver rings against her knee."
              : "Mandy laughs and shakes her head, tossing the bottle back to Malik.",
            mayaHot
              ? "Maya's cheeks flush warm under the amber lights, though she doesn't look away—her soft, grounded gaze steady on yours."
              : "Maya tucks a strand of hair behind her ear with a polite, shy smile, keeping her distance."
          ],
          choices: [
            ...(mandyHot
              ? [
                  {
                    label: "Kiss Mandy with sharp, playful chemistry—matching her irreverent energy.",
                    action: () => {
                      const meltdown = registerHangoutKiss("mandy");
                      state.rep.mandy += 5;
                      if (meltdown) {
                        goToScene("ep2_chloe_meltdown");
                        return;
                      }
                      advanceGetToKnowYouBeat();
                      goToScene("ep2_scene6_hangout");
                    }
                  }
                ]
              : []),
            ...(mayaHot
              ? [
                  {
                    label: "Kiss Maya gently and respectfully—warm, unhurried, and genuine.",
                    action: () => {
                      const meltdown = registerHangoutKiss("maya");
                      state.rep.maya += 5;
                      if (meltdown) {
                        goToScene("ep2_chloe_meltdown");
                        return;
                      }
                      advanceGetToKnowYouBeat();
                      goToScene("ep2_scene6_hangout");
                    }
                  }
                ]
              : []),
            {
              label: "Keep your composure and pass the bottle cleanly for Turn 5.",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            }
          ]
        };
      }

      if (beat === 5) {
        const lauraKnown = knowsLaura(state);
        const lauraHot = lauraKnown && isGirlHot("laura", state);
        return {
          text: [
            lauraKnown
              ? lauraHot
                ? "Turn 5 wobbles to a halt pointing toward the shadowed corner post where Laura stands in her oversized black layers. She doesn't flinch—just steps into the edge of the string light with deadpan intrigue."
                : "Turn 5 points toward Laura by the post; she gives a flat, unimpressed look and flicks the bottle back into the center."
              : "Turn 5 spins fast across the plank, landing between Chloe and Malik as Rob yells 'Double or nothing!'",
            "Around the pavilion, the energy shifts from loud dares to low, late-evening conversations as phones start lighting up with invitations to the exclusive VIP Mixer Party across campus."
          ],
          choices: [
            ...(lauraHot
              ? [
                  {
                    label: "Step up to Laura and kiss her briefly, deadpan and electric.",
                    action: () => {
                      const meltdown = registerHangoutKiss("laura");
                      state.rep.laura += 5;
                      if (meltdown) {
                        goToScene("ep2_chloe_meltdown");
                        return;
                      }
                      advanceGetToKnowYouBeat();
                      goToScene("ep2_scene6_hangout");
                    }
                  }
                ]
              : []),
            {
              label: "Lean back beside Chloe as the final spin wraps up.",
              action: () => {
                adjustChloeMatrix(2, 1);
                advanceGetToKnowYouBeat();
                goToScene("ep2_scene6_hangout");
              }
            }
          ]
        };
      }

      return {
        text: [
          "Malik turns the speaker volume down to a low bass hum as the night air cools off the pond. Bottles are gathered, jackets pulled back on, and the circle begins breaking into smaller pairs."
        ],
        choices: [
          {
            label: "Step out to the edge of the pavilion as the night winds down →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_winding_down");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // CHLOE MULTI-GIRL KISS MELTDOWN (CONTROL VS PURSUE + HIGH/LOW CONTROL INTERVENTION)
  // ==========================================================================
  ep2_chloe_meltdown: {
    id: "ep2_chloe_meltdown",
    chapter: "CHAPTER I · EPISODE II",
    title: "Fracture Under the Lights",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => {
      const isPursue = state.chloeMode === "PURSUE";
      const highControl = state.control >= 58;

      return {
        text: isPursue
          ? [
              "The second you pull back, Chloe stands up so fast the wooden bench scrapes against the concrete. Her usual unbothered baddie armor shatters completely—cheeks flushed, eyes bright with raw, exposed jealousy because she was already in PURSUE mode without enough Comfort to trust you.",
              "\"Unbelievable,\" Chloe snaps, voice tight and trembling in front of the circle before she turns on her heel toward the dark pine trail. \"Don't even bother texting me tonight.\""
            ]
          : [
              "Chloe doesn't raise her voice at all—which is ten times worse. Sitting squarely in her CONTROL box with low Comfort, she locks her phone, offers a razor-cold, calculated smile to Brandy and Mandy, and stands up.",
              "\"Cute performance,\" Chloe says icily, her voice carrying across the sudden silence. \"Have fun playing mascot for the whole fresher class.\" She walks off with Maya following quietly behind her."
            ],
        choices: highControl
          ? [
              {
                label: "Use your high Emotional Control: step away from the crowd calmly and catch Chloe by the pine rail before she leaves.",
                action: () => {
                  adjustChloeMatrix(6, 2);
                  state.rep.chloe += 4;
                  state.mem.resolvedMeltdown = true;
                  recordChoiceMemory("ep2_resolved_meltdown", "chloe", "Used high Emotional Control to de-escalate Chloe's jealousy meltdown privately.");
                  goToScene("ep2_winding_down");
                }
              }
            ]
          : [
              {
                label: "Your Control wavers under the stare of the whole pavilion—watch her disappear down the path bitterly.",
                action: () => {
                  adjustChloeMatrix(-5, -6);
                  state.rep.chloe -= 6;
                  state.mem.bitter_meltdown = true;
                  recordChoiceMemory("ep2_bitter_meltdown", "chloe", "Let Chloe's hangout meltdown end bitterly in front of the circle.");
                  goToScene("ep2_winding_down");
                }
              }
            ]
      };
    }
  },

  // ==========================================================================
  // PRE-BONUS CONVERGENCE: WINDING DOWN -> ROUTING TO 10-BEAT BONUS SCENES
  // ==========================================================================
  ep2_winding_down: {
    id: "ep2_winding_down",
    chapter: "CHAPTER I · EPISODE II",
    title: "Winding Down",
    presentNPCs: ["chloe", "maya", "brandy", "mandy"],
    render: () => {
      const girls = ["chloe", "maya", "brandy", "mandy"];
      if (knowsLaura(state)) girls.push("laura");
      const hotGirls = girls.filter((g) => isGirlHot(g, state));

      const canGroupSleepover = hotGirls.length >= 2 && !state.mem.bitter_meltdown;
      const canChloeDorm =
        state.chloeMode === "PURSUE" &&
        state.comfort >= 20 &&
        !state.mem.bitter_meltdown;
      // VIP Mixer Party: invite-only, triggers ONLY if High Aura and nothing else to do
      const canVIPMixer = state.aura >= 62 && !canGroupSleepover && !canChloeDorm;
      // Also allow VIP Mixer with Chloe if invited and player chooses to take Chloe to the VIP Mixer
      const canVIPWithChloe = Boolean(state.mem.hasVIPWristband) && !state.mem.bitter_meltdown && state.chloeMode === "PURSUE";

      return {
        text: [
          "By 8:30 PM, the pavilion firepit dies down to glowing embers. Distant bass thumps from the east courtyard where Nate and Tanya's invite-only VIP Mixer Party is getting underway.",
          "Your phone vibrates once in your palm as the night branches toward its final chapter."
        ],
        choices: [
          ...(canGroupSleepover
            ? [
                {
                  label: "Pitch/accept an after-hours Group Sleepover—choosing your girl combination carefully (10-Beat Extended Bonus).",
                  action: () => {
                    goToScene("ep2_sleepover_setup");
                  }
                }
              ]
            : []),
          ...(canChloeDorm
            ? [
                {
                  label: "Slip away with Chloe to her dorm or yours for the rest of the night (10-Beat Extended Bonus).",
                  action: () => {
                    startGetToKnowYouArc("ep2_bonus_chloe_arc", "chloe", "ep2_finale_dossier", 10);
                    goToScene("ep2_bonus_chloe_dorm");
                  }
                }
              ]
            : []),
          ...(canVIPWithChloe
            ? [
                {
                  label: "Use your VIP access and walk into the invite-only VIP Mixer Party with Chloe (10-Beat Extended Bonus).",
                  action: () => {
                    state.mem.vipMode = "with_chloe";
                    startGetToKnowYouArc("ep2_bonus_vip_chloe_arc", "chloe", "ep2_finale_dossier", 10);
                    goToScene("ep2_vip_with_chloe");
                  }
                }
              ]
            : []),
          ...(canVIPMixer
            ? [
                {
                  label: "With High Aura and nothing else tying you down, go alone to the invite-only VIP Mixer Party (10-Beat Extended Bonus).",
                  action: () => {
                    state.mem.vipMode = "alone";
                    startGetToKnowYouArc("ep2_bonus_vip_alone_arc", "tanya", "ep2_finale_dossier", 10);
                    goToScene("ep2_vip_alone");
                  }
                }
              ]
            : []),
          {
            label: "Call it a night and walk back across the quiet quad to your dorm.",
            action: () => {
              goToScene("ep2_night2_close");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE A: GROUP SLEEPOVER (GOOD VS BAD COMBOS + EMOTIONAL CONTROL)
  // ==========================================================================
  ep2_sleepover_setup: {
    id: "ep2_sleepover_setup",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "The Sleepover Roster",
    presentNPCs: ["chloe", "maya", "brandy", "mandy"],
    render: () => ({
      text: [
        "Before heading back to the residence hall suite, the girls look to you to lock in who's actually coming upstairs. Some combinations click naturally; others bring clashing egos into a locked room where only high Emotional Control keeps the night from imploding."
      ],
      choices: [
        {
          label: "Good Combo: Invite Chloe & Maya — childhood best friends with grounded, effortless chemistry.",
          action: () => {
            state.mem.sleepoverCombo = "good";
            state.mem.sleepoverGroup = ["chloe", "maya"];
            startGetToKnowYouArc("ep2_bonus_sleepover_arc", "chloe", "ep2_finale_dossier", 10);
            goToScene("ep2_bonus_sleepover");
          }
        },
        {
          label: "Good Combo: Invite Brandy & Mandy — twin rhythm and high-energy banter that flows naturally.",
          action: () => {
            state.mem.sleepoverCombo = "good";
            state.mem.sleepoverGroup = ["brandy", "mandy"];
            startGetToKnowYouArc("ep2_bonus_sleepover_arc", "brandy", "ep2_finale_dossier", 10);
            goToScene("ep2_bonus_sleepover");
          }
        },
        {
          label: "Volatile / Bad Combo: Put Chloe, Brandy, and Mandy in the same suite—testing your Emotional Control under pressure.",
          action: () => {
            state.mem.sleepoverCombo = "bad";
            state.mem.sleepoverGroup = ["chloe", "brandy", "mandy"];
            startGetToKnowYouArc("ep2_bonus_sleepover_arc", "chloe", "ep2_finale_dossier", 10);
            goToScene("ep2_bonus_sleepover");
          }
        }
      ]
    })
  },

  ep2_bonus_sleepover: {
    id: "ep2_bonus_sleepover",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "After-Hours Group Sleepover",
    presentNPCs: ["chloe", "maya", "brandy", "mandy"],
    render: () => {
      state.presentNPCs = state.mem.sleepoverGroup || ["chloe", "maya"];
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_sleepover_arc", "chloe", "ep2_finale_dossier", 10);
      const beat = arc.beatIndex;
      const isBadCombo = state.mem.sleepoverCombo === "bad";
      const highControl = state.control >= 58;
      const goodNight = !isBadCombo || highControl;

      const goodNightBeats = [
        "The suite door locks behind you, shutting out the campus noise. Shoes are kicked by the mat and oversized hoodies replace campus jackets.",
        "Low R&B plays softly from a phone speaker on the coffee table while snacks and cold drinks get spread across the rug.",
        "Without the fresher cohort watching, every guarded posture melts—laughter comes easy, unhurried, and genuine.",
        "You deal out a late-night card game on the floor cushions, keeping the banter sharp without forcing a single beat.",
        "Halfway through the round, side glances linger a fraction longer under the warm amber desk lamp.",
        isBadCombo
          ? "When a sharp remark between Brandy and Chloe threatens to spike the temperature in the room, your high Emotional Control reads it instantly—you redirect with dry, effortless humor that dissolves the tension before it ignites."
          : "The natural chemistry between the girls keeps the room relaxed, teasing, and completely free of ego.",
        "Pillows and blankets get pulled across the common-room floor as midnight turns into 1:30 AM.",
        "Whispered confessions and playful dares trade back and forth in the dim glow while rain taps softly against the window glass.",
        "Warm hands, tangled blankets, and magnetic closeness linger as the lamp clicks off into silver streetlight.",
        "GOOD NIGHT — Dawn filters through the blinds over a tangle of pillows and sleeping silhouettes, sealing a standout Chapter One finish."
      ];

      const badNightBeats = [
        "The suite door clicks shut, and within five minutes it's obvious that putting Chloe, Brandy, and Mandy in one room without enough Emotional Control was lighting a match near dry kindling.",
        "Brandy drops a pointed comment about 'girls who act unbothered until someone else gets attention,' and Chloe's jaw tightens immediately.",
        "Mandy smirks into her cup, stoking the silence instead of defusing it.",
        "You try to steer the conversation back to a card game on the rug, but every line lands flat in the thick air.",
        "When Chloe catches Brandy glancing at your phone screen, the polite veneer evaporates completely.",
        "Your Emotional Control slips under the crossfire—you over-explain instead of holding frame, making both sides roll their eyes.",
        "Brandy and Mandy grab their jackets off the sofa back by 11:30 PM, offering a razor-thin 'We're good' at the door.",
        "Chloe stays behind for three quiet, icy minutes before gathering her boots without looking your way.",
        "The suite door latches shut, leaving you staring at an untouched deck of cards under the harsh overhead light.",
        "BAD NIGHT — Poor combo chemistry and low Emotional Control fractured the sleepover before midnight."
      ];

      const activeBeats = goodNight ? goodNightBeats : badNightBeats;

      if (beat === 10 && !state.mem.sleepoverResolved) {
        state.mem.sleepoverResolved = true;
        if (goodNight) {
          state.aura = clamp(state.aura + 4, 0, 100);
          adjustChloeMatrix(3, 2);
          recordChoiceMemory("ep2_sleepover_good_night", "chloe", "Pulled off a Good Night at the after-hours Group Sleepover.");
        } else {
          state.aura = clamp(state.aura - 4, 0, 100);
          adjustChloeMatrix(-4, -5);
          state.rep.brandy -= 4;
          state.rep.mandy -= 4;
          recordChoiceMemory("ep2_sleepover_bad_night", "chloe", "Lost control of a volatile girl combo during the Group Sleepover, ending in a Bad Night.");
        }
      }

      if (beat < 10) {
        return {
          text: [activeBeats[beat - 1]],
          choices: [
            {
              label: goodNight ? "Keep your composure steady and play the moment smoothly." : "Try to steady the room as the tension climbs.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_bonus_sleepover");
              }
            }
          ]
        };
      }

      return {
        text: [activeBeats[9]],
        choices: [
          {
            label: "Unlock Chapter One Finale Dossier →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_finale_dossier");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE B: PRIVATE DORM NIGHT WITH CHLOE (EXTENDED 10 STORY BEATS)
  // ==========================================================================
  ep2_bonus_chloe_dorm: {
    id: "ep2_bonus_chloe_dorm",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "Behind Closed Doors — Chloe",
    presentNPCs: ["chloe"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_chloe_arc", "chloe", "ep2_finale_dossier", 10);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Away from the pavilion crowd, Chloe stops beneath the archway between the east and west residence halls, tilting her golden head toward you with a slow, deliberate smile. \"My roommate's at the mixer till two—or we can take your room. Your call.\""
          ],
          choices: [
            {
              label: "\"Your dorm—let's see what Chloe Reed's space actually looks like behind the armor.\"",
              action: () => {
                state.mem.dormChoice = "Chloe's dorm";
                adjustChloeMatrix(2, 2);
                advanceGetToKnowYouBeat();
                goToScene("ep2_bonus_chloe_dorm");
              }
            },
            {
              label: "\"Mine—quieter hallway, zero interruptions.\"",
              action: () => {
                state.mem.dormChoice = "Your dorm";
                adjustChloeMatrix(1, 3);
                advanceGetToKnowYouBeat();
                goToScene("ep2_bonus_chloe_dorm");
              }
            }
          ]
        };
      }

      const dormBeats = [
        "",
        `Inside ${state.mem.dormChoice || "the room"}, the heavy door clicks shut, sealing out the campus noise. Chloe drops her leather jacket over the desk chair and kicks off her boots.`,
        "Without an audience to perform for, her dry sarcasm softens into quiet, unhurried candor as she sits beside you on the edge of the bed.",
        "She pulls out a small portfolio of editorial fashion layouts she hasn't shown anyone on campus yet, watching your face as you turn the pages.",
        "When you give her an honest, grounded critique instead of empty flattery, the last wall between you drops completely.",
        "Chloe leans in closer, her fingers catching the front of your collar as she looks up through lowered lashes.",
        "The space between you closes in slow, deliberate heat—her pulse fluttering against your thumb along her jawline.",
        "Shadows stretch across the ceiling as the desk lamp clicks off, leaving only the silver streetlight through the blinds.",
        "Breath tangles with breath in unhurried, magnetic closeness before the night fades smoothly into silence.",
        "Morning light breaks across the quiet room—Chapter One complete."
      ];

      if (beat < 10) {
        return {
          text: [dormBeats[beat - 1]],
          choices: [
            {
              label: "Stay present in the moment—unhurried and in control.",
              action: () => {
                adjustChloeMatrix(2, 2);
                advanceGetToKnowYouBeat();
                goToScene("ep2_bonus_chloe_dorm");
              }
            }
          ]
        };
      }

      return {
        text: [dormBeats[9]],
        choices: [
          {
            label: "Unlock Chapter One Finale Dossier →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_finale_dossier");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE C1: VIP MIXER PARTY — GO ALONE (10 BEATS: TANYA + NATE SABOTAGE)
  // ==========================================================================
  ep2_vip_alone: {
    id: "ep2_vip_alone",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "VIP Mixer — Solo Entry",
    presentNPCs: ["tanya", "nate"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_vip_alone_arc", "tanya", "ep2_finale_dossier", 10);
      const beat = arc.beatIndex;

      const soloVipBeats = [
        "Entering the invite-only VIP Mixer Party alone on sheer High Aura, you step past the velvet rope into the rooftop Student Union lounge where warm amber uplighting reflects off the glass balcony.",
        "Tanya stands near the terrace rail in a tailored black dress, dark-skinned Haitian poise commanding the upper-class crowd—and she immediately spots you walking in solo.",
        "Before you can cross the floor, Nate steps into your path swirling a glass, tight-lipped and determined to sabotage your standing in front of Tanya.",
        "\"Didn't realize they were handing out charity passes to freshers tonight,\" Nate says loudly enough for two nearby committee chairs to turn their heads.",
        "You don't take the bait—you answer with one razor-dry, factual line that exposes Nate's insecure posturing without raising your voice.",
        "Nate tries a second sabotage play ten minutes later, 'accidentally' spilling tonic near your sleeve and blaming fresher clumsiness—only for Tanya to step in directly.",
        "\"Enough, Nate,\" Tanya says icily, dismissing him with a single look before turning her full attention to you. \"I've watched him pull that stunt all week. You're the first person who didn't flinch.\"",
        "Tanya walks with you out to the quiet north balcony away from the DJ booth, trading candid thoughts on running the campus council and cutting through fake prestige.",
        "Under the city lights overlooking the quad, Tanya leans against the glass rail beside you—composed, magnetic, and unmistakably drawn to your seriousness.",
        "You close out the VIP Mixer exclusively with Tanya, stepping out past midnight with the Student Council President firmly in your corner."
      ];

      if (beat === 10 && !state.mem.vipSoloResolved) {
        state.mem.vipSoloResolved = true;
        state.rep.tanya += 8;
        state.rep.nate -= 4;
        state.aura = clamp(state.aura + 4, 0, 100);
        recordChoiceMemory("ep2_vip_ended_with_tanya", "tanya", "Went to the VIP Mixer alone, shut down Nate's sabotage, and ended the night with Tanya.");
      }

      if (beat < 10) {
        return {
          text: [soloVipBeats[beat - 1]],
          choices: [
            {
              label: "Hold your frame—serious, unbothered, and sharper than Nate's sabotage.",
              action: () => {
                applyTone("factual", { targetNpc: "tanya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_alone");
              }
            }
          ]
        };
      }

      return {
        text: [soloVipBeats[9]],
        choices: [
          {
            label: "Unlock Chapter One Finale Dossier →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_finale_dossier");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE C2: VIP MIXER PARTY — GO WITH CHLOE (10 BEATS: MAX RIVALRY)
  // Low Aura -> Max leaves w/ Chloe; High Aura + High Control & Mastery -> Chloe stays;
  // High Aura + Low Control -> Trigger Fight Max option (guaranteed loss)
  // ==========================================================================
  ep2_vip_with_chloe: {
    id: "ep2_vip_with_chloe",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "VIP Mixer — With Chloe",
    presentNPCs: ["chloe", "max"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_vip_chloe_arc", "chloe", "ep2_finale_dossier", 10);
      const beat = arc.beatIndex;
      const meetsAura = state.aura >= 62;
      const highControlAndMastery = state.control >= 58 && state.mastery >= 56;
      const lowControl = state.control < 58;

      if (beat <= 4) {
        const earlyBeats = [
          "You walk past the velvet rope into the VIP Mixer with Chloe at your side, her leather jacket draped over her shoulders and golden hair catching the lounge lights.",
          "Within three minutes of grabbing drinks near the terrace, Max strolls over in his bright Australian drawl, flashing an easy grin straight at Chloe. \"Knew you'd make the VIP list, Chloe. Mind if I join the table?\"",
          "Max pulls up a stool right beside Chloe's shoulder, subtly angling his body to box you out of the conversation while talking up his track finals.",
          "Chloe glances between you and Max under lowered lashes, waiting to see how you carry yourself when another guy presses his angle."
        ];
        return {
          text: [earlyBeats[beat - 1]],
          choices: [
            {
              label: "Hold your ground at the table and read the room.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_with_chloe");
              }
            }
          ]
        };
      }

      // BRANCH 1: Fail High Aura Threshold (< 62) -> Max leaves with Chloe
      if (!meetsAura) {
        const lowAuraBeats = [
          "", "", "", "",
          "Without the High Aura needed to command the VIP lounge, Max's loud track stories and effortless charm slowly pull the center of gravity toward his side of the table.",
          "You try cutting into the banter, but your timing lands half a beat late while Max keeps Chloe laughing.",
          "Chloe checks her phone, offers you a polite, distant half-smile, and stands up as Max grabs his jacket.",
          "\"Heading down to grab food with Max before the kitchen closes,\" Chloe says smoothly—and walks out of the VIP lounge beside him.",
          "You stand alone by the terrace rail watching the elevator doors slide shut.",
          "VIP MIXER OUTCOME — Failing the High Aura threshold let Max outshine you and leave with Chloe."
        ];

        if (beat === 10 && !state.mem.vipChloeResolved) {
          state.mem.vipChloeResolved = true;
          adjustChloeMatrix(-5, -6);
          state.rep.max += 4;
          recordChoiceMemory("ep2_vip_max_took_chloe", "chloe", "Failed the High Aura check at the VIP Mixer; Max left with Chloe.");
        }

        if (beat < 10) {
          return {
            text: [lowAuraBeats[beat - 1]],
            choices: [
              {
                label: "Watch the table dynamic slip away.",
                action: () => {
                  advanceGetToKnowYouBeat();
                  goToScene("ep2_vip_with_chloe");
                }
              }
            ]
          };
        }

        return {
          text: [lowAuraBeats[9]],
          choices: [
            {
              label: "Unlock Chapter One Finale Dossier →",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_finale_dossier");
              }
            }
          ]
        };
      }

      // BRANCH 2: High Aura + Low Emotional Control -> Trigger Fight Max Option (Guaranteed Loss)
      if (lowControl) {
        if (beat === 5) {
          return {
            text: [
              "You have the High Aura to hold the room's eyes, but with low Emotional Control, Max's smug grin and hand grazing the back of Chloe's chair makes your jaw lock tight."
            ],
            choices: [
              {
                label: "Snap and swing on Max right beside the VIP lounge rail (Triggers Fight — Guaranteed Loss).",
                action: () => {
                  state.mem.foughtMax = true;
                  advanceGetToKnowYouBeat();
                  goToScene("ep2_vip_with_chloe");
                }
              },
              {
                label: "Let your temper boil over publicly—shoving Max back as the lounge goes dead silent.",
                action: () => {
                  state.mem.foughtMax = true;
                  advanceGetToKnowYouBeat();
                  goToScene("ep2_vip_with_chloe");
                }
              }
            ]
          };
        }

        const fightLossBeats = [
          "", "", "", "", "",
          "Max pivots on his track-trained heels before your swing even connects—clipping you cleanly across the jaw and dropping you hard onto the lounge carpet.",
          "Glasses shatter on the low table as two Student Union security guards rush in and pin your arms behind your back.",
          "Chloe stares down in stunned, cold embarrassment before turning away from the scene without a single word.",
          "Security escorts you out the service stairwell into the cold night air with a split lip and zero dignity left.",
          "VIP MIXER OUTCOME — Low Emotional Control baited you into fighting Max, ending in a humiliating loss in front of Chloe."
        ];

        if (beat === 10 && !state.mem.vipChloeResolved) {
          state.mem.vipChloeResolved = true;
          state.aura = clamp(state.aura - 8, 0, 100);
          adjustChloeMatrix(-8, -8);
          recordChoiceMemory("ep2_vip_lost_fight_max", "chloe", "Lost control at the VIP Mixer, fought Max, and got dropped and thrown out in front of Chloe.");
        }

        if (beat < 10) {
          return {
            text: [fightLossBeats[beat - 1]],
            choices: [
              {
                label: "Endure the fallout.",
                action: () => {
                  advanceGetToKnowYouBeat();
                  goToScene("ep2_vip_with_chloe");
                }
              }
            ]
          };
        }

        return {
          text: [fightLossBeats[9]],
          choices: [
            {
              label: "Unlock Chapter One Finale Dossier →",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_finale_dossier");
              }
            }
          ]
        };
      }

      // BRANCH 3: High Aura + High Emotional Control & Mastery -> Chloe stays with you
      const winChloeVipBeats = [
        "", "", "", "",
        "With High Aura, Emotional Control, and Mastery locked in, you don't bite on Max's posturing for a second—you lean back, drop one sharp, dry line that dismantles his flex without breaking a sweat.",
        "Max's Australian grin falters as Chloe bites back a genuine laugh, angling her chair squarely away from him and toward you.",
        "Realizing he's outmatched, Max mutters an excuse about grabbing another drink and disappears into the crowd.",
        "Alone together on the VIP terrace overlooking the quiet quad, Chloe's guarded baddie mask drops completely.",
        "She steps close against the glass rail, fingers lacing into yours as the city lights blur beneath you.",
        "VIP MIXER OUTCOME — High Aura, Control, and Mastery kept you untouchable; Max walked away alone and Chloe stayed with you."
      ];

      if (beat === 10 && !state.mem.vipChloeResolved) {
        state.mem.vipChloeResolved = true;
        adjustChloeMatrix(4, 4);
        state.aura = clamp(state.aura + 4, 0, 100);
        recordChoiceMemory("ep2_vip_chloe_stayed", "chloe", "Outclassed Max at the VIP Mixer with high Aura, Control, and Mastery; Chloe stayed with you.");
      }

      if (beat < 10) {
        return {
          text: [winChloeVipBeats[beat - 1]],
          choices: [
            {
              label: "Keep your composure effortless as the night closes in.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_with_chloe");
              }
            }
          ]
        };
      }

      return {
        text: [winChloeVipBeats[9]],
        choices: [
          {
            label: "Unlock Chapter One Finale Dossier →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_finale_dossier");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // STANDARD NIGHT 2 CLOSING -> CONVERGES INTO FINALE DOSSIER
  // ==========================================================================
  ep2_night2_close: {
    id: "ep2_night2_close",
    chapter: "CHAPTER I · END OF EPISODE II",
    title: "Quiet Quad",
    presentNPCs: [],
    render: () => ({
      text: [
        "You cross the empty quad beneath cool autumn stars as the distant bass from the VIP Mixer fades behind the stone arches.",
        "Two days in, every alliance, rivalry, and unspoken tension on this campus has been set in motion."
      ],
      choices: [
        {
          label: "Unlock Chapter One Finale Dossier →",
          action: () => {
            goToScene("ep2_finale_dossier");
          }
        }
      ]
    })
  },

  // ==========================================================================
  // CHAPTER ONE FINALE DOSSIER (REVEALS ALL HIDDEN STATS, MATRIX & MEMORY LOG)
  // ==========================================================================
  ep2_finale_dossier: {
    id: "ep2_finale_dossier",
    chapter: "CHAPTER I · FINALE DOSSIER",
    title: "The Unsealed Ledger",
    presentNPCs: [],
    render: () => {
      const girls = ["maya", "brandy", "mandy", "tanya"];
      if (knowsLaura(state)) girls.push("laura");

      const hotLines = girls.map((g) => {
        const name = CHARACTERS[g] ? CHARACTERS[g].name : g;
        return `${name}: ${getGirlStatus(g, state)} (Rep ${state.rep[g] || 0})`;
      });

      const memLines = state.memoryLog.length
        ? state.memoryLog.map((m) => `• [Ep.${m.episode}] ${m.text} (Witnesses: ${m.witnesses.join(", ")})`)
        : ["• No major witness flags logged."];

      return {
        text: [
          "CHAPTER ONE COMPLETE — All concealed psychological ledgers, Chloe's 2x2 Matrix, Cohort HOT/NOT standings, and witnessed Choice Memories are now unsealed:",
          `SOCIAL READ: ${computeSocialRead(state)} | CASH: $${state.cash} | GRADES: ${state.grades}`,
          `HIDDEN STATS — Aura: ${state.aura} | Mastery of Self: ${state.mastery} | Emotional Control: ${state.control} | Life Outlook: ${state.outlook} | Luck: ${state.luck}`,
          `CHLOE REED MATRIX — Comfort: ${state.comfort} | Tension: ${state.tension} | Active Box: ${state.chloeMode} (PURSUE threshold: Tension >= 24)`,
          `COHORT FEMALE STANDINGS (SCENE-SCOPED WITNESSING) — ${hotLines.join(" | ")}`,
          `WITNESSED CHOICE-MEMORY LOG:\n${memLines.join("\n")}`
        ],
        choices: [
          {
            label: "Begin a New Playthrough of Meet Chloe — Chapter One",
            action: () => {
              state = INITIAL_STATE();
              renderHUD();
              goToScene("warmup_1");
            }
          }
        ]
      };
    }
  }
};
