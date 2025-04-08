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
  sparklesOutline,
  checkmarkCircleOutline,
  listOutline,
  cogOutline,
  helpOutline,
} from "ionicons/icons";
import React from "react";
import { AppTitle } from "../data/contants";

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
            <IonItem routerLink="/" detail={false}>
              <IonIcon icon={listOutline} color="primary" slot="start" />
              <IonLabel>Studies</IonLabel>
            </IonItem>
            <IonItem routerLink="/completedstudies" detail={false}>
              <IonIcon
                icon={checkmarkCircleOutline}
                color="primary"
                slot="start"
              />
              <IonLabel>Completed Studies</IonLabel>
            </IonItem>
            <IonItem routerLink="/settings" detail={false}>
              <IonIcon icon={cogOutline} color="primary" slot="start" />
              <IonLabel>Settings</IonLabel>
            </IonItem>
            <IonItem routerLink="/about" detail={false}>
              <IonIcon icon={helpOutline} color="primary" slot="start" />
              <IonLabel>About</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
