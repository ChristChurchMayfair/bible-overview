export interface Study {
  index: number;
  title: string;
  slug: string;
  icon: string;
  overview: string;
  passages: string[];
  themes: string[];
  keyApplication: string;
  questions: Record<string, string[]>;
  timeline?: TimelineEntry[];
  prayerPoints?: string[];
  leadersNotes?: string;
  additionalResources?: Resource[];
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
    slug: "plan",
    icon: "analytics",
    overview:
      "God's plan for history is the blessed rule of Christ. His plan progresses through fulfilment of his promises",
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
    slug: "creation",
    icon: "globe",
    overview:
      "God created all things. We are made in his image to enjoy God's place, presence, people.",
    passages: ["Genesis 1:1-2:25"],
    themes: ["creation", "humanity"],
    keyApplication: "Recognize our purpose in God's creation.",
    questions: {},
  },
  {
    index: 3,
    title: "Fall",
    slug: "fall",
    icon: "alert",
    overview:
      "What went wrong: 4-fold ruin of sin. Promise of evil overcome in Genesis 3:15.",
    passages: ["Genesis 3:1-24"],
    themes: ["sin", "redemption"],
    keyApplication:
      "Understand the consequences of sin and God's promise of redemption.",
    questions: {},
  },
  {
    index: 4,
    title: "Promise",
    slug: "promise",
    icon: "ribbon",
    overview:
      "The promise of a recovery of the lost blessings of Eden through God's choice of one man.",
    passages: ["Genesis 12:1-9", "Genesis 15:1-21", "Genesis 17:1-14"],
    themes: ["promise", "covenant"],
    keyApplication: "Trust in God's faithfulness to His promises.",
    questions: {},
  },
  {
    index: 5,
    title: "Rescue",
    slug: "rescue",
    icon: "hand-left",
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
    slug: "law",
    icon: "book",
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
    slug: "fear",
    icon: "warning",
    overview:
      "Refusing to trust God's promise to take the land. Condemned to 40 years wilderness wandering.",
    passages: ["Numbers 13-14"],
    themes: ["faith", "judgment"],
    keyApplication: "Trust in God's promises even when it seems difficult.",
    questions: {},
  },
  {
    index: 8,
    title: "Invasion / Jericho",
    slug: "invasion-jericho",
    icon: "shield-checkmark",
    overview:
      "Trusting God's promise to take the land. Parallels with Numbers. Victory at the hands of God.",
    passages: ["Joshua 2", "Joshua 5:13-6:23"],
    themes: ["faith", "victory"],
    keyApplication: "Trust in God's power to fulfill His promises.",
    questions: {},
  },
  {
    index: 9,
    title: "Spiral",
    slug: "spiral",
    icon: "refresh",
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
    slug: "true-king",
    icon: "crown",
    overview: "The promise of a forever king in David's line.",
    passages: ["2 Samuel 7", "Ezekiel 34:11-16, 23"],
    themes: ["kingdom of god", "promise"],
    keyApplication: "Hope in the eternal reign of Christ.",
    questions: {},
  },
  {
    index: 11,
    title: "High point",
    slug: "high-point",
    icon: "trending-up",
    overview: "Solomon is the best of the best, but it's not quite right.",
    passages: ["1 Kings 10:1-10", "1 Kings 11:1-13"],
    themes: ["leadership", "faithfulness"],
    keyApplication:
      "Recognize that even the best human leadership falls short of God's perfect rule.",
    questions: {},
  },
  {
    index: 12,
    title: "Rebuild",
    slug: "rebuild",
    icon: "construct",
    overview:
      "The promised restoration… A cause for rejoicing, but it's some way short of the glorious promises.",
    passages: ["Ezra 1:1-10", "Ezra 3:8-13"],
    themes: ["restoration", "hope"],
    keyApplication: "Find hope in God's ongoing work of restoration.",
    questions: {},
  },
  {
    index: 13,
    title: "Flame",
    slug: "flame",
    icon: "flame",
    overview:
      "Risen Lord Jesus sends Spirit to create new community of God's people.",
    passages: ["Acts 2"],
    themes: ["holy spirit", "church"],
    keyApplication:
      "Experience the power of the Holy Spirit in building God's community.",
    questions: {},
  },
  {
    index: 14,
    title: "Rest",
    slug: "rest",
    icon: "moon",
    overview:
      "Rest is past, present, and future. Reviews Israel's history and teaches biblical theology.",
    passages: ["Hebrews 3-4"],
    themes: ["rest", "faith"],
    keyApplication: "Enter into God's rest through faith in Christ.",
    questions: {},
  },
  {
    index: 15,
    title: "Invasion / Exile",
    slug: "invasion-exile",
    icon: "exit",
    overview:
      "God's people are exiled from the land. But God promises restoration.",
    passages: ["2 Kings 25:1-12", "Jeremiah 29:1-14"],
    themes: ["judgment", "hope"],
    keyApplication: "Trust in God's promises even in times of judgment.",
    questions: {},
  },
  {
    index: 16,
    title: "New Covenant",
    slug: "new-covenant",
    icon: "heart-circle",
    overview: "Promises of new covenant, work of the Spirit.",
    passages: ["Jeremiah 31:31-34", "Ezekiel 36:22-32"],
    themes: ["covenant", "holy spirit"],
    keyApplication: "Embrace the new covenant through Christ.",
    questions: {},
  },
  {
    index: 17,
    title: "Suffering Lamb",
    slug: "suffering-lamb",
    icon: "paw",
    overview: "Suffering servant. Sin will be atoned for, not ignored.",
    passages: ["Isaiah 53"],
    themes: ["atonement", "suffering"],
    keyApplication: "Find hope in Christ's atoning sacrifice.",
    questions: {},
  },
  {
    index: 18,
    title: "Jesus",
    slug: "jesus",
    icon: "person",
    overview: "Jesus comes to fulfil the promises of God.",
    passages: ["Luke 4:14-21"],
    themes: ["fulfillment", "messiah"],
    keyApplication: "Recognize Jesus as the fulfillment of God's promises.",
    questions: {},
  },
  {
    index: 19,
    title: "Cross",
    slug: "cross",
    icon: "cross",
    overview:
      "Jesus dies as the perfect sacrifice, fulfilling the law and the prophets.",
    passages: ["Matthew 27:45-54"],
    themes: ["sacrifice", "atonement"],
    keyApplication: "Find salvation through Christ's sacrifice.",
    questions: {},
  },
  {
    index: 20,
    title: "Resurrection",
    slug: "resurrection",
    icon: "sunny",
    overview: "Resurrection – in fulfilment of Scripture.",
    passages: ["1 Corinthians 15:1-28"],
    themes: ["resurrection", "victory"],
    keyApplication: "Live in the power of Christ's resurrection.",
    questions: {},
  },
  {
    index: 21,
    title: "Now… not yet",
    slug: "now-not-yet",
    icon: "hourglass",
    overview:
      "Life now is life in the Spirit, awaiting glory. Still struggle with sin & suffering, but full assurance.",
    passages: ["Romans 8:1-39"],
    themes: ["perseverance", "hope"],
    keyApplication: "Live with assurance in the Spirit while awaiting glory.",
    questions: {},
  },
  {
    index: 22,
    title: "No more sacrifice",
    slug: "no-more-sacrifice",
    icon: "checkmark-done",
    overview:
      "The perfect sacrifice has been made. No more need for temple sacrifices.",
    passages: ["Hebrews 10:1-18"],
    themes: ["atonement", "fulfillment"],
    keyApplication: "Rest in the finished work of Christ.",
    questions: {},
  },
  {
    index: 23,
    title: "Heaven",
    slug: "heaven",
    icon: "cloud",
    overview:
      "The new creation – God's people in God's place, enjoying God's presence and people forever.",
    passages: ["Revelation 21:1-22:5"],
    themes: ["new creation", "eternity"],
    keyApplication: "Live with hope for the new creation.",
    questions: {},
  },
  {
    index: 24,
    title: "Temple",
    slug: "temple",
    icon: "home",
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

export const getStudy = (slug: string) => {
  const study = studies.find((s) => s.slug === slug);
  if (!study) {
    console.error(`Study not found for slug: ${slug}`);
  }
  return study;
};
