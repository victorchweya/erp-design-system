import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import PaymentAllocationBlock from '../backoffice/payment-allocation/PaymentAllocationBlock.vue'
import {
  autoAllocate,
  clearAllocations,
  setAllocation,
  totalAllocated,
  validateAllocation,
  type Allocations,
  type OpenInvoice,
} from '../backoffice/payment-allocation/allocation'
import { customerInvoices } from '../backoffice/payment-allocation/invoices'

// Oldest due first: 2041 (85,000), 2047 (120,000), 2052 (42,500.50), 2063 (64,250), 2070 (31,800).
describe('autoAllocate', () => {
  it('pays the oldest due invoice first and stops at the payment', () => {
    expect(autoAllocate(customerInvoices, 200000)).toEqual({
      'inv-2041': 85000,
      'inv-2047': 115000,
    })
  })

  it('never goes past an invoice balance, even for a large payment', () => {
    const result = autoAllocate(customerInvoices, 1_000_000)
    for (const invoice of customerInvoices) expect(result[invoice.id]).toBe(invoice.balance)
  })

  it('never allocates more than the payment, in cents', () => {
    for (const payment of [0.01, 99.99, 85000.01, 250000.5, 343550.49]) {
      expect(totalAllocated(autoAllocate(customerInvoices, payment))).toBeLessThanOrEqual(payment)
    }
    expect(totalAllocated(autoAllocate(customerInvoices, 250000.5))).toBe(250000.5)
  })

  it('allocates nothing for a zero payment and puts undated invoices last', () => {
    expect(autoAllocate(customerInvoices, 0)).toEqual({})
    const invoices: OpenInvoice[] = [
      { id: 'a', number: 'A', dueDate: null, balance: 100 },
      { id: 'b', number: 'B', dueDate: '2026-12-01', balance: 100 },
    ]
    expect(autoAllocate(invoices, 100)).toEqual({ b: 100 })
  })
})

describe('allocation edits', () => {
  it('removes an invoice when its amount is emptied and clears everything', () => {
    const one = setAllocation({}, 'inv-2041', 500.255)
    expect(one).toEqual({ 'inv-2041': 500.26 })
    expect(setAllocation(one, 'inv-2041', null)).toEqual({})
    expect(clearAllocations()).toEqual({})
  })

  it('adds money up in cents without decimal drift', () => {
    expect(totalAllocated({ a: 0.1, b: 0.2 })).toBe(0.3)
  })
})

describe('validateAllocation', () => {
  it('reports the remainder and blocks saving a partial payment', () => {
    const check = validateAllocation(customerInvoices, { 'inv-2041': 85000 }, 200000)
    expect(check.remainder).toBe(115000)
    expect(check.canSave).toBe(false)
    expect(check.blockedReason).toContain('115,000')
  })

  it('allows saving once the whole payment is allocated', () => {
    const check = validateAllocation(
      customerInvoices,
      autoAllocate(customerInvoices, 200000),
      200000,
    )
    expect(check).toMatchObject({ remainder: 0, overBy: 0, creditAmount: 0, canSave: true })
  })

  it('rejects allocations that add up to more than the payment', () => {
    const check = validateAllocation(
      customerInvoices,
      { 'inv-2041': 85000, 'inv-2047': 70000 },
      150000,
    )
    expect(check.overBy).toBe(5000)
    expect(check.remainder).toBe(0)
    expect(check.problems).toHaveLength(1)
    expect(check.canSave).toBe(false)
  })

  it('rejects an amount above one invoice balance and names the invoice', () => {
    const check = validateAllocation(customerInvoices, { 'inv-2041': 85000.01 }, 200000)
    expect(check.rowErrors['inv-2041']).toContain('INV-2041')
    expect(check.canSave).toBe(false)
  })

  it('keeps the remainder as customer credit only when the payment exceeds all balances', () => {
    const all = autoAllocate(customerInvoices, 1_000_000)
    const check = validateAllocation(customerInvoices, all, 1_000_000)
    expect(check.creditAmount).toBe(1_000_000 - check.outstanding)
    expect(check.canSave).toBe(true)
  })

  it('leaves the whole payment as credit when unapplied, and needs a payment', () => {
    expect(
      validateAllocation(customerInvoices, { 'inv-2041': 999 }, 50000, { leaveUnapplied: true }),
    ).toMatchObject({ canSave: true, creditAmount: 50000, allocated: 0 })
    expect(validateAllocation(customerInvoices, {}, 0, { leaveUnapplied: true }).canSave).toBe(
      false,
    )
    expect(validateAllocation(customerInvoices, {}, 0).canSave).toBe(false)
  })
})

describe('PaymentAllocationBlock', () => {
  enableAutoUnmount(afterEach)
  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    }))
  })
  afterEach(() => vi.unstubAllGlobals())

  const mountBlock = (props: Record<string, unknown> = {}) =>
    mount(PaymentAllocationBlock, {
      props: { invoices: customerInvoices, paymentAmount: 200000, ...props },
      global: { plugins: [PrimeVue] },
    })
  const button = (wrapper: ReturnType<typeof mountBlock>, label: string) =>
    wrapper.findAll('button').find((b) => b.text() === label)!

  it('keeps Save off with the reason in text until auto-allocate uses the whole payment, then emits', async () => {
    const wrapper = mountBlock({
      'onUpdate:allocations': (v: Allocations) => wrapper.setProps({ allocations: v }),
    })
    const save = button(wrapper, 'Save allocation')
    expect(save.attributes('disabled')).toBeDefined()
    const note = wrapper.find('[role="status"]')
    expect(note.text()).toContain('Allocate the remaining')
    expect(save.attributes('aria-describedby')).toBe(note.attributes('id'))

    await button(wrapper, 'Auto-allocate').trigger('click')
    await flushPromises()
    expect(button(wrapper, 'Save allocation').attributes('disabled')).toBeUndefined()
    await button(wrapper, 'Save allocation').trigger('click')
    expect(wrapper.emitted('save')![0]![0]).toEqual({
      allocations: [
        { invoiceId: 'inv-2041', invoiceNumber: 'INV-2041', amount: 85000 },
        { invoiceId: 'inv-2047', invoiceNumber: 'INV-2047', amount: 115000 },
      ],
      creditAmount: 0,
    })
  })

  it('announces an over-allocation as an alert and ties a row error to its field', () => {
    const wrapper = mountBlock({
      paymentAmount: 150000,
      allocations: { 'inv-2041': 90000, 'inv-2047': 80000 },
    })
    expect(wrapper.find('[role="alert"]').text()).toContain('more than the payment')
    expect(button(wrapper, 'Save allocation').attributes('disabled')).toBeDefined()
    const field = wrapper.find('input[aria-label="Allocate to INV-2041"]')
    const errorId = field.attributes('aria-describedby')!
    expect(wrapper.find(`#${errorId}`).text()).toContain('INV-2041')
  })
})
