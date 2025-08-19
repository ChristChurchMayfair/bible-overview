import type { ScheduleEntry } from '../data/types';

type CsvScheduleRow = {
  weekStarting: string;
  hasStudy: boolean;
  notes?: string;
};

export function parseCsvRows(csvContent: string): CsvScheduleRow[] {
  const lines = csvContent.trim().split('\n');
  const rows = lines.slice(1); // Skip header row
  
  return rows.map(row => {
    const [weekStarting, hasStudyStr, notes] = row.split(',');
    return {
      weekStarting: weekStarting.trim(),
      hasStudy: hasStudyStr.trim() === 'Yes',
      notes: notes?.trim() || undefined
    };
  });
}

export function convertToScheduleEntries(csvRows: CsvScheduleRow[]): ScheduleEntry[] {
  let studyCounter = 1;
  return csvRows.map(row => ({
    weekStarting: row.weekStarting,
    studyNumber: row.hasStudy ? studyCounter++ : undefined,
    notes: row.notes
  }));
}

export function parseScheduleCsv(csvContent: string): ScheduleEntry[] {
  const csvRows = parseCsvRows(csvContent);
  return convertToScheduleEntries(csvRows);
}