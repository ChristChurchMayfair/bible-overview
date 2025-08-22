import { Heading, List, Root, RootContent } from "mdast";
import { toMarkdown } from "mdast-util-to-markdown";
import { remark } from "remark";
import {
  FullStudy,
  MarkdownString,
  Question,
  QuestionSection,
  QuestionSectionBlock,
  Study,
  StudyStub,
} from "../../src/data/types";
import { extractText, isHeading, isText } from "./ast-utils";
import { detectVerseReferences, detectVerseReferencesWithOriginal } from "./verse-reference-detector";

export function containsHeading(
  children: RootContent[],
  value: string,
  depth: number
): boolean {
  const asdf = children
    .filter(isHeading)
    .filter((heading) => heading.depth === depth)
    .map((heading) => heading.children.find((c) => isText(c)).value)
    .find((h) => h === value);
  return asdf === value;
}

export function parseIdealStudy(mdast: Root): Study {
  const studyNumber = extractStudyNumberFromRootContent(mdast.children);
  const title = extractTitleFromRootContent(mdast.children);
  const summary = extractSummaryFromRootContent(mdast.children);

  if (
    containsHeading(mdast.children, "Introduction", 2) &&
    containsHeading(mdast.children, "What", 2) &&
    containsHeading(mdast.children, "So What", 2) &&
    containsHeading(mdast.children, "Questions", 2)
  ) {
    const leadersNotes = extractLeadersNotesFromRootContent(mdast.children);
    const leadersWhat = extractLeadersWhatFromRootContent(mdast.children);
    const leadersSoWhat = extractLeadersSoWhatFromRootContent(mdast.children);
    const questions = extractQuestionsFromRootContentDirect(mdast.children);

    const study: FullStudy = {
      index: studyNumber,
      slug: `study-${studyNumber}`, // TODO: Make this configurable
      title: title,
      summary: summary,
      leadersInfo: {
        notes: leadersNotes,
        what: leadersWhat,
        soWhat: leadersSoWhat,
      },
      questions: questions,
    };

    return study;
  } else {
    const studyStub: StudyStub = {
      index: studyNumber,
      slug: `study-${studyNumber}`, // TODO: Make this configurable
      title: title,
      summary: summary,
    };
    return studyStub;
  }
}

export function extractStudyNumberFromRootContent(
  children: RootContent[]
): number {
  const firstChild = children.find((child) => true);
  if (firstChild === undefined) {
    throw new Error(
      "Study document is empty - expected at least one child element"
    );
  }
  if (!isHeading(firstChild)) {
    throw new Error(
      `Study document must start with a heading, got ${firstChild.type}`
    );
  }
  return extractStudyNumberFromHeading(firstChild);
}

export function extractTitleFromRootContent(children: RootContent[]): string {
  const firstChild = children.find((child) => true);
  if (firstChild === undefined) {
    throw new Error(
      "Study document is empty - expected at least one child element"
    );
  }
  if (!isHeading(firstChild)) {
    throw new Error(
      `Study document must start with a heading, got ${firstChild.type}`
    );
  }
  return extractTitleFromHeading(firstChild);
}

export function extractStudyNumberFromHeading(heading: Heading): number {
  if (heading.depth !== 1) {
    throw new Error(
      `Study title must be an h1 heading (depth 1), got depth ${heading.depth}`
    );
  }
  if (heading.children.length != 1) {
    throw new Error(
      `Study title heading must have exactly one child, got ${heading.children.length} children`
    );
  }
  const firstChild = heading.children.find((child) => true);
  if (firstChild === undefined) {
    throw new Error("Study title heading has no children");
  }
  if (!isText(firstChild)) {
    throw new Error(
      `Study title heading must contain text, got ${firstChild.type}`
    );
  }
  if (!firstChild.value.startsWith("Study ")) {
    throw new Error(
      `Study title must start with "Study ", got "${firstChild.value}"`
    );
  }
  var index: number;
  try {
    index = parseInt(firstChild.value.replace("Study ", ""));
    if (isNaN(index)) {
      throw new Error(
        `Study number must be a valid integer, got "${firstChild.value.replace(
          "Study ",
          ""
        )}"`
      );
    }
    return index;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Study number must be")
    ) {
      throw error;
    }
    throw new Error(
      `Failed to parse study number from "${firstChild.value}": ${error}`
    );
  }
}

