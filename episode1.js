// ============================================================================
// MEET CHLOE — CHAPTER ONE: EPISODE ONE (episode1.js)
// Depends on: characters.js, engine.js
// ============================================================================

const chloeReplyVar = (pursueText, controlText) =>
  state.chloeMode === "PURSUE" ? pursueText : controlText;

const EPISODE1_SCENES = {
  // ==========================================================================
  // PRE-GAME CALIBRATION: 4 AMBIGUOUS OPENING QUESTIONS (NO TONE PENALTIES)
  // ==========================================================================
  warmup_1: {
    id: "warmup_1",
    chapter: "CHAPTER I · PRELUDE",
    title: "Before the First Bell",
    presentNPCs: [],
    render: () => ({
      text: [
        "Dawn light bleeds under the door of your dorm room, catching the edge of an unpacked duffel bag and a cold mug left on the desk since midnight.",
        "Across the quad, the first shuttle brakes hiss against damp asphalt. Nobody on this campus knows your name yet, which means nobody has decided what box to put you in.",
        "You stand by the mirror fastening your collar. When you walk into an unfamiliar room for the first time, what do you instinctively do?"
      ],
      choices: [
        {
          label: "Take the center aisle without slowing down—let people adjust to your pace.",
          action: () => {
            applyWarmup({ aura: 5, control: 2, outlook: 2 });
            goToScene("warmup_2");
          }
        },
        {
          label: "Hang back half a beat, read who runs the room, and pick your angle.",
          action: () => {
            applyWarmup({ control: 5, mastery: 3 });
            goToScene("warmup_2");
          }
        },
        {
          label: "Sit near the front with a clean notebook—get the work locked before anything else.",
          action: () => {
            applyWarmup({ mastery: 6, control: 2 });
            goToScene("warmup_2");
          }
        },
        {
          label: "Follow whatever energy catches your eye first and improvise on the spot.",
          action: () => {
            applyWarmup({ luck: 6, outlook: 3, aura: 2 });
            goToScene("warmup_2");
          }
        }
      ]
    })
  },

  warmup_2: {
    id: "warmup_2",
    chapter: "CHAPTER I · PRELUDE",
    title: "Static on the Wire",
    presentNPCs: [],
    render: () => ({
      text: [
        "Your phone buzzes twice on the dresser—an automated orientation alert followed by a group chat already flooding with blurry mirror selfies and freshman bravado.",
        "You silence the screen with your thumb. Somebody in that chat is already trying too hard to be remembered by noon.",
        "When someone tests you in front of a crowd just to see if you flinch, what is your natural reflex?"
      ],
      choices: [
        {
          label: "Smile like they just handed you free material and flip the joke back on them.",
          action: () => {
            applyWarmup({ aura: 4, outlook: 3 });
            goToScene("warmup_3");
          }
        },
        {
          label: "Hold eye contact without blinking until the silence makes them explain themselves.",
          action: () => {
            applyWarmup({ control: 6, aura: 2 });
            goToScene("warmup_3");
          }
        },
        {
          label: "Answer with one dry, factual sentence that makes their jab sound childish.",
          action: () => {
            applyWarmup({ mastery: 5, control: 3 });
            goToScene("warmup_3");
          }
        },
        {
          label: "Shrug it off—most people talk loudest when they are the most nervous.",
          action: () => {
            applyWarmup({ outlook: 6, luck: 2 });
            goToScene("warmup_3");
          }
        }
      ]
    })
  },

  warmup_3: {
    id: "warmup_3",
    chapter: "CHAPTER I · PRELUDE",
    title: "The Ledger",
    presentNPCs: [],
    render: () => ({
      text: [
        "You check your wallet before sliding it into your jacket pocket—folded bills, a fresh campus ID card, and a train stub from home.",
        "The corridor outside smells like floor wax and instant coffee. Doors bang shut down the hall as half the floor scrambles to beat the 8:30 bell.",
        "What matters more to you when the semester starts tightening its grip?"
      ],
      choices: [
        {
          label: "Never letting anyone see you sweat, even when your back is against the wall.",
          action: () => {
            applyWarmup({ control: 5, aura: 3 });
            goToScene("warmup_4");
          }
        },
        {
          label: "Keeping your grades untouchable so nobody holds academic leverage over you.",
          action: () => {
            applyWarmup({ mastery: 6, cash: 10 });
            goToScene("warmup_4");
          }
        },
        {
          label: "Knowing who owes whom a favor before anyone realizes favors are currency.",
          action: () => {
            applyWarmup({ outlook: 4, control: 3, cash: 15 });
            goToScene("warmup_4");
          }
        },
        {
          label: "Betting on your instincts when the odds tilt sideways.",
          action: () => {
            applyWarmup({ luck: 6, aura: 2 });
            goToScene("warmup_4");
          }
        }
      ]
    })
  },

  warmup_4: {
    id: "warmup_4",
    chapter: "CHAPTER I · PRELUDE",
    title: "Threshold",
    presentNPCs: [],
    render: () => ({
      text: [
        "At the bottom of the stairwell, rain taps lightly against the glass doors leading out toward Block B.",
        "A girl with golden-blonde hair and an oversized leather jacket cuts across the courtyard twenty paces ahead of you, her thumb flicking rapidly across her phone screen without once looking up at the drizzle.",
        "You push open the heavy door and step out into the morning air. How do you carry yourself across the quad?"
      ],
      choices: [
        {
          label: "Unbothered—hands in your pockets, letting the morning come to you.",
          action: () => {
            applyWarmup({ control: 4, luck: 3 });
            state.warmupComplete = true;
            goToScene("ep1_scene1");
          }
        },
        {
          label: "Sharp and alert—cataloguing faces, exits, and empty seats before you even reach the door.",
          action: () => {
            applyWarmup({ mastery: 4, control: 3 });
            state.warmupComplete = true;
            goToScene("ep1_scene1");
          }
        },
        {
          label: "Easygoing—a slight half-smile like you already know something they don't.",
          action: () => {
            applyWarmup({ aura: 5, outlook: 2 });
            state.warmupComplete = true;
            goToScene("ep1_scene1");
          }
        }
      ]
    })
  },

  // ==========================================================================
  // SCENE 1: ARRIVAL AT BLOCK B LECTURE ROOM 4
  // ==========================================================================
  ep1_scene1: {
    id: "ep1_scene1",
    chapter: "CHAPTER I · EPISODE I",
    title: "Block B, Lecture Room 4",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => ({
      text: [
        "Fluorescent tubes hum above four tiered rows of scarred oak desks in Block B Lecture Room 4. The podium at the front is still empty, save for a stack of uncollected syllabi.",
        "Three rows up on the left aisle sits the golden-blonde girl from the courtyard—Chloe Reed. She wears a fitted cropped top under a dark leather jacket, gold hoops catching the overhead glare, though the corner of a spiral notebook peeks out beside her iced coffee with three underlined margin notes already scribbled in neat ink. Her thumb scrolls endlessly through her feed, jaw set in practiced boredom.",
        "In the top back row, Rob—broad-shouldered, white, wearing a faded varsity crewneck—leans back with one boot propped on the bench while Malik, tall and light-skinned with fresh braids, flicks a crumpled paper ball toward the front row. Two seats ahead of them, Elliot—small, skinny, Indian, adjusting round wire-rimmed glasses—stiffens as the paper grazes his blazer and immediately aligns his highlighters by color.",
        "Four open angles present themselves before the lecturer steps through the side door."
      ],
      choices: [
        {
          label: "Slide into the empty seat beside Chloe and pull out your phone to doomscroll in silence.",
          action: () => {
            state.mem.satWithChloe = true;
            adjustChloeMatrix(2, 2);
            recordChoiceMemory("ep1_sat_beside_chloe", "chloe", "Sat right beside Chloe in Block B Room 4 without begging for attention.");
            startGetToKnowYouArc("ep1_chloe_arrival", "chloe", "ep1_scene2", 5);
            goToScene("ep1_chloe_arrival_beat");
          }
        },
        {
          label: "Step directly up to Chloe's row and break the ice before she looks up from her screen.",
          action: () => {
            state.mem.satWithChloe = true;
            adjustChloeMatrix(-1, 4);
            recordChoiceMemory("ep1_approached_chloe_direct", "chloe", "Walked straight up to Chloe's desk on the first morning.");
            startGetToKnowYouArc("ep1_chloe_arrival", "chloe", "ep1_scene2", 5);
            goToScene("ep1_chloe_arrival_beat");
          }
        },
        {
          label: "Take a mid-aisle vantage seat across the room and quietly observe everyone.",
          action: () => {
            state.control = clamp(state.control + 3, 0, 100);
            state.mastery = clamp(state.mastery + 2, 0, 100);
            recordChoiceMemory("ep1_observed_room", "elliot", "Held a neutral mid-aisle seat and watched the room's dynamics unfold.");
            startGetToKnowYouArc("ep1_elliot_arrival", "elliot", "ep1_scene2", 5);
            goToScene("ep1_elliot_arrival_beat");
          }
        },
        {
          label: "Climb straight to the top back row and drop into the bench beside Rob and Malik.",
          action: () => {
            state.rep.rob += 4;
            state.rep.malik += 4;
            adjustChloeMatrix(-2, 1);
            recordChoiceMemory("ep1_sat_back_row", "rob", "Joined Rob and Malik in the top back row on day one.", ["malik", "chloe"]);
            startGetToKnowYouArc("ep1_backrow_arrival", "malik", "ep1_scene2", 5);
            goToScene("ep1_backrow_arrival_beat");
          }
        }
      ]
    })
  },

  // ==========================================================================
  // IN-SCENE "GET TO KNOW YOU" ARC A: CHLOE (5 BEATS -> CONVERGES TO SCENE 2)
  // ==========================================================================
  ep1_chloe_arrival_beat: {
    id: "ep1_chloe_arrival_beat",
    chapter: "CHAPTER I · EPISODE I",
    title: "Row Three, Left Aisle",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep1_chloe_arrival", "chloe", "ep1_scene2", 5);
      const beat = arc.beatIndex;
      const tier = getRelationshipTier("chloe");
      const warm = tier === "pursue_guarded" || tier === "high_chemistry" || tier === "comfort_warm";

      if (beat === 1) {
        return {
          text: [
            warm
              ? "Chloe doesn't slide her bag off the chair—she lets it drop onto the floor beside her boot, locking her screen for half a second to take your measure from under lowered lashes."
              : "Chloe doesn't look up immediately, though her thumb freezes mid-scroll on a fashion reel. She shifts her iced coffee two inches closer to her elbow, staking out the boundary line of the shared desk.",
            chloeReplyVar(
              "\"Brave choice,\" she murmurs, voice dry enough to strike a match on with a lingering look your way. \"Most people see the leather jacket and assume I bite before 9 AM.\"",
              "\"Brave choice,\" she says flatly, keeping her eyes mostly on her screen. \"Most people see the leather jacket and assume I bite before 9 AM.\""
            )
          ],
          choices: [
            {
              label: "\"Only before caffeine. Looks like you're already half a cup past dangerous.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_coffee_tease", memoryText: "Teased Chloe about her iced coffee in Row Three." });
                state.mem.chloeBeat1Reaction = chloeReplyVar(
                  "Chloe's eyes catch yours with a quick, warm spark—\"Careful, you're already pushing your luck before roll call.\"",
                  "Chloe gives a thin, measured nod—\"Half a cup isn't enough to make me care,\" she replies coolly."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"It was the only seat without a broken hinge. Don't flatter yourself.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_seat_factual", memoryText: "Told Chloe you only took the seat for the unbroken hinge." });
                state.mem.chloeBeat1Reaction = chloeReplyVar(
                  "Chloe lets out a low, amused laugh under her breath—\"Right. Keep telling yourself that.\"",
                  "Chloe shrugs a single shoulder—\"Suit yourself. The hinge is yours.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"The jacket works. Honestly, you look like the only person here who didn't dress in the dark.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_jacket_compliment", memoryText: "Complimented Chloe's leather jacket and style in Row Three." });
                state.mem.chloeBeat1Reaction = chloeReplyVar(
                  "Chloe tilts her chin up slightly, a soft, pleased curve touching her mouth—\"Finally someone with actual taste.\"",
                  "Chloe glances over briefly without smiling—\"Thanks,\" she says plainly before looking back down."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Relax. Nobody's intimidated by someone hiding behind a phone screen.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_phone_bully", memoryText: "Called Chloe out for hiding behind her phone screen." });
                state.mem.chloeBeat1Reaction = chloeReplyVar(
                  "Chloe's eyes narrow sharply, leaning a fraction closer with a dare in her tone—\"Keep talking like that if you want to test it.\"",
                  "Chloe locks her screen with a sharp click and turns her shoulder away—\"Save it for someone who asked.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.chloeBeat1Reaction || "Chloe pauses beside her desk.",
            state.tension >= 14
              ? "The corner of Chloe's mouth twitches—not quite a smile, more like she's annoyed you didn't fold on the first volley. She angles one shoulder slightly away from the aisle, angling toward you instead."
              : "Chloe exhales through her nose, tapping a manicured nail against the lid of her cup. She glances once toward the back row where Malik is laughing, then back down at her lap.",
            "Her spiral notebook lies open between you. Beneath a row of doodles in the margin, three dense paragraphs of pre-lecture reading notes are written in tight, neat handwriting—completely at odds with her 'I don't try' posture."
          ],
          choices: [
            {
              label: "Glance at the dense notes and raise an eyebrow: \"Secretly gunning for Dean's List under the baddie uniform?\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_caught_chloe_studying", memoryText: "Noticed Chloe's dense pre-lecture notes hidden beside her phone." });
                state.mem.chloeBeat2Reaction = chloeReplyVar(
                  "Chloe grins softly as she nudges the margin out of sight—\"Don't blow my cover before lunch, okay?\"",
                  "Chloe pulls the page back without a smile—\"Don't read over people's shoulders.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Page fourteen's case study is going to come up first. Good call summarizing it early.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_validated_chloe_notes", memoryText: "Acknowledged Chloe's case-study prep without making a scene." });
                state.mem.chloeBeat2Reaction = chloeReplyVar(
                  "Chloe looks up with genuine interest—\"You actually checked the reading order too?\"",
                  "Chloe gives a brief nod—\"Yeah. It was on the sheet.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"You actually write super neat. If I miss anything today, I know who to ask.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_praised_chloe_handwriting", memoryText: "Praised Chloe's neat handwriting before class started." });
                state.mem.chloeBeat2Reaction = chloeReplyVar(
                  "Chloe's voice drops warmer—\"Maybe if you ask nicely instead of making demands.\"",
                  "Chloe clips her pen to the cover—\"I don't lend out my notes.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"All that highlighting and you're still pretending you didn't study all weekend.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_mocked_chloe_prep", memoryText: "Mocked Chloe for pretending she hadn't studied." });
                state.mem.chloeBeat2Reaction = chloeReplyVar(
                  "Chloe shoots you a pointed glare—\"You have a lot of opinions for day one.\"",
                  "Chloe closes the notebook flat—\"Mind your own desk.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.mem.chloeBeat2Reaction || "Chloe's hand rests near the edge of her notebook.",
            "Chloe's fingers slide instantly over the margin of the notebook, pulling it two inches closer to her chest—a reflex she can't quite disguise.",
            state.comfort >= 17
              ? "\"Keep your voice down,\" she mutters, though the sharp edge in her tone softens into something almost conspiratorial. \"Back home, if you looked like you cared about grades, people treated you like furniture. I didn't come three hours south to be furniture again.\""
              : "\"Nobody asked you to audit my desk,\" she says flatly, chin lifting a fraction. \"If you tell anyone in this room I actually read the syllabus, I'll deny it to your face.\"",
            "Up in the back row, Rob drops a heavy textbook onto his desk with a dull thud, making Elliot jump in row two."
          ],
          choices: [
            {
              label: "\"Your secret's safe—for a price. You owe me a coffee later.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_coffee_leverage", memoryText: "Kept Chloe's study secret in exchange for a future coffee." });
                state.mem.chloeBeat3Reaction = chloeReplyVar(
                  "Chloe's eyes flash with warm amusement as she taps her pen against the spiral edge—\"Bold of you to invoice me before class even starts.\"",
                  "Chloe's eyes narrow slightly as she taps her pen against the spiral edge—\"Don't hold your breath waiting on that coffee.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Relax. What you put on paper is your business, not theirs.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_secret_kept", memoryText: "Told Chloe her academic prep was strictly her own business." });
                state.mem.chloeBeat3Reaction = chloeReplyVar(
                  "Chloe lets out a quiet, relaxed breath, her hand leaning closer toward your side of the desk.",
                  "Chloe lets out a curt breath through her nose, her hand relaxing slightly off the notebook page."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Honestly, it's cool that you take your future seriously. You shouldn't have to hide it.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_encouraged", memoryText: "Told Chloe she shouldn't have to hide taking her future seriously." });
                state.mem.chloeBeat3Reaction = chloeReplyVar(
                  "Chloe looks up with a softer, genuinely grateful expression before letting her fingers slip free—\"Thanks for saying that.\"",
                  "Chloe looks down at her notes for a second longer than usual before letting her fingers slip free—the defensive tension around her shoulders easing slightly."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Relax, nobody's paying that much attention to you anyway.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_dismissed", memoryText: "Dismissed Chloe by saying nobody was paying attention to her." });
                state.mem.chloeBeat3Reaction = chloeReplyVar(
                  "Chloe gives a sharp, defiant scoff—\"Right. Keep telling yourself that while you're still looking.\"",
                  "Chloe's jaw sets hard, pulling her notebook all the way to her side of the desk without another glance your way."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            state.mem.chloeBeat3Reaction || "Chloe settles back against the wooden bench with her notebook beside her.",
            "Chloe studies the side of your face for two full seconds while the fluorescent tube overhead flickers once.",
            state.tension >= 18
              ? "She leans an elbow onto the desk between you, close enough that you catch the faint trace of vanilla and cold rain on her leather sleeve. \"You're either going to be very entertaining this semester,\" she says softly, \"or a complete headache.\""
              : "She leans back against the wooden bench, crossing one ankle over the other and picking her phone back up. \"You talk like someone who already decided how this place works.\"",
            "Her phone screen lights up with a text from a contact saved simply as 'Maya 🌿', which she swipes away without opening."
          ],
          choices: [
            {
              label: "\"Definitely a headache. Best you get used to it early.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.chloeBeat4Reaction = chloeReplyVar(
                  "Chloe lets out a quiet, warm laugh under her breath, shaking her head with a lingering glance as she locks her screen.",
                  "Chloe lets out a dry, guarded breath under her breath, shaking her head slightly as she locks her screen."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"I just prefer knowing where I stand before people start performing.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.chloeBeat4Reaction = chloeReplyVar(
                  "Chloe gives a small, engaged nod—leaning in a fraction as if you just named the exact game the two of you are playing.",
                  "Chloe gives a small, measured nod—guarded and neutral, like she's keeping her own cards close."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"I'm hoping for entertaining—especially if we end up in the same study group.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.chloeBeat4Reaction = chloeReplyVar(
                  "\"We'll see if you can keep up first,\" Chloe replies softly, a faint smile lingering at her mouth.",
                  "\"We'll see,\" Chloe replies coolly, keeping her distance as she sets her phone down."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"You're the one screening texts like you're running from something.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.chloeBeat4Reaction = chloeReplyVar(
                  "Chloe flashes a sharp, challenging look—\"Not running from anything. Just selective about who gets my time.\"",
                  "Chloe's jaw tightens instantly; she turns her shoulder a full inch back toward the aisle and freezes you out."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.chloeBeat4Reaction || "Chloe sets her phone flat on the desk, her expression unreadable.",
          "Before she can add another word, Malik stands up on the top bench behind you, cupping both hands around his mouth like a stadium announcer while Rob grins beside him.",
          chloeReplyVar(
            "Chloe rolls her eyes toward the ceiling, leaning slightly closer to your side of the desk. \"Here we go,\" she mutters under her breath. \"Ten minutes in and the back row already thinks it's an open mic.\"",
            "Chloe rolls her eyes toward the ceiling, keeping her posture stiff. \"Here we go,\" she mutters under her breath. \"Ten minutes in and the back row already thinks it's an open mic.\""
          ),
          "Malik's announcement draws every head in the room back toward the icebreaker before Chloe turns the spotlight toward you."
        ],
        choices: [
          {
            label: "Turn toward the back row as the room converges on Rob and Malik's icebreaker.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep1_scene2");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // IN-SCENE "GET TO KNOW YOU" ARC B: ELLIOT (5 BEATS -> CONVERGES TO SCENE 2)
  // ==========================================================================
  ep1_elliot_arrival_beat: {
    id: "ep1_elliot_arrival_beat",
    chapter: "CHAPTER I · EPISODE I",
    title: "Mid-Aisle Vantage",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep1_elliot_arrival", "elliot", "ep1_scene2", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Taking the mid-aisle seat puts you directly behind Elliot's right shoulder, with a clear sightline to Chloe in row three and Rob and Malik perched at the back.",
            "Elliot—small, skinny, Indian, his round wire-rimmed glasses sliding slightly down his nose—glances back over his collar, eyes narrowing as he checks whether you have a textbook on your desk. \"You're in the overflow zone,\" he says crisply. \"Professor Vance cold-calls rows two and three first.\""
          ],
          choices: [
            {
              label: "\"Good thing I actually read chapter one then. Relax, Elliot.\"",
              action: () => {
                applyTone("factual", { targetNpc: "elliot", memoryTag: "ep1_elliot_read_ch1", memoryText: "Told Elliot you had already read chapter one." });
                state.mem.elliotBeat1Reaction = "Elliot gives a tight, measuring nod—\"We'll see how well you retain it once the seminar starts,\" he says.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Look at you, already memorizing the professor's seating chart.\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot", memoryTag: "ep1_elliot_seating_tease", memoryText: "Teased Elliot for memorizing the professor's seating chart." });
                state.mem.elliotBeat1Reaction = "Elliot's mouth thins into a stiff line—\"It's basic spatial awareness, not memorization,\" he mutters.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Appreciate the heads-up. You look like you've got this whole module mapped out.\"",
              action: () => {
                applyTone("complimentary", { targetNpc: "elliot" });
                state.mem.elliotBeat1Reaction = "Elliot straightens slightly on the bench—\"Most of the syllabus is straightforward if you prepare ahead,\" he replies.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Turn around and worry about your own paper.\"",
              action: () => {
                applyTone("bully", { targetNpc: "elliot" });
                state.mem.elliotBeat1Reaction = "Elliot snaps his shoulders forward without another word, his jaw set tightly.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.elliotBeat1Reaction || "Elliot turns back to his desk.",
            "Elliot pushes his glasses up with one knuckle, his posture rigid as a ruler. Even when he tries to sound helpful, his eyes dart across your blank notepad like he's calculating whether you're a threat to his curve.",
            "\"Only the top two scores in this seminar get recommended for the spring research fellowship,\" Elliot says quietly, lowering his voice so the back row won't hear. \"Most of the people in here are just coasting on high school reputations.\""
          ],
          choices: [
            {
              label: "\"Then let them coast. Less competition at the top.\"",
              action: () => {
                applyTone("factual", { targetNpc: "elliot" });
                state.mem.elliotBeat2Reaction = "Elliot gives a brief, guarded nod—\"Precisely,\" he says quietly before uncapping a pen.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Careful, Elliot—keep talking like that and people will think you're plotting.\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot" });
                state.mem.elliotBeat2Reaction = "Elliot glances back with a dry scowl—\"I don't plot. I track benchmarks,\" he replies.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"With your prep, you're practically a lock for one of those spots.\"",
              action: () => {
                applyTone("complimentary", { targetNpc: "elliot" });
                state.mem.elliotBeat2Reaction = "Elliot's expression softens for half a second—\"I intend to earn it,\" he says with a small nod.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Sounds like you're already looking for excuses if someone beats you.\"",
              action: () => {
                applyTone("bully", { targetNpc: "elliot" });
                state.mem.elliotBeat2Reaction = "Elliot's chin comes up sharply—\"I don't make excuses. I'm simply stating the baseline,\" he snaps.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.mem.elliotBeat2Reaction || "Elliot adjusts his glasses over his notes.",
            "Elliot's jaw tightens slightly, a faint flush rising above his collar before he masks it by uncapping a yellow highlighter. Across the aisle, Chloe glances over her shoulder at the two of you, one blonde eyebrow lifting at your quiet standoff with the front-row perfectionist."
          ],
          choices: [
            {
              label: "Catch Chloe's eye across the aisle with a faint, unbothered half-smile.",
              action: () => {
                adjustChloeMatrix(1, 2);
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.elliotBeat3Reaction = chloeReplyVar(
                  "Chloe catches your smile with an easy, intrigued tilt of her chin before turning back, leaving Elliot scowling silently at the aisle.",
                  "Chloe gives a cool, brief nod across the aisle before looking back down, leaving Elliot scowling silently at his notes."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "Pull out a pen and jot two sharp bullet points on your page.",
              action: () => {
                applyTone("factual", { targetNpc: "elliot" });
                state.mem.elliotBeat3Reaction = "Elliot glances back at the neat ink lines appearing on your sheet, his pen pausing mid-air for half a second before he resumes highlighting.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            state.mem.elliotBeat3Reaction || "Elliot returns to his highlighter line by line.",
            "Elliot notices your gaze flick toward row three and gives a sharp, disdainful sniff. \"Chloe Reed,\" he mutters under his breath. \"Transferred in from out of county. She pretends she doesn't care, which means she'll drop out by midterms.\"",
            "He taps his pen twice against his desk, waiting to see if you'll agree with his verdict."
          ],
          choices: [
            {
              label: "\"Wouldn't bet on it. Look closer at her desk.\"",
              action: () => {
                applyTone("factual", { targetNpc: "elliot" });
                state.mem.elliotBeat4Reaction = "Elliot squints across the aisle at Chloe's spiral notebook, his brow furrowing when he spots the dense margin notes.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Sounds like you've been watching her closer than the syllabus, Elliot.\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot" });
                state.mem.elliotBeat4Reaction = "Elliot adjusts his glasses stiffly, looking away fast. \"I observe all variables in a competitive cohort,\" he mutters.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Keep your eyes on your own lane, man. Worry about the fellowship.\"",
              action: () => {
                applyTone("bully", { targetNpc: "elliot" });
                state.mem.elliotBeat4Reaction = "Elliot snaps his notebook shut an inch and turns squarely forward, his ears red.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.elliotBeat4Reaction || "Elliot straightens his stack of highlighters without another word.",
          "Before he can retort, Malik claps his hands twice from the top row, echoing off the cinderblock walls. \"Alright, listen up! Since Vance is ten minutes late, we're not sitting here like it's a funeral.\"",
          "As Malik sets the icebreaker rule and Elliot fires back first, the room shifts toward the back row before Chloe turns her attention to you."
        ],
        choices: [
          {
            label: "Lean back as the room converges on Rob and Malik's icebreaker.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep1_scene2");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // IN-SCENE "GET TO KNOW YOU" ARC C: ROB & MALIK (5 BEATS -> CONVERGES TO SCENE 2)
  // ==========================================================================
  ep1_backrow_arrival_beat: {
    id: "ep1_backrow_arrival_beat",
    chapter: "CHAPTER I · EPISODE I",
    title: "Top Row Bench",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep1_backrow_arrival", "malik", "ep1_scene2", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "The top bench creaks as you drop down beside Malik. Rob—broad-shouldered, white, forearms resting across his knees—sizes you up with a quick nod before looking back down toward the lower rows.",
            "Malik, tall and light-skinned with clean, tight braids, leans his elbows onto the desk behind you. \"Smart man,\" Malik grins, voice pitched just loud enough to carry. \"Front three rows are strictly for people who ask 'will this be on the exam' five minutes before the bell.\""
          ],
          choices: [
            {
              label: "\"And the back row is strictly for commentary? Let's hear the scouting report.\"",
              action: () => {
                state.rep.malik += 3;
                state.rep.rob += 2;
                applyTone("tease", { targetNpc: "malik" });
                state.mem.backrowBeat1Reaction = "Malik grins wide, leaning back on one elbow—\"Say less, man. You already fit right in.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Best sightline in the room. You see everything before it happens.\"",
              action: () => {
                state.rep.rob += 3;
                applyTone("factual", { targetNpc: "rob" });
                state.mem.backrowBeat1Reaction = "Rob gives a slow nod—\"Exactly. High ground changes the whole room.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"You two look like you already run half the building.\"",
              action: () => {
                state.rep.malik += 1;
                applyTone("complimentary", { targetNpc: "malik" });
                state.mem.backrowBeat1Reaction = "Malik chuckles—\"Half the building is generous, but we're working on it.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Just keep your voice down when the lecture starts.\"",
              action: () => {
                state.rep.rob -= 3;
                state.rep.malik -= 3;
                applyTone("bully", { targetNpc: "malik" });
                state.mem.backrowBeat1Reaction = "Malik's grin cools into a flat look—\"Alright, hall monitor.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.backrowBeat1Reaction || "Malik glances down over the top rail.",
            "Malik gestures subtly with his chin toward the rows below. \"Okay, quick rundown: row two with the color-coded highlighters is Elliot—dude hasn't blinked since 8:15. Row three on the left in the leather jacket is Chloe Reed. Nobody's cracked a word out of her since she walked in.\"",
            "Rob snorts, flexing his shoulders against the wall. \"She's acting too big for a fresher seminar. Bet twenty bucks she leaves at the break.\""
          ],
          choices: [
            {
              label: "\"Save your twenty, Rob. Look at the notebook beside her coffee—she's not leaving.\"",
              action: () => {
                state.rep.rob += 2;
                applyTone("factual", { targetNpc: "rob" });
                state.mem.backrowBeat2Reaction = "Rob squints down toward row three—\"Huh. Maybe you're right, man.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Careful, Rob—sounds like you're mad she didn't look your way when she walked in.\"",
              action: () => {
                state.rep.malik += 3;
                applyTone("tease", { targetNpc: "rob" });
                state.mem.backrowBeat2Reaction = "Malik laughs out loud slapping the rail while Rob rolls his eyes—\"Yeah, real funny.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"She definitely has presence, I'll give her that.\"",
              action: () => {
                applyTone("complimentary", { targetNpc: "malik" });
                state.mem.backrowBeat2Reaction = "Malik nods once—\"Can't argue with that part.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Who cares what she does? You guys sound obsessed.\"",
              action: () => {
                state.rep.rob -= 2;
                applyTone("bully", { targetNpc: "rob" });
                state.mem.backrowBeat2Reaction = "Rob shrugs stiffly—\"Just calling what we see, man.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.mem.backrowBeat2Reaction || "Rob barks out a short laugh, shaking his head, while Malik slaps the back of his hand against Rob's shoulder. \"Told you the new guy has eyes,\" Malik says.",
            "Down in row three, Chloe tilts her head slightly—not turning around, just shifting her golden hair over one shoulder as if she caught the cadence of laughter from the top bench."
          ],
          choices: [
            {
              label: "Keep your expression cool and let Malik line up his next move.",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                state.mem.backrowBeat3Reaction = "Malik catches your calm expression and grins wider, leaning back on one elbow like he likes how unbothered you stay.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "Ask Rob what sport he plays—looks like track or rugby build.",
              action: () => {
                state.rep.rob += 3;
                applyTone("factual", { targetNpc: "rob" });
                state.mem.backrowBeat3Reaction = "Rob's chest puffs slightly with a grin as he looks over at you—\"Finally someone who knows what build they're looking at.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            state.mem.backrowBeat3Reaction || "Malik and Rob trade a knowing look on the top bench.",
            "\"Varsity crew and intramural ball,\" Rob says, tapping his knuckles on the desk. \"And Malik here runs his mouth like it's an Olympic event.\"",
            "\"Somebody has to keep the room awake,\" Malik shoots back, already rising to his feet with a wicked grin. \"Watch this—Vance is still stuck in traffic, so we're running a quick warm-up.\""
          ],
          choices: [
            {
              label: "\"Go ahead, Malik. Let's see who actually has a backbone in here.\"",
              action: () => {
                state.rep.malik += 2;
                applyTone("tease", { targetNpc: "malik" });
                state.mem.backrowBeat4Reaction = "Malik grins wide, rubbing his palms together like you just dared him to take center stage.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Keep it sharp—don't hand Elliot an excuse to snitch to Vance.\"",
              action: () => {
                state.rep.rob += 2;
                applyTone("factual", { targetNpc: "rob" });
                state.mem.backrowBeat4Reaction = "Rob gives a sharp nod. \"Relax, man—we'll keep it clean before Vance hits the door.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.backrowBeat4Reaction || "Malik steps up onto the lower footrest with an easy grin.",
          "Malik claps twice, drawing every head in Block B Lecture Room 4 toward the back bench.",
          "Malik announces the icebreaker prompt and Elliot responds first before Chloe turns her gaze toward you in the next beat."
        ],
        choices: [
          {
            label: "Step into the pre-class icebreaker.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep1_scene2");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // CONVERGENCE POINT 1: SCENE 2 PRE-CLASS ICEBREAKER + IMMEDIATE REACTION BEAT
  // ==========================================================================
  ep1_scene2: {
    id: "ep1_scene2",
    chapter: "CHAPTER I · EPISODE I",
    title: "The Back-Row Icebreaker",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const arrivalContext = npcRemembers("chloe", "ep1_sat_beside_chloe") || npcRemembers("chloe", "ep1_approached_chloe_direct")
        ? "Chloe leans one elbow on your shared desk, already knowing you caught her notebook margin notes ten minutes ago."
        : npcRemembers("elliot", "ep1_observed_room")
          ? "Elliot sits rigid right in front of you, while Chloe watches from across the aisle."
          : "From the top bench beside Rob and Malik, you have a clear view of Chloe in row three and Elliot stiffly clutching his pen below.";

      return {
        text: [
          "Malik leans over the top rail like a host working a late-night crowd. \"Rule is simple,\" he announces. \"Before Vance walks through that door, everybody gives one honest answer—what's the one thing you didn't come to college to waste time on?\"",
          "Elliot immediately raises two fingers from row two. \"Small talk with people who don't read the assigned texts,\" Elliot says stiffly, earning a collective groan from Rob.",
          arrivalContext,
          "Chloe finally looks up from her iced coffee, resting her chin in one palm. Her eyes flick across the room before landing squarely on you. \"Your turn,\" Chloe says smoothly, tossing the spotlight straight into your lap in front of everyone."
        ],
        choices: [
          {
            label: "\"People who act unbothered while secretly color-coding their notebooks.\" (Look straight at Chloe with a smirk)",
            action: () => {
              applyTone("tease", {
                chloeDirect: true,
                targetNpc: "chloe",
                memoryTag: "ep1_icebreaker_tease",
                memoryText: "Called out Chloe's secret note-taking during the pre-class icebreaker without naming her."
              });
              state.rep.malik += 3;
              state.rep.rob += 2;
              state.mem.scene2Reaction = [
                "Malik barks out a laugh from the top bench, slapping the rail, while Rob lets out a low whistle.",
                chloeReplyVar(
                  "Chloe's eyes gleam with a slow, intrigued smirk as she covers her spiral notebook with one hand—\"Careful,\" she murmurs for your ears only. \"You're bold for someone who doesn't know my full schedule yet.\"",
                  "Chloe's eyes narrow by a fraction as she covers her spiral notebook with one hand—\"Careful,\" she says coolly. \"You don't actually know what I'm doing.\""
                )
              ];
              goToScene("ep1_scene2_reaction");
            }
          },
          {
            label: "\"Chasing approval from people who won't matter by finals week.\"",
            action: () => {
              applyTone("factual", {
                chloeDirect: true,
                targetNpc: "chloe",
                memoryTag: "ep1_icebreaker_factual",
                memoryText: "Said you didn't come to chase approval from people who won't matter by finals."
              });
              state.rep.rob += 2;
              state.mem.scene2Reaction = [
                "Rob nods slowly from the back row with genuine respect, and Malik raises two fingers in a quiet salute.",
                chloeReplyVar(
                  "Chloe's gaze lingers on you with unmistakable curiosity before she takes a slow sip of her iced coffee, a faint smile lingering behind the cup.",
                  "Chloe's gaze flicks over you briefly before she takes a sip of her iced coffee, keeping her expression composed."
                )
              ];
              goToScene("ep1_scene2_reaction");
            }
          },
          {
            label: "\"Pretending I'm not glad to be in a room with sharp people—especially this row.\"",
            action: () => {
              applyTone("complimentary", {
                chloeDirect: true,
                targetNpc: "chloe",
                memoryTag: "ep1_icebreaker_compliment",
                memoryText: "Complimented the room during the pre-class icebreaker."
              });
              state.mem.scene2Reaction = [
                "Malik grins and shakes his head—\"Smooth, real smooth\"—while Elliot sits up an inch straighter at being lumped into 'sharp people.'",
                chloeReplyVar(
                  "Chloe smiles lightly, holding your gaze a beat—\"Flattery at nine in the morning actually works on you, doesn't it?\" she teases softly.",
                  "Chloe rolls her eyes lightly—\"Flattery at nine in the morning doesn't get you very far,\" she says dryly."
                )
              ];
              goToScene("ep1_scene2_reaction");
            }
          },
          {
            label: "\"Listening to loudmouths in the back row turn a lecture hall into a playground.\"",
            action: () => {
              applyTone("bully", {
                chloeDirect: true,
                targetNpc: "malik",
                memoryTag: "ep1_icebreaker_bully",
                memoryText: "Shut down Rob and Malik's icebreaker aggressively in front of the class."
              });
              state.rep.rob -= 5;
              state.rep.malik -= 5;
              state.rep.elliot += 3;
              state.mem.scene2Reaction = [
                "The air in the back row goes flat immediately—Malik's grin drops into a cold stare and Rob leans forward over the rail, jaw tight.",
                chloeReplyVar(
                  "Elliot gives a tiny, satisfied nod from row two, while Chloe watches you with a sharp, sizing look—\"Loud mouth or not, you just made yourself a target.\"",
                  "Elliot gives a tiny, satisfied nod from row two, while Chloe's brow furrows slightly as she turns back to her desk."
                )
              ];
              goToScene("ep1_scene2_reaction");
            }
          }
        ]
      };
    }
  },

  ep1_scene2_reaction: {
    id: "ep1_scene2_reaction",
    chapter: "CHAPTER I · EPISODE I",
    title: "The Room Answers Back",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => ({
      text: [
        ...(state.mem.scene2Reaction || ["The room absorbs your answer in brief silence."]),
        "Before anyone can fire another volley, the heavy side door swings open with a sharp metallic click."
      ],
      choices: [
        {
          label: "Settle in as Professor Vance steps up to the podium.",
          action: () => goToScene("ep1_scene3")
        }
      ]
    })
  },

  // ==========================================================================
  // SCENE 3: HALLWAY SPLIT (PURSUE VS CONTROL — MUTUALLY EXCLUSIVE)
  // ==========================================================================
  ep1_scene3: {
    id: "ep1_scene3",
    chapter: "CHAPTER I · EPISODE I",
    title: "The Corridor Split",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const inPursue = state.chloeMode === "PURSUE";
      if (inPursue && state.tension < 24 && state.mem.satWithChloe && state.tension >= 18) {
        adjustChloeMatrix(0, 2);
      }

      return {
        text: [
          "Professor Vance sweeps in, turning the next forty-five minutes into a brisk, unforgiving tour of macro-theory and Friday's diagnostic paper.",
          "When the midday bell finally cuts through the hum of the room, chairs scrape back in a rush. Out in the sunlit Block B corridor, students split toward the main quad or the off-campus street gate.",
          inPursue
            ? "Chloe lingers beside the water fountain just outside Room 4, adjusting the strap of her bag. When you step into the hall, she doesn't walk away—she matches your stride for two paces and tilts her head toward the side exit. \"Cafeteria food tastes like wet cardboard,\" she says lightly. \"There's a corner grill two blocks down if you're not chained to campus.\""
            : "Chloe falls right into step with Rob and Malik heading toward lunch—the three of them chatting casually as they move down the corridor toward the midday break, leaving your own next move open."
        ],
        choices: inPursue
          ? [
              {
                label: "Walk off-campus with Chloe to the Corner Grill for lunch.",
                action: () => {
                  state.mem.middayRoute = "grill";
                  recordChoiceMemory("ep1_went_corner_grill", "chloe", "Went off-campus to the Corner Grill with Chloe during midday break.");
                  startGetToKnowYouArc("ep1_chloe_lunch", "chloe", "ep1_scene5", 5);
                  goToScene("ep1_scene4_pursue");
                }
              },
              {
                label: "\"Rain check on the grill—cut through the back stairwell toward the courtyard instead.\"",
                action: () => {
                  state.mem.middayRoute = "stairwell";
                  adjustChloeMatrix(-2, -3);
                  recordChoiceMemory("ep1_declined_corner_grill", "chloe", "Turned down Chloe's Corner Grill invite at midday.");
                  startGetToKnowYouArc("ep1_maya_stairwell", "maya", "ep1_scene5", 5);
                  goToScene("ep1_scene4_control");
                }
              }
            ]
          : [
              {
                label: "Cut through the quiet back stairwell toward the library courtyard.",
                action: () => {
                  state.mem.middayRoute = "stairwell";
                  startGetToKnowYouArc("ep1_maya_stairwell", "maya", "ep1_scene5", 5);
                  goToScene("ep1_scene4_control");
                }
              },
              {
                label: "Head straight to the library reading room to get ahead on Friday's diagnostic.",
                action: () => {
                  state.mem.middayRoute = "library";
                  state.mastery = clamp(state.mastery + 4, 0, 100);
                  promoteGrade();
                  recordChoiceMemory("ep1_midday_library", "elliot", "Spent the midday break studying in the library.");
                  startGetToKnowYouArc("ep1_library_midday", "elliot", "ep1_scene5", 5);
                  goToScene("ep1_scene4_library");
                }
              }
            ]
      };
    }
  },

  // ==========================================================================
  // SCENE 4A (PURSUE BRANCH): OFF-CAMPUS CORNER GRILL WITH CHLOE (5 BEATS)
  // ==========================================================================
  ep1_scene4_pursue: {
    id: "ep1_scene4_pursue",
    chapter: "CHAPTER I · EPISODE I",
    title: "The Corner Grill",
    presentNPCs: ["chloe"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep1_chloe_lunch", "chloe", "ep1_scene5", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Two blocks past the campus gate, the Corner Grill smells of toasted brioche, sea salt, and rain-cooled asphalt. You take a cracked vinyl booth by the window while Chloe sets her phone face-down between the salt shaker and the napkin dispenser—the first time all morning she hasn't kept the screen within thumb's reach.",
            "\"Fair warning,\" Chloe says, resting both forearms on the table as the waitress drops two menus. \"I don't do the twenty-questions fresher small talk. Where are you from, what's your major, what's your zodiac sign—pick anything else.\""
          ],
          choices: [
            {
              label: "\"Fine. Tell me what you actually wanted to major in before you picked the safe option.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_grill_major_question", memoryText: "Asked Chloe what she really wanted to study before picking the safe option." });
                state.mem.grillBeat1Reaction = chloeReplyVar(
                  "Chloe's eyes light up with surprise—\"Okay, good opening shot,\" she admits softly.",
                  "Chloe glances up from her menu—\"Fair enough. At least you skipped the basic questions.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Deal. Order first—I'm paying for the booth since you picked the spot.\"",
              action: () => {
                state.cash = Math.max(0, state.cash - 18);
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_grill_paid_lunch", memoryText: "Covered lunch at the Corner Grill without making a fuss." });
                state.mem.grillBeat1Reaction = chloeReplyVar(
                  "Chloe smirks across the table—\"Noted. Don't expect me to let you pay every time, though.\"",
                  "Chloe nods once—\"Alright. I'll order first, then.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Honestly, you're already way more interesting than anyone back in that lecture hall.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat1Reaction = chloeReplyVar(
                  "Chloe gives a warm, knowing half-smile—\"That's a low bar, but I'll take the compliment.\"",
                  "Chloe shrugs lightly—\"Maybe. Give it a week.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Funny coming from someone whose whole personality is an Instagram bio.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat1Reaction = chloeReplyVar(
                  "Chloe narrows her eyes with a sharp edge—\"Careful, you're sitting across from me for the next forty minutes.\"",
                  "Chloe sets her menu down flat—\"If that's all you've got, don't bother talking.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.grillBeat1Reaction || "Chloe rests her elbows on the booth table.",
            state.comfort >= 16
              ? "Chloe blinks once, caught slightly off guard, before a genuine, unguarded laugh slips out—quieter and warmer than her classroom voice. She twists a paper straw wrapper around one finger."
              : "Chloe's eyes narrow a fraction, studying your face across the table before she leans back against the vinyl seat.",
            "\"Editorial styling and creative direction,\" she admits softly, tracing the rim of her water glass. \"Back in my hometown, saying that out loud got you laughed out of guidance counseling. So you put on the right jacket, act like nothing phases you, and get the business degree as cover.\""
          ],
          choices: [
            {
              label: "\"So the whole untouchable campus baddie routine is just armor for an art kid.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_creative_secret", memoryText: "Learned Chloe's secret passion for editorial styling and creative direction." });
                state.mem.grillBeat2Reaction = chloeReplyVar(
                  "Chloe laughs quietly, leaning forward—\"Don't call me an art kid to my face and we're good.\"",
                  "Chloe gives a tight, guarded nod—\"Call it whatever you want.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Using a practical degree to fund what you actually want isn't fake—it's smart.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_creative_secret", memoryText: "Backed Chloe's plan to use her degree to fund creative direction." });
                state.mem.grillBeat2Reaction = chloeReplyVar(
                  "Chloe looks at you with a softer, genuinely appreciative gaze—\"Yeah. At least someone gets the math.\"",
                  "Chloe nods slowly—\"That was the idea.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"You have the eye for it. Anyone can see that the second you walk into a room.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_creative_secret", memoryText: "Praised Chloe's eye for style and creative direction." });
                state.mem.grillBeat2Reaction = chloeReplyVar(
                  "Chloe smiles warmly, looking down for a beat—\"You actually mean that, don't you?\"",
                  "Chloe looks away slightly—\"Thanks.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Sounds like you're scared to actually commit to either one.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat2Reaction = chloeReplyVar(
                  "Chloe's chin lifts with a sharp challenge—\"You don't know half of what it took to get here.\"",
                  "Chloe's jaw clenches—\"You don't know anything about it.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.mem.grillBeat2Reaction || "Chloe traces the edge of her glass.",
            "A basket of hot fries lands between you. Chloe steals two immediately, blowing across the steam before looking back up through her lashes.",
            state.tension >= 22
              ? "Her knee brushes yours beneath the table—and instead of pulling back, she lets it rest there for a beat too long. \"You read people way too fast,\" she murmurs, voice dropping half an octave. \"It's kind of unfair.\""
              : "She taps a fry against the edge of the basket. \"Careful. If you figure out everyone's angle on day one, you're going to get bored by week two.\""
          ],
          choices: [
            {
              label: "\"I'll let you know when you get predictable. Hasn't happened yet.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat3Reaction = chloeReplyVar(
                  "Chloe raises one brow over her fry, a quick spark of challenge and warmth in her eyes before she laughs softly.",
                  "Chloe raises one brow over her fry—\"Good luck with that,\" she replies dryly."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"I'm not trying to figure everybody out. Just the ones worth paying attention to.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat3Reaction = chloeReplyVar(
                  "Chloe's gaze holds steady across the basket, her earlier teasing edge giving way to quiet, focused warmth.",
                  "Chloe nods once—\"Fair enough,\" she says, keeping her tone even."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Could never get bored sitting across from you.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat3Reaction = chloeReplyVar(
                  "Chloe looks down for half a second to hide a faint flush and a smile, spinning her water glass slowly between her fingertips.",
                  "Chloe gives a guarded, noncommittal nod, spinning her water glass slowly between her fingertips."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Don't flatter yourself—you're easier to read than the menu.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat3Reaction = chloeReplyVar(
                  "Chloe sets her fry down with a sharp click, eyes flashing—\"Keep pushing and I'll prove you wrong.\"",
                  "Chloe sets her fry down with a sharp click, her expression cooling right back into glass."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            state.mem.grillBeat3Reaction || "Chloe finishes the last of her fries as the diner settles.",
            "Chloe checks the clock above the counter—1:38 PM. The afternoon seminar starts at 1:45 sharp, and Block B is an eight-minute brisk walk back up the hill.",
            "She slides out of the booth, shrugging her leather jacket back over her shoulders. \"If we walk in late together after vanishing at noon, Elliot's going to have an aneurysm and Malik will never shut up.\""
          ],
          choices: [
            {
              label: "\"Let them talk. Watching Elliot sweat is half the entertainment.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat4Reaction = chloeReplyVar(
                  "Chloe smirks warmly as she pushes open the glass door, holding it a beat for you—\"You really do enjoy stirring the pot, don't you?\"",
                  "Chloe gives a dry nod as she pushes open the glass door—\"Just don't get us both stuck in the back.\""
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"If we cut through the east courtyard gate, we beat the bell by two minutes.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                state.mem.grillBeat4Reaction = chloeReplyVar(
                  "\"Lead the way then,\" Chloe says smoothly, falling right into step beside you on the sidewalk.",
                  "\"Fine. Let's move,\" Chloe says, picking up her pace ahead of you toward the gate."
                );
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.grillBeat4Reaction || "Chloe glances sideways at you with a faint smirk as you hit the crosswalk.",
          "You step onto the campus path side by side, matching stride as the bell tower chimes the quarter-hour across the quad."
        ],
        choices: [
          {
            label: "Rejoin the afternoon lecture in Block B Lecture Room 4.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep1_scene5");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 4B (CONTROL BRANCH): BACK STAIRWELL ENCOUNTER WITH MAYA (5 BEATS)
  // ==========================================================================
  ep1_scene4_control: {
    id: "ep1_scene4_control",
    chapter: "CHAPTER I · EPISODE I",
    title: "The Back Stairwell",
    presentNPCs: ["maya"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep1_maya_stairwell", "maya", "ep1_scene5", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "The back stairwell connecting the humanities wing to the library courtyard is quiet, lit by tall frosted windows overlooking the rain-slick hedges.",
            "Halfway down the concrete landing, a girl with a soft-spoken, grounded girl-next-door aesthetic—knit cardigan over a simple white tee, minimal jewelry, dark hair tucked behind one ear—kneels beside a spilled canvas tote, hurriedly gathering loose printouts while wiping the back of her wrist quickly across her cheek."
          ],
          choices: [
            {
              label: "Crouch down without making a scene and gather the scattered pages into a neat stack.",
              action: () => {
                state.mem.helpedMaya = true;
                state.rep.maya += 6;
                applyTone("complimentary", {
                  targetNpc: "maya",
                  memoryTag: "ep1_helped_maya_stairs",
                  memoryText: "Helped Maya gather her spilled notes on the back stairwell without embarrassing her."
                });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "\"Hold on—your binder clip popped open. Let me grab the sheets by the rail.\"",
              action: () => {
                state.mem.helpedMaya = true;
                state.rep.maya += 4;
                applyTone("factual", {
                  targetNpc: "maya",
                  memoryTag: "ep1_helped_maya_stairs",
                  memoryText: "Helped Maya secure her binder pages on the back stairwell."
                });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "\"Rough first day, or are you just testing gravity on the stairs?\"",
              action: () => {
                state.rep.maya += 1;
                applyTone("tease", { targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "Step over the scattered papers without stopping—not your problem.",
              action: () => {
                state.rep.maya -= 8;
                applyTone("bully", {
                  targetNpc: "maya",
                  memoryTag: "ep1_ignored_maya_stairs",
                  memoryText: "Stepped right past Maya on the back stairwell while she struggled with spilled papers."
                });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.helpedMaya
              ? "She takes the stacked pages with both hands, offering a quiet, genuine smile that reaches her eyes even though her lashes are still damp. \"Thank you,\" she says softly. \"I'm Maya, by the way. I didn't realize the bottom of my tote had split until I hit the landing.\""
              : "Maya presses her lips together, pulling the crumpled sheets back into her bag on her own before standing up by the handrail, keeping her gaze fixed on the window.",
            "She tucks a stray lock of hair behind her ear, glancing at the course code stamped on the top sheet of your folder."
          ],
          choices: [
            {
              label: "\"First day hits everybody sideways. You're doing fine, Maya.\"",
              action: () => {
                state.mem.helpedMaya = true;
                state.rep.maya += 4;
                applyTone("complimentary", { targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "\"If you use the side stapler in the library lobby, those won't slip again.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("factual", { targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "\"At least you didn't spill coffee on them. That would've been tragic.\"",
              action: () => {
                applyTone("tease", { targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "\"Watch where you're walking next time.\"",
              action: () => {
                state.rep.maya -= 5;
                applyTone("bully", { targetNpc: "maya" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.rep.maya >= 8
              ? "Maya leans lightly against the cool concrete wall, exhaling a small breath as the tension leaves her shoulders. \"I came here with my best friend from home, and she's already acting like she has to reinvent herself overnight,\" Maya says quietly, looking out toward the courtyard. \"It's nice meeting someone who doesn't feel the need to put on a show.\""
              : "Maya slings the canvas tote carefully over one shoulder, keeping a polite two-step distance near the stairwell door.",
            "She doesn't mention her best friend's name—only glances down at her watch as the afternoon bell approaches."
          ],
          choices: [
            {
              label: "\"People usually put on armor when they're nervous. Give her a few days.\"",
              action: () => {
                state.rep.maya += 4;
                applyTone("complimentary", { targetNpc: "maya" });
                state.mem.mayaBeat3Reaction = "Maya nods softly, looking down at her watch with a thoughtful half-smile—\"Yeah. Maybe you're right.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "\"Everyone adjusts at their own speed. You don't have to match anyone else's pace.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("factual", { targetNpc: "maya" });
                state.mem.mayaBeat3Reaction = "Maya lets out a quiet, steady breath as she checks her watch—\"That actually helps to hear.\"";
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            state.mem.mayaBeat3Reaction || "Maya checks her watch by the frosted window.",
            "Maya's phone buzzes softly in her cardigan pocket. She glances at the screen, murmurs a quiet \"I have to run to my psych section,\" and looks up at you with warm sincerity if you treated her with decency.",
            state.rep.maya >= 8
              ? "\"See you around campus—and seriously, thanks for stopping.\""
              : "\"Excuse me,\" she says politely, slipping toward the courtyard door."
          ],
          choices: [
            {
              label: "\"Take care of yourself, Maya. See you around.\"",
              action: () => {
                state.mem.mayaBeat4Reaction = state.rep.maya >= 8
                  ? "Maya gives you one last warm, unhurried smile before pushing open the courtyard door."
                  : "Maya offers a brief, polite nod and slips out into the courtyard.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.mayaBeat4Reaction || "The stairwell door swings shut behind her.",
          "You turn back up the steps toward Block B as the afternoon bell approaches."
        ],
        choices: [
          {
            label: "Rejoin the afternoon lecture in Block B Lecture Room 4.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep1_scene5");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 4C (LIBRARY STUDY BRANCH): MIDDAY STACKS WITH ELLIOT (5 BEATS)
  // ==========================================================================
  ep1_scene4_library: {
    id: "ep1_scene4_library",
    chapter: "CHAPTER I · EPISODE I",
    title: "Library Reading Room",
    presentNPCs: ["elliot"],
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep1_library_midday", "elliot", "ep1_scene5", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Sunlight slants across long mahogany tables on the second floor of the campus library. Two tables down from the reference stacks, Elliot sits surrounded by three open journals and a laptop, typing with rapid, clipped precision.",
            "When he spots you pulling out a chair with Friday's diagnostic packet, his fingers pause over the keys. \"I didn't expect anyone else from Vance's section to actually work through lunch,\" Elliot says quietly."
          ],
          choices: [
            {
              label: "\"Deadlines don't care about lunch breaks. How far through model two are you?\"",
              action: () => {
                state.rep.elliot += 3;
                applyTone("factual", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            },
            {
              label: "\"Had to make sure you didn't monopolize all the reserve copies, Elliot.\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            },
            {
              label: "\"Your setup is seriously organized. No wonder you're ahead of the curve.\"",
              action: () => {
                state.rep.elliot += 2;
                applyTone("complimentary", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            },
            {
              label: "\"Just stay on your side of the table and keep the typing quiet.\"",
              action: () => {
                state.rep.elliot -= 4;
                applyTone("bully", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            "Elliot adjusts his wire-rimmed glasses, angling his laptop slightly away so you can't see his citation list. \"Vance grades on conciseness,\" he mutters, half-reluctant to share even a crumb of strategy. \"Anyone who writes more than two pages on the diagnostic gets marked down for padding.\""
          ],
          choices: [
            {
              label: "\"Good detail. I'll keep mine under six hundred words.\"",
              action: () => {
                state.mastery = clamp(state.mastery + 2, 0, 100);
                applyTone("factual", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            },
            {
              label: "\"Look at you giving away trade secrets. Getting soft already?\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "For twenty quiet minutes, the only sound in the reading room is the scratch of your pen and the low hum of the radiator. You finish outlining the entire diagnostic framework before the library clock chimes 1:35 PM."
          ],
          choices: [
            {
              label: "Pack your folder cleanly—you're walking back into Room 4 fully armed.",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                state.mem.libraryBeat3Reaction = "You slide your completed outline inside your folder and zip it shut with a crisp click, glancing across at Elliot as he saves his draft.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            state.mem.libraryBeat3Reaction || "Your folder is packed cleanly beside your pen.",
            "Elliot snaps his laptop shut simultaneously, tucking his highlighters into his blazer pocket with a stiff nod. \"We'll see whose framework holds up when Vance starts cold-calling,\" he says, already heading for the stairs."
          ],
          choices: [
            {
              label: "\"See you in Room 4, Elliot.\"",
              action: () => {
                state.mem.libraryBeat4Reaction = "Elliot adjusts his glasses without looking back, briskly descending the library stairs two steps ahead of you.";
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.libraryBeat4Reaction || "Elliot pushes through the library doors toward the quad.",
          "The afternoon bell echoes across the courtyard as students filter back into Block B Lecture Room 4."
        ],
        choices: [
          {
            label: "Rejoin the afternoon lecture in Block B Lecture Room 4.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep1_scene5");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // CONVERGENCE POINT 2: SCENE 5 AFTERNOON LECTURE
  // THREE CLEAN PATHS:
  // 1) Teacher's Pet (outshine Elliot -> sets ep1_outshone_elliot)
  // 2) Neutral / Neither (answer cleanly without Teacher's Pet OR Detention)
  // 3) Hallway Detention (joke with back row or clash with Elliot)
  // ==========================================================================
  ep1_scene5: {
    id: "ep1_scene5",
    chapter: "CHAPTER I · EPISODE I",
    title: "The Afternoon Reckoning",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const arrivalBridge =
        state.mem.middayRoute === "grill"
          ? "You and Chloe slip through the side door of Room 4 moments before the bell; Malik immediately gives a low whistle from the back row while Elliot's jaw tightens at seeing you arrive together."
          : state.mem.middayRoute === "library"
            ? "You walk back into Room 4 with your diagnostic outline already locked, taking your seat right as Elliot lays his typed supplement onto Vance's podium."
            : "You step back into Room 4 with steady composure as the afternoon crowd settles; Chloe is already back in row three scrolling her phone, unaware you just crossed paths with Maya on the back stairs.";

      return {
        text: [
          "At 1:45 PM, Block B Lecture Room 4 is noticeably warmer and half as patient. Professor Vance stands beside the whiteboard with a stack of diagnostic problem sets, calling names down the roster.",
          arrivalBridge,
          "When Vance reaches your name, Elliot turns his head just enough to watch you squirm—while Chloe watches quietly from row three and Malik leans forward from the back bench."
        ],
        choices: [
          {
            label: "Step up and deliver a sharp, complete breakdown of the model—earning the 'Teacher's Pet' edge over Elliot.",
            action: () => {
              state.mem.afternoonRoute = "teachers_pet";
              state.mastery = clamp(state.mastery + 5, 0, 100);
              promoteGrade();
              state.rep.elliot -= 4;
              applyTone("factual", {
                chloeDirect: true,
                targetNpc: "elliot",
                memoryTag: "ep1_outshone_elliot",
                memoryText: "Out-answered Elliot in the afternoon lecture and took the Teacher's Pet edge."
              });
              state.mem.scene5Reaction = [
                "Professor Vance pauses mid-marker, gives a rare, approving nod, and ticks your name cleanly on the roster—\"That's the exact equilibrium condition I was looking for.\"",
                chloeReplyVar(
                  "Elliot's fingers tighten around his yellow highlighter until his knuckles turn white, while Chloe gives you a sly, impressed smile behind her coffee cup and Malik mouths 'show-off' from the back row.",
                  "Elliot's fingers tighten around his yellow highlighter until his knuckles turn white, while Chloe hides a subtle smirk behind her coffee cup and Malik mouths 'show-off' from the back row."
                )
              ];
              goToScene("ep1_scene5_reaction");
            }
          },
          {
            label: "Give a brief, steady answer that satisfies Vance's question without showing off—staying out of detention and off the Teacher's Pet radar.",
            action: () => {
              state.mem.afternoonRoute = "neutral";
              state.control = clamp(state.control + 3, 0, 100);
              recordChoiceMemory("ep1_neutral_lecture", "chloe", "Handled Vance's afternoon cold-call calmly—neither Teacher's Pet nor sent to detention.");
              state.mem.scene5Reaction = [
                "Professor Vance gives a brisk nod—\"Acceptable. Next name on the roster\"—and moves straight down the sheet without lingering.",
                chloeReplyVar(
                  "Elliot turns back to his notes disappointed you didn't stumble, Rob gives a quiet nod of approval, and Chloe glances back with a warm, knowing look as if she likes how effortlessly you handle the room.",
                  "Elliot turns back to his notes disappointed you didn't stumble, Rob gives a quiet nod of approval, and Chloe glances your way briefly as if noting how cleanly you handled it."
                )
              ];
              goToScene("ep1_scene5_reaction");
            }
          },
          {
            label: "Flip Vance's cold-call into a dry joke that cracks up Rob and Malik—catching Hallway Detention.",
            action: () => {
              state.mem.afternoonRoute = "detention";
              state.rep.rob += 4;
              state.rep.malik += 4;
              demoteGrade();
              applyTone("tease", {
                chloeDirect: true,
                targetNpc: "malik",
                memoryTag: "ep1_sent_to_detention",
                memoryText: "Cracked a joke during Vance's cold-call and got sent to Hallway Detention."
              });
              state.mem.scene5Reaction = [
                "Rob barks out a laugh he can't choke back in time, and Malik buries his face in his sleeve as half the room loses it.",
                chloeReplyVar(
                  "Professor Vance doesn't blink—\"Outside bench, corridor B, until the final bell\"—while Chloe catches your eye with a bright, amused grin as you grab your bag and step into the hall.",
                  "Professor Vance doesn't blink—\"Outside bench, corridor B, until the final bell\"—while Chloe shakes her head with a barely hidden grin as you grab your bag and step into the hall."
                )
              ];
              goToScene("ep1_scene5_reaction");
            }
          },
          {
            label: "Push back bluntly when Elliot tries to correct your answer mid-sentence—catching Hallway Detention.",
            action: () => {
              state.mem.afternoonRoute = "detention";
              state.rep.elliot -= 6;
              applyTone("bully", {
                chloeDirect: true,
                targetNpc: "elliot",
                memoryTag: "ep1_sent_to_detention",
                memoryText: "Clashed with Elliot mid-lecture and caught Hallway Detention."
              });
              state.mem.scene5Reaction = [
                "Elliot freezes mid-sentence, blinking behind his wire-rimmed glasses as the room goes dead silent.",
                chloeReplyVar(
                  "Professor Vance points straight toward the door—\"Save the debate for the hallway bench, now\"—while Chloe watches you go with a sharp, intrigued glint in her eyes.",
                  "Professor Vance points straight toward the door—\"Save the debate for the hallway bench, now\"—earning a low, impressed whistle from Malik as you step into the hall."
                )
              ];
              goToScene("ep1_scene5_reaction");
            }
          }
        ]
      };
    }
  },

  ep1_scene5_reaction: {
    id: "ep1_scene5_reaction",
    chapter: "CHAPTER I · EPISODE I",
    title: "After the Cold-Call",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const inDetention = state.mem.afternoonRoute === "detention";
      return {
        text: [
          ...(state.mem.scene5Reaction || ["The moment settles across Lecture Room 4."]),
          inDetention
            ? "Out on the corridor bench, the afternoon clock ticks steadily until the final bell rings across Block B."
            : "The rest of the afternoon seminar runs through to dismissal without another incident."
        ],
        choices: [
          {
            label: "Head out onto the East Quad as afternoon classes dismiss →",
            action: () => goToScene("ep1_dusk_quad")
          }
        ]
      };
    }
  },

  // ==========================================================================
  // CONVERGENCE POINT 3: 4:15 PM EAST QUAD DISPERSAL + REACTION BEAT
  // ==========================================================================
  ep1_dusk_quad: {
    id: "ep1_dusk_quad",
    chapter: "CHAPTER I · EPISODE I",
    title: "Dusk on the East Quad",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const fromDetention = state.mem.afternoonRoute === "detention";
      const fromTeachersPet = state.mem.afternoonRoute === "teachers_pet";
      return {
        text: [
          "Amber streetlights flicker on along the wet stone paths outside Block B as the final bell fades.",
          fromDetention
            ? "Stepping out from the corridor just as Room 4 empties, you draw an immediate grin from Malik and a raised fist from Rob—while Chloe pauses by the bike racks, glancing back over her shoulder with a faint, unreadable smirk."
            : fromTeachersPet
              ? "Stepping out of Room 4 after locking down the Teacher's Pet edge, you pass Elliot hurrying off toward the admin building with his jaw clenched, while Rob and Malik head toward the dorms and Chloe lingers briefly near the quad steps."
              : "Stepping out of Room 4 with your afternoon credits intact and zero drama on your tab, you catch Malik and Rob heading toward the dorms while Chloe pauses briefly near the quad steps.",
          "Before everyone scatters for the night, you have one last beat on the quad."
        ],
        choices: [
          {
            label: "Give Chloe a brief, unbothered nod across the steps before heading toward your dorm.",
            action: () => {
              adjustChloeMatrix(1, 2);
              applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
              state.mem.duskReaction = [
                chloeReplyVar(
                  "Chloe catches your nod from the bottom step, holding your gaze with a slow, flirty half-smile before turning toward the east dorm path—\"Don't oversleep tomorrow.\"",
                  "Chloe catches your nod from the bottom step, giving a cool, brief nod back before turning toward the east dorm path—\"See you tomorrow.\""
                )
              ];
              goToScene("ep1_dusk_reaction");
            }
          },
          {
            label: "Trade a quick word with Rob and Malik about tomorrow's mandatory Orientation.",
            action: () => {
              state.rep.rob += 2;
              state.rep.malik += 2;
              applyTone("factual", { targetNpc: "malik" });
              state.mem.duskReaction = [
                "Malik daps you up by the lamppost—\"9 AM sharp, Auditorium A, don't let Elliot save you a seat\"—before he and Rob jog across the wet grass toward the residence hall."
              ];
              goToScene("ep1_dusk_reaction");
            }
          },
          {
            label: "Head straight back to your dorm without looking back—let them wonder what your next move is.",
            action: () => {
              state.control = clamp(state.control + 3, 0, 100);
              state.mem.duskReaction = [
                "You cut cleanly up the dorm walkway without glancing over your shoulder, leaving the quad chatter fading behind you."
              ];
              goToScene("ep1_dusk_reaction");
            }
          }
        ]
      };
    }
  },

  ep1_dusk_reaction: {
    id: "ep1_dusk_reaction",
    chapter: "CHAPTER I · EPISODE I",
    title: "Evening Lights",
    presentNPCs: [],
    render: () => ({
      text: [
        ...(state.mem.duskReaction || ["The quad clears out beneath the amber streetlights."]),
        "Ten minutes later, you're back in your dorm room with the evening rain tapping against the glass."
      ],
      choices: [
        {
          label: "Check your phone and settle in for Night One.",
          action: () => goToScene("ep1_night1")
        }
      ]
    })
  },

  // ==========================================================================
  // NIGHT 1 CORRESPONDENCE & ENDING ROUTING
  // ==========================================================================
  ep1_night1: {
    id: "ep1_night1",
    chapter: "CHAPTER I · EPISODE I",
    title: "Night One — Static & Signals",
    presentNPCs: [],
    render: () => {
      if (!state.mem.night1DMsSent) {
        state.mem.night1DMsSent = true;
        if (state.tension >= 20 || state.mem.satWithChloe || state.mem.afternoonRoute === "detention") {
          pushDM(
            "chloe",
            "@chloereed",
            chloeReplyVar(
              "Don't let today go to your head. Orientation tomorrow at 9—try not to embarrass yourself.",
              "Orientation is at 9 tomorrow. Make sure you're actually awake for it."
            ),
            [
              {
                playerText: "Wouldn't miss seeing what you wear to Orientation.",
                tone: "tease",
                memoryTag: "ep1_night_flirty_dm",
                memoryText: "Sent a teasing late-night DM to Chloe on Night 1.",
                npcReply: chloeReplyVar(
                  "Keep talking like that and you're buying tomorrow's coffee too.",
                  "Don't hold your breath. Just be there on time."
                )
              },
              {
                playerText: "9 AM sharp. Get some rest, Chloe.",
                tone: "factual",
                memoryTag: "ep1_night_grounded_dm",
                memoryText: "Kept Night 1 DMs grounded and concise with Chloe.",
                npcReply: chloeReplyVar(
                  "See you in the morning. Try not to miss me.",
                  "See you in the morning."
                )
              }
            ],
            "10:14 PM"
          );
        }

        if (state.mem.helpedMaya) {
          pushDM(
            "maya",
            "@mayastephens",
            "Hey, it's Maya from the stairwell earlier. Just wanted to say thanks again for stopping to help me.",
            [
              {
                playerText: "Anytime, Maya. Hope your psych section went smoother.",
                tone: "complimentary",
                memoryTag: "ep1_night_maya_dm",
                memoryText: "Checked in kindly with Maya over DMs on Night 1.",
                npcReply: "It really did. See you at Orientation tomorrow!"
              }
            ],
            "9:42 PM"
          );
        }

        if (state.rep.malik >= 4) {
          pushDM(
            "malik",
            "@malik_ontop",
            "Yo, mandatory Fresher Orientation tomorrow morning. Don't sit near Elliot unless you want a migraine.",
            null,
            "10:30 PM"
          );
        }
      }

      const isTeachersPet = state.mem.afternoonRoute === "teachers_pet";
      const lowTension = state.tension < 18;
      const lowComfort = state.comfort < 18;
      const highTension = state.tension >= 18;
      const highComfort = state.comfort >= 18;
      const isPursue = state.chloeMode === "PURSUE";
      const isControl = state.chloeMode === "CONTROL";

      const isControlLowLowPet = isControl && lowTension && lowComfort && isTeachersPet;
      const isPursueHighLowNoPet = isPursue && highTension && lowComfort && !isTeachersPet;
      const isHighHigh = highTension && highComfort;

      return {
        text: [
          "Rain taps steadily against your dorm window as the campus settles into its first night. Your phone buzzes on the desk with late-night messages while the syllabus and homework for Friday's class lie open beside your lamp.",
          "How you close out Night One sets your footing when mandatory Fresher Orientation begins at 9:00 AM sharp."
        ],
        choices: [
          ...(isControlLowLowPet
            ? [
                {
                  label: "Chloe catches you in control mode with low tension and low comfort—and knows you're a Teacher's Pet.",
                  action: () => {
                    state.mem.chloeHomeworkDemandBeat = 1;
                    state.mem.chloeHomeworkLibraryBeat = 1;
                    state.mem.chloeLibraryTensionRaised = false;
                    goToScene("ep1_ending_control_homework_demand");
                  }
                }
              ]
            : []),
          ...(isPursueHighLowNoPet
            ? [
                {
                  label: "Chloe catches you in pursue mode with high tension and low comfort (not a Teacher's Pet)—she asks about the homework.",
                  action: () => {
                    state.mem.pursueHomeworkBeat = 1;
                    state.mem.pursueLibraryBeat = 1;
                    state.mem.pursueComfortRaised = false;
                    goToScene("ep1_ending_pursue_homework_library");
                  }
                }
              ]
            : []),
          ...(isHighHigh
            ? [
                {
                  label: "With high tension and high comfort between you, Chloe asks to come to your room to do the work together.",
                  action: () => {
                    state.mem.roomSessionBeat = 1;
                    state.mem.roomSessionNpc = state.mem.middayRoute === "library"
                      ? "elliot"
                      : state.mem.middayRoute === "stairwell"
                        ? "maya"
                        : "malik";
                    goToScene("ep1_ending_room_together_ask");
                  }
                }
              ]
            : []),
          {
            label: "Head to the late-night library wing to lock down your notes before Orientation ('Flipped Lib').",
            action: () => {
              state.mem.night1Ending = "flipped_lib";
              state.mastery = clamp(state.mastery + 5, 0, 100);
              promoteGrade();
              recordChoiceMemory("ep1_flipped_lib", "elliot", "Pulled a focused late-night library session ('Flipped Lib') on Night 1.");
              goToScene("ep1_ending_library");
            }
          },
          {
            label: "Answer your Correspondence messages, set your alarm for 8:15 AM, and turn in early.",
            action: () => {
              state.mem.night1Ending = "standard";
              state.control = clamp(state.control + 4, 0, 100);
              recordChoiceMemory("ep1_night_rest", "chloe", "Kept a steady head and rested early before Orientation.");
              goToScene("ep1_ending_standard");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // ENDING BRANCH 1: CONTROL + LOW TENSION + LOW COMFORT + TEACHER'S PET
  // -> OUTRIGHT TELLS YOU TO DO HER HOMEWORK
  // -> IF REFUSED, INVITES YOU TO THE LIBRARY (4 STORY BEATS PER INSCENE PERSON)
  // -> FAIL TO RAISE TENSION DURING BEATS => LEAVES WITH ROB & MALIK
  // ==========================================================================
  ep1_ending_control_homework_demand: {
    id: "ep1_ending_control_homework_demand",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "The Teacher's Pet Assignment",
    presentNPCs: ["chloe"],
    render: () => {
      const beat = state.mem.chloeHomeworkDemandBeat || 1;
      if (beat === 1) {
        return {
          text: [
            "Before you can lock your door for the night, Chloe stops right outside your threshold, arms crossed, eyeing you with the sharp recognition of someone who watched Vance nod at your answer all afternoon.",
            "\"Since you're already acting like Vance's favorite Teacher's Pet,\" Chloe says outright, tapping her folder against her palm, \"you can do my homework tonight. You clearly have the energy for it.\""
          ],
          choices: [
            {
              label: "Refuse to do her homework for her.",
              action: () => {
                state.mem.refusedChloeHomework = true;
                state.mem.chloeHomeworkDemandReaction = "Chloe's eyes narrow sharply—\"Oh, so you're going to play stubborn too?\"";
                state.mem.chloeHomeworkDemandBeat = 2;
                goToScene("ep1_ending_control_homework_demand");
              }
            },
            {
              label: "Agree to do her homework just to keep things smooth.",
              action: () => {
                state.mem.refusedChloeHomework = false;
                state.mem.night1Ending = "control_did_homework";
                state.mastery = clamp(state.mastery + 2, 0, 100);
                recordChoiceMemory("ep1_did_chloe_homework", "chloe", "Agreed to do Chloe's homework after she demanded it as a Teacher's Pet.");
                goToScene("ep1_vip_mixer_invite");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.chloeHomeworkDemandReaction || "Chloe stares at you for two quiet seconds after your refusal, her jaw tightening before she shifts her bag.",
          "\"Fine. Don't act like you're above it,\" Chloe says, gesturing toward the campus library. \"Come to the library then—if you're not going to hand it over, we're getting it done there.\""
        ],
        choices: [
          {
            label: "Head to the library with Chloe (4 story beats per in-scene person).",
            action: () => {
              state.mem.chloeHomeworkLibraryBeat = 1;
              state.mem.chloeLibraryTensionRaised = false;
              goToScene("ep1_control_library_4beats");
            }
          }
        ]
      };
    }
  },

  ep1_control_library_4beats: {
    id: "ep1_control_library_4beats",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Library Table — Four Beats",
    presentNPCs: ["chloe", "rob", "malik"],
    render: () => {
      const beat = state.mem.chloeHomeworkLibraryBeat || 1;
      const inScenePerson = beat <= 2 ? "Rob" : "Malik";

      if (beat === 1) {
        return {
          text: [
            "Beat 1/4 (In-scene: Rob) — Under the library table lamps, Chloe sets her homework open while Rob leans back in the chair beside her with one arm draped over the backrest, watching you refuse to cave.",
            "Rob grins at Chloe—\"See? The guy actually told you no. Thought Teacher's Pets folded on command.\""
          ],
          choices: [
            {
              label: "Fire back at Rob with a sharp, high-tension jab that pulls Chloe's eyes straight onto you.",
              action: () => {
                adjustChloeMatrix(0, 4);
                state.mem.chloeLibraryTensionRaised = true;
                state.mem.chloeLibraryBeat1Out = "Rob chuckles and leans forward, while Chloe looks up from her page with a sharp, charged spark in her eyes.";
                state.mem.chloeHomeworkLibraryBeat = 2;
                goToScene("ep1_control_library_4beats");
              }
            },
            {
              label: "Give a flat, low-key reply to Rob and keep your head down over the assignment.",
              action: () => {
                state.mem.chloeLibraryBeat1Out = "Rob shrugs and leans back, and Chloe goes back to tapping her pen without any spark between you.";
                state.mem.chloeHomeworkLibraryBeat = 2;
                goToScene("ep1_control_library_4beats");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.chloeLibraryBeat1Out || "Rob stays leaned back by the table.",
            "Beat 2/4 (In-scene: Rob) — Rob taps his knuckles on the oak tabletop. \"Either way, Chloe's got plans after this if the homework drags out.\""
          ],
          choices: [
            {
              label: "Challenge Rob directly over his shoulder—\"Funny, looks like she's still sitting right here.\"",
              action: () => {
                adjustChloeMatrix(0, 4);
                state.mem.chloeLibraryTensionRaised = true;
                state.mem.chloeLibraryBeat2Out = "Rob raises both hands with a grin, and Chloe's gaze locks onto yours with unmistakable tension.";
                state.mem.chloeHomeworkLibraryBeat = 3;
                goToScene("ep1_control_library_4beats");
              }
            },
            {
              label: "Say nothing to Rob and underline the next line on the worksheet.",
              action: () => {
                state.mem.chloeLibraryBeat2Out = "Rob lets out a quiet yawn and looks away, while Chloe stays distant across the table.";
                state.mem.chloeHomeworkLibraryBeat = 3;
                goToScene("ep1_control_library_4beats");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.mem.chloeLibraryBeat2Out || "The table stays quiet for a beat.",
            `Beat 3/4 (In-scene: ${inScenePerson}) — Malik slides onto the edge of the nearby bench, tossing a pen lightly in one hand. \"You're taking a lot of heat just to dodge doing Chloe's work, man.\"`
          ],
          choices: [
            {
              label: "Look straight at Malik and flip the heat back onto the table with a daring smirk.",
              action: () => {
                adjustChloeMatrix(0, 5);
                state.mem.chloeLibraryTensionRaised = true;
                state.mem.chloeLibraryBeat3Out = "Malik whistles softly, and Chloe leans forward slightly with a charged, sizing look.";
                state.mem.chloeHomeworkLibraryBeat = 4;
                goToScene("ep1_control_library_4beats");
              }
            },
            {
              label: "Give Malik a dry, detached shrug and keep your tone cold.",
              action: () => {
                state.mem.chloeLibraryBeat3Out = "Malik grins at Rob and shakes his head, while Chloe's posture stays stiff and unmoved.";
                state.mem.chloeHomeworkLibraryBeat = 4;
                goToScene("ep1_control_library_4beats");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.chloeLibraryBeat3Out || "Malik tosses his pen once more.",
          `Beat 4/4 (In-scene: ${inScenePerson}) — Malik glances between you, Rob, and Chloe as the library lights dim along the upper stacks. \"Well? Are we wrapping this up or standing around?\"`
        ],
        choices: [
          {
            label: "Hold the charged tension with Chloe as the fourth beat closes.",
            action: () => {
              adjustChloeMatrix(0, 4);
              state.mem.chloeLibraryTensionRaised = true;
              state.mem.night1Ending = "control_library_tension_raised";
              goToScene("ep1_vip_mixer_invite");
            }
          },
          {
            label: "Keep your distance and let the beat end flat.",
            action: () => {
              if (!state.mem.chloeLibraryTensionRaised) {
                state.mem.night1Ending = "left_with_rob_malik";
                recordChoiceMemory("ep1_chloe_left_rob_malik", "chloe", "Failed to raise tension in the library and Chloe left with Rob and Malik.");
                goToScene("ep1_ending_chloe_rob_malik");
              } else {
                state.mem.night1Ending = "control_library_tension_raised";
                goToScene("ep1_vip_mixer_invite");
              }
            }
          }
        ]
      };
    }
  },

  ep1_ending_chloe_rob_malik: {
    id: "ep1_ending_chloe_rob_malik",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Out the Library Door",
    presentNPCs: ["chloe", "rob", "malik"],
    render: () => ({
      text: [
        "Because you failed to raise the tension during the library story beats, the spark between you and Chloe never catches.",
        "Chloe zips her folder shut without looking back at you, gathers her jacket, and walks out of the library with Rob and Malik laughing right behind her."
      ],
      choices: [
        {
          label: "Check your phone after they leave.",
          action: () => goToScene("ep1_vip_mixer_invite")
        }
      ]
    })
  },

  // ==========================================================================
  // ENDING BRANCH 2: PURSUE + HIGH TENSION + LOW COMFORT + NO TEACHER'S PET
  // -> ASKS IF YOU HAVE DONE THE HOMEWORK, THEN INVITES TO LIBRARY TO HELP YOU
  // -> AT LIBRARY: CHLOE IS WITH ELLIOT & ELLIOT IS DOING HOMEWORK FOR BOTH OF YOU
  // -> 4 STORY BEATS PER IN-SCENE PERSON:
  //    - RAISE COMFORT => SHE GOES WITH YOU TO HER DORM & TRIGGERS ROMANTIC SFW SEX SCENE
  //    - FAIL TO RAISE COMFORT => SHE LEAVES WITH YOU & ELLIOT ESCORTING HER BACK TO HER DORM AND LEAVING YOU TWO AT THE DOOR
  // ==========================================================================
  ep1_ending_pursue_homework_library: {
    id: "ep1_ending_pursue_homework_library",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Help in the Stacks",
    presentNPCs: ["chloe"],
    render: () => {
      const beat = state.mem.pursueHomeworkBeat || 1;
      if (beat === 1) {
        return {
          text: [
            "Chloe catches you outside the corridor with a sharp, tension-heavy look—no Teacher's Pet badge on your record, plenty of friction between you, and almost no real comfort yet.",
            "\"Have you done the homework yet?\" Chloe asks directly, leaning one shoulder against the wall."
          ],
          choices: [
            {
              label: "\"Not yet—let's see what you've got in mind.\"",
              action: () => {
                state.mem.pursueHomeworkBeat = 2;
                goToScene("ep1_ending_pursue_homework_library");
              }
            },
            {
              label: "\"Halfway through it. Why are you asking?\"",
              action: () => {
                state.mem.pursueHomeworkBeat = 2;
                goToScene("ep1_ending_pursue_homework_library");
              }
            }
          ]
        };
      }

      return {
        text: [
          "Chloe gives a slow, charged nod—\"Come to the library then. I'll help you with it.\"",
          "When you reach the library table, Chloe is already sitting there with Elliot—and Elliot is hunched over the pages doing the homework for both of you."
        ],
        choices: [
          {
            label: "Sit down at the table with Chloe and Elliot (4 story beats per in-scene person).",
            action: () => {
              state.mem.pursueLibraryBeat = 1;
              state.mem.pursueComfortRaised = false;
              goToScene("ep1_pursue_library_4beats");
            }
          }
        ]
      };
    }
  },

  ep1_pursue_library_4beats: {
    id: "ep1_pursue_library_4beats",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Elliot's Pencil — Four Beats",
    presentNPCs: ["chloe", "elliot"],
    render: () => {
      const beat = state.mem.pursueLibraryBeat || 1;
      const inScenePerson = beat <= 2 ? "Elliot" : "Chloe";

      if (beat === 1) {
        return {
          text: [
            "Beat 1/4 (In-scene: Elliot) — Elliot's pencil moves nonstop across two separate sheets as he finishes the homework for both you and Chloe, his glasses slipping slightly forward.",
            "\"I'm nearly done with section two for both sets,\" Elliot mutters without looking up."
          ],
          choices: [
            {
              label: "Speak calmly and reassuringly so the table feels safe and comfortable around Chloe.",
              action: () => {
                adjustChloeMatrix(5, 0);
                state.mem.pursueComfortRaised = true;
                state.mem.pursueLibraryBeat1Out = "Chloe glances at you with a softer, more relaxed expression as the tension in the air eases.";
                state.mem.pursueLibraryBeat = 2;
                goToScene("ep1_pursue_library_4beats");
              }
            },
            {
              label: "Keep things strictly stiff and transactional while Elliot writes.",
              action: () => {
                state.mem.pursueLibraryBeat1Out = "Elliot keeps writing silently, and Chloe stays guarded beside you.";
                state.mem.pursueLibraryBeat = 2;
                goToScene("ep1_pursue_library_4beats");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.mem.pursueLibraryBeat1Out || "Elliot writes on.",
            "Beat 2/4 (In-scene: Elliot) — Elliot sets your completed sheet beside your elbow. \"There. Everything is formatted cleanly.\""
          ],
          choices: [
            {
              label: "Thank Elliot smoothly and check in warmly with Chloe.",
              action: () => {
                adjustChloeMatrix(5, 0);
                state.mem.pursueComfortRaised = true;
                state.mem.pursueLibraryBeat2Out = "Chloe's shoulders drop an inch as she leans back comfortably, looking genuinely at ease.";
                state.mem.pursueLibraryBeat = 3;
                goToScene("ep1_pursue_library_4beats");
              }
            },
            {
              label: "Take the sheet without a word and stay distant.",
              action: () => {
                state.mem.pursueLibraryBeat2Out = "Elliot adjusts his glasses, and Chloe remains stiff and guarded.";
                state.mem.pursueLibraryBeat = 3;
                goToScene("ep1_pursue_library_4beats");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            state.mem.pursueLibraryBeat2Out || "The homework sheets sit stacked on the table.",
            `Beat 3/4 (In-scene: ${inScenePerson}) — Chloe slides her finished sheet into her folder and looks over at you. \"It's getting late out here.\"`
          ],
          choices: [
            {
              label: "Offer an easy, comforting smile and ask if she wants to head back to her dorm together.",
              action: () => {
                adjustChloeMatrix(5, 0);
                state.mem.pursueComfortRaised = true;
                state.mem.pursueLibraryBeat3Out = "Chloe gives you a warm, unguarded look—the comfort between you clearly rising.";
                state.mem.pursueLibraryBeat = 4;
                goToScene("ep1_pursue_library_4beats");
              }
            },
            {
              label: "Keep your expression guarded and say nothing extra.",
              action: () => {
                state.mem.pursueLibraryBeat3Out = "Chloe nods slowly, her expression remaining guarded.";
                state.mem.pursueLibraryBeat = 4;
                goToScene("ep1_pursue_library_4beats");
              }
            }
          ]
        };
      }

      return {
        text: [
          state.mem.pursueLibraryBeat3Out || "Chloe packs up her bag.",
          `Beat 4/4 (In-scene: ${inScenePerson}) — Elliot stands up with his books tucked under his arm as the table clears.`
        ],
        choices: [
          {
            label: "Finish raising comfort and walk with Chloe to her dorm.",
            action: () => {
              adjustChloeMatrix(4, 0);
              state.mem.pursueComfortRaised = true;
              state.mem.night1Ending = "chloe_dorm_sfw";
              recordChoiceMemory("ep1_chloe_dorm_sfw", "chloe", "Raised comfort in the library and went with Chloe to her dorm for a romantic SFW scene.");
              goToScene("ep1_ending_chloe_dorm_sfw");
            }
          },
          {
            label: "Leave without raising comfort—escorting Chloe back to her dorm with Elliot and leaving you and Elliot standing together at the door.",
            action: () => {
              if (!state.mem.pursueComfortRaised) {
                state.mem.night1Ending = "escort_chloe_with_elliot";
                recordChoiceMemory("ep1_escort_chloe_elliot", "chloe", "Failed to raise comfort in the library; escorted Chloe to her dorm with Elliot and stayed at the door.");
                goToScene("ep1_ending_escort_chloe_elliot");
              } else {
                state.mem.night1Ending = "chloe_dorm_sfw";
                goToScene("ep1_ending_chloe_dorm_sfw");
              }
            }
          }
        ]
      };
    }
  },

  ep1_ending_chloe_dorm_sfw: {
    id: "ep1_ending_chloe_dorm_sfw",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Chloe's Dorm",
    presentNPCs: ["chloe"],
    render: () => ({
      text: [
        "With your comfort raised across the four library beats, Chloe goes with you back to her dorm and closes the door behind you.",
        "Inside the dimly lit room, the mood turns intimate and tender—triggering a romantic SFW sex scene between you and Chloe as quiet warmth and closeness take over the night."
      ],
      choices: [
        {
          label: "Let the night settle after the romantic SFW scene.",
          action: () => goToScene("ep1_vip_mixer_invite")
        }
      ]
    })
  },

  ep1_ending_escort_chloe_elliot: {
    id: "ep1_ending_escort_chloe_elliot",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "At Chloe's Dorm Door",
    presentNPCs: ["chloe", "elliot"],
    render: () => ({
      text: [
        "Because you failed to raise comfort during the library beats, Chloe leaves with you and Elliot escorting her back to her dorm.",
        "She steps inside and closes her door, leaving you and Elliot standing together right outside at the door."
      ],
      choices: [
        {
          label: "Step back from Chloe's door after the escort.",
          action: () => goToScene("ep1_vip_mixer_invite")
        }
      ]
    })
  },

  // ==========================================================================
  // ENDING BRANCH 3: HIGH TENSION + HIGH COMFORT
  // -> CHLOE ASKS TO COME TO YOUR ROOM TO DO THE WORK TOGETHER
  // -> IF ACCEPTED: 6 STORY BEATS PER IN-SCENE PERSON
  // -> HIGH AURA CHECK:
  //    - PASS => SHE INITIATES ROMANTIC SFW SEX SCENE & ASKS YOU TO BE HER BOYFRIEND
  //      (ACCEPT OR REFUSE HAS AN EFFECT)
  //    - FAIL => CHOICE TO INITIATE A ROMANTIC NO-SFW SCENE WHERE YOU CUDDLE IN BED
  // ==========================================================================
  ep1_ending_room_together_ask: {
    id: "ep1_ending_room_together_ask",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Working Together in Your Room",
    presentNPCs: ["chloe"],
    render: () => ({
      text: [
        "With both tension and comfort high between you, Chloe lingers by your doorway holding her homework sheets with a steady, close look.",
        "\"Can I come into your room so we can do the work together?\" she asks."
      ],
      choices: [
        {
          label: "Accept—let Chloe into your room to do the work together (6 story beats per in-scene person).",
          action: () => {
            state.mem.roomSessionBeat = 1;
            goToScene("ep1_room_together_6beats");
          }
        },
        {
          label: "Decline and turn in for the night.",
          action: () => {
            state.mem.night1Ending = "standard";
            goToScene("ep1_ending_standard");
          }
        }
      ]
    })
  },

  ep1_room_together_6beats: {
    id: "ep1_room_together_6beats",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Behind Closed Doors — Six Beats",
    presentNPCs: ["chloe", state.mem.roomSessionNpc || "malik"],
    render: () => {
      const beat = state.mem.roomSessionBeat || 1;
      const person = state.mem.roomSessionNpc || "malik";
      const personLabel = person === "elliot" ? "Elliot" : person === "maya" ? "Maya" : "Malik";

      const prompts = [
        `Beat 1/6 (In-scene: ${personLabel}) — Chloe sets her homework down on your desk while ${personLabel} steps past the hall outside your door.`,
        `Beat 2/6 (In-scene: ${personLabel}) — You and Chloe go over the first problem together as ${personLabel}'s voice fades down the hall.`,
        `Beat 3/6 (In-scene: ${personLabel}) — Chloe leans closer beside your desk chair, the homework half-forgotten as ${personLabel} heads toward the stairwell.`,
        `Beat 4/6 (In-scene: ${personLabel}) — The hallway outside goes quiet while Chloe's hand rests near yours beside the notebook.`,
        `Beat 5/6 (In-scene: ${personLabel}) — Chloe looks up into your eyes with high tension and deep comfort between you as the room grows still.`,
        `Beat 6/6 (In-scene: ${personLabel}) — The final moment in your room arrives as Chloe turns fully toward you.`
      ];

      return {
        text: [prompts[beat - 1] || prompts[0]],
        choices:
          beat < 6
            ? [
                {
                  label: `Continue beat ${beat} of 6 with ${personLabel} in the scene.`,
                  action: () => {
                    state.mem.roomSessionBeat = beat + 1;
                    goToScene("ep1_room_together_6beats");
                  }
                }
              ]
            : [
                {
                  label: "Run the High Aura check with Chloe.",
                  action: () => {
                    const passedHighAura = state.aura >= 55;
                    if (passedHighAura) {
                      goToScene("ep1_room_high_aura_pass");
                    } else {
                      goToScene("ep1_room_high_aura_fail");
                    }
                  }
                }
              ]
      };
    }
  },

  ep1_room_high_aura_pass: {
    id: "ep1_room_high_aura_pass",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "High Aura Check Passed",
    presentNPCs: ["chloe"],
    render: () => ({
      text: [
        "Your High Aura check passes—Chloe doesn't hesitate for a second. She initiates a romantic SFW sex scene with you in your room, pulling you close with unmistakable chemistry.",
        "Right after, Chloe looks straight into your eyes and asks you to be her boyfriend."
      ],
      choices: [
        {
          label: "Accept—agree to be Chloe's boyfriend.",
          action: () => {
            state.mem.isChloeBoyfriend = true;
            state.mem.night1Ending = "chloe_boyfriend_accepted";
            adjustChloeMatrix(5, 5);
            recordChoiceMemory("ep1_accepted_chloe_boyfriend", "chloe", "Had a romantic SFW scene with Chloe and accepted when she asked you to be her boyfriend.");
            goToScene("ep1_vip_mixer_invite");
          }
        },
        {
          label: "Refuse—turn down being her boyfriend right now.",
          action: () => {
            state.mem.isChloeBoyfriend = false;
            state.mem.night1Ending = "chloe_boyfriend_refused";
            adjustChloeMatrix(-2, 3);
            recordChoiceMemory("ep1_refused_chloe_boyfriend", "chloe", "Had a romantic SFW scene with Chloe but refused when she asked you to be her boyfriend.");
            goToScene("ep1_vip_mixer_invite");
          }
        }
      ]
    })
  },

  ep1_room_high_aura_fail: {
    id: "ep1_room_high_aura_fail",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "High Aura Check Failed",
    presentNPCs: ["chloe"],
    render: () => ({
      text: [
        "Your High Aura check fails—the moment doesn't tip into a sex scene, leaving the room quiet with lingering warmth between you and Chloe."
      ],
      choices: [
        {
          label: "Initiate a romantic no-SFW scene where you and Chloe cuddle in bed.",
          action: () => {
            state.mem.night1Ending = "cuddle_in_bed";
            adjustChloeMatrix(3, 1);
            recordChoiceMemory("ep1_cuddle_in_bed", "chloe", "Initiated a romantic no-SFW scene cuddling with Chloe in bed.");
            goToScene("ep1_vip_mixer_invite");
          }
        }
      ]
    })
  },

  // ==========================================================================
  // END OF EPISODE 1: SINGLE SCENE — ANONYMOUS MESSAGE & VIP MIXER PARTY INVITE
  // WITH HIGH AURA CHECK
  // ==========================================================================
  ep1_vip_mixer_invite: {
    id: "ep1_vip_mixer_invite",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Anonymous Signal — VIP Mixer Party",
    presentNPCs: [],
    render: () => {
      const highAuraInvite = state.aura >= 55;
      return {
        text: [
          "As Night One comes to a close, a single anonymous message lights up your phone screen with no sender ID.",
          highAuraInvite
            ? "Your high aura passes the VIP threshold—the anonymous message drops a private access code and personal invite to the VIP Mixer Party."
            : "Your aura isn't high enough to clear the VIP threshold—the anonymous message leaves you off the VIP Mixer Party invite list."
        ],
        choices: [
          {
            label: "Continue to Episode Two: Mandatory Fresher Orientation →",
            action: () => {
              state.episode = 2;
              goToScene("ep2_orientation");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // EPISODE 1 ENDINGS + CONTEXTUAL BRIDGE INTO EPISODE 2 ORIENTATION
  // ==========================================================================
  ep1_ending_chloe_stay: {
    id: "ep1_ending_chloe_stay",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "After Hours",
    presentNPCs: ["chloe"],
    render: () => ({
      text: [
        "Chloe slips through your door twenty minutes later with her hood pulled up against the drizzle, cheeks flushed from the night air. The practiced campus armor stays by the threshold—she kicks off her boots, curls onto the edge of your bed with an oversized hoodie borrowed from your chair, and talks until the rain slows to a hush.",
        "When the lamp finally clicks off, the space between you disappears in slow, deliberate breaths—warm hands tangling at the collar, the quiet certainty of mutual pull before the night fades out into morning light.",
        "EPISODE ONE COMPLETE. Your choices, hidden stats, and Chloe's standing carry straight into Episode Two: Orientation Day."
      ],
      choices: [
        {
          label: "Step into morning light as Episode One closes →",
          action: () => goToScene("ep1_ending_bridge")
        }
      ]
    })
  },

  ep1_ending_library: {
    id: "ep1_ending_library",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Flipped Lib",
    presentNPCs: [],
    render: () => ({
      text: [
        "Under the green desk lamps of the second-floor stacks, you strip Friday's problem set down to its bare mechanics while half the fresher class is still arguing in group chats.",
        "By the time you walk back across the quiet quad at midnight, your grades and composure are locked—ready for whatever Orientation throws at you at 9:00 AM.",
        "EPISODE ONE COMPLETE. Your choices, hidden stats, and standing carry straight into Episode Two: Orientation Day."
      ],
      choices: [
        {
          label: "Step into morning light as Episode One closes →",
          action: () => goToScene("ep1_ending_bridge")
        }
      ]
    })
  },

  ep1_ending_standard: {
    id: "ep1_ending_standard",
    chapter: "CHAPTER I · END OF EPISODE I",
    title: "Before the Bell",
    presentNPCs: [],
    render: () => ({
      text: [
        "You silence your phone beside the bed as the rain eases outside. Day one barely scratched the surface—tomorrow brings mandatory Fresher Orientation, the full campus cohort, and the real test of where you stand.",
        "EPISODE ONE COMPLETE. Your choices, hidden stats, and standing carry straight into Episode Two: Orientation Day."
      ],
      choices: [
        {
          label: "Step into morning light as Episode One closes →",
          action: () => goToScene("ep1_ending_bridge")
        }
      ]
    })
  },

  ep1_ending_bridge: {
    id: "ep1_ending_bridge",
    chapter: "CHAPTER I · TRANSITION",
    title: "Morning of Day Two",
    presentNPCs: [],
    render: () => {
      const morningContext =
        state.mem.night1Ending === "chloe_stay"
          ? "First pale light filters through the curtains while Chloe is already up by the mirror fixing her hair before heading back to her floor ahead of the 9:00 AM roll."
          : state.mem.night1Ending === "flipped_lib"
            ? "Your alarm chimes at 8:15 AM with Friday's diagnostic outline stacked neatly beside your keys—sharp head, steady pulse, ready for the main hall."
            : "Pale morning light crosses the floor at 8:15 AM after a quiet night's rest, your phone already showing campus reminders for mandatory Fresher Orientation.";

      return {
        text: [
          morningContext,
          "Across the quad, footsteps gather toward the main hall as Day Two begins."
        ],
        choices: [
          {
            label: "Continue to Episode Two: Mandatory Fresher Orientation →",
            action: () => {
              state.episode = 2;
              goToScene("ep2_orientation");
            }
          }
        ]
      };
    }
  }
};
