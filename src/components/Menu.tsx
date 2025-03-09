import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
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

export const Menu: React.FC = () => {
  return (
    <IonMenu contentId="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList lines="full">
          <IonItem routerLink="/" detail={false}>
            <IonIcon icon={sparklesOutline} color="primary" slot="start" />
            <IonLabel>Upcoming Studies</IonLabel>
          </IonItem>
          <IonItem routerLink="/completedstudies" detail={false}>
            <IonIcon
              icon={checkmarkCircleOutline}
              color="primary"
              slot="start"
            />
            <IonLabel>Completed Studies</IonLabel>
          </IonItem>
          <IonItem routerLink="/allstudies" detail={false}>
            <IonIcon icon={listOutline} color="primary" slot="start" />
            <IonLabel>All Studies</IonLabel>
          </IonItem>
          <IonItem routerLink="/settings" detail={false}>
            <IonIcon icon={cogOutline} color="primary" slot="start" />
            <IonLabel>Settings</IonLabel>
          </IonItem>
          <IonItem routerLink="/about" detail={false}>
            <IonIcon icon={helpOutline} color="primary" slot="start" />
            <IonLabel>About</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
