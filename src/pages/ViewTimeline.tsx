import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../constants/storage";
import { getStudy } from "../data/studies";
import { Study } from "../data/types";
import "./ViewTimeline.css";

function ViewTimeline() {
  const [study, setStudy] = useState<Study>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const params = useParams<{ id: string }>();

  const [showleaders_notes, setShowleaders_notes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );

  useIonViewWillEnter(() => {
    const study_ = getStudy(params.id);
    setStudy(study_);
  });

  return (
    <IonPage id="view-study-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="ios"
              text="Studies"
              defaultHref="/"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Study {study?.index}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {study ? (
          <>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle>Study {study.index}</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonRow className="ion-padding-horizontal">
              <IonText>
                <h2>Study {study.index} Timeline</h2>
                <p>
                  Timeline functionality is not available with the new study
                  structure.
                </p>
              </IonText>
            </IonRow>
          </>
        ) : (
          <div>Study not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewTimeline;
