import { remark } from "remark";
import { assert, test } from "vitest";
import { extractStudyNumberFromRootContent } from "../scripts/markdown-parser/ideal-study-parser";

function parseMarkdown(markdown: string) {
  const rm = remark();
  return rm.parse(markdown);
}

test("Given empty document When extracting study number Then throws error with context", () => {
  // Given
  const markdown = "";
  const mdast = parseMarkdown(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromRootContent(mdast.children),
    "Study document is empty - expected at least one child element"
  );
});

test("Given document starting with paragraph When extracting study number Then throws error with element type", () => {
  // Given
  const markdown = "This is a paragraph";
  const mdast = parseMarkdown(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromRootContent(mdast.children),
    "Study document must start with a heading, got paragraph"
  );
});

test("Given document starting with valid h1 heading When extracting study number Then returns study number", () => {
  // Given
  const markdown = "# Study 5";
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractStudyNumberFromRootContent(mdast.children);

  // Then
  assert.equal(result, 5);
});

test("Given document starting with h2 heading When extracting study number Then throws error about wrong depth", () => {
  // Given
  const markdown = "## Study 3";
  const mdast = parseMarkdown(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromRootContent(mdast.children),
    "Study title must be an h1 heading (depth 1), got depth 2"
  );
});

test("Given document with multiple elements starting with heading When extracting study number Then returns study number from first heading", () => {
  // Given
  const markdown = `# Study 42

Some content here`;
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractStudyNumberFromRootContent(mdast.children);

  // Then
  assert.equal(result, 42);
});