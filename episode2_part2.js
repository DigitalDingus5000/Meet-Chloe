// ============================================================================
// MEET CHLOE — CHAPTER ONE: EPISODE TWO, PART 2 (episode2_part2.js)
// Covers Scenes 5–6, Bonus Scenes, & Finale Dossier:
// - Scene 5 Router: Post-Afternoon Class (4 beats/person, Low/High Aura entry, Yesterday's Homework)
//   OR Conditional Brandon Side-Event (only if failed all job checks, failed Teacher's Pet, & alone)
// - Convergence Bridge: 4:30 PM West Pines Path -> Scene 6 School Hangout
// - Scene 6: School Hangout (6 beats/person, 8-person Truth or Dare, 5-turn Spin the Bottle,
//   CONTROL vs PURSUE Multi-Girl Kiss Meltdown + High/Low Control intervention)
// - Winding Down -> Extended Bonus Scenes:
//     * Single-Girl Sleepover (HOT girl + High Aura -> 6 beats -> SFW sex scene + non-negotiable GF claim)
//     * Group Sleepover (Multi-person 6 beats/person -> High Aura + all HOT + Chloe PURSUE + High Control + Uber cash check -> Threesome/Foursome/Fivesome + Uber home OR normal sleepover)
//     * Chloe Alone Sleepover (VIP party invite branch w/ GF refusal vs Max party OR 6-beat SleptWithChloe / Boyfriend-Rejection matrix check)
//     * Invite-Only VIP Mixer Party:
//         - Anonymous Invite from Ep.1 -> Ally (2nd-yr Asian Pick Me, Tanya rival) + Brandon interruption
//         - Go Alone (Tanya + Nate sabotage) OR Go With Chloe
//           (Joined by Max -> Low Aura = Max leaves w/ Chloe; High Aura + High Control & Mastery = Chloe stays;
//            High Aura + Low Control = Fight Max option -> guaranteed loss)
// - Episode 2 Finale Dossier (Reveals Hidden Stats, 2x2 Matrix, HOT/NOT, & Choice-Memory Log)
// Depends on: characters.js, engine.js, episode2_part1.js
// ============================================================================

function ep2ChloeModeLine(pursueText, controlText) {
  if (typeof chloeStateLine === "function") {
    return chloeStateLine(pursueText, controlText);
  }
  return state.chloeMode === "PURSUE" ? pursueText : controlText;
}

function ep2ChloeChoiceLabel(pursueLabel, controlLabel) {
  return state.chloeMode === "PURSUE" ? pursueLabel : controlLabel;
}

function ep2TransitionToScene(targetSceneId) {
  if (state && state.activeArc) {
    state.activeArc = null;
  }
  goToScene(targetSceneId);
}

function ep2PassedAnyJobCheck() {
  return Boolean(
    state.mem.passedJobCheck ||
    state.mem.councilRole === "fresher_liaison" ||
    state.mem.councilRole === "policy_coordinator"
  );
}

function ep2HasAnonymousVipInvite() {
  return Boolean(
    state.mem.anonVipInvite ||
    state.mem.anonymousVipInvite ||
    state.mem.ep1AnonVipInvite ||
    state.mem.receivedAnonVipMessage
  );
}

function ep2HasVipMixerAccess() {
  return Boolean(
    ep2HasAnonymousVipInvite() ||
    state.mem.hasVIPMixerTicket ||
    state.mem.vipMixerInvite ||
    state.mem.ep1VipTicket ||
    state.mem.hasVIPWristband ||
    state.mem.tanyaPersonalVipGranted
  );
}

function ep2BrandonStanding() {
  const metBrandon = Boolean(
    state.mem.brandonBond ||
    state.mem.metBrandon ||
    (state.rep && (state.rep.brandon || 0) !== 0) ||
    (typeof npcRemembers === "function" &&
      (npcRemembers("brandon", "ep2_brandon_side_bond") || npcRemembers("brandon", "ep1_met_brandon")))
  );
  if (!metBrandon) return "unmet";
  if ((state.rep && (state.rep.brandon || 0) < 0) || state.mem.brandonFoe) return "foe";
  return "friend";
}

function ep2IsChloeGirlfriend() {
  return Boolean(
    state.mem.chloeGirlfriend ||
    state.mem.girlfriend === "chloe" ||
    state.mem.night1Ending === "pursue_room_six_beats_sfw_bf"
  );
}

function ep2SleptWithChloe() {
  return Boolean(
    state.mem.sleptWithChloe ||
    state.mem.night1Ending === "pursue_dorm_sfw" ||
    state.mem.night1Ending === "pursue_room_six_beats_sfw_bf" ||
    state.mem.night1Ending === "pursue_room_six_beats_sfw_refused"
  );
}

