// ============================================================================
// MEET CHLOE — CHAPTER ONE: EPISODE TWO, PART 1 (episode2_part1.js)
// Covers Scenes 1–4:
// - Scene 1: Mandatory Fresher Orientation (Stat-gated Event Coordination & Speech vs Dean Speech + 5-beat Cohort Arcs)
// - Scene 2: Get Active Aerobics & Tactical Campus Hide & Seek (Max)
// - Scene 3: Student Council Q&A & Job Checks (Tanya & Nate)
// - Scene 4: Campus Lunch (Minimum 8 story beats per in-scene person -> causes lateness to Scene 5)
// Depends on: characters.js, engine.js
// ============================================================================

const EPISODE2_PART1_SCENES = {
  // ==========================================================================
  // SCENE 1: MANDATORY FRESHER ORIENTATION
  // ==========================================================================
  ep2_orientation: {
    id: "ep2_orientation",
    chapter: "CHAPTER I · EPISODE II",
    title: "Mandatory Fresher Orientation",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot", "tanya", "nate"],
    render: () => {
      const canCoordinate = state.aura >= 54 && state.control >= 52;
      const night1Note =
        state.mem.night1Ending === "chloe_stay"
          ? "Chloe catches your eye near the third row of folding chairs, adjusting the collar of her cropped blazer with a faint, knowing half-smile before looking away when Maya leans over to whisper something in her ear."
          : state.mem.night1Ending === "flipped_lib"
            ? "Your notes from midnight are tucked cleanly inside your jacket; Elliot shoots you a tight, calculating glance from the front row as if he already heard you stayed in the stacks till closing."
            : "You step through the oak doors of the Main Auditorium right at 8:55 AM, taking in the packed fresher cohort under high arched windows.";

      return {
        text: [
          "Sunlight slants across the Main Auditorium's polished floorboards as three hundred freshers crowd the folding rows. Behind the brass podium, Student Council President Tanya—tall, dark-skinned Haitian, posture razor-sharp in a tailored navy blazer—checks her clipboard beside Vice President Nate, who leans against the stage rail adjusting a silver watch.",
          night1Note,
          "Beside Chloe sits Maya—the girl from the back stairwell in her soft-spoken, grounded girl-next-door cardigan and jeans—leaning in with easy familiarity. Chloe's childhood best friend, hiding in plain sight all along.",
          canCoordinate
            ? "Near the stage steps, a harried faculty coordinator scans the front aisle for a student lead to help organize the fresher seating blocks and deliver the two-minute student welcome before the Dean takes the floor."
            : "Tanya taps the microphone twice to quiet the hall as the Dean steps toward the podium to deliver the official opening address."
        ],
        choices: canCoordinate
          ? [
              {
                label: "Step up to coordinate the Orientation floor and deliver the opening student speech.",
                action: () => {
                  state.mem.coordinatedOrientation = true;
                  goToScene("ep2_orientation_speech");
                }
              },
              {
                label: "Pass on the podium and take your seat in the auditorium as the Dean steps up to speak.",
                action: () => {
                  state.mem.coordinatedOrientation = false;
                  goToScene("ep2_dean_speech");
                }
              }
            ]
          : [
              {
                label: "Find a vantage point as the Dean steps up to the podium.",
                action: () => {
                  state.mem.coordinatedOrientation = false;
                  goToScene("ep2_dean_speech");
                }
              }
            ]
      };
    }
  },

  ep2_orientation_speech: {
    id: "ep2_orientation_speech",
    chapter: "CHAPTER I · EPISODE II",
    title: "The Auditorium Podium",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot", "tanya", "nate"],
    render: () => {
      const speechSuccess = state.aura >= 58 && state.mastery >= 54;
      if (speechSuccess && !state.mem.orientationSpeechResolved) {
        state.mem.orientationSpeechResolved = true;
        state.mem.orientationSpeechSuccess = true;
        state.aura = clamp(state.aura + 5, 0, 100);
        state.control = clamp(state.control + 3, 0, 100);
        state.rep.tanya += 5;
        state.rep.chloe += 3;
        adjustChloeMatrix(1, 3);
        recordChoiceMemory(
          "ep2_speech_success",
          "tanya",
          "Coordinated Orientation and delivered a commanding opening speech in front of the cohort.",
          ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot", "nate"]
        );
      } else if (!speechSuccess && !state.mem.orientationSpeechResolved) {
        state.mem.orientationSpeechResolved = true;
        state.mem.orientationSpeechSuccess = false;
        state.aura = clamp(state.aura - 4, 0, 100);
        state.rep.nate -= 3;
        state.rep.elliot += 2;
        adjustChloeMatrix(-2, -2);
        recordChoiceMemory(
          "ep2_speech_fail",
          "nate",
          "Stumbled under the auditorium lights during the Orientation opening speech.",
          ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot", "tanya"]
        );
      }

      return {
        text: speechSuccess
          ? [
              "You direct the late-arriving rows into place with two crisp gestures, step behind the brass podium, and wait one full second until the low murmur in the auditorium drops dead silent.",
              "You don't read off the laminated cue card. You deliver ninety seconds of dry, grounded candor about surviving the first week without losing your head—drawing a sharp laugh from Malik in the back, an approving nod from Tanya beside the curtain, and a slow, sideways smirk from Chloe in row three.",
              "When you step down from the stage, half the room is already looking to see which row you'll claim."
            ]
          : [
              "You get the rows seated cleanly enough, but the moment you step behind the podium, feedback whines through the overhead speakers and your opening line lands flat in the cavernous hall.",
              "Nate smirks behind his hand beside the stage curtain while Elliot scribbles something smug in his margin. You wrap up briskly and step down into the aisle with heat creeping up your collar."
            ],
        choices: [
          {
            label: "Take the open seat beside Chloe and Maya in row three.",
            action: () => {
              startGetToKnowYouArc("ep2_orient_chloe_maya", "chloe", "ep2_get_active", 5);
              goToScene("ep2_orient_arc_chloe_maya");
            }
          },
          {
            label: "Drop into the aisle seats beside identical Latina twins Brandy and Mandy.",
            action: () => {
              startGetToKnowYouArc("ep2_orient_twins", "brandy", "ep2_get_active", 5);
              goToScene("ep2_orient_arc_twins");
            }
          },
          {
            label: "Walk toward the shadowed rear exit where a goth girl in oversized black layers stands alone.",
            action: () => {
              state.mem.knowsLaura = true;
              startGetToKnowYouArc("ep2_orient_laura", "laura", "ep2_get_active", 5);
              goToScene("ep2_orient_arc_laura");
            }
          },
          {
            label: "Head up to the back bleachers with Rob and Malik.",
            action: () => {
              startGetToKnowYouArc("ep2_orient_backrow", "malik", "ep2_get_active", 5);
              goToScene("ep2_orient_arc_backrow");
            }
          }
        ]
      };
    }
  },

  ep2_dean_speech: {
    id: "ep2_dean_speech",
    chapter: "CHAPTER I · EPISODE II",
    title: "The Dean's Address",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot", "tanya", "nate"],
    render: () => ({
      text: [
        "Dean Harlan steps behind the brass podium, adjusting bifocals as he launches into a twenty-minute sermon on academic integrity, campus curfews, and 'shaping tomorrow's leaders.'",
        "Within three minutes, half the auditorium has slumped into their collars. Across the aisle, identical Latina twins Brandy and Mandy trade silent eye-rolls; in row three, Maya whispers something under her breath that makes Chloe bite back a laugh; and near the back fire exit, a moody goth girl in oversized black layers leans against the cinderblock wall with her arms crossed.",
        "You have plenty of breathing room while the Dean drones on to pick your company."
      ],
      choices: [
        {
          label: "Slide into the empty chair beside Chloe and Maya in row three.",
          action: () => {
            startGetToKnowYouArc("ep2_orient_chloe_maya", "chloe", "ep2_get_active", 5);
            goToScene("ep2_orient_arc_chloe_maya");
          }
        },
        {
          label: "Take the open seats beside Brandy and Mandy near the center aisle.",
          action: () => {
            startGetToKnowYouArc("ep2_orient_twins", "brandy", "ep2_get_active", 5);
            goToScene("ep2_orient_arc_twins");
          }
        },
        {
          label: "Step back toward the rear exit where the goth girl in oversized black layers is standing.",
          action: () => {
            state.mem.knowsLaura = true;
            startGetToKnowYouArc("ep2_orient_laura", "laura", "ep2_get_active", 5);
            goToScene("ep2_orient_arc_laura");
          }
        },
        {
          label: "Climb up to the back bleachers with Rob and Malik.",
          action: () => {
            startGetToKnowYouArc("ep2_orient_backrow", "malik", "ep2_get_active", 5);
            goToScene("ep2_orient_arc_backrow");
          }
        }
      ]
    })
  },

  // ==========================================================================
  // ORIENTATION 5-BEAT ARCS (CHLOE & MAYA / BRANDY & MANDY / LAURA / ROB & MALIK)
  // ==========================================================================
  ep2_orient_arc_chloe_maya: {
    id: "ep2_orient_arc_chloe_maya",
    chapter: "CHAPTER I · EPISODE II",
    title: "Row Three — Best Friends",
    presentNPCs: ["chloe", "maya"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_orient_chloe_maya", "chloe", "ep2_get_active", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Maya looks up first as you sit down, her soft-spoken, grounded girl-next-door warmth immediately brightening when she recognizes you. \"Oh—hi!\" Maya says softly, glancing between you and Chloe. \"Chloe, this is the person I told you about from yesterday.\"",
            "Chloe freezes for half a beat, eyes narrowing slightly as she looks from Maya's knit cardigan to your face. \"Wait. You two already know each other?\""
          ],
          choices: [
            {
              label: "\"Maya saved me from tripping over spilled binders on the back stairs. Small campus.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Apparently you're the mysterious best friend Maya mentioned. Explains a lot.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"We crossed paths between lectures yesterday. Didn't realize you two came from the same town.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Relax, Chloe—not everything revolves around your seating chart.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            "Chloe lets out a quiet breath, nudging Maya's knee with hers under the folding chair. \"Since grade six,\" Chloe admits dryly. \"Maya's the only person on this campus who knew me before I owned a pair of heels.\"",
            "Maya smiles gently, folding her hands over her notebook. \"And Chloe's still the only person who tells me when I'm overthinking.\""
          ],
          choices: [
            {
              label: "\"Good balance. Somebody has to keep Chloe's ego within building limits.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Having someone from home who actually knows you is rare here. Hold onto that.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "Up on stage, Tanya announces that the mandatory 'Get Active' outdoor athletic session starts in ten minutes on the south turf.",
            "Chloe grimaces slightly, glancing down at her heeled ankle boots. \"Tell me we're not actually running laps in this outfit.\""
          ],
          choices: [
            {
              label: "\"Watching you sprint in heels might be the highlight of Orientation.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"It's mostly partner drills and group games. Pace yourself and you'll be fine.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            "Maya already has spare canvas sneakers tucked inside her tote bag—she pulls them out quietly and offers Chloe a knowing look. \"I packed your flats in the side pocket because I knew you'd wear the boots.\"",
            "Chloe's guarded expression melts for a split second into genuine gratitude. \"Literal lifesaver.\""
          ],
          choices: [
            {
              label: "\"Maya's carrying the whole team before we even reach the turf.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Smart planning. Always pack for the second half of the schedule.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            }
          ]
        };
      }

      return {
        text: [
          "The auditorium doors swing open as the cohort files out toward the south athletic turf."
        ],
        choices: [
          {
            label: "Walk out to the south turf for Get Active.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_get_active");
            }
          }
        ]
      };
    }
  },

  ep2_orient_arc_twins: {
    id: "ep2_orient_arc_twins",
    chapter: "CHAPTER I · EPISODE II",
    title: "Center Aisle — Brandy & Mandy",
    presentNPCs: ["brandy", "mandy"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_orient_twins", "brandy", "ep2_get_active", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Identical Latina twins sit side by side with mirrored posture, yet their styling splits two distinct ways: Brandy wears bold gold chains, glossy red-tinted lips, and a fitted leather moto vest; Mandy wears sleek silver hoops, a cropped dark cardigan, and a sharp, playful smirk.",
            "Brandy looks you up and down without bothering to hide it. \"Bold move sitting next to two girls who finish each other's insults.\""
          ],
          choices: [
            {
              label: "\"Good. Double the target practice—let's see which twin actually has the faster comeback.\"",
              action: () => {
                state.rep.brandy += 3;
                state.rep.mandy += 3;
                applyTone("tease", { targetNpc: "brandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            },
            {
              label: "\"The seats were open and the Dean's voice was putting me to sleep.\"",
              action: () => {
                state.rep.brandy += 1;
                state.rep.mandy -= 2;
                applyTone("factual", { targetNpc: "mandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            },
            {
              label: "\"Honestly, you two are the best-dressed people in this entire auditorium.\"",
              action: () => {
                state.rep.brandy -= 3;
                state.rep.mandy += 1;
                applyTone("complimentary", { targetNpc: "brandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            },
            {
              label: "\"Keep the chatter down—some of us are trying to hear the schedule.\"",
              action: () => {
                state.rep.brandy -= 4;
                state.rep.mandy -= 4;
                applyTone("bully", { targetNpc: "brandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            "Mandy leans forward past Brandy's shoulder, resting her chin in her hand. \"I'm Mandy, that's Brandy. First test: tell us apart without squinting at our outfits.\"",
            "Brandy crosses her arms, waiting with an amused challenge in her dark eyes."
          ],
          choices: [
            {
              label: "\"Easy. Brandy looks like she starts the fire; Mandy looks like she hands her the matches.\"",
              action: () => {
                state.rep.brandy += 4;
                state.rep.mandy += 4;
                applyTone("tease", { targetNpc: "mandy", memoryTag: "ep2_read_twins_right", memoryText: "Nailed Brandy and Mandy's dynamic on the first try at Orientation." });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            },
            {
              label: "\"Mandy's left eyebrow lifts a fraction higher whenever she's about to say something sarcastic.\"",
              action: () => {
                state.rep.mandy += 3;
                applyTone("factual", { targetNpc: "mandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "Brandy lets out a sharp laugh, nudging Mandy's boot. \"Okay, keep him around—he actually pays attention.\"",
            "Mandy glances up toward the stage where Nate is whispering to Tanya. \"Word is there's a campus shelter hangout tonight after classes. None of that stiff Student Council punch-bowl nonsense.\""
          ],
          choices: [
            {
              label: "\"Count me in. Save me a spot away from Nate's monologue.\"",
              action: () => {
                state.rep.brandy += 2;
                state.rep.mandy += 2;
                applyTone("tease", { targetNpc: "brandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            },
            {
              label: "\"Good to know. Who's organizing it?\"",
              action: () => {
                applyTone("factual", { targetNpc: "mandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            "\"Rob, Malik, and half the fresher floor,\" Mandy says, standing up as the auditorium rows begin to empty toward the athletic field. \"Try not to pass out during Get Active.\""
          ],
          choices: [
            {
              label: "\"Worry about yourselves—I'll be fine.\"",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            }
          ]
        };
      }

      return {
        text: [
          "The twin sisters fall into step beside the main aisle crowd heading out toward the south turf."
        ],
        choices: [
          {
            label: "Head out to the south turf for Get Active.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_get_active");
            }
          }
        ]
      };
    }
  },

  ep2_orient_arc_laura: {
    id: "ep2_orient_arc_laura",
    chapter: "CHAPTER I · EPISODE II",
    title: "Shadowed Exit — Laura",
    presentNPCs: ["laura"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_orient_laura", "laura", "ep2_get_active", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Near the rear fire exit, away from the bright stage lights, stands Laura—pale skin, dark smudged eyeliner, oversized black knit layers draped over a pleated dark skirt and heavy platform boots.",
            "She watches the Dean's speech with deadpan disdain, glancing sideways when you stop beside the wall. \"If you're about to tell me 'Orientation is what you make of it,' save your breath.\""
          ],
          choices: [
            {
              label: "\"Relax. I came back here because the front rows smelled like forced enthusiasm.\"",
              action: () => {
                state.rep.laura += 4;
                applyTone("factual", { targetNpc: "laura", memoryTag: "ep2_met_laura", memoryText: "Met Laura by the rear auditorium exit and bonded over hating forced Orientation cheer." });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Standing by the fire exit in all black—plotting an escape or just haunting the building?\"",
              action: () => {
                state.rep.laura += 3;
                applyTone("bully", { targetNpc: "laura", memoryTag: "ep2_met_laura", memoryText: "Met Laura by the rear exit and traded deadpan jabs." });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Honestly, your whole aesthetic is super cool. Way better than everyone else here.\"",
              action: () => {
                state.rep.laura -= 4;
                applyTone("complimentary", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Careful, smile too hard and you might crack the eyeliner.\"",
              action: () => {
                state.rep.laura -= 3;
                applyTone("tease", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.rep.laura >= 2
              ? "Laura's mouth twitches slightly—the closest thing to approval she offers. \"Laura,\" she says bluntly. \"And yes, I already mapped every exit out of this building before 9:05.\""
              : "Laura rolls her eyes slowly, shifting one platform boot against the baseboard. \"Laura. And I didn't ask for an audience.\""
          ],
          choices: [
            {
              label: "\"Smart. Knowing the exits saves time when mandatory events drag on.\"",
              action: () => {
                state.rep.laura += 3;
                applyTone("factual", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Good thing I'm not asking for your autograph then.\"",
              action: () => {
                state.rep.laura += 3;
                applyTone("bully", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "Laura glances toward the stage as Tanya announces the outdoor Get Active block. \"Forced group aerobics in sunlight,\" Laura mutters flatly. \"I'm skipping that circus and sitting under the library colonnade until lunch.\""
          ],
          choices: [
            {
              label: "\"Can't blame you. Try not to melt in the shade.\"",
              action: () => {
                state.rep.laura += 2;
                applyTone("factual", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Suit yourself—some of us actually show up when the whistle blows.\"",
              action: () => {
                state.rep.laura += 2;
                applyTone("bully", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            "Laura pushes open the side fire door quietly, pausing half a beat before slipping out. \"Maybe see you at the shelter tonight if it doesn't turn into a pep rally.\""
          ],
          choices: [
            {
              label: "Give her a brief nod and head toward the south athletic turf.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            }
          ]
        };
      }

      return {
        text: [
          "The side door clicks shut behind Laura while the main cohort files out onto the grass."
        ],
        choices: [
          {
            label: "Join the cohort at Get Active.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_get_active");
            }
          }
        ]
      };
    }
  },

  ep2_orient_arc_backrow: {
    id: "ep2_orient_arc_backrow",
    chapter: "CHAPTER I · EPISODE II",
    title: "Back Bleachers — Rob & Malik",
    presentNPCs: ["rob", "malik"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_orient_backrow", "malik", "ep2_get_active", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Rob and Malik occupy the highest wooden tier at the back of the hall. Malik gestures toward the stage with his chin. \"Watch out for the track guy running Get Active next—Max. Australian transfer, runs sprints, acts like every girl on campus is his personal fan club.\""
          ],
          choices: [
            {
              label: "\"Let him talk. Speed on a track doesn't mean anything off it.\"",
              action: () => {
                state.rep.rob += 3;
                state.rep.malik += 2;
                applyTone("factual", { targetNpc: "rob" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_backrow");
              }
            },
            {
              label: "\"Sounds like Malik's worried Max is going to steal his spotlight.\"",
              action: () => {
                state.rep.malik += 3;
                applyTone("tease", { targetNpc: "malik" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_backrow");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            "Rob chuckles, cracking his knuckles. \"He already tried talking to Chloe outside the doors at 8:50. She gave him the dry look, though he didn't take the hint.\""
          ],
          choices: [
            {
              label: "\"Good to know. We'll see how sharp his instincts really are.\"",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_backrow");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "Malik leans forward over his knees. \"Also, word is after the afternoon class, everybody's meeting at the old pavilion shelter near the west pines. No faculty, no Student Council rules.\""
          ],
          choices: [
            {
              label: "\"Count me in.\"",
              action: () => {
                state.rep.malik += 2;
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_backrow");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            "The auditorium doors swing wide as Tanya dismisses the rows toward the south turf."
          ],
          choices: [
            {
              label: "Walk down the bleachers with Rob and Malik.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_backrow");
              }
            }
          ]
        };
      }

      return {
        text: [
          "Bright morning sun hits your shoulders as you step out onto the south athletic turf."
        ],
        choices: [
          {
            label: "Step onto the turf for Get Active.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_get_active");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 2: GET ACTIVE (MAX) & TACTICAL CAMPUS HIDE & SEEK
  // ==========================================================================
  ep2_get_active: {
    id: "ep2_get_active",
    chapter: "CHAPTER I · EPISODE II",
    title: "Get Active — South Turf",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "max"], // Laura NOT present
    render: () => ({
      text: [
        "Out on the sun-drenched south turf, a silver whistle hangs around the neck of Max—lean, sun-bronzed Australian track athlete in a sleeveless singlet, radiating relentless golden-retriever energy as he jogs backward in front of the cohort.",
        "\"Alright legends, wake those legs up!\" Max calls out in a bright Australian drawl, clapping twice. \"Five minutes of dynamic conditioning, then we're running a full-sector Campus Hide & Seek across the quad before Student Council!\"",
        "Before the whistle even finishes echoing, Max jogs straight over toward Chloe and Maya, flashing an easy grin. \"Need a warm-up partner, Chloe? I'll keep the pace honest.\""
      ],
      choices: [
        {
          label: "Step in smoothly and match Max's pace on the conditioning drills—showing effortless athleticism.",
          action: () => {
            state.aura = clamp(state.aura + 4, 0, 100);
            state.control = clamp(state.control + 2, 0, 100);
            adjustChloeMatrix(1, 3);
            applyTone("tease", { chloeDirect: true, targetNpc: "max", memoryTag: "ep2_outpaced_max", memoryText: "Matched Max's conditioning pace effortlessly on the south turf." });
            goToScene("ep2_hide_and_seek");
          }
        },
        {
          label: "Join Max's inner circle with Rob and Malik, keeping the energy high without forcing anything.",
          action: () => {
            state.rep.max += 4;
            state.rep.rob += 2;
            applyTone("factual", { targetNpc: "max" });
            goToScene("ep2_hide_and_seek");
          }
        },
        {
          label: "Hang back near Brandy and Mandy, trading dry commentary while Max over-performs.",
          action: () => {
            state.rep.brandy += 3;
            state.rep.mandy += 3;
            applyTone("tease", { targetNpc: "brandy" });
            goToScene("ep2_hide_and_seek");
          }
        }
      ]
    })
  },

  ep2_hide_and_seek: {
    id: "ep2_hide_and_seek",
    chapter: "CHAPTER I · EPISODE II",
    title: "Tactical Campus Hide & Seek",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "max"],
    render: () => ({
      text: [
        "Max blows two sharp blasts on his whistle. \"Ten minutes on the clock! Hiders scatter between the quad hedges, the library colonnade, and the old bleachers—seekers sweep!\"",
        "Out of the corner of your eye, you catch Max steering Chloe toward the stone arches of the Library Colonnade before the countdown even hits five. You draw Seeker duty alongside Malik.",
        "Which sector do you sweep first?"
      ],
      choices: [
        {
          label: "Sweep the Library Colonnade arches immediately—cutting off Max and Chloe's hiding spot.",
          action: () => {
            state.mem.wonHideAndSeek = true;
            state.aura = clamp(state.aura + 4, 0, 100);
            state.luck = clamp(state.luck + 2, 0, 100);
            adjustChloeMatrix(2, 4);
            state.rep.max -= 2;
            recordChoiceMemory(
              "ep2_found_chloe_max",
              "chloe",
              "Tracked down Chloe and Max behind the Library Colonnade during Hide & Seek.",
              ["max", "malik"]
            );
            goToScene("ep2_student_council");
          }
        },
        {
          label: "Check the East Courtyard Hedges where Brandy, Mandy, and Maya ducked behind the stone planters.",
          action: () => {
            state.rep.maya += 3;
            state.rep.brandy += 2;
            state.rep.mandy += 2;
            applyTone("tease", { targetNpc: "mandy" });
            goToScene("ep2_student_council");
          }
        },
        {
          label: "Sweep the Sports Bleachers and trust your Luck to catch stragglers before the whistle.",
          action: () => {
            if (state.luck >= 54) {
              state.mem.wonHideAndSeek = true;
              state.aura = clamp(state.aura + 3, 0, 100);
            }
            goToScene("ep2_student_council");
          }
        }
      ]
    })
  },

  // ==========================================================================
  // SCENE 3: STUDENT COUNCIL Q&A & JOB CHECKS (TANYA & NATE)
  // ==========================================================================
  ep2_student_council: {
    id: "ep2_student_council",
    chapter: "CHAPTER I · EPISODE II",
    title: "Student Council Assembly",
    presentNPCs: ["tanya", "nate", "elliot", "chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => {
      const wonSeekNote = state.mem.wonHideAndSeek
        ? "Chloe still wears a faint, begrudging smirk from being caught behind the Library Colonnade two minutes before the whistle."
        : "The cohort files into the Student Union hall still catching their breath from the turf.";

      return {
        text: [
          wonSeekNote,
          "At the front of the Student Union hall, President Tanya—commanding, dark-skinned Haitian, clipboard held steady against one hip—steps up beside Vice President Nate, whose tailored jacket and smug posture broadcast old money.",
          "\"Student Council has two paid fresher liaison slots open this term,\" Tanya says crisply, her gaze sweeping the room. \"We don't hire flatterers, and we don't hire dead weight. Nate and I are taking three questions and sizing up who actually knows how this campus operates.\"",
          "Nate smirks, tapping a stack of silver-embossed VIP Mixer wristbands resting on the table beside him. \"And for anyone who proves they belong in the inner circle, there are perks.\""
        ],
        choices: [
          {
            label: "Deliver a sharp, practical breakdown of fresher transit & study-space bottlenecks—impressing Tanya directly.",
            action: () => {
              if (state.mastery >= 54 && state.aura >= 54) {
                state.mem.passedJobCheck = true;
                state.mem.hasVIPWristband = true;
                state.cash += 45;
                state.rep.tanya += 6;
                promoteGrade();
                applyTone("factual", {
                  targetNpc: "tanya",
                  memoryTag: "ep2_tanya_job_offer",
                  memoryText: "Passed Tanya's Student Council Q&A check, earning the paid liaison offer and VIP wristband.",
                  extraWitnesses: ["nate", "chloe", "elliot"]
                });
              } else {
                state.mem.passedJobCheck = false;
                state.rep.tanya -= 2;
                applyTone("factual", { targetNpc: "tanya" });
              }
              goToScene("ep2_lunch");
            }
          },
          {
            label: "Call Nate's bluff on the VIP wristbands with dry wit—testing your Control against his ego.",
            action: () => {
              if (state.control >= 56 && state.aura >= 56) {
                state.mem.passedJobCheck = true;
                state.mem.hasVIPWristband = true;
                state.rep.nate += 3;
                state.rep.brandy += 2;
                applyTone("tease", {
                  targetNpc: "nate",
                  memoryTag: "ep2_outmaneuvered_nate",
                  memoryText: "Outmaneuvered VP Nate in front of the hall and secured a VIP wristband.",
                  extraWitnesses: ["tanya", "chloe", "brandy", "mandy"]
                });
              } else {
                state.mem.passedJobCheck = false;
                state.rep.nate -= 5;
                applyTone("tease", { targetNpc: "nate" });
              }
              goToScene("ep2_lunch");
            }
          },
          {
            label: "Try flattering Tanya and Nate's leadership in front of the room.",
            action: () => {
              // Tanya despises ass-kissers -> automatic job check fail
              state.mem.passedJobCheck = false;
              state.rep.tanya -= 6;
              state.rep.nate -= 2;
              applyTone("complimentary", { targetNpc: "tanya" });
              goToScene("ep2_lunch");
            }
          },
          {
            label: "Sit back silently and let Elliot scramble for the podium mic.",
            action: () => {
              state.mem.passedJobCheck = false;
              state.rep.elliot += 2;
              goToScene("ep2_lunch");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 4: CAMPUS LUNCH (MINIMUM 8 STORY BEATS PER IN-SCENE PERSON)
  // Leads directly to running late for Scene 5 Post-Afternoon Class
  // ==========================================================================
  ep2_lunch: {
    id: "ep2_lunch",
    chapter: "CHAPTER I · EPISODE II",
    title: "Midday Courtyard & Dining Hall",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => ({
      text: [
        "By 12:15 PM, the Student Union doors burst open into the midday sun. Students spill across the courtyard benches and dining terrace with trays, iced coffees, and takeout boxes.",
        "Whoever you sit down with for lunch isn't just a quick hello—the conversation runs deep enough that before anyone checks the clock, the afternoon bell will already be ringing. And whoever you stay with through lunch will end up walking into the post-afternoon class beside you."
      ],
      choices: [
        {
          label: "Take the corner courtyard table with Chloe and Maya (8-Beat Deep Dive).",
          action: () => {
            state.mem.lunchCompanion = "chloe_maya";
            startGetToKnowYouArc("ep2_lunch_chloe_maya", "chloe", "ep2_scene5_router", 8);
            goToScene("ep2_lunch_arc_chloe_maya");
          }
        },
        {
          label: "Pull up a bench with Brandy and Mandy by the terrace steps (8-Beat Deep Dive).",
          action: () => {
            state.mem.lunchCompanion = "twins";
            startGetToKnowYouArc("ep2_lunch_twins", "brandy", "ep2_scene5_router", 8);
            goToScene("ep2_lunch_arc_twins");
          }
        },
        ...(knowsLaura(state)
          ? [
              {
                label: "Walk over to the shaded library steps where Laura sits alone with black coffee (8-Beat Deep Dive).",
                action: () => {
                  state.mem.lunchCompanion = "laura";
                  startGetToKnowYouArc("ep2_lunch_laura", "laura", "ep2_scene5_router", 8);
                  goToScene("ep2_lunch_arc_laura");
                }
              }
            ]
          : []),
        {
          label: "Grab trays at the back table with Rob and Malik (8-Beat Deep Dive).",
          action: () => {
            state.mem.lunchCompanion = "backrow";
            startGetToKnowYouArc("ep2_lunch_backrow", "malik", "ep2_scene5_router", 8);
            goToScene("ep2_lunch_arc_backrow");
          }
        },
        {
          label: "Eat alone by the west quad wall, keeping your own counsel.",
          action: () => {
            state.mem.lunchCompanion = "alone";
            state.control = clamp(state.control + 2, 0, 100);
            goToScene("ep2_scene5_router");
          }
        }
      ]
    })
  },

  // --------------------------------------------------------------------------
  // 8-BEAT LUNCH ARC A: CHLOE & MAYA (BEATS 1–8 -> LATE TO SCENE 5)
  // --------------------------------------------------------------------------
  ep2_lunch_arc_chloe_maya: {
    id: "ep2_lunch_arc_chloe_maya",
    chapter: "CHAPTER I · EPISODE II",
    title: "Lunch — Chloe & Maya",
    presentNPCs: ["chloe", "maya"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_lunch_chloe_maya", "chloe", "ep2_scene5_router", 8);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Chloe claims the sunlit end of the stone bench, sunglasses perched on top of her golden hair, while Maya unwraps a homemade sandwich beside her with calm, unhurried grace.",
            "\"Okay, real talk,\" Chloe says, resting her chin in her palm. \"After two days of this place, who's actually real and who's putting on a costume?\""
          ],
          choices: [
            {
              label: "\"Maya's the only one not wearing a costume. You're still half-in-character, Chloe.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Nate and Elliot are pure performance. Most people here are just nervous.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Honestly, sitting with you two feels like the first real break all day.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Almost everybody here is fake—yourself included when you're around the front row.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            "Maya hides a quiet smile behind her water bottle while Chloe narrows her eyes at you across the table. \"Excuse me, I do not wear a costume,\" Chloe protests, though there's zero real heat behind it.",
            "Maya leans forward slightly. \"She spent forty minutes picking out that cropped jacket before 8 AM so nobody would guess she stayed up outlining macroeconomics.\""
          ],
          choices: [
            {
              label: "\"Forty minutes? And here I thought the effortless baddie look took five.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Maya's just exposing the whole operation at lunch.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "Chloe groans, burying her face in one hand for a second before looking back up with a wry grin. \"Traitors. Both of you.\"",
            "Maya turns to you with quiet curiosity. \"What about you? Where did you grow up before coming here?\""
          ],
          choices: [
            {
              label: "Share a grounded, honest detail about home and why you chose this program.",
              action: () => {
                state.rep.maya += 3;
                adjustChloeMatrix(2, 0);
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Somewhere quiet enough that campus drama feels like free theater.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            "A breeze catches the corner of Chloe's napkin; you catch it before it blows off the stone table. Chloe's fingers brush yours as she takes it back, lingering half a beat longer than necessary.",
            "\"Max asked if we're going to the pavilion shelter hangout after the last class,\" Chloe mentions casually, watching your eyes to see your reaction."
          ],
          choices: [
            {
              label: "\"Of course Max did. Good thing I'll already be there.\"",
              action: () => {
                adjustChloeMatrix(1, 3);
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Maya going too? If you two are there, I'll swing by.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 5) {
        return {
          text: [
            "Maya nods softly. \"I'm going for a little while—Chloe promised we wouldn't stay if it gets sloppy.\"",
            "Chloe rolls her eyes playfully. \"I said I'd behave. Mostly.\""
          ],
          choices: [
            {
              label: "\"'Mostly' sounds like a liability, Reed.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Smart having a cutoff time.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 6) {
        return {
          text: [
            "The conversation drifts effortlessly into music, terrible hometown summer jobs, and which professors grade on a curve. For the first time since Orientation began, Chloe isn't checking her phone every thirty seconds."
          ],
          choices: [
            {
              label: "Keep the banter easy and unhurried.",
              action: () => {
                adjustChloeMatrix(2, 1);
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      if (beat === 7) {
        return {
          text: [
            "Suddenly, Maya glances down at her wristwatch and freezes. \"Chloe... it's 1:52. Post-afternoon seminar started seven minutes ago.\"",
            "Chloe's eyes go wide behind her sunglasses as she grabs her bag. \"Are you kidding me? Vance is going to lock the door!\""
          ],
          choices: [
            {
              label: "\"Grab your bags—we cut through the west arcade and walk in together.\"",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      return {
        text: [
          "You, Chloe, and Maya hurry up the Block B stairs together—already seven minutes late for the post-afternoon class."
        ],
        choices: [
          {
            label: "Reach the door of the post-afternoon lecture hall →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_scene5_router");
            }
          }
        ]
      };
    }
  },

  // --------------------------------------------------------------------------
  // 8-BEAT LUNCH ARC B: BRANDY & MANDY (BEATS 1–8 -> LATE TO SCENE 5)
  // --------------------------------------------------------------------------
  ep2_lunch_arc_twins: {
    id: "ep2_lunch_arc_twins",
    chapter: "CHAPTER I · EPISODE II",
    title: "Lunch — Brandy & Mandy",
    presentNPCs: ["brandy", "mandy"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_lunch_twins", "brandy", "ep2_scene5_router", 8);
      const beat = arc.beatIndex;

      if (beat <= 6) {
        const prompts = [
          "Brandy slides an extra iced drink across the terrace table while Mandy props her boots on the bench opposite you. \"Okay, new guy—give us your honest read on the fresher class so far.\"",
          "Mandy laughs at your take, tapping her silver rings against the table. \"See, Brandy? Finally someone who doesn't talk like a campus brochure.\"",
          "Brandy leans forward, chin resting on laced fingers. \"Careful though—half the guys here try way too hard to impress us. Don't turn into a kiss-up.\"",
          "\"And don't turn into a robot either,\" Mandy adds immediately. \"Elliot tried explaining supply curves to me at 9 AM and I nearly jumped off the balcony.\"",
          "The twins trade rapid-fire stories about their older brothers back home and how they plan to run the campus social scene before midterms.",
          "Both sisters lean in as the courtyard empties out, completely losing track of the afternoon bell while trading bets on who'll fold first at tonight's hangout."
        ];
        return {
          text: [prompts[beat - 1]],
          choices: [
            {
              label: "Match their sharp, playful energy with a dry tease.",
              action: () => {
                state.rep.brandy += 2;
                state.rep.mandy += 2;
                applyTone("tease", { targetNpc: "brandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_twins");
              }
            },
            {
              label: "Keep your answer grounded and unbothered.",
              action: () => {
                applyTone("factual", { targetNpc: "brandy" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_twins");
              }
            }
          ]
        };
      }

      if (beat === 7) {
        return {
          text: [
            "Brandy checks her lock screen and curses softly in Spanish. \"1:53 PM. We're officially late for the post-afternoon lecture.\""
          ],
          choices: [
            {
              label: "\"Come on—we're walking in together anyway.\"",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_twins");
              }
            }
          ]
        };
      }

      return {
        text: [
          "You walk briskly into Block B alongside Brandy and Mandy, seven minutes past the afternoon bell."
        ],
        choices: [
          {
            label: "Reach the door of the post-afternoon lecture hall →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_scene5_router");
            }
          }
        ]
      };
    }
  },

  // --------------------------------------------------------------------------
  // 8-BEAT LUNCH ARC C: LAURA (BEATS 1–8 -> LATE TO SCENE 5)
  // --------------------------------------------------------------------------
  ep2_lunch_arc_laura: {
    id: "ep2_lunch_arc_laura",
    chapter: "CHAPTER I · EPISODE II",
    title: "Lunch — Shaded Steps with Laura",
    presentNPCs: ["laura"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_lunch_laura", "laura", "ep2_scene5_router", 8);
      const beat = arc.beatIndex;

      if (beat <= 6) {
        const prompts = [
          "Laura sits on the cool stone steps behind the library colonnade, black coffee cup between her platform boots and a battered paperback open across her knees. \"You actually skipped the dining hall noise. Surprising.\"",
          "She doesn't smile easily, yet she shifts her bag over so you have room on the step beside her.",
          "\"People here treat silence like an emergency,\" Laura says flatly, watching two students rush past across the grass. \"You don't seem desperate to fill every second.\"",
          "You trade blunt, unvarnished observations about campus cliques, late-night music, and why neither of you has patience for fake friendliness.",
          "Laura actually lets out a short, dry laugh when you point out Nate's rehearsed posture from the morning assembly.",
          "Under the shade of the colonnade, neither of you hears the distant 1:45 PM warning chime across the quad."
        ];
        return {
          text: [prompts[beat - 1]],
          choices: [
            {
              label: "Keep your tone blunt, dry, and unsentimental.",
              action: () => {
                state.rep.laura += 2;
                applyTone("factual", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_laura");
              }
            },
            {
              label: "Give her a deadpan jab about hiding behind her paperback.",
              action: () => {
                state.rep.laura += 2;
                applyTone("bully", { targetNpc: "laura" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_laura");
              }
            }
          ]
        };
      }

      if (beat === 7) {
        return {
          text: [
            "Laura glances at the clock tower above the quad and exhales slowly. \"1:52. We're late for the afternoon seminar.\""
          ],
          choices: [
            {
              label: "\"Let's go before they mark us absent.\"",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_laura");
              }
            }
          ]
        };
      }

      return {
        text: [
          "You and Laura walk across the courtyard into Block B, arriving late to the post-afternoon lecture."
        ],
        choices: [
          {
            label: "Reach the door of the post-afternoon lecture hall →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_scene5_router");
            }
          }
        ]
      };
    }
  },

  // --------------------------------------------------------------------------
  // 8-BEAT LUNCH ARC D: ROB & MALIK (BEATS 1–8 -> LATE TO SCENE 5)
  // --------------------------------------------------------------------------
  ep2_lunch_arc_backrow: {
    id: "ep2_lunch_arc_backrow",
    chapter: "CHAPTER I · EPISODE II",
    title: "Lunch — Back Table with Rob & Malik",
    presentNPCs: ["rob", "malik"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_lunch_backrow", "malik", "ep2_scene5_router", 8);
      const beat = arc.beatIndex;

      if (beat <= 6) {
        const prompts = [
          "Rob and Malik stack three lunch trays at the back corner of the dining terrace, immediately breaking down the morning's Hide & Seek chaos.",
          "Malik leans back in his chair, braids swinging as he laughs. \"Bro, Elliot looked like he was about to file a formal complaint when Max blew that whistle.\"",
          "Rob nods toward you with genuine respect. \"You hold your own without running your mouth. Respect that.\"",
          "The conversation rolls from campus pickup basketball to who's showing up at the pavilion shelter hangout tonight.",
          "Malik sketches out the evening plan—music, Truth or Dare, Spin the Bottle—while Rob ribs him about talking big.",
          "By the time Malik finishes his story, the dining terrace has cleared out and the afternoon lecture is already underway."
        ];
        return {
          text: [prompts[beat - 1]],
          choices: [
            {
              label: "Keep the banter sharp with Malik.",
              action: () => {
                state.rep.malik += 2;
                applyTone("tease", { targetNpc: "malik" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_backrow");
              }
            },
            {
              label: "Back Rob's take on keeping things solid.",
              action: () => {
                state.rep.rob += 2;
                applyTone("factual", { targetNpc: "rob" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_backrow");
              }
            }
          ]
        };
      }

      if (beat === 7) {
        return {
          text: [
            "Rob checks his phone and stands up fast. \"1:53—we missed the bell for Vance's afternoon class.\""
          ],
          choices: [
            {
              label: "\"Move—let's get to Block B.\"",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_backrow");
              }
            }
          ]
        };
      }

      return {
        text: [
          "You, Rob, and Malik jog up the Block B stairs, arriving late to the post-afternoon lecture."
        ],
        choices: [
          {
            label: "Reach the door of the post-afternoon lecture hall →",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_scene5_router");
            }
          }
        ]
      };
    }
  }
};
