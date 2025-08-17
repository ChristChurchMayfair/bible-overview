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
  const mdast = parseMarkdownFile("./studies/1.ideal.md");

  // When
  const result = parseIdealStudy(mdast);

  // Then
  // Basic structure
  expect(result.index).toBe(1);
  expect(result.slug).toBe("study-1");
  
  // Summary section
  expect(typeof result.summary).toBe("string");
  expect(result.summary).toContain("The Bible is not a random collection");
  expect(result.summary).toContain("Ephesians 1 teaches us");
  expect(result.summary).toContain("Acts 13 teaches us");

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
  const introSection = result.questions.find(section => section.title === "Introduction");
  expect(introSection).toBeDefined();
  expect(introSection!.questions.length).toBe(1);
  expect(introSection!.questions[0].question).toBe('What different "stories" do humans tell to make sense of who we are and our place in the world?');
  expect(introSection!.questions[0].leadersHint).toBe("if they need help: 'for example, what story does evolutionary atheism tell?'");
  expect(introSection!.questions[0].refs).toEqual([]);
  expect(introSection!.passages).toEqual([]);
  
  // Named sections with Bible reference extraction
  const ephesiansSection = result.questions.find(section => section.title === "Read Ephesians 1:9-14");
  expect(ephesiansSection).toBeDefined();
  expect(ephesiansSection!.questions.length).toBeGreaterThanOrEqual(5); // Multiple questions in this section
  expect(ephesiansSection!.passages).toEqual(["Ephesians 1:9-14"]); // Should extract the Bible reference
  
  const actsSection = result.questions.find(section => section.title === "Read Acts 13:13-39");
  expect(actsSection).toBeDefined();
  expect(actsSection!.questions.length).toBeGreaterThanOrEqual(5); // Multiple questions in this section
  expect(actsSection!.passages).toEqual(["Acts 13:13-39"]); // Should extract the Bible reference
});