import {
  IonIcon,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { bulbOutline } from "ionicons/icons";
import classNames from "classnames";
import { useState } from "react";
import { Question } from "../data/types";
import { usePassageHtml } from "../hooks/usePassageHtml";

interface StudyQuestionProps {
  question: Question;
  questionKey: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  showLeaderHints: boolean;
}

export function StudyQuestion({
  question,
  questionKey,
  isCompleted,
  onToggleComplete,
  showLeaderHints,
}: StudyQuestionProps) {
  const [expandedPassages, setExpandedPassages] = useState(false);
  const { passages, loading, errors, fetchPassage } = usePassageHtml();

  const togglePassages = () => {
    const isExpanding = !expandedPassages;
    setExpandedPassages(isExpanding);

    // Fetch passages when expanding
    if (isExpanding) {
      question.refs.forEach((ref) => fetchPassage(ref));
    }
  };

  // Function to make verse references clickable in question text
  const renderQuestionWithClickableRefs = (questionText: string) => {
    if (!question.detectedRefs || question.detectedRefs.length === 0) {
      return questionText;
    }

    let processedText = questionText;

    // Replace each detected reference with clickable version
    question.detectedRefs.forEach(({ originalText }) => {
      const regex = new RegExp(originalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      processedText = processedText.replace(regex, (match) => {
        return `<span class="verse-reference-clickable">${match}</span>`;
      });
    });

    return (
      <span
        dangerouslySetInnerHTML={{ __html: processedText }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('verse-reference-clickable')) {
            e.stopPropagation();
            togglePassages();
          }
        }}
      />
    );
  };

  return (
    <li
      className={classNames(
        "ion-padding-bottom",
        isCompleted && "completed"
      )}
      onClick={onToggleComplete}
    >
      {question.detectedRefs && question.detectedRefs.length > 0 ? (
        renderQuestionWithClickableRefs(question.question)
      ) : (
        question.question
      )}
      
      {/* Expanded verse display */}
      {expandedPassages && question.refs && question.refs.length > 0 && (
        <div
          className="ion-padding-start ion-margin-top"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              background: "var(--ion-color-step-50)",
              border: "1px solid var(--ion-color-step-150)",
              padding: "8px",
              marginTop: "8px",
              borderRadius: "8px",
              fontSize: "0.9em",
            }}
          >
            {question.refs.map((ref) => (
              <div key={ref} style={{ marginBottom: "8px" }}>
                {loading[ref] && (
                  <div style={{ textAlign: "center", padding: "8px" }}>
                    <IonSpinner />
                  </div>
                )}
                {errors[ref] && (
                  <IonText color="danger">
                    <p style={{ fontSize: "0.8em", margin: "4px 0" }}>
                      Error loading {ref}: {errors[ref]}
                    </p>
                  </IonText>
                )}
                {passages[ref] && (
                  <div dangerouslySetInnerHTML={{ __html: passages[ref] }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Leader hints */}
      {showLeaderHints && question.leadersHint && (
        <div
          className="ion-margin-top"
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
          <IonText>
            <em>{question.leadersHint}</em>
          </IonText>
        </div>
      )}
    </li>
  );
}