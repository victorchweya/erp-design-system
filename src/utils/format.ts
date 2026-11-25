import { formatDate as vueFormatDate } from '@vueuse/core'

export type FormattableNumber = number | string | null | undefined
export type FormattableDate = Date | string | number | null | undefined

export const DISPLAY_PLACEHOLDER = '—'
export const DISPLAY_LOCALE = 'en-KE'
export const BUSINESS_TIME_ZONE = 'Africa/Nairobi'
export const DISPLAY_DATE_FORMAT = 'D MMM YYYY'

function numberValue(value: FormattableNumber) {
  if (value === null || value === undefined || value === '') return null
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? number : null
}

function dateValue(value: FormattableDate) {
  if (value === null || value === undefined || value === '') return null
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function isDateOnlyString(value: FormattableDate): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function dateOnlyValue(value: FormattableDate) {
  if (!isDateOnlyString(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year!, month! - 1, day))
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month! - 1 &&
    date.getUTCDate() === day
    ? date
    : null
}

export function formatCurrency(value: FormattableNumber) {
  const number = numberValue(value)
  if (number === null) return DISPLAY_PLACEHOLDER
  const decimals = Number.isInteger(number) ? 0 : 2
  return new Intl.NumberFormat(DISPLAY_LOCALE, {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
}

export function formatNumber(value: FormattableNumber) {
  const number = numberValue(value)
  return number === null
    ? DISPLAY_PLACEHOLDER
    : new Intl.NumberFormat(DISPLAY_LOCALE, { maximumFractionDigits: 2 }).format(number)
}

export function toDisplayDate(value: FormattableDate) {
  // Date-only values are calendar days, while timestamps use the viewer's local day.
  const dateOnly = dateOnlyValue(value)
  if (isDateOnlyString(value) && !dateOnly) return null
  const date = dateOnly ?? dateValue(value)
  if (!date) return null
  if (dateOnly)
    return new Date(dateOnly.getUTCFullYear(), dateOnly.getUTCMonth(), dateOnly.getUTCDate(), 12)
  return date
}

export function formatDate(value: FormattableDate) {
  const date = toDisplayDate(value)
  return date
    ? vueFormatDate(date, DISPLAY_DATE_FORMAT, { locales: DISPLAY_LOCALE })
    : DISPLAY_PLACEHOLDER
}

function dateTime(value: FormattableDate, timeZone?: string) {
  const date = dateValue(value)
  if (!date) return DISPLAY_PLACEHOLDER
  return new Intl.DateTimeFormat(DISPLAY_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(date)
}

export function formatDateTime(value: FormattableDate) {
  return dateTime(value)
}

export function formatBusinessDateTime(value: FormattableDate) {
  return dateTime(value, BUSINESS_TIME_ZONE)
}

function time(value: FormattableDate, timeZone?: string) {
  const date = dateValue(value)
  if (!date) return DISPLAY_PLACEHOLDER
  return new Intl.DateTimeFormat(DISPLAY_LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(date)
}

export function formatTime(value: FormattableDate) {
  return time(value)
}

export function formatBusinessTime(value: FormattableDate) {
  return time(value, BUSINESS_TIME_ZONE)
}

export function formatApiDate(value: FormattableDate) {
  if (dateOnlyValue(value)) return value as string
  if (isDateOnlyString(value)) return ''
  const date = dateValue(value)
  if (!date) return ''
  const pad = (part: number) => String(part).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function formatBusinessDate(value: FormattableDate) {
  if (dateOnlyValue(value)) return value as string
  if (isDateOnlyString(value)) return ''
  const date = dateValue(value)
  if (!date) return ''
  const parts = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: BUSINESS_TIME_ZONE,
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? ''
  return `${part('year')}-${part('month')}-${part('day')}`
}
