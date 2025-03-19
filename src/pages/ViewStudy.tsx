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
  IonList,
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
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

            <IonRow>
              <IonText>
                {study.passages.map((passage) => (
                  <IonRouterLink
                    className="ion-padding-end"
                    key={passage}
                    href={`/biblepassage/${passage}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {passage}
                  </IonRouterLink>
                ))}
              </IonText>
            </IonRow>
            <IonRow>
              <IonText>
                <p>{study.overview}</p>
              </IonText>
            </IonRow>
            <IonRow>
              {study.themes.map((theme) => (
                <IonChip
                  key={theme}
                  color="primary"
                  outline
                  onClick={() => {
                    window.location.href = `/theme/${theme}`;
                  }}
                >
                  {theme}
                </IonChip>
              ))}
            </IonRow>
            {showLeadersNotes && (
              <IonRow>
                <IonText>
                  <h3>Leaders Notes</h3>
                  <p>{study.leadersNotes ?? "No leaders notes available"}</p>
                </IonText>
              </IonRow>
            )}
            <IonRow>
              <IonText>
                <h3>Questions</h3>
                <ol>
                  {study.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ol>
              </IonText>
            </IonRow>
            <IonRow>
              <IonText>
                <h3>Additional Resources</h3>
                  {study.additionalResources?.map((reading) => (
                    <div key={reading.url} className="ion-padding-bottom">
                      <a href={reading.url} target="_blank" rel="noreferrer">
                        {reading.title} - {reading.author}
                      </a>
                    </div>
                  ))}
              </IonText>
            </IonRow>

            <IonButton
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
                className="ion-margin-top"
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
