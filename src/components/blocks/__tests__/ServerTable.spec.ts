import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ServerTableBlock from '../tables/ServerTableBlock.vue'
import ServerTableExample from '../tables/ServerTableExample.vue'
import type { ServerOrder } from '../tables/server-table'

enableAutoUnmount(afterEach)
beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }))
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})
const options = {
  global: { plugins: [PrimeVue], stubs: { transition: false } },
  attachTo: document.body,
}
const click = async (element: Element | null | undefined) => {
  element!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await flushPromises()
}
const settle = async () => {
  await vi.advanceTimersByTimeAsync(600)
  await flushPromises()
}
const byText = (selector: string, text: RegExp) =>
  Array.from(document.querySelectorAll<HTMLElement>(selector)).find((element) =>
    text.test(element.textContent?.trim() ?? ''),
  )
const row: ServerOrder = {
  id: 1,
  reference: 'FTF-3001',
  customer: 'Green Basket',
  deliveryDate: '2026-11-10',
  crates: 8,
  totalKes: 12000,
  status: 'Pending',
}
const currentPage = () => document.querySelector('[aria-current="page"]')?.textContent?.trim()
const firstRow = () => document.querySelector('tbody tr td')?.textContent?.trim()

it('asks for the right page, size and sort, and returns to page 1 when sorting', async () => {
  const wrapper = mount(ServerTableBlock, {
    ...options,
    props: {
      rows: [row],
      totalRecords: 36,
      first: 10,
      rowsPerPage: 5,
      sortField: 'deliveryDate',
      sortOrder: -1,
    },
  })
  await click(document.querySelector('[aria-label="Next Page"]'))
  expect(wrapper.emitted('load')![0]).toEqual([
    { page: 4, rows: 5, sortField: 'deliveryDate', sortOrder: -1 },
  ])
  await click(byText('th', /^Crates/))
  expect(wrapper.emitted('load')![1]).toEqual([
    { page: 1, rows: 5, sortField: 'crates', sortOrder: 1 },
  ])
})

it('does not fire an action the person has no permission for', async () => {
  const wrapper = mount(ServerTableBlock, {
    ...options,
    props: {
      rows: [row],
      totalRecords: 1,
      first: 0,
      rowsPerPage: 5,
      sortField: 'deliveryDate',
      sortOrder: 1,
      permissions: { view: true, edit: true, delete: false },
    },
  })
  await click(document.querySelector('[aria-label="Actions for FTF-3001"]'))
  const remove = byText('[role="menuitem"]', /^Delete$/)!
  expect(remove.getAttribute('aria-disabled')).toBe('true')
  await click(remove)
  expect(wrapper.emitted('action')).toBeUndefined()
  await click(byText('[role="menuitem"]', /^Edit$/))
  expect(wrapper.emitted('action')![0]![0]).toMatchObject({
    action: 'edit',
    row: { reference: 'FTF-3001' },
  })
})

it('keeps the requested page and sort when a failed load is retried', async () => {
  const wrapper = mount(ServerTableExample, options)
  await settle()
  const firstPageRow = firstRow()
  await click(byText('th', /^Crates/))
  await settle()
  await click(document.querySelector('[aria-label="Next Page"]'))
  await settle()
  const secondPageRow = firstRow()
  expect(secondPageRow).not.toBe(firstPageRow)
  expect(currentPage()).toBe('2')

  await click(wrapper.find('input[role="switch"]').element)
  await click(document.querySelector('[aria-label="Next Page"]'))
  await settle()
  expect(document.querySelector('[role="alert"]')).not.toBeNull()
  expect(document.querySelector('tbody tr td')?.textContent).not.toContain('FTF-')

  await click(wrapper.find('input[role="switch"]').element)
  await click(byText('button', /^Retry$/))
  await settle()
  expect(document.querySelector('[role="alert"]')).toBeNull()
  // The page the person asked for, not a reset to page 1.
  expect(currentPage()).toBe('3')
  expect(firstRow()).not.toBe(secondPageRow)
  expect(firstRow()).not.toBe(firstPageRow)
})
