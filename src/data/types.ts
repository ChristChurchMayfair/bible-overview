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
  prayerPoints: string[];
  questions: {
    [key: string]: {
      questions: string[];
      answers?: string[];
    };
  };
  timeline?: TimelineEntry[];
  leadersNotes?: string;
  additionalResources?: Resource[];
}
