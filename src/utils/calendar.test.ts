import { describe, it, expect } from 'vitest'
import { transformScheduleToCalendar } from './calendar'
import type { ScheduleEntry, StudyStub } from '../data/types'

describe('transformScheduleToCalendar', () => {
  it('should transform schedule entries into calendar months structure', () => {
    const scheduleEntries: ScheduleEntry[] = [
      { weekStarting: '2025-01-05', studyNumber: 1, notes: 'New year start' },
      { weekStarting: '2025-01-12', studyNumber: 2 },
      { weekStarting: '2025-01-19', notes: 'Prayer meeting' },
      { weekStarting: '2025-02-02', studyNumber: 3 }
    ]
    
    const studies: StudyStub[] = [
      { index: 1, title: 'Genesis', slug: 'genesis', summary: 'First book' },
      { index: 2, title: 'Exodus', slug: 'exodus', summary: 'Second book' },
      { index: 3, title: 'Leviticus', slug: 'leviticus', summary: 'Third book' }
    ]
    
    const meetingDay = 0 // Sunday
    
    const result = transformScheduleToCalendar(scheduleEntries, studies, meetingDay)
    
    expect(result).toHaveLength(2) // January and February
    
    // Check January
    expect(result[0].month).toBe('January 2025')
    expect(result[0].weeks).toHaveLength(3)
    
    expect(result[0].weeks[0]).toEqual({
      weekStarting: '2025-01-05',
      formattedDate: '5 Jan',
      dayOfWeek: 'Sunday',
      type: 'study',
      studyNumber: 1,
      studyTitle: 'Genesis',
      notes: 'New year start'
    })
    
    expect(result[0].weeks[1]).toEqual({
      weekStarting: '2025-01-12',
      formattedDate: '12 Jan',
      dayOfWeek: 'Sunday',
      type: 'study',
      studyNumber: 2,
      studyTitle: 'Exodus',
      notes: undefined
    })
    
    expect(result[0].weeks[2]).toEqual({
      weekStarting: '2025-01-19',
      formattedDate: '19 Jan',
      dayOfWeek: 'Sunday',
      type: 'other',
      studyNumber: undefined,
      studyTitle: undefined,
      notes: 'Prayer meeting'
    })
    
    // Check February
    expect(result[1].month).toBe('February 2025')
    expect(result[1].weeks).toHaveLength(1)
    
    expect(result[1].weeks[0]).toEqual({
      weekStarting: '2025-02-02',
      formattedDate: '2 Feb',
      dayOfWeek: 'Sunday',
      type: 'study',
      studyNumber: 3,
      studyTitle: 'Leviticus',
      notes: undefined
    })
  })
  
  it('should handle different meeting days', () => {
    const scheduleEntries: ScheduleEntry[] = [
      { weekStarting: '2025-01-06', studyNumber: 1 } // Monday
    ]
    
    const studies: StudyStub[] = [
      { index: 1, title: 'Genesis', slug: 'genesis', summary: 'First book' }
    ]
    
    const meetingDay = 1 // Monday
    
    const result = transformScheduleToCalendar(scheduleEntries, studies, meetingDay)
    
    expect(result[0].weeks[0].dayOfWeek).toBe('Monday')
  })
  
  it('should handle null meeting day', () => {
    const scheduleEntries: ScheduleEntry[] = [
      { weekStarting: '2025-01-06', studyNumber: 1 }
    ]
    
    const studies: StudyStub[] = [
      { index: 1, title: 'Genesis', slug: 'genesis', summary: 'First book' }
    ]
    
    const meetingDay = null
    
    const result = transformScheduleToCalendar(scheduleEntries, studies, meetingDay)
    
    expect(result[0].weeks[0].dayOfWeek).toBe('w/c')
  })
  
  it('should handle empty schedule', () => {
    const result = transformScheduleToCalendar([], [], null)
    
    expect(result).toEqual([])
  })
  
  it('should handle schedule with no matching studies', () => {
    const scheduleEntries: ScheduleEntry[] = [
      { weekStarting: '2025-01-05', studyNumber: 99 } // Non-existent study
    ]
    
    const studies: StudyStub[] = []
    const meetingDay = 0
    
    const result = transformScheduleToCalendar(scheduleEntries, studies, meetingDay)
    
    expect(result[0].weeks[0]).toEqual({
      weekStarting: '2025-01-05',
      formattedDate: '5 Jan',
      dayOfWeek: 'Sunday',
      type: 'study',
      studyNumber: 99,
      studyTitle: undefined,
      notes: undefined
    })
  })
  
  it('should group weeks by the correct month when meeting day affects the actual meeting date', () => {
    // Test case: week starting Sunday 29th Sept, but meeting day is Wednesday (2nd Oct)
    // This should be grouped under October, not September
    const scheduleEntries: ScheduleEntry[] = [
      { weekStarting: '2025-09-28', notes: 'Prayer meeting' }, // Sunday 28th Sept, Wednesday would be 1st Oct
      { weekStarting: '2025-09-29', notes: 'Another prayer meeting' } // Monday 29th Sept, Wednesday would be 1st Oct
    ]
    
    const studies: StudyStub[] = []
    const meetingDay = 3 // Wednesday
    
    const result = transformScheduleToCalendar(scheduleEntries, studies, meetingDay)
    
    // Both weeks should be in October because the actual meeting dates are in October
    expect(result).toHaveLength(1)
    expect(result[0].month).toBe('October 2025')
    expect(result[0].weeks).toHaveLength(2)
    
    expect(result[0].weeks[0]).toEqual({
      weekStarting: '2025-09-28',
      formattedDate: '28 Sept',
      dayOfWeek: 'Wednesday', 
      type: 'other',
      studyNumber: undefined,
      studyTitle: undefined,
      notes: 'Prayer meeting'
    })
    
    expect(result[0].weeks[1]).toEqual({
      weekStarting: '2025-09-29',
      formattedDate: '29 Sept',
      dayOfWeek: 'Wednesday',
      type: 'other', 
      studyNumber: undefined,
      studyTitle: undefined,
      notes: 'Another prayer meeting'
    })
  })

  it('should group weeks correctly when meetingDay is null (w/c option) and meeting falls in next month', () => {
    // Real bug: week starting Sept 28th with notes 'Prayer meeting' for Oct 1st
    // should be grouped under October, not September, even when meetingDay is null
    const scheduleEntries: ScheduleEntry[] = [
      { weekStarting: '2025-09-28', notes: 'Prayer meeting' }, // Week starting Sunday Sept 28th
      { weekStarting: '2025-10-05', notes: 'Another meeting' } // Week starting Sunday Oct 5th
    ]
    
    const studies: StudyStub[] = []
    const meetingDay = null // "w/c" option
    
    const result = transformScheduleToCalendar(scheduleEntries, studies, meetingDay)
    
    // The prayer meeting for Oct 1st should be grouped under October, not September
    expect(result).toHaveLength(1) // Both weeks grouped under October
    expect(result[0].month).toBe('October 2025')
    expect(result[0].weeks).toHaveLength(2)
    
    expect(result[0].weeks[0]).toEqual({
      weekStarting: '2025-09-28',
      formattedDate: '28 Sept',
      dayOfWeek: 'w/c',
      type: 'other',
      studyNumber: undefined,
      studyTitle: undefined,
      notes: 'Prayer meeting'
    })
    
    expect(result[0].weeks[1]).toEqual({
      weekStarting: '2025-10-05',
      formattedDate: '5 Oct',
      dayOfWeek: 'w/c',
      type: 'other',
      studyNumber: undefined,
      studyTitle: undefined,
      notes: 'Another meeting'
    })
  })
})