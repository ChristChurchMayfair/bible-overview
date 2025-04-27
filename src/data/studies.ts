export interface Study {
  index: number;
  title: string;
  overview: string;
  passages: string[];
  themes: string[];
  keyApplication: string;
  questions: { [section: string]: string[] };
  additionalResources?: Resource[];
  leadersNotes?: string;
  prayerPoints?: string[];
  timeline?: TimelineEntry[];
}

type BaseTimelineEntry = {
  title: string;
  details: string;
};

export type TimelineEntry = BaseTimelineEntry &
  (
    | {
        date?: number;
        type: "Event";
        subType: "Major" | "Minor";
      }
    | {
        type: "Period";
        duration: "Unknown" | "Infinite" | number;
      }
  );

type Resource = {
  title: string;
  author: string;
  url: string;
  type: "video" | "audio" | "article" | "book";
};

const studies: Study[] = [
  {
    index: 1,
    title: "Plan",
    overview:
      "God’s plan for history is the blessed rule of Christ. His plan progresses through fulfilment of his promises",
    passages: ["Ephesians 1:9-14", "Acts 13:13-39"],
    themes: ["god's sovereignty", "promise"],
    keyApplication: "Trust in God's sovereign plan and promises.",
    questions: {
      "Ephesians 1:9-14": [
        "What does this passage teach us about God's plan for history?",
        "How does the concept of being 'sealed with the Holy Spirit' impact our understanding of God's promises?",
      ],
      "Acts 13:13-39": [
        "How does Paul explain the fulfillment of God's promises in this passage?",
        "What role does Jesus play in the unfolding of God's plan according to Paul?",
      ],
    },
  },
  {
    index: 2,
    title: "Creation",
    overview:
      "God created all things. We are made in his image to enjoy God’s place, presence, people.",
    passages: ["Genesis 1:1-2:25"],
    themes: ["creation", "humanity"],
    keyApplication: "Recognize our purpose in God's creation.",
    questions: {},
  },
  {
    index: 3,
    title: "Fall",
    overview:
      "What went wrong: 4-fold ruin of sin. Promise of evil overcome in Genesis 3:15.",
    passages: ["Genesis 3:1-24"],
    themes: ["sin", "redemption"],
    keyApplication: "Understand the consequences of sin and God's promise of redemption.",
    questions: {},
  },
  {
    index: 4,
    title: "Promise",
    overview:
      "The promise of a recovery of the lost blessings of Eden through God’s choice of one man.",
    passages: ["Genesis 12:1-9", "Genesis 15:1-21", "Genesis 17:1-14"],
    themes: ["promise", "covenant"],
    keyApplication: "Trust in God's faithfulness to His promises.",
    questions: {},
  },
  {
    index: 5,
    title: "Rescue",
    overview:
      "God rescues his people. Reveals himself as faithful promise-maker; rescues through substitutionary sacrifice.",
    passages: ["Exodus 6:1-8", "Exodus 12:21-32"],
    themes: ["deliverance", "redemption"],
    keyApplication: "Rely on God's power to save and deliver.",
    questions: {},
  },
  {
    index: 6,
    title: "Law",
    overview:
      "God relates to his people – presence and word. Covenant ceremony. Grace leads to obedience.",
    passages: ["Exodus 19:1-20:21"],
    themes: ["law", "covenant"],
    keyApplication: "Obey God's commands as a response to His grace.",
    questions: {},
  },
  {
    index: 7,
    title: "Fear",
    overview:
      "Refusing to trust God’s promise to take the land. Condemned to 40 years wilderness wandering.",
    passages: ["Numbers 13-14"],
    themes: ["faith", "judgment"],
    keyApplication: "Trust in God's promises even when it seems difficult.",
    questions: {},
  },
  {
    index: 8,
    title: "Invasion / Jericho",
    overview:
      "Trusting God’s promise to take the land. Parallels with Numbers. Victory at the hands of God.",
    passages: ["Joshua 2", "Joshua 5:13-6:23"],
    themes: ["faith", "victory"],
    keyApplication: "Trust in God's power to fulfill His promises.",
    questions: {},
  },
  {
    index: 9,
    title: "Spiral",
    overview:
      "Toxic cycle of sin – there was no king, everyone did as they pleased.",
    passages: ["Judges 2:6-19", "Judges 3:7-11", "Judges 21:25"],
    themes: ["cycle of sin", "judgment"],
    keyApplication: "Recognize the need for God's leadership in our lives.",
    questions: {},
  },
  {
    index: 10,
    title: "True king",
    overview: "The promise of a forever king in David’s line.",
    passages: ["2 Samuel 7", "Ezekiel 34:11-16, 23"],
    themes: ["kingdom of god", "promise"],
    keyApplication: "Hope in the eternal reign of Christ.",
    questions: {},
  },
  {
    index: 11,
    title: "Temple",
    overview: "Temple – God rules and dwells with his people.",
    passages: [
      "2 Chronicles 5:1-2, 13-6:2",
      "2 Chronicles 6:12-7:3",
      "[1 Kings 8:22-53]",
    ],
    themes: ["worship", "presence"],
    keyApplication: "Worship God as the one who dwells with His people.",
    questions: {},
  },
  {
    index: 12,
    title: "High point",
    overview: "Solomon is the best of the best, but it’s not quite right.",
    passages: ["1 Kings 10:1-10", "1 Kings 11:1-13"],
    themes: ["leadership", "faithfulness"],
    keyApplication: "Recognize the limitations of human leaders.",
    questions: {},
  },
  {
    index: 13,
    title: "Invasion / Exile",
    overview:
      "Failure of kings, fall of Jerusalem. God warned repeatedly through his prophets.",
    passages: ["2 Chronicles 36"],
    themes: ["judgment", "prophecy"],
    keyApplication: "Heed God's warnings and trust in His justice.",
    questions: {},
  },
  {
    index: 14,
    title: "New Covenant",
    overview: "Promises of new covenant, work of the Spirit.",
    passages: [
      "Jeremiah 31:21-34",
      "Ezekiel 36:22-28",
      "Ezekiel 37:1-14",
    ],
    themes: ["covenant", "holy spirit"],
    keyApplication: "Embrace the new covenant through the Spirit.",
    questions: {},
  },
  {
    index: 15,
    title: "Suffering Lamb",
    overview:
      "Suffering servant. Sin will be atoned for, not ignored.",
    passages: ["Isaiah 53"],
    themes: ["redemption", "suffering"],
    keyApplication: "Trust in Jesus as the atoning sacrifice for sin.",
    questions: {},
  },
  {
    index: 16,
    title: "Rebuild",
    overview:
      "The promised restoration… A cause for rejoicing, but it’s some way short of the glorious promises.",
    passages: ["Ezra 1:1-10", "Ezra 3:8-13"],
    themes: ["restoration", "hope"],
    keyApplication: "Rejoice in God's restoration while awaiting fulfillment.",
    questions: {},
  },
  {
    index: 17,
    title: "Jesus",
    overview: "Jesus comes to fulfil the promises of God.",
    passages: ["Luke 3:21-4:17"],
    themes: ["salvation", "promise"],
    keyApplication: "Follow Jesus as the fulfillment of God's promises.",
    questions: {},
  },
  {
    index: 18,
    title: "Cross",
    overview:
      "Cross as fulfilment of promise (touch on the 4 achievements? Redemption, Reconciliation, Justification, Conquest).",
    passages: ["Mark 15", "John 19"],
    themes: ["redemption", "salvation"],
    keyApplication: "Trust in the finished work of Christ on the cross.",
    questions: {},
  },
  {
    index: 19,
    title: "Resurrection",
    overview: "Resurrection – in fulfilment of Scripture.",
    passages: ["Luke 24"],
    themes: ["victory", "hope"],
    keyApplication: "Rejoice in the hope of the resurrection.",
    questions: {},
  },
  {
    index: 20,
    title: "Flame",
    overview:
      "Risen Lord Jesus sends Spirit to create new community of God’s people.",
    passages: ["Acts 2"],
    themes: ["holy spirit", "church"],
    keyApplication: "Live as part of God's Spirit-filled community.",
    questions: {},
  },
  {
    index: 21,
    title: "Now… not yet",
    overview:
      "Life now is life in the Spirit, awaiting glory. Still struggle with sin & suffering, but full assurance.",
    passages: ["Romans 8:1-39"],
    themes: ["perseverance", "hope"],
    keyApplication: "Live with assurance in the Spirit while awaiting glory.",
    questions: {},
  },
  {
    index: 22,
    title: "Rest",
    overview:
      "Rest is past, present, and future. Reviews Israel’s history and teaches biblical theology.",
    passages: ["Hebrews 3-4"],
    themes: ["rest", "faith"],
    keyApplication: "Find rest in Christ now and in the future.",
    questions: {},
  },
  {
    index: 23,
    title: "No more sacrifice",
    overview:
      "Jesus is the once-for-all sacrifice who brings us perfect access to the presence of God.",
    passages: ["Hebrews 10:1-25"],
    themes: ["sacrifice", "salvation"],
    keyApplication: "Rely on Jesus' perfect sacrifice for access to God.",
    questions: {},
  },
  {
    index: 24,
    title: "Heaven",
    overview:
      "The new creation fulfilling all that has been promised. Spot all the links and fulfilments…",
    passages: ["Revelation 21-22"],
    themes: ["hope", "victory"],
    keyApplication: "Look forward to the new creation with hope.",
    questions: {},
  },
];

