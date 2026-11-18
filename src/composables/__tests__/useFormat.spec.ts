import { expect, it } from 'vitest'
import { shallowRef } from 'vue'
import { useFormattedCurrency } from '../useFormat'

it('updates formatted output when its source changes', () => {
  const amount = shallowRef(12500)
  const formatted = useFormattedCurrency(amount)
  expect(formatted.value).toBe('Ksh\u00a012,500')
  amount.value = 18000
  expect(formatted.value).toBe('Ksh\u00a018,000')
})
