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
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";
import StudyListItem from "../components/StudyListItem";
import {
  CompletedStudiesStorageKey,
  ShowIntroBlurbStorageKey,
} from "../components/localStorageKeys";
import { AppTitle } from "../data/constants";
import { getStudies } from "../data/studies";
import { Study } from "../data/types";
import "./Studies.css";

const Studies: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const contentRef = useRef<HTMLIonContentElement>(null);

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

  useEffect(() => {
    // Find the first uncompleted study
    const firstUncompletedStudy = studies.find(
      (study) => !completedStudies.includes(study.index)
    );

    if (firstUncompletedStudy && contentRef.current) {
      // Scroll to the first uncompleted study after a delay to allow the content to render
      setTimeout(() => {
        const element = document.getElementById(
          `study-${firstUncompletedStudy.index}`
        );
        if (element && contentRef.current) {
          const y = element.offsetTop - 100; // Offset by 100px to account for header
          contentRef.current.scrollToPoint(0, y, 500);
        }
      }, 500); // Increased delay to ensure content is rendered
    }
  }, [studies, completedStudies]);

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
        <IonContent fullscreen ref={contentRef}>
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
          <div className="ion-padding" style={{ height: "90px" }} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Studies;
