import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  bookOutline,
  calendarOutline,
  cogOutline,
  helpOutline,
  homeOutline,
  listOutline,
} from "ionicons/icons";
import React from "react";
import { AppTitle } from "../constants/app";

export const Menu: React.FC = () => {
  return (
    <IonMenu contentId="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{AppTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          <IonMenuToggle>
            <IonItem routerLink="/studies" detail={false}>
              <IonIcon icon={listOutline} color="primary" slot="start" />
              <IonLabel>Studies</IonLabel>
            </IonItem>
            <IonItem routerLink="/story-so-far" detail={false}>
              <IonIcon icon={bookOutline} color="primary" slot="start" />
              <IonLabel>The Story So Far</IonLabel>
            </IonItem>
            <IonItem routerLink="/calendar" detail={false}>
              <IonIcon icon={calendarOutline} color="primary" slot="start" />
              <IonLabel>Year Overview</IonLabel>
            </IonItem>

            <IonItem routerLink="/intro" detail={false}>
              <IonIcon icon={homeOutline} color="primary" slot="start" />
              <IonLabel>Intro</IonLabel>
            </IonItem>
            <IonItem routerLink="/settings" detail={false}>
              <IonIcon icon={cogOutline} color="primary" slot="start" />
              <IonLabel>Settings</IonLabel>
            </IonItem>
            <IonItem routerLink="/help" detail={false}>
              <IonIcon icon={helpOutline} color="primary" slot="start" />
              <IonLabel>Help & About</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
