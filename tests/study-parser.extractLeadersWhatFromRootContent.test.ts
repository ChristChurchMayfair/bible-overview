import { remark } from "remark";
import { assert, test } from "vitest";
import { extractLeadersWhatFromRootContent } from "../scripts/markdown-parser/study-parser";

function parseMarkdown(markdown: string) {
  const rm = remark();
  return rm.parse(markdown);
}

test("Given markdown with What h2 and content When extracting leaders what Then returns content as markdown", () => {
  // Given
  const markdown = `# Study 1

## Introduction

Leaders notes here.

## What

This is the what content.

Multiple paragraphs work too.

## So What

Some other content.`;
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractLeadersWhatFromRootContent(mdast.children);

  // Then
  assert.equal(result, "This is the what content.\n\nMultiple paragraphs work too.");
});