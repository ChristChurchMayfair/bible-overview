import { assert, test } from "vitest";
import { parseQuestionsFromMarkdown } from "../scripts/markdown-parser/ideal-study-parser";
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
  assert.equal(questionSection.questions.length, 1);
  assert.equal(questionSection.questions[0].question, "What things does Genesis 2 include in its vision of true human flourishing?");
  assert.equal(questionSection.questions[0].leadersHint, "Provide a big sheet of paper, see how far they get");
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
  assert.equal(result.length, 4, "Should have 4 blocks");
  
  // First block: Introduction section with first question
  assert.equal(typeof result[0], 'object', "First block should be Introduction section");
  const introSection = result[0] as QuestionSection;
  assert.equal(introSection.title, "Introduction");
  assert.equal(introSection.questions.length, 1);
  assert.equal(introSection.questions[0].question, "What do you imagine when you think about paradise?");
  
  // Second block: Explanatory text between sections  
  assert.equal(typeof result[1], 'string', "Second block should be markdown string");
  assert.equal(result[1], "We will look at it under 4 categories: God, Place, Work, People:");
  
  // Third block: Read Genesis section
  assert.equal(typeof result[2], 'object', "Third block should be Read Genesis section");
  const genesisSection = result[2] as QuestionSection;
  assert.equal(genesisSection.title, "Read Genesis 2:4-25");
  assert.deepEqual(genesisSection.passages, ["Genesis 2:4-25"]);
  assert.equal(genesisSection.questions.length, 1);
  assert.equal(genesisSection.questions[0].question, "What things does Genesis 2 include in its vision of true human flourishing, of paradise?");
  assert.equal(genesisSection.questions[0].leadersHint, "Provide a big sheet of paper, see how far they get");
  
  // Fourth block: God section
  assert.equal(typeof result[3], 'object', "Fourth block should be God section");
  const godSection = result[3] as QuestionSection;
  assert.equal(godSection.title, "God");
  assert.equal(godSection.questions.length, 2);
  assert.equal(godSection.questions[0].question, "How does God relate to us here?");
  assert.equal(godSection.questions[1].question, "What does this mean for human flourishing?");
});