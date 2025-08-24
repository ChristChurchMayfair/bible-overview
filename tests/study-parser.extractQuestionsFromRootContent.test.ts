import { remark } from "remark";
import { assert, test } from "vitest";
import { extractQuestionsFromRootContent } from "../scripts/markdown-parser/study-parser";

function parseMarkdown(markdown: string) {
  const rm = remark();
  return rm.parse(markdown);
}

test("Given markdown with Questions h2 and content When extracting questions Then returns content as markdown", () => {
  // Given
  const markdown = `# Study 1

## So What

Final thoughts here.

## Questions

* What different "stories" do humans tell to make sense of who we are?
    * if they need help: 'for example, what story does evolutionary atheism tell?'

### Read Ephesians 1:9-14

* What is God's plan for the universe?
* How certain is the achievement of that plan?`;
  const mdast = parseMarkdown(markdown);

  // When
  const result = extractQuestionsFromRootContent(mdast.children);

  // Then
  const expected = `* What different "stories" do humans tell to make sense of who we are?
  * if they need help: 'for example, what story does evolutionary atheism tell?'

### Read Ephesians 1:9-14

* What is God's plan for the universe?
* How certain is the achievement of that plan?`;
  assert.equal(result, expected);
});