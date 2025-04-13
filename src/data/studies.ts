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
  timeline?: TimelineEvent[];
}

export type TimelineEvent = {
  title: string;
  details: string;
  date: number;
};

type Resource = {
  title: string;
  author: string;
  url: string;
  type: "video" | "audio" | "article" | "book";
};

const studies: Study[] = [
  {
    title: "God's Grand Plan",
    overview:
      "God's ultimate plan is to unite all things in heaven and on earth under Christ. This plan reveals His sovereignty, wisdom, and purpose in creation and redemption.",
    passages: ["Ephesians 1:9-10", "Colossians 1:15-20"],
    themes: ["creation", "god's sovereignty", "humanity"],
    keyApplication:
      "Understanding the creation helps us recognize God's sovereignty and our purpose in His creation.",
    questions: {
      "": [
        "What does the creation account teach us about God?",
        "How does the creation account shape our understanding of humanity?",
        "What is the significance of the seventh day?",
        "How does the creation account point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Genesis Creation Account",
        author: "G. K. Beale",
        url: "https://www.amazon.com/Genesis-Creation-Account-Revisited-Expanded/dp/1683590451",
        type: "book",
      },
    ],
    index: 1,
    timeline: [
      {
        title: "Creation",
        details: "God created the heavens and the earth in six days.",
        date: 0,
      },
      {
        title: "The Fall",
        details:
          "Humanity disobeyed God, leading to sin and separation from Him.",
        date: 1,
      },
      {
        title: "The Flood",
        details:
          "God judged the world through a flood but saved Noah and his family.",
        date: 2,
      },
      {
        title: "The Tower of Babel",
        details:
          "Humanity attempted to build a tower to reach heaven, leading to God's confusion of languages.",
        date: 3,
      },
    ],
  },
  {
    index: 21,
    title: "Ephesians 1:1-14",
    passages: ["Ephesians 1:1-14"],
    overview:
      "The book of Ephesians is a letter written by the apostle Paul to the church in Ephesus. It emphasizes the unity of believers in Christ, the spiritual blessings in Christ, and the calling to live a life worthy of the gospel. Ephesians 1 focuses on God's plan of salvation, predestination, adoption, redemption, and the sealing of the Holy Spirit.",
    themes: ["salvation", "predestination", "adoption", "redemption"],
    keyApplication:
      "God has blessed us richly in Christ as part of his plan to unite all things under Christ for his glory. So praise God for all the blessings we have in Christ.",
    questions: {
      "": ["What is God’s big plan for the universe?"],
      "vv1-2": ["How does Paul describe himself and the Ephesians?"],
      "vv3-10": [
        "Make a table detailing all the blessings Paul lists in 3-10 in one column, and what is good about them in the other column. Begin by getting the group to identify all the blessings, and then making sure they understand what they mean.",
        "What encouragement is there for us to learn that we didn’t just choose to follow Jesus, God chose to save us before we were even born?",
        "What motivated God to lavish all these blessings on us?",
        "Which of these blessings do you find most precious? Why? ",
        "What is God’s plan for this universe?",
      ],
      "vv11-14": [
        "What can stop God achieving his purpose for the world?",
        "What part do we play in God’s plan to bring the cosmos under Jesus’ blessed rule?",
        "How can we come to enjoy all these blessings?",
        "How would you feel if the government passed a law stating it was ok to believe in Jesus, it was ok to pray, and even ok to evangelise. But it was illegal to sing God’s praises?",
        "How does this impact/change the way you think about God? What would it look like if you really grasped this?",
      ],
    },
    prayerPoints: [
      "Thank God for choosing to save us before we were even born.",
      "Thank God for the blessings he has lavished on us in Christ.",
      "Ask God to help you understand and enjoy these blessings more.",
      "Ask God to help you live in a way that brings glory to him.",
    ],
    additionalResources: [],
  },
  {
    title: "Fall",
    overview:
      "The fall of humanity and the introduction of sin into the world. It explains the origin of sin and the need for redemption through Christ. It reveals the consequences of disobedience to God's commands and the brokenness of the world as a result of sin.",
    passages: ["Genesis 3"],
    themes: ["sin", "judgment", "redemption"],
    keyApplication:
      "The fall explains the origin of sin and the need for redemption through Christ.",
    questions: {
      "": [
        "What led to the fall of humanity?",
        "What were the consequences of the fall?",
        "How does the fall affect our understanding of sin and redemption?",
        "How does the fall point to the need for Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Fall of Man",
        author: "D. A. Carson",
        url: "https://www.amazon.com/Fall-Man-Biblical-Theological-Reflections/dp/0801039276",
        type: "book",
      },
    ],
    index: 2,
  },
  {
    title: "Flood",
    overview: "The flood and Noah's ark",
    passages: ["Genesis 6-9"],
    themes: ["judgment", "grace", "covenant"],
    keyApplication:
      "The flood narrative highlights God's judgment on sin and His grace in providing a way of salvation.",
    questions: {
      "": [
        "What led to the flood?",
        "How did Noah find favor with God?",
        "What is the significance of the covenant with Noah?",
        "How does the flood narrative point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "Noah's Ark and the Flood",
        author: "John H. Walton",
        url: "https://www.amazon.com/Noahs-Ark-Flood-Biblical-Theological/dp/0801039284",
        type: "book",
      },
    ],
    index: 3,
  },
  {
    title: "Patriarchs",
    overview: "The patriarchs of Israel",
    passages: ["Genesis 12-50"],
    themes: ["faith", "promise", "covenant"],
    keyApplication:
      "The lives of the patriarchs demonstrate God's faithfulness to His promises and the importance of faith.",
    questions: {
      "": [
        "Who were the patriarchs, and what were their roles?",
        "How did God fulfill His promises to the patriarchs?",
        "What can we learn from the faith of the patriarchs?",
        "How do the patriarchs point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Patriarchs",
        author: "John Goldingay",
        url: "https://www.amazon.com/Patriarchs-Biblical-Theological-Reflections/dp/0801039292",
        type: "book",
      },
    ],
    index: 4,
  },
  {
    title: "Exodus",
    overview: "The exodus from Egypt",
    passages: ["Exodus 1-15"],
    themes: ["deliverance", "covenant", "law"],
    keyApplication:
      "The exodus narrative reveals God's power to deliver His people and establish a covenant relationship with them.",
    questions: {
      "": [
        "What led to the exodus from Egypt?",
        "How did God deliver His people from slavery?",
        "What is the significance of the covenant at Sinai?",
        "How does the exodus narrative point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Exodus",
        author: "T. Desmond Alexander",
        url: "https://www.amazon.com/Exodus-Biblical-Theological-Reflections/dp/0801039306",
        type: "book",
      },
    ],
    index: 5,
  },
  {
    title: "Law",
    overview: "The giving of the law",
    passages: ["Exodus 20", "Leviticus", "Deuteronomy"],
    themes: ["law", "holiness", "covenant"],
    keyApplication:
      "The giving of the law shows God's standards for holiness and the covenant relationship with His people.",
    questions: {
      "": [
        "What is the purpose of the law?",
        "How does the law reveal God's holiness?",
        "What is the significance of the covenant relationship?",
        "How does the law point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Law and the Gospel",
        author: "Philip Graham Ryken",
        url: "https://www.amazon.com/Law-Gospel-Biblical-Theological-Reflections/dp/0801039314",
        type: "book",
      },
    ],
    index: 6,
  },
  {
    title: "Conquest",
    overview: "The conquest of the promised land",
    passages: ["Joshua"],
    themes: ["faith", "obedience", "promise"],
    keyApplication:
      "The conquest of the promised land demonstrates the importance of faith and obedience to God's promises.",
    questions: {
      "": [
        "What was the significance of the conquest of the promised land?",
        "How did Joshua lead the Israelites in faith and obedience?",
        "What challenges did the Israelites face during the conquest?",
        "How does the conquest narrative point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "Joshua and the Conquest of Canaan",
        author: "David M. Howard Jr.",
        url: "https://www.amazon.com/Joshua-Conquest-Canaan-Biblical-Theological/dp/0801039322",
        type: "book",
      },
    ],
    index: 7,
  },
  {
    title: "Judges",
    overview: "The period of the judges",
    passages: ["Judges"],
    themes: ["leadership", "faithfulness", "cycle of sin"],
    keyApplication:
      "The period of the judges highlights the need for godly leadership and faithfulness to God.",
    questions: {
      "": [
        "What was the role of the judges in Israel?",
        "How did the cycle of sin affect the Israelites?",
        "What can we learn from the leadership of the judges?",
        "How does the period of the judges point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "Judges: A Theological Commentary",
        author: "James B. Jordan",
        url: "https://www.amazon.com/Judges-Theological-Commentary-Biblical-Theological/dp/0801039330",
        type: "book",
      },
    ],
    index: 8,
  },
  {
    title: "Kings",
    overview: "The united and divided kingdoms",
    passages: ["1 Samuel", "2 Samuel", "1 Kings", "2 Kings"],
    themes: ["leadership", "covenant", "faithfulness"],
    keyApplication:
      "The history of the kings reveals the importance of godly leadership and faithfulness to God's covenant.",
    questions: {
      "": [
        "What was the significance of the united and divided kingdoms?",
        "How did the leadership of the kings affect Israel and Judah?",
        "What can we learn from the successes and failures of the kings?",
        "How do the kings point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Kings of Israel and Judah",
        author: "John H. Walton",
        url: "https://www.amazon.com/Kings-Israel-Judah-Biblical-Theological/dp/0801039349",
        type: "book",
      },
    ],
    index: 9,
  },
  {
    title: "Exile",
    overview: "The exile of Israel and Judah",
    passages: ["2 Kings 17", "2 Kings 25"],
    themes: ["judgment", "repentance", "hope"],
    keyApplication:
      "The exile demonstrates the consequences of unfaithfulness to God and the hope of restoration.",
    questions: {
      "": [
        "What led to the exile of Israel and Judah?",
        "What were the consequences of the exile?",
        "How did the prophets call the people to repentance during the exile?",
        "How does the exile point to the hope of restoration in Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Exile and Restoration",
        author: "Peter J. Gentry",
        url: "https://www.amazon.com/Exile-Restoration-Biblical-Theological-Reflections/dp/0801039357",
        type: "book",
      },
    ],
    index: 10,
  },
  {
    title: "Return",
    overview: "The return from exile",
    passages: ["Ezra 1-10", "Nehemiah 1-13"],
    themes: ["restoration", "rebuilding", "faithfulness", "covenant"],
    keyApplication:
      "The return from exile highlights God's faithfulness in restoring His people and the importance of rebuilding and renewing the covenant relationship with Him.",
    questions: {
      "": [
        "What led to the return from exile?",
        "How did the Israelites rebuild and renew their covenant with God?",
        "What challenges did they face during the return?",
        "What lessons can we learn about restoration and faithfulness?",
      ],
    },
    additionalResources: [
      {
        title: "Ezra and Nehemiah",
        author: "Derek Kidner",
        url: "https://www.amazon.com/Ezra-Nehemiah-Tyndale-Old-Testament-Commentaries/dp/0830842212",
        type: "book",
      },
    ],
    index: 11,
  },
  {
    title: "Prophets",
    overview: "The role of the prophets",
    passages: ["Isaiah", "Jeremiah", "Ezekiel", "Daniel"],
    themes: ["prophecy", "judgment", "hope", "redemption"],
    keyApplication:
      "The prophets called God's people to repentance, warned of judgment, and offered hope of redemption and restoration.",
    questions: {
      "": [
        "What was the role of the prophets in Israel?",
        "How did the prophets call the people to repentance?",
        "What messages of hope and redemption did the prophets deliver?",
        "How do the prophecies point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Prophets",
        author: "Abraham J. Heschel",
        url: "https://www.amazon.com/Prophets-Abraham-J-Heschel/dp/0060936991",
        type: "book",
      },
    ],
    index: 12,
  },
  {
    title: "Wisdom Literature",
    overview: "The wisdom literature",
    passages: ["Proverbs", "Ecclesiastes", "Job"],
    themes: ["wisdom", "suffering", "fear of the lord", "life"],
    keyApplication:
      "The wisdom literature provides insights into living a life that honors God, addresses the problem of suffering, and emphasizes the fear of the Lord as the beginning of wisdom.",
    questions: {
      "": [
        "What is the purpose of the wisdom literature?",
        "How do Proverbs, Ecclesiastes, and Job address different aspects of life and faith?",
        "What is the fear of the Lord, and why is it important?",
        "How does the wisdom literature point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Wisdom of Proverbs, Job, and Ecclesiastes",
        author: "Derek Kidner",
        url: "https://www.amazon.com/Wisdom-Proverbs-Ecclesiastes-Biblical-Studies/dp/0830829275",
        type: "book",
      },
    ],
    index: 13,
  },
  {
    title: "Psalms",
    overview: "The book of Psalms",
    passages: ["Psalms"],
    themes: ["Worship", "Prayer", "Lament", "Praise"],
    keyApplication:
      "The Psalms provide a model for worship, prayer, and expressing the full range of human emotions before God.",
    questions: {
      "": [
        "What are the different types of Psalms?",
        "How do the Psalms teach us to worship and pray?",
        "What role do lament and praise play in the Psalms?",
        "How do the Psalms point to Christ?",
      ],
    },
    additionalResources: [
      {
        title: "The Psalms: An Introduction",
        author: "Tremper Longman III",
        url: "https://www.amazon.com/Psalms-Introduction-Tremper-Longman-III/dp/0801036447",
        type: "book",
      },
    ],
    index: 14,
  },
  {
    title: "Gospels",
    overview: "The life and ministry of Jesus",
    passages: ["Matthew", "Mark", "Luke", "John"],
    themes: ["Jesus", "Kingdom of God", "Salvation", "Discipleship"],
    keyApplication:
      "The Gospels reveal the life, ministry, death, and resurrection of Jesus, calling us to follow Him and participate in the Kingdom of God.",
    questions: {
      "": [
        "What do the Gospels reveal about Jesus?",
        "How did Jesus inaugurate the Kingdom of God?",
        "What is the significance of Jesus' death and resurrection?",
        "What does it mean to be a disciple of Jesus?",
      ],
    },
    additionalResources: [
      {
        title: "Jesus and the Gospels",
        author: "Craig L. Blomberg",
        url: "https://www.amazon.com/Jesus-Gospels-Craig-L-Blomberg/dp/0801038261",
        type: "book",
      },
    ],
    index: 15,
  },
  {
    title: "Acts",
    overview: "The early church",
    passages: ["Acts"],
    themes: ["Holy Spirit", "Church", "Mission", "Witness"],
    keyApplication:
      "The book of Acts describes the birth and growth of the early church, the work of the Holy Spirit, and the mission to spread the gospel to the ends of the earth.",
    questions: {
      "": [
        "What is the significance of the Holy Spirit in Acts?",
        "How did the early church grow and spread the gospel?",
        "What challenges did the early church face?",
        "What lessons can we learn from the early church about mission and witness?",
      ],
    },
    additionalResources: [
      {
        title: "Acts",
        author: "Darrell L. Bock",
        url: "https://www.amazon.com/Acts-Baker-Exegetical-Commentary-Testament/dp/080102668X",
        type: "book",
      },
    ],
    index: 16,
  },
  {
    title: "Paul's Letters",
    overview: "The letters of Paul",
    passages: [
      "Romans",
      "1 Corinthians",
      "2 Corinthians",
      "Galatians",
      "Ephesians",
      "Philippians",
      "Colossians",
      "1 Thessalonians",
      "2 Thessalonians",
      "1 Timothy",
      "2 Timothy",
      "Titus",
      "Philemon",
    ],
    themes: ["Gospel", "Church", "Grace", "Faith"],
    keyApplication:
      "Paul's letters provide theological insights, practical instructions, and encouragement for living out the gospel in the context of the church.",
    questions: {
      "": [
        "What are the main themes of Paul's letters?",
        "How do Paul's letters address the life and mission of the church?",
        "What practical instructions does Paul give for Christian living?",
        "How do Paul's letters point to the gospel of grace and faith in Christ?",
      ],
    },
    additionalResources: [
      {
        title: "Paul: Apostle of the Heart Set Free",
        author: "F. F. Bruce",
        url: "https://www.amazon.com/Paul-Apostle-Heart-Set-Free/dp/0802847781",
        type: "book",
      },
    ],
    index: 17,
  },
  {
    title: "General Epistles",
    overview: "The general epistles",
    passages: [
      "Hebrews",
      "James",
      "1 Peter",
      "2 Peter",
      "1 John",
      "2 John",
      "3 John",
      "Jude",
    ],
    themes: ["Faith", "Perseverance", "Holiness", "Truth"],
    keyApplication:
      "The general epistles address various aspects of faith, perseverance, holiness, and truth, encouraging believers to live faithfully in the midst of trials and challenges.",
    questions: {
      "": [
        "What are the main themes of the general epistles?",
        "How do the general epistles encourage perseverance and faithfulness?",
        "What instructions do the general epistles give for holy living?",
        "How do the general epistles address the importance of truth and sound doctrine?",
      ],
    },
    additionalResources: [
      {
        title: "The General Epistles",
        author: "Thomas R. Schreiner",
        url: "https://www.amazon.com/General-Epistles-Introduction-Commentary/dp/0801036455",
        type: "book",
      },
    ],
    index: 18,
  },
  {
    title: "Revelation",
    overview: "The book of Revelation",
    passages: ["Revelation"],
    themes: ["End Times", "Judgment", "Hope", "Victory"],
    keyApplication:
      "The book of Revelation provides a vision of the end times, the final judgment, and the ultimate victory of Christ, offering hope and encouragement to believers.",
    questions: {
      default: [
        "What is the main message of the book of Revelation?",
        "How does Revelation describe the end times and final judgment?",
        "What hope and encouragement does Revelation offer to believers?",
        "How does Revelation point to the ultimate victory of Christ?",
      ],
    },
    additionalResources: [
      {
        title: "Revelation",
        author: "G. K. Beale",
        url: "https://www.amazon.com/Revelation-New-International-Greek-Testament/dp/0802871075",
        type: "book",
      },
    ],
    index: 19,
  },
  {
    title: "Church History",
    overview: "The history of the church",
    passages: ["Acts", "Church History"],
    themes: ["Church", "Mission", "Persecution", "Growth"],
    keyApplication:
      "The history of the church provides insights into the mission, growth, and challenges faced by the church throughout the centuries, encouraging us to remain faithful and committed to the gospel.",
    questions: {
      default: [
        "What are the key events in the history of the church?",
        "How has the church grown and spread the gospel throughout the centuries?",
        "What challenges and persecutions has the church faced?",
        "What lessons can we learn from church history about mission and faithfulness?",
      ],
    },
    additionalResources: [
      {
        title: "Church History in Plain Language",
        author: "Bruce L. Shelley",
        url: "https://www.amazon.com/Church-History-Plain-Language-4th/dp/1401676316",
        type: "book",
      },
    ],
    index: 20,
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