export function extractTitleFromHeading(heading: Heading): string {
  if (heading.depth !== 1) {
    throw new Error(
      `Study title must be an h1 heading (depth 1), got depth ${heading.depth}`
    );
  }
  if (heading.children.length != 1) {
    throw new Error(
      `Study title heading must have exactly one child, got ${heading.children.length} children`
    );
  }
  const firstChild = heading.children.find((child) => true);
  if (firstChild === undefined) {
    throw new Error("Study title heading has no children");
  }
  if (!isText(firstChild)) {
    throw new Error(
      `Study title heading must contain text, got ${firstChild.type}`
    );
  }
  if (!firstChild.value.startsWith("Study ")) {
    throw new Error(
      `Study title must start with "Study ", got "${firstChild.value}"`
    );
  }

  // Return the full heading text as the title
  if (firstChild.value.includes(" - ")) {
    return firstChild.value.split(" - ")[1];
  }
  return firstChild.value;
}

export function extractSummaryFromRootContent(
  children: RootContent[]
): MarkdownString {
  return extractContentFromHeadingUntilNextHeading(children, "Summary");
}

export function extractLeadersNotesFromRootContent(
  children: RootContent[]
): MarkdownString {
  return extractContentFromHeadingUntilNextHeading(children, "Introduction");
}

export function extractLeadersWhatFromRootContent(
  children: RootContent[]
): MarkdownString {
  return extractContentFromHeadingUntilNextHeading(children, "What");
}

export function extractLeadersSoWhatFromRootContent(
  children: RootContent[]
): MarkdownString {
  return extractContentFromHeadingUntilNextHeading(children, "So What");
}

export function extractQuestionsFromRootContent(
  children: RootContent[]
): MarkdownString {
  return extractContentFromHeadingUntilNextHeading(children, "Questions");
}

export function extractQuestionsFromRootContentDirect(
  children: RootContent[]
): QuestionSectionBlock[] {
  // Extract AST nodes directly to avoid markdown round-trip conversion
  const sectionContent = extractAstContentFromHeadingUntilNextHeading(
    children,
    "Questions"
  );
  return parseQuestionsFromAstNodes(sectionContent);
}

export function parseQuestionsFromAstNodes(
  astNodes: RootContent[]
): QuestionSectionBlock[] {
  const blocks: QuestionSectionBlock[] = [];
  let currentSection: QuestionSection | null = null;

  for (const child of astNodes) {
    if (isHeading(child) && child.depth === 3) {
      // Save any current section before starting a new one
      if (currentSection && currentSection.questions.length > 0) {
        blocks.push(currentSection);
      }

      const headingText = extractText(child);
      currentSection = {
        title: headingText,
        passages: extractPassagesFromHeading(headingText),
        questions: [],
      };
    } else if (child.type === "list") {
      // Handle list items
      if (!currentSection) {
        // Create implicit Introduction section for orphaned lists
        currentSection = {
          title: "Introduction",
          passages: [],
          questions: [],
        };
      }

      // Parse questions from list
      const questions = parseQuestionsFromList(child, currentSection.passages);
      currentSection.questions.push(...questions);
    } else {
      // Handle any other content (paragraphs, etc.) as markdown strings
      // But first, save any completed section
      if (currentSection && currentSection.questions.length > 0) {
        blocks.push(currentSection);
        currentSection = null;
      }

      const contentMarkdown = toMarkdown({
        type: "root",
        children: [child],
      }).trim();

      if (contentMarkdown) {
        blocks.push(contentMarkdown);
      }
    }
  }

  // Don't forget the last section if it has questions
  if (currentSection && currentSection.questions.length > 0) {
    blocks.push(currentSection);
  }

  return blocks;
}

