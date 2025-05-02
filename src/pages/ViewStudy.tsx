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
import { bookOutline, checkmarkCircleOutline, volumeMedium } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../components/localStorageKeys";
import { Study } from "../data/types";
import { getPassagesFromStudy, getStudy } from "../data/studies";
import "./ViewStudy.css";

function ViewStudy() {
  const params = useParams<{ slug: string }>();
  const [study, setStudy] = useState<Study>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const [completedQuestions, setCompletedQuestions] = useLocalStorage<{
    [key: string]: boolean;
  }>(`completed-questions-${params.slug}`, {});

  const [showLeadersNotes, setShowLeadersNotes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );

  const toggleQuestion = (sectionTitle: string, questionIndex: number) => {
    const key = `${sectionTitle}-${questionIndex}`;
    setCompletedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useIonViewWillEnter(() => {
    const study_ = getStudy(params.slug);
    setStudy(study_);
  });

  // Get all passages from section titles
  const getAllPassages = () => {
    if (!study) return [];
    return getPassagesFromStudy(study).map((passage) => ({
      passage,
      sectionTitle: passage,
    }));
  };

  return (
    <IonPage id="view-study-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="ios"
              text="Studies"
              defaultHref="/"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{study?.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton mode="ios" href={`/study/${study?.slug}/audio/1`}>
              <IonIcon icon={volumeMedium} />
            </IonButton>
            <IonButton mode="ios" href={`/study/${study?.slug}/passage/1`}>
              <IonIcon icon={bookOutline} />
            </IonButton>
          </IonButtons>
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
            </IonRow>
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <p>{study.overview}</p>
              </IonText>
            </IonRow>
            {study.timeline !== undefined ? (
              <IonRow className="ion-padding-horizontal">
                <IonRouterLink
                  routerLink={`/study/${study.slug}/timeline`}
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
                  ([questionSectionTitle, questionSection]) => (
                    <div key={questionSectionTitle}>
                      {questionSectionTitle !== "Introduction" &&
                        questionSectionTitle !== "Application" && (
                          <div className="ion-padding-bottom">
                            <IonRouterLink
                              routerLink={`/study/${study.slug}/passage/${
                                getAllPassages().findIndex(
                                  (p) => p.passage === questionSectionTitle
                                ) + 1
                              }`}
                            >
                              {questionSectionTitle}
                            </IonRouterLink>
                          </div>
                        )}
                        {questionSectionTitle == "Introduction" || questionSectionTitle == "Application" ? <h2>{questionSectionTitle}</h2> :<></>}
                      <ul>
                        {questionSection.questions.map((question, index) => (
                          <li
                            key={index}
                            className={classNames(
                              "ion-padding-bottom",
                              completedQuestions[
                                `${questionSectionTitle}-${index}`
                              ] && "completed"
                            )}
                            onClick={() =>
                              toggleQuestion(questionSectionTitle, index)
                            }
                          >
                            {question}
                            {showLeadersNotes &&
                              questionSection.answers &&
                              questionSection.answers[index] && (
                                <div className="ion-padding-start">
                                  <IonText color="medium">
                                    {questionSection.answers[index]}
                                  </IonText>
                                </div>
                              )}
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
                if (completedStudies.includes(study.index)) {
                  setCompletedStudies(
                    completedStudies.filter((s) => s !== study.index)
                  );
                } else {
                  setCompletedStudies([...completedStudies, study.index]);
                }
              }}
            >
              {completedStudies.includes(study.index)
                ? "Study Completed"
                : "Mark Study as Completed"}
              <IonIcon slot="end" icon={checkmarkCircleOutline} />
            </IonButton>
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
