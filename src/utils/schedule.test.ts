import { describe, it, expect } from 'vitest'
import { parseScheduleCsv, parseCsvRows, convertToScheduleEntries } from './schedule'

describe('parseCsvRows', () => {
  it('should parse CSV rows into intermediate format', () => {
    const csvContent = `Week Starting,Has Study,Notes
2025-09-07,Yes,New academic year begins`
    
    const result = parseCsvRows(csvContent)
    
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      weekStarting: '2025-09-07',
      hasStudy: true,
      notes: 'New academic year begins'
    })
  })

  it('should parse multiple CSV rows with Yes and No values', () => {
    const csvContent = `Week Starting,Has Study,Notes
2025-09-07,Yes,New academic year begins
2025-09-14,Yes,
2025-09-21,No,Half term break`
    
    const result = parseCsvRows(csvContent)
    
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual({
      weekStarting: '2025-09-07',
      hasStudy: true,
      notes: 'New academic year begins'
    })
    expect(result[1]).toEqual({
      weekStarting: '2025-09-14',
      hasStudy: true,
      notes: undefined
    })
    expect(result[2]).toEqual({
      weekStarting: '2025-09-21',
      hasStudy: false,
      notes: 'Half term break'
    })
  })
})

describe('convertToScheduleEntries', () => {
  it('should convert CSV rows to schedule entries with study numbers', () => {
    const csvRows = [
      { weekStarting: '2025-09-07', hasStudy: true, notes: 'New academic year begins' },
      { weekStarting: '2025-09-14', hasStudy: true, notes: undefined },
      { weekStarting: '2025-09-21', hasStudy: false, notes: 'Half term break' },
      { weekStarting: '2025-09-28', hasStudy: true, notes: undefined }
    ];
    
    const result = convertToScheduleEntries(csvRows);
    
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      weekStarting: '2025-09-07',
      studyNumber: 1,
      notes: 'New academic year begins'
    });
    expect(result[1]).toEqual({
      weekStarting: '2025-09-14',
      studyNumber: 2,
      notes: undefined
    });
    expect(result[2]).toEqual({
      weekStarting: '2025-09-21',
      studyNumber: undefined,
      notes: 'Half term break'
    });
    expect(result[3]).toEqual({
      weekStarting: '2025-09-28',
      studyNumber: 3,
      notes: undefined
    });
  })
})

describe('parseScheduleCsv', () => {
  it('should parse simple CSV content into schedule entries', () => {
    const csvContent = `Week Starting,Has Study,Notes
2025-09-07,Yes,New academic year begins`
    
    const result = parseScheduleCsv(csvContent)
    
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      weekStarting: '2025-09-07',
      studyNumber: 1,
      notes: 'New academic year begins'
    })
  })
})