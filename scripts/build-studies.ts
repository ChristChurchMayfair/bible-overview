#!/usr/bin/env tsx
import { writeFileSync } from "fs";
import { join } from "path";
import { isFullStudy } from "../src/data/types";
import { buildStudiesFromDirectory, validateStudies } from "./study-builder";

interface BuildOptions {
  outputPath?: string;
  studiesDir?: string;
  validate?: boolean;
  pretty?: boolean;
}

export function buildAndSaveStudies(options: BuildOptions = {}): void {
  const {
    outputPath = join(process.cwd(), "src/data/generated-studies.json"),
    studiesDir = join(process.cwd(), "studies"),
    validate = true,
    pretty = true,
  } = options;

  console.log("🔨 Building studies from markdown files...\n");

  try {
    // Build studies from markdown files
    const studies = buildStudiesFromDirectory({ studiesDir });

    if (studies.length === 0) {
      console.warn(
        "⚠️  No studies were built. Check your studies directory and file format."
      );
      return;
    }

    // Validation
    if (validate) {
      console.log("\n🔍 Validating studies...");
      const validationResults = validateStudies(studies);

      if (validationResults.length > 0) {
        console.warn(
          `\n⚠️  Found validation issues in ${validationResults.length} studies:`
        );
        validationResults.forEach(({ study, issues }) => {
          console.warn(`\n   📖 ${study.slug} (Study ${study.index}):`);
          issues.forEach((issue) => console.warn(`      • ${issue}`));
        });
        console.warn("\n   Consider fixing these issues before deployment.\n");
      } else {
        console.log("✅ All studies passed validation");
      }
    }

    // Write JSON file
    console.log(`\n💾 Writing studies to: ${outputPath}`);
    const jsonContent = pretty
      ? JSON.stringify(studies, null, 2)
      : JSON.stringify(studies);

    writeFileSync(outputPath, jsonContent);

    // Summary
    console.log("\n📊 Build Summary:");
    console.log(`   📚 Total studies: ${studies.length}`);
    console.log(
      `   📝 Total questions: ${studies
        .filter(isFullStudy)
        .reduce(
          (sum, s) =>
            sum +
            s.questions.reduce(
              (qSum, block) =>
                qSum +
                (typeof block === "object" && "questions" in block
                  ? block.questions.length
                  : 0),
              0
            ),
          0
        )}`
    );
    console.log(
      `   📖 Total question sections: ${studies
        .filter(isFullStudy)
        .reduce(
          (sum, s) =>
            sum +
            s.questions.filter(
              (block) => typeof block === "object" && "questions" in block
            ).length,
          0
        )}`
    );
    console.log(
      `   📝 Total content blocks: ${studies
        .filter(isFullStudy)
        .reduce((sum, s) => sum + s.questions.length, 0)}`
    );
    console.log(`   💾 Output file: ${outputPath}`);
    console.log("\n✨ Studies build completed successfully!");
  } catch (error) {
    console.error("\n💥 Build failed:", error);
    process.exit(1);
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: BuildOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--output":
      case "-o":
        options.outputPath = args[++i];
        break;
      case "--studies-dir":
      case "-s":
        options.studiesDir = args[++i];
        break;
      case "--no-validate":
        options.validate = false;
        break;
      case "--no-pretty":
        options.pretty = false;
        break;
      case "--help":
      case "-h":
        console.log(`
Usage: tsx scripts/build-studies.ts [options]

Options:
  -o, --output <path>      Output JSON file path (default: src/data/generated-studies.json)
  -s, --studies-dir <path> Studies directory path (default: studies/)
  --no-validate           Skip validation checks
  --no-pretty             Minify JSON output
  -h, --help              Show this help message

Examples:
  tsx scripts/build-studies.ts
  tsx scripts/build-studies.ts --output dist/studies.json
  tsx scripts/build-studies.ts --studies-dir content/studies --no-validate
        `);
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        process.exit(1);
    }
  }

  buildAndSaveStudies(options);
}
