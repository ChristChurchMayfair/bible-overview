import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { remark } from 'remark';
import { parseIdealStudy } from './markdown-parser/ideal-study-parser';
import { Study } from '../src/data/types';

export interface StudyBuilderOptions {
  studiesDir?: string;
  filePattern?: RegExp;
  sortBy?: 'index' | 'filename';
}

export function buildStudiesFromDirectory(options: StudyBuilderOptions = {}): Study[] {
  const {
    studiesDir = join(process.cwd(), 'studies'),
    filePattern = /\.md$/,
    sortBy = 'index'
  } = options;

  console.log(`📚 Building studies from directory: ${studiesDir}`);
  
  try {
    const files = readdirSync(studiesDir)
      .filter(f => filePattern.test(f))
      .sort();

    console.log(`📄 Found ${files.length} markdown files`);

    const studies: Study[] = [];
    const errors: { file: string; error: Error }[] = [];

    for (const file of files) {
      try {
        console.log(`🔄 Processing: ${file}`);
        
        const filePath = join(studiesDir, file);
        const content = readFileSync(filePath, 'utf-8');
        const mdast = remark().parse(content);
        const study = parseIdealStudy(mdast);
        
        studies.push(study);
        console.log(`✅ Parsed study ${study.index}: ${study.slug}`);
        
      } catch (error) {
        console.error(`❌ Failed to parse ${file}:`, error);
        errors.push({ file, error: error as Error });
      }
    }

    if (errors.length > 0) {
      console.warn(`\n⚠️  ${errors.length} files failed to parse:`);
      errors.forEach(({ file, error }) => {
        console.warn(`   ${file}: ${error.message}`);
      });
    }

    // Sort studies
    const sortedStudies = sortBy === 'index' 
      ? studies.sort((a, b) => a.index - b.index)
      : studies.sort((a, b) => a.slug.localeCompare(b.slug));

    console.log(`\n🎉 Successfully built ${sortedStudies.length} studies`);
    
    // Validate no duplicate indices or slugs
    const indices = sortedStudies.map(s => s.index);
    const slugs = sortedStudies.map(s => s.slug);
    const duplicateIndices = indices.filter((index, i) => indices.indexOf(index) !== i);
    const duplicateSlugs = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
    
    if (duplicateIndices.length > 0) {
      console.warn(`⚠️  Duplicate indices found: ${duplicateIndices.join(', ')}`);
    }
    if (duplicateSlugs.length > 0) {
      console.warn(`⚠️  Duplicate slugs found: ${duplicateSlugs.join(', ')}`);
    }

    return sortedStudies;
    
  } catch (error) {
    console.error(`💥 Failed to read studies directory ${studiesDir}:`, error);
    throw error;
  }
}

export function validateStudy(study: Study): string[] {
  const issues: string[] = [];
  
  if (!study.slug || study.slug.trim() === '') {
    issues.push('Missing or empty slug');
  }
  
  if (!study.index || study.index < 1) {
    issues.push('Invalid index (must be >= 1)');
  }
  
  if (!study.questions || study.questions.length === 0) {
    issues.push('No questions found');
  }
  
  // Check for questions with bible refs
  study.questions.forEach((section, sectionIndex) => {
    section.questions.forEach((question, questionIndex) => {
      if (question.refs && question.refs.length > 0) {
        question.refs.forEach((ref, refIndex) => {
          if (!ref || ref.trim() === '') {
            issues.push(`Empty bible reference in section ${sectionIndex}, question ${questionIndex}, ref ${refIndex}`);
          }
        });
      }
    });
  });
  
  return issues;
}

export function validateStudies(studies: Study[]): { study: Study; issues: string[] }[] {
  return studies
    .map(study => ({ study, issues: validateStudy(study) }))
    .filter(result => result.issues.length > 0);
}