function ep2RejectedChloeBoyfriend() {
  return Boolean(
    state.mem.rejectedChloeBoyfriend ||
    state.mem.night1Ending === "pursue_room_six_beats_sfw_refused"
  );
}

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
      const failedAllJobs = !ep2PassedAnyJobCheck();
      const failedTeachersPet = !npcRemembers("elliot", "ep1_outshone_elliot");
      const isAlone = !state.mem.lunchCompanion || state.mem.lunchCompanion === "alone";

      if (failedAllJobs && failedTeachersPet && isAlone) {
        startGetToKnowYouArc("ep2_brandon_side", "brandon", "ep2_post_class_convergence", 4);
        return {
          text: [
            "You walk down the Block B corridor alone at 1:54 PM—no Council liaison role, no Teacher's Pet leverage from yesterday, and the heavy oak door to Lecture Room 4 already latched shut with Vance's voice booming behind the glass.",
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
              ep2TransitionToScene("ep2_post_class_convergence");
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
            ? ep2ChloeModeLine(
                "Chloe and Maya slide into the back-left bench right beside you, Chloe leaning a fraction closer with an eager, low-key grin as the door clicks shut.",
                "Chloe and Maya slide into the back-left bench right beside you, Chloe keeping her posture composed and coolly detached as the door clicks shut."
              )
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
          state.mem.night1Ending === "control_did_homework" ||
          state.mem.night1Ending === "control_library_tension_raised" ||
          state.mem.night1Ending === "pursue_library_elliot_done" ||
          state.mem.night1Ending === "pursue_dorm_sfw" ||
          state.mem.night1Ending === "pursue_escort_with_elliot" ||
          state.mem.night1Ending === "pursue_room_six_beats_sfw_bf" ||
          state.mem.night1Ending === "pursue_room_six_beats_sfw_refused" ||
          state.mem.night1Ending === "pursue_room_six_beats_cuddle" ||
          state.mem.middayRoute === "library" ||
          npcRemembers("elliot", "ep1_outshone_elliot");

        return {
          text: [
            "Ten minutes into the lecture, Vance sets down his chalk and taps the lectern. \"Before we move to pricing models, pass yesterday's diagnostic homework down to the aisle. No extensions.\"",
            "Elliot snaps his crisp, stapled packet onto the aisle desk within two seconds, looking back toward your row to see if you're empty-handed.",
            hasHomework
              ? "Because you put the hours into yesterday's work—or had it taken care of before class—your completed diagnostic sits right inside your folder, clean and ready."
              : "Your folder is light—yesterday's detours left yesterday's diagnostic half-finished."
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
            ? ep2ChloeModeLine(
                "Under the desk, Chloe slides a folded corner of paper toward your wrist with 'Pavilion. 6 PM' and a small smiley drawn beside it—clearly leaning into seeing you tonight. Maya gives a soft nod beside her.",
                "Under the desk, Chloe slides a folded corner of paper toward your wrist with two crisp words: 'Pavilion. 6 PM.' Her posture stays guarded and composed as she sets the terms cleanly."
              )
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
              label: ep2ChloeChoiceLabel(
                "Give Chloe a subtle, confident nod back as the clock ticks toward dismissal.",
                "Give a measured, composed nod as the clock ticks toward dismissal."
              ),
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
              ep2TransitionToScene("ep2_post_class_convergence");
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

      const councilNote =
        state.mem.tanyaAcknowledged || state.tanyaStatus === "HOT"
          ? "Tanya's HOT acknowledgement from the Student Council assembly still carries quiet weight as you walk the dusk trail."
          : ep2PassedAnyJobCheck()
            ? "Your Student Council role selection from the morning assembly sets you apart as the cohort heads toward the pines."
            : "The afternoon's morning assembly and seminars are behind you as the dusk trail opens up.";

      return {
        text: [
          "By 5:45 PM, the gravel footpath winding behind the west pines hums with footsteps, portable bass speakers, and paper bags of snacks. " + councilNote,
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
            ep2ChloeModeLine(
              "Chloe sits cross-legged on the wide bench beside Maya, golden hair catching the amber bulbs and shooting you a quick, warm, teasing look; Brandy and Mandy claim the opposite rail; Elliot sits stiffly at the edge trying to prove he isn't a square; and " + lauraLine,
              "Chloe sits cross-legged on the wide bench beside Maya, golden hair catching the amber bulbs and holding a cool, composed, unbothered gaze; Brandy and Mandy claim the opposite rail; Elliot sits stiffly at the edge trying to prove he isn't a square; and " + lauraLine
            ),
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
            ep2ChloeModeLine(
              "Turn 1 lands on Chloe—she locks eyes with you across the crate with an unmistakable spark in PURSUE mode before Malik spins again and Turn 2 lands squarely on Brandy.",
              "Turn 1 lands on Chloe—she holds a cool, measured look in CONTROL mode as the bottle passes before Malik spins again and Turn 2 lands squarely on Brandy."
            ),
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
              label: ep2ChloeChoiceLabel(
                "Lean back beside Chloe as the final spin wraps up—letting her stay close.",
                "Lean back beside Chloe as the final spin wraps up—keeping things composed and low-key."
              ),
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
              ep2TransitionToScene("ep2_winding_down");
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
                  ep2TransitionToScene("ep2_winding_down");
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
                  ep2TransitionToScene("ep2_winding_down");
                }
              }
            ]
      };
    }
  },

  // ==========================================================================
  // PRE-BONUS CONVERGENCE: WINDING DOWN -> ROUTING TO BONUS SCENES
  // ==========================================================================
  ep2_winding_down: {
    id: "ep2_winding_down",
    chapter: "CHAPTER I · EPISODE II",
    title: "Winding Down",
    presentNPCs: ["chloe", "maya", "brandy", "mandy"],
    render: () => {
      const otherGirls = ["maya", "brandy", "mandy"];
      if (knowsLaura(state)) otherGirls.push("laura");
      const hotOtherGirls = otherGirls.filter((g) => isGirlHot(g, state));

      const allGirls = ["chloe", ...otherGirls];
      const hotAllGirls = allGirls.filter((g) => isGirlHot(g, state));

      const hasAnonInvite = ep2HasAnonymousVipInvite();
      const canSingleSleepover = hotOtherGirls.length >= 1 && state.aura >= 60;
      const canGroupSleepover = hotAllGirls.length >= 2 && !state.mem.bitter_meltdown;
      const canChloeSleepover = !state.mem.bitter_meltdown;
      const canVIPMixer = state.aura >= 62 && !canGroupSleepover && !canSingleSleepover;

      return {
        text: [
          "By 8:30 PM, the pavilion firepit dies down to glowing embers. Distant bass thumps from the east courtyard where the invite-only VIP Mixer Party is getting underway.",
          hasAnonInvite
            ? "Your phone pings with an anonymous message confirming your VIP Mixer entry—and right beside it, the night branches toward its final chapter."
            : "Your phone vibrates once in your palm as the night branches toward its final chapter."
        ],
        choices: [
          ...(hasAnonInvite
            ? [
                {
                  label: "Follow the Episode One anonymous message into the VIP Mixer Party—meet Ally (10-Beat Extended Bonus).",
                  action: () => {
                    state.mem.vipMode = "ally_anon";
                    startGetToKnowYouArc("ep2_bonus_vip_ally_arc", "ally", "ep2_night2_close", 10);
                    goToScene("ep2_vip_ally");
                  }
                }
              ]
            : []),
          ...(canSingleSleepover
            ? [
                {
                  label: "Invite a single HOT girl back for a 1-on-1 Sleepover (6 Story Beats — High Aura).",
                  action: () => {
                    goToScene("ep2_single_sleepover_setup");
                  }
                }
              ]
            : []),
          ...(canGroupSleepover
            ? [
                {
                  label: "Host an after-hours Multi-Person Sleepover (6 Story Beats per girl present).",
                  action: () => {
                    goToScene("ep2_sleepover_setup");
                  }
                }
              ]
            : []),
          ...(canChloeSleepover
            ? [
                {
                  label: "Spend the night with Chloe alone (VIP Party Invite / Girlfriend & Matrix Sleepover Check).",
                  action: () => {
                    goToScene("ep2_chloe_alone_sleepover_router");
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
                    startGetToKnowYouArc("ep2_bonus_vip_alone_arc", "tanya", "ep2_night2_close", 10);
                    goToScene("ep2_vip_alone");
                  }
                }
              ]
            : []),
          {
            label: "Call it a night and walk back across the quiet quad to your dorm.",
            action: () => {
              ep2TransitionToScene("ep2_night2_close");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE S1: SINGLE-GIRL SLEEPOVER (6 BEATS + HOT CHECK -> SFW SEX + NON-NEGOTIABLE GF)
  // ==========================================================================
  ep2_single_sleepover_setup: {
    id: "ep2_single_sleepover_setup",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "One-on-One Sleepover",
    presentNPCs: ["maya", "brandy", "mandy"],
    render: () => {
      const candidates = ["maya", "brandy", "mandy"];
      if (knowsLaura(state)) candidates.push("laura");
      const hotCandidates = candidates.filter((g) => isGirlHot(g, state));

      return {
        text: [
          "With your High Aura drawing attention all evening, one girl lingers behind at the edge of the residence walkway—waiting to see if you'll invite her upstairs alone."
        ],
        choices: [
          ...hotCandidates.map((g) => {
            const name = CHARACTERS[g] ? CHARACTERS[g].name : g;
            return {
              label: `Invite ${name} up for a 1-on-1 Sleepover (6 Story Beats).`,
              action: () => {
                state.mem.singleSleepoverGirl = g;
                startGetToKnowYouArc("ep2_single_sleepover_arc", g, "ep2_night2_close", 6);
                goToScene("ep2_single_sleepover");
              }
            };
          }),
          {
            label: "Step back toward the walkway and reconsider your plans for the night.",
            action: () => {
              ep2TransitionToScene("ep2_winding_down");
            }
          }
        ]
      };
    }
  },

  ep2_single_sleepover: {
    id: "ep2_single_sleepover",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "Private Sleepover — 1-on-1",
    presentNPCs: [],
    render: () => {
      const girl = state.mem.singleSleepoverGirl || "maya";
      const name = CHARACTERS[girl] ? CHARACTERS[girl].name : girl;
      state.presentNPCs = [girl];
      const arc = state.activeArc || startGetToKnowYouArc("ep2_single_sleepover_arc", girl, "ep2_night2_close", 6);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            `The dorm door clicks shut behind you and ${name}, locking out the noise of the campus quad. She kicks off her shoes by the mat and drops onto the edge of the bed with an unguarded smile.`
          ],
          choices: [
            {
              label: `Keep the vibe relaxed and confident—"Glad you came up instead of heading back early."`,
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) + 2;
                applyTone("complimentary", { targetNpc: girl });
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            },
            {
              label: `Tease her lightly—"Careful, people might start talking if you stay past midnight."`,
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) + 2;
                applyTone("tease", { targetNpc: girl });
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            `${name} borrows one of your oversized hoodies, tugging the sleeves over her wrists as low music hums from your desk speaker. Without anyone else in the room watching, she drops every bit of campus armor.`
          ],
          choices: [
            {
              label: "Sit beside her and let the conversation flow without forcing anything.",
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) + 2;
                state.control = clamp(state.control + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            },
            {
              label: "Pull back and act cold—killing the warmth in the room.",
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) - 8;
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            `Halfway through a late-night card round on the mattress, ${name} leans her shoulder against yours, tilting her face up so her eyes meet yours under the warm desk lamp.`
          ],
          choices: [
            {
              label: "Hold eye contact steadily and match her closeness.",
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) + 2;
                state.aura = clamp(state.aura + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            },
            {
              label: "Brush her off awkwardly and check your phone.",
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) - 8;
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            `The desk lamp clicks off into silver streetlight through the blinds. ${name} shifts closer under the blanket, her fingers tracing lightly across your wrist.`
          ],
          choices: [
            {
              label: "Lean in and kiss her slowly—unhurried and present.",
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) + 3;
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            },
            {
              label: "Turn over to the far edge of the bed and tell her you're going to sleep.",
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) - 8;
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 5) {
        return {
          text: [
            `${name}'s breath catches softly against your collarbone as the space between you disappears completely, testing whether the spark holds all the way through the night.`
          ],
          choices: [
            {
              label: "Stay locked in with her—steady, magnetic, and completely in sync.",
              action: () => {
                state.rep[girl] = (state.rep[girl] || 0) + 2;
                advanceGetToKnowYouBeat();
                goToScene("ep2_single_sleepover");
              }
            }
          ]
        };
      }

      // Beat 6: Check if she is still HOT at the end of the 6 story beats
      const stillHot = isGirlHot(girl, state);

      if (!state.mem.singleSleepoverResolved) {
        state.mem.singleSleepoverResolved = true;
        if (stillHot) {
          state.mem.girlfriend = girl;
          state.mem.datingNonNegotiable = true;
          state.rep[girl] = (state.rep[girl] || 0) + 6;
          recordChoiceMemory(
            `ep2_single_sleepover_bf_${girl}`,
            girl,
            `Kept ${name} in HOT through the 1-on-1 sleepover, triggering a romantic SFW sex scene and non-negotiable boyfriend status.`
          );
        } else {
          recordChoiceMemory(
            `ep2_single_sleepover_cooled_${girl}`,
            girl,
            `Lost ${name}'s HOT standing during the 1-on-1 sleepover, ending the night quietly without intimacy.`
          );
        }
      }

      return {
        text: stillHot
          ? [
              `Because you kept ${name} in HOT all the way to the final beat, the night unfolds into an intimate, unhurried romantic SFW sex scene behind closed doors.`,
              `When morning light filters across the pillows, ${name} rests her chin against your chest with a firm, unmistakable smile: "Just so we're clear—you're my boyfriend now. Non-negotiable."`
            ]
          : [
              `Because the spark cooled before the final beat and ${name} dropped out of HOT, the two of you simply pull the blankets up and fall asleep side by side without taking things further.`
            ],
        choices: [
          {
            label: "Step out into the quiet morning quad as the night closes →",
            action: () => {
              ep2TransitionToScene("ep2_night2_close");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE A: MULTI-PERSON SLEEPOVER (6 BEATS PER IN-SCENE PERSON)
  // Stacked check at end: High Aura + All Girls HOT + Chloe in PURSUE (if present) +
  // High Emotional Control + Uber Cash ($25/girl) -> Threesome/Foursome/Fivesome + Uber Home
  // Otherwise -> Normal sleepover where everyone goes to bed
  // ==========================================================================
  ep2_sleepover_setup: {
    id: "ep2_sleepover_setup",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "Multi-Person Sleepover Roster",
    presentNPCs: ["chloe", "maya", "brandy", "mandy"],
    render: () => {
      const rosterPool = ["chloe", "maya", "brandy", "mandy"];
      if (knowsLaura(state)) rosterPool.push("laura");
      const hotPool = rosterPool.filter((g) => isGirlHot(g, state));

      const threeGroup = hotPool.slice(0, 3);
      const fourGroup = hotPool.slice(0, 4);
      const fiveGroup = hotPool.slice(0, 5);

      return {
        text: [
          "Before heading upstairs to the suite, the girls look to you to lock in the multi-person sleepover roster. Each girl present adds 6 story beats—and pulling off a threesome, foursome, or fivesome requires stacking High Aura, every girl HOT, Chloe in PURSUE (if present), High Emotional Control, and enough cash ($25 per girl) to call everyone an Uber home afterward."
        ],
        choices: [
          {
            label: "2-Person Sleepover: Chloe & Maya (12 Story Beats total).",
            action: () => {
              const group = ["chloe", "maya"];
              state.mem.sleepoverGroup = group;
              startGetToKnowYouArc("ep2_bonus_sleepover_arc", "chloe", "ep2_night2_close", group.length * 6);
              goToScene("ep2_bonus_sleepover");
            }
          },
          {
            label: "2-Person Sleepover: Brandy & Mandy (12 Story Beats total).",
            action: () => {
              const group = ["brandy", "mandy"];
              state.mem.sleepoverGroup = group;
              startGetToKnowYouArc("ep2_bonus_sleepover_arc", "brandy", "ep2_night2_close", group.length * 6);
              goToScene("ep2_bonus_sleepover");
            }
          },
          ...(threeGroup.length >= 3
            ? [
                {
                  label: `3-Person Sleepover (${threeGroup.map((g) => CHARACTERS[g]?.name || g).join(", ")}) — 18 Story Beats & Threesome Check.`,
                  action: () => {
                    state.mem.sleepoverGroup = threeGroup;
                    startGetToKnowYouArc("ep2_bonus_sleepover_arc", threeGroup[0], "ep2_night2_close", threeGroup.length * 6);
                    goToScene("ep2_bonus_sleepover");
                  }
                }
              ]
            : []),
          ...(fourGroup.length >= 4
            ? [
                {
                  label: `4-Person Sleepover (${fourGroup.map((g) => CHARACTERS[g]?.name || g).join(", ")}) — 24 Story Beats & Foursome Check.`,
                  action: () => {
                    state.mem.sleepoverGroup = fourGroup;
                    startGetToKnowYouArc("ep2_bonus_sleepover_arc", fourGroup[0], "ep2_night2_close", fourGroup.length * 6);
                    goToScene("ep2_bonus_sleepover");
                  }
                }
              ]
            : []),
          ...(fiveGroup.length >= 5
            ? [
                {
                  label: `5-Person Sleepover (${fiveGroup.map((g) => CHARACTERS[g]?.name || g).join(", ")}) — 30 Story Beats & Fivesome Check.`,
                  action: () => {
                    state.mem.sleepoverGroup = fiveGroup;
                    startGetToKnowYouArc("ep2_bonus_sleepover_arc", fiveGroup[0], "ep2_night2_close", fiveGroup.length * 6);
                    goToScene("ep2_bonus_sleepover");
                  }
                }
              ]
            : []),
          {
            label: "Step back to the courtyard before locking in the roster.",
            action: () => {
              ep2TransitionToScene("ep2_winding_down");
            }
          }
        ]
      };
    }
  },

  ep2_bonus_sleepover: {
    id: "ep2_bonus_sleepover",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "After-Hours Group Sleepover",
    presentNPCs: ["chloe", "maya", "brandy", "mandy"],
    render: () => {
      const group = state.mem.sleepoverGroup || ["chloe", "maya"];
      state.presentNPCs = group;
      const totalBeats = group.length * 6;
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_sleepover_arc", group[0], "ep2_night2_close", totalBeats);
      const beat = arc.beatIndex;

      // 6 story beats per in-scene person
      const personIdx = Math.min(group.length - 1, Math.floor((beat - 1) / 6));
      const personBeat = ((beat - 1) % 6) + 1;
      const currentGirl = group[personIdx];
      const currentName = CHARACTERS[currentGirl] ? CHARACTERS[currentGirl].name : currentGirl;

      if (beat < totalBeats) {
        const beatScripts = [
          `[Beat ${beat}/${totalBeats} — ${currentName} (1/6)] Inside the locked suite, ${currentName} kicks off her shoes and settles onto the floor cushions as low R&B plays from the speaker.`,
          `[Beat ${beat}/${totalBeats} — ${currentName} (2/6)] ${currentName} trades quick, playful banter with the room while glancing across the coffee table to see how effortlessly you hold the group's attention.`,
          `[Beat ${beat}/${totalBeats} — ${currentName} (3/6)] During a late-night card round, ${currentName} leans in close against your shoulder, letting her hand linger on your knee under the warm lamp light.`,
          `[Beat ${beat}/${totalBeats} — ${currentName} (4/6)] Even with multiple girls sharing the same room, ${currentName}'s guard drops completely as the conversation turns candid and unhurried.`,
          `[Beat ${beat}/${totalBeats} — ${currentName} (5/6)] ${currentName} locks eyes with you across the dim glow of the room, matching the rising electric tension without breaking frame.`,
          `[Beat ${beat}/${totalBeats} — ${currentName} (6/6)] As ${currentName}'s spotlight beat wraps up, the whole suite feels charged—every girl present watching to see how you steer the rest of the night.`
        ];

        return {
          text: [beatScripts[personBeat - 1]],
          choices: [
            {
              label:
                currentGirl === "chloe"
                  ? ep2ChloeChoiceLabel(
                      "Keep your Emotional Control sharp and match Chloe's forward PURSUE energy.",
                      "Keep your Emotional Control sharp and hold Chloe's attention calmly in CONTROL."
                    )
                  : `Keep your Emotional Control sharp and hold ${currentName}'s interest.`,
              action: () => {
                state.rep[currentGirl] = (state.rep[currentGirl] || 0) + 1;
                if (currentGirl === "chloe") adjustChloeMatrix(1, 1);
                advanceGetToKnowYouBeat();
                goToScene("ep2_bonus_sleepover");
              }
            }
          ]
        };
      }

      // Final Beat: Stacked requirement check across all in-scene girls
      const uberCost = group.length * 25;
      const hasHighAura = state.aura >= 62;
      const allGirlsHot = group.every((g) => isGirlHot(g, state));
      const chloePresent = group.includes("chloe");
      const chloePursueOk = !chloePresent || state.chloeMode === "PURSUE";
      const hasHighControl = state.control >= 58;
      const hasUberCash = (state.cash || 0) >= uberCost;

      const groupIntimacyUnlocked =
        group.length >= 3 &&
        hasHighAura &&
        allGirlsHot &&
        chloePursueOk &&
        hasHighControl &&
        hasUberCash;

      const labelMap = {
        3: "Threesome",
        4: "Foursome",
        5: "Fivesome"
      };
      const eventLabel = labelMap[group.length] || "Group Intimacy";

      if (!state.mem.sleepoverResolved) {
        state.mem.sleepoverResolved = true;
        if (groupIntimacyUnlocked) {
          state.cash = Math.max(0, (state.cash || 0) - uberCost);
          state.aura = clamp(state.aura + 5, 0, 100);
          group.forEach((g) => {
            state.rep[g] = (state.rep[g] || 0) + 5;
          });
          if (chloePresent) adjustChloeMatrix(4, 4);
          recordChoiceMemory(
            `ep2_sleepover_${eventLabel.toLowerCase()}`,
            group[0],
            `Passed all stacked checks (${eventLabel}) with ${group.map((g) => CHARACTERS[g]?.name || g).join(", ")} and ordered Ubers home ($${uberCost}) afterward.`
          );
        } else {
          state.aura = clamp(state.aura + 2, 0, 100);
          if (chloePresent) adjustChloeMatrix(2, 1);
          recordChoiceMemory(
            "ep2_sleepover_normal_bed",
            group[0],
            "Finished the multi-person sleepover beats without triggering group intimacy; everyone went to bed normally."
          );
        }
      }

      return {
        text: groupIntimacyUnlocked
          ? [
              `[Beat ${totalBeats}/${totalBeats} — ${eventLabel.toUpperCase()} & UBER SEND-OFF] Every stacked condition locks into place: High Aura, every girl in the room HOT, Chloe in PURSUE, High Emotional Control, and $${uberCost} ready for Ubers.`,
              `The night escalates into an unforgettable romantic SFW ${eventLabel.toLowerCase()} behind the locked suite door—and because nobody stays overnight after a ${eventLabel.toLowerCase()}, you call Ubers ($${uberCost}) so every girl gets home safely before dawn.`
            ]
          : [
              `[Beat ${totalBeats}/${totalBeats} — NORMAL SLEEPOVER] Without all stacked requirements aligned (High Aura, every girl HOT, Chloe in PURSUE, High Emotional Control, and $${uberCost} Uber fare), the night stays low-key—everyone claims pillows and blankets across the suite and goes to bed.`
            ],
        choices: [
          {
            label: "Head out into the quiet morning quad as the sleepover wraps →",
            action: () => {
              ep2TransitionToScene("ep2_night2_close");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE B: CHLOE ALONE SLEEPOVER ROUTER & 6-BEAT SCENE
  // - If VIP party invite passes: option to invite her to party ->
  //     * If Chloe is girlfriend: she refuses party & stays for 6-beat scene -> choice of Cuddle OR SFW sex scene
  //     * If not girlfriend: routes to bonus party scene with Max (ep2_vip_with_chloe)
  // - If not girlfriend & no party invite (or skipped): default 6-beat scene with Chloe ->
  //     * Checks SleptWithChloe first, then rejectedBoyfriend:
  //         - If SleptWithChloe === false: High Tension -> SFW sex scene; else High Comfort -> Cuddle; else Separate beds
  //         - If SleptWithChloe === true && rejectedBoyfriend: High Comfort -> Warm end; else she cries, leaves, & calls you a womanizer
  // ==========================================================================
  ep2_chloe_alone_sleepover_router: {
    id: "ep2_chloe_alone_sleepover_router",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "Alone With Chloe",
    presentNPCs: ["chloe"],
    render: () => {
      const hasPartyInvite = ep2HasVipMixerAccess();
      const isGirlfriend = ep2IsChloeGirlfriend();

      return {
        text: [
          ep2ChloeModeLine(
            "Away from the pavilion crowd, Chloe stops beneath the residence archway, tilting her golden head toward you with a warm, lingering gaze as distant bass from the VIP Mixer carries across the quad.",
            "Away from the pavilion crowd, Chloe stops beneath the residence archway, tilting her golden head toward you with a poised, unreadable look as distant bass from the VIP Mixer carries across the quad."
          )
        ],
        choices: [
          ...(hasPartyInvite
            ? [
                {
                  label: "Invite Chloe to the VIP Mixer Party.",
                  action: () => {
                    if (isGirlfriend) {
                      state.mem.chloeAloneMode = "gf_refused_party";
                      startGetToKnowYouArc("ep2_chloe_alone_arc", "chloe", "ep2_night2_close", 6);
                      goToScene("ep2_chloe_alone_sleepover");
                    } else {
                      state.mem.vipMode = "with_chloe";
                      startGetToKnowYouArc("ep2_bonus_vip_chloe_arc", "chloe", "ep2_night2_close", 10);
                      goToScene("ep2_vip_with_chloe");
                    }
                  }
                }
              ]
            : []),
          {
            label: "Skip the party and spend the night alone with Chloe (6 Story Beats).",
            action: () => {
              state.mem.chloeAloneMode = isGirlfriend ? "gf_refused_party" : "default_matrix";
              startGetToKnowYouArc("ep2_chloe_alone_arc", "chloe", "ep2_night2_close", 6);
              goToScene("ep2_chloe_alone_sleepover");
            }
          },
          {
            label: "Step back toward the pavilion path instead.",
            action: () => {
              ep2TransitionToScene("ep2_winding_down");
            }
          }
        ]
      };
    }
  },

  ep2_chloe_alone_sleepover: {
    id: "ep2_chloe_alone_sleepover",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "Behind Closed Doors — Chloe",
    presentNPCs: ["chloe"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_chloe_alone_arc", "chloe", "ep2_night2_close", 6);
      const beat = arc.beatIndex;
      const mode = state.mem.chloeAloneMode || (ep2IsChloeGirlfriend() ? "gf_refused_party" : "default_matrix");

      if (beat === 1) {
        return {
          text: [
            mode === "gf_refused_party"
              ? ep2ChloeModeLine(
                  "Chloe shakes her head with a knowing, affectionate smirk as she loops her fingers through yours. \"Forget that party—I'm already yours, and I'd rather stay locked in with you tonight.\" Inside the room, the heavy door clicks shut.",
                  "Chloe shakes her head with a cool, self-assured smirk as she loops her fingers through yours. \"Forget that party—I'm already yours, and I'd rather stay locked in with you tonight.\" Inside the room, the heavy door clicks shut."
                )
              : ep2ChloeModeLine(
                  "Inside the dorm room, the heavy door clicks shut, sealing out the campus noise. Chloe drops her leather jacket over the desk chair, kicks off her boots, and looks over at you with open curiosity.",
                  "Inside the dorm room, the heavy door clicks shut, sealing out the campus noise. Chloe drops her leather jacket over the desk chair, kicks off her boots, and keeps her posture measured."
                )
          ],
          choices: [
            {
              label: "Settle in beside her as the room quiets down.",
              action: () => {
                adjustChloeMatrix(1, 1);
                advanceGetToKnowYouBeat();
                goToScene("ep2_chloe_alone_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            ep2ChloeModeLine(
              "Without an audience to perform for, Chloe's sharp campus armor softens into quiet, unhurried candor as she leans toward you on the edge of the bed.",
              "Without an audience to perform for, Chloe stays composed and observant as she sits beside you on the edge of the bed, testing whether you'll earn her trust or chase reactions."
            )
          ],
          choices: [
            {
              label: "Keep the banter warm and grounded—building Comfort.",
              action: () => {
                adjustChloeMatrix(3, 0);
                advanceGetToKnowYouBeat();
                goToScene("ep2_chloe_alone_sleepover");
              }
            },
            {
              label: "Hold her gaze with a slow, teasing smirk—building Tension.",
              action: () => {
                adjustChloeMatrix(0, 3);
                advanceGetToKnowYouBeat();
                goToScene("ep2_chloe_alone_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "She pulls out a small portfolio of editorial fashion layouts she hasn't shown anyone else on campus, watching your face closely as you flip through the pages."
          ],
          choices: [
            {
              label: "Give her an honest, grounded critique that shows you actually pay attention.",
              action: () => {
                adjustChloeMatrix(3, 1);
                advanceGetToKnowYouBeat();
                goToScene("ep2_chloe_alone_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            "The desk lamp clicks off into silver streetlight through the blinds. Chloe leans back against the pillows, leaving the space between you charged and open."
          ],
          choices: [
            {
              label: "Close the distance slowly—letting the moment breathe.",
              action: () => {
                adjustChloeMatrix(1, 2);
                advanceGetToKnowYouBeat();
                goToScene("ep2_chloe_alone_sleepover");
              }
            }
          ]
        };
      }

      if (beat === 5) {
        return {
          text: [
            "Chloe's fingers catch the front of your collar as she looks up through lowered lashes, her pulse fluttering softly against your thumb along her jawline."
          ],
          choices: [
            {
              label: "Stay present with her as the final beat of the night arrives.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_chloe_alone_sleepover");
              }
            }
          ]
        };
      }

      // Beat 6: Resolution
      if (mode === "gf_refused_party") {
        return {
          text: [
            "With Chloe already your girlfriend and refusing the VIP party to stay with you, the end of the night is completely your call."
          ],
          choices: [
            {
              label: "Pull her close for a warm, unhurried Cuddle through the night.",
              action: () => {
                adjustChloeMatrix(4, 1);
                recordChoiceMemory("ep2_chloe_gf_cuddle", "chloe", "Chloe turned down the VIP party to stay with you and spent the night cuddling.");
                ep2TransitionToScene("ep2_night2_close");
              }
            },
            {
              label: "Initiate an intimate, romantic SFW sex scene with Chloe.",
              action: () => {
                state.mem.sleptWithChloe = true;
                adjustChloeMatrix(3, 4);
                recordChoiceMemory("ep2_chloe_gf_sfw", "chloe", "Chloe turned down the VIP party to stay with you and shared a romantic SFW sex scene.");
                ep2TransitionToScene("ep2_night2_close");
              }
            }
          ]
        };
      }

      // Default Chloe sleepover (not girlfriend): check SleptWithChloe first, then rejectedBoyfriend
      const sleptWithChloe = ep2SleptWithChloe();
      const rejectedBf = ep2RejectedChloeBoyfriend();
      const highTension = state.tension >= 24;
      const highComfort = state.comfort >= 20;

      if (!sleptWithChloe) {
        if (highTension) {
          if (!state.mem.chloeAloneResolved) {
            state.mem.chloeAloneResolved = true;
            state.mem.sleptWithChloe = true;
            adjustChloeMatrix(2, 4);
            recordChoiceMemory("ep2_chloe_first_sfw", "chloe", "Hit High Tension after the 6-beat sleepover with Chloe and triggered a romantic SFW sex scene.");
          }
          return {
            text: [
              "Because you hadn't slept with Chloe yet and pushed her Tension high by the end of the sixth beat, the last bit of restraint snaps—unfolding into a charged, romantic SFW sex scene before morning light breaks over the room."
            ],
            choices: [
              {
                label: "Step out into the morning quad as the night closes →",
                action: () => {
                  ep2TransitionToScene("ep2_night2_close");
                }
              }
            ]
          };
        }

        if (highComfort) {
          if (!state.mem.chloeAloneResolved) {
            state.mem.chloeAloneResolved = true;
            adjustChloeMatrix(4, 0);
            recordChoiceMemory("ep2_chloe_cuddle_end", "chloe", "Reached High Comfort with Chloe after the 6-beat sleepover, ending in a warm cuddle.");
          }
          return {
            text: [
              "Tension stayed below the threshold, but your High Comfort with Chloe carries the night—she curls up against your chest under the blankets for a quiet, unguarded cuddle until dawn."
            ],
            choices: [
              {
                label: "Step out into the morning quad as the night closes →",
                action: () => {
                  ep2TransitionToScene("ep2_night2_close");
                }
              }
            ]
          };
        }

        if (!state.mem.chloeAloneResolved) {
          state.mem.chloeAloneResolved = true;
          recordChoiceMemory("ep2_chloe_separate_beds", "chloe", "Neither High Tension nor High Comfort passed with Chloe; ended in a separate-bed sleepover.");
        }
        return {
          text: [
            "With neither High Tension nor High Comfort locked in by the final beat, Chloe offers a polite goodnight and takes the separate bed across the room—leaving the night unfinished."
          ],
          choices: [
            {
              label: "Step out into the morning quad as the night closes →",
              action: () => {
                ep2TransitionToScene("ep2_night2_close");
              }
            }
          ]
        };
      }

      // SleptWithChloe === true
      if (rejectedBf && !highComfort) {
        if (!state.mem.chloeAloneResolved) {
          state.mem.chloeAloneResolved = true;
          adjustChloeMatrix(-8, -6);
          state.rep.chloe -= 8;
          state.mem.bitter_meltdown = true;
          recordChoiceMemory("ep2_chloe_womanizer_walkout", "chloe", "Slept with Chloe previously, rejected boyfriend status, and lacked High Comfort—she cried, called you a womanizer, and walked out.");
        }
        return {
          text: [
            "Because you already slept with Chloe, rejected being her boyfriend, and didn't build High Comfort by the sixth beat, the weight of it hits her all at once.",
            "Tears spill down Chloe's cheeks as she grabs her jacket off the chair, her voice breaking in anger: \"You already got what you wanted and couldn't even call me yours—you're just a womanizer.\" She walks out and slams the door behind her."
          ],
          choices: [
            {
              label: "Step out into the quiet quad after she leaves →",
              action: () => {
                ep2TransitionToScene("ep2_night2_close");
              }
            }
          ]
        };
      }

      if (!state.mem.chloeAloneResolved) {
        state.mem.chloeAloneResolved = true;
        adjustChloeMatrix(4, 2);
        recordChoiceMemory("ep2_chloe_high_comfort_stay", "chloe", "Maintained High Comfort with Chloe after sleeping together previously; she stayed the night calmly.");
      }
      return {
        text: [
          "Because you held High Comfort with Chloe even after turning down the boyfriend label earlier, she stays curled beside you through the night without drama—resting her head on your shoulder until morning."
        ],
        choices: [
          {
            label: "Step out into the morning quad as the night closes →",
            action: () => {
              ep2TransitionToScene("ep2_night2_close");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // BONUS SCENE C0: VIP MIXER PARTY — ANONYMOUS INVITE -> ALLY (4 BEATS) + BRANDON (6 BEATS)
  // ==========================================================================
  ep2_vip_ally: {
    id: "ep2_vip_ally",
    chapter: "CHAPTER I · BONUS CHAPTER",
    title: "VIP Mixer — Ally's Guest List",
    presentNPCs: ["ally"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_vip_ally_arc", "ally", "ep2_night2_close", 10);
      const beat = arc.beatIndex;
      const brandonStanding = ep2BrandonStanding();

      if (beat === 1) {
        state.presentNPCs = ["ally"];
        return {
          text: [
            "Following the anonymous message from the end of Episode One past the velvet rope of the VIP Mixer, a sharp-dressed second-year girl with sleek dark hair and an eager, spotlight-seeking grin waves you over.",
            "\"I'm Ally,\" she says, leaning close with an over-practiced 'so different from other girls' smile. \"I actually put this whole VIP party together—and I'm the one who sent that anonymous invite because I've been hearing good rumors about you. Honestly, half the upperclassmen here—especially Tanya—act way too uptight.\""
          ],
          choices: [
            {
              label: "\"Appreciate the invite, Ally. You went all out setting this lounge up.\"",
              action: () => {
                state.rep.ally = (state.rep.ally || 0) + 4;
                applyTone("complimentary", { targetNpc: "ally" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            },
            {
              label: "\"Good rumors travel fast around here—or you just like curating your own crowd.\"",
              action: () => {
                state.rep.ally = (state.rep.ally || 0) + 4;
                applyTone("tease", { targetNpc: "ally" });
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        state.presentNPCs = ["ally"];
        return {
          text: [
            "Ally waves off a waiter with a breezy flick of her wrist, tilting her head so her sleek hair catches the warm lounge light. \"Most guys here just try to impress Tanya to look important,\" she says, slipping into an eager pick-me pitch. \"I'm not like those stiff council types at all—I actually pay attention when someone stands out.\""
          ],
          choices: [
            {
              label: "\"So throwing a rival VIP party is your way of proving you don't need the council title.\"",
              action: () => {
                state.rep.ally = (state.rep.ally || 0) + 3;
                state.control = clamp(state.control + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            },
            {
              label: "\"Fair enough—you definitely know how to get yourself noticed in a room.\"",
              action: () => {
                state.rep.ally = (state.rep.ally || 0) + 3;
                state.aura = clamp(state.aura + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        state.presentNPCs = ["ally"];
        return {
          text: [
            "Bass thumps softly behind the glass partition while Ally leans against the high bar, watching how effortlessly you hold the room's attention. \"I knew the rumors weren't exaggerating,\" she says softly, dropping her voice just enough to feel conspiratorial. \"Most people talk big until the lights actually come on.\""
          ],
          choices: [
            {
              label: "\"Rumors usually miss half the picture. Better to see how people move in person.\"",
              action: () => {
                state.rep.ally = (state.rep.ally || 0) + 3;
                state.mastery = clamp(state.mastery + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            },
            {
              label: "\"Good thing I showed up to test the theory then.\"",
              action: () => {
                state.rep.ally = (state.rep.ally || 0) + 3;
                state.aura = clamp(state.aura + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        state.presentNPCs = ["ally"];
        return {
          text: [
            "Ally smiles brightly as she glances across the VIP lounge toward the far balcony where Tanya is speaking with upperclassmen. \"Letting Tanya think she runs every social circle on campus gets old fast,\" Ally murmurs, sliding a glass closer to you. \"Glad you're on my side of the room tonight.\""
          ],
          choices: [
            {
              label: "Raise your glass with Ally as footsteps approach from the lounge entrance.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      // Beats 5–10: Brandon interrupts -> 6-Beat Three-Way Dialogue with Memory Check (Unmet / Friend / Foe)
      state.presentNPCs = ["ally", "brandon"];

      if (beat === 5) {
        const brandonIntro =
          brandonStanding === "unmet"
            ? "Before you can answer, a tall guy with tapered locs and wired headphones slung low steps up to the bar—Brandon, someone you haven't crossed paths with until tonight. He sizes you and Ally up with a loose, unbothered grin."
            : brandonStanding === "foe"
              ? "Before you can answer, Brandon steps into the circle with his tapered locs and headphones—and because you've got bad blood with him, his eyes narrow the second he spots you next to Ally."
              : "Before you can answer, Brandon strolls up with his tapered locs and headphones—and since you're on friendly terms with him, he gives you a quick, knowing nod before looking at Ally.";

        return {
          text: [
            brandonIntro,
            "\"Look who made the VIP cut,\" Brandon says, leaning one elbow against the counter between you and Ally. \"Word around the hall is Ally rolled out the red carpet tonight.\""
          ],
          choices: [
            {
              label: "Answer Brandon cleanly and keep Ally engaged in the three-way banter.",
              action: () => {
                if (brandonStanding === "friend") state.rep.brandon += 2;
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      if (beat === 6) {
        const brandonBeat6 =
          brandonStanding === "unmet"
            ? "\"I'm Brandon,\" he says, tapping his phone against his palm. \"Don't think we've officially met yet—but I like watching how people handle themselves when Ally starts playing host.\""
            : brandonStanding === "foe"
              ? "\"Careful, Ally,\" Brandon says with a sharp edge aimed straight at you. \"Rumors and reality don't always match up once the pressure's on.\""
              : "\"Good seeing you make it through the gate,\" Brandon says smoothly to you before grinning at Ally. \"Told you he doesn't sweat crowded rooms.\"";

        return {
          text: [
            brandonBeat6,
            "Ally laughs a little too brightly, angling closer to you while still keeping one eye on Brandon's read of the room."
          ],
          choices: [
            {
              label: "Respond to Brandon's angle with calm, steady composure.",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      if (beat === 7) {
        const brandonBeat7 =
          brandonStanding === "foe"
            ? "Brandon presses his point, testing whether you'll lose your temper in front of Ally and half the VIP crowd."
            : brandonStanding === "friend"
              ? "Brandon tosses a dry remark about campus politics and Tanya's side of the room, letting you set the pace."
              : "Brandon leans back against the rail, watching how you carry your posture and word choice under three-way scrutiny.";

        return {
          text: [
            brandonBeat7,
            "Ally watches your reaction closely, clearly weighing whether your confidence holds up when someone else steps into the conversation."
          ],
          choices: [
            {
              label: "Keep your words sharp, grounded, and unhurried.",
              action: () => {
                state.mastery = clamp(state.mastery + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      if (beat === 8) {
        return {
          text: [
            "The three-way exchange peaks near the terrace doors as music pulses from the lounge. Brandon grins and nods toward the exit: \"Alright, I'm heading out toward the residence wing—let's see who's actually moving when the night wraps.\""
          ],
          choices: [
            {
              label: "Hold your ground beside Ally as Brandon steps back.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      if (beat === 9) {
        const passedAllThree =
          state.mastery >= 56 &&
          state.aura >= 60 &&
          state.control >= 58;

        return {
          text: [
            passedAllThree
              ? "Ally looks at you with unmistakable excitement—your Mastery, Aura, and Emotional Control all held steady through the entire interruption, making you stand head and shoulders above everyone else in the room. \"Forget the rest of this party,\" Ally whispers, taking your hand. \"Come back to my dorm with me.\""
              : "The moment slips—whether from Aura, Mastery, or Emotional Control falling short under the pressure, Ally's eager smile falters as Brandon steps right back beside her. \"Actually, I'm going to head out with Brandon for a bit,\" Ally says quickly, turning toward him."
          ],
          choices: [
            {
              label: passedAllThree
                ? "Go with Ally to her dorm for a private night together."
                : "Watch Ally walk out of the lounge with Brandon.",
              action: () => {
                state.mem.allyPassedCheck = passedAllThree;
                advanceGetToKnowYouBeat();
                goToScene("ep2_vip_ally");
              }
            }
          ]
        };
      }

      const passedAllThree =
        typeof state.mem.allyPassedCheck === "boolean"
          ? state.mem.allyPassedCheck
          : state.mastery >= 56 && state.aura >= 60 && state.control >= 58;

      if (!state.mem.vipAllyResolved) {
        state.mem.vipAllyResolved = true;
        if (passedAllThree) {
          state.rep.ally = (state.rep.ally || 0) + 6;
          state.aura = clamp(state.aura + 3, 0, 100);
          recordChoiceMemory("ep2_vip_ally_dorm_sfw", "ally", "Passed Mastery, Aura, and Emotional Control checks at the VIP Mixer and went to Ally's dorm for a romantic SFW scene regardless of Chloe status.");
        } else {
          state.rep.ally = (state.rep.ally || 0) - 3;
          state.rep.brandon += 3;
          recordChoiceMemory("ep2_vip_ally_left_with_brandon", "ally", "Missed a stat check during the three-way exchange at the VIP Mixer and watched Ally leave with Brandon.");
        }
      }

      return {
        text: passedAllThree
          ? [
              "Inside Ally's dorm room, the noise of the VIP Mixer fades behind the locked door regardless of whether you're with Chloe or not. Ally's pick-me bravado softens into close, unhurried warmth as the night unfolds into a romantic SFW intimacy scene before morning light breaks over the room."
            ]
          : [
              "Ally slips her arm through Brandon's and heads toward the lounge doors, leaving you behind as the music hums on—closing out the VIP Mixer on a sharp turn."
            ],
        choices: [
          {
            label: "Walk back across the quiet quad as the night closes →",
            action: () => {
              ep2TransitionToScene("ep2_night2_close");
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
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_vip_alone_arc", "tanya", "ep2_night2_close", 10);
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
            label: "Step out into the quiet quad past midnight →",
            action: () => {
              ep2TransitionToScene("ep2_night2_close");
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
      const arc = state.activeArc || startGetToKnowYouArc("ep2_bonus_vip_chloe_arc", "chloe", "ep2_night2_close", 10);
      const beat = arc.beatIndex;
      const meetsAura = state.aura >= 62;
      const lowControl = state.control < 58;

      if (beat <= 4) {
        const earlyBeats = [
          ep2ChloeModeLine(
            "You walk past the velvet rope into the VIP Mixer with Chloe at your side, her leather jacket draped over her shoulders, golden hair catching the lounge lights, and her hand brushing lightly against yours.",
            "You walk past the velvet rope into the VIP Mixer with Chloe at your side, her leather jacket draped over her shoulders, golden hair catching the lounge lights, and her posture composed and poised."
          ),
          "Within three minutes of grabbing drinks near the terrace, Max strolls over in his bright Australian drawl, flashing an easy grin straight at Chloe. \"Knew you'd make the VIP list, Chloe. Mind if I join the table?\"",
          "Max pulls up a stool right beside Chloe's shoulder, subtly angling his body to box you out of the conversation while talking up his track finals.",
          ep2ChloeModeLine(
            "Chloe glances between you and Max under lowered lashes with an expectant spark—waiting to see how you answer when another guy presses his angle.",
            "Chloe glances between you and Max under lowered lashes with cool, calculating scrutiny—waiting to see how you hold frame when another guy presses his angle."
          )
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
              label: "Walk back across the quiet quad as the night closes →",
              action: () => {
                ep2TransitionToScene("ep2_night2_close");
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
              label: "Walk back across the quiet quad as the night closes →",
              action: () => {
                ep2TransitionToScene("ep2_night2_close");
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
            label: "Walk back across the quiet quad as the night closes →",
            action: () => {
              ep2TransitionToScene("ep2_night2_close");
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
      if (state.mem.vipAllyResolved) girls.push("ally");

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
