import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { Study } from "../data/studies";
import "./StudyListItem.css";

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
      detail={false}
    >
      {/* <IonIcon
        className="completed"
        name="checkmark-circle"
        size="large"
        color="primary"
      /> */}
      <IonLabel className="ion-text-wrap">
        <h1>
          {study.title}
          <span className="index">
            <IonNote>
              {study.index}/{totalNumberOfStudies}
            </IonNote>
          </span>
        </h1>
      </IonLabel>
    </IonItem>
  );
};

export default StudyListItem;
