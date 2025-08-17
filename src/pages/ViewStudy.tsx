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
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
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
                <IonTitle>Study {study.index}</IonTitle>
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
                <h2>Summary</h2>
                <ReactMarkdown>{study.summary}</ReactMarkdown>
              </IonText>
            </IonRow>

            {showLeadersNotes && (
              <>
                <IonRow className="ion-padding-horizontal">
                  <IonText>
                    <h3>Leaders Notes</h3>
                    <ReactMarkdown>{study.leadersInfo.notes}</ReactMarkdown>
                  </IonText>
                </IonRow>
                <IonRow className="ion-padding-horizontal">
                  <IonText>
                    <h4>What</h4>
                    <ReactMarkdown>{study.leadersInfo.what}</ReactMarkdown>
                  </IonText>
                </IonRow>
                <IonRow className="ion-padding-horizontal">
                  <IonText>
                    <h4>So What</h4>
                    <ReactMarkdown>{study.leadersInfo.soWhat}</ReactMarkdown>
                  </IonText>
                </IonRow>
              </>
            )}
            <IonRow className="ion-padding-horizontal">
              <IonText>
                <h1 id="questions-title">Questions</h1>
                <IonPopover
                  trigger="questions-title"
                  side="bottom"
                  triggerAction="click"
                >
                  <IonContent>
                    <em>
                      <IonIcon icon={bulbOutline} /> Tap each question to mark
                      it as complete and track your progress.
                    </em>
                  </IonContent>
                </IonPopover>

                {study.questions.map((questionSection, sectionIndex) => (
                  <div key={questionSection.title}>
                    {questionSection.passages.length > 0 ? (
                      <h4>
                        <IonRouterLink
                          routerLink={`/study/${study.slug}/passage/${sectionIndex}`}
                        >
                          {questionSection.title}
                        </IonRouterLink>
                      </h4>
                    ) : (
                      <h4>{questionSection.title}</h4>
                    )}
                    <ul>
                      {questionSection.questions.map(
                        (question_and_answer, index) => (
                          <li
                            key={index}
                            className={classNames(
                              "ion-padding-bottom",
                              completedQuestions[
                                `${questionSection.title}-${index}`
                              ] && "completed"
                            )}
                            onClick={() =>
                              toggleQuestion(questionSection.title, index)
                            }
                          >
                            {question_and_answer.question}
                            {showLeadersNotes &&
                              question_and_answer.leadersHint && (
                                <div className="ion-padding-start">
                                  <IonText>
                                    <strong>Leader's Hint:</strong>{" "}
                                    <em>{question_and_answer.leadersHint}</em>
                                  </IonText>
                                </div>
                              )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </IonText>
            </IonRow>

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
