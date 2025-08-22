import { describe, it, expect } from 'vitest';
import { detectVerseReferences, detectVerseReferencesWithOriginal } from '../scripts/markdown-parser/verse-reference-detector';

describe('detectVerseReferences', () => {
  it('should detect simple verse reference with single passage context', () => {
    const questionText = "What does verse 5 tell us about God's love?";
    const sectionPassages = ["John 3:1-10"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["John 3:5"]);
  });

  it('should detect different verse number with same passage context', () => {
    const questionText = "Look at verse 8 and consider the implications.";
    const sectionPassages = ["John 3:1-10"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["John 3:8"]);
  });

  it('should detect v.N format', () => {
    const questionText = "According to v.3, what can we learn?";
    const sectionPassages = ["Romans 8:1-15"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Romans 8:3"]);
  });

  it('should detect vN format (no dot)', () => {
    const questionText = "Read v7 carefully and reflect.";
    const sectionPassages = ["Matthew 5:1-12"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Matthew 5:7"]);
  });

  it('should detect verses N-M range format', () => {
    const questionText = "Compare verses 3-5 with the previous section.";
    const sectionPassages = ["John 1:1-18"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["John 1:3-5"]);
  });

  it('should detect vv.N-M range format', () => {
    const questionText = "Study vv.7-9 and their connection to the theme.";
    const sectionPassages = ["Ephesians 2:1-22"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Ephesians 2:7-9"]);
  });

  it('should detect vvN-M range format (no dot)', () => {
    const questionText = "Examine vv12-14 closely for the main argument.";
    const sectionPassages = ["Romans 3:1-31"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Romans 3:12-14"]);
  });

  it('should detect verse outside passage range but in same chapter', () => {
    const questionText = "Compare this with verse 16 in the same chapter.";
    const sectionPassages = ["John 3:1-10"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["John 3:16"]);
  });

  it('should detect verse range extending outside passage range', () => {
    const questionText = "Look at verses 8-12 for the complete thought.";
    const sectionPassages = ["Matthew 5:1-10"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Matthew 5:8-12"]);
  });

  it('should resolve verse with multiple passages when unambiguous', () => {
    const questionText = "What does verse 8 teach us?";
    const sectionPassages = ["John 3:1-5", "Romans 5:6-12"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Romans 5:8"]);
  });

  it('should ignore ambiguous verse with multiple passages', () => {
    const questionText = "Consider verse 3 in this context.";
    const sectionPassages = ["John 3:1-10", "Romans 5:1-10"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual([]);
  });

  it('should detect comma-separated verse list format', () => {
    const questionText = "Look at vv. 23, 27, 29, 32, 33.";
    const sectionPassages = ["Acts 13:20-40"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Acts 13:23", "Acts 13:27", "Acts 13:29", "Acts 13:32", "Acts 13:33"]);
  });

  it('should detect standalone number range format', () => {
    const questionText = "What is at the climax of the history of God's people in 26-31?";
    const sectionPassages = ["Acts 13:13-39"];
    
    const result = detectVerseReferences(questionText, sectionPassages);
    
    expect(result).toEqual(["Acts 13:26-31"]);
  });

  it('should return original text with resolved references', () => {
    const questionText = "What does verse 5 tell us about God's love?";
    const sectionPassages = ["John 3:1-10"];
    
    const result = detectVerseReferencesWithOriginal(questionText, sectionPassages);
    
    expect(result).toEqual([
      { originalText: "5", resolvedRef: "John 3:5" }
    ]);
  });

  it('should deduplicate identical original text references', () => {
    const questionText = "Compare verse 5 with verse 5 again to see the pattern.";
    const sectionPassages = ["John 3:1-10"];
    
    const result = detectVerseReferencesWithOriginal(questionText, sectionPassages);
    
    expect(result).toEqual([
      { originalText: "5", resolvedRef: "John 3:5" }
    ]);
    expect(result).toHaveLength(1); // Should only have one result due to deduplication
  });

  it('should exclude "verse" and "verses" words from original text but include v/vv prefixes', () => {
    const questionText = "Compare verse 5, verses 7-9, v.12, and vv.15-17.";
    const sectionPassages = ["John 3:1-20"];
    
    const result = detectVerseReferencesWithOriginal(questionText, sectionPassages);
    
    // Sort by position in text to get consistent ordering
    const sortedResult = result.sort((a, b) => {
      const aPos = questionText.indexOf(a.originalText);
      const bPos = questionText.indexOf(b.originalText);
      return aPos - bPos;
    });
    
    expect(sortedResult).toEqual([
      { originalText: "5", resolvedRef: "John 3:5" },
      { originalText: "7-9", resolvedRef: "John 3:7-9" },
      { originalText: "v.12", resolvedRef: "John 3:12" },
      { originalText: "vv.15-17", resolvedRef: "John 3:15-17" }
    ]);
  });
});