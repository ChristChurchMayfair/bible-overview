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
  documentTextOutline,
  helpCircleOutline,
  listOutline,
  personOutline,
} from "ionicons/icons";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../constants/storage";
import { getPassagesFromStudy, getStudy } from "../data/studies";
import { FullStudy, isFullStudy, isQuestion, isMarkdownContent } from "../data/types";
import { StudyQuestion } from "../components/StudyQuestion";
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

  // Scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
      popoverRef.current?.dismiss();
    }
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
            <IonButton mode="ios" id="navigation-trigger">
              Jump to
            </IonButton>
            <IonPopover 
              ref={popoverRef} 
              trigger="navigation-trigger" 
              triggerAction="click"
              className="navigation-popover"
            >
              <IonContent>
                {study && (
                  <IonList>
                    <IonItem button onClick={() => scrollToSection('summary')}>
                      <IonIcon icon={documentTextOutline} slot="start" size="small" />
                      <IonLabel>Summary</IonLabel>
                    </IonItem>
                    
                    {showLeadersNotes && (
                      <IonItem button onClick={() => scrollToSection('leaders-notes')}>
                        <IonIcon icon={personOutline} slot="start" size="small" />
                        <IonLabel>Leader's Notes</IonLabel>
                      </IonItem>
                    )}
                    
                    <IonItem button onClick={() => scrollToSection('questions')}>
                      <IonIcon icon={helpCircleOutline} slot="start" size="small" />
                      <IonLabel>Questions</IonLabel>
                    </IonItem>
                    
                    {getAllPassages().length > 0 && (
                      <>
                        <IonItem>
                          <IonLabel>
                            <h3>Bible Passages</h3>
                          </IonLabel>
                        </IonItem>
                        {getAllPassages().map((passageInfo, index) => (
                          <IonItem 
                            key={index}
                            button 
                            routerLink={`/study/${study.slug}/passage/${index + 1}`}
                            routerDirection="forward"
                            onClick={() => popoverRef.current?.dismiss()}
                          >
                            <IonIcon icon={bookOutline} slot="start" size="small" />
                            <IonLabel color="primary">{passageInfo.passage}</IonLabel>
                          </IonItem>
                        ))}
                      </>
                    )}
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
            <IonRow className="ion-padding-horizontal" id="summary">
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

                <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.summary}</ReactMarkdown>
              </IonText>
            </IonRow>

            {showLeadersNotes && (
              <>
                <IonRow className="ion-padding-horizontal" id="leaders-notes">
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.leadersInfo.notes}</ReactMarkdown>
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.leadersInfo.what}</ReactMarkdown>
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{study.leadersInfo.soWhat}</ReactMarkdown>
                  </IonText>
                </IonRow>
              </>
            )}
            <IonRow className="ion-padding-horizontal" id="questions">
              <IonText>
                <h1 id="questions-title" style={{ marginBottom: '1rem' }}>Questions</h1>
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{block}</ReactMarkdown>
                      </div>
                    );
                  }

                  // Handle QuestionSection blocks
                  const questionSection = block;
                  
                  // Create text content for copying (questions only, no leader hints)
                  let questionIndex = 0;
                  const questionsText = questionSection.content
                    .filter(isQuestion)
                    .map((question) => `${++questionIndex}. ${question.question}`)
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
                      {(() => {
                        let questionIndex = 0;
                        const elements: JSX.Element[] = [];
                        let currentQuestions: JSX.Element[] = [];
                        
                        const flushQuestions = () => {
                          if (currentQuestions.length > 0) {
                            elements.push(
                              <ul key={`questions-${elements.length}`}>
                                {currentQuestions}
                              </ul>
                            );
                            currentQuestions = [];
                          }
                        };

                        questionSection.content.forEach((item, index) => {
                          if (isQuestion(item)) {
                            // Add question to current batch
                            const currentQuestionIndex = questionIndex++;
                            currentQuestions.push(
                              <StudyQuestion
                                key={index}
                                question={item}
                                questionKey={`${questionSection.title}-${currentQuestionIndex}`}
                                isCompleted={completedQuestions[`${questionSection.title}-${currentQuestionIndex}`] || false}
                                onToggleComplete={() => toggleQuestion(questionSection.title, currentQuestionIndex)}
                                showLeaderHints={showLeadersNotes}
                              />
                            );
                          } else if (isMarkdownContent(item)) {
                            // Flush any pending questions first
                            flushQuestions();
                            // Add markdown content
                            elements.push(
                              <div
                                key={index}
                                className="ion-margin-vertical"
                              >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{item}</ReactMarkdown>
                              </div>
                            );
                          }
                        });

                        // Flush any remaining questions
                        flushQuestions();
                        
                        return <>{elements}</>;
                      })()}
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
