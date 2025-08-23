export type MarkdownString = string;

export type FullStudy = {
  index: number;
  slug: string;
  title: string;
  summary: MarkdownString;
  leadersInfo: {
    notes: MarkdownString;
    what: MarkdownString;
    soWhat: MarkdownString;
  };
  questions: QuestionSectionBlock[];
};

export type StudyStub = Pick<FullStudy, "index" | "slug" | "title" | "summary">;

export type QuestionSection = {
  title: string;
  passages: string[];
  content: (Question | MarkdownString)[];
};

export type QuestionSectionBlock = QuestionSection | MarkdownString;

export type VerseReferenceWithOriginal = {
  originalText: string;
  resolvedRef: string;
};

export type Question = {
  question: string;
  refs: string[];
  detectedRefs?: VerseReferenceWithOriginal[];
  leadersHint: string;
};

export type Study = FullStudy | StudyStub

export type ScheduleEntry = {
  weekStarting: string;
  studyNumber?: number;
  notes?: string;
};

// Type guard functions
export function isQuestionSection(
  block: QuestionSectionBlock
): block is QuestionSection {
  return typeof block === "object" && "content" in block;
}

export function isQuestion(
  item: Question | MarkdownString
): item is Question {
  return typeof item === "object" && "question" in item;
}

export function isMarkdownContent(
  item: Question | MarkdownString
): item is MarkdownString {
  return typeof item === "string";
}

export function isMarkdownString(
  block: QuestionSectionBlock
): block is MarkdownString {
  return typeof block === "string";
}

export function isFullStudy(study: Study): study is FullStudy {
  return (
    typeof study === "object" &&
    "index" in study &&
    "summary" in study &&
    "leadersInfo" in study
  );
}

export function isStudyStub(study: Study): study is StudyStub {
  return (
    typeof study === "object" &&
    "index" in study &&
    "summary" in study &&
    !("leadersInfo" in study)
  );
}
