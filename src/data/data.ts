import { Study } from "./types";

export const studies = Object.values(import.meta.glob('../../content/studies/*.json', { eager: true })).map((module) => (module as {default: Study}).default);

export const themeData: { [themeName: string]: string } = {
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
