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
import { Study, TimelineEntry, getStudy } from "../data/studies";
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
              defaultHref="/"
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
              <IonText>
                <h2>{study.title} Timeline</h2>
              </IonText>
            </IonRow>
            <IonRow className="ion-padding-horizontal">
              <div className="timeline">
                {study.timeline?.map((event, index) => (
                  <TimelineEventView
                    key={index}
                    first={index == 0}
                    last={index == (study.timeline ?? []).length - 1}
                    event={event}
                  />
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
  event: TimelineEntry;
  first: boolean;
  last: boolean;
};

const TimelineEventView: React.FC<TimelineEventProps> = (props) => (
  <div className="event">
    <svg>
      <g transform="translate(15, 5)">
        {props.last !== true ||
        (props.event.type === "Period" &&
          typeof props.event.duration === "number") ? (
          <line x1={0} y1={20} x2={0} y2={500} stroke="green" />
        ) : (
          <></>
        )}
        {props.event.type === "Period" &&
        props.event.duration === "Infinite" &&
        props.last === true ? (
          <>
            <line x1={0} y1={20} x2={0} y2={400} stroke="green" />
            <line x1={0} y1={500} x2={-10} y2={490} stroke="green" />
          </>
        ) : (
          <></>
        )}
        {props.first == false ? <line x1={0} y1={-10} x2={0} y2={20} /> : <></>}
        {props.event.type === "Event" && props.event.subType === "Major" ? (
          <circle />
        ) : (
          <></>
        )}
        {props.event.type === "Event" && props.event.subType === "Minor" ? (
          <line x1={0} y1={24} x2={10} y2={24} />
        ) : (
          <></>
        )}
        {/* {props.event.type === "IndeterminatePeriod" ? <line x1={0} y1={20} x2={0} y2={5}/> : <></>} */}
      </g>
    </svg>
    <div>
      <h3>{props.event.title}</h3>
      <p>{props.event.details}</p>
      <p>{props.event.type}</p>
      <p>{props.event.type === "Period" ? props.event.duration : ""}</p>
    </div>
  </div>
);
