import * as fs from 'fs';
import * as path from 'path';

const rawData = fs.readFileSync('src/data/all_studies.json', 'utf-8');
const allStudies = JSON.parse(rawData);

console.log('Loaded all_studies:', allStudies);

allStudies.forEach((study: any) => {
    const fileName = `${study.slug}.json`;
    const filePath = path.join('content/studies', fileName);


    study.questions = interlaceSectionQuestionsAndAnswers(study.questions);
    
    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    
    // Write each study to its own file
    fs.writeFileSync(filePath, JSON.stringify(study, null, 2));
    
    console.log(`Wrote study ${study.id} to ${filePath}`);
    })



function interlaceQuestionsWithAnswers(questions: string[], answers: string[]): {question: string, answer: string}[] {
    const interlaced: any[] = [];
    const maxLength = Math.max(questions?.length ?? 0, answers?.length ?? 0);
    
    for (let i = 0; i < maxLength; i++) {
        const question_and_answer = {question:"", answer: ""};
        if (questions !== undefined && i < questions.length) {
            question_and_answer.question = questions[i];
        }
        if (answers != undefined && i < answers.length) {
            question_and_answer.answer = answers[i];
        }
        interlaced.push(question_and_answer);
    }
    
    return interlaced;
}

function interlaceSectionQuestionsAndAnswers(sections: {[section: string]: {questions: string[], answers: string[]}}): {[section: string]: {question: string, answer: string}[]} {
    const result: any = {};
    
    for (const section in sections) {
        if (sections.hasOwnProperty(section)) {
            const { questions: qs, answers: ans } = sections[section];
            result[section] = interlaceQuestionsWithAnswers(qs, ans);
        }
    }
    
    return result;
}