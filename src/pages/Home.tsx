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
    <>
      <IonMenu contentId="home-page">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
          <IonItem routerLink="/" detail={false}>
              <IonIcon icon={sparklesOutline} color="primary"  slot="start"/>
              <IonLabel>Upcoming Studies</IonLabel>
            </IonItem>
            <IonItem routerLink="/"  detail={false}>
              <IonIcon icon={checkmarkCircleOutline} color="primary"  slot="start"/>
              <IonLabel>Completed Studies</IonLabel>
            </IonItem>
            <IonItem routerLink="/"  detail={false}>
              <IonIcon icon={listOutline} color="primary" slot="start"/>
              <IonLabel>All Studies</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
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

export default Home;
