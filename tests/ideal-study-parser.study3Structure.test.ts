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
  assert.equal(result.length, 3, "Should have 3 blocks (content is now within sections)");
  
  // Introduction section
  assert.equal(typeof result[0], 'object', "First should be Introduction section");
  const introSection = result[0] as QuestionSection;
  assert.equal(introSection.title, "Introduction");
  assert.equal(introSection.content.length, 1);
  assert.equal(typeof introSection.content[0], 'object');
  if (typeof introSection.content[0] === 'object') {
    assert.equal(introSection.content[0].question, "What do you imagine when you think about paradise?");
  }
  
  // Read Genesis section (now contains the markdown content within it)
  assert.equal(typeof result[1], 'object', "Second should be Read Genesis section");
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
  
  // God section
  assert.equal(typeof result[2], 'object', "Third should be God section");
  const godSection = result[2] as QuestionSection;
  assert.equal(godSection.title, "God");
  assert.equal(godSection.content.length, 3);
  assert.equal(typeof godSection.content[0], 'object');
  assert.equal(typeof godSection.content[1], 'object');
  assert.equal(typeof godSection.content[2], 'object');
  if (typeof godSection.content[0] === 'object' && 
      typeof godSection.content[1] === 'object' && 
      typeof godSection.content[2] === 'object') {
    assert.equal(godSection.content[0].question, "How does God relate to us here?");
    assert.equal(godSection.content[1].question, "What does this mean for human flourishing?");
    assert.equal(godSection.content[2].question, "How should this shape how we live day to day?");
  }
});