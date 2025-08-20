import {
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import type { ScheduleEntry, StudyStub } from "../data/types";

interface WeekItemProps {
  week: ScheduleEntry;
  study?: StudyStub;
  isCurrentWeek: boolean;
  note?: string;
  meetingDay?: number | null;
}

const WeekItem: React.FC<WeekItemProps> = ({ week, study, isCurrentWeek, note, meetingDay = null }) => {
  const history = useHistory();

  const formatDate = (dateString: string) => {
    const weekStart = new Date(dateString);
    
    // For prayer meetings, always use Wednesday (3)
    // For studies, use the user's preferred meeting day (default to Monday if null - week commencing)
    const isPrayerMeeting = week.notes?.toLowerCase().includes('prayer meeting');
    const targetDay = isPrayerMeeting ? 3 : (meetingDay ?? 1);
    
    // Calculate the meeting date based on the target day
    // weekStart is Monday (1), so adjust accordingly
    const daysToAdd = targetDay === 0 ? 6 : targetDay - 1; // Sunday is 0, but we want it to be 6 days after Monday
    const meetingDate = new Date(weekStart);
    meetingDate.setDate(weekStart.getDate() + daysToAdd);
    
    const day = meetingDate.getDate();
    const dayOfWeek = isPrayerMeeting ? meetingDate.toLocaleDateString("en-GB", { weekday: "short" }) : 
                      (meetingDay === null ? "w/c" : meetingDate.toLocaleDateString("en-GB", { weekday: "short" }));
    
    return { dayOfWeek, dayWithSuffix: `${day}` };
  };

  const goToStudy = () => {
    if (week.studyNumber && study) {
      history.push(`/study/${study.slug}`);
    }
  };

  const hasValidStudy = !!(week.studyNumber && study);
  const dateInfo = formatDate(week.weekStarting);

  return (
    <IonItem 
      button={hasValidStudy}
      onClick={hasValidStudy ? goToStudy : undefined}
      color={isCurrentWeek ? "primary" : undefined}
    >
      <IonLabel slot="start" color={"medium"}>
        <div style={{ textAlign: "center", fontSize: "0.75rem", lineHeight: "1.1" }}>
          <div style={{ fontWeight: "400", opacity: "0.7", color: "var(--ion-text-color-step-400)" }}>{dateInfo.dayOfWeek}</div>
          <div style={{ fontWeight: "600", fontSize: "1.5rem" }}>{dateInfo.dayWithSuffix}</div>
        </div>
      </IonLabel>
      <IonLabel style={{ color: hasValidStudy ? "var(--ion-text-color)" : "var(--ion-text-color-step-600)" }}>
        {study?.title ?? week.notes ?? "Study details coming soon"}
      </IonLabel>
    </IonItem>
  );
};

export default WeekItem;