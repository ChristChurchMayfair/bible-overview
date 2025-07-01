import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";
import {
  CompletedStudiesStorageKey,
  ShowIntroBlurbStorageKey,
  Showleaders_notesStorageKey,
} from "../constants/storage";
import { getStudies } from "../data/studies";
import { Study } from "../data/types";

const Settings: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

  const [showleaders_notes, setShowleaders_notes] = useLocalStorage<boolean>(
    Showleaders_notesStorageKey,
    false
  );
  const [showIntroBlurb, setShowIntroBlurb] = useLocalStorage<boolean>(
    ShowIntroBlurbStorageKey,
    true
  );

  useIonViewWillEnter(() => {
    const studies_ = getStudies();
    setStudies(studies_);
  });

  const studiesToDisplay = studies.filter(
    (study) => !completedStudies.includes(study.index)
  );

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <>
      <Menu />
      <IonPage id="home-page" className="ion-page">
        <IonHeader collapse="fade">
          <IonToolbar mode="ios">
            <IonButtons slot="start">
              <IonMenuButton mode="ios" />
            </IonButtons>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>Settings</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList inset>
            <IonItem>
              <IonLabel slot="start" className="no-wrap">
                Show Leaders Notes
              </IonLabel>
              <IonToggle
                slot="end"
                mode="ios"
                checked={showleaders_notes}
                onIonChange={(e) => setShowleaders_notes(e.detail.checked)}
              ></IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel slot="start" className="no-wrap">
                Show Intro
              </IonLabel>
              <IonToggle
                slot="end"
                mode="ios"
                checked={showIntroBlurb}
                onIonChange={(e) => setShowIntroBlurb(e.detail.checked)}
              ></IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel slot="start" className="no-wrap">
                Reset Completed Studies
              </IonLabel>
              <IonButton
                slot="end"
                color={"warning"}
                disabled={completedStudies.length == 0}
                mode="ios"
                onClick={() => {
                  removeCompletedStudies();
                }}
              >
                Reset
              </IonButton>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Settings;
