import { IonIcon } from "@ionic/react";
import {
  alert,
  analytics,
  book,
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
};

export type IconName =
| "analytics"
| "globe"
| "alert" 
| "ribbon"
| "hand-left"
| "book"
| "warning"
| "shield-checkmark"
| "refresh"
| "crown"
| "trending-up"
| "construct"
| "flame"
| "moon"
| "exit"
| "heart-circle"
| "paw"
| "person"
| "cross"
| "sunny"
| "hourglass"
| "checkmark-done"
| "cloud"
| "home";

const StudyIcon: React.FC<StudyIconProps> = ({ iconName }) => {
  const iconMap: { [key in IconName]: string } = {
    analytics: analytics,
    globe: globe,
    alert: alert,
    ribbon: ribbon,
    "hand-left": handLeft,
    book: book,
    warning: warning,
    "shield-checkmark": shieldCheckmark,
    refresh: refresh,
    crown: person, // Using person as crown isn't available
    "trending-up": trendingUp,
    construct: construct,
    flame: flame,
    moon: moon,
    exit: exit,
    "heart-circle": heartCircle,
    paw: paw,
    person: person,
    cross: person, // Using person as cross isn't available
    sunny: sunny,
    hourglass: hourglass,
    "checkmark-done": checkmarkDone,
    cloud: cloud,
    home: home,
  };

  return <IonIcon icon={iconMap[iconName] || globe} slot="start" />;
};

export default StudyIcon;
