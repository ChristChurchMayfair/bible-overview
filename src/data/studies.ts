import "../utils/array";
import { studies } from "./data";
import { FullStudy, isFullStudy, isQuestionSection, Study } from "./types";

export const getStudies = () => studies;

export const getStudy = (slug: string): Study | undefined => {
  if (!slug || typeof slug !== "string") {
    throw new Error("Invalid slug provided to getStudy");
  }

  const study = studies.find((s) => s.slug === slug);
  if (!study) {
    console.warn(`Study not found for slug: ${slug}`);
  }
  return study;
};

/**
 * Extracts all passage references from a study's question sections.
 * Skips special sections like "Introduction" and "Application".
 * @param study The study to extract passages from
 * @returns Array of passage references
 */
export const getPassagesFromStudy = (study: Study): string[] => {
  if (isFullStudy(study)) {
    return study.questions
      .filter(isQuestionSection)
      .flatMap((questionSection) => questionSection.passages);
  }
  return [];
};

/**
 * Gets the first passage reference from a study's question sections.
 * @param study The study to get the first passage from
 * @returns The first passage reference, or undefined if none found
 */
export const getFirstPassageFromStudy = (
  study: Study
): string | undefined => {
  return getPassagesFromStudy(study).first();
};
