import { IonIcon } from "@ionic/react";
import {
  alert,
  analytics,
  bookOutline,
  checkmarkDone,
  cloud,
  construct,
  exit,
  flame,
  globe,
  handLeft,
  heartCircle,
  home,
  hourglass,
  moon,
  paw,
  person,
  refresh,
  ribbon,
  shieldCheckmark,
  sunny,
  trendingUp,
  warning,
} from "ionicons/icons";

type StudyIconProps = {
  iconName: IconName;
  color?: string; // Optional color prop for customization
};

export type IconName =
  | "analytics"
  | "globe"
  | "alert"
  | "ribbon"
  | "handLeft"
  | "book"
  | "warning"
  | "shield-checkmark"
  | "refresh"
  | "crown"
  | "trendingUp"
  | "construct"
  | "flame"
  | "moon"
  | "exit"
  | "heartCircle"
  | "paw"
  | "person"
  | "cross"
  | "sunny"
  | "hourglass"
  | "checkmark-done"
  | "cloud"
  | "home";

const StudyIcon: React.FC<StudyIconProps> = ({ iconName, color }) => {
  const iconMap: { [key in IconName]: string } = {
    analytics: analytics,
    globe: globe,
    alert: alert,
    ribbon: ribbon,
    handLeft: handLeft,
    book: bookOutline,
    warning: warning,
    "shield-checkmark": shieldCheckmark,
    refresh: refresh,
    crown: person, // Using person as crown isn't available
    trendingUp: trendingUp,
    construct: construct,
    flame: flame,
    moon: moon,
    exit: exit,
    heartCircle: heartCircle,
    paw: paw,
    person: person,
    cross: person, // Using person as cross isn't available
    sunny: sunny,
    hourglass: hourglass,
    "checkmark-done": checkmarkDone,
    cloud: cloud,
    home: home,
  };
  return (
    <IonIcon icon={iconMap[iconName] || globe} slot="start" color={color} />
  );
};

export default StudyIcon;
