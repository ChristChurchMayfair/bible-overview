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
import { helpCircleOutline, settingsOutline } from "ionicons/icons";

export const About: React.FC = () => (
  <IonPage id="introduction-page">
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            mode="ios"
            text="Bible Overview"
            defaultHref="/home"
          ></IonBackButton>
        </IonButtons>
        <IonTitle>About</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>Content</h2>
      <p>
        This Bible overview is a simple app that provides 50 studies to help
        users understand the overarching narrative of the Bible. Each study is
        designed to be concise and informative, making it easy to grasp the key
        themes and messages.
      </p>
      <p>
        You will be going through these studies with you Bible study leaders -
        they are the best port of call for question.
      </p>
      <IonButton expand="block">
        <IonIcon slot="start" icon={helpCircleOutline} />
        Ask a Question
      </IonButton>
      <h2>App Support</h2>
      <p>This app was built by volunteers from Christ Church Mayfair. </p>
      <p>
        If you encounter any bugs or have feature requests, please contact us
        through the app or visit our website for more information.
      </p>
      <IonButton
        expand="block"
        href="https://github.com/tomduckering/bibleoverviewapp/issues"
      >
        <IonIcon slot="start" icon={settingsOutline} />
        Report an Issue or Request a Feature
      </IonButton>
    </IonContent>
  </IonPage>
);

export default About;
