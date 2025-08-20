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
  IonSelect,
  IonSelectOption,
  IonText,
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
  MeetingDayStorageKey,
  ShowIntroBlurbStorageKey,
  ShowLeadersNotesStorageKey,
} from "../constants/storage";
import { getStudies } from "../data/studies";
import { FullStudy } from "../data/types";

const Settings: React.FC = () => {
  const [studies, setStudies] = useState<FullStudy[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

  const [showleaders_notes, setShowleaders_notes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );
  const [showIntroBlurb, setShowIntroBlurb] = useLocalStorage<boolean>(
    ShowIntroBlurbStorageKey,
    true
  );
  
  const [meetingDay, setMeetingDay] = useLocalStorage<number | null>(
    MeetingDayStorageKey,
    null // Default to Week Commencing (null = Week Commencing)
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
                Meeting Day
              </IonLabel>
              <IonSelect
                slot="end"
                mode="ios"
                value={meetingDay}
                onIonChange={(e) => setMeetingDay(e.detail.value)}
                interface="popover"
              >
                <IonSelectOption value={null}>None (w/c)</IonSelectOption>
                <IonSelectOption value={1}>Monday</IonSelectOption>
                <IonSelectOption value={2}>Tuesday</IonSelectOption>
                <IonSelectOption value={3}>Wednesday</IonSelectOption>
                <IonSelectOption value={4}>Thursday</IonSelectOption>
                <IonSelectOption value={5}>Friday</IonSelectOption>
                <IonSelectOption value={6}>Saturday</IonSelectOption>
                <IonSelectOption value={0}>Sunday</IonSelectOption>
              </IonSelect>
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
          
          <div className="ion-padding">
            <IonText color="medium">
              <p style={{ fontSize: "0.9em", textAlign: "center" }}>
                Settings are stored locally on this device and won't sync across devices or work in private browsing mode.
              </p>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Settings;