export function parseQuestionsFromMarkdown(
  questionsMarkdown: MarkdownString
): QuestionSectionBlock[] {
  if (!questionsMarkdown.trim()) {
    return [];
  }

  const rm = remark();
  const questionsAst = rm.parse(questionsMarkdown);

  const blocks: QuestionSectionBlock[] = [];
  let currentSection: QuestionSection | null = null;

  for (const child of questionsAst.children) {
    if (isHeading(child) && child.depth === 3) {
      // Save any current section before starting a new one
      if (currentSection && currentSection.questions.length > 0) {
        blocks.push(currentSection);
      }

      const headingText = extractText(child);
      currentSection = {
        title: headingText,
        passages: extractPassagesFromHeading(headingText),
        questions: [],
      };
    } else if (child.type === "list") {
      // Handle list items
      if (!currentSection) {
        // Create implicit Introduction section for orphaned lists
        currentSection = {
          title: "Introduction",
          passages: [],
          questions: [],
        };
      }

      // Parse questions from list
      const questions = parseQuestionsFromList(child, currentSection.passages);
      currentSection.questions.push(...questions);
    } else {
      // Handle any other content (paragraphs, etc.) as markdown strings
      const contentMarkdown = toMarkdown({
        type: "root",
        children: [child],
      }).trim();

      if (contentMarkdown) {
        blocks.push(contentMarkdown);
      }
    }
  }

  // Don't forget the last section if it has questions
  if (currentSection && currentSection.questions.length > 0) {
    blocks.push(currentSection);
  }

  return blocks;
}

export function extractPassagesFromHeading(headingText: string): string[] {
  // Extract passages from headings like "Read Ephesians 1:9-14" or "Genesis 1:1-3:3, 1 John 1:2"
  // Parse Bible references from the text using regex pattern matching
  const passages = parseBibleReferencesFromText(headingText);
  return passages;
}

