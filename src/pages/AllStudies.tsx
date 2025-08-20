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
import { AppTitle } from "../constants/app";
import { CompletedStudiesStorageKey } from "../constants/storage";
import { getStudies } from "../data/studies";
import { FullStudy } from "../data/types";
import "./Studies.css";
import { getScheduleStats } from "../data/schedule";

const AllStudies: React.FC = () => {
  const [studies, setStudies] = useState<FullStudy[]>([]);

  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);

  useIonViewWillEnter(() => {
    const studies_ = getStudies();
    setStudies(studies_);
  });

  const scheduleStats = getScheduleStats();
  const availableStudies = studies.length;
  const totalPlannedStudies = scheduleStats.totalStudies;
  const remainingStudies = totalPlannedStudies - availableStudies;

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
          <div className="ion-padding">
            <div className="ion-text-center">
              {remainingStudies > 0 && (
                <>
                  <p>
                    {remainingStudies} more{" "}
                    {remainingStudies === 1 ? "study" : "studies"} to come.
                  </p>
                  <p>Check back for updates.</p>
                </>
              )}
            </div>
          </div>
          <div className="ion-padding" style={{ height: "90px" }} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default AllStudies;
