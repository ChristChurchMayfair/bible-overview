import {
  Heading,
  List,
  ListItem,
  Node,
  Paragraph,
  Root,
  Text,
  RootContent,
} from "mdast";
import {
  extractText,
  filterChildren,
  isBreak,
  isHeading,
  isList,
  isParagraph,
  isText,
  mapChildren,
  mapText,
  reduceChildren,
  stripPositionData,
} from "./ast-utils";

type Section = "Summary" | "Questions" | "Introduction" | "What" | "So What";

export function processMarkdownAST(root: Root) {
  const studyBuilder = new StudyBuilder();

  // var currentPosition: Stack<Section | string | null>

  var currentSection: Section | undefined = undefined;

  for (const node of root.children) {
    if (isHeading(node)) {
      if (isStudyTitle(node)) {
        studyBuilder.processMainTitle(node);
      } else {
        currentSection = getSection(node);
        if (currentSection === undefined) {
          console.log("unknown section: ", extractText(node));
        }
      }
    } else if (isParagraph(node)) {
      if (isStudyHeader(node)) {
        // Drop
      } else if (currentSection !== undefined) {
        studyBuilder.addParagraphToSection(currentSection, node);
      } else {
        console.log("paragraph:", extractText(node));
      }
    } else if (isList(node)) {
      if (currentSection !== undefined) {
        studyBuilder.addListToSection(currentSection, node);
      }
    } else {
      console.log(extractText(node));
    }
  }
  return studyBuilder;
}

export class StudyBuilder {
  studyNumber: number;
  studyTitle: string;

  sections: { [section in Section]: RootContent[] } = {} as {
    [section in Section]: RootContent[];
  };

  processMainTitle(heading: Heading) {
    this.studyTitle = extractText(heading);
    // TODO - extract number and passages using regex probably.
  }

  addParagraphToSection(section: Section, paragraph: Paragraph) {
    if (this.sections[section] === undefined) {
      this.sections[section] = [];
    }
    this.sections[section].push(stripPositionData(paragraph));
  }

  addListToSection(section: Section, list: List) {
    if (this.sections[section] === undefined) {
      this.sections[section] = [];
    }
    this.sections[section].push(stripPositionData(list));
  }

  createStudy() {
    return this.studyTitle;
  }
}

export function isStudyTitle(heading: Heading): boolean {
  return heading.depth === 1 && extractText(heading).startsWith("Study");
}

export function isSummary(heading: Heading): boolean {
  return heading.depth === 1 && extractText(heading).startsWith("Summary");
}

export function getSection(heading: Heading): Section | undefined {
  const text = extractText(heading);
  if (text.startsWith("Summary")) {
    return "Summary";
  }
  if (text.startsWith("Questions")) {
    return "Questions";
  }
  if (text.startsWith("Introduction")) {
    return "Introduction";
  }
  if (text.startsWith("What")) {
    return "What";
  }
  if (text.startsWith("So What")) {
    return "So What";
  }
  return undefined;
}

export function isStudyHeader(paragraph: Paragraph) {
  return extractText(paragraph) === "Discipleship Groups 2025-26 | His-story";
}

