import { assert, test } from "vitest";
import { parseQuestionsFromMarkdown } from "../scripts/markdown-parser/study-parser";
import { QuestionSectionBlock, QuestionSection } from "../src/data/types";

test("Given mixed content with headings and questions When parsing questions Then returns array of blocks in correct order", () => {
  // Given - simple structure with markdown content and a question section
  const questionsMarkdown = `Some introductory text here.

### Read Genesis 2:4-25

* What things does Genesis 2 include in its vision of true human flourishing?
    * Provide a big sheet of paper, see how far they get`;

  // When
  const result = parseQuestionsFromMarkdown(questionsMarkdown);

  // Then
  assert.equal(result.length, 2, "Should have 2 blocks");
  
  // First block should be markdown content
  assert.equal(typeof result[0], 'string', "First block should be markdown string");
  assert.equal(result[0], "Some introductory text here.", "Should contain the introductory text");
  
  // Second block should be a question section
  assert.equal(typeof result[1], 'object', "Second block should be question section");
  const questionSection = result[1] as any; // Type assertion for testing
  assert.equal(questionSection.title, "Read Genesis 2:4-25");
  assert.deepEqual(questionSection.passages, ["Genesis 2:4-25"]);
  assert.equal(questionSection.content.length, 1);
  assert.equal(typeof questionSection.content[0], 'object');
  if (typeof questionSection.content[0] === 'object') {
    assert.equal(questionSection.content[0].question, "What things does Genesis 2 include in its vision of true human flourishing?");
    assert.equal(questionSection.content[0].leadersHint, "Provide a big sheet of paper, see how far they get");
  }
});

test("Given study 3 structure with content between sections When parsing questions Then preserves all content in correct order", () => {
  // Given - the actual structure from study 3 that was problematic
  const questionsMarkdown = `* What do you imagine when you think about paradise?

### Read Genesis 2:4-25

* What things does Genesis 2 include in its vision of true human flourishing, of paradise?
    * Provide a big sheet of paper, see how far they get

We will look at it under 4 categories: God, Place, Work, People:

### God

* How does God relate to us here?
* What does this mean for human flourishing?`;

  // When
  const result = parseQuestionsFromMarkdown(questionsMarkdown);

  // Then
  assert.equal(result.length, 3, "Should have 3 blocks (content is now within sections)");
  
  // First block: Introduction section with first question
  assert.equal(typeof result[0], 'object', "First block should be Introduction section");
  const introSection = result[0] as QuestionSection;
  assert.equal(introSection.title, "Introduction");
  assert.equal(introSection.content.length, 1);
  assert.equal(typeof introSection.content[0], 'object');
  if (typeof introSection.content[0] === 'object') {
    assert.equal(introSection.content[0].question, "What do you imagine when you think about paradise?");
  }
  
  // Second block: Read Genesis section (now contains the explanatory text within it)
  assert.equal(typeof result[1], 'object', "Second block should be Read Genesis section");
  const genesisSection = result[1] as QuestionSection;
  assert.equal(genesisSection.title, "Read Genesis 2:4-25");
  assert.deepEqual(genesisSection.passages, ["Genesis 2:4-25"]);
  assert.equal(genesisSection.content.length, 2); // 1 question + 1 markdown string
  assert.equal(typeof genesisSection.content[0], 'object');
  if (typeof genesisSection.content[0] === 'object') {
    assert.equal(genesisSection.content[0].question, "What things does Genesis 2 include in its vision of true human flourishing, of paradise?");
    assert.equal(genesisSection.content[0].leadersHint, "Provide a big sheet of paper, see how far they get");
  }
  assert.equal(typeof genesisSection.content[1], 'string');
  assert.equal(genesisSection.content[1], "We will look at it under 4 categories: God, Place, Work, People:");
  
  // Third block: God section
  assert.equal(typeof result[2], 'object', "Third block should be God section");
  const godSection = result[2] as QuestionSection;
  assert.equal(godSection.title, "God");
  assert.equal(godSection.content.length, 2);
  assert.equal(typeof godSection.content[0], 'object');
  assert.equal(typeof godSection.content[1], 'object');
  if (typeof godSection.content[0] === 'object' && typeof godSection.content[1] === 'object') {
    assert.equal(godSection.content[0].question, "How does God relate to us here?");
    assert.equal(godSection.content[1].question, "What does this mean for human flourishing?");
  }
});