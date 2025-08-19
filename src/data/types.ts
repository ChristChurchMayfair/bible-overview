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
  questions: Question[];
};

export type QuestionSectionBlock = QuestionSection | MarkdownString;

export type Question = {
  question: string;
  refs: string[];
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
  return typeof block === "object" && "questions" in block;
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
