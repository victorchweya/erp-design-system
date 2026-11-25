import { reactify, useDateFormat } from '@vueuse/core'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import {
  DISPLAY_DATE_FORMAT,
  DISPLAY_LOCALE,
  DISPLAY_PLACEHOLDER,
  formatCurrency,
  formatDateTime,
  formatNumber,
  formatTime,
  toDisplayDate,
  type FormattableDate,
} from '@/utils/format'

export const useFormattedCurrency = reactify(formatCurrency)
export const useFormattedNumber = reactify(formatNumber)

export function useFormattedDate(value: MaybeRefOrGetter<FormattableDate>) {
  const date = computed(() => toDisplayDate(toValue(value)))
  const formatted = useDateFormat(() => date.value ?? Number.NaN, DISPLAY_DATE_FORMAT, {
    locales: DISPLAY_LOCALE,
  })
  return computed(() => (date.value ? formatted.value : DISPLAY_PLACEHOLDER))
}

export const useFormattedDateTime = reactify(formatDateTime)
export const useFormattedTime = reactify(formatTime)
