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
    className="ion-padding-left"
      routerLink={`/study/${study.index}`}
      lines="inset"
      detail
    >
      <IonLabel className="ion-text-wrap">
        <h2>
          {study.title}
        </h2>
      </IonLabel>
      <IonNote slot={"end"}>
        {study.passages[0]}
      </IonNote>
    </IonItem>
  );
};

export default StudyListItem;
