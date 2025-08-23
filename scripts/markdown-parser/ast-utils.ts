import { Heading, Node, Text, Parent, Literal, Paragraph, List, ListItem, Break, RootContent, PhrasingContent } from "mdast";

export function extractText(node: Node): string {
  if (isText(node)) {
    return node.value;
  }
  if (isParent(node)) {
    return node.children.map((child) => extractText(child)).join('');
  }
  return '';
}

export function isText(node: Node): node is Text {
  return node.type === "text";
}

export function isParent(node: Node): node is Parent {
  return "children" in node;
}

export function isHeading(node: Node): node is Heading {
  return node.type === "heading";
}

export function isParagraph(node: Node): node is Paragraph {
  return node.type === "paragraph"
}

export function isList(node: Node): node is List {
  return node.type === "list"
}

export function isListItem(node: Node): node is ListItem {
  return node.type === "listitem"
}

export function isBreak(node: Node): node is Break {
  return node.type === "break"
}

export function stripPositionData<T extends Node>(node: T): T {
    const copy = structuredClone(node);
    delete copy.position;
    
    // Recursively strip position from children if it's a parent node
    if (isParent(copy)) {
        copy.children = copy.children.map(child => stripPositionData(child)) as any;
    }
    
    return copy;
}