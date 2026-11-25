// ============================================================================
// MEET CHLOE — CHAPTER ONE: EPISODE TWO, PART 1 (episode2_part1.js)
// Covers Scenes 1–4:
// - Scene 1: Mandatory Fresher Orientation (Stat-gated Event Coordination & Speech vs Dean Speech + 5-beat Cohort Arcs)
// - Scene 2: Get Active Aerobics & Tactical Campus Hide & Seek (Max)
// - Scene 3: Student Council Q&A, Role Offers (Mastery), Tanya Acknowledgement, 4-Beat Council Arc & VIP Mixer Ticket Check
// - Scene 4: Campus Lunch (Minimum 8 story beats per in-scene person -> causes lateness to Scene 5)
// Depends on: characters.js, engine.js
// ============================================================================

function isChloeControlState() {
  return (
    state.chloeState === "control" ||
    state.mem.chloeState === "control" ||
    state.control > state.aura
  );
}

function chloeStateLine(pursueLine, controlLine) {
  return isChloeControlState() ? controlLine : pursueLine;
}

function hasEp1VipMixerTicket() {
  return Boolean(
    state.mem.hasVIPMixerTicket ||
    state.mem.vipMixerInvite ||
    state.mem.ep1VipTicket ||
    state.mem.hasVIPWristband
  );
}

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
      const vipNote = hasEp1VipMixerTicket() || state.aura >= 55
        ? "That late-night anonymous VIP Mixer Party signal still hums in the back of your mind as you step across the threshold."
        : "Without a VIP Mixer Party invite on your phone, you're walking into Orientation strictly on what you earn in person today.";

      const night1Note =
        state.mem.night1Ending === "chloe_boyfriend_accepted"
          ? chloeStateLine(
              `Chloe catches your eye near the third row of folding chairs as your girlfriend, adjusting the collar of her cropped blazer with a warm, unmistakable smile before Maya leans over to whisper something in her ear. ${vipNote}`,
              `Chloe catches your eye near the third row of folding chairs as your girlfriend—her gaze sharp and expectant as she waits to see how you play the room—before Maya leans over to whisper something in her ear. ${vipNote}`
            )
          : state.mem.night1Ending === "chloe_boyfriend_refused"
            ? chloeStateLine(
                `Chloe catches your eye near the third row of folding chairs—still charged and intrigued after turning down her boyfriend offer last night—before Maya leans over to whisper something in her ear. ${vipNote}`,
                `Chloe catches your eye near the third row of folding chairs—jaw set, coolly assessing you after you turned down her boyfriend offer last night—before Maya leans over to whisper something in her ear. ${vipNote}`
              )
            : state.mem.night1Ending === "chloe_dorm_sfw" || state.mem.night1Ending === "cuddle_in_bed" || state.mem.night1Ending === "chloe_stay"
              ? chloeStateLine(
                  `Chloe catches your eye near the third row of folding chairs, adjusting the collar of her cropped blazer with a faint, knowing half-smile before looking away when Maya leans over to whisper something in her ear. ${vipNote}`,
                  `Chloe catches your eye near the third row of folding chairs, lifting her chin with a guarded, calculating glance before looking away when Maya leans over to whisper something in her ear. ${vipNote}`
                )
              : state.mem.night1Ending === "escort_chloe_with_elliot"
                ? chloeStateLine(
                    `Chloe sits near the third row of folding chairs beside Maya, glancing your way with lingering curiosity while Elliot shoots you a tight, calculating look from down the aisle after last night's dorm-door escort. ${vipNote}`,
                    `Chloe sits near the third row of folding chairs beside Maya, keeping her posture cool and unreadable while Elliot shoots you a tight, calculating look from down the aisle after last night's dorm-door escort. ${vipNote}`
                  )
                : state.mem.night1Ending === "left_with_rob_malik"
                  ? chloeStateLine(
                      `Chloe sits near the third row of folding chairs beside Maya, shooting you a brief sideways look while Rob and Malik grin from the back after walking out with her last night. ${vipNote}`,
                      `Chloe sits near the third row of folding chairs beside Maya, deliberately focusing forward while Rob and Malik grin from the back after walking out with her last night. ${vipNote}`
                    )
                  : state.mem.night1Ending === "control_did_homework" || state.mem.night1Ending === "control_library_tension_raised"
                    ? chloeStateLine(
                        `Chloe catches your eye near the third row of folding chairs with a sharp, amused glint after last night's homework showdown. ${vipNote}`,
                        `Chloe catches your eye near the third row of folding chairs with a cool, sizing look after last night's homework showdown. ${vipNote}`
                      )
                    : state.mem.night1Ending === "flipped_lib"
                      ? `Your notes from midnight are tucked cleanly inside your jacket; Elliot shoots you a tight, calculating glance from the front row as if he already heard you stayed in the stacks till closing. ${vipNote}`
                      : `You step through the oak doors of the Main Auditorium right at 8:55 AM, taking in the packed fresher cohort under high arched windows. ${vipNote}`;

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
                  state.mem.orientSeatTransition = chloeStateLine(
                    "You give the faculty coordinator a brief nod and slip quietly into the main aisle just as Tanya hands the microphone over, catching a quick sideways glance from Chloe in row three.",
                    "You give the faculty coordinator a brief nod and slip quietly into the main aisle just as Tanya hands the microphone over, meeting Chloe's cool, observant gaze from row three."
                  );
                  goToScene("ep2_dean_speech");
                }
              }
            ]
          : [
              {
                label: "Find a vantage point as the Dean steps up to the podium.",
                action: () => {
                  state.mem.coordinatedOrientation = false;
                  state.mem.orientSeatTransition = chloeStateLine(
                    "You angle down the side aisle for a clear view of the floor as Tanya hands the microphone over, noticing Chloe subtly adjusting her posture as you pass.",
                    "You angle down the side aisle for a clear view of the floor as Tanya hands the microphone over, feeling Chloe's measured eyes track your movement down the hall."
                  );
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
              chloeStateLine(
                "You don't read off the laminated cue card. You deliver ninety seconds of dry, grounded candor about surviving the first week without losing your head—drawing a sharp laugh from Malik in the back, an approving nod from Tanya beside the curtain, and a slow, intrigued smirk from Chloe in row three.",
                "You don't read off the laminated cue card. You deliver ninety seconds of dry, grounded candor about surviving the first week without losing your head—drawing a sharp laugh from Malik in the back, an approving nod from Tanya beside the curtain, and a measured, impressed look from Chloe in row three as she tilts her head."
              ),
              "When you step down from the stage, half the room is already looking to see which row you'll claim."
            ]
          : [
              "You get the rows seated cleanly enough, but the moment you step behind the podium, feedback whines through the overhead speakers and your opening line lands flat in the cavernous hall.",
              chloeStateLine(
                "Nate smirks behind his hand beside the stage curtain, while Chloe hides a half-wince behind her collar in row three. You wrap up briskly and step down into the aisle with heat creeping up your collar.",
                "Nate smirks behind his hand beside the stage curtain while Chloe's brow lifts in cool, silent judgment from row three. You wrap up briskly and step down into the aisle with heat creeping up your collar."
              )
            ],
        choices: [
          {
            label: "Take the open seat beside Chloe and Maya in row three.",
            action: () => {
              state.mem.orientArcIntro = chloeStateLine(
                "You walk down the center aisle and slide into the open folding chair beside Chloe and Maya just as the Dean takes the podium, Chloe immediately shifting her blazer to make room.",
                "You walk down the center aisle and slide into the open folding chair beside Chloe and Maya just as the Dean takes the podium, Chloe keeping her posture poised as you sit."
              );
              startGetToKnowYouArc("ep2_orient_chloe_maya", "chloe", "ep2_get_active", 5);
              goToScene("ep2_orient_arc_chloe_maya");
            }
          },
          {
            label: "Drop into the aisle seats beside identical Latina twins Brandy and Mandy.",
            action: () => {
              state.mem.orientArcIntro = chloeStateLine(
                "You cut across the center aisle and claim the open folding chair right beside Brandy and Mandy as the Dean launches into his speech, noticing Chloe glance over from row three with a sudden spark of curiosity.",
                "You cut across the center aisle and claim the open folding chair right beside Brandy and Mandy as the Dean launches into his speech, feeling Chloe's cool side-glance track where you chose to sit."
              );
              startGetToKnowYouArc("ep2_orient_twins", "brandy", "ep2_get_active", 5);
              goToScene("ep2_orient_arc_twins");
            }
          },
          {
            label: "Walk toward the shadowed rear exit where a goth girl in oversized black layers stands alone.",
            action: () => {
              state.mem.knowsLaura = true;
              state.mem.orientArcIntro = chloeStateLine(
                "You bypass the crowded middle rows altogether and walk straight back toward the rear fire exit as the Dean's voice echoes over the PA, leaving Chloe blinking in mild surprise behind you.",
                "You bypass the crowded middle rows altogether and walk straight back toward the rear fire exit as the Dean's voice echoes over the PA, ignoring the middle rows entirely."
              );
              startGetToKnowYouArc("ep2_orient_laura", "laura", "ep2_get_active", 5);
              goToScene("ep2_orient_arc_laura");
            }
          },
          {
            label: "Head up to the back bleachers with Rob and Malik.",
            action: () => {
              state.mem.orientArcIntro = "You take the wooden steps two at a time up to the top rear tier where Rob and Malik are leaning back against the rail.";
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
        state.mem.orientSeatTransition || "You find a clear vantage point along the side aisle as the stage lights shift.",
        "Dean Harlan steps behind the brass podium, adjusting bifocals as he launches into a twenty-minute sermon on academic integrity, campus curfews, and 'shaping tomorrow's leaders.'",
        chloeStateLine(
          "Within three minutes, half the auditorium has slumped into their collars. Across the aisle, identical Latina twins Brandy and Mandy trade silent eye-rolls; in row three, Maya whispers something under her breath that makes Chloe bite back a laugh while sneaking a glance toward the aisle; and near the back fire exit, a moody goth girl in oversized black layers leans against the cinderblock wall with her arms crossed.",
          "Within three minutes, half the auditorium has slumped into their collars. Across the aisle, identical Latina twins Brandy and Mandy trade silent eye-rolls; in row three, Maya whispers something under her breath while Chloe keeps a composed, unreadable half-smile; and near the back fire exit, a moody goth girl in oversized black layers leans against the cinderblock wall with her arms crossed."
        ),
        "You have plenty of breathing room while the Dean drones on to pick your company."
      ],
      choices: [
        {
          label: "Slide into the empty chair beside Chloe and Maya in row three.",
          action: () => {
            state.mem.orientArcIntro = chloeStateLine(
              "Keeping your footsteps quiet against the floorboards, you slip into the open seat beside Chloe and Maya in row three just as Chloe looks over with a faint smirk.",
              "Keeping your footsteps quiet against the floorboards, you slip into the open seat beside Chloe and Maya in row three, meeting Chloe's steady, calculating look."
            );
            startGetToKnowYouArc("ep2_orient_chloe_maya", "chloe", "ep2_get_active", 5);
            goToScene("ep2_orient_arc_chloe_maya");
          }
        },
        {
          label: "Take the open seats beside Brandy and Mandy near the center aisle.",
          action: () => {
            state.mem.orientArcIntro = chloeStateLine(
              "You duck under the Dean's line of sight and take the empty chair right beside Brandy and Mandy near the center aisle, catching Chloe's brief sideways glance from row three.",
              "You duck under the Dean's line of sight and take the empty chair right beside Brandy and Mandy near the center aisle while Chloe keeps her eyes fixed coolly ahead."
            );
            startGetToKnowYouArc("ep2_orient_twins", "brandy", "ep2_get_active", 5);
            goToScene("ep2_orient_arc_twins");
          }
        },
        {
          label: "Step back toward the rear exit where the goth girl in oversized black layers is standing.",
          action: () => {
            state.mem.knowsLaura = true;
            state.mem.orientArcIntro = "You slip quietly toward the back of the hall, stopping beside the cinderblock wall near the rear fire exit.";
            startGetToKnowYouArc("ep2_orient_laura", "laura", "ep2_get_active", 5);
            goToScene("ep2_orient_arc_laura");
          }
        },
        {
          label: "Climb up to the back bleachers with Rob and Malik.",
          action: () => {
            state.mem.orientArcIntro = "You head up the back steps to the highest wooden tier where Rob and Malik have claimed the corner.";
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
            state.mem.orientArcIntro || "You take the open chair beside Chloe and Maya in row three.",
            chloeStateLine(
              "Maya looks up first as you sit down, her soft-spoken, grounded girl-next-door warmth immediately brightening when she recognizes you. \"Oh—hi!\" Maya says softly, glancing between you and Chloe. \"Chloe, this is the person I told you about from yesterday.\" Chloe blinks, then gives you a slow, teasing look. \"Wait. You two already know each other?\"",
              "Maya looks up first as you sit down, her soft-spoken, grounded girl-next-door warmth immediately brightening when she recognizes you. \"Oh—hi!\" Maya says softly, glancing between you and Chloe. \"Chloe, this is the person I told you about from yesterday.\" Chloe freezes for half a beat, eyes narrowing as she looks from Maya's knit cardigan to your face. \"Hold on. Since when do you two know each other?\""
            )
          ],
          choices: [
            {
              label: "\"Maya saved me from tripping over spilled binders on the back stairs. Small campus.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Maya blushes faintly and smiles, while Chloe rolls her eyes fondly at the two of you. \"Of course Maya played hero on day one.\"",
                  "Maya smiles softly, while Chloe watches the two of you with a sharp, assessing side-glance. \"Convenient timing on the stairwell.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Apparently you're the mysterious best friend Maya mentioned. Explains a lot.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe's lips quirk upward into a playful smirk as she leans back in her folding chair. \"Careful—now you know too much.\"",
                  "Chloe's eyes narrow slightly before a dry, guarded half-smile touches the corner of her mouth. \"Keep that between us.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"We crossed paths between lectures yesterday. Didn't realize you two came from the same town.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe nods lightly, seeming pleased you didn't make a big scene out of it.",
                  "Chloe gives a brisk, measured nod, appreciating the straightforward, low-key answer."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Relax, Chloe—not everything revolves around your seating chart.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe's playful warmth cools a notch, though she refuses to look rattled in front of Maya. \"Bold talk for someone who picked my row.\"",
                  "Chloe's chin lifts sharply, her gaze going icy as she turns back toward the stage. \"Watch your tone.\""
                );
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
            state.mem.lastBeatReaction,
            chloeStateLine(
              "Chloe lets out a quiet laugh, nudging Maya's knee with hers under the folding chair. \"Since grade six,\" Chloe admits with an easy grin. \"Maya's the only person on this campus who knew me before I owned a pair of heels.\"",
              "Chloe lets out a quiet breath, nudging Maya's knee with hers under the folding chair. \"Since grade six,\" Chloe states evenly, keeping her voice low. \"Maya's the only person on this campus who knew me before I owned a pair of heels.\""
            ),
            "Maya smiles gently, folding her hands over her notebook. \"And Chloe's still the only person who tells me when I'm overthinking.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Good balance. Somebody has to keep Chloe's ego within building limits.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "\"Careful,\" Chloe murmurs with a glint in her eye, \"I haven't even started yet.\"",
                  "\"My ego fits every room I walk into,\" Chloe replies smoothly, holding your gaze without blinking."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Having someone from home who actually knows you is rare here. Hold onto that.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Maya looks genuinely touched, and Chloe's posture softens just a fraction beside her. \"See? Even the new arrival gets it.\"",
                  "Maya nods gratefully, while Chloe studies your face as if checking whether you mean every word. \"True enough.\""
                );
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
            state.mem.lastBeatReaction,
            "Up on stage, Tanya steps back to the mic and announces that the mandatory 'Get Active' outdoor athletic session starts in ten minutes on the south turf.",
            chloeStateLine(
              "Chloe groans softly, glancing down at her heeled ankle boots before shooting you a sideways look. \"Tell me we're not actually running laps in this outfit.\"",
              "Chloe's brow creases slightly as she glances down at her heeled ankle boots, keeping her voice composed. \"Nobody mentioned outdoor sprints on the Orientation sheet.\""
            )
          ].filter(Boolean),
          choices: [
            {
              label: "\"Watching you sprint in heels might be the highlight of Orientation.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe nudges your arm lightly with her elbow. \"Keep talking and I'll make sure you regret it.\"",
                  "Chloe shoots you a cool, unimpressed look. \"Don't hold your breath waiting for a show.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"It's mostly partner drills and group games. Pace yourself and you'll be fine.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe exhales in visible relief, leaning back against the chair. \"Good, because I'm not ruining these boots for Max's whistle.\"",
                  "Chloe nods once, already shifting mentally toward the next block. \"Smart. No wasted energy.\""
                );
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
            state.mem.lastBeatReaction,
            "Maya already has spare canvas sneakers tucked inside her tote bag—she pulls them out quietly and offers Chloe a knowing look. \"I packed your flats in the side pocket because I knew you'd wear the boots.\"",
            chloeStateLine(
              "Chloe's guarded expression melts into genuine gratitude as she takes the sneakers. \"Literal lifesaver.\"",
              "Chloe takes the sneakers with a brief, controlled nod of thanks, slipping them into her bag before anyone nearby notices. \"Good call, Maya.\""
            )
          ].filter(Boolean),
          choices: [
            {
              label: "\"Maya's carrying the whole team before we even reach the turf.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Maya laughs quietly while Chloe shoots you a playful grin as the auditorium rows start standing up around you.",
                  "Maya smiles softly while Chloe slings her bag over one shoulder with practiced poise and gives you a brief nod."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            },
            {
              label: "\"Smart planning. Always pack for the second half of the schedule.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe flashes you a quick grin as Tanya signals the rows to file out. \"Clearly you two share a brain.\"",
                  "Chloe gives you a brief, approving look as Tanya signals the rows to file out. \"Exactly.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_chloe_maya");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          chloeStateLine(
            "The auditorium doors swing open as the cohort files out toward the south athletic turf, with Chloe walking close beside you and Maya trading easy smiles as you step into the morning sun.",
            "The auditorium doors swing open as the cohort files out toward the south athletic turf, with Chloe matching your pace cleanly beside Maya as you step into the morning sun."
          )
        ].filter(Boolean),
        choices: [
          {
            label: "Walk out to the south turf with Chloe and Maya for Get Active.",
            action: () => {
              state.mem.getActiveEntryContext = chloeStateLine(
                "You step onto the sun-drenched south turf alongside Chloe and Maya, following the main crowd from row three as Chloe finishes lacing her canvas sneakers.",
                "You step onto the sun-drenched south turf alongside Chloe and Maya, following the main crowd from row three with Chloe already composed and ready."
              );
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
            state.mem.orientArcIntro || "You drop into the aisle seats beside Brandy and Mandy.",
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
                state.mem.lastBeatReaction = "Brandy's dark eyes light up with immediate interest while Mandy grins across her shoulder. \"Oh, he wants smoke already.\"";
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
                state.mem.lastBeatReaction = "Brandy shrugs in agreement, though Mandy gives a mock yawn at your dry excuse. \"Riveting storytelling.\"";
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
                state.mem.lastBeatReaction = "Brandy arches an unimpressed eyebrow at the flattery while Mandy smirks at her sister's reaction. \"Save the compliments for someone easier, rookie.\"";
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
                state.mem.lastBeatReaction = "Both twins freeze for half a second before exchanging a sharp, irritated look. \"Nobody asked you to sit here.\"";
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
            state.mem.lastBeatReaction,
            "Mandy leans forward past Brandy's shoulder, resting her chin in her hand. \"I'm Mandy, that's Brandy. First test: tell us apart without squinting at our outfits.\"",
            "Brandy crosses her arms, waiting with an amused challenge in her dark eyes."
          ].filter(Boolean),
          choices: [
            {
              label: "\"Easy. Brandy looks like she starts the fire; Mandy looks like she hands her the matches.\"",
              action: () => {
                state.rep.brandy += 4;
                state.rep.mandy += 4;
                applyTone("tease", { targetNpc: "mandy", memoryTag: "ep2_read_twins_right", memoryText: "Nailed Brandy and Mandy's dynamic on the first try at Orientation." });
                state.mem.lastBeatReaction = "Both sisters burst out laughing at once, drawing a sharp look from Elliot two rows ahead.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            },
            {
              label: "\"Mandy's left eyebrow lifts a fraction higher whenever she's about to say something sarcastic.\"",
              action: () => {
                state.rep.mandy += 3;
                applyTone("factual", { targetNpc: "mandy" });
                state.mem.lastBeatReaction = "Mandy blinks in genuine surprise before breaking into an approving grin. \"Not bad at all.\"";
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
            state.mem.lastBeatReaction,
            "Brandy lets out a sharp laugh, nudging Mandy's boot. \"Okay, keep him around—he actually pays attention.\"",
            "Mandy glances up toward the stage where Nate is whispering to Tanya. \"Word is there's a campus shelter hangout tonight after classes. None of that stiff Student Council punch-bowl nonsense.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Count me in. Save me a spot away from Nate's monologue.\"",
              action: () => {
                state.rep.brandy += 2;
                state.rep.mandy += 2;
                applyTone("tease", { targetNpc: "brandy" });
                state.mem.lastBeatReaction = "\"Deal,\" Brandy says with a sharp grin as Tanya steps back to the podium.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            },
            {
              label: "\"Good to know. Who's organizing it?\"",
              action: () => {
                applyTone("factual", { targetNpc: "mandy" });
                state.mem.lastBeatReaction = "Mandy taps her silver hoop thoughtfully as Tanya dismisses the rows.";
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
            state.mem.lastBeatReaction,
            "\"Rob, Malik, and half the fresher floor,\" Mandy says, standing up as the auditorium rows begin to empty toward the athletic field. \"Try not to pass out during Get Active.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Worry about yourselves—I'll be fine.\"",
              action: () => {
                state.mem.lastBeatReaction = "Brandy smirks as the two sisters fall into step on either side of you down the center aisle.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_twins");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          "The twin sisters walk out through the main doors right alongside you, trading dry commentary as the cohort spills onto the south turf."
        ].filter(Boolean),
        choices: [
          {
            label: "Head out to the south turf with Brandy and Mandy for Get Active.",
            action: () => {
              state.mem.getActiveEntryContext = "You walk out onto the south athletic turf flanked by Brandy and Mandy, still trading sharp remarks from the center aisle.";
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
            state.mem.orientArcIntro || "You step back toward the rear fire exit.",
            "Near the rear fire exit, away from the bright stage lights, stands Laura—pale skin, dark smudged eyeliner, oversized black knit layers draped over a pleated dark skirt and heavy platform boots.",
            "She watches the Dean's speech with deadpan disdain, glancing sideways when you stop beside the wall. \"If you're about to tell me 'Orientation is what you make of it,' save your breath.\""
          ],
          choices: [
            {
              label: "\"Relax. I came back here because the front rows smelled like forced enthusiasm.\"",
              action: () => {
                state.rep.laura += 4;
                applyTone("factual", { targetNpc: "laura", memoryTag: "ep2_met_laura", memoryText: "Met Laura by the rear auditorium exit and bonded over hating forced Orientation cheer." });
                state.mem.lastBeatReaction = "Laura lets out a short breath through her nose—her version of a laugh—and leans back against the cinderblock.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Standing by the fire exit in all black—plotting an escape or just haunting the building?\"",
              action: () => {
                state.rep.laura += 3;
                applyTone("bully", { targetNpc: "laura", memoryTag: "ep2_met_laura", memoryText: "Met Laura by the rear exit and traded deadpan jabs." });
                state.mem.lastBeatReaction = "Laura's dark eyes flicker toward you with dry respect for not walking on eggshells.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Honestly, your whole aesthetic is super cool. Way better than everyone else here.\"",
              action: () => {
                state.rep.laura -= 4;
                applyTone("complimentary", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "Laura winces slightly as if you just handed her a participation ribbon.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Careful, smile too hard and you might crack the eyeliner.\"",
              action: () => {
                state.rep.laura -= 3;
                applyTone("tease", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "Laura stares at you completely deadpan until the joke dies in midair.";
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
            state.mem.lastBeatReaction,
            state.rep.laura >= 2
              ? "Laura's mouth twitches slightly—the closest thing to approval she offers. \"Laura,\" she says bluntly. \"And yes, I already mapped every exit out of this building before 9:05.\""
              : "Laura rolls her eyes slowly, shifting one platform boot against the baseboard. \"Laura. And I didn't ask for an audience.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Smart. Knowing the exits saves time when mandatory events drag on.\"",
              action: () => {
                state.rep.laura += 3;
                applyTone("factual", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "\"Finally, someone with basic survival instincts,\" Laura mutters.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Good thing I'm not asking for your autograph then.\"",
              action: () => {
                state.rep.laura += 3;
                applyTone("bully", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "Laura gives a tiny, grudging nod, unbothered by the pushback.";
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
            state.mem.lastBeatReaction,
            "Laura glances toward the stage as Tanya announces the outdoor Get Active block. \"Forced group aerobics in sunlight,\" Laura mutters flatly. \"I'm skipping that circus and sitting under the library colonnade until lunch.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Can't blame you. Try not to melt in the shade.\"",
              action: () => {
                state.rep.laura += 2;
                applyTone("factual", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "Laura adjusts the strap of her black satchel with a faint, dry smirk.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            },
            {
              label: "\"Suit yourself—some of us actually show up when the whistle blows.\"",
              action: () => {
                state.rep.laura += 2;
                applyTone("bully", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "\"Enjoy the sunburn,\" Laura replies without missing a beat.";
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
            state.mem.lastBeatReaction,
            "Laura pushes open the side fire door quietly, pausing half a beat before slipping out. \"Maybe see you at the shelter tonight if it doesn't turn into a pep rally.\""
          ].filter(Boolean),
          choices: [
            {
              label: "Give her a brief nod and head toward the south athletic turf.",
              action: () => {
                state.mem.lastBeatReaction = "Laura slips out toward the library shade while you merge back into the cohort heading for the field.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_laura");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          "The side door clicks shut behind Laura while you follow the main cohort out onto the grass."
        ].filter(Boolean),
        choices: [
          {
            label: "Join the cohort at Get Active.",
            action: () => {
              state.mem.getActiveEntryContext = "After parting ways with Laura at the rear exit, you step onto the bright south turf just as the cohort gathers.";
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
            state.mem.orientArcIntro || "You climb up to the back bleachers with Rob and Malik.",
            "Rob and Malik occupy the highest wooden tier at the back of the hall. Malik gestures toward the stage with his chin. \"Watch out for the track guy running Get Active next—Max. Australian transfer, runs sprints, acts like every girl on campus is his personal fan club.\""
          ],
          choices: [
            {
              label: "\"Let him talk. Speed on a track doesn't mean anything off it.\"",
              action: () => {
                state.rep.rob += 3;
                state.rep.malik += 2;
                applyTone("factual", { targetNpc: "rob" });
                state.mem.lastBeatReaction = "Rob nods slowly in agreement, leaning his forearms on his knees.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_backrow");
              }
            },
            {
              label: "\"Sounds like Malik's worried Max is going to steal his spotlight.\"",
              action: () => {
                state.rep.malik += 3;
                applyTone("tease", { targetNpc: "malik" });
                state.mem.lastBeatReaction = "Malik laughs and shakes his head, tapping his fist against his chest. \"Please, bro, nobody's taking my lane.\"";
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
            state.mem.lastBeatReaction,
            chloeStateLine(
              "Rob chuckles, cracking his knuckles. \"He already tried talking to Chloe outside the doors at 8:50. She gave him the dry look, though he didn't take the hint.\"",
              "Rob chuckles, cracking his knuckles. \"He already tried talking to Chloe outside the doors at 8:50. She shut him down cold, though he didn't take the hint.\""
            )
          ].filter(Boolean),
          choices: [
            {
              label: "\"Good to know. We'll see how sharp his instincts really are.\"",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                state.mem.lastBeatReaction = "Rob gives a knowing half-grin as Tanya returns to the stage mic down below.";
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
            state.mem.lastBeatReaction,
            "Malik leans forward over his knees. \"Also, word is after the afternoon class, everybody's meeting at the old pavilion shelter near the west pines. No faculty, no Student Council rules.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Count me in.\"",
              action: () => {
                state.rep.malik += 2;
                state.mem.lastBeatReaction = "Malik daps you up cleanly as the auditorium doors open at the base of the bleachers.";
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
            state.mem.lastBeatReaction,
            "The auditorium doors swing wide as Tanya dismisses the rows toward the south turf."
          ].filter(Boolean),
          choices: [
            {
              label: "Walk down the bleachers with Rob and Malik.",
              action: () => {
                state.mem.lastBeatReaction = "You take the wooden steps down alongside Rob and Malik, heading straight for the south doors.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_orient_arc_backrow");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          "Bright morning sun hits your shoulders as you step out onto the south athletic turf with Rob and Malik."
        ].filter(Boolean),
        choices: [
          {
            label: "Step onto the turf for Get Active.",
            action: () => {
              state.mem.getActiveEntryContext = "You stride onto the south athletic turf shoulder-to-shoulder with Rob and Malik, already briefed on Max.";
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
        state.mem.getActiveEntryContext || "You step out onto the sun-drenched south turf alongside the rest of the fresher cohort.",
        "Out on the grass, a silver whistle hangs around the neck of Max—lean, sun-bronzed Australian track athlete in a sleeveless singlet, radiating relentless golden-retriever energy as he jogs backward in front of the cohort.",
        "\"Alright legends, wake those legs up!\" Max calls out in a bright Australian drawl, clapping twice. \"Five minutes of dynamic conditioning, then we're running a full-sector Campus Hide & Seek across the quad before Student Council!\"",
        chloeStateLine(
          "Before the whistle even finishes echoing, Max jogs straight over toward Chloe and Maya, flashing an easy grin. \"Need a warm-up partner, Chloe? I'll keep the pace honest.\" Chloe gives a polite, slightly amused half-smile while glancing over her shoulder to see where you're standing.",
          "Before the whistle even finishes echoing, Max jogs straight over toward Chloe and Maya, flashing an easy grin. \"Need a warm-up partner, Chloe? I'll keep the pace honest.\" Chloe folds her arms with cool, dry amusement, shooting a brief sideways look in your direction."
        )
      ],
      choices: [
        {
          label: "Step in smoothly and match Max's pace on the conditioning drills—showing effortless athleticism.",
          action: () => {
            state.aura = clamp(state.aura + 4, 0, 100);
            state.control = clamp(state.control + 2, 0, 100);
            adjustChloeMatrix(1, 3);
            applyTone("tease", { chloeDirect: true, targetNpc: "max", memoryTag: "ep2_outpaced_max", memoryText: "Matched Max's conditioning pace effortlessly on the south turf." });
            state.mem.hideSeekIntro = chloeStateLine(
              "You match Max stride-for-stride through the conditioning sprints without breaking a sweat; Max laughs in genuine surprise while Chloe watches with a slow, impressed smirk.",
              "You match Max stride-for-stride through the conditioning sprints without breaking a sweat; Max blinks in surprise while Chloe raises one approving eyebrow from the sideline."
            );
            goToScene("ep2_hide_and_seek");
          }
        },
        {
          label: "Join Max's inner circle with Rob and Malik, keeping the energy high without forcing anything.",
          action: () => {
            state.rep.max += 4;
            state.rep.rob += 2;
            applyTone("factual", { targetNpc: "max" });
            state.mem.hideSeekIntro = chloeStateLine(
              "You fall in smoothly beside Max, Rob, and Malik during the warm-up drills, earning an enthusiastic fist-bump from Max while Chloe chats quietly with Maya nearby.",
              "You fall in smoothly beside Max, Rob, and Malik during the warm-up drills, earning an enthusiastic fist-bump from Max while Chloe observes the group from beside Maya."
            );
            goToScene("ep2_hide_and_seek");
          }
        },
        {
          label: "Hang back near Brandy and Mandy, trading dry commentary while Max over-performs.",
          action: () => {
            state.rep.brandy += 3;
            state.rep.mandy += 3;
            applyTone("tease", { targetNpc: "brandy" });
            state.mem.hideSeekIntro = chloeStateLine(
              "You hang back by the boundary cones with Brandy and Mandy, drawing quiet laughs as Max demonstrates high-knees like he's auditioning for the Olympics.",
              "You hang back by the boundary cones with Brandy and Mandy, trading deadpan commentary while Chloe catches your eye from across the turf with a faint smirk."
            );
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
        state.mem.hideSeekIntro || "The warm-up drills wrap up right on schedule as Max gathers the cohort at midfield.",
        "Max blows two sharp blasts on his whistle. \"Ten minutes on the clock! Hiders scatter between the quad hedges, the library colonnade, and the old bleachers—seekers sweep!\"",
        chloeStateLine(
          "Out of the corner of your eye, you catch Max steering Chloe toward the stone arches of the Library Colonnade before the countdown even hits five—Chloe glancing back once as if daring you to track her down. You draw Seeker duty alongside Malik.",
          "Out of the corner of your eye, you catch Max steering Chloe toward the stone arches of the Library Colonnade before the countdown even hits five—Chloe moving with cool composure as she disappears behind the pillars. You draw Seeker duty alongside Malik."
        ),
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
            state.mem.hideSeekOutcome = chloeStateLine(
              "You cut straight across the grass to the third pillar of the Library Colonnade and catch Max mid-sentence beside Chloe with two full minutes left on the clock. Max groans good-naturedly, while Chloe's eyes gleam with a teasing, begrudging smirk as you walk them back to midfield.",
              "You cut straight across the grass to the third pillar of the Library Colonnade and corner Max and Chloe behind the stone arch two full minutes before the whistle. Max blinks at how fast you read the play, while Chloe's lips curve into a cool, impressed half-smile as you escort them back to midfield."
            );
            goToScene("ep2_hide_and_seek_wrap");
          }
        },
        {
          label: "Check the East Courtyard Hedges where Brandy, Mandy, and Maya ducked behind the stone planters.",
          action: () => {
            state.rep.maya += 3;
            state.rep.brandy += 2;
            state.rep.mandy += 2;
            applyTone("tease", { targetNpc: "mandy" });
            state.mem.hideSeekOutcome = chloeStateLine(
              "You circle the East Courtyard Hedges and flush Brandy, Mandy, and Maya out from behind the stone planters. Mandy accuses you of cheating while Maya laughs softly, and Max blows the final whistle just as Chloe strolls out from the Library Colonnade shooting you a playful, unbothered smirk.",
              "You circle the East Courtyard Hedges and flush Brandy, Mandy, and Maya out from behind the stone planters. Mandy accuses you of cheating while Maya laughs softly, and Max blows the final whistle just as Chloe strolls out from the Library Colonnade with cool, unruffled poise."
            );
            goToScene("ep2_hide_and_seek_wrap");
          }
        },
        {
          label: "Sweep the Sports Bleachers and trust your Luck to catch stragglers before the whistle.",
          action: () => {
            if (state.luck >= 54) {
              state.mem.wonHideAndSeek = true;
              state.aura = clamp(state.aura + 3, 0, 100);
              state.mem.hideSeekOutcome = chloeStateLine(
                "A stray shadow under the Sports Bleachers gives away Rob, Malik, and two stragglers right before the final ten-second countdown—earning a loud whistle from Max, a round of applause, and an intrigued look from Chloe as the cohort regroups.",
                "A stray shadow under the Sports Bleachers gives away Rob, Malik, and two stragglers right before the final ten-second countdown—earning a loud whistle from Max, a round of applause, and a subtle nod of approval from Chloe as the cohort regroups."
              );
            } else {
              state.mem.hideSeekOutcome = chloeStateLine(
                "You sweep beneath the Sports Bleachers only to find empty concrete steps; by the time you double back toward the quad, Max blows the final whistle with half the hiders still unclaimed and Chloe smirking lightly from the shade.",
                "You sweep beneath the Sports Bleachers only to find empty concrete steps; by the time you double back toward the quad, Max blows the final whistle with half the hiders still unclaimed and Chloe raising an unimpressed brow."
              );
            }
            goToScene("ep2_hide_and_seek_wrap");
          }
        }
      ]
    })
  },

  ep2_hide_and_seek_wrap: {
    id: "ep2_hide_and_seek_wrap",
    chapter: "CHAPTER I · EPISODE II",
    title: "Midfield Regroup",
    presentNPCs: ["chloe", "maya", "brandy", "mandy", "rob", "malik", "max"],
    render: () => ({
      text: [
        state.mem.hideSeekOutcome || "Max blows three sharp blasts on his whistle to call all sectors back to midfield.",
        "\"Solid hustle, freshers!\" Max calls out, wiping his brow with the hem of his singlet as Tanya steps onto the terrace steps holding her clipboard. \"Grab water and head straight into the Student Union hall—President Tanya and VP Nate are up next.\""
      ],
      choices: [
        {
          label: "Walk into the Student Union hall with the cohort for the Student Council assembly.",
          action: () => {
            goToScene("ep2_student_council");
          }
        }
      ]
    })
  },

  // ==========================================================================
  // SCENE 3: STUDENT COUNCIL Q&A, MASTERY ROLE OFFERS, TANYA ACKNOWLEDGEMENT,
  // 4-BEAT COUNCIL ARC & EPISODE 1 VIP MIXER TICKET CHECK
  // ==========================================================================
  ep2_student_council: {
    id: "ep2_student_council",
    chapter: "CHAPTER I · EPISODE II",
    title: "Student Council Assembly",
    presentNPCs: ["tanya", "nate", "elliot", "chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => {
      const wonSeekNote = state.mem.wonHideAndSeek
        ? chloeStateLine(
            "Chloe still wears a faint, playful smirk from your Hide & Seek sweep as the cohort settles into the Student Union hall.",
            "Chloe still carries a cool, measured glint in her eye from your Hide & Seek sweep as the cohort settles into the Student Union hall."
          )
        : "The cohort files into the Student Union hall still catching their breath from the turf.";

      return {
        text: [
          wonSeekNote,
          "At the front of the Student Union hall, President Tanya—commanding, dark-skinned Haitian, clipboard held steady against one hip—steps up beside Vice President Nate, whose tailored jacket and smug posture broadcast old money.",
          "\"Student Council has paid fresher liaison and operations roles open this term,\" Tanya says crisply, her gaze sweeping the room. \"We don't hire flatterers, and we don't hire dead weight. Nate and I are taking three questions and sizing up who actually has the sharpness and mastery to run things on this campus.\"",
          "Nate smirks, tapping a stack of silver-embossed VIP Mixer Party wristbands resting on the table beside him. \"And for anyone who proves they belong in the inner circle, there are perks.\""
        ],
        choices: [
          {
            label: "Deliver a sharp, practical breakdown of fresher transit & study-space bottlenecks—testing your Mastery in front of Tanya.",
            action: () => {
              if (state.mastery >= 54) {
                state.mem.passedJobCheck = true;
                state.cash += 45;
                state.rep.tanya += 6;
                promoteGrade();
                applyTone("factual", {
                  targetNpc: "tanya",
                  memoryTag: "ep2_tanya_job_offer",
                  memoryText: "Passed Tanya's high Mastery test at the Student Council Q&A, unlocking official Student Council role offers.",
                  extraWitnesses: ["nate", "chloe", "elliot"]
                });
                state.mem.councilTransitionNote = chloeStateLine(
                  "Tanya pauses her pen, gives you a crisp, approving nod, and gestures for you to step up to the front table while Elliot stares tight-lipped from row two and Chloe watches with a sudden, intrigued grin.",
                  "Tanya pauses her pen, gives you a crisp, approving nod, and gestures for you to step up to the front table while Elliot stares tight-lipped from row two and Chloe tracks your move with cool respect."
                );
                goToScene("ep2_council_role_offer");
              } else {
                state.mem.passedJobCheck = false;
                state.rep.tanya -= 2;
                applyTone("factual", { targetNpc: "tanya" });
                state.mem.councilTransitionNote = chloeStateLine(
                  "Tanya listens without interrupting, then shakes her head once. \"Good observation, incomplete mastery of the numbers. Come back when you've sharpened up.\" Chloe offers a sympathetic, teasing half-shrug from across the aisle as Tanya moves on.",
                  "Tanya listens without interrupting, then shakes her head once. \"Good observation, incomplete mastery of the numbers. Come back when you've sharpened up.\" Chloe's expression stays cool and unreadable as Tanya moves on."
                );
                goToScene("ep2_council_acknowledgement_router");
              }
            }
          },
          {
            label: "Call Nate's bluff on the VIP wristbands with dry wit—testing your Control against his ego.",
            action: () => {
              if (state.control >= 56 && state.aura >= 56) {
                state.rep.nate += 3;
                state.rep.brandy += 2;
                applyTone("tease", {
                  targetNpc: "nate",
                  memoryTag: "ep2_outmaneuvered_nate",
                  memoryText: "Outmaneuvered VP Nate in front of the hall during the Student Council Q&A.",
                  extraWitnesses: ["tanya", "chloe", "brandy", "mandy"]
                });
                state.mem.councilTransitionNote = chloeStateLine(
                  "A ripple of laughter breaks across the hall; Nate's jaw tightens for a second before he lets out a short, forced laugh while Tanya hides a dry smile and Chloe smirks behind her hand.",
                  "A ripple of laughter breaks across the hall; Nate's jaw tightens for a second before he lets out a short, forced laugh while Tanya hides a dry smile and Chloe nods once in sharp approval."
                );
              } else {
                state.rep.nate -= 5;
                applyTone("tease", { targetNpc: "nate" });
                state.mem.councilTransitionNote = chloeStateLine(
                  "Nate smirks coldly, keeping the wristbands locked under his palm. \"Nice try, fresher. Earn your seat first.\" Across the aisle, Brandy winces slightly while Chloe shoots you a wry, teasing look.",
                  "Nate smirks coldly, keeping the wristbands locked under his palm. \"Nice try, fresher. Earn your seat first.\" Across the aisle, Brandy winces slightly while Chloe tilts her head coolly at the overreach."
                );
              }
              goToScene("ep2_council_acknowledgement_router");
            }
          },
          {
            label: "Try flattering Tanya and Nate's leadership in front of the room.",
            action: () => {
              state.mem.passedJobCheck = false;
              state.rep.tanya -= 6;
              state.rep.nate -= 2;
              applyTone("complimentary", { targetNpc: "tanya" });
              state.mem.councilTransitionNote = chloeStateLine(
                "Tanya cuts you off mid-sentence with a flat stare. \"I just said we don't hire flatterers. Next.\" Chloe hides a wince behind her collar as silence hangs heavy over your row.",
                "Tanya cuts you off mid-sentence with a flat stare. \"I just said we don't hire flatterers. Next.\" Chloe looks away with cool secondhand embarrassment as silence hangs over your row."
              );
              goToScene("ep2_council_acknowledgement_router");
            }
          },
          {
            label: "Sit back silently and let Elliot scramble for the podium mic.",
            action: () => {
              state.mem.passedJobCheck = false;
              state.rep.elliot += 2;
              state.mem.councilTransitionNote = chloeStateLine(
                "You keep your powder dry while Elliot hurries up to the mic with a rehearsed speech on library hours, earning a brisk nod from Tanya and an amused eye-roll from Chloe.",
                "You keep your powder dry while Elliot hurries up to the mic with a rehearsed speech on library hours, earning a brisk nod from Tanya while Chloe watches you calmly holding your cards."
              );
              goToScene("ep2_council_acknowledgement_router");
            }
          }
        ]
      };
    }
  },

  ep2_council_role_offer: {
    id: "ep2_council_role_offer",
    chapter: "CHAPTER I · EPISODE II",
    title: "Student Council Role Offers",
    presentNPCs: ["tanya", "nate", "elliot", "chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => ({
      text: [
        state.mem.councilTransitionNote || "Tanya gestures you forward to the front table in full view of the cohort.",
        "\"That's the exact operational Mastery we've been missing,\" Tanya says cleanly, setting two portfolio folders on the edge of the podium while Nate leans back with his jaw tightening slightly. \"Take your pick before the assembly breaks: Senior Fresher Liaison—handling cohort logistics and direct budget sign-off—or Academic & Policy Coordinator alongside the upperclassmen.\""
      ],
      choices: [
        {
          label: "Accept the Senior Fresher Liaison role—taking direct authority over cohort events and campus logistics.",
          action: () => {
            state.mem.councilRole = "fresher_liaison";
            state.control = clamp(state.control + 4, 0, 100);
            state.aura = clamp(state.aura + 3, 0, 100);
            state.rep.tanya += 4;
            state.rep.nate -= 2;
            state.mem.councilRoleOutcome = chloeStateLine(
              "You sign onto the Senior Fresher Liaison roster on the spot; Tanya stamps your pass with brisk approval while Nate eyes the new competition and Chloe flashes you an impressed, playful grin from row two.",
              "You sign onto the Senior Fresher Liaison roster on the spot; Tanya stamps your pass with brisk approval while Nate eyes the new competition and Chloe regards your new leverage with a cool, calculating smile."
            );
            goToScene("ep2_council_acknowledgement_router");
          }
        },
        {
          label: "Accept the Academic & Policy Coordinator role—locking in faculty leverage and scheduling priority.",
          action: () => {
            state.mem.councilRole = "policy_coordinator";
            state.mastery = clamp(state.mastery + 4, 0, 100);
            state.rep.tanya += 4;
            state.rep.elliot -= 3;
            state.mem.councilRoleOutcome = chloeStateLine(
              "You claim the Academic & Policy Coordinator slot; Elliot's pen snaps against his notebook in row two while Tanya nods in clear respect and Chloe smirks at Elliot's meltdown.",
              "You claim the Academic & Policy Coordinator slot; Elliot's pen snaps against his notebook in row two while Tanya nods in clear respect and Chloe gives a subtle, approving tilt of her chin."
            );
            goToScene("ep2_council_acknowledgement_router");
          }
        },
        {
          label: "Decline both formal titles for now—keeping your independence while bankrolling the Q&A payout.",
          action: () => {
            state.mem.councilRole = "declined";
            state.control = clamp(state.control + 2, 0, 100);
            state.mem.councilRoleOutcome = chloeStateLine(
              "Tanya raises an eyebrow at you turning down a badge most freshers would beg for, then nods once. \"Door stays open if you change your mind.\" Chloe catches your eye with a surprised, delighted laugh.",
              "Tanya raises an eyebrow at you turning down a badge most freshers would beg for, then nods once. \"Door stays open if you change your mind.\" Chloe's eyes gleam with sharp respect for refusing to be bought."
            );
            goToScene("ep2_council_acknowledgement_router");
          }
        }
      ]
    })
  },

  ep2_council_acknowledgement_router: {
    id: "ep2_council_acknowledgement_router",
    chapter: "CHAPTER I · EPISODE II",
    title: "Council Floor Check",
    presentNPCs: ["tanya", "nate", "elliot", "chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => {
      const didCoordinateAndSpeak = Boolean(
        state.mem.coordinatedOrientation && state.mem.orientationSpeechSuccess
      );
      const introLine =
        state.mem.councilRoleOutcome ||
        state.mem.councilTransitionNote ||
        "The Q&A portion of the assembly winds down as Tanya checks her clipboard.";

      if (didCoordinateAndSpeak) {
        return {
          text: [
            introLine,
            "Before closing the floor, Tanya's gaze locks onto you again—recognizing the exact person who stepped up to organize the entire auditorium floor and deliver the opening speech two hours ago."
          ],
          choices: [
            {
              label: "Meet Tanya's gaze as she steps forward to address you directly.",
              action: () => {
                goToScene("ep2_tanya_acknowledgement");
              }
            }
          ]
        };
      }

      return {
        text: [
          introLine,
          "Tanya taps her pen once against the clipboard and opens the floor for the informal Student Council mixer circle before lunch."
        ],
        choices: [
          {
            label: "Step into the Student Union floor circle as the assembly transitions to open Q&A.",
            action: () => {
              state.mem.lastBeatReaction = "Tanya steps down from the front podium with her clipboard while the cohort breaks into small groups around the Student Union hall.";
              startGetToKnowYouArc("ep2_council_4beat", "tanya", "ep2_council_vip_router", 4);
              goToScene("ep2_council_4beat_arc");
            }
          }
        ]
      };
    }
  },

  ep2_tanya_acknowledgement: {
    id: "ep2_tanya_acknowledgement",
    chapter: "CHAPTER I · EPISODE II",
    title: "Tanya's Acknowledgement",
    presentNPCs: ["tanya", "nate", "elliot", "chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => {
      if (!state.mem.tanyaAcknowledged) {
        state.mem.tanyaAcknowledged = true;
        state.rep.tanya = Math.max(state.rep.tanya + 12, 85);
        state.tanyaStatus = "HOT";
        state.mem.tanyaStatus = "HOT";
        state.aura = clamp(state.aura + 4, 0, 100);
        recordChoiceMemory(
          "ep2_tanya_hot_acknowledgement",
          "tanya",
          "Publicly acknowledged by Student Council President Tanya for coordinating Orientation and delivering the opening speech—elevating Tanya's view of you to HOT.",
          ["nate", "chloe", "maya", "brandy", "mandy", "rob", "malik", "elliot"]
        );
      }

      return {
        text: [
          "\"One last thing before we break into floor groups,\" Tanya says, her voice carrying effortlessly across the Student Union hall. \"Most freshers spend week one waiting to be told where to stand. Earlier this morning, someone stepped up, organized three hundred people without flinching, and delivered the sharpest opening address this hall has heard in years.\"",
          chloeStateLine(
            "Tanya holds your gaze directly—her usual guarded, strictly-business composure warming into unmistakable, magnetic respect as she offers a slow, approving smile that makes Nate shift uncomfortably beside the podium and Chloe's eyebrows lift with a sudden flash of competitive intrigue in row two.",
            "Tanya holds your gaze directly—her usual guarded, strictly-business composure warming into unmistakable, magnetic respect as she offers a slow, approving smile that makes Nate shift uncomfortably beside the podium and Chloe's eyes narrow slightly in cool, possessive assessment from row two."
          ),
          "\"That's the standard on this campus,\" Tanya adds smoothly, her eyes lingering on you a beat longer than protocol requires."
        ],
        choices: [
          {
            label: "Acknowledge Tanya with a composed nod as the room breaks into the open council circle.",
            action: () => {
              state.mem.lastBeatReaction = "Tanya's warm, approving gaze stays locked on you as she steps down from the podium into the floor circle.";
              startGetToKnowYouArc("ep2_council_4beat", "tanya", "ep2_council_vip_router", 4);
              goToScene("ep2_council_4beat_arc");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // STUDENT COUNCIL 4-BEAT ARC (4 STORY BEATS PER IN-SCENE PERSON)
  // ==========================================================================
  ep2_council_4beat_arc: {
    id: "ep2_council_4beat_arc",
    chapter: "CHAPTER I · EPISODE II",
    title: "Student Union Floor Circle",
    presentNPCs: ["tanya", "nate", "elliot", "chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_council_4beat", "tanya", "ep2_council_vip_router", 4);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            state.mem.lastBeatReaction,
            state.mem.tanyaAcknowledged
              ? "Tanya steps over to your side of the hall first, resting her clipboard against one hip with an unmistakable spark of interest. \"You move like someone who's already three steps ahead of the schedule,\" she says smoothly."
              : "Tanya walks past the front row with her clipboard held steady, sizing up the cohort while Nate holds court by the refreshment table. \"First impressions tell me everything I need to know about who lasts past midterms,\" Tanya remarks as she passes your circle."
          ].filter(Boolean),
          choices: [
            {
              label: "\"Most people overcomplicate things. Show up prepared and let the results speak.\"",
              action: () => {
                state.rep.tanya += 3;
                applyTone("factual", { targetNpc: "tanya" });
                state.mem.lastBeatReaction = "Tanya's mouth curves into an approving half-smile. \"Exactly my philosophy.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep2_council_4beat_arc");
              }
            },
            {
              label: "\"Careful, Madam President—keep talking like that and Nate's going to start sweating.\"",
              action: () => {
                state.rep.tanya += 3;
                state.rep.nate -= 2;
                applyTone("tease", { targetNpc: "tanya" });
                state.mem.lastBeatReaction = "Tanya lets out a low, genuine laugh, glancing sideways toward Nate before looking back at you.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_council_4beat_arc");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.lastBeatReaction,
            "Nate strolls over adjusting his silver watch, shooting a smug glance across the group. \"Just remember, freshers—Student Council runs the real social calendar around here. Friday's VIP Mixer Party isn't open to just anyone off the street.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Funny how the best rooms never need that much advertising, Nate.\"",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                state.rep.brandy += 2;
                applyTone("tease", { targetNpc: "nate" });
                state.mem.lastBeatReaction = "Brandy smirks behind her hand while Nate's jaw tightens slightly before he forces a grin.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_council_4beat_arc");
              }
            },
            {
              label: "\"Good thing nobody here is begging for an invite.\"",
              action: () => {
                state.rep.rob += 2;
                state.rep.malik += 2;
                applyTone("factual", { targetNpc: "nate" });
                state.mem.lastBeatReaction = "Rob and Malik nod quietly from behind you while Nate scoffs and checks his watch.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_council_4beat_arc");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.mem.lastBeatReaction,
            chloeStateLine(
              "Beside Maya, Chloe leans against the edge of a table and catches your eye with a subtle, teasing tilt of her head as Elliot tries and fails to wedge himself into Tanya's conversation.",
              "Beside Maya, Chloe leans against the edge of a table, watching how effortlessly you hold the floor while Elliot fails to wedge himself into Tanya's conversation."
            )
          ].filter(Boolean),
          choices: [
            {
              label: "Exchange a quick, knowing glance with Chloe and Maya before Tanya wraps up the floor session.",
              action: () => {
                adjustChloeMatrix(1, 2);
                state.rep.maya += 2;
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe flashes you a quick, playful smirk before Tanya steps back toward the front podium to dismiss the hall.",
                  "Chloe gives you a slow, approving nod before Tanya steps back toward the front podium to dismiss the hall."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_council_4beat_arc");
              }
            },
            {
              label: "Trade a brief nod with Brandy, Mandy, Rob, and Malik as the assembly wraps up.",
              action: () => {
                state.rep.brandy += 1;
                state.rep.mandy += 1;
                state.rep.rob += 1;
                state.rep.malik += 1;
                state.mem.lastBeatReaction = chloeStateLine(
                  "The whole back-row crew gives you a clean nod while Chloe watches you work the room with an amused half-smile as Tanya steps back to the podium.",
                  "The whole back-row crew gives you a clean nod while Chloe tracks your reach across the room with cool respect as Tanya steps back to the podium."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_council_4beat_arc");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          "\"That's all for morning orientation,\" Tanya announces cleanly from the front of the hall. \"Lunch break runs until 1:45 PM sharp. Don't be late for your afternoon seminars.\""
        ].filter(Boolean),
        choices: [
          {
            label: "Collect your bag as the cohort begins filing toward the courtyard doors.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep2_council_vip_router");
            }
          }
        ]
      };
    }
  },

  ep2_council_vip_router: {
    id: "ep2_council_vip_router",
    chapter: "CHAPTER I · EPISODE II",
    title: "Student Union Threshold",
    presentNPCs: ["tanya", "nate", "chloe", "maya", "brandy", "mandy", "rob", "malik"],
    render: () => {
      const alreadyHasVipTicket = hasEp1VipMixerTicket();

      // If passed Episode 1 VIP Mixer Party ticket check -> skip Tanya's personal invite scene
      if (alreadyHasVipTicket) {
        return {
          text: [
            "Your phone buzzes faintly in your pocket—confirming the anonymous VIP Mixer Party pass you already locked in at the end of Episode One.",
            "With your ticket already secured, you bypass the front table crowd and step straight out toward the sunlit midday courtyard."
          ],
          choices: [
            {
              label: "Head out into the midday courtyard for lunch.",
              action: () => {
                goToScene("ep2_lunch");
              }
            }
          ]
        };
      }

      // If failed Episode 1 VIP Mixer Party ticket check AND high Aura -> Tanya personally invites you
      if (state.aura >= 56) {
        return {
          text: [
            "You didn't receive the anonymous VIP Mixer Party ticket at the end of Episode One—but just as the hall empties toward the courtyard, Tanya steps out from behind the podium with a silver-embossed VIP Mixer Party pass in hand."
          ],
          choices: [
            {
              label: "Pause by the podium as Tanya walks over to you.",
              action: () => {
                goToScene("ep2_tanya_personal_vip_invite");
              }
            }
          ]
        };
      }

      // Failed Episode 1 VIP Mixer Party ticket check and insufficient Aura -> proceed to lunch
      return {
        text: [
          "Without a VIP Mixer Party ticket from last night—and with Tanya already turning back to review schedules with Nate—you step out through the Student Union doors into the midday sun."
        ],
        choices: [
          {
            label: "Head out into the midday courtyard for lunch.",
            action: () => {
              goToScene("ep2_lunch");
            }
          }
        ]
      };
    }
  },

  ep2_tanya_personal_vip_invite: {
    id: "ep2_tanya_personal_vip_invite",
    chapter: "CHAPTER I · EPISODE II",
    title: "Tanya's Personal VIP Invite",
    presentNPCs: ["tanya", "nate"],
    render: () => {
      if (!state.mem.tanyaPersonalVipGranted) {
        state.mem.tanyaPersonalVipGranted = true;
        state.mem.hasVIPMixerTicket = true;
        state.mem.hasVIPWristband = true;
        state.rep.tanya += 5;
        state.rep.nate -= 4;
        recordChoiceMemory(
          "ep2_tanya_personal_vip",
          "tanya",
          "Personally invited to the VIP Mixer Party by Student Council President Tanya after the council meeting, much to VP Nate's displeasure.",
          ["nate"]
        );
      }

      return {
        text: [
          "\"Hold up a second,\" Tanya says smoothly, stepping right past Nate to press a silver-embossed VIP Mixer Party ticket directly into your hand. \"Friday night. Top-floor lounge. Make sure you're there.\"",
          "Beside the podium, Nate's smile vanishes completely. \"Tanya, we agreed the guest list was capped—\"",
          "\"And I'm the President, Nate,\" Tanya replies without even turning her head, keeping her warm, deliberate gaze on you. \"I decide who belongs in the room.\""
        ],
        choices: [
          {
            label: "Pocket the VIP Mixer Party ticket with a cool nod to Tanya and walk out toward the courtyard.",
            action: () => {
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
            state.mem.lastBeatReaction = "";
            startGetToKnowYouArc("ep2_lunch_chloe_maya", "chloe", "ep2_scene5_router", 8);
            goToScene("ep2_lunch_arc_chloe_maya");
          }
        },
        {
          label: "Pull up a bench with Brandy and Mandy by the terrace steps (8-Beat Deep Dive).",
          action: () => {
            state.mem.lunchCompanion = "twins";
            state.mem.lastBeatReaction = "";
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
                  state.mem.lastBeatReaction = "";
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
            state.mem.lastBeatReaction = "";
            startGetToKnowYouArc("ep2_lunch_backrow", "malik", "ep2_scene5_router", 8);
            goToScene("ep2_lunch_arc_backrow");
          }
        },
        {
          label: "Eat alone by the west quad wall, keeping your own counsel.",
          action: () => {
            state.mem.lunchCompanion = "alone";
            state.control = clamp(state.control + 2, 0, 100);
            state.mem.soloLunchWrap = "You spend lunch along the quiet west quad wall reviewing your notes in peace—so absorbed in mapping out the week that you only notice the empty courtyard when the clock tower strikes 1:52 PM.";
            goToScene("ep2_lunch_solo_wrap");
          }
        }
      ]
    })
  },

  ep2_lunch_solo_wrap: {
    id: "ep2_lunch_solo_wrap",
    chapter: "CHAPTER I · EPISODE II",
    title: "Late Bell — West Quad",
    presentNPCs: [],
    render: () => ({
      text: [
        state.mem.soloLunchWrap || "You pack up your bag by the west quad wall, realizing the afternoon seminar already started seven minutes ago.",
        "You cut across the courtyard at a brisk pace toward Block B, arriving at the post-afternoon lecture door seven minutes past the bell."
      ],
      choices: [
        {
          label: "Reach the door of the post-afternoon lecture hall →",
          action: () => {
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
            chloeStateLine(
              "\"Okay, real talk,\" Chloe says, resting her chin in her palm and leaning toward you. \"After two days of this place, who's actually real and who's putting on a costume?\"",
              "\"Okay, real talk,\" Chloe says, folding one leg over the other and studying you across the stone table. \"After two days of this place, who's actually real and who's putting on a costume?\""
            )
          ],
          choices: [
            {
              label: "\"Maya's the only one not wearing a costume. You're still half-in-character, Chloe.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe gasps dramatically, pressing a hand to her chest before breaking into a grin. \"Excuse you—this is pure authenticity.\"",
                  "Chloe's eyes narrow half a millimeter, intrigued that you called her bluff right in front of Maya. \"Bold claim.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Nate and Elliot are pure performance. Most people here are just nervous.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe nods slowly, tapping her iced coffee cup with a manicured nail. \"Spot on about both of them.\"",
                  "Chloe gives a measured nod, recognizing the clean read on the cohort. \"Accurate.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Honestly, sitting with you two feels like the first real break all day.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Maya smiles warmly, and Chloe's shoulders drop an inch as she relaxes into the bench. \"Glad we passed the vibe check.\"",
                  "Maya smiles warmly, while Chloe watches you with a quiet, evaluating look. \"We don't waste lunch on boring company.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Almost everybody here is fake—yourself included when you're around the front row.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe's smile tightens for a beat before she forces a light scoff. \"Oh, so you're an expert on me now?\"",
                  "Chloe's jaw sets coolly, her gaze sharpening like flint across the table. \"Say that again if you think I won't check you.\""
                );
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
            state.mem.lastBeatReaction,
            chloeStateLine(
              "Maya hides a quiet smile behind her water bottle while Chloe narrows her eyes playfully at you across the table. \"Excuse me, I do not wear a costume,\" Chloe protests, though there's zero real heat behind it.",
              "Maya hides a quiet smile behind her water bottle while Chloe holds your gaze evenly across the table. \"I don't wear a costume,\" Chloe replies smoothly, her tone cool and deliberate."
            ),
            "Maya leans forward slightly. \"She spent forty minutes picking out that cropped jacket before 8 AM so nobody would guess she stayed up outlining macroeconomics.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Forty minutes? And here I thought the effortless baddie look took five.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "\"It's an art form,\" Chloe shoots back with a bright, unguarded laugh.",
                  "\"Preparation isn't effort—it's standard,\" Chloe answers evenly, though the corner of her mouth twitches."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Maya's just exposing the whole operation at lunch.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Maya chuckles softly while Chloe glares at her best friend in mock betrayal.",
                  "Maya chuckles softly while Chloe shoots her best friend a dry, side-eyed warning."
                );
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
            state.mem.lastBeatReaction,
            chloeStateLine(
              "Chloe groans, burying her face in one hand for a second before looking back up with a wry grin. \"Traitors. Both of you.\"",
              "Chloe exhales slowly, leaning back against the bench with a dry half-smile. \"Remind me never to let you two team up.\""
            ),
            "Maya turns to you with quiet curiosity. \"What about you? Where did you grow up before coming here?\""
          ].filter(Boolean),
          choices: [
            {
              label: "Share a grounded, honest detail about home and why you chose this program.",
              action: () => {
                state.rep.maya += 3;
                adjustChloeMatrix(2, 0);
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe listens quietly without interrupting, her expression unusually open and attentive.",
                  "Chloe listens intently, filing away every detail with quiet respect."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Somewhere quiet enough that campus drama feels like free theater.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe smirks, resting her chin in her hand. \"Careful, front-row seats here come with a price.\"",
                  "Chloe tilts her head slightly. \"Good. Spectators who talk usually end up on the stage anyway.\""
                );
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
            state.mem.lastBeatReaction,
            chloeStateLine(
              "A breeze catches the corner of Chloe's napkin; you catch it before it blows off the stone table. Chloe's fingers brush yours as she takes it back, lingering half a beat longer than necessary. \"Max asked if we're going to the pavilion shelter hangout after the last class,\" Chloe mentions casually, watching your eyes to see your reaction.",
              "A breeze catches the corner of Chloe's napkin; you catch it before it blows off the stone table. Chloe takes it back with a deliberate, steady look that tests your composure. \"Max asked if we're going to the pavilion shelter hangout after the last class,\" Chloe says coolly, gauging whether you flinch."
            )
          ].filter(Boolean),
          choices: [
            {
              label: "\"Of course Max did. Good thing I'll already be there.\"",
              action: () => {
                adjustChloeMatrix(1, 3);
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe's eyes flash with a quick, pleased spark before she looks down at her drink.",
                  "Chloe's lips curve into a slow, satisfied smirk—clearly approving that you didn't cede an inch."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Maya going too? If you two are there, I'll swing by.\"",
              action: () => {
                state.rep.maya += 3;
                applyTone("complimentary", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Maya looks pleased, and Chloe nods with an easy smile.",
                  "Maya looks pleased, while Chloe gives a brief, composed nod."
                );
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
            state.mem.lastBeatReaction,
            "Maya nods softly. \"I'm going for a little while—Chloe promised we wouldn't stay if it gets sloppy.\"",
            chloeStateLine(
              "Chloe rolls her eyes playfully. \"I said I'd behave. Mostly.\"",
              "Chloe lifts one eyebrow with a dry half-smile. \"I said I'd keep it civilized. Mostly.\""
            )
          ].filter(Boolean),
          choices: [
            {
              label: "\"'Mostly' sounds like a liability, Reed.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "\"You'll just have to keep an eye on me then,\" Chloe teases lightly.",
                  "\"I handle my own liabilities,\" Chloe replies smoothly, holding your eye."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            },
            {
              label: "\"Smart having a cutoff time.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "maya" });
                state.mem.lastBeatReaction = chloeStateLine(
                  "Maya nods in quiet agreement while Chloe stirs her straw thoughtfully with a soft smile.",
                  "Maya nods in quiet agreement while Chloe stirs her straw thoughtfully, keeping her gaze steady."
                );
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
            state.mem.lastBeatReaction,
            chloeStateLine(
              "The conversation drifts effortlessly into music, terrible hometown summer jobs, and which professors grade on a curve. For the first time since Orientation began, Chloe isn't checking her phone every thirty seconds—she's angled fully toward you.",
              "The conversation drifts effortlessly into music, terrible hometown summer jobs, and which professors grade on a curve. Chloe drops the campus armor bit by bit, matching your pace beat for beat without checking her phone once."
            )
          ].filter(Boolean),
          choices: [
            {
              label: "Keep the banter easy and unhurried.",
              action: () => {
                adjustChloeMatrix(2, 1);
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe laughs at your last remark, completely losing track of the courtyard emptying out around your table.",
                  "Chloe leans back with a rare, relaxed smile, completely losing track of the courtyard emptying out around your table."
                );
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
            state.mem.lastBeatReaction,
            "Suddenly, Maya glances down at her wristwatch and freezes. \"Chloe... it's 1:52. Post-afternoon seminar started seven minutes ago.\"",
            chloeStateLine(
              "Chloe's eyes go wide behind her sunglasses as she grabs her bag and looks at you. \"Are you kidding me? Vance is going to lock the door!\"",
              "Chloe's composure snaps straight into action as she grabs her bag in one smooth motion. \"1:52? Vance locks the door at ten past—move!\""
            )
          ].filter(Boolean),
          choices: [
            {
              label: "\"Grab your bags—we cut through the west arcade and walk in together.\"",
              action: () => {
                state.mem.lastBeatReaction = chloeStateLine(
                  "Chloe falls into step right beside you with Maya at her shoulder as you take the west arcade shortcut at a fast clip.",
                  "Chloe matches your stride immediately, keeping pace beside you through the west arcade shortcut with Maya right behind."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_chloe_maya");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          chloeStateLine(
            "You, Chloe, and Maya hurry up the Block B stairs together—Chloe laughing breathlessly beside you as you reach the lecture hall seven minutes past the bell.",
            "You, Chloe, and Maya hurry up the Block B stairs together—Chloe keeping sharp, composed pace beside you as you reach the lecture hall seven minutes past the bell."
          )
        ].filter(Boolean),
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
          text: [state.mem.lastBeatReaction, prompts[beat - 1]].filter(Boolean),
          choices: [
            {
              label: "Match their sharp, playful energy with a dry tease.",
              action: () => {
                state.rep.brandy += 2;
                state.rep.mandy += 2;
                applyTone("tease", { targetNpc: "brandy" });
                state.mem.lastBeatReaction = "Brandy smirks across her iced cup while Mandy points at you in instant approval.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_twins");
              }
            },
            {
              label: "Keep your answer grounded and unbothered.",
              action: () => {
                applyTone("factual", { targetNpc: "brandy" });
                state.mem.lastBeatReaction = "Both twins nod, visibly respecting that you don't try too hard to match their volume.";
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
            state.mem.lastBeatReaction,
            "Brandy checks her lock screen and curses softly in Spanish. \"1:53 PM. We're officially late for the post-afternoon lecture.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Come on—we're walking in together anyway.\"",
              action: () => {
                state.mem.lastBeatReaction = "Brandy slings her bag over one shoulder and Mandy grabs her drink as the three of you head briskly toward Block B.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_twins");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          "You walk briskly into Block B alongside Brandy and Mandy, seven minutes past the afternoon bell."
        ].filter(Boolean),
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
          text: [state.mem.lastBeatReaction, prompts[beat - 1]].filter(Boolean),
          choices: [
            {
              label: "Keep your tone blunt, dry, and unsentimental.",
              action: () => {
                state.rep.laura += 2;
                applyTone("factual", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "Laura takes a slow sip of black coffee, visibly comfortable with the easy pace.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_laura");
              }
            },
            {
              label: "Give her a deadpan jab about hiding behind her paperback.",
              action: () => {
                state.rep.laura += 2;
                applyTone("bully", { targetNpc: "laura" });
                state.mem.lastBeatReaction = "Laura flips a page without looking up, though the corner of her mouth twitches upward.";
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
            state.mem.lastBeatReaction,
            "Laura glances at the clock tower above the quad and exhales slowly. \"1:52. We're late for the afternoon seminar.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Let's go before they mark us absent.\"",
              action: () => {
                state.mem.lastBeatReaction = "Laura tucks her paperback into her satchel and steps down off the colonnade beside you.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_laura");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          "You and Laura walk across the courtyard into Block B, arriving late to the post-afternoon lecture."
        ].filter(Boolean),
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
          text: [state.mem.lastBeatReaction, prompts[beat - 1]].filter(Boolean),
          choices: [
            {
              label: "Keep the banter sharp with Malik.",
              action: () => {
                state.rep.malik += 2;
                applyTone("tease", { targetNpc: "malik" });
                state.mem.lastBeatReaction = "Malik laughs and daps you across the table while Rob shakes his head.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_backrow");
              }
            },
            {
              label: "Back Rob's take on keeping things solid.",
              action: () => {
                state.rep.rob += 2;
                applyTone("factual", { targetNpc: "rob" });
                state.mem.lastBeatReaction = "Rob gives a firm nod, clearly counting you among the people he trusts on the floor.";
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
            state.mem.lastBeatReaction,
            "Rob checks his phone and stands up fast. \"1:53—we missed the bell for Vance's afternoon class.\""
          ].filter(Boolean),
          choices: [
            {
              label: "\"Move—let's get to Block B.\"",
              action: () => {
                state.mem.lastBeatReaction = "You clear the trays together and head out of the dining terrace at a brisk jog toward Block B.";
                advanceGetToKnowYouBeat();
                goToScene("ep2_lunch_arc_backrow");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.lastBeatReaction,
          "You, Rob, and Malik jog up the Block B stairs, arriving late to the post-afternoon lecture."
        ].filter(Boolean),
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
