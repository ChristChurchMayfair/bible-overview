import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import classNames from "classnames";
import { checkmarkCircleOutline } from "ionicons/icons";
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
    const study_ = getStudy(params.id);
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
            <IonRow
              className={classNames(
                "ion-padding-horizontal",
                "ion-padding-top"
              )}
            >
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
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <p>{study.overview}</p>
              </IonText>
            </IonRow>
            {study.timeline !== undefined ? (
              <IonRow className="ion-padding-horizontal">
                <IonRouterLink
                  routerLink={`/timeline/${study.index}`}
                  routerDirection="forward"
                >
                  Timeline
                </IonRouterLink>
              </IonRow>
            ) : (
              <></>
            )}
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <h3>Patterns, Promises & Progression</h3>
                {study.themes.map((theme) => (
                  <IonButton
                    key={theme}
                    className={"ion-text-lowercase"}
                    color="primary"
                    shape="round"
                    size="small"
                    fill="outline"
                    routerLink={`/theme/${theme.toLowerCase()}`}
                  >
                    {theme}
                  </IonButton>
                ))}
              </IonText>
            </IonRow>
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <h3>Key Application</h3>
                {study.keyApplication}
              </IonText>
            </IonRow>
            {showLeadersNotes && (
              <IonRow className="ion-padding-horizontal">
                <IonText>
                  <h3>Leaders Notes</h3>
                  <p>{study.leadersNotes ?? "No leaders notes available"}</p>
                </IonText>
              </IonRow>
            )}
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <h3>Questions</h3>
                {Object.entries(study.questions).map(
                  ([questionSectionTitle, questions]) => (
                    <div key={questionSectionTitle}>
                      {questionSectionTitle != "" ? (
                        <h4>{questionSectionTitle}</h4>
                      ) : (
                        <></>
                      )}
                      <ul>
                        {questions.map((question, index) => (
                          <li key={index} className={"ion-padding-bottom"}>
                            {/* <IonCheckbox  labelPlacement="end"> */}
                            {/* </IonCheckbox> */}
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </IonText>
            </IonRow>
            {(study.prayerPoints?.length ?? 0) > 0 ? (
              <IonRow className="ion-padding-horizontal">
                <IonText>
                  <h3>Pray</h3>
                  <ul>
                    {study.prayerPoints?.map((prayerPoint) => (
                      <li key={prayerPoint} className={"ion-padding-bottom"}>
                        {prayerPoint}
                      </li>
                    ))}
                  </ul>
                </IonText>
              </IonRow>
            ) : (
              <></>
            )}
            {(study.additionalResources?.length ?? 0) > 0 ? (
              <IonRow className="ion-padding-horizontal">
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
            ) : (
              <></>
            )}

            <IonButton
              className="ion-padding-horizontal"
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
                className={classNames(
                  "ion-padding-horizontal",
                  "ion-margin-top"
                )}
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
