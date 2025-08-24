import type { ScheduleEntry, StudyStub } from '../data/types'

export type CalendarWeek = {
  weekStarting: string
  formattedDate: string
  dayOfWeek: string
  type: 'study' | 'other'
  studyNumber?: number
  studyTitle?: string
  notes?: string
}

export type CalendarMonth = {
  month: string
  weeks: CalendarWeek[]
}

export function transformScheduleToCalendar(
  scheduleEntries: ScheduleEntry[],
  studies: StudyStub[],
  meetingDay: number | null
): CalendarMonth[] {
  if (scheduleEntries.length === 0) {
    return []
  }

  const monthsMap = new Map<string, CalendarWeek[]>()

  scheduleEntries.forEach((entry) => {
    const weekStartDate = new Date(entry.weekStarting)
    
    // Calculate the actual meeting date based on the meeting day
    let meetingDate: Date
    if (meetingDay === null || meetingDay < 0 || meetingDay > 6) {
      // If meeting day is null/invalid, assume Wednesday (midweek) for month grouping purposes
      // This ensures meetings that logically happen in the following month are grouped correctly
      const currentDayOfWeek = weekStartDate.getDay()
      const defaultMeetingDay = 3 // Wednesday
      let daysToAdd = defaultMeetingDay - currentDayOfWeek
      if (daysToAdd < 0) {
        daysToAdd += 7
      }
      
      meetingDate = new Date(weekStartDate)
      meetingDate.setDate(weekStartDate.getDate() + daysToAdd)
    } else {
      // Calculate how many days to add to get to the meeting day
      const currentDayOfWeek = weekStartDate.getDay()
      let daysToAdd = meetingDay - currentDayOfWeek
      if (daysToAdd < 0) {
        daysToAdd += 7
      }
      
      meetingDate = new Date(weekStartDate)
      meetingDate.setDate(weekStartDate.getDate() + daysToAdd)
    }
    
    // Use the meeting date for month grouping
    const monthKey = meetingDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    
    const study = entry.studyNumber 
      ? studies.find(s => s.index === entry.studyNumber)
      : undefined

    const calendarWeek: CalendarWeek = {
      weekStarting: entry.weekStarting,
      formattedDate: formatDate(entry.weekStarting),
      dayOfWeek: getDayDisplayName(meetingDay),
      type: entry.studyNumber ? 'study' : 'other',
      studyNumber: entry.studyNumber,
      studyTitle: study?.title,
      notes: entry.notes
    }

    if (!monthsMap.has(monthKey)) {
      monthsMap.set(monthKey, [])
    }
    monthsMap.get(monthKey)!.push(calendarWeek)
  })

  return Array.from(monthsMap.entries()).map(([month, weeks]) => ({
    month,
    weeks
  }))
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

function getDayDisplayName(meetingDay: number | null): string {
  if (meetingDay === null || meetingDay < 0 || meetingDay > 6) {
    return 'w/c'
  }
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[meetingDay]
}