// Regex for Bible references - handles books, chapters, verses, and ranges
const BIBLE_REFERENCE_REGEX =
  /\b(?:(?:1|2|3)\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s+\d+(?::\d+(?:-\d+)?)?(?:\s*-\s*\d+(?::\d+)?)?/g;

export function containsBibleReference(heading: Heading): boolean {
  const text = extractText(heading);
  return BIBLE_REFERENCE_REGEX.test(text);
}

export function isSummaryParagraph(node: Node): boolean {
  if (!isParagraph(node)) {
    return false;
  }
  return (
    extractText(node.children[0]).startsWith("Study") &&
    isBreak(node.children[1]) &&
    extractText(node.children[2]).startsWith("Summary") &&
    isBreak(node.children[3])
  );
}

export function isIntroductionParagraph(node: Node): boolean {
  if (!isParagraph(node)) {
    return false;
  }
  return (
    extractText(node.children[0]).startsWith("Introduction") &&
    isBreak(node.children[1])
  );
}

export function dropHeader(doc: Root): Root {
  return filterChildren(
    doc,
    (c) => !extractText(c).startsWith("Discipleship Groups 2025-26 | His-story")
  );
}

export function extractStudyNumber(doc: Root): number | undefined {
  const firstPara = doc.children[0];
  if (!isSummaryParagraph(firstPara)) {
    return undefined;
  }

  const text = extractText(firstPara);
  const match = text.match(/Study (\d+):/);
  if (match) {
    return parseInt(match[1], 10);
  }

  return undefined;
}

export function extractSummaryParagraphHeadings(
  para: Paragraph
): [Heading, Heading, Paragraph] {
  const mainHeading: Heading = {
    type: "heading",
    children: [{ type: "text", value: extractText(para.children[0]) }],
    depth: 1,
  };
  const secondHeading: Heading = {
    type: "heading",
    children: [{ type: "text", value: extractText(para.children[2]) }],
    depth: 2,
  };
  const newPara = filterChildren(para, (_, index) => index > 3);
  return [mainHeading, secondHeading, newPara];
}

export function extractIntroductionParagraphHeadings(
  para: Paragraph
): [Heading, Paragraph] {
  const introductionHeading: Heading = {
    type: "heading",
    children: [{ type: "text", value: extractText(para.children[0]) }],
    depth: 2,
  };
  const newPara = filterChildren(para, (_, index) => index > 1);
  return [introductionHeading, newPara];
}

export function fixSummaryParagraph(doc: Root): Root {
  return reduceChildren(doc, (acc, current) => {
    if (isSummaryParagraph(current)) {
      const firstPara = current as Paragraph;
      acc.push(...extractSummaryParagraphHeadings(firstPara));
    } else {
      acc.push(current);
    }
    return acc;
  });
}

export function fixIntroductionParagraph(doc: Root): Root {
  return reduceChildren(doc, (acc, current) => {
    if (isIntroductionParagraph(current)) {
      const firstPara = current as Paragraph;
      acc.push(...extractIntroductionParagraphHeadings(firstPara));
    } else {
      acc.push(current);
    }
    return acc;
  });
}

export function replaceBullet(text: Text): Text {
  return mapText(text, (t) => t.replace("∙ ", ""));
}

export function fixBulletsInParagraph(para: Paragraph): RootContent[] {
  const result: RootContent[] = [];
  let currentParagraph: Paragraph = {
    type: "paragraph",
    children: [],
  };
  
  let currentList: List = {
    type: "list",
    children: [],
    ordered: false,
    spread: false,
  };
  
  let inList = false;
  let currentListItemText: Text[] = [];

  for (let i = 0; i < para.children.length; i++) {
    const child = para.children[i];
    
    if (isText(child) && isBulleted(child.value)) {
      // Start of a bullet point
      if (!inList) {
        // Finish current paragraph and start list
        if (currentParagraph.children.length > 0) {
          result.push(currentParagraph);
          currentParagraph = { type: "paragraph", children: [] };
        }
        inList = true;
      } else {
        // Finish previous list item
        if (currentListItemText.length > 0) {
          currentList.children.push({
            type: "listItem",
            spread: false,
            children: [{ 
              type: "paragraph",
              children: currentListItemText,
            }],
          });
        }
        currentListItemText = [];
      }
      
      // Add bullet content without the bullet symbol
      currentListItemText.push(replaceBullet(child));
      
    } else if (isBreak(child)) {
      // Skip breaks that come after bullets - they will be handled by markdown conversion
      if (inList && i > 0 && isText(para.children[i-1]) && isBulleted((para.children[i-1] as Text).value)) {
        continue;
      } else if (inList) {
        // Skip breaks within list items for compact format
        continue;
      } else {
        // Check if next child is a bullet - if so, skip this break to avoid escaping
        if (i + 1 < para.children.length && isText(para.children[i+1]) && isBulleted((para.children[i+1] as Text).value)) {
          continue;
        }
        // Break in regular paragraph
        currentParagraph.children.push(child);
      }
    } else {
      // Regular content
      if (inList) {
        if (isText(child)) {
          currentListItemText.push(child);
        }
      } else {
        currentParagraph.children.push(child);
      }
    }
  }
  
  // Finish up
  if (inList) {
    if (currentListItemText.length > 0) {
      currentList.children.push({
        type: "listItem",
        spread: false,
        children: [{
          type: "paragraph", 
          children: currentListItemText,
        }],
      });
    }
    if (currentList.children.length > 0) {
      result.push(currentList);
    }
  } else if (currentParagraph.children.length > 0) {
    result.push(currentParagraph);
  }
  
  return result;
}

export function isBulleted(input: string): boolean {
  return input.startsWith("∙ ");
}

export function fixBullets(doc: Root): Root {
  return reduceChildren(doc, (acc, c) => {
    if (isParagraph(c)) {
      acc.push(...fixBulletsInParagraph(c as Paragraph));
    } else {
      acc.push(c);
    }
    return acc;
  });
}

export function fixAll(doc: Root): Root {
  return fixIntroductionParagraph(fixSummaryParagraph(dropHeader(doc)));
}
