import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
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

const Home: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);

  useIonViewWillEnter(() => {
    const studies_ = getStudies();
    setStudies(studies_);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle>Bible Overview</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={`/about`} mode="ios">
              About
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
            <IonTitle size="large">Bible Overview</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {studies.map((study) => (
            <StudyListItem
              key={study.index}
              study={study}
              totalNumberOfStudies={studies.length}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
