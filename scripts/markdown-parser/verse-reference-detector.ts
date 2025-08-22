export function detectVerseReferences(
  questionText: string, 
  sectionPassages: string[]
): string[] {
  if (sectionPassages.length === 0) {
    return [];
  }

  const results: string[] = [];
  const processedRanges: Array<{start: number, end: number}> = [];
  
  // Patterns to match verse references (order matters - more specific first)
  const patterns = [
    /vv\. (\d+(?:, \d+)*)/g, // "vv. N, M, O, P" (comma-separated list)
    /verses (\d+)-(\d+)/g,   // "verses N-M"
    /vv\.(\d+)-(\d+)/g,      // "vv.N-M"
    /vv(\d+)-(\d+)/g,        // "vvN-M"
    /verse (\d+)/g,          // "verse N"
    /v\.(\d+)/g,             // "v.N"
    /\bv(\d+)\b/g,           // "vN" (word boundary)
    /\b(\d+)-(\d+)\b/g       // "N-M" (standalone number range)
  ];
  
  // Check each pattern against the question text
  for (const pattern of patterns) {
    // Reset regex state
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(questionText)) !== null) {
      const matchStart = match.index;
      const matchEnd = match.index + match[0].length;
      
      // Check if this match overlaps with any previously processed range
      const overlaps = processedRanges.some(range => 
        (matchStart >= range.start && matchStart < range.end) ||
        (matchEnd > range.start && matchEnd <= range.end) ||
        (matchStart <= range.start && matchEnd >= range.end) ||
        (matchStart >= range.start && matchEnd <= range.end) // subset case
      );
      
      if (overlaps) {
        continue; // Skip this match
      }
      
      // Mark this range as processed
      processedRanges.push({start: matchStart, end: matchEnd});
      
      // Find the best matching passage for this verse reference
      const contextPassage = findBestMatchingPassage(sectionPassages, match);
      
      if (contextPassage) {
        // Parse the passage to extract book and chapter
        // Assume format like "John 3:1-10"
        const passageMatch = contextPassage.match(/^(.*?)(\d+):(\d+)-(\d+)$/);
        if (passageMatch) {
          const [, book, chapter] = passageMatch;
          
          // Check if this is a comma-separated list (first pattern)
          if (match[0].startsWith('vv. ') && match[1].includes(',')) {
            // Handle comma-separated verse list: "vv. 23, 27, 29, 32, 33"
            const verses = match[1].split(', ').map(v => v.trim());
            for (const verse of verses) {
              const resolvedRef = `${book.trim()} ${chapter}:${verse}`;
              results.push(resolvedRef);
            }
          } else if (match[2]) {
            // This is a range pattern with two capture groups
            const startVerse = match[1];
            const endVerse = match[2];
            const resolvedRef = `${book.trim()} ${chapter}:${startVerse}-${endVerse}`;
            results.push(resolvedRef);
          } else {
            // Single verse
            const verseNumber = match[1];
            const resolvedRef = `${book.trim()} ${chapter}:${verseNumber}`;
            results.push(resolvedRef);
          }
        }
      }
    }
  }
  
  return results;
}

function findBestMatchingPassage(passages: string[], match: RegExpExecArray): string | null {
  if (passages.length === 1) {
    return passages[0];
  }
  
  // For multiple passages, try to find which one contains the verse(s)
  const verseNumber = parseInt(match[1]);
  const endVerse = match[2] ? parseInt(match[2]) : verseNumber;
  
  const candidatePassages: string[] = [];
  
  for (const passage of passages) {
    const passageMatch = passage.match(/^(.*?)(\d+):(\d+)-(\d+)$/);
    if (passageMatch) {
      const startVerse = parseInt(passageMatch[3]);
      const passageEndVerse = parseInt(passageMatch[4]);
      
      // Check if the verse(s) fall within this passage's range
      if (verseNumber >= startVerse && verseNumber <= passageEndVerse) {
        candidatePassages.push(passage);
      }
      // For ranges, also check if any part overlaps
      else if (endVerse >= startVerse && verseNumber <= passageEndVerse) {
        candidatePassages.push(passage);
      }
    }
  }
  
  // If exactly one passage contains the verse(s), use it
  if (candidatePassages.length === 1) {
    return candidatePassages[0];
  }
  
  // If ambiguous (0 or multiple matches), return null to ignore
  return null;
}

