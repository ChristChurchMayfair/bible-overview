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
    questions: QuestionSection[]
}

export type QuestionSection = {
    title: string
    passages: string[]
    questions: Question[]
}

export type Question = {
    question: string
    refs: string[]
    leadersHint: string
}

