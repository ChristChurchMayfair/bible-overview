import * as fs from 'fs';
import * as path from 'path';

const files = fs.readdirSync("./content/studies")

files.forEach((file) => {
    const filePath = path.join("./content/studies", file);
    const data = fs.readFileSync(filePath, 'utf-8')
    const study = JSON.parse(data);
    console.log(`Processing study: ${study.slug}`);
    study.questions = questionObjectToArray(study.questions);
    fs.writeFileSync(filePath, JSON.stringify(study, null, 2));
    console.log(`Updated questions for study: ${study.slug}`);
})

type Question = { question: string; answer?: string };
type questionsBySection = { [key: string]: Question[] };
type QuestionSection = {section: string, questions: Question[]};

function questionObjectToArray(questionsBySection: { [key: string]: { question: string; answer?: string }[] }): QuestionSection[] {
    return Object.entries(questionsBySection).map(([section, questions]) => ({section: section, questions: questions}))
}