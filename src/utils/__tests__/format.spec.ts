import { describe, expect, it, vi } from 'vitest'
import {
  formatApiDate,
  formatBusinessDate,
  formatBusinessDateTime,
  formatBusinessTime,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatTime,
} from '../format'

describe('ERP formatters', () => {
  it('formats KES amounts and numbers consistently', () => {
    expect(formatCurrency(12500)).toBe('Ksh\u00a012,500')
    expect(formatCurrency('12500.5')).toBe('Ksh\u00a012,500.50')
    expect(formatNumber(12500.5)).toBe('12,500.5')
    expect(formatCurrency(null)).toBe('—')
    expect(formatNumber('invalid')).toBe('—')
  })

  it('uses the viewer’s timezone for events and keeps Kenya delivery times fixed', () => {
    try {
      vi.stubEnv('TZ', 'America/New_York')
      expect(formatDate('2026-11-18')).toBe('18 Nov 2026')
      expect(formatDate('2026-11-18T22:30:00Z')).toBe('18 Nov 2026')
      expect(formatDateTime('2026-11-18T22:30:00Z')).toBe('18 Nov 2026, 5:30 pm')
      expect(formatTime('2026-11-18T22:30:00Z')).toBe('5:30 pm')
      expect(formatApiDate('2026-11-18T22:30:00Z')).toBe('2026-11-18')

      vi.stubEnv('TZ', 'Europe/Amsterdam')
      expect(formatDate('2026-11-18')).toBe('18 Nov 2026')
      expect(formatDate('2026-11-18T22:30:00Z')).toBe('18 Nov 2026')
      expect(formatDateTime('2026-11-18T22:30:00Z')).toBe('18 Nov 2026, 11:30 pm')
      expect(formatApiDate('2026-11-18T22:30:00Z')).toBe('2026-11-18')

      expect(formatBusinessDate('2026-11-18T22:30:00Z')).toBe('2026-11-19')
      expect(formatBusinessDateTime('2026-11-18T22:30:00Z')).toBe('19 Nov 2026, 1:30 am')
      expect(formatBusinessTime('2026-11-18T22:30:00Z')).toBe('1:30 am')
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it('uses safe empty values for invalid dates', () => {
    expect(formatDate('not-a-date')).toBe('—')
    expect(formatDate('2026-02-31')).toBe('—')
    expect(formatDateTime(null)).toBe('—')
    expect(formatApiDate('not-a-date')).toBe('')
    expect(formatApiDate('2026-02-31')).toBe('')
  })
})
