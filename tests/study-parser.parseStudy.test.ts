import { readFileSync } from "fs";
import { remark } from "remark";
import { expect, test } from "vitest";
import { parseStudy } from "../scripts/markdown-parser/study-parser";
import { FullStudy, isFullStudy } from "../src/data/types";

function parseMarkdownFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const rm = remark();
  return rm.parse(content);
}

test("Given complete study markdown When parsing study Then returns complete Study object", () => {
  // Given
  const mdast = parseMarkdownFile("./tests/resources/test-study.md");

  // When
  const result = parseStudy(mdast);

  // Then
  // Should be a FullStudy
  expect(isFullStudy(result)).toBe(true);
  if (!isFullStudy(result)) return;

  // Basic structure
  expect(result.index).toBe(1);
  expect(result.slug).toBe("study-1");
  
  // Title should extract from heading
  expect(result.title).toBe("Test Study");
  
  // Summary section
  expect(typeof result.summary).toBe("string");
  expect(result.summary).toContain("test summary for the study");
  expect(result.summary).toContain("**should be preserved**");

  // Leaders info sections
  expect(typeof result.leadersInfo.notes).toBe("string");
  expect(result.leadersInfo.notes).toContain("Test introduction content");

  expect(typeof result.leadersInfo.what).toBe("string");
  expect(result.leadersInfo.what).toContain("testing");

  expect(typeof result.leadersInfo.soWhat).toBe("string");
  expect(result.leadersInfo.soWhat).toContain("write good tests");

  // Questions structure
  expect(Array.isArray(result.questions)).toBe(true);
  expect(result.questions.length).toBe(3); // Introduction + 2 scripture sections (table content is within Ephesians section)
  
  // Introduction questions
  const introSection = result.questions.find(section => typeof section === 'object' && section.title === "Introduction");
  expect(introSection).toBeDefined();
  expect(typeof introSection).toBe('object');
  if (typeof introSection === 'object') {
    expect(introSection.content.length).toBe(1);
    expect(typeof introSection.content[0]).toBe('object');
    if (typeof introSection.content[0] === 'object') {
      expect(introSection.content[0].question).toBe('What is your favorite testing framework?');
      expect(introSection.content[0].leadersHint).toBe("This is a hint for the leader");
      expect(introSection.content[0].refs).toEqual([]);
    }
    expect(introSection.passages).toEqual([]);
  }
  
  // Ephesians section with Bible reference extraction
  const ephesiansSection = result.questions.find(section => typeof section === 'object' && section.title === "Read Ephesians 1:3-14");
  expect(ephesiansSection).toBeDefined();
  expect(typeof ephesiansSection).toBe('object');
  if (typeof ephesiansSection === 'object' && 'content' in ephesiansSection) {
    const questionCount = ephesiansSection.content.filter(item => typeof item === 'object').length;
    expect(questionCount).toBe(3); // 3 questions in this section
    expect(ephesiansSection.passages).toEqual(["Ephesians 1:3-14"]); // Should extract the Bible reference
    
    // Should contain the table markdown as strings within the content
    const markdownStrings = ephesiansSection.content.filter(item => typeof item === 'string');
    expect(markdownStrings.length).toBe(2); // Two markdown strings
    expect(markdownStrings.some(str => str.includes('Tables and other content'))).toBe(true);
    expect(markdownStrings.some(str => str.includes('| Column A | Column B |'))).toBe(true);
  }
  
  // Romans section
  const romansSection = result.questions.find(section => typeof section === 'object' && section.title === "Read Romans 8:28-30");
  expect(romansSection).toBeDefined();
  expect(typeof romansSection).toBe('object');
  if (typeof romansSection === 'object' && 'content' in romansSection) {
    const questionCount = romansSection.content.filter(item => typeof item === 'object').length;
    expect(questionCount).toBe(2); // 2 questions in this section
    expect(romansSection.passages).toEqual(["Romans 8:28-30"]); // Should extract the Bible reference
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
  const result = parseStudy(mdast);

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
  const result = parseStudy(mdast);

  // Then
  expect(result.index).toBe(2);
  expect(result.title).toBe("Study 2");
});