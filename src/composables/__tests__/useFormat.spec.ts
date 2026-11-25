import { expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import { useFormattedCurrency, useFormattedDate, useFormattedDateTime } from '../useFormat'

it('updates formatted output when its source changes', () => {
  const amount = shallowRef(12500)
  const formatted = useFormattedCurrency(amount)
  expect(formatted.value).toBe('Ksh\u00a012,500')
  amount.value = 18000
  expect(formatted.value).toBe('Ksh\u00a018,000')
})

it('updates viewer-local dates when the source changes and keeps date-only values intact', () => {
  vi.stubEnv('TZ', 'America/New_York')
  try {
    const timestamp = shallowRef('2026-11-18T22:30:00Z')
    const date = useFormattedDate(timestamp)
    const dateTime = useFormattedDateTime(timestamp)
    expect(date.value).toBe('18 Nov 2026')
    expect(dateTime.value).toBe('18 Nov 2026, 5:30 pm')
    timestamp.value = '2026-11-18'
    expect(date.value).toBe('18 Nov 2026')
    timestamp.value = '2026-03-07T23:30:00Z'
    expect(date.value).toBe('7 Mar 2026')
    timestamp.value = 'invalid'
    expect(date.value).toBe('—')
    expect(dateTime.value).toBe('—')
  } finally {
    vi.unstubAllEnvs()
  }
})
