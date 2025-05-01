import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
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
import { Study, getStudies, getTheme } from "../data/studies";
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
              text="Studies"
              defaultHref="/"
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
          </>
        ) : (
          <div>Study not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewTheme;
