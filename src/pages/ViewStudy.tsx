import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
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
  copyOutline,
} from "ionicons/icons";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../constants/storage";
import { getPassagesFromStudy, getStudy } from "../data/studies";
import { FullStudy, isFullStudy } from "../data/types";
import "./ViewStudy.css";

function ViewStudy() {
  const params = useParams<{ slug: string }>();
  const [study, setStudy] = useState<FullStudy>();
  const popoverRef = useRef<HTMLIonPopoverElement>(null);
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const [completedQuestions, setCompletedQuestions] = useLocalStorage<{
    [key: string]: boolean;
  }>(`completed-questions-${params.slug}`, {});

  const [showLeadersNotes, setShowLeadersNotes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );
  
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, sectionName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionName);
      setTimeout(() => setCopiedSection(null), 2000); // Clear feedback after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleQuestion = (sectionTitle: string, questionIndex: number) => {
    const key = `${sectionTitle}-${questionIndex}`;
    setCompletedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useIonViewWillEnter(() => {
    const study_ = getStudy(params.slug);
    if (study_ !== undefined && isFullStudy(study_)) {
      setStudy(study_);
    }
  });

  // Get all passages from section titles
  const getAllPassages = () => {
    if (!study) return [];
    return getPassagesFromStudy(study).map((passage) => ({
      passage,
      sectionTitle: passage,
    }));
  };

  const handleRefresh = (event: CustomEvent) => {
    window.location.reload();
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
            <IonButton mode="ios" id="passages-trigger">
              <IonIcon icon={bookOutline} />
            </IonButton>
            <IonPopover ref={popoverRef} trigger="passages-trigger" triggerAction="click">
              <IonContent>
                {study && getAllPassages().length > 0 && (
                  <IonList>
                    {getAllPassages().map((passageInfo, index) => (
                      <IonItem 
                        key={index}
                        button 
                        routerLink={`/study/${study.slug}/passage/${index + 1}`}
                        routerDirection="forward"
                        onClick={() => popoverRef.current?.dismiss()}
                      >
                        <IonLabel color="primary">{passageInfo.passage}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                )}
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        
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
                {getAllPassages().length > 0 && (
                  <div className="ion-margin-bottom">
                    <p>
                      {getAllPassages().map((passageInfo, index) => (
                        <span key={passageInfo.passage}>
                          <IonRouterLink
                            routerLink={`/study/${study.slug}/passage/${
                              index + 1
                            }`}
                            style={{ textDecoration: "none" }}
                          >
                            {passageInfo.passage}
                          </IonRouterLink>
                          {index < getAllPassages().length - 1 && " · "}
                        </span>
                      ))}
                    </p>
                  </div>
                )}

                <ReactMarkdown>{study.summary}</ReactMarkdown>
              </IonText>
            </IonRow>

            {showLeadersNotes && (
              <>
                <IonRow className="ion-padding-horizontal">
                  <IonText>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h3>Leaders Notes</h3>
                      <IonButton 
                        fill="clear" 
                        size="small"
                        onClick={() => copyToClipboard(study.leadersInfo.notes, 'notes')}
                      >
                        <IonIcon icon={copyOutline} />
                        {copiedSection === 'notes' ? ' Copied!' : ''}
                      </IonButton>
                    </div>
                    <ReactMarkdown>{study.leadersInfo.notes}</ReactMarkdown>
                  </IonText>
                </IonRow>
                <IonRow className="ion-padding-horizontal">
                  <IonText>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h4>What</h4>
                      <IonButton 
                        fill="clear" 
                        size="small"
                        onClick={() => copyToClipboard(study.leadersInfo.what, 'what')}
                      >
                        <IonIcon icon={copyOutline} />
                        {copiedSection === 'what' ? ' Copied!' : ''}
                      </IonButton>
                    </div>
                    <ReactMarkdown>{study.leadersInfo.what}</ReactMarkdown>
                  </IonText>
                </IonRow>
                <IonRow className="ion-padding-horizontal">
                  <IonText>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h4>So What</h4>
                      <IonButton 
                        fill="clear" 
                        size="small"
                        onClick={() => copyToClipboard(study.leadersInfo.soWhat, 'sowhat')}
                      >
                        <IonIcon icon={copyOutline} />
                        {copiedSection === 'sowhat' ? ' Copied!' : ''}
                      </IonButton>
                    </div>
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

                {study.questions.map((block, blockIndex) => {
                  // Handle markdown string blocks
                  if (typeof block === "string") {
                    return (
                      <div
                        key={`markdown-${blockIndex}`}
                        className="ion-margin-vertical"
                      >
                        <ReactMarkdown>{block}</ReactMarkdown>
                      </div>
                    );
                  }

                  // Handle QuestionSection blocks
                  const questionSection = block;
                  
                  // Create text content for copying (questions only, no leader hints)
                  const questionsText = questionSection.questions
                    .map((qa, index) => `${index + 1}. ${qa.question}`)
                    .join('\n');
                  
                  return (
                    <div key={questionSection.title}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        {questionSection.passages.length > 0 ? (
                          <h4 style={{ margin: 0 }}>
                            <IonRouterLink
                              routerLink={`/study/${study.slug}/passage/${blockIndex}`}
                            >
                              {questionSection.title}
                            </IonRouterLink>
                          </h4>
                        ) : (
                          <h4 style={{ margin: 0 }}>{questionSection.title}</h4>
                        )}
                        {showLeadersNotes && (
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => copyToClipboard(questionsText, `questions-${blockIndex}`)}
                          >
                            <IonIcon icon={copyOutline} />
                            {copiedSection === `questions-${blockIndex}` ? ' Copied!' : ''}
                          </IonButton>
                        )}
                      </div>
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
                              {showLeadersNotes && question_and_answer.refs && question_and_answer.refs.length > 0 && (
                                <div
                                  className="ion-padding-start ion-margin-top"
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                  }}
                                >
                                  <IonText color="medium" style={{ fontSize: "0.8em" }}>
                                    <strong>Verse refs:</strong> {question_and_answer.refs.join(", ")}
                                  </IonText>
                                </div>
                              )}
                              {showLeadersNotes &&
                                question_and_answer.leadersHint && (
                                  <div
                                    className="ion-padding-start ion-margin-top"
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                    }}
                                  >
                                    <IonIcon
                                      icon={bulbOutline}
                                      style={{
                                        marginTop: "2px",
                                        flexShrink: 0,
                                      }}
                                      color="primary"
                                    />
                                    <IonText color={"medium"}>
                                      <em>{question_and_answer.leadersHint}</em>
                                    </IonText>
                                  </div>
                                )}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  );
                })}
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
