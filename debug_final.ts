import { Paragraph } from "mdast";
import { fixBulletsInParagraph } from "./scripts/markdown-parser/study-parser";
import { toMarkdown } from "mdast-util-to-markdown";

const input: Paragraph = {
  "type": "paragraph",
  "children": [
    { "type": "text", "value": "Preamble." },
    { "type": "break" },
    { "type": "text", "value": "∙ Bullet 1" },
    { "type": "break" },
    { "type": "text", "value": "∙ Bullet 2" },
    { "type": "break" },
    { "type": "text", "value": "∙ Bullet 3" },
    { "type": "break" },
    { "type": "text", "value": "∙ Bullet 4" }
  ]
}

const fixed = fixBulletsInParagraph(input);
const fixedMd = toMarkdown({ type: "root", children: fixed});

console.log("Current output:");
console.log(JSON.stringify(fixedMd));

console.log("\nTrimmed output:");
console.log(JSON.stringify(fixedMd.trimEnd()));

const expected = `Preamble.

* Bullet 1
* Bullet 2
* Bullet 3
* Bullet 4`;

console.log("\nExpected:");
console.log(JSON.stringify(expected));

console.log("\nMatch after trim:", fixedMd.trimEnd() === expected);