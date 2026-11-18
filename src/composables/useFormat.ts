import { reactify } from '@vueuse/core'
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatTime,
} from '@/utils/format'

export const useFormattedCurrency = reactify(formatCurrency)
export const useFormattedNumber = reactify(formatNumber)
export const useFormattedDate = reactify(formatDate)
export const useFormattedDateTime = reactify(formatDateTime)
export const useFormattedTime = reactify(formatTime)
