import { readFileSync } from "fs";
import { Heading, Paragraph, Root, Text } from "mdast";
import { remark } from "remark";
import { assert, test } from "vitest";
import {
  extractText,
  filterChildren,
  isHeading,
  isParagraph,
  mapChildren,
} from "../scripts/markdown-parser/ast-utils";
import {
  dropHeader,
  extractStudyNumber,
  fixBulletsInParagraph,
  fixSummaryParagraph,
  isSummaryParagraph,
  replaceBullet,
} from "../scripts/markdown-parser/study-parser";
import { toMarkdown } from "mdast-util-to-markdown";

const docPath = "./tests/resources/1.orig.md";
const docAsString = readFileSync(docPath);
const rm = remark();
const mdast = rm.parse(docAsString);

test("detects first paragraph", () => {
  // Given
  const clean = dropHeader(mdast);
  const firstParagraph = clean.children.find((child) => isParagraph(child));

  assert.isNotNull(firstParagraph);

  // When
  const isFirst = isSummaryParagraph(firstParagraph!);

  // Then
  assert.isTrue(isFirst);
});

test("Can extract study number", () => {
  // Given
  const clean = dropHeader(mdast);

  // When
  const studyNumber = extractStudyNumber(clean);

  // Then
  assert.equal(studyNumber, 1);
});

test("Can break first para into proper structure", () => {
  // Given
  const clean = dropHeader(mdast);

  // When
  const fixed = fixSummaryParagraph(clean);

  // Then
  assert.isTrue(isHeading(fixed.children[0]));
  assert.equal((fixed.children[0] as Heading).depth, 1);
  assert.equal(
    extractText(fixed.children[0]),
    "Study 1: Ephesians 1:9-14; Acts 13:13-39"
  );

  assert.isTrue(isHeading(fixed.children[1]));
  assert.equal((fixed.children[1] as Heading).depth, 2);
  assert.isTrue(extractText(fixed.children[1]).startsWith("Summary"));
});

test("Can remove child node with predicate", () => {
  // Given
  const paragraph: Paragraph = {
    type: "paragraph",
    children: [
      { type: "text", value: "a" },
      { type: "text", value: "b" },
      { type: "text", value: "c" },
    ],
  };

  // When
  const filtered = filterChildren(
    paragraph,
    (child) => extractText(child) != "a"
  );

  // Then
  assert.equal(filtered.children.length, 2);
  assert.equal(extractText(filtered), "bc");
});

test("can map children", () => {
  // Given
  const paragraph: Paragraph = {
    type: "paragraph",
    children: [
      { type: "text", value: "a" },
      { type: "text", value: "b" },
      { type: "text", value: "c" },
    ],
  };

  // When
  const filtered = mapChildren(paragraph, (child) => ({
    type: "text",
    value: extractText(child) + extractText(child),
  }));

  // Then
  // assert.equal(filtered.children.length, 2)
  assert.equal(extractText(filtered), "aabbcc");
});

test("can drop header", () => {
  // Given
  const doc: Root = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          { type: "text", value: "Discipleship Groups 2025-26 |" },
          { type: "text", value: " His-story" },
        ],
      },
      {
        type: "paragraph",
        children: [{ type: "text", value: "Next" }],
      },
    ],
  };

  // When
  const newdoc = dropHeader(doc);

  // Then
  assert.equal(newdoc.children.length, 1);
  assert.equal(extractText(newdoc), "Next");
});


test("can replace manual bullet points", () => {
    //Given
    const input: Paragraph = {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Preamble."
        },
        {
          "type": "break"
        },
        {
          "type": "text",
          "value": "∙ Bullet 1"
        },
        {
          "type": "break"
        },
        {
          "type": "text",
          "value": "∙ Bullet 2"
        },
        {
          "type": "break"
        },
        {
          "type": "text",
          "value": "∙ Bullet 3"
        },
        {
          "type": "break"
        },
        {
          "type": "text",
          "value": "∙ Bullet 4"
        }
      ]
    }

    // When
    const fixed = fixBulletsInParagraph(input)
    const fixedMd = toMarkdown({ type: "root", children: fixed})

    // Then
    assert.equal(fixedMd, `Preamble.

* Bullet 1
* Bullet 2
* Bullet 3
* Bullet 4
`)
})

test("Can replace bullet in text", () => {
  // Given
  const text: Text = {
    type: "text",
    value: "∙ bullet"
  }

  // When
  const replaced = replaceBullet(text)

  // Then
  assert.equal(replaced.value, "bullet")
})