const themeData: { [themeName: string]: string } = {
  creation: "The creation of the world",
  "god's sovereignty": "The sovereignty of God over all creation",
  humanity: "The creation and purpose of humanity",
  sin: "The origin and consequences of sin",
  judgment: "God's judgment on sin and unrighteousness",
  redemption: "God's plan of redemption and salvation",
  grace: "God's unmerited favor and kindness",
  covenant: "The covenant relationship between God and His people",
  faith: "The importance and role of faith in God's promises",
  promise: "God's faithfulness to His promises and covenants",
  deliverance: "God's power to deliver His people from bondage",
  law: "God's standards for holiness and righteousness",
  holiness: "The call to be holy as God is holy",
  conquest: "The conquest of the promised land by the Israelites",
  obedience: "The importance of obedience to God's commands",
  leadership: "The role of leaders in guiding and shepherding God's people",
  "cycle of sin": "The recurring pattern of sin, judgment, and repentance",
  "kingdom of god": "The reign and rule of God over all creation",
  salvation: "The work of Jesus in saving and redeeming humanity",
  discipleship: "The call to follow and imitate Jesus as His disciples",
  "holy spirit": "The empowering presence of the Holy Spirit in the church",
  church: "The community of believers and the body of Christ",
  mission: "The mission of the church to spread the gospel to all nations",
  witness: "The call to be witnesses of Jesus and His kingdom",
  gospel: "The good news of salvation through Jesus Christ",
  faithfulness: "The importance of faithfulness to God and His word",
  perseverance: "The call to endure and remain faithful in the midst of trials",
  truth: "The importance of sound doctrine and the truth of God's word",
  "end times": "The final events and culmination of God's redemptive plan",
  hope: "The hope and assurance of Christ's return and victory",
  victory: "The ultimate victory of Christ over sin, death, and evil",
  persecution: "The challenges and persecutions faced by the early church",
  growth: "The growth and spread of the gospel throughout history",
  worship: "The act of showing reverence and adoration for God",
  prayer: "The practice of communicating with God",
  lament: "A passionate expression of grief or sorrow",
  praise: "The expression of approval or admiration for God",
  prophecy: "The inspired declaration of divine will and purpose",
  suffering: "The experience of pain, distress, or hardship",
  "fear of the lord": "A profound respect and reverence for God",
  life: "The existence and experience of living beings",
};

export const getThemes = () => Object.keys(themeData);

export const getTheme = (theme: string) => themeData[theme];

export const getStudies = () => studies;

export const getStudy = (id: number) => studies.find((m) => m.index === id);
