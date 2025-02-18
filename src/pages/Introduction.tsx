import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const Introduction: React.FC = () => (
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
        <p>
          Bible Study Companion is a comprehensive and easy-to-use app designed
          to help individuals and small groups engage deeply with Scripture.
          Offering 50 in-depth Bible studies, this app covers a wide range of
          topics, including foundational Christian beliefs, key biblical themes,
          and practical life applications. Each study includes thoughtfully
          structured lessons with Scripture readings, discussion questions, and
          reflection prompts, making it an ideal tool for personal devotion,
          group discussions, or church study sessions. Bible Study Companion is
          a comprehensive and easy-to-use app designed to help individuals and
          small groups engage deeply with Scripture. Offering 50 in-depth Bible
          studies, this app covers a wide range of topics, including
          foundational Christian beliefs, key biblical themes, and practical
          life applications. Each study includes thoughtfully structured lessons
          with Scripture readings, discussion questions, and reflection prompts,
          making it an ideal tool for personal devotion, group discussions, or
          church study sessions.
        </p>
        <p>
          With a user-friendly interface, Bible Study Companion allows users to
          track their progress, take notes, and access additional resources such
          as commentary insights and historical context. Whether you're a new
          believer seeking to understand the basics of faith or a seasoned Bible
          student looking for deeper insights, this app provides a structured
          yet flexible approach to studying God’s Word. Accessible anytime,
          anywhere, it empowers users to grow in faith, knowledge, and spiritual
          maturity at their own pace.
        </p>
    </IonContent>
  </IonPage>
);

export default Introduction;
