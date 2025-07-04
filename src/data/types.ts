import { Icon } from "ionicons/dist/types/components/icon/icon";
import { IconName } from "../components/StudyIcon";

export type BaseTimelineEntry = {
  title: string;
  details: string;
};

export type TimelineEntry = BaseTimelineEntry &
  (
    | {
        date?: number;
        type: "Event";
        subType: "Major" | "Minor";
      }
    | {
        type: "Period";
        duration: "Unknown" | "Infinite" | number;
      }
  );

export type Resource = {
  title: string;
  author: string;
  url: string;
  type: "video" | "audio" | "article" | "book";
};

export type Question = {
  question: string;
  answer?: string;
};
export type QuestionSection = {section: string, questions: Question[]};

export type Study = {
  index: number;
  title: string;
  slug: string;
  icon: IconName;
  overview: string;
  themes: string[];
  patterns: string[];
  promises: string[];
  progressions: string[];
  key_application: string;
  prayer_points: string[];
  questions: QuestionSection[];
  timeline?: TimelineEntry[];
  leaders_notes?: string;
  additional_resources?: Resource[];
};
