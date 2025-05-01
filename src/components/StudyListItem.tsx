import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { Study } from "../data/studies";
import StudyIcon from "./StudyIcon";
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
  return (
    <IonItem
      id={`study-${study.index}`}
      className={`ion-padding-left ${isCompleted ? "completed-study" : ""}`}
      routerLink={`/study/${study.slug}`}
      lines="inset"
      detail
    >
      <StudyIcon iconName={study.icon} />
      <IonLabel className="ion-text-wrap">
        <h2>{study.title}</h2>
      </IonLabel>
      <IonNote slot={"end"}>{study.passages[0]}</IonNote>
    </IonItem>
  );
};

export default StudyListItem;
