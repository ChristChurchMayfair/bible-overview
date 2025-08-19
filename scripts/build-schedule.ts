#!/usr/bin/env tsx
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { parseScheduleCsv } from "../src/utils/schedule";

interface BuildScheduleOptions {
  outputPath?: string;
  scheduleFile?: string;
  pretty?: boolean;
}

export function buildAndSaveSchedule(options: BuildScheduleOptions = {}): void {
  const {
    outputPath = join(process.cwd(), "src/data/generated-schedule.json"),
    scheduleFile = join(process.cwd(), "studies/schedule.csv"),
    pretty = true,
  } = options;

  console.log("📅 Building schedule from CSV file...\n");

  try {
    // Read CSV file
    console.log(`📖 Reading schedule from: ${scheduleFile}`);
    const csvContent = readFileSync(scheduleFile, "utf-8");

    // Parse CSV to schedule entries
    const schedule = parseScheduleCsv(csvContent);

    if (schedule.length === 0) {
      console.warn("⚠️  No schedule entries were parsed. Check your CSV file format.");
      return;
    }

    // Write JSON file
    console.log(`💾 Writing schedule to: ${outputPath}`);
    const jsonContent = pretty
      ? JSON.stringify(schedule, null, 2)
      : JSON.stringify(schedule);

    writeFileSync(outputPath, jsonContent);

    // Summary
    console.log("\n📊 Schedule Build Summary:");
    console.log(`   📅 Total weeks: ${schedule.length}`);
    console.log(`   📚 Weeks with studies: ${schedule.filter(entry => entry.studyNumber).length}`);
    console.log(`   📝 Weeks without studies: ${schedule.filter(entry => !entry.studyNumber).length}`);
    console.log(`   💾 Output file: ${outputPath}`);
    console.log("\n✨ Schedule build completed successfully!");
  } catch (error) {
    console.error("\n💥 Schedule build failed:", error);
    process.exit(1);
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: BuildScheduleOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--output":
      case "-o":
        options.outputPath = args[++i];
        break;
      case "--schedule-file":
      case "-s":
        options.scheduleFile = args[++i];
        break;
      case "--no-pretty":
        options.pretty = false;
        break;
      case "--help":
      case "-h":
        console.log(`
Usage: tsx scripts/build-schedule.ts [options]

Options:
  -o, --output <path>        Output JSON file path (default: src/data/generated-schedule.json)
  -s, --schedule-file <path> Schedule CSV file path (default: studies/schedule.csv)
  --no-pretty               Minify JSON output
  -h, --help                 Show this help message

Examples:
  tsx scripts/build-schedule.ts
  tsx scripts/build-schedule.ts --output dist/schedule.json
  tsx scripts/build-schedule.ts --schedule-file content/custom-schedule.csv
        `);
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        process.exit(1);
    }
  }

  buildAndSaveSchedule(options);
}