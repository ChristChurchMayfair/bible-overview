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
  IonRefresher,
  IonRefresherContent,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Menu } from "../components/Menu";
import WeekItem from "../components/WeekItem";
import { AppTitle } from "../constants/app";
import { MeetingDayStorageKey } from "../constants/storage";
import {
  getScheduleByMonth,
  getCurrentWeekEntry,
  getScheduleStats,
} from "../data/schedule";
import { getStudies } from "../data/studies";
import type { ScheduleEntry } from "../data/types";
import { transformScheduleToCalendar, type CalendarMonth } from "../utils/calendar";
import "./Calendar.css";
import { helpOutline } from "ionicons/icons";

const Calendar: React.FC = () => {
  const [calendarData, setCalendarData] = useState<CalendarMonth[]>([]);
  const [currentWeek, setCurrentWeek] = useState<ScheduleEntry | null>(null);
  const [stats, setStats] = useState<{
    totalWeeks: number;
    studyWeeks: number;
    breakWeeks: number;
    totalStudies: number;
  } | null>(null);
  
  const [meetingDay] = useLocalStorage<number | null>(MeetingDayStorageKey, null);

  useIonViewWillEnter(() => {
    const scheduleByMonth = getScheduleByMonth(meetingDay);
    const studies = getStudies();
    const allScheduleEntries = scheduleByMonth.flatMap(month => month.weeks);
    
    setCalendarData(transformScheduleToCalendar(allScheduleEntries, studies, meetingDay));
    setCurrentWeek(getCurrentWeekEntry());
    setStats(getScheduleStats());
  });

  const isCurrentWeek = (weekStarting: string): boolean => {
    return currentWeek?.weekStarting === weekStarting;
  };

  const handleRefresh = () => {
    window.location.reload();
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
            <IonTitle>Year Overview</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink={`/help`} mode="ios">
                    <IonIcon icon={helpOutline} />
                  </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>Year Overview</IonTitle>
            </IonToolbar>
          </IonHeader>

          {stats && (
            <div className="ion-padding">
              <div className="calendar-stats">
                <div className="stats-grid">
                  <span>
                    {stats.totalWeeks} weeks • {stats.studyWeeks} studies
                  </span>
                </div>
                {meetingDay === null ? (
                  <p className="ion-text-center" style={{ margin: "0.5rem 0" }}>
                    <small><IonRouterLink routerLink="/settings" style={{ textDecoration: "none" }}>Set your study day</IonRouterLink></small>
                  </p>
                ) : (
                  <p className="ion-text-center">
                    <small>Your DG day is <IonRouterLink routerLink="/settings" style={{ textDecoration: "none" }}>{meetingDay === null ? 'w/c' : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][meetingDay]}</IonRouterLink></small>
                  </p>
                )}
                {currentWeek && (
                  <div className="current-week-info">
                    <h3>Current Week</h3>
                    <p>
                      Week of {new Date(currentWeek.weekStarting).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })} -
                      {currentWeek.studyNumber
                        ? ` Study ${currentWeek.studyNumber}: ${
                            calendarData
                              .flatMap(month => month.weeks)
                              .find(week => week.studyNumber === currentWeek.studyNumber)?.studyTitle ||
                            "Unknown"
                          }`
                        : ` ${currentWeek.notes || "Break week"}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
         
            {calendarData.map((monthData, monthIndex) => (
              <IonList lines="full" key={monthIndex}>
                <IonItem lines="none">
                  <IonLabel>
                    <h1>{monthData.month}</h1>
                  </IonLabel>
                </IonItem>

                {monthData.weeks.map((week, weekIndex) => {
                  const scheduleEntry: ScheduleEntry = {
                    weekStarting: week.weekStarting,
                    studyNumber: week.studyNumber,
                    notes: week.notes
                  };
                  const study = week.studyTitle ? {
                    index: week.studyNumber!,
                    title: week.studyTitle,
                    slug: '',
                    summary: ''
                  } : undefined;
                  
                  return (
                    <WeekItem
                      key={weekIndex}
                      week={scheduleEntry}
                      study={study}
                      isCurrentWeek={isCurrentWeek(week.weekStarting)}
                      meetingDay={meetingDay}
                    />
                  );
                })}
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
