import { Heading, Node, Text, Parent } from "mdast";

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