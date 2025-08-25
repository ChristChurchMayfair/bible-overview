import { assert, test } from "vitest";
import { extractContentFromHeadingUntilNextHeading } from "../scripts/markdown-parser/study-parser";
import { remark } from "remark";

test("Given content with h3 headings When extracting Questions section Then should not escape h3 headings", () => {
  // Given - Study 3 structure with h3 headings inside Questions section
  const markdown = `# Study 3 - Humanity Begins

## Summary
Some summary content here.

## Questions

* What do you imagine when you think about paradise?

### Read Genesis 2:4-25

* What things does Genesis 2 include in its vision of true human flourishing, of paradise?
    * Provide a big sheet of paper, see how far they get

### God

* How does God relate to us here?
* What does this mean for human flourishing?

## What
Some what content here.`;

  const rm = remark();
  const ast = rm.parse(markdown);
  
  // When - extracting the Questions section
  const questionsContent = extractContentFromHeadingUntilNextHeading(ast.children, "Questions");
  
  // Then - the extracted content should preserve h3 headings properly
  // The content should contain "### Read Genesis 2:4-25" not "\### Read Genesis 2:4-25"
  assert.include(questionsContent, "### Read Genesis 2:4-25", "Should contain unescaped h3 heading");
  assert.notInclude(questionsContent, "\\### Read Genesis 2:4-25", "Should not contain escaped h3 heading");
  
  // Should also contain the God section heading
  assert.include(questionsContent, "### God", "Should contain God section heading");
});