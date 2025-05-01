import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  bookOutline,
  checkmarkCircleOutline,
  exitOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../components/localStorageKeys";
import { Study, getStudy } from "../data/studies";
import "./ViewStudy.css";
import { BaseAPI as CrosswayESV } from "@christchurchmayfair/crossway-esv-api-client/dist/base";
import { b } from "vitest/dist/reporters-5f784f42";
import { DefaultApi } from "@christchurchmayfair/crossway-esv-api-client";

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
        <IonText className="ion-padding" mode="ios">
          <div
            dangerouslySetInnerHTML={{
              __html: passage ?? "Loading...",
            }}
          ></div>
        </IonText>
      </IonContent>
    </IonPage>
  );
}

export default BiblePassage;
