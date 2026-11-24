// ============================================================================
// MEET CHLOE — CHAPTER ONE: EPISODE ONE (episode1.js)
// Depends on: characters.js, engine.js
// Enforces:
// - 4 ambiguous pre-game calibration questions
// - Minimum 5 relationship-dependent "Get to Know You" beats per in-scene NPC
// - Seamless convergence bridges across ALL midday, detention, and Night 1 branches
// - Anti-omnipresence (state.presentNPCs) & structured choice-memory tracking
// ============================================================================

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
            "\"Brave choice,\" she murmurs, voice dry enough to strike a match on. \"Most people see the leather jacket and assume I bite before 9 AM.\""
          ],
          choices: [
            {
              label: "\"Only before caffeine. Looks like you're already half a cup past dangerous.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_coffee_tease", memoryText: "Teased Chloe about her iced coffee in Row Three." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"It was the only seat without a broken hinge. Don't flatter yourself.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_seat_factual", memoryText: "Told Chloe you only took the seat for the unbroken hinge." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"The jacket works. Honestly, you look like the only person here who didn't dress in the dark.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_jacket_compliment", memoryText: "Complimented Chloe's leather jacket and style in Row Three." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Relax. Nobody's intimidated by someone hiding behind a phone screen.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_phone_bully", memoryText: "Called Chloe out for hiding behind her phone screen." });
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Page fourteen's case study is going to come up first. Good call summarizing it early.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_validated_chloe_notes", memoryText: "Acknowledged Chloe's case-study prep without making a scene." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"You actually write super neat. If I miss anything today, I know who to ask.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_praised_chloe_handwriting", memoryText: "Praised Chloe's neat handwriting before class started." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"All that highlighting and you're still pretending you didn't study all weekend.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_mocked_chloe_prep", memoryText: "Mocked Chloe for pretending she hadn't studied." });
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Relax. What you put on paper is your business, not theirs.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_secret_kept", memoryText: "Told Chloe her academic prep was strictly her own business." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Honestly, it's cool that you take your future seriously. You shouldn't have to hide it.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_encouraged", memoryText: "Told Chloe she shouldn't have to hide taking her future seriously." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"Relax, nobody's paying that much attention to you anyway.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_dismissed", memoryText: "Dismissed Chloe by saying nobody was paying attention to her." });
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"I just prefer knowing where I stand before people start performing.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"I'm hoping for entertaining—especially if we end up in the same study group.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            },
            {
              label: "\"You're the one screening texts like you're running from something.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_chloe_arrival_beat");
              }
            }
          ]
        };
      }

      return {
        text: [
          "Before Chloe can reply, Malik stands up on the top bench behind you, cupping both hands around his mouth like a stadium announcer while Rob grins beside him.",
          "Chloe rolls her eyes toward the ceiling, though she doesn't move an inch away from your shoulder. \"Here we go,\" she mutters under her breath. \"Ten minutes in and the back row already thinks it's an open mic.\""
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Look at you, already memorizing the professor's seating chart.\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot", memoryTag: "ep1_elliot_seating_tease", memoryText: "Teased Elliot for memorizing the professor's seating chart." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Appreciate the heads-up. You look like you've got this whole module mapped out.\"",
              action: () => {
                applyTone("complimentary", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Turn around and worry about your own paper.\"",
              action: () => {
                applyTone("bully", { targetNpc: "elliot" });
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
            "Elliot pushes his glasses up with one knuckle, his posture rigid as a ruler. Even when he tries to sound helpful, his eyes dart across your blank notepad like he's calculating whether you're a threat to his curve.",
            "\"Only the top two scores in this seminar get recommended for the spring research fellowship,\" Elliot says quietly, lowering his voice so the back row won't hear. \"Most of the people in here are just coasting on high school reputations.\""
          ],
          choices: [
            {
              label: "\"Then let them coast. Less competition at the top.\"",
              action: () => {
                applyTone("factual", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Careful, Elliot—keep talking like that and people will think you're plotting.\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"With your prep, you're practically a lock for one of those spots.\"",
              action: () => {
                applyTone("complimentary", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Sounds like you're already looking for excuses if someone beats you.\"",
              action: () => {
                applyTone("bully", { targetNpc: "elliot" });
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
            "Elliot's jaw tightens slightly, a faint flush rising above his collar before he masks it by uncapping a yellow highlighter. Across the aisle, Chloe glances over her shoulder at the two of you, one blonde eyebrow lifting at your quiet standoff with the front-row perfectionist."
          ],
          choices: [
            {
              label: "Catch Chloe's eye across the aisle with a faint, unbothered half-smile.",
              action: () => {
                adjustChloeMatrix(1, 2);
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "Pull out a pen and jot two sharp bullet points on your page.",
              action: () => {
                applyTone("factual", { targetNpc: "elliot" });
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
            "Elliot notices your gaze flick toward row three and gives a sharp, disdainful sniff. \"Chloe Reed,\" he mutters under his breath. \"Transferred in from out of county. She pretends she doesn't care, which means she'll drop out by midterms.\"",
            "He taps his pen twice against his desk, waiting to see if you'll agree with his verdict."
          ],
          choices: [
            {
              label: "\"Wouldn't bet on it. Look closer at her desk.\"",
              action: () => {
                applyTone("factual", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Sounds like you've been watching her closer than the syllabus, Elliot.\"",
              action: () => {
                applyTone("tease", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            },
            {
              label: "\"Keep your eyes on your own lane, man. Worry about the fellowship.\"",
              action: () => {
                applyTone("bully", { targetNpc: "elliot" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_elliot_arrival_beat");
              }
            }
          ]
        };
      }

      return {
        text: [
          "Before Elliot can retort, Malik claps his hands twice from the top row, echoing off the cinderblock walls. \"Alright, listen up! Since Vance is ten minutes late, we're not sitting here like it's a funeral.\""
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Best sightline in the room. You see everything before it happens.\"",
              action: () => {
                state.rep.rob += 3;
                applyTone("factual", { targetNpc: "rob" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"You two look like you already run half the building.\"",
              action: () => {
                state.rep.malik += 1;
                applyTone("complimentary", { targetNpc: "malik" });
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
            "Malik gestures subtly with his chin toward the rows below. \"Okay, quick rundown: row two with the color-coded highlighters is Elliot—dude hasn't blinked since 8:15. Row three on the left in the leather jacket is Chloe Reed. Nobody's cracked a word out of her since she walked in.\"",
            "Rob snorts, flexing his shoulders against the wall. \"She's acting too big for a fresher seminar. Bet twenty bucks she leaves at the break.\""
          ],
          choices: [
            {
              label: "\"Save your twenty, Rob. Look at the notebook beside her coffee—she's not leaving.\"",
              action: () => {
                state.rep.rob += 2;
                applyTone("factual", { targetNpc: "rob" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Careful, Rob—sounds like you're mad she didn't look your way when she walked in.\"",
              action: () => {
                state.rep.malik += 3;
                applyTone("tease", { targetNpc: "rob" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"She definitely has presence, I'll give her that.\"",
              action: () => {
                applyTone("complimentary", { targetNpc: "malik" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Who cares what she does? You guys sound obsessed.\"",
              action: () => {
                state.rep.rob -= 2;
                applyTone("bully", { targetNpc: "rob" });
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
            "Rob barks out a short laugh, shaking his head, while Malik slaps the back of his hand against Rob's shoulder. \"Told you the new guy has eyes,\" Malik says.",
            "Down in row three, Chloe tilts her head slightly—not turning around, just shifting her golden hair over one shoulder as if she caught the cadence of laughter from the top bench."
          ],
          choices: [
            {
              label: "Keep your expression cool and let Malik line up his next move.",
              action: () => {
                state.control = clamp(state.control + 2, 0, 100);
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "Ask Rob what sport he plays—looks like track or rugby build.",
              action: () => {
                state.rep.rob += 3;
                applyTone("factual", { targetNpc: "rob" });
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
            "\"Varsity crew and intramural ball,\" Rob says, tapping his knuckles on the desk. \"And Malik here runs his mouth like it's an Olympic event.\"",
            "\"Somebody has to keep the room awake,\" Malik shoots back, already rising to his feet with a wicked grin. \"Watch this—Vance is still stuck in traffic, so we're running a quick warm-up.\""
          ],
          choices: [
            {
              label: "\"Go ahead, Malik. Let's see who actually has a backbone in here.\"",
              action: () => {
                state.rep.malik += 2;
                applyTone("tease", { targetNpc: "malik" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            },
            {
              label: "\"Keep it sharp—don't hand Elliot an excuse to snitch to Vance.\"",
              action: () => {
                state.rep.rob += 2;
                applyTone("factual", { targetNpc: "rob" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_backrow_arrival_beat");
              }
            }
          ]
        };
      }

      return {
        text: [
          "Malik claps twice, drawing every head in Block B Lecture Room 4 toward the back bench."
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
  // CONVERGENCE POINT 1: SCENE 2 PRE-CLASS ICEBREAKER (ALL ARRIVALS REJOIN)
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
              goToScene("ep1_scene3");
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
              goToScene("ep1_scene3");
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
              goToScene("ep1_scene3");
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
              goToScene("ep1_scene3");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 3: HALLWAY SPLIT (PURSUE VS CONTROL)
  // ==========================================================================
  ep1_scene3: {
    id: "ep1_scene3",
    chapter: "CHAPTER I · EPISODE I",
    title: "The Corridor Split",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const inPursue = state.chloeMode === "PURSUE" || (state.mem.satWithChloe && state.tension >= 17);
      if (inPursue && state.tension < 24 && state.mem.satWithChloe && state.tension >= 18) {
        adjustChloeMatrix(0, 2);
      }

      return {
        text: [
          "Professor Vance sweeps in two minutes later, turning the next forty-five minutes into a brisk, unforgiving tour of macro-theory and Friday's diagnostic paper.",
          "When the midday bell finally cuts through the hum of the room, chairs scrape back in a rush. Out in the sunlit Block B corridor, students split toward the main quad or the off-campus street gate.",
          inPursue
            ? "Chloe lingers beside the water fountain just outside Room 4, adjusting the strap of her bag. When you step into the hall, she doesn't walk away—she matches your stride for two paces and tilts her head toward the side exit. \"Cafeteria food tastes like wet cardboard,\" she says lightly. \"There's a corner grill two blocks down if you're not chained to campus.\""
            : "Chloe doesn't linger by the door—she slips straight into the flow of the corridor crowd with her earbuds in, heading toward the main courtyard without looking back. Rob and Malik head off toward the gym block, leaving the midday break wide open."
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Deal. Order first—I'm paying for the booth since you picked the spot.\"",
              action: () => {
                state.cash = Math.max(0, state.cash - 18);
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_grill_paid_lunch", memoryText: "Covered lunch at the Corner Grill without making a fuss." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Honestly, you're already way more interesting than anyone back in that lecture hall.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Funny coming from someone whose whole personality is an Instagram bio.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Using a practical degree to fund what you actually want isn't fake—it's smart.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_creative_secret", memoryText: "Backed Chloe's plan to use her degree to fund creative direction." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"You have the eye for it. Anyone can see that the second you walk into a room.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe", memoryTag: "ep1_chloe_creative_secret", memoryText: "Praised Chloe's eye for style and creative direction." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Sounds like you're scared to actually commit to either one.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
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
            "Basket of hot fries lands between you. Chloe steals two immediately, blowing across the steam before looking back up through her lashes.",
            state.tension >= 22
              ? "Her knee brushes yours beneath the table—and instead of pulling back, she lets it rest there for a beat too long. \"You read people way too fast,\" she murmurs, voice dropping half an octave. \"It's kind of unfair.\""
              : "She taps a fry against the edge of the basket. \"Careful. If you figure out everyone's angle on day one, you're going to get bored by week two.\""
          ],
          choices: [
            {
              label: "\"I'll let you know when you get predictable. Hasn't happened yet.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"I'm not trying to figure everybody out. Just the ones worth paying attention to.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Could never get bored sitting across from you.\"",
              action: () => {
                applyTone("complimentary", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"Don't flatter yourself—you're easier to read than the menu.\"",
              action: () => {
                applyTone("bully", { chloeDirect: true, targetNpc: "chloe" });
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
            "Chloe checks the clock above the counter—1:38 PM. The afternoon seminar starts at 1:45 sharp, and Block B is an eight-minute brisk walk back up the hill.",
            "She slides out of the booth, shrugging her leather jacket back over her shoulders. \"If we walk in late together after vanishing at noon, Elliot's going to have an aneurysm and Malik will never shut up.\""
          ],
          choices: [
            {
              label: "\"Let them talk. Watching Elliot sweat is half the entertainment.\"",
              action: () => {
                applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            },
            {
              label: "\"If we cut through the east courtyard gate, we beat the bell by two minutes.\"",
              action: () => {
                applyTone("factual", { chloeDirect: true, targetNpc: "chloe" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_pursue");
              }
            }
          ]
        };
      }

      return {
        text: [
          "You step out onto the sidewalk side by side, matching stride as the campus bell tower chimes the quarter-hour across the street."
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
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            },
            {
              label: "\"Everyone adjusts at their own speed. You don't have to match anyone else's pace.\"",
              action: () => {
                state.rep.maya += 2;
                applyTone("factual", { targetNpc: "maya" });
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
            "Maya's phone buzzes softly in her cardigan pocket. She glances at the screen, murmurs a quiet \"I have to run to my psych section,\" and looks up at you with warm sincerity if you treated her with decency.",
            state.rep.maya >= 8
              ? "\"See you around campus—and seriously, thanks for stopping.\""
              : "\"Excuse me,\" she says politely, slipping through the courtyard door."
          ],
          choices: [
            {
              label: "Give her a nod and head back toward Block B for the afternoon lecture.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_control");
              }
            }
          ]
        };
      }

      return {
        text: [
          "The stairwell door swings shut behind her, leaving the quiet echo of footsteps fading across the courtyard bricks."
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
            "Elliot snaps his laptop shut simultaneously, tucking his highlighters into his blazer pocket with a stiff nod. \"We'll see whose framework holds up when Vance starts cold-calling,\" he says, already heading for the stairs."
          ],
          choices: [
            {
              label: "Follow a pace behind him toward Block B.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep1_scene4_library");
              }
            }
          ]
        };
      }

      return {
        text: [
          "The afternoon bell echoes across the quad as students filter back into Block B Lecture Room 4."
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
  // CONVERGENCE POINT 2: SCENE 5 AFTERNOON LECTURE (ALL MIDDAY PATHS REJOIN)
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
            label: "Step up and deliver a sharp, concise breakdown of the core model—earning the 'Teacher's Pet' edge over Elliot.",
            action: () => {
              state.mem.afternoonRoute = "academic";
              state.mastery = clamp(state.mastery + 5, 0, 100);
              promoteGrade();
              state.rep.elliot -= 4;
              applyTone("factual", {
                chloeDirect: true,
                targetNpc: "elliot",
                memoryTag: "ep1_outshone_elliot",
                memoryText: "Out-answered Elliot in the afternoon lecture and took the top spot."
              });
              goToScene("ep1_dusk_quad");
            }
          },
          {
            label: "Flip Vance's cold-call into a dry joke that cracks up Rob and Malik—and gets you sent straight to Hallway Detention.",
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
              startGetToKnowYouArc("ep1_brandon_detention", "brandon", "ep1_dusk_quad", 5);
              goToScene("ep1_detention_brandon");
            }
          },
          {
            label: "Push back bluntly when Elliot tries to correct your answer mid-sentence—landing yourself in Hallway Detention.",
            action: () => {
              state.mem.afternoonRoute = "detention";
              state.rep.elliot -= 6;
              applyTone("bully", {
                chloeDirect: true,
                targetNpc: "elliot",
                memoryTag: "ep1_sent_to_detention",
                memoryText: "Clashed with Elliot mid-lecture and caught Hallway Detention."
              });
              startGetToKnowYouArc("ep1_brandon_detention", "brandon", "ep1_dusk_quad", 5);
              goToScene("ep1_detention_brandon");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // SCENE 5B: HALLWAY DETENTION WITH BRANDON (5 BEATS -> CONVERGES TO DUSK QUAD)
  // ==========================================================================
  ep1_detention_brandon: {
    id: "ep1_detention_brandon",
    chapter: "CHAPTER I · EPISODE I",
    title: "Hallway Detention",
    presentNPCs: ["brandon"], // Brandon strictly restricted to Hallway Detention & pre-hangout bond
    render: () => {
      const arc = state.activeArc || startGetToKnowYouArc("ep1_brandon_detention", "brandon", "ep1_dusk_quad", 5);
      const beat = arc.beatIndex;

      if (beat === 1) {
        return {
          text: [
            "Outside Lecture Room 4, the long tiled corridor is empty except for the low hum of the vending machines and a steady, syncopated 808 rhythm tapped out against a denim knee.",
            "Slouched on the wooden bench outside the department office is Brandon—dark-skinned Black, tapered locs framing a sharp jaw, wired studio headphones resting around his collar, and a beat-up composition notebook balanced on one knee filled with crossed-out bars and verse schemes.",
            "Brandon looks up as the heavy door clicks shut behind you, one eyebrow rising in amusement. \"Vance got you too, huh? Didn't even make it past afternoon roll.\""
          ],
          choices: [
            {
              label: "\"Had to give the back row something worth watching. What's the beat you're running?\"",
              action: () => {
                state.rep.brandon += 4;
                state.mem.brandonBond = true;
                applyTone("tease", { targetNpc: "brandon", memoryTag: "ep1_met_brandon", memoryText: "Bonded with Brandon in Hallway Detention over his beats and lyrics." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            },
            {
              label: "\"Bad timing on a cold-call. You writing verses or burning time till the bell?\"",
              action: () => {
                state.rep.brandon += 3;
                state.mem.brandonBond = true;
                applyTone("factual", { targetNpc: "brandon", memoryTag: "ep1_met_brandon", memoryText: "Talked straight with Brandon in Hallway Detention." });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            },
            {
              label: "\"Respect—you actually look like you've got real music going on, not just campus noise.\"",
              action: () => {
                state.rep.brandon += 2;
                applyTone("complimentary", { targetNpc: "brandon" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            },
            {
              label: "\"Keep the tapping down, man. I'm not trying to catch a second write-up.\"",
              action: () => {
                state.rep.brandon -= 5;
                applyTone("bully", { targetNpc: "brandon" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            }
          ]
        };
      }

      if (beat === 2) {
        return {
          text: [
            state.rep.brandon >= 2
              ? "Brandon lets out a low chuckle, tapping his pen twice against the spiral binding. \"Hook for a track I'm cutting tonight at a basement studio off 4th,\" he says, tapping the side of his headphones. \"Half these kids walk around acting like college is the whole world. I'm just stacking credits while I get my tape finished.\""
              : "Brandon pulls his knees in slightly, slipping his pen behind his ear and resting his chin in his hand without offering much else.",
            "Down the hall, the department clerk's heels click briefly behind frosted glass before fading again."
          ],
          choices: [
            {
              label: "\"Smart. Keep one foot in the booth and one foot out of trouble until the tape drops.\"",
              action: () => {
                state.rep.brandon += 3;
                state.mem.brandonBond = true;
                applyTone("factual", { targetNpc: "brandon" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            },
            {
              label: "\"Just make sure you don't shout out Vance on the intro—he'll fail you out of spite.\"",
              action: () => {
                state.rep.brandon += 4;
                state.mem.brandonBond = true;
                applyTone("tease", { targetNpc: "brandon" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            }
          ]
        };
      }

      if (beat === 3) {
        return {
          text: [
            "Brandon smirks, shaking his locs back as he flips a page in his lyric notebook. \"Nah, Vance gets zero free promo,\" he says. \"You know Chloe Reed in that room? Blonde girl in the leather jacket?\"",
            "He glances sideways at you, reading your reaction without pressing. \"Word around the east dorms is she's got half the fresher guys guessing whether she's friendly or ice-cold.\""
          ],
          choices: [
            {
              label: "\"She's neither—she's just got sharper armor than most people here.\"",
              action: () => {
                state.rep.brandon += 2;
                applyTone("factual", { targetNpc: "brandon" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            },
            {
              label: "\"Let them keep guessing. Less traffic in my lane.\"",
              action: () => {
                state.rep.brandon += 3;
                applyTone("tease", { targetNpc: "brandon" });
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            }
          ]
        };
      }

      if (beat === 4) {
        return {
          text: [
            "The final afternoon bell rings down the corridor, vibrating through the bench. Brandon tucks his lyric notebook into his hoodie pocket and stands up, sliding his headphones onto his ears with one cup left uncovered.",
            state.mem.brandonBond
              ? "\"I'm heading straight to the studio, so I won't be at any fresher campus mixer tonight,\" Brandon says, offering a clean fist bump. \"Catch you around tomorrow before the evening crowd starts up.\""
              : "Brandon gives a brief chin-nod and heads toward the side exit without looking back."
          ],
          choices: [
            {
              label: "Return the fist bump and step out toward the East Quad as classes dismiss.",
              action: () => {
                advanceGetToKnowYouBeat();
                goToScene("ep1_detention_brandon");
              }
            }
          ]
        };
      }

      return {
        text: [
          "The doors of Block B swing open as the rest of the afternoon seminar pours out onto the dusk-lit quad."
        ],
        choices: [
          {
            label: "Join the dispersal on the East Quad.",
            action: () => {
              advanceGetToKnowYouBeat();
              goToScene("ep1_dusk_quad");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // CONVERGENCE POINT 3: 4:15 PM EAST QUAD DISPERSAL (ACADEMIC & DETENTION REJOIN)
  // ==========================================================================
  ep1_dusk_quad: {
    id: "ep1_dusk_quad",
    chapter: "CHAPTER I · EPISODE I",
    title: "Dusk on the East Quad",
    presentNPCs: ["chloe", "rob", "malik", "elliot"],
    render: () => {
      const fromDetention = state.mem.afternoonRoute === "detention";
      return {
        text: [
          "Amber streetlights flicker on along the wet stone paths outside Block B as the final bell fades.",
          fromDetention
            ? "Stepping out from the detention corridor just as Room 4 empties, you draw an immediate grin from Malik and a raised fist from Rob—while Chloe pauses by the bike racks, glancing back over her shoulder with a faint, unreadable smirk."
            : "Stepping out of Room 4 after locking down the top diagnostic score, you pass Elliot hurrying off toward the admin building with his jaw clenched, while Rob and Malik head toward the dorms and Chloe lingers briefly near the quad steps.",
          "Before everyone scatters for the night, you have one last beat on the quad."
        ],
        choices: [
          {
            label: "Give Chloe a brief, unbothered nod across the steps before heading toward your dorm.",
            action: () => {
              adjustChloeMatrix(1, 2);
              applyTone("tease", { chloeDirect: true, targetNpc: "chloe" });
              goToScene("ep1_night1");
            }
          },
          {
            label: "Trade a quick word with Rob and Malik about tomorrow's mandatory Orientation.",
            action: () => {
              state.rep.rob += 2;
              state.rep.malik += 2;
              applyTone("factual", { targetNpc: "malik" });
              goToScene("ep1_night1");
            }
          },
          {
            label: "Head straight back to your dorm without looking back—let them wonder what your next move is.",
            action: () => {
              state.control = clamp(state.control + 3, 0, 100);
              goToScene("ep1_night1");
            }
          }
        ]
      };
    }
  },

  // ==========================================================================
  // NIGHT 1 CORRESPONDENCE & ROUTING TO EPISODE 2
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
            state.chloeMode === "PURSUE"
              ? "Don't let today go to your head. Orientation tomorrow at 9—try not to embarrass yourself."
              : state.mem.afternoonRoute === "detention"
                ? "Getting kicked out on day one is bold. Don't make a habit of it tomorrow."
                : "You survived day one without falling asleep. Impressive.",
            [
              {
                playerText: "Wouldn't miss seeing what you wear to Orientation.",
                tone: "tease",
                memoryTag: "ep1_night_flirty_dm",
                memoryText: "Sent a teasing late-night DM to Chloe on Night 1.",
                npcReply: "Keep talking like that and you're buying tomorrow's coffee too."
              },
              {
                playerText: "9 AM sharp. Get some rest, Chloe.",
                tone: "factual",
                memoryTag: "ep1_night_grounded_dm",
                memoryText: "Kept Night 1 DMs grounded and concise with Chloe.",
                npcReply: "See you in the morning."
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

      const canChloeStayOver = state.chloeMode === "PURSUE" && state.comfort >= 20 && state.aura >= 54;

      return {
        text: [
          "Rain taps steadily against your dorm window as the campus settles into its first night. Your phone buzzes on the desk with late-night messages while the syllabus for Friday's diagnostic lies open beside your lamp.",
          "How you close out Night One sets your footing when mandatory Fresher Orientation begins at 9:00 AM sharp."
        ],
        choices: [
          ...(canChloeStayOver
            ? [
                {
                  label: "Invite Chloe over when she texts that her dorm floor won't quiet down.",
                  action: () => {
                    state.mem.night1Ending = "chloe_stay";
                    adjustChloeMatrix(4, 3);
                    recordChoiceMemory("ep1_chloe_stayed_over", "chloe", "Chloe came by your dorm late on Night 1 and stayed until dawn.");
                    goToScene("ep1_ending_chloe_stay");
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
  // EPISODE 1 ENDINGS (ALL CONVERGE INTO EPISODE 2 ORIENTATION)
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
          label: "Continue to Episode Two: Mandatory Fresher Orientation →",
          action: () => {
            state.episode = 2;
            goToScene("ep2_orientation");
          }
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
          label: "Continue to Episode Two: Mandatory Fresher Orientation →",
          action: () => {
            state.episode = 2;
            goToScene("ep2_orientation");
          }
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
          label: "Continue to Episode Two: Mandatory Fresher Orientation →",
          action: () => {
            state.episode = 2;
            goToScene("ep2_orientation");
          }
        }
      ]
    })
  }
};