export type VerseReferenceWithOriginal = {
  originalText: string;
  resolvedRef: string;
};

export function detectVerseReferencesWithOriginal(
  questionText: string, 
  sectionPassages: string[]
): VerseReferenceWithOriginal[] {
  if (sectionPassages.length === 0) {
    return [];
  }

  const results: VerseReferenceWithOriginal[] = [];
  const processedRanges: Array<{start: number, end: number}> = [];
  const seenOriginalTexts = new Set<string>(); // For deduplication
  
  // Patterns to match verse references (order matters - more specific first)
  const patterns = [
    /vv\. (\d+(?:, \d+)*)/g, // "vv. N, M, O, P" (comma-separated list)
    /verses (\d+)-(\d+)/g,   // "verses N-M"
    /vv\.(\d+)-(\d+)/g,      // "vv.N-M"
    /vv(\d+)-(\d+)/g,        // "vvN-M"
    /verse (\d+)/g,          // "verse N"
    /v\.(\d+)/g,             // "v.N"
    /\bv(\d+)\b/g,           // "vN" (word boundary)
    /\b(\d+)-(\d+)\b/g       // "N-M" (standalone number range)
  ];
  
  // Check each pattern against the question text
  for (const pattern of patterns) {
    // Reset regex state
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(questionText)) !== null) {
      const matchStart = match.index;
      const matchEnd = match.index + match[0].length;
      
      // For "verse" and "verses" patterns, extract only the number part
      let originalText = match[0]; // The full matched text
      let adjustedStart = matchStart;
      let adjustedEnd = matchEnd;
      
      if (match[0].startsWith('verse ')) {
        // Extract just the number part for "verse N"
        const numberPart = match[1];
        const numberStart = match.index + match[0].indexOf(numberPart);
        originalText = numberPart;
        adjustedStart = numberStart;
        adjustedEnd = numberStart + numberPart.length;
      } else if (match[0].startsWith('verses ')) {
        // Extract just the number range part for "verses N-M"
        const numberPart = `${match[1]}-${match[2]}`;
        const numberStart = match.index + match[0].indexOf(numberPart);
        originalText = numberPart;
        adjustedStart = numberStart;
        adjustedEnd = numberStart + numberPart.length;
      }
      
      // Check if this match overlaps with any previously processed range
      const overlaps = processedRanges.some(range => 
        (adjustedStart >= range.start && adjustedStart < range.end) ||
        (adjustedEnd > range.start && adjustedEnd <= range.end) ||
        (adjustedStart <= range.start && adjustedEnd >= range.end) ||
        (adjustedStart >= range.start && adjustedEnd <= range.end) // subset case
      );
      
      if (overlaps) {
        continue; // Skip this match
      }
      
      // Skip if we've already processed this exact original text
      if (seenOriginalTexts.has(originalText)) {
        continue;
      }
      
      // Mark this range as processed (use adjusted positions for actual clickable area)
      processedRanges.push({start: adjustedStart, end: adjustedEnd});
      seenOriginalTexts.add(originalText);
      
      // Find the best matching passage for this verse reference
      const contextPassage = findBestMatchingPassage(sectionPassages, match);
      
      if (contextPassage) {
        // Parse the passage to extract book and chapter
        // Assume format like "John 3:1-10"
        const passageMatch = contextPassage.match(/^(.*?)(\d+):(\d+)-(\d+)$/);
        if (passageMatch) {
          const [, book, chapter] = passageMatch;
          
          // Check if this is a comma-separated list (first pattern)
          if (match[0].startsWith('vv. ') && match[1].includes(',')) {
            // Handle comma-separated verse list: "vv. 23, 27, 29, 32, 33"
            const verses = match[1].split(', ').map(v => v.trim());
            for (const verse of verses) {
              const resolvedRef = `${book.trim()} ${chapter}:${verse}`;
              results.push({ originalText, resolvedRef });
            }
          } else if (match[2]) {
            // This is a range pattern with two capture groups
            const startVerse = match[1];
            const endVerse = match[2];
            const resolvedRef = `${book.trim()} ${chapter}:${startVerse}-${endVerse}`;
            results.push({ originalText, resolvedRef });
          } else {
            // Single verse
            const verseNumber = match[1];
            const resolvedRef = `${book.trim()} ${chapter}:${verseNumber}`;
            results.push({ originalText, resolvedRef });
          }
        }
      }
    }
  }
  
  return results;
}