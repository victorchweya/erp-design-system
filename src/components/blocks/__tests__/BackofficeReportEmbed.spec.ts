import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ReportEmbedBlock from '../backoffice/report-embed/ReportEmbedBlock.vue'
import { buildSampleReports } from '../backoffice/report-embed/reports'

enableAutoUnmount(afterEach)
beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }))
})
afterEach(() => vi.unstubAllGlobals())

const reports = buildSampleReports()
const mountBlock = (props: Record<string, unknown> = {}) =>
  mount(ReportEmbedBlock, {
    props: { reports, selected: 'growth', ...props },
    global: { plugins: [PrimeVue] },
    attachTo: document.body,
  })
const button = (wrapper: ReturnType<typeof mountBlock>, label: string) =>
  wrapper.findAll('button').find((candidate) => candidate.text() === label)!

it('names the frame after the report and loads the new report when the selection changes', async () => {
  const wrapper = mountBlock()
  expect(wrapper.get('iframe').attributes('title')).toBe('Growth dashboard')
  expect(wrapper.get('iframe').attributes('src')).toBe(reports[0]!.url)

  await wrapper.setProps({ selected: 'supplier-payments' })

  expect(wrapper.get('iframe').attributes('title')).toBe('Supplier payments')
  expect(wrapper.get('iframe').attributes('src')).toBe(
    reports.find((report) => report.id === 'supplier-payments')!.url,
  )
})

it('says it is loading until the frame has loaded, then clears the status', async () => {
  const wrapper = mountBlock()
  expect(wrapper.get('[role="status"]').text()).toBe('Loading Growth dashboard')
  expect(wrapper.get('[role="region"]').attributes('aria-busy')).toBe('true')

  await wrapper.get('iframe').trigger('load')

  expect(wrapper.get('[role="status"]').text()).toBe('')
  expect(wrapper.get('[role="region"]').attributes('aria-busy')).toBe('false')
})

it('shows no frame and announces a loading state while the parent fetches the address', () => {
  const wrapper = mountBlock({ state: 'loading' })
  expect(wrapper.find('iframe').exists()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toBe('Loading Growth dashboard')
  expect(button(wrapper, 'Refresh').attributes('disabled')).toBeDefined()
})

it('announces a failed report as an alert and retries with focus kept in the report area', async () => {
  const wrapper = mountBlock({ state: 'failed', errorMessage: 'The server timed out.' })
  const alert = wrapper.get('[role="alert"]')
  expect(alert.text()).toContain('Could not load Growth dashboard')
  expect(alert.text()).toContain('The server timed out.')
  expect(wrapper.find('iframe').exists()).toBe(false)

  const retry = button(wrapper, 'Retry')
  retry.element.focus()
  await retry.trigger('click')
  await flushPromises()

  expect(wrapper.emitted('retry')).toHaveLength(1)
  expect(document.activeElement).toBe(wrapper.get('[role="region"]').element)
})

it('asks for a new signed address on refresh and keeps focus in the report area', async () => {
  const wrapper = mountBlock()
  await wrapper.get('iframe').trigger('load')
  const refresh = button(wrapper, 'Refresh')
  refresh.element.focus()
  await refresh.trigger('click')

  expect(wrapper.emitted('refresh')).toHaveLength(1)
  expect(document.activeElement).toBe(wrapper.get('[role="region"]').element)
})
