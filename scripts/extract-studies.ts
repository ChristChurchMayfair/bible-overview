import { google, drive_v3, docs_v1 } from 'googleapis';
import { JWT } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Study, QuestionSection, TimelineEntry, Resource } from '../src/data/types';

dotenv.config();

interface GoogleDocContent {
  title: string;
  content: string;
}

class StudyExtractor {
  private drive: drive_v3.Drive;
  private docs: docs_v1.Docs;
  private auth: JWT;

  constructor() {
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
    if (!keyPath || !fs.existsSync(keyPath)) {
      throw new Error('Google service account key file not found. Check GOOGLE_SERVICE_ACCOUNT_KEY_PATH in .env');
    }

    const keyFile = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    
    this.auth = new JWT({
      email: keyFile.client_email,
      key: keyFile.private_key,
      scopes: [
        'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/documents.readonly'
      ]
    });

    this.drive = google.drive({ version: 'v3', auth: this.auth });
    this.docs = google.docs({ version: 'v1', auth: this.auth });
  }

  async getDocumentsFromFolder(folderId: string): Promise<{ id: string; name: string }[]> {
    try {
      console.log(`Searching folder ID: ${folderId}`);
      
      // First, try to get folder info to verify access
      try {
        const folderInfo = await this.drive.files.get({
          fileId: folderId,
          fields: 'id, name, permissions',
          supportsAllDrives: true
        });
        console.log('Folder info:', folderInfo.data);
      } catch (folderError) {
        console.error('Cannot access folder:', folderError);
        console.log('This suggests the service account lacks permission to access this folder');
      }

      // First, let's see all files in the folder
      const allFilesResponse = await this.drive.files.list({
        q: `'${folderId}' in parents`,
        fields: 'files(id, name, mimeType, parents)',
        supportsAllDrives: true
      });
      
      console.log('All files in folder (first check):', JSON.stringify(allFilesResponse.data, null, 2));
      
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and (mimeType='application/vnd.google-apps.document' or mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document')`,
        fields: 'files(id, name, mimeType, parents)',
        supportsAllDrives: true
      });

      console.log('API Response data:', JSON.stringify(response.data, null, 2));

      if (!response.data.files || response.data.files.length === 0) {
        console.log('No documents found. Trying broader search...');
        
        // Try without mimeType filter to see if there are any files
        const broadResponse = await this.drive.files.list({
          q: `'${folderId}' in parents`,
          fields: 'files(id, name, mimeType)',
          supportsAllDrives: true
        });
        
        console.log('All files in folder:', JSON.stringify(broadResponse.data, null, 2));
      }

      return (response.data.files || []).map(file => ({
        id: file.id || '',
        name: file.name || ''
      }));
    } catch (error) {
      console.error('Error fetching documents from folder:', error);
      throw error;
    }
  }

  async getDocumentContent(docId: string): Promise<GoogleDocContent> {
    try {
      const response = await this.docs.documents.get({
        documentId: docId
      });

      const doc = response.data;
      const title = doc.title || 'Untitled';
      
      // Extract text content from the document
      const content = this.extractTextFromDocument(doc);
      
      return { title, content };
    } catch (error) {
      console.error(`Error fetching document ${docId}:`, error);
      throw error;
    }
  }

  private extractTextFromDocument(doc: any): string {
    let content = '';
    
    if (doc.body && doc.body.content) {
      for (const element of doc.body.content) {
        if (element.paragraph) {
          for (const textElement of element.paragraph.elements || []) {
            if (textElement.textRun) {
              content += textElement.textRun.content;
            }
          }
        }
      }
    }
    
    return content;
  }

  parseStudyFromContent(title: string, content: string, index: number): Study {
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Extract study title from the first line if it follows the pattern "Study X: [passages]"
    let studyTitle = title;
    let passages = '';
    
    const firstLine = lines[0];
    if (firstLine && firstLine.startsWith('**Study')) {
      const match = firstLine.match(/\*\*Study \d+:\s*([^*]+)\*\*/);
      if (match) {
        passages = match[1].trim();
        // Use original document title as study title, but clean it up
        studyTitle = title.replace(/^.*\|\s*/, '').replace(/\s*Study \d+.*$/, '').trim();
      }
    }
    
    // Create a slug from the title
    const slug = studyTitle.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Initialize study with defaults
    const study: Study = {
      index,
      title: studyTitle,
      slug,
      icon: 'book-outline' as any, // Default icon
      overview: '',
      themes: [],
      patterns: [],
      promises: [],
      progressions: [],
      key_application: '',
      prayer_points: [],
      questions: []
    };

    // Parse sections based on headers
    let currentSection = '';
    let currentContent: string[] = [];
    let inQuestionsSection = false;
    
    for (const line of lines) {
      // Check if line is a header
      if (this.isHeader(line)) {
        // Process previous section
        if (currentSection && currentContent.length > 0) {
          this.processSection(study, currentSection, currentContent, inQuestionsSection);
        }
        
        currentSection = this.normalizeHeader(line);
        currentContent = [];
        inQuestionsSection = currentSection === 'questions';
      } else {
        currentContent.push(line);
      }
    }
    
    // Process final section
    if (currentSection && currentContent.length > 0) {
      this.processSection(study, currentSection, currentContent, inQuestionsSection);
    }

    return study;
  }

  private isHeader(line: string): boolean {
    // Check for markdown bold headers like **Summary (see App)**
    if (line.startsWith('**') && line.endsWith('**')) {
      return true;
    }
    
    // Check for Bible passage headers like **Read Ephesians 1:9-14**
    if (line.startsWith('**Read ') && line.endsWith('**')) {
      return true;
    }
    
    return line.startsWith('#') || 
           (line === line.toUpperCase() && line.length > 3 && line.length < 50) ||
           line.endsWith(':');
  }

  private normalizeHeader(line: string): string {
    return line.replace(/^\*\*/, '').replace(/\*\*$/, '').replace(/^#+\s*/, '').replace(/:$/, '').replace(/\s*\(see App\)/, '').toLowerCase().trim();
  }

  private processSection(study: Study, section: string, content: string[], inQuestionsSection: boolean = false): void {
    const text = content.join('\n').trim();
    
    // Skip empty sections
    if (!text) return;
    
    switch (section) {
      case 'summary':
      case 'overview':
        study.overview = text;
        break;
      
      case 'introduction':
        // Could store as separate field or combine with overview
        if (study.overview) {
          study.overview += '\n\n' + text;
        } else {
          study.overview = text;
        }
        break;
      
      case 'application':
        study.key_application = text;
        break;
      
      case 'what':
      case 'so what':
        // These seem to be summary/application points - could add to key_application
        if (study.key_application) {
          study.key_application += '\n\n' + text;
        } else {
          study.key_application = text;
        }
        break;
      
      case 'questions':
        study.questions = this.parseQuestionsSection(content);
        break;
      
      default:
        // Handle Bible passage headers like "read ephesians 1:9-14"
        if (section.startsWith('read ') || this.isPassageReference(section)) {
          // This indicates a new question section for a specific passage
          if (inQuestionsSection) {
            const passageQuestions = this.parseQuestionList(content);
            if (passageQuestions.length > 0) {
              study.questions.push({
                section: section.replace('read ', ''),
                questions: passageQuestions
              });
            }
          }
        }
        break;
    }
  }

  private parseListItems(content: string[]): string[] {
    return content
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(item => item.length > 0);
  }

  private parseQuestionsSection(content: string[]): QuestionSection[] {
    const sections: QuestionSection[] = [];
    let currentSection = 'General';
    let currentQuestions: string[] = [];
    let i = 0;
    
    while (i < content.length) {
      const line = content[i].trim();
      
      // Check if this line is a passage header like "**Read Ephesians 1:9-14**"
      if (line.startsWith('**Read ') && line.endsWith('**')) {
        // Save previous section if it has questions
        if (currentQuestions.length > 0) {
          sections.push({
            section: currentSection,
            questions: currentQuestions.map(q => ({ question: q }))
          });
        }
        
        // Start new section
        currentSection = line.replace(/^\*\*Read /, '').replace(/\*\*$/, '');
        currentQuestions = [];
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        // This is a question
        let question = line.replace(/^[*-]\s*/, '').trim();
        
        // Check if there are sub-bullets (indicated by brackets)
        if (question.includes('[') && i + 1 < content.length) {
          const nextLine = content[i + 1];
          if (nextLine.includes('[') && nextLine.includes(']')) {
            question += ' ' + nextLine.trim();
            i++; // Skip the next line since we've processed it
          }
        }
        
        currentQuestions.push(question);
      } else if (line.length > 0 && !line.startsWith('**')) {
        // Regular text that might be a question without bullet points
        currentQuestions.push(line);
      }
      
      i++;
    }
    
    // Add final section if it has questions
    if (currentQuestions.length > 0) {
      sections.push({
        section: currentSection,
        questions: currentQuestions.map(q => ({ question: q }))
      });
    }
    
    return sections;
  }

  private parseQuestionList(content: string[]): { question: string }[] {
    return content
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(q => q.length > 0)
      .map(question => ({ question }));
  }

  private isPassageReference(text: string): boolean {
    // Simple heuristic: contains book names and chapter:verse patterns
    const bibleBookPattern = /\b(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Songs|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation)\b/i;
    const chapterVersePattern = /\d+:\d+/;
    
    return bibleBookPattern.test(text) && chapterVersePattern.test(text);
  }

  async extractAllStudies(): Promise<Study[]> {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      throw new Error('GOOGLE_DRIVE_FOLDER_ID not set in .env file');
    }

    console.log('Fetching documents from Google Drive folder...');
    const documents = await this.getDocumentsFromFolder(folderId);
    console.log(`Found ${documents.length} documents`);

    const studies: Study[] = [];
    
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      console.log(`Processing document ${i + 1}/${documents.length}: ${doc.name}`);
      
      try {
        const { title, content } = await this.getDocumentContent(doc.id);
        const study = this.parseStudyFromContent(title, content, i + 1);
        studies.push(study);
        console.log(`✓ Extracted study: ${study.title}`);
      } catch (error) {
        console.error(`✗ Failed to process document ${doc.name}:`, error);
      }
    }

    return studies;
  }

  async saveStudies(studies: Study[]): Promise<void> {
    const contentDir = path.join(process.cwd(), 'content', 'studies');
    
    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    for (const study of studies) {
      const filePath = path.join(contentDir, `${study.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(study, null, 2));
      console.log(`Saved study: ${filePath}`);
    }
  }
}

async function main() {
  try {
    const extractor = new StudyExtractor();
    
    // Test basic Drive API access first
    console.log('Testing basic Google Drive API access...');
    try {
      const testResponse = await extractor['drive'].files.list({
        q: 'sharedWithMe=true',
        pageSize: 10,
        fields: 'files(id, name, mimeType, parents)',
        supportsAllDrives: true
      });
      console.log('✓ Google Drive API access works!');
      console.log('Files shared with service account:', JSON.stringify(testResponse.data, null, 2));
      
      // Also try searching for documents specifically (Google Docs and Word docs)
      const docsResponse = await extractor['drive'].files.list({
        q: "mimeType='application/vnd.google-apps.document' or mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'",
        pageSize: 10,
        fields: 'files(id, name, mimeType, parents)',
        supportsAllDrives: true
      });
      console.log('Documents accessible to service account:', JSON.stringify(docsResponse.data, null, 2));
      
    } catch (testError) {
      console.error('✗ Basic Google Drive API access failed:', testError);
      return;
    }
    
    const studies = await extractor.extractAllStudies();
    
    console.log(`\nExtracted ${studies.length} studies`);
    
    if (studies.length > 0) {
      await extractor.saveStudies(studies);
      console.log('\n✓ All studies saved successfully!');
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
