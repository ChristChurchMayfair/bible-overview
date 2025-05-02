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
import { getStudy } from "../data/studies";
import "./BiblePassage.css";

function BiblePassage() {
  const [passage, setPassage] = useState<string>();
  const [passageReference, setPassageReference] = useState<string>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const params = useParams<{ slug: string; index: string }>();

  const [showLeadersNotes, setShowLeadersNotes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );

  useIonViewWillEnter(() => {
    const study = getStudy(params.slug);
    const passageIndex = parseInt(params.index) - 1;
    const passageRef = study?.passages[passageIndex];

    if (passageRef) {
      setPassageReference(passageRef);
      const crossway = new DefaultApi(
        undefined,
        "https://study.christchurchmayfair.org/esv"
      );

      crossway.v3PassageHtmlGet({ q: passageRef }).then((response) => {
        setPassage(response.data.passages![0]);
      });
    }
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
          <IonText mode="ios">
            <div
              className="ion-padding-horizontal passage-text"
              dangerouslySetInnerHTML={{
                __html: passage,
              }}
            />
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
