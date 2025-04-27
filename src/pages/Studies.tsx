import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import StudyListItem from "../components/StudyListItem";
import { Study, getStudies } from "../data/studies";
import "./Studies.css";
import { helpOutline } from "ionicons/icons";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";
import {
  CompletedStudiesStorageKey,
  ShowIntroBlurbStorageKey,
} from "../components/localStorageKeys";
import { AppTitle } from "../data/contants";

const Studies: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

  const [showIntro, setShowIntro] = useLocalStorage<boolean>(
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
            <IonTitle>{AppTitle}</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink={`/about`} mode="ios">
                <IonIcon icon={helpOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>{AppTitle}</IonTitle>
            </IonToolbar>
          </IonHeader>

          {studiesToDisplay.length !== 0 ? (
            <>
              <IonList>
                {studiesToDisplay.map((study) => (
                  <StudyListItem
                    key={study.index}
                    study={study}
                    totalNumberOfStudies={studies.length}
                  />
                ))}
              </IonList>
              <div className="ion-padding" style={{ height: "90px" }} />
            </>
          ) : (
            <>
              <div className="ion-padding ion-text-center">
                You've finished all the studies in this series.
              </div>
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Studies;
