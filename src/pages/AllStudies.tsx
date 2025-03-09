import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
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
import { checkmarkCircleOutline, helpOutline, listOutline, sparklesOutline } from "ionicons/icons";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";
import { CompletedStudiesStorageKey } from "../components/localStorageKeys";

const AllStudies: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] = useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

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
     <Menu/>
      <IonPage id="home-page" className="ion-page">
        <IonHeader collapse="fade">
          <IonToolbar mode="ios">
            <IonButtons slot="start">
              <IonMenuButton mode="ios"/>
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
          <div className="ion-padding ion-text-center">All studies</div>


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
    </>
  );
};

export default AllStudies;
