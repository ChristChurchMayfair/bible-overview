export interface Study {
  title: string;
  overview: string;
  passages: string[];
  themes: string[];
  keyApplication: string
  questions: string[];
  furtherReading?: Publication[];
  index: number;
}

type Publication = {
  title: string;
  author: string;
  url: string;
}

const studies: Study[] = [
  {
    title: "Creation",
    overview:
      "The creation account in Genesis 1 and 2 provides a foundational understanding of God as the sovereign Creator. Genesis 1 presents the structured six-day creation, emphasizing God’s power, order, and the inherent goodness of creation, culminating in the creation of humanity in His image and the establishment of the Sabbath. Genesis 2 offers a more detailed view of human creation, highlighting God’s personal involvement, the institution of work, relationships, and the significance of obedience. Together, these chapters reveal God’s design, purpose, and care for humanity, calling us to worship, stewardship, and faithful living.",
    passages: ["Genesis 1:1-2:3", "Genesis 2:4-25"],
    themes: ["Creation", "God", "Humanity", "Sabbath"],
    keyApplication: "The creation account calls us to worship God as the sovereign Creator, to recognize the inherent value and dignity of humanity as made in His image, and to embrace our role as stewards of His creation.",
    questions: ["What does the creation account reveal about God?", "What is the significance of being created in God’s image?", "How does the creation account inform our understanding of work and relationships?", "What does it mean to be a steward of God’s creation?"],
    furtherReading: [{ title: "The Doctrine of Creation", author: "Bruce Milne", url: "https://www.amazon.com/Doctrine-Creation-Contours-Christian-Theology/dp/0830815523" }],
    index: 1,
  },
  {
    title: "Fall",
    overview:
      "The fall of humanity in Genesis 3 marks the entrance of sin into God’s perfect creation. The serpent deceives Eve, who then leads Adam into disobedience, resulting in the curse of sin and death. This passage reveals the consequences of sin, including shame, blame, and separation from God. Despite the fall, God’s grace is evident in His provision of clothing for Adam and Eve, as well as the promise of a future Redeemer. The fall highlights the reality of sin, the need for redemption, and the hope of restoration through Christ.",
    passages: ["Genesis 3"],
    themes: ["Sin", "Consequences", "Redemption", "Grace"],
    keyApplication: "The fall of humanity reminds us of the reality of sin, the consequences of disobedience, and the need for redemption through Christ. It also points us to the grace and mercy of God in the midst of our brokenness.",
    questions: ["What led to the fall of humanity in Genesis 3?", "What are the consequences of sin in this passage?", "How does God respond to sin with grace and judgment?", "What is the significance of the promise of a Redeemer?"],
    furtherReading: [{ author: "Tim Keller", title: "The Reason for God", url: "https://www.amazon.com/Reason-God-Belief-Age-Skepticism/dp/1594483493" }],
    index: 2,
  },
  {
    title: "Flood",
    overview: "The flood account in Genesis 6-9 depicts God’s judgment on a corrupt and violent world, as well as His mercy toward Noah and his family. God instructs Noah to build an ark to save his family and pairs of animals from the floodwaters. The flood serves as a reminder of the consequences of sin, the importance of obedience, and the faithfulness of God to preserve a remnant. After the flood, God establishes a covenant with Noah, promising never to destroy the earth again in this manner. The flood narrative points to the need for repentance, faith, and the assurance of God’s protection.",
    passages: ["Genesis 6:9-9:17"],
    themes: ["Judgment", "Mercy", "Covenant", "Faith"],
    keyApplication: "The flood account highlights the consequences of sin, the importance of obedience, and the faithfulness of God to preserve a remnant. It also points to the need for repentance, faith, and the assurance of God’s protection.",
    questions: ["What led to God’s judgment in the flood account?", "How did Noah respond to God’s instructions?", "What does the flood reveal about God’s character?", "What is the significance of the covenant with Noah?"],
    furtherReading: [{title: "The Genesis Flood", author: "John C. Whitcomb Jr. and Henry M. Morris", url: "https://www.amazon.com/Genesis-Flood-Henry-Morris/dp/159638395X"}],
    index: 3,
  },
  {
    title: "Abraham",
    overview: "The story of Abraham in Genesis 12-25 highlights God’s call and covenant with Abraham, the father of the nation",
    passages: ["Genesis 12-25"],
    themes: ["Faith", "Promise", "Covenant", "Obedience"],
    keyApplication: "The story of Abraham demonstrates faith and obedience in response to God’s call and promises. It also points to God’s redemptive plan through the nation",
    questions: ["What is the significance of God’s call to Abraham?", "How does Abraham demonstrate faith and obedience?", "What promises does God make to Abraham?", "How does the story of Abraham point to God’s redemptive plan?"],
    index: 4,
  },
  {
    title: "Exodus",
    overview: "The exodus account in Exodus 1-15 recounts God’s deliverance of the Israelites from captivity in Egypt, establishing a covenant with them, and leading them to the promised land. The story begins with the Israelites’ enslavement and God’s call to Moses to deliver His people. Through a series of plagues, God demonstrates His power over the Egyptian gods and Pharaoh, culminating in the Passover and the parting of the Red Sea. The exodus reveals God’s faithfulness in fulfilling His promises, His power over the forces of evil, and His desire to establish a covenant with His people. It also points to the ultimate deliverance through Christ, who liberates us from sin and death.",
    passages: ["Exodus 1-15"],
    themes: ["Deliverance", "Redemption", "Covenant"],
    keyApplication: "The exodus account reveals God’s faithfulness in delivering His people from bondage, establishing a covenant with them, and leading them to the promised land. It also points to the ultimate deliverance through Christ",
    questions: ["What led to the Israelites’ enslavement in Egypt?", "How did God deliver His people from bondage?", "What is the significance of the Passover?", "How does the exodus point to the ultimate deliverance through Christ?"],
    furtherReading: [
      { title: "Exodus", author: "Douglas K. Stuart", url: "https://www.amazon.com/Exodus-Tyndale-Old-Testament-Commentaries/dp/083084214X" },
    ],
    index: 5,
  },
  {title: "Law", overview: "The giving of the law at Mount Sinai in Exodus 19-40 and Leviticus establishes the covenant relationship between God and the Israelites, providing guidelines for worship, ethics, and community life. The law reflects God’s holiness, justice, and grace in setting apart His people as a kingdom of priests and a holy nation. It includes the Ten Commandments, civil and moral laws, and regulations for the tabernacle and priesthood. The law reveals God’s character, His desire for obedience andrighteousness, and the need for atonement and forgiveness. It also points to Christ as the fulfillment of the law and the source of grace and truth.",
    passages: ["Exodus 19-40", "Leviticus"],  themes: ["Law", "Covenant", "Holiness", "Obedience"],
    keyApplication: "The giving of the law establishes the covenant relationship between God and the Israelites, providing guidelines for worship, ethics, and community life. It reveals God’s character, His desire for obedience and righteousness, and the need for atonement and forgiveness.",
    questions: ["What is the purpose of the law in the Old Testament?", "How does the law reflect God’s character and holiness?", "What are the key components of the law, including the Ten Commandments and regulations for worship?", "How does the law point to Christ as the fulfillment of God’s covenant and the source of grace and truth?"],
    furtherReading: [{ title: "The Law of Perfect Freedom", author: "Michael Horton", url: "https://www.amazon.com/Law-Perfect-Freedom-Reigns-Exposition/dp/0801018701" }],
    index: 6,
  },
  {
    title: "Conquest",
    overview: "The conquest of Canaan in Joshua 1-12 describes the fulfillment of God’s promise to give the land to the Israelites, establishing them as a nation and demonstrating His power and faithfulness. After the death of Moses, Joshua leads the Israelites across the Jordan River into the promised land, where they face various challenges and enemies. Through a series of battles and divine interventions, God grants victory to His people, enabling them to possess the land. The conquest highlights the importance of faith and obedience in fulfilling God’s promises and the need for covenant renewal and commitment. It also points to the ultimate victory through Christ, who conquers sin and death and establishes His kingdom.",
    passages: ["Joshua 1-12"],
    themes: ["Promise", "Faithfulness", "Victory", "Obedience"],
    keyApplication: "The conquest of Canaan demonstrates God’s faithfulness in fulfilling His promises, His power in granting victory to His people, and the importance of faith and obedience in possessing the land.",
    questions: ["What promises did God make to the Israelites regarding the land of Canaan?", "How did Joshua lead the Israelites in conquering the land?", "What role did faith and obedience play in the conquest of Canaan?", "What lessons can we learn from the conquest of Canaan about God’s faithfulness and our response to His promises?"],
    furtherReading: [{ title: "Joshua", author: "David M. Howard Jr.", url: "https://www.amazon.com/Joshua-Tyndale-Old-Testament-Commentaries/dp/083084228X" }],
    index: 7,
  },
  {
    title: "Judges",
    overview: "The period of the judges in Judges 1-21 depicts the cycle of sin, judgment, repentance, and deliverance among the Israelites, as well as the role of the judges in leading and delivering God’s people. After Joshua’s death, the Israelites turn away from God, leading to oppression by foreign nations. In response, God raises up judges to deliver His people and call them to repentance. The judges include figures such as Deborah, Gideon, and Samson, who demonstrate faith, courage, and obedience in the face of adversity. The book of Judges highlights the consequences of sin, the need for repentance and faithfulness, and the role of God’s providence in raising up leaders to deliver His people. It also points to the ultimate Judge and Deliverer, Jesus Christ, who rescues us from sin and establishes His kingdom.",
    passages: ["Judges 1-21"],
    themes: ["Sin", "Judgment", "Deliverance", "Leadership"],
    keyApplication: "The period of the judges reveals the consequences of sin, the need for repentance and faithfulness, and the role of God’s providence in raising up leaders to deliver His people. It also points to the ultimate Judge and Deliverer, Jesus Christ, who rescues us from sin and establishes His kingdom.",
    questions: ["What led to the cycle of sin, judgment, repentance, and deliverance in the period of the judges?", "How did God raise up judges to deliver His people?", "What role did faith, courage, and obedience play in the judges’ leadership?", "What lessons can we learn from the judges about the consequences of sin, the need for repentance, and the role of God’s providence in raising up leaders?"],
    furtherReading: [{ title: "Judges and Ruth", author: "Mary J. Evans", url: "https://www.amazon.com/Judges-Ruth-Tyndale-Old-Testament-Commentaries/dp/0830842298" }],
    index: 8,
  },
  {
    title: "Kingdom",
    overview: "The establishment of the kingdom",
    passages: ["1 Samuel 8-31", "2 Samuel", "1 Kings 1-11"],
    themes: ["Kingship", "Sovereignty", "Faithfulness", "Disobedience"],
    keyApplication: "The establishment of the kingdom highlights the tension between human kingship and God’s sovereignty, the consequences of faithfulness and disobedience, and the need for a righteous king to lead God’s people.",
    questions: ["What led to the establishment of the kingdom", "How did the kings of"],
    index: 9,
  },
  {
    title: "Exile",
    overview: "The exile of",
    passages: ["2 Kings 17-25", "2 Chronicles 36"],
    themes: ["Judgment", "Restoration", "Faithfulness", "Idolatry"],
    keyApplication: "The exile of",
    questions: ["What led to the exile of", "How did God respond to the"],
    index: 10,
  }
];

export const getStudies = () => studies;

export const getStudy = (id: number) => studies.find((m) => m.index === id);
