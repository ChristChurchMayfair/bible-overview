import { remark } from "remark";
import { assert, test } from "vitest";
import { extractLeadersNotesFromRootContent } from "../scripts/markdown-parser/study-parser";

function parseMarkdown(markdown: string) {
  const rm = remark();
  return rm.parse(markdown);
}

test("Given markdown with Introduction h2 and content When extracting leaders notes Then returns content as markdown", () => {
  // Given
  const markdown = `# Study 1

## Summary

Some summary content.

## Introduction

These are the leaders notes.

They can have multiple paragraphs.

## What

Some other content.`;
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractLeadersNotesFromRootContent(mdast.children);

  // Then
  assert.equal(result, "These are the leaders notes.\n\nThey can have multiple paragraphs.");
});