import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ReconciliationBlock from '../order-entry/ReconciliationBlock.vue'
import {
  acceptedQuantity,
  canSave,
  reconciliationProblems,
  reconciliationResults,
  reconciliationTotals,
  sampleReconciliation,
  validateLine,
  type ReconciliationLine,
} from '../order-entry/reconciliation'

enableAutoUnmount(afterEach)
beforeEach(() => {
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
afterEach(() => vi.unstubAllGlobals())
const line = (patch: Partial<ReconciliationLine> = {}): ReconciliationLine => ({
  id: 'FTF-TOM',
  name: 'Tomatoes',
  pack: '10 kg crate',
  ordered: 12,
  received: 12,
  rejected: 0,
  reason: null,
  ...patch,
})

describe('reconciliation rules', () => {
  it('requires a reason whenever something is rejected', () => {
    expect(validateLine(line({ rejected: 2 })).map((issue) => issue.field)).toEqual(['reason'])
    expect(validateLine(line({ rejected: 2, reason: 'damaged' }))).toEqual([])
    expect(validateLine(line({ rejected: null }))).toEqual([])
  })

  it('blocks receiving more than was ordered', () => {
    const [issue] = validateLine(line({ received: 13 }))
    expect(issue).toMatchObject({
      field: 'received',
      problem: 'Tomatoes: More than the 12 ordered.',
    })
  })

  it('blocks rejecting more than arrived and lines not counted yet', () => {
    expect(validateLine(line({ received: 5, rejected: 6, reason: 'quality' }))[0]?.field).toBe(
      'rejected',
    )
    expect(validateLine(line({ received: null }))[0]?.field).toBe('received')
    expect(validateLine(line({ received: 0 }))).toEqual([])
  })

  it('accepts what was received minus what was rejected, never below zero', () => {
    expect(acceptedQuantity({ received: 10, rejected: 3 })).toBe(7)
    expect(acceptedQuantity({ received: 10, rejected: null })).toBe(10)
    expect(acceptedQuantity({ received: 2, rejected: 5 })).toBe(0)
    const lines = [line({ received: 10, rejected: 3, reason: 'damaged' }), line({ id: 'b' })]
    expect(reconciliationTotals(lines)).toEqual({
      ordered: 24,
      received: 22,
      rejected: 3,
      accepted: 19,
    })
  })

  it('can be saved only when no line has a problem', () => {
    expect(canSave(sampleReconciliation())).toBe(false)
    expect(reconciliationProblems(sampleReconciliation()).length).toBeGreaterThan(1)
    expect(canSave([line(), line({ id: 'b', rejected: 1, reason: 'quality' })])).toBe(true)
    expect(canSave([])).toBe(false)
  })

  it('keeps a reason only on lines that have a rejection', () => {
    const [saved] = reconciliationResults([line({ rejected: 0, reason: 'damaged' })])
    expect(saved).toMatchObject({ accepted: 12, reason: null })
  })
})

describe('ReconciliationBlock', () => {
  const mountBlock = (lines: ReconciliationLine[]) =>
    mount(ReconciliationBlock, {
      props: { lines },
      global: { plugins: [PrimeVue] },
      attachTo: document.body,
    })
  const save = (wrapper: ReturnType<typeof mountBlock>) =>
    wrapper.findAll('button').find((button) => /Save reconciliation/.test(button.text()))!

  it('keeps Save off and says why while a rejection has no reason', () => {
    const wrapper = mountBlock([line({ rejected: 2 })])
    expect(save(wrapper).attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Fix 1 problem to save.')
    expect(wrapper.text()).toContain('Tomatoes: Choose why it was rejected.')
  })

  it('emits the reconciled lines when there are no problems', async () => {
    const wrapper = mountBlock([line({ rejected: 2, reason: 'damaged' })])
    expect(save(wrapper).attributes('disabled')).toBeUndefined()
    await save(wrapper).trigger('click')
    expect(wrapper.emitted('save')?.[0]?.[0]).toEqual([
      { id: 'FTF-TOM', ordered: 12, received: 12, rejected: 2, accepted: 10, reason: 'damaged' },
    ])
  })
})
