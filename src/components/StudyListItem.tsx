import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { bookOutline, checkmarkCircleOutline } from "ionicons/icons";
import { getFirstPassageFromStudy } from "../data/studies";
import { FullStudy, isFullStudy, Study } from "../data/types";
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

  const showLink = isFullStudy(study)

  return (
    <IonItem
      id={`study-${study.index}`}
      className={`ion-padding-left ${isCompleted ? "completed-study" : ""}`}
      routerLink={showLink ? `/study/${study.slug}`: undefined}
      disabled={!showLink}
      lines="inset"
      detail
    >
      <IonIcon 
        icon={isCompleted ? checkmarkCircleOutline : bookOutline} 
        color="primary"
        style={{ marginRight: '16px', fontSize: '24px' }}
      />
      <IonLabel className="ion-text-wrap">
        <h2>{study.title}</h2>
      </IonLabel>
      <IonNote slot={"end"}>{firstPassage}</IonNote>
    </IonItem>
  );
};

export default StudyListItem;
