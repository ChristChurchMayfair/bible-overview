import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonPopover,
  IonRouterLink,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import classNames from "classnames";
import {
  bookOutline,
  bulbOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  Showleaders_notesStorageKey,
} from "../constants/storage";
import { getPassagesFromStudy, getStudy } from "../data/studies";
import { Study } from "../data/types";
import "./ViewStudy.css";

function ViewStudy() {
  const params = useParams<{ slug: string }>();
  const [study, setStudy] = useState<Study>();
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const [completedQuestions, setCompletedQuestions] = useLocalStorage<{
    [key: string]: boolean;
  }>(`completed-questions-${params.slug}`, {});

  const [showleaders_notes, setShowleaders_notes] = useLocalStorage<boolean>(
    Showleaders_notesStorageKey,
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
              defaultHref="/studies"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{study?.title}</IonTitle>
          <IonButtons slot="end">
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
            ></IonRow>
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
            </IonRow>
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <h4>Key Application</h4>
                {study.key_application}
              </IonText>
            </IonRow>
            {showleaders_notes && (
              <IonRow className="ion-padding-horizontal">
                <IonText>
                  <h3>Leaders Notes</h3>
                  <p>{study.leaders_notes ?? "No leaders notes available"}</p>
                </IonText>
              </IonRow>
            )}
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <h3 id="questions-title">Questions</h3>
                <IonPopover
                  trigger="questions-title"
                  side="bottom"
                  triggerAction="click"
                >
                  <IonContent>
                    <em>
                      <IonIcon icon={bulbOutline} /> Tap questions to track your
                      progress
                    </em>
                  </IonContent>
                </IonPopover>

                {study.questions.map(
                  (questionSection) => (
                    <div key={questionSection.section}>
                      {questionSection.section !== "Introduction" &&
                        questionSection.section !== "Application" && (
                          <h4 className="ion-padding-bottom">
                            <IonRouterLink
                              routerLink={`/study/${study.slug}/passage/${
                                getAllPassages().findIndex(
                                  (p) => p.passage === questionSection.section
                                ) + 1
                              }`}
                            >
                              {questionSection.section}
                            </IonRouterLink>
                          </h4>
                        )}
                      {questionSection.section == "Introduction" ||
                      questionSection.section == "Application" ? (
                        <h4>{questionSection.section}</h4>
                      ) : (
                        <></>
                      )}
                      <ul>
                        {questionSection.questions.map((question_and_answer, index) => (
                          <li
                            key={index}
                            className={classNames(
                              "ion-padding-bottom",
                              completedQuestions[
                                `${questionSection.section}-${index}`
                              ] && "completed"
                            )}
                            onClick={() =>
                              toggleQuestion(questionSection.section, index)
                            }
                          >
                            {question_and_answer.question}
                            {showleaders_notes &&
                              question_and_answer.answer !== undefined && (
                                <div className="ion-padding-start">
                                  <IonText color="medium">
                                    {question_and_answer.answer}
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
            {(study.prayer_points?.length ?? 0) > 0 ? (
              <IonRow className="ion-padding-horizontal">
                <IonText>
                  <h3>Pray</h3>
                  <ul>
                    {study.prayer_points?.map((prayerPoint) => (
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
            {(study.additional_resources?.length ?? 0) > 0 ? (
              <IonRow className="ion-padding-horizontal">
                <IonText>
                  <h3>Additional Resources</h3>
                  {study.additional_resources?.map((reading) => (
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
