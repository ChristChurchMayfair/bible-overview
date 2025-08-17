import { remark } from "remark";
import { assert, test } from "vitest";
import { extractLeadersSoWhatFromRootContent } from "../scripts/markdown-parser/ideal-study-parser";

function parseMarkdown(markdown: string) {
  const rm = remark();
  return rm.parse(markdown);
}

test("Given markdown with So What h2 and content When extracting leaders so what Then returns content as markdown", () => {
  // Given
  const markdown = `# Study 1

## What

What content here.

## So What

This is the so what content.

Final thoughts and applications.`;
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractLeadersSoWhatFromRootContent(mdast.children);

  // Then
  assert.equal(result, "This is the so what content.\n\nFinal thoughts and applications.");
});