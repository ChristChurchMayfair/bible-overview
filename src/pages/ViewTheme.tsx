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
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  bookOutline,
  checkmarkCircleOutline,
  exitOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import {
  CompletedStudiesStorageKey,
  ShowLeadersNotesStorageKey,
} from "../components/localStorageKeys";
import { Study, getStudies, getStudy, getTheme } from "../data/studies";
import "./ViewStudy.css";

function ViewTheme() {
  const [theme, setTheme] = useState<{ name: string; description: string }>();
  const [relatedStudies, setRelatedStudies] = useState<Study[]>([]);
  const [completedStudies, setCompletedStudies, removeCompletedStudies] =
    useLocalStorage<number[]>(CompletedStudiesStorageKey, []);
  const params = useParams<{ name: string }>();

  const [showLeadersNotes, setShowLeadersNotes] = useLocalStorage<boolean>(
    ShowLeadersNotesStorageKey,
    false
  );

  useIonViewWillEnter(() => {
    const theme_ = getTheme(params.name);
    setTheme({ name: params.name, description: theme_ });
    const allStudies = getStudies();
    const relatedStudies_ = allStudies.filter((study) =>
      study.themes.includes(params.name)
    );
    setRelatedStudies(relatedStudies_);
  });

  return (
    <IonPage id="view-study-page">
      <IonHeader collapse="fade">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonBackButton
              mode="ios"
              text="Study"
              defaultHref="/home"
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{theme?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {theme ? (
          <>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle>{theme.name}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonItem>{theme.description}</IonItem>
            <IonItem>
              <IonText>
                <h3>Studies</h3>
                <IonList lines="full">
                  {relatedStudies.map((study) => (
                    <IonItem
                      lines="full"
                      routerLink={`/study/${study.index}`}
                      key={study.index}
                      detail={false}
                    >
                      <IonLabel slot="start">{study.title}</IonLabel>
                      <IonLabel slot="end">{study.passages[0]}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonText>
            </IonItem>
            {/* <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={bookOutline}
                color="primary"
                size="small"
              ></IonIcon>
              {study.passages.map((passage) => (
                <a
                  className="passageLink"
                  key={passage}
                  href={`https://www.biblegateway.com/passage/?search=${passage}&version=NIV`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {passage}
                </a>
              ))}
            </IonItem> */}
            {/* <IonItem>
              <IonText className="ion-padding">
                <p>{study.overview}</p>
              </IonText>
            </IonItem>
            <IonItem>
              {study.themes.map((theme) => (
                <IonChip key={theme} outline>
                  {theme}
                </IonChip>
              ))}
            </IonItem>
            {showLeadersNotes && (
              <IonItem>
                <IonText className="ion-padding">
                  <h3>Leaders Notes</h3>
                  <p>{study.leadersNotes ?? "No leaders notes available"}</p>
                </IonText>
              </IonItem>
            )}
            <IonItem>
              <IonText className="ion-padding">
                <h3>Questions</h3>

                <ol>
                  {study.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ol>
              </IonText>
            </IonItem>
            <IonItem>
              <IonText>
                <h1>Additional Resources</h1>
                <IonList>
                  {study.additionalResources?.map((reading) => (
                    <IonItem key={reading.url}>
                        <a href={reading.url} target="_blank" rel="noreferrer">
                        {reading.title} - {reading.author}
                        <IonIcon
                          icon={exitOutline}
                          size="small"
                          style={{ marginLeft: "8px" }}
                        />
                        </a>
                    </IonItem>
                  ))}
                </IonList>
              </IonText>
            </IonItem>

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
              </IonButton> */}
            {/* )} */}
          </>
        ) : (
          <div>Study not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewTheme;
