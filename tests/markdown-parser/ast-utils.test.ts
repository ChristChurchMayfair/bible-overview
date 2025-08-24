import { describe, test, expect } from 'vitest';
import { extractText, isText, isParent, isHeading } from '../../scripts/markdown-parser/ast-utils';
import { Node, Text, Heading, Paragraph, Strong, Emphasis } from 'mdast';

describe('ast-utils', () => {
  describe('isText', () => {
    test('returns true for text node', () => {
      const textNode: Text = {
        type: 'text',
        value: 'Hello world'
      };
      
      expect(isText(textNode)).toBe(true);
    });

    test('returns false for non-text nodes', () => {
      const headingNode: Heading = {
        type: 'heading',
        depth: 1,
        children: []
      };
      
      const paragraphNode: Paragraph = {
        type: 'paragraph',
        children: []
      };
      
      expect(isText(headingNode)).toBe(false);
      expect(isText(paragraphNode)).toBe(false);
    });
  });

  describe('isParent', () => {
    test('returns true for nodes with children', () => {
      const paragraphNode: Paragraph = {
        type: 'paragraph',
        children: []
      };
      
      const headingNode: Heading = {
        type: 'heading',
        depth: 2,
        children: []
      };
      
      expect(isParent(paragraphNode)).toBe(true);
      expect(isParent(headingNode)).toBe(true);
    });

    test('returns false for text nodes (no children)', () => {
      const textNode: Text = {
        type: 'text',
        value: 'Some text'
      };
      
      expect(isParent(textNode)).toBe(false);
    });
  });

  describe('isHeading', () => {
    test('returns true for heading nodes', () => {
      const heading1: Heading = {
        type: 'heading',
        depth: 1,
        children: []
      };
      
      const heading3: Heading = {
        type: 'heading',
        depth: 3,
        children: []
      };
      
      expect(isHeading(heading1)).toBe(true);
      expect(isHeading(heading3)).toBe(true);
    });

    test('returns false for non-heading nodes', () => {
      const textNode: Text = {
        type: 'text',
        value: 'Not a heading'
      };
      
      const paragraphNode: Paragraph = {
        type: 'paragraph',
        children: []
      };
      
      expect(isHeading(textNode)).toBe(false);
      expect(isHeading(paragraphNode)).toBe(false);
    });
  });

  describe('extractText', () => {
    test('extracts text from simple text node', () => {
      const textNode: Text = {
        type: 'text',
        value: 'Hello world'
      };
      
      expect(extractText(textNode)).toBe('Hello world');
    });

    test('extracts text from paragraph with single text child', () => {
      const paragraphNode: Paragraph = {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'This is a paragraph.'
          }
        ]
      };
      
      expect(extractText(paragraphNode)).toBe('This is a paragraph.');
    });

    test('extracts and concatenates text from paragraph with multiple children', () => {
      const paragraphNode: Paragraph = {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'This is '
          },
          {
            type: 'strong',
            children: [
              {
                type: 'text',
                value: 'bold'
              }
            ]
          },
          {
            type: 'text',
            value: ' text.'
          }
        ]
      };
      
      expect(extractText(paragraphNode)).toBe('This is bold text.');
    });

    test('extracts text from nested emphasis and strong elements', () => {
      const paragraphNode: Paragraph = {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'Normal '
          },
          {
            type: 'emphasis',
            children: [
              {
                type: 'text',
                value: 'italic '
              },
              {
                type: 'strong',
                children: [
                  {
                    type: 'text',
                    value: 'bold-italic'
                  }
                ]
              },
              {
                type: 'text',
                value: ' more-italic'
              }
            ]
          },
          {
            type: 'text',
            value: ' normal.'
          }
        ]
      };
      
      expect(extractText(paragraphNode)).toBe('Normal italic bold-italic more-italic normal.');
    });

    test('extracts text from heading node', () => {
      const headingNode: Heading = {
        type: 'heading',
        depth: 1,
        children: [
          {
            type: 'text',
            value: 'Study 1 - Introduction'
          }
        ]
      };
      
      expect(extractText(headingNode)).toBe('Study 1 - Introduction');
    });

    test('extracts text from heading with formatted text', () => {
      const headingNode: Heading = {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'text',
            value: 'Read '
          },
          {
            type: 'strong',
            children: [
              {
                type: 'text',
                value: 'Genesis 1:1-5'
              }
            ]
          }
        ]
      };
      
      expect(extractText(headingNode)).toBe('Read Genesis 1:1-5');
    });

    test('returns empty string for empty parent node', () => {
      const emptyParagraph: Paragraph = {
        type: 'paragraph',
        children: []
      };
      
      expect(extractText(emptyParagraph)).toBe('');
    });

    test('returns empty string for unknown node types', () => {
      const unknownNode: Node = {
        type: 'unknown' as any
      };
      
      expect(extractText(unknownNode)).toBe('');
    });

    test('handles deeply nested structure', () => {
      const complexNode: Paragraph = {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'Start '
          },
          {
            type: 'strong',
            children: [
              {
                type: 'emphasis',
                children: [
                  {
                    type: 'text',
                    value: 'deeply'
                  }
                ]
              },
              {
                type: 'text',
                value: ' nested'
              }
            ]
          },
          {
            type: 'text',
            value: ' end.'
          }
        ]
      };
      
      expect(extractText(complexNode)).toBe('Start deeply nested end.');
    });

    test('preserves whitespace in concatenated text', () => {
      const nodeWithSpaces: Paragraph = {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: '  Leading spaces'
          },
          {
            type: 'strong',
            children: [
              {
                type: 'text',
                value: 'bold'
              }
            ]
          },
          {
            type: 'text',
            value: '  trailing spaces  '
          }
        ]
      };
      
      expect(extractText(nodeWithSpaces)).toBe('  Leading spacesbold  trailing spaces  ');
    });
  });
});