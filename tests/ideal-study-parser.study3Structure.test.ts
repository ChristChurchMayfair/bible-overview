import { assert, test } from "vitest";
import { parseQuestionsFromMarkdown } from "../scripts/markdown-parser/ideal-study-parser";

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
  assert.equal(result.length, 3, "Should have 3 sections");
  
  // Introduction section
  assert.equal(result[0].title, "Introduction");
  assert.equal(result[0].questions.length, 1);
  assert.equal(result[0].questions[0].question, "What do you imagine when you think about paradise?");
  
  // Read Genesis section
  assert.equal(result[1].title, "Read Genesis 2:4-25");
  assert.deepEqual(result[1].passages, ["Genesis 2:4-25"]);
  assert.equal(result[1].questions.length, 1);
  assert.equal(result[1].questions[0].question, "What things does Genesis 2 include in its vision of true human flourishing, of paradise?");
  assert.equal(result[1].questions[0].leadersHint, "Provide a big sheet of paper, see how far they get");
  
  // God section
  assert.equal(result[2].title, "God");
  assert.equal(result[2].questions.length, 3);
  assert.equal(result[2].questions[0].question, "How does God relate to us here?");
  assert.equal(result[2].questions[1].question, "What does this mean for human flourishing?");
  assert.equal(result[2].questions[2].question, "How should this shape how we live day to day?");
});