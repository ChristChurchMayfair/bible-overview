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
import {
  checkmarkCircleOutline,
  helpOutline,
  listOutline,
  sparklesOutline,
  trash,
  warning,
} from "ionicons/icons";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";

const CompletedStudies: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>("completedStudies", []);

  useIonViewWillEnter(() => {
    const studies_ = getStudies()
    setStudies(studies_);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const studiesToShow = studies.filter((study) =>
    completedStudies.includes(study.index)
  );

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
          <div className="ion-padding ion-text-center">Completed studies</div>

          <IonList>
            {studiesToShow.map((study) => (
              <StudyListItem
                key={study.index}
                study={study}
                totalNumberOfStudies={studies.length}
              />
            ))}
          </IonList>
          {studiesToShow.length === 0 && (
                <p className="ion-text-center">You've not yet marked any of the studies as completed.</p>
          )}
          {studiesToShow.length !== 0 && (
            <IonButton
              expand="block"
              color={"danger"}
              onClick={() => removeCompletedStudies()}
            >
              <IonIcon icon={trash} slot="start" />
              <IonLabel>Reset Completed Studies Record</IonLabel>
            </IonButton>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default CompletedStudies;
