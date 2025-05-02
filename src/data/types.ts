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

export interface Study {
  index: number;
  title: string;
  slug: string;
  icon: string;
  overview: string;
  themes: string[];
  patterns: string[];
  promises: string[];
  progressions: string[];
  keyApplication: string;
  questions: {
    [sectionName: string]: {
      questions: string[];
      answers?: string[]; // Optional answers for leaders
    };
  };
  timeline?: TimelineEntry[];
  prayerPoints?: string[];
  leadersNotes?: string;
  additionalResources?: Resource[];
}
