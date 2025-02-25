import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import {
  bookOutline,
  checkmarkCircleOutline,
  helpOutline,
} from "ionicons/icons";
import { useParams } from "react-router";
import { Study, getStudy } from "../data/studies";
import "./ViewStudy.css";
import { useLocalStorage } from "usehooks-ts";

function ViewStudy() {
  const [study, setStudy] = useState<Study>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>("completedStudies", []);
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    const study_ = getStudy(parseInt(params.id, 10));
    setStudy(study_);
  });

  return (
    <IonPage id="view-study-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start" >
            <IonBackButton
              mode="ios"
              text="Studies"
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{study?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {study ? (
          <>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle>{study.title}</IonTitle>
              </IonToolbar>
            </IonHeader>
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
            {/* <IonItem> */}
            <IonText>
              <h1>Further Reading</h1>
              <ul>
                {study.furtherReading?.map((reading) => (
                  <li key={reading.url}>
                    <a href={reading.url}>
                      {reading.title} - {reading.author}
                    </a>
                  </li>
                ))}
              </ul>
            </IonText>
            {/* </IonItem> */}

            <IonButton
              expand="block"
              shape="round"
              fill={
                completedStudies.includes(study.index) ? "solid" : "outline"
              }
              onClick={(e) => {
                setCompletedStudies([...completedStudies, study.index]);
              }}
            >
              {completedStudies.includes(study.index)
                ? "Completed"
                : "Mark as Completed"}
              <IonIcon slot="end" icon={checkmarkCircleOutline} />
            </IonButton>
            {completedStudies.includes(study.index) && (
              <IonButton
                expand="block"
                shape="round"
                fill={"outline"}
                onClick={(e) => {
                  setCompletedStudies(
                    completedStudies.filter((s) => s !== study.index)
                  );
                }}
              >
                Reset
              </IonButton>
            )}
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewStudy;
