import "../utils/array";
import { studies, themeData } from "./data";
import { Study } from "./types";

export const getThemes = () => Object.keys(themeData);

export const getTheme = (theme: string) => themeData[theme];

export const getStudies = () => studies;

export const getStudy = (slug: string) => {
  const study = studies.find((s) => s.slug === slug);
  if (!study) {
    console.error(`Study not found for slug: ${slug}`);
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
  return study.questions.filter(
    (section) =>
      section.section !== "Introduction" && section.section !== "Application"
  ).map((section) =>  section.section)
};

/**
 * Gets the first passage reference from a study's question sections.
 * @param study The study to get the first passage from
 * @returns The first passage reference, or undefined if none found
 */
export const getFirstPassageFromStudy = (study: Study): string | undefined => {
  return getPassagesFromStudy(study).first();
};
