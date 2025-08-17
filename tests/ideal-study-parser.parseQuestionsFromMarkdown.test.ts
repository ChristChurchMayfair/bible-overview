import { assert, test } from "vitest";
import { parseQuestionsFromMarkdown } from "../scripts/markdown-parser/ideal-study-parser";

test("Given empty questions markdown When parsing questions Then returns empty array", () => {
  // Given
  const questionsMarkdown = "";

  // When
  const result = parseQuestionsFromMarkdown(questionsMarkdown);

  // Then
  assert.deepEqual(result, []);
});

test("Given questions with introduction bullets When parsing questions Then creates Introduction question section", () => {
  // Given
  const questionsMarkdown = `* What different "stories" do humans tell to make sense of who we are?
  * if they need help: 'for example, what story does evolutionary atheism tell?'`;

  // When
  const result = parseQuestionsFromMarkdown(questionsMarkdown);

  // Then
  assert.equal(result.length, 1);
  assert.equal(result[0].title, "Introduction");
  assert.equal(result[0].questions.length, 1);
  assert.equal(result[0].questions[0].question, 'What different "stories" do humans tell to make sense of who we are?');
  assert.deepEqual(result[0].questions[0].refs, []);
  assert.equal(result[0].questions[0].leadersHint, 'if they need help: \'for example, what story does evolutionary atheism tell?\'');
});