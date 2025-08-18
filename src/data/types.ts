export type MarkdownString = string

export type Study = {
    index: number
    slug: string
    title: string
    summary: MarkdownString
    leadersInfo: {
        notes: MarkdownString
        what: MarkdownString
        soWhat: MarkdownString
    }
    questions: QuestionSectionBlock[]
}

export type QuestionSection = {
    title: string
    passages: string[]
    questions: Question[]
}

export type QuestionSectionBlock = QuestionSection | MarkdownString

export type Question = {
    question: string
    refs: string[]
    leadersHint: string
}

// Type guard functions
export function isQuestionSection(block: QuestionSectionBlock): block is QuestionSection {
    return typeof block === 'object' && 'questions' in block;
}

export function isMarkdownString(block: QuestionSectionBlock): block is MarkdownString {
    return typeof block === 'string';
}

