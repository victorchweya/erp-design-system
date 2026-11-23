import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import StatusTagBlock from '../backoffice/status-tag/StatusTagBlock.vue'
import {
  STATUS_SEVERITIES,
  builtInStatusDomains,
  defineStatuses,
  promotionStatus,
  resolveStatus,
  statusRegistry,
  windowStatus,
} from '../backoffice/status-tag/status-registry'

enableAutoUnmount(afterEach)
const mountTag = (domain: string, status: string | null) =>
  mount(StatusTagBlock, { props: { domain, status }, global: { plugins: [PrimeVue] } })

describe('status registry', () => {
  const entries = builtInStatusDomains.flatMap((domain) =>
    Object.entries(statusRegistry[domain]!).map(([status, definition]) => ({
      domain,
      status,
      definition,
    })),
  )

  it('gives every registered status visible text and a PrimeVue severity', () => {
    expect(entries.length).toBeGreaterThan(40)
    for (const { domain, status, definition } of entries) {
      expect(definition.label.trim(), `${domain}.${status} label`).not.toBe('')
      expect(STATUS_SEVERITIES, `${domain}.${status} severity`).toContain(definition.severity)
    }
  })

  it('shows a readable fallback for unknown values and never throws', () => {
    expect(resolveStatus('receiving', 'partially_received')).toMatchObject({
      label: 'Partially received',
      severity: 'secondary',
      known: false,
    })
    expect(resolveStatus('order', 'AWAITING-CUSTOMS').label).toBe('Awaiting customs')
    for (const value of [null, undefined, '', '   ', 0, {}, []]) {
      expect(() => resolveStatus('nope', value)).not.toThrow()
      expect(resolveStatus('order', value).severity).toBe('secondary')
    }
  })

  it('matches API values regardless of case and separators', () => {
    expect(resolveStatus('route', 'In Progress')).toEqual(resolveStatus('route', 'in_progress'))
    expect(resolveStatus('route', 'In Progress').known).toBe(true)
  })

  it('lets a team register a domain and override one status', () => {
    defineStatuses('spec-goods-receipt', {
      Partially_Received: { label: 'Partially received', severity: 'warn' },
    })
    expect(resolveStatus('spec-goods-receipt', 'partially received')).toMatchObject({
      label: 'Partially received',
      severity: 'warn',
      known: true,
    })
  })
})

describe('window status', () => {
  const start = '2026-12-01T00:00:00+03:00'
  const end = '2026-12-08T00:00:00+03:00'
  const at = (iso: string) => new Date(iso)

  it('is scheduled before the start, active from the start, and ended from the end', () => {
    expect(windowStatus(start, end, at('2026-11-30T23:59:59+03:00'))).toBe('scheduled')
    expect(windowStatus(start, end, at(start))).toBe('active')
    expect(windowStatus(start, end, at('2026-12-07T23:59:59+03:00'))).toBe('active')
    expect(windowStatus(start, end, at(end))).toBe('ended')
    expect(windowStatus(start, end, at('2027-01-01T00:00:00+03:00'))).toBe('ended')
  })

  it('treats a missing or invalid date as an open side', () => {
    const now = at('2026-12-03T12:00:00+03:00')
    expect(windowStatus(null, end, now)).toBe('active')
    expect(windowStatus(start, undefined, now)).toBe('active')
    expect(windowStatus(null, null, now)).toBe('active')
    expect(windowStatus('not a date', '', now)).toBe('active')
    expect(windowStatus(null, end, at('2026-12-09T00:00:00+03:00'))).toBe('ended')
    expect(windowStatus(start, null, at('2026-11-01T00:00:00+03:00'))).toBe('scheduled')
  })

  it('hides a switched-off promotion whatever its dates say', () => {
    const now = at('2026-12-03T12:00:00+03:00')
    expect(promotionStatus({ isActive: false, startsAt: start, endsAt: end }, now)).toBe('hidden')
    expect(promotionStatus({ isActive: true, startsAt: start, endsAt: end }, now)).toBe('active')
    expect(resolveStatus('promotion', promotionStatus({ startsAt: end }, now)).label).toBe(
      'Scheduled',
    )
  })
})

describe('StatusTagBlock', () => {
  it('always renders the status as text, including live and unknown states', () => {
    expect(mountTag('fleet', 'live').text()).toBe('Live')
    expect(mountTag('order', 'delivered').text()).toBe('Delivered')
    expect(mountTag('order', 'partially_received').text()).toBe('Partially received')
  })

  it('shows a dash instead of an empty tag when there is no status', () => {
    expect(mountTag('order', null).text()).toBe('—')
    expect(mountTag('order', '  ').text()).toBe('—')
  })
})
