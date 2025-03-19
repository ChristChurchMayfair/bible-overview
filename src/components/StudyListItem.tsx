import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { Study } from "../data/studies";
import "./StudyListItem.css";
import { addCircle, checkmarkCircle } from "ionicons/icons";

interface StudyListItemProps {
  study: Study;
  totalNumberOfStudies: number;
}

const StudyListItem: React.FC<StudyListItemProps> = ({
  study,
  totalNumberOfStudies,
}) => {
  return (
    <IonItem
      id="study-list-item"
      routerLink={`/study/${study.index}`}
      detail={true}
      lines="full"
    >
      <IonLabel className="ion-text-wrap" slot={"start"}>
        <h2>
          {study.title}
        </h2>
      </IonLabel>
      <IonLabel slot={"end"}>
        {study.passages[0]}
      </IonLabel>
    </IonItem>
  );
};

export default StudyListItem;
