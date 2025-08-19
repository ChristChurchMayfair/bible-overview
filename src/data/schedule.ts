import type { ScheduleEntry } from './types';
import scheduleData from './generated-schedule.json';

export function getSchedule(): ScheduleEntry[] {
  return scheduleData as ScheduleEntry[];
}

export function getStudyForWeek(weekStarting: string): number | null {
  const schedule = getSchedule();
  const entry = schedule.find(entry => entry.weekStarting === weekStarting);
  return entry?.studyNumber || null;
}

export function getWeekForStudy(studyNumber: number): string | null {
  const schedule = getSchedule();
  const entry = schedule.find(entry => entry.studyNumber === studyNumber);
  return entry?.weekStarting || null;
}

export function getCurrentWeekEntry(): ScheduleEntry | null {
  const schedule = getSchedule();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  // Find the current or most recent week
  let currentEntry = null;
  for (const entry of schedule) {
    if (entry.weekStarting <= todayStr) {
      currentEntry = entry;
    } else {
      break;
    }
  }
  
  return currentEntry;
}

export function getScheduleByMonth(): { month: string; weeks: ScheduleEntry[] }[] {
  const schedule = getSchedule();
  const monthMap = new Map<string, ScheduleEntry[]>();
  
  schedule.forEach(entry => {
    const date = new Date(entry.weekStarting);
    const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, []);
    }
    monthMap.get(monthKey)!.push(entry);
  });
  
  return Array.from(monthMap.entries()).map(([month, weeks]) => ({
    month,
    weeks
  }));
}

export function getScheduleStats() {
  const schedule = getSchedule();
  return {
    totalWeeks: schedule.length,
    studyWeeks: schedule.filter(entry => entry.studyNumber).length,
    breakWeeks: schedule.filter(entry => !entry.studyNumber).length,
    totalStudies: Math.max(...schedule.filter(entry => entry.studyNumber).map(entry => entry.studyNumber!))
  };
}