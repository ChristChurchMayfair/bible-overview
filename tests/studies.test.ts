import { describe, it, expect, vi, beforeEach } from "vitest";
import { getStudies, getStudy, getPassagesFromStudy, getFirstPassageFromStudy } from "../src/data/studies";

// Mock the data to avoid dependency on actual study files
vi.mock("../src/data/data", () => ({
  studies: [
    {
      slug: "study-1",
      index: 1,
      title: "Test Study 1",
    },
    {
      slug: "study-2", 
      index: 2,
      title: "Test Study 2",
    },
  ],
}));

describe("getStudies", () => {
  it("should return all studies from data", () => {
    const studies = getStudies();
    
    expect(studies).toHaveLength(2);
    expect(studies[0]).toEqual({
      slug: "study-1",
      index: 1,
      title: "Test Study 1",
    });
    expect(studies[1]).toEqual({
      slug: "study-2",
      index: 2,
      title: "Test Study 2",
    });
  });
});

describe("getStudy", () => {
  it("should return study when valid slug provided", () => {
    const study = getStudy("study-1");
    
    expect(study).toEqual({
      slug: "study-1",
      index: 1,
      title: "Test Study 1",
    });
  });

  it("should return undefined when study not found", () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const study = getStudy("non-existent");
    
    expect(study).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith("Study not found for slug: non-existent");
    
    consoleSpy.mockRestore();
  });

  it("should throw error when slug is null", () => {
    expect(() => getStudy(null as any)).toThrow("Invalid slug provided to getStudy");
  });

  it("should throw error when slug is undefined", () => {
    expect(() => getStudy(undefined as any)).toThrow("Invalid slug provided to getStudy");
  });

  it("should throw error when slug is empty string", () => {
    expect(() => getStudy("")).toThrow("Invalid slug provided to getStudy");
  });

  it("should throw error when slug is not a string", () => {
    expect(() => getStudy(123 as any)).toThrow("Invalid slug provided to getStudy");
  });
});

describe("getPassagesFromStudy", () => {
  it("should return passages from FullStudy question sections", () => {
    const fullStudy = {
      slug: "test-study",
      index: 1,
      title: "Test Study",
      questions: [
        {
          title: "Questions 1",
          passages: ["Genesis 1:1-5", "Genesis 1:6-8"],
          content: [
            { question: "What did God create?", refs: [], leadersHint: "" }
          ]
        },
        "Some markdown content",
        {
          title: "Questions 2", 
          passages: ["John 3:16"],
          content: [
            { question: "Who did God love?", refs: [], leadersHint: "" }
          ]
        }
      ],
      summary: "Test summary",
      leadersInfo: {
        notes: "Test notes",
        what: "Test what",
        soWhat: "Test so what"
      }
    };

    const passages = getPassagesFromStudy(fullStudy);
    
    expect(passages).toEqual(["Genesis 1:1-5", "Genesis 1:6-8", "John 3:16"]);
  });

  it("should return empty array for StudyStub", () => {
    const studyStub = {
      slug: "stub-study",
      index: 1,
      title: "Stub Study",
      summary: "Test summary"
    };

    const passages = getPassagesFromStudy(studyStub);
    
    expect(passages).toEqual([]);
  });

  it("should return empty array when no question sections exist", () => {
    const studyWithNoQuestionSections = {
      slug: "test-study",
      index: 1, 
      title: "Test Study",
      questions: [
        "Just markdown content",
        "More markdown"
      ],
      summary: "Test summary",
      leadersInfo: {
        notes: "Test notes",
        what: "Test what",
        soWhat: "Test so what"
      }
    };

    const passages = getPassagesFromStudy(studyWithNoQuestionSections);
    
    expect(passages).toEqual([]);
  });
});

describe("getFirstPassageFromStudy", () => {
  it("should return first passage from FullStudy", () => {
    const fullStudy = {
      slug: "test-study",
      index: 1,
      title: "Test Study",
      questions: [
        {
          title: "Questions 1",
          passages: ["Genesis 1:1-5", "Genesis 1:6-8"],
          content: [
            { question: "What did God create?", refs: [], leadersHint: "" }
          ]
        },
        {
          title: "Questions 2", 
          passages: ["John 3:16"],
          content: [
            { question: "Who did God love?", refs: [], leadersHint: "" }
          ]
        }
      ],
      summary: "Test summary",
      leadersInfo: {
        notes: "Test notes",
        what: "Test what",
        soWhat: "Test so what"
      }
    };

    const firstPassage = getFirstPassageFromStudy(fullStudy);
    
    expect(firstPassage).toBe("Genesis 1:1-5");
  });

  it("should return undefined for StudyStub", () => {
    const studyStub = {
      slug: "stub-study",
      index: 1,
      title: "Stub Study",
      summary: "Test summary"
    };

    const firstPassage = getFirstPassageFromStudy(studyStub);
    
    expect(firstPassage).toBeUndefined();
  });

  it("should return undefined when no passages exist", () => {
    const studyWithNoPassages = {
      slug: "test-study",
      index: 1,
      title: "Test Study", 
      questions: [
        "Just markdown content"
      ],
      summary: "Test summary",
      leadersInfo: {
        notes: "Test notes",
        what: "Test what",
        soWhat: "Test so what"
      }
    };

    const firstPassage = getFirstPassageFromStudy(studyWithNoPassages);
    
    expect(firstPassage).toBeUndefined();
  });
});