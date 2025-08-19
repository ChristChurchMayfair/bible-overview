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
  note?: string
}

const WeekItem: React.FC<WeekItemProps> = ({ week, study, isCurrentWeek, note }) => {
  const history = useHistory();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    
    // Add ordinal suffix
    const suffix = (day: number) => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${suffix(day)}`;
  };

  const goToStudy = () => {
    if (week.studyNumber && study) {
      history.push(`/study/${study.slug}`);
    }
  };

  const hasValidStudy = !!(week.studyNumber && study);

  return (
    <IonItem 
      button={hasValidStudy}
      onClick={hasValidStudy ? goToStudy : undefined}
      color={isCurrentWeek ? "primary" : undefined}
    >
      <IonLabel slot="start" color={"medium"}>
          {formatDate(week.weekStarting)}
      </IonLabel>
      <IonLabel color={hasValidStudy ? "light" : "medium"}>
        {study?.title ?? week.notes ?? "Study details coming soon"}
      </IonLabel>
    </IonItem>
  );
};

export default WeekItem;