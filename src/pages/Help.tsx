import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  globeOutline,
  helpCircleOutline,
  settingsOutline,
} from "ionicons/icons";

export const Help: React.FC = () => (
  <IonPage id="introduction-page">
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            mode="ios"
            // text="Bible Overview"
            defaultHref="/"
          ></IonBackButton>
        </IonButtons>
        <IonTitle>About</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>Study Help</h2>
      <p>
        You're very welcome to use this app for your own personal study.
        However, we really encourage you to go through these studies with your
        Discipleship Group (DG) where you can explore and discuss the studies
        with others and with the help of study leaders.
      </p>
      <p>
        As questions arise, we encourage you to bring them up in your
        Discipleship Groups. Your leaders will also be happy to help and will
        have been equipped with additional study notes.
      </p>
      <p>
        If you're not currently part of a Discipleship Group but would like to
        join one, please contact the Christ Church Mayfair staff team who would
        be happy to help you find a group that suits you.
      </p>
      <p>
        You're also welcome to contact the Christ Church Mayfair staff team,
        particularly Phil Allcock who has developed this study series and would
        be happy to help with any questions you may have.
      </p>
      <IonButton
        expand="block"
        href="mailto:phil.allcock@christchurchmayfair.org"
      >
        <IonIcon slot="start" icon={helpCircleOutline} />
        Contact Phil with a Question
      </IonButton>
      <h3>Not at Christ Church Mayfair or Part of a Church?</h3>
      <p>
        If you're not part of Christ Church Mayfair, you're very welcome to use
        this app for your personal study. We'd love to encourage you to find a
        church near you that runs Bible studies, as we believe studying God's
        Word together with others is an enriching way to grow in faith. If
        you're in London, you'd be very welcome to join us at Christ Church
        Mayfair.
      </p>
      <IonButton expand="block" href="https://christchurchmayfair.org">
        <IonIcon slot="start" icon={globeOutline} />
        Christ Church Mayfair
      </IonButton>

      <h2>App Support</h2>
      <p>
        This app was built by volunteers from Christ Church Mayfair. If you have
        problems with this app or have ideas to make it better we'd love to hear
        them.
      </p>
      <p>
        If you encounter any bugs or have feature requests, please raise them
        via a Github issue.
      </p>
      <IonButton
        expand="block"
        href="https://github.com/tomduckering/bibleoverviewapp/issues/new/choose"
      >
        <IonIcon slot="start" icon={settingsOutline} />
        Report an Issue
      </IonButton>
    </IonContent>
  </IonPage>
);

export default Help;
