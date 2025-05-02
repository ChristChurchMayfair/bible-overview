import { DefaultApi } from "@christchurchmayfair/crossway-esv-api-client";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { play } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { getStudy } from "../data/studies";
import "./AudioPassage.css";

function AudioPassage() {
  const [passageReference, setPassageReference] = useState<string>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const params = useParams<{ slug: string; index: string }>();

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

      crossway
        .v3PassageAudioGet({ q: passageRef })
        .then((response) => {
          if (
            response.data &&
            typeof response.data === "object" &&
            "audioUrl" in response.data
          ) {
            console.log("Audio URL:", response.data.audioUrl);
            setAudioUrl(response.data.audioUrl as string);
          }
        })
        .catch((error) => {
          console.error("Error fetching audio URL:", error);
        });
    }
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <IonPage id="audio-passage-page">
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
        {audioUrl ? (
          <IonList>
            <IonItem>
              <IonLabel>{passageReference}</IonLabel>
              <IonIcon
                icon={play}
                color="primary"
                onClick={togglePlay}
                style={{ cursor: "pointer" }}
              />
            </IonItem>
            {isPlaying && (
              <audio
                src={audioUrl}
                autoPlay
                onEnded={() => setIsPlaying(false)}
              />
            )}
          </IonList>
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

export default AudioPassage;
