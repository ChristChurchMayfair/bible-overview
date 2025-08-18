import { assert, test } from "vitest";
import { parseIdealStudy } from "../scripts/markdown-parser/ideal-study-parser";
import { remark } from "remark";
import { QuestionSectionBlock, QuestionSection } from "../src/data/types";

test("Given complete study markdown When parsing ideal study Then returns study with QuestionSectionBlock array", () => {
  // Given - a complete study with mixed content in questions section
  const studyMarkdown = `# Study 3 - Humanity Begins

## Summary

Genesis 2 begins the story proper of human history.

## Introduction

This is the introduction content.

## What

Genesis 2 teaches us what humans need to flourish.

## So What

Thank God for his abundant generosity.

## Questions

* What do you imagine when you think about paradise?

### Read Genesis 2:4-25

* What things does Genesis 2 include in its vision of true human flourishing?
    * Provide a big sheet of paper, see how far they get

We will look at it under 4 categories: God, Place, Work, People:

### God

* How does God relate to us here?
* What does this mean for human flourishing?`;

  // When
  const rm = remark();
  const ast = rm.parse(studyMarkdown);
  const result = parseIdealStudy(ast);

  // Then
  assert.equal(result.index, 3, "Should have correct study number");
  assert.equal(result.title, "Humanity Begins", "Should have correct title");
  assert.equal(result.summary.includes("Genesis 2 begins"), true, "Should have correct summary");
  
  // Check that questions is now QuestionSectionBlock[]
  assert.equal(Array.isArray(result.questions), true, "Questions should be an array");
  assert.equal(result.questions.length, 4, "Should have 4 blocks");
  
  // First block: Introduction section
  assert.equal(typeof result.questions[0], 'object', "First block should be Introduction section");
  const introSection = result.questions[0] as QuestionSection;
  assert.equal(introSection.title, "Introduction");
  assert.equal(introSection.questions.length, 1);
  assert.equal(introSection.questions[0].question, "What do you imagine when you think about paradise?");
  
  // Second block: Explanatory text
  assert.equal(typeof result.questions[1], 'string', "Second block should be markdown string");
  assert.equal(result.questions[1], "We will look at it under 4 categories: God, Place, Work, People:");
  
  // Third block: Read Genesis section  
  assert.equal(typeof result.questions[2], 'object', "Third block should be Read Genesis section");
  const genesisSection = result.questions[2] as QuestionSection;
  assert.equal(genesisSection.title, "Read Genesis 2:4-25");
  assert.deepEqual(genesisSection.passages, ["Genesis 2:4-25"]);
  assert.equal(genesisSection.questions.length, 1);
  
  // Fourth block: God section
  assert.equal(typeof result.questions[3], 'object', "Fourth block should be God section");
  const godSection = result.questions[3] as QuestionSection;
  assert.equal(godSection.title, "God");
  assert.equal(godSection.questions.length, 2);
});