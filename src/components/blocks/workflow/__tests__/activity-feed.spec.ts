import { expect, it, vi } from 'vitest'
import { dayLabel } from '../activity-feed'

it('labels the previous local calendar day across daylight saving changes', () => {
  vi.stubEnv('TZ', 'America/New_York')
  try {
    const now = new Date('2026-11-02T04:30:00Z') // 1 Nov, 11:30 pm locally
    expect(dayLabel('2026-11-01T03:30:00Z', now)).toBe('Yesterday')
  } finally {
    vi.unstubAllEnvs()
  }
})
