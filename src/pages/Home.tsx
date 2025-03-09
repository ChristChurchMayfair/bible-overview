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
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import StudyListItem from "../components/StudyListItem";
import { Study, getStudies } from "../data/studies";
import "./Home.css";
import {
  helpOutline,
} from "ionicons/icons";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";
import { CompletedStudiesStorageKey } from "../components/localStorageKeys";

const Home: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

  useIonViewWillEnter(() => {
    const studies_ = getStudies();
    setStudies(studies_);
  });

  const studiesToDisplay = studies.filter(study => !completedStudies.includes(study.index))

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
            <IonTitle>Bible Overview</IonTitle>
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
              <IonTitle>Bible Overview</IonTitle>
            </IonToolbar>
          </IonHeader>

          {studiesToDisplay.length !== 0 ? <>
            <div className="ion-padding ion-text-center">Next studies</div>
            <IonList>
              {studiesToDisplay.map((study) => (
                <StudyListItem
                  key={study.index}
                  study={study}
                  totalNumberOfStudies={studies.length}
                />
              ))}
            </IonList>
          </>:<><div className="ion-padding ion-text-center">You've finished all the studies in this series.</div>
          </>}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
