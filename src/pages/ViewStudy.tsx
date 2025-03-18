import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  bookOutline,
  checkmarkCircleOutline,
  exitOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../components/localStorageKeys";
import { Study, getStudy } from "../data/studies";
import "./ViewStudy.css";

function ViewStudy() {
  const [study, setStudy] = useState<Study>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const params = useParams<{ id: string }>();

  const [showLeadersNotes, setShowLeadersNotes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );

  useIonViewWillEnter(() => {
    const study_ = getStudy(parseInt(params.id, 10));
    setStudy(study_);
  });

  return (
    <IonPage id="view-study-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
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
                <IonRouterLink
                  key={passage}
                  href={`/biblepassage/${passage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {passage}
                </IonRouterLink>
                // <a
                //   className="passageLink"
                //   key={passage}
                //   href={`https://www.biblegateway.com/passage/?search=${passage}&version=NIV`}
                //   target="_blank"
                //   rel="noreferrer"
                // >
                //   {passage}
                // </a>
              ))}
            </IonItem>
            <IonItem>
              <IonText className="ion-padding">
                <p>{study.overview}</p>
              </IonText>
            </IonItem>
            <IonItem>
              {study.themes.map((theme) => (
                <IonChip
                  key={theme}
                  outline
                  onClick={() => {
                    window.location.href = `/theme/${theme}`;
                  }}
                >
                  {theme}
                </IonChip>
              ))}
            </IonItem>
            {showLeadersNotes && (
              <IonItem>
                <IonText className="ion-padding">
                  <h3>Leaders Notes</h3>
                  <p>{study.leadersNotes ?? "No leaders notes available"}</p>
                </IonText>
              </IonItem>
            )}
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
                <h1>Additional Resources</h1>
                <IonList>
                  {study.additionalResources?.map((reading) => (
                    <IonItem key={reading.url}>
                      <a href={reading.url} target="_blank" rel="noreferrer">
                        {reading.title} - {reading.author}
                        <IonIcon
                          icon={exitOutline}
                          size="small"
                          style={{ marginLeft: "8px" }}
                        />
                      </a>
                    </IonItem>
                  ))}
                </IonList>
              </IonText>
            </IonItem>

            <IonButton
              className="ion-padding"
              expand="block"
              shape="round"
              mode="ios"
              fill={
                completedStudies.includes(study.index) ? "solid" : "outline"
              }
              onClick={(e) => {
                setCompletedStudies([...completedStudies, study.index]);
              }}
            >
              {completedStudies.includes(study.index)
                ? "Study Completed"
                : "Mark Study as Completed"}
              <IonIcon slot="end" icon={checkmarkCircleOutline} />
            </IonButton>
            {completedStudies.includes(study.index) && (
              <IonButton
                className="ion-padding-horizontal"
                expand="block"
                shape="round"
                mode="ios"
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
            <div className="ion-padding" style={{ height: "90px" }} />
          </>
        ) : (
          <div>Study not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewStudy;
