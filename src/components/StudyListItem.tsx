import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
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
import { Study } from "../data/studies";
import "./StudyListItem.css";

interface StudyListItemProps {
  study: Study;
  totalNumberOfStudies: number;
  isCompleted: boolean;
}

const StudyListItem: React.FC<StudyListItemProps> = ({
  study,
  totalNumberOfStudies,
  isCompleted,
}) => {
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      analytics: analytics,
      globe: globe,
      alert: alert,
      ribbon: ribbon,
      "hand-left": handLeft,
      book: book,
      warning: warning,
      "shield-checkmark": shieldCheckmark,
      refresh: refresh,
      crown: person,
      "trending-up": trendingUp,
      construct: construct,
      flame: flame,
      moon: moon,
      exit: exit,
      "heart-circle": heartCircle,
      paw: paw,
      person: person,
      cross: person,
      sunny: sunny,
      hourglass: hourglass,
      "checkmark-done": checkmarkDone,
      cloud: cloud,
      home: home,
    };
    return iconMap[iconName] || globe; // fallback to globe if icon not found
  };

  return (
    <IonItem
      id={`study-${study.index}`}
      className={`ion-padding-left ${isCompleted ? "completed-study" : ""}`}
      routerLink={`/study/${study.slug}`}
      lines="inset"
      detail
    >
      <IonIcon icon={getIcon(study.icon)} slot="start" />
      <IonLabel className="ion-text-wrap">
        <h2>{study.title}</h2>
      </IonLabel>
      <IonNote slot={"end"}>{study.passages[0]}</IonNote>
    </IonItem>
  );
};

export default StudyListItem;
