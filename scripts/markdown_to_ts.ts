import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { remark } from "remark";
import { stripPositionData } from "./markdown-parser/ast-utils";
import { fixAll, processMarkdownAST } from "./markdown-parser/study-parser";

import { toMarkdown } from "mdast-util-to-markdown";

function readFileToString(filePath: string): string {
  return readFileSync(filePath, "utf-8");
}

function parse(markdown: string) {
  return rm.parse(markdown);
}

const rm = remark();
const studiesDir = join(process.cwd(), "studies");

const mdFiles = readdirSync(studiesDir)
  .filter((file) => file.endsWith(".orig.md"))
  .map((name) => join(studiesDir, name));

console.log(mdFiles);
const asdf = mdFiles
  .map((mdFile) => readFileToString(mdFile))
  .map((mdString) => parse(mdString))
  .map((mdast) => processMarkdownAST(mdast));

console.log(JSON.stringify(asdf, null, 2));

const string = readFileToString(mdFiles[0]);
const mdast = parse(string);
const withoutPositionalData = stripPositionData(mdast);

writeFileSync("ast.json", JSON.stringify(withoutPositionalData, null, 2));
writeFileSync("asd.md", toMarkdown(fixAll(mdast)));

const ideal = readFileToString("./studies/1.ideal.md")
const idealMdast = parse(ideal)
const idealNoPosData = stripPositionData(idealMdast)
writeFileSync("ideal.mdast.json", JSON.stringify(idealNoPosData))