function parseBibleReferencesFromText(text: string): string[] {
  // List of known Bible book names (both full names and common abbreviations)
  const bibleBooks = [
    // Old Testament
    "Genesis",
    "Gen",
    "Exodus",
    "Ex",
    "Exod",
    "Leviticus",
    "Lev",
    "Numbers",
    "Num",
    "Deuteronomy",
    "Deut",
    "Joshua",
    "Josh",
    "Judges",
    "Judg",
    "Ruth",
    "Samuel",
    "Sam",
    "1 Samuel",
    "2 Samuel",
    "1 Sam",
    "2 Sam",
    "Kings",
    "1 Kings",
    "2 Kings",
    "1 Kgs",
    "2 Kgs",
    "Chronicles",
    "Chr",
    "1 Chronicles",
    "2 Chronicles",
    "1 Chr",
    "2 Chr",
    "Ezra",
    "Nehemiah",
    "Neh",
    "Esther",
    "Est",
    "Job",
    "Psalms",
    "Ps",
    "Psalm",
    "Proverbs",
    "Prov",
    "Ecclesiastes",
    "Eccl",
    "Song of Songs",
    "Song",
    "Isaiah",
    "Isa",
    "Jeremiah",
    "Jer",
    "Lamentations",
    "Lam",
    "Ezekiel",
    "Ezek",
    "Daniel",
    "Dan",
    "Hosea",
    "Hos",
    "Joel",
    "Amos",
    "Obadiah",
    "Obad",
    "Jonah",
    "Micah",
    "Mic",
    "Nahum",
    "Nah",
    "Habakkuk",
    "Hab",
    "Zephaniah",
    "Zeph",
    "Haggai",
    "Hag",
    "Zechariah",
    "Zech",
    "Malachi",
    "Mal",
    // New Testament
    "Matthew",
    "Matt",
    "Mt",
    "Mark",
    "Mk",
    "Luke",
    "Lk",
    "John",
    "Jn",
    "Acts",
    "Romans",
    "Rom",
    "Corinthians",
    "Cor",
    "1 Corinthians",
    "2 Corinthians",
    "1 Cor",
    "2 Cor",
    "Galatians",
    "Gal",
    "Ephesians",
    "Eph",
    "Philippians",
    "Phil",
    "Colossians",
    "Col",
    "Thessalonians",
    "Thess",
    "1 Thessalonians",
    "2 Thessalonians",
    "1 Thess",
    "2 Thess",
    "Timothy",
    "Tim",
    "1 Timothy",
    "2 Timothy",
    "1 Tim",
    "2 Tim",
    "Titus",
    "Tit",
    "Philemon",
    "Phlm",
    "Hebrews",
    "Heb",
    "James",
    "Jas",
    "Peter",
    "Pet",
    "1 Peter",
    "2 Peter",
    "1 Pet",
    "2 Pet",
    "John",
    "1 John",
    "2 John",
    "3 John",
    "1 Jn",
    "2 Jn",
    "3 Jn",
    "Jude",
    "Revelation",
    "Rev",
  ];

  // Create a pattern that matches any of the Bible books followed by chapter:verse
  const bookPattern = bibleBooks
    .map((book) => book.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const bibleRefPattern = new RegExp(
    `((?:\\d+\\s+)?(?:${bookPattern})\\s+\\d+:\\d+(?:-\\d+(?::\\d+)?)?)`,
    "gi"
  );

  const matches = text.match(bibleRefPattern);
  if (!matches) return [];

  // Clean up matches
  return matches
    .map((match) => match.trim())
    .filter((match) => match.length > 0);
}

function parseQuestionsFromList(list: List, sectionPassages: string[]): Question[] {
  const questions: Question[] = [];

  for (const listItem of list.children) {
    if (listItem.type === "listItem") {
      const questionText = extractQuestionFromListItem(listItem);
      const leadersHint = extractLeadersHintFromListItem(listItem);

      if (questionText) {
        // Detect verse references in the question text
        const detectedRefs = detectVerseReferences(questionText, sectionPassages);
        const detectedRefsWithOriginal = detectVerseReferencesWithOriginal(questionText, sectionPassages);
        
        questions.push({
          question: questionText,
          refs: detectedRefs,
          detectedRefs: detectedRefsWithOriginal,
          leadersHint: leadersHint,
        });
      }
    }
  }

  return questions;
}

function extractQuestionFromListItem(listItem: any): string {
  // Get the first paragraph's text as the question
  const firstParagraph = listItem.children.find(
    (child: any) => child.type === "paragraph"
  );
  if (firstParagraph) {
    return extractText(firstParagraph);
  }
  return "";
}

function extractLeadersHintFromListItem(listItem: any): string {
  // Look for nested list items as leaders hints
  const nestedList = listItem.children.find(
    (child: any) => child.type === "list"
  );
  if (nestedList && nestedList.children.length > 0) {
    const firstNestedItem = nestedList.children[0];
    const nestedParagraph = firstNestedItem.children.find(
      (child: any) => child.type === "paragraph"
    );
    if (nestedParagraph) {
      return extractText(nestedParagraph);
    }
  }
  return "";
}

export function extractContentFromHeadingUntilNextHeading(
  children: RootContent[],
  headingText: string,
  headingDepth: number = 2
): MarkdownString {
  const sectionContent = extractAstContentFromHeadingUntilNextHeading(
    children,
    headingText,
    headingDepth
  );
  const sectionRoot = {
    type: "root" as const,
    children: sectionContent,
  };
  return toMarkdown(sectionRoot).trim();
}

export function extractAstContentFromHeadingUntilNextHeading(
  children: RootContent[],
  headingText: string,
  headingDepth: number = 2
): RootContent[] {
  const startHeadingIndex = children.findIndex((child) => {
    if (!isHeading(child)) return false;
    if (child.depth !== headingDepth) return false;
    if (child.children.length !== 1) return false;
    const firstChild = child.children[0];
    if (!isText(firstChild)) return false;
    return firstChild.value === headingText;
  });

  if (startHeadingIndex === -1) {
    throw new Error(
      `Could not find "${headingText}" heading (h${headingDepth})`
    );
  }

  const nextHeadingIndex = children.findIndex((child, index) => {
    if (index <= startHeadingIndex) return false;
    if (!isHeading(child)) return false;
    return child.depth <= headingDepth;
  });

  return nextHeadingIndex === -1
    ? children.slice(startHeadingIndex + 1)
    : children.slice(startHeadingIndex + 1, nextHeadingIndex);
}
