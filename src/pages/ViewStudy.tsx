import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { bookOutline } from "ionicons/icons";
import { useParams } from "react-router";
import { Study, getStudy } from "../data/studies";
import "./ViewStudy.css";

function ViewStudy() {
  const [study, setStudy] = useState<Study>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const study_ = getStudy(parseInt(params.id, 10));
    setStudy(study_);
  });

  return (
    <IonPage id="view-study-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              mode="ios"
              text="Bible Overview"
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {study ? (
          <>
            <IonItem>
              <IonLabel className="ion-text-wrap">
                <h1>{study.title}</h1>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={bookOutline}
                color="primary"
                size="small"
              ></IonIcon>
              {study.passages.map((passage) => (
                <a
                  className="passageLink"
                  key={passage}
                  href={`https://www.biblegateway.com/passage/?search=${passage}&version=NIV`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {passage}
                </a>
              ))}
            </IonItem>
            <IonItem>
              <IonText className="ion-padding">
                <p>{study.overview}</p>
              </IonText>
            </IonItem>
            <IonItem>
              {study.themes.map((theme) => (
                <IonChip key={theme} outline>
                  {theme}
                </IonChip>
              ))}
            </IonItem>
            <IonItem>
              <IonText className="ion-padding">
                <h3>Questions</h3>

                <ol>
                  {study.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ol>
              </IonText>
            </IonItem>
            <IonItem>
              <IonText>
                <h1>Further Reading</h1>
                <ul>
                  {study.furtherReading?.map((reading) => (
                    <li key={reading.url}>{reading.title}</li>
                  ))}
                </ul>
              </IonText>
            </IonItem>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewStudy;
