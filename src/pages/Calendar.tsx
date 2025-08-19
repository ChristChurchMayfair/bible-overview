import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { Menu } from "../components/Menu";
import WeekItem from "../components/WeekItem";
import { AppTitle } from "../constants/app";
import {
  getScheduleByMonth,
  getCurrentWeekEntry,
  getScheduleStats,
} from "../data/schedule";
import { getStudies } from "../data/studies";
import type { ScheduleEntry, StudyStub } from "../data/types";
import "./Calendar.css";
import { helpOutline } from "ionicons/icons";

const Calendar: React.FC = () => {
  const [scheduleByMonth, setScheduleByMonth] = useState<
    { month: string; weeks: ScheduleEntry[] }[]
  >([]);
  const [currentWeek, setCurrentWeek] = useState<ScheduleEntry | null>(null);
  const [stats, setStats] = useState<{
    totalWeeks: number;
    studyWeeks: number;
    breakWeeks: number;
    totalStudies: number;
  } | null>(null);
  const [studies, setStudies] = useState<StudyStub[]>([]);

  useIonViewWillEnter(() => {
    setScheduleByMonth(getScheduleByMonth());
    setCurrentWeek(getCurrentWeekEntry());
    setStats(getScheduleStats());
    setStudies(getStudies());
  });

  const getStudyForNumber = (studyNumber: number): StudyStub | undefined => {
    return studies.find((study) => study.index === studyNumber);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const isCurrentWeek = (weekStarting: string): boolean => {
    return currentWeek?.weekStarting === weekStarting;
  };

  return (
    <>
      <Menu />
      <IonPage id="home-page">
        <IonHeader collapse="fade">
          <IonToolbar mode="ios">
            <IonButtons slot="start">
              <IonMenuButton mode="ios" />
            </IonButtons>
            <IonTitle>Year View</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink={`/help`} mode="ios">
                    <IonIcon icon={helpOutline} />
                  </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>Year View</IonTitle>
            </IonToolbar>
          </IonHeader>

          {stats && (
            <div className="ion-padding">
              <div className="calendar-stats">
                <h2>DG Year 2025-26</h2>
                <div className="stats-grid">
                  <span>
                    {stats.totalWeeks} weeks • {stats.studyWeeks} studies
                  </span>
                </div>
                {currentWeek && (
                  <div className="current-week-info">
                    <h3>Current Week</h3>
                    <p>
                      Week of {formatDate(currentWeek.weekStarting)} -
                      {currentWeek.studyNumber
                        ? ` Study ${currentWeek.studyNumber}: ${
                            getStudyForNumber(currentWeek.studyNumber)?.title ||
                            "Unknown"
                          }`
                        : ` ${currentWeek.notes || "Break week"}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
         
            {scheduleByMonth.map((monthData, monthIndex) => (
              <IonList inset key={monthIndex}>
                <IonItem lines="none">
                  <IonLabel>
                    <h1>{monthData.month}</h1>
                  </IonLabel>
                </IonItem>

                {monthData.weeks.map((week, weekIndex) => (
                  <WeekItem
                    key={weekIndex}
                    week={week}
                    study={
                      week.studyNumber
                        ? getStudyForNumber(week.studyNumber)
                        : undefined
                    }
                    isCurrentWeek={isCurrentWeek(week.weekStarting)}
                  />
                ))}
              </IonList>
            ))}

          <div className="ion-padding">
            <p className="ion-text-center">
              <small>This schedule is subject to adjustment</small>
            </p>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Calendar;
