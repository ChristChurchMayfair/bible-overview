import { readFileSync } from "fs";
import { remark } from "remark";
import { expect, test } from "vitest";
import { parseIdealStudy } from "../scripts/markdown-parser/ideal-study-parser";

function parseMarkdownFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const rm = remark();
  return rm.parse(content);
}

test("Given complete ideal study markdown When parsing study Then returns complete Study object", () => {
  // Given
  const mdast = parseMarkdownFile("./studies/1.md");

  // When
  const result = parseIdealStudy(mdast);

  // Then
  // Basic structure
  expect(result.index).toBe(1);
  expect(result.slug).toBe("study-1");
  
  // Title should default to "Study N" when no custom title in heading
  expect(result.title).toBe("History's Direction");
  
  // Summary section
  expect(typeof result.summary).toBe("string");
  expect(result.summary).toContain("The Bible is not a random collection");
  expect(result.summary).toContain("**Ephesians 1** teaches us");
  expect(result.summary).toContain("**Acts 13** teaches us");

  // Leaders info sections
  expect(typeof result.leadersInfo.notes).toBe("string");
  expect(result.leadersInfo.notes).toContain("We are the storytelling animal");

  expect(typeof result.leadersInfo.what).toBe("string");
  expect(result.leadersInfo.what).toContain("God's plan for history");

  expect(typeof result.leadersInfo.soWhat).toBe("string");
  expect(result.leadersInfo.soWhat).toContain("Pray for a heart");

  // Questions structure
  expect(Array.isArray(result.questions)).toBe(true);
  expect(result.questions.length).toBe(3); // Introduction + 2 scripture sections
  
  // Introduction questions
  const introSection = result.questions.find(section => typeof section === 'object' && section.title === "Introduction");
  expect(introSection).toBeDefined();
  expect(typeof introSection).toBe('object');
  if (typeof introSection === 'object') {
    expect(introSection.content.length).toBe(1);
    expect(typeof introSection.content[0]).toBe('object');
    if (typeof introSection.content[0] === 'object') {
      expect(introSection.content[0].question).toBe('What different "stories" do humans tell to make sense of who we are and our place in the world?');
      expect(introSection.content[0].leadersHint).toBe("if they need help: 'for example, what story does evolutionary atheism tell?'");
      expect(introSection.content[0].refs).toEqual([]);
    }
    expect(introSection.passages).toEqual([]);
  }
  
  // Named sections with Bible reference extraction
  const ephesiansSection = result.questions.find((section: any) => typeof section === 'object' && section.title === "Read Ephesians 1:9-14");
  expect(ephesiansSection).toBeDefined();
  expect(typeof ephesiansSection).toBe('object');
  if (typeof ephesiansSection === 'object') {
    const questionCount = ephesiansSection.content.filter((item: any) => typeof item === 'object').length;
    expect(questionCount).toBeGreaterThanOrEqual(5); // Multiple questions in this section
    expect(ephesiansSection.passages).toEqual(["Ephesians 1:9-14"]); // Should extract the Bible reference
  }
  
  const actsSection = result.questions.find((section: any) => typeof section === 'object' && section.title === "Read Acts 13:13-39");
  expect(actsSection).toBeDefined();
  expect(typeof actsSection).toBe('object');
  if (typeof actsSection === 'object') {
    const questionCount = actsSection.content.filter((item: any) => typeof item === 'object').length;
    expect(questionCount).toBeGreaterThanOrEqual(5); // Multiple questions in this section
    expect(actsSection.passages).toEqual(["Acts 13:13-39"]); // Should extract the Bible reference
  }
});

test("Given study with custom title in heading When parsing study Then extracts custom title", () => {
  // Given
  const markdownContent = `# Study 1 - Setting the Scene

## Summary
This is a test summary.

## Introduction
Test introduction content.

## What
Test what content.

## So What
Test so what content.

## Questions
* Test question?
`;
  
  const rm = remark();
  const mdast = rm.parse(markdownContent);

  // When
  const result = parseIdealStudy(mdast);

  // Then
  expect(result.index).toBe(1);
  expect(result.title).toBe("Setting the Scene");
});

test("Given study with only 'Study N' in heading When parsing study Then uses default title", () => {
  // Given
  const markdownContent = `# Study 2

## Summary
This is a test summary.

## Introduction
Test introduction content.

## What
Test what content.

## So What
Test so what content.

## Questions
* Test question?
`;
  
  const rm = remark();
  const mdast = rm.parse(markdownContent);

  // When
  const result = parseIdealStudy(mdast);

  // Then
  expect(result.index).toBe(2);
  expect(result.title).toBe("Study 2");
});