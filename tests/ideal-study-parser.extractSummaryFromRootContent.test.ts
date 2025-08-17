import { remark } from "remark";
import { assert, test } from "vitest";
import { extractSummaryFromRootContent } from "../scripts/markdown-parser/ideal-study-parser";

function parseMarkdown(markdown: string) {
  const rm = remark();
  return rm.parse(markdown);
}

test("Given markdown with Summary h2 and content When extracting summary Then returns content as markdown", () => {
  // Given
  const markdown = `# Study 1

## Summary

This is the summary content.

It can have multiple paragraphs.

## Next Section

Some other content.`;
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractSummaryFromRootContent(mdast.children);

  // Then
  assert.equal(result, "This is the summary content.\n\nIt can have multiple paragraphs.");
});

test("Given markdown without Summary heading When extracting summary Then throws error", () => {
  // Given
  const markdown = `# Study 1

## Introduction

Some content here.`;
  const mdast = parseMarkdown(markdown);

  // When/Then
  assert.throws(
    () => extractSummaryFromRootContent(mdast.children),
    'Could not find "Summary" heading (h2)'
  );
});

test("Given Summary section at end of document When extracting summary Then returns all content after Summary", () => {
  // Given
  const markdown = `# Study 1

## Summary

This is the summary content.

Final paragraph of the summary.`;
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractSummaryFromRootContent(mdast.children);

  // Then
  assert.equal(result, "This is the summary content.\n\nFinal paragraph of the summary.");
});

test("Given Summary heading with emphasis When extracting summary Then throws error about missing Summary heading", () => {
  // Given
  const markdown = `# Study 1

## **Summary**

This is the summary content.`;
  const mdast = parseMarkdown(markdown);

  // When/Then
  assert.throws(
    () => extractSummaryFromRootContent(mdast.children),
    'Could not find "Summary" heading (h2)'
  );
});