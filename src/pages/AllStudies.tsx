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
import { helpOutline } from "ionicons/icons";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";
import StudyListItem from "../components/StudyListItem";
import { CompletedStudiesStorageKey } from "../components/localStorageKeys";
import { AppTitle } from "../data/contants";
import { getStudies } from "../data/studies";
import "./Studies.css";
import { Study } from "../data/types";

const AllStudies: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

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
              <IonButton routerLink={`/help`} mode="ios">
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
          <div className="ion-padding ion-text-center">All studies</div>

          <IonList>
            {studies.map((study) => (
              <StudyListItem
                key={study.index}
                study={study}
                totalNumberOfStudies={studies.length}
                isCompleted={completedStudies.includes(study.index)}
              />
            ))}
          </IonList>
          <div className="ion-padding" style={{ height: "90px" }} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default AllStudies;
