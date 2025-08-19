import { assert, test } from "vitest";
import { parseQuestionsFromMarkdown } from "../scripts/markdown-parser/ideal-study-parser";
import { QuestionSection } from "../src/data/types";

test("Given study 3 structure When parsing questions Then creates separate sections correctly", () => {
  // Given - the actual structure from study 3
  const questionsMarkdown = `* What do you imagine when you think about paradise?

### Read Genesis 2:4-25

* What things does Genesis 2 include in its vision of true human flourishing, of paradise?
    * Provide a big sheet of paper, see how far they get

We will look at it under 4 categories: God, Place, Work, People:

### God

* How does God relate to us here?
* What does this mean for human flourishing?
* How should this shape how we live day to day?`;

  // When
  const result = parseQuestionsFromMarkdown(questionsMarkdown);

  // Then
  assert.equal(result.length, 4, "Should have 4 blocks");
  
  // Introduction section
  assert.equal(typeof result[0], 'object', "First should be Introduction section");
  const introSection = result[0] as QuestionSection;
  assert.equal(introSection.title, "Introduction");
  assert.equal(introSection.questions.length, 1);
  assert.equal(introSection.questions[0].question, "What do you imagine when you think about paradise?");
  
  // Markdown string
  assert.equal(typeof result[1], 'string', "Second should be markdown string");
  assert.equal(result[1], "We will look at it under 4 categories: God, Place, Work, People:");
  
  // Read Genesis section
  assert.equal(typeof result[2], 'object', "Third should be Read Genesis section");
  const genesisSection = result[2] as QuestionSection;
  assert.equal(genesisSection.title, "Read Genesis 2:4-25");
  assert.deepEqual(genesisSection.passages, ["Genesis 2:4-25"]);
  assert.equal(genesisSection.questions.length, 1);
  assert.equal(genesisSection.questions[0].question, "What things does Genesis 2 include in its vision of true human flourishing, of paradise?");
  assert.equal(genesisSection.questions[0].leadersHint, "Provide a big sheet of paper, see how far they get");
  
  // God section
  assert.equal(typeof result[3], 'object', "Fourth should be God section");
  const godSection = result[3] as QuestionSection;
  assert.equal(godSection.title, "God");
  assert.equal(godSection.questions.length, 3);
  assert.equal(godSection.questions[0].question, "How does God relate to us here?");
  assert.equal(godSection.questions[1].question, "What does this mean for human flourishing?");
  assert.equal(godSection.questions[2].question, "How should this shape how we live day to day?");
});