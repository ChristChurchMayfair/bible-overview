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
  }
];

export const getStudies = () => studies;

export const getStudy = (id: number) => studies.find((m) => m.index === id);
