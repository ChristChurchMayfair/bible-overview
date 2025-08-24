import { remark } from "remark";
import { assert, test } from "vitest";
import { extractStudyNumberFromHeading } from "../scripts/markdown-parser/study-parser";
import { isHeading } from "../scripts/markdown-parser/ast-utils";

function parseMarkdownHeading(markdown: string) {
  const rm = remark();
  const mdast = rm.parse(markdown);
  const heading = mdast.children.find(child => isHeading(child));
  if (!heading || !isHeading(heading)) {
    throw new Error("No heading found in markdown");
  }
  return heading;
}

test("Given valid h1 heading with Study 5 When extracting study number Then returns 5", () => {
  // Given
  const markdown = "# Study 5";
  const heading = parseMarkdownHeading(markdown);

  // When
  const result = extractStudyNumberFromHeading(heading);

  // Then
  assert.equal(result, 5);
});

test("Given h2 heading instead of h1 When extracting study number Then throws error about wrong depth", () => {
  // Given
  const markdown = "## Study 3";
  const heading = parseMarkdownHeading(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromHeading(heading),
    "Study title must be an h1 heading (depth 1), got depth 2"
  );
});

test("Given heading with multiple children When extracting study number Then throws error about child count", () => {
  // Given
  const markdown = "# Study **3** with emphasis";
  const heading = parseMarkdownHeading(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromHeading(heading),
    "Study title heading must have exactly one child, got 3 children"
  );
});

test("Given heading containing only emphasis instead of text When extracting study number Then throws error about content type", () => {
  // Given
  const markdown = "# **Bold text**";
  const heading = parseMarkdownHeading(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromHeading(heading),
    "Study title heading must contain text, got strong"
  );
});

test("Given heading text not starting with Study When extracting study number Then throws error about format", () => {
  // Given
  const markdown = "# Chapter 5";
  const heading = parseMarkdownHeading(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromHeading(heading),
    'Study title must start with "Study ", got "Chapter 5"'
  );
});

test("Given Study followed by non-numeric text When extracting study number Then throws error about invalid integer", () => {
  // Given
  const markdown = "# Study ABC";
  const heading = parseMarkdownHeading(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromHeading(heading),
    'Study number must be a valid integer, got "ABC"'
  );
});

test("Given Study with no number When extracting study number Then throws error about format", () => {
  // Given
  const markdown = "# Study ";
  const heading = parseMarkdownHeading(markdown);

  // When/Then
  assert.throws(
    () => extractStudyNumberFromHeading(heading),
    'Study title must start with "Study ", got "Study"'
  );
});