import { DefaultApi } from "@christchurchmayfair/crossway-esv-api-client";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
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
} from "../components/localStorageKeys";
import "./ViewStudy.css";

function BiblePassage() {
  const [passage, setPassage] = useState<string>();
  const [passageReference, setPassageReference] = useState<string>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const params = useParams<{ passage: string }>();

  const [showLeadersNotes, setShowLeadersNotes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );

  useIonViewWillEnter(() => {
    setPassageReference(params.passage);
    const crossway = new DefaultApi(undefined, "/esv");
    crossway.v3PassageHtmlGet({ q: params.passage }).then((response) => {
      setPassage(response.data.passages![0]);
      console.log(response.data.passages![0]);
    });
  });

  return (
    <IonPage id="view-study-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="ios"
              text="Study"
              defaultHref="/"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{passageReference}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {passage ? (
          <IonText className="ion-padding" mode="ios">
            <div
              dangerouslySetInnerHTML={{
                __html: passage,
              }}
            ></div>
          </IonText>
        ) : (
          <div
            className="ion-text-center ion-padding"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonSpinner name="crescent" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default BiblePassage;
