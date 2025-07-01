import { DefaultApi } from "@christchurchmayfair/crossway-esv-api-client";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { volumeMedium } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  Showleaders_notesStorageKey,
} from "../constants/storage";
import { getPassagesFromStudy, getStudy } from "../data/studies";
import "./BiblePassage.css";

function BiblePassage() {
  const [passage, setPassage] = useState<string>();
  const [passageReference, setPassageReference] = useState<string>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const params = useParams<{ slug: string; index: string }>();

  const [showleaders_notes, setShowleaders_notes] = useLocalStorage<boolean>(
    Showleaders_notesStorageKey,
    false
  );

  useIonViewWillEnter(() => {
    const study = getStudy(params.slug);
    if (!study) return;

    const passages = getPassagesFromStudy(study);
    const passageIndex = parseInt(params.index) - 1;
    const passageRef = passages[passageIndex];

    if (passageRef) {
      setPassageReference(passageRef);
      const crossway = new DefaultApi(
        undefined,
        "https://study.christchurchmayfair.org/esv"
      );

      crossway
        .v3PassageHtmlGet({
          q: passageRef,
          includeAudioLink: false,
          includeCrossrefs: false,
          includeFootnotes: false,
          includeHeadings: false,
        })
        .then((response) => {
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
              defaultHref={`/study/${params.slug}`}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{passageReference}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              mode="ios"
              href={`/study/${params.slug}/audio/1`}
              routerDirection="back"
            >
              <IonIcon icon={volumeMedium} />
            </IonButton>
          </IonButtons>
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
