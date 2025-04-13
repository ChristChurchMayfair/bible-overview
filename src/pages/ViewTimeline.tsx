import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../components/localStorageKeys";
import { Study, TimelineEvent, getStudy } from "../data/studies";
import "./ViewTimeline.css";

function ViewTimeline() {
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

            <IonRow className="ion-padding-horizontal">
              <IonText><h2>{study.title} Timeline</h2></IonText>
            </IonRow>
            <IonRow className="ion-padding-horizontal">
              <div className="timeline">
                {study.timeline?.map((event, index) => (
                  <TimelineEventView key={index} first={index == 0} last={index == (study.timeline ?? []).length -1} event={event} />
                ))}
              </div>
            </IonRow>
          </>
        ) : (
          <div>Study not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewTimeline;

type TimelineEventProps = {
  event: TimelineEvent;
  first: boolean;
  last: boolean;
};

const TimelineEventView: React.FC<TimelineEventProps> = (props) => (
  <div className="event">
    <svg>
      <g transform="translate(15, 5)">
        {props.last !== true ? <line x1={0} y1={20} x2={0} y2={500} /> : <></>}
        {props.first == false ? <line x1={0} y1={-10} x2={0} y2={20}/> : <></>}
        <circle />
      </g>
    </svg>
    <div>
      <h3>
        {props.event.title} <span>{props.event.date}</span>
      </h3>
      <p>{props.event.details}</p>
    </div>
  </div>
);
