import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { getFirstPassageFromStudy } from "../data/studies";
import { Study } from "../data/types";
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
  const firstPassage = getFirstPassageFromStudy(study);

  return (
    <IonItem
      id={`study-${study.index}`}
      className={`ion-padding-left ${isCompleted ? "completed-study" : ""}`}
      routerLink={`/study/${study.slug}`}
      lines="inset"
      detail
    >
      <StudyIcon iconName="book" color={isCompleted ? "medium" : "primary"}/>
      <IonLabel className="ion-text-wrap">
        <h2>{study.title}</h2>
      </IonLabel>
      <IonNote slot={"end"}>{firstPassage}</IonNote>
    </IonItem>
  );
};

export default StudyListItem;
