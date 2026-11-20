import { formatApiDate } from '@/utils/format'

export type CsvTable = { headers: string[]; rows: string[][] }

/**
 * Parses RFC 4180 style CSV: quoted fields may contain commas, line breaks, and
 * escaped quotes (""). Accepts CRLF or LF line endings and ignores a leading BOM
 * and blank lines.
 */
export function parseCsv(text: string): CsvTable {
  const source = text.replace(/^﻿/, '')
  const records: string[][] = []
  let record: string[] = []
  let field = ''
  let inQuotes = false

  const endField = () => {
    record.push(field)
    field = ''
  }
  const endRecord = () => {
    endField()
    if (record.some((value) => value.trim() !== '')) records.push(record)
    record = []
  }

  for (let index = 0; index < source.length; index++) {
    const char = source[index]
    if (inQuotes) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"'
        index++
      } else if (char === '"') {
        inQuotes = false
      } else {
        field += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      endField()
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && source[index + 1] === '\n') index++
      endRecord()
    } else {
      field += char
    }
  }
  if (field !== '' || record.length) endRecord()

  const [headerRow = [], ...rows] = records
  return { headers: headerRow.map((header) => header.trim()), rows }
}

function escapeCsvValue(value: string | number) {
  let text = String(value)
  // Prevent spreadsheet formula injection while keeping plain numbers such as -5 intact.
  if (/^[=+\-@\t\r]/.test(text) && !/^[+-]?\d+(\.\d+)?$/.test(text)) text = `'${text}`
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(headers: string[], rows: (string | number)[][]) {
  return [headers, ...rows].map((row) => row.map(escapeCsvValue).join(',')).join('\r\n')
}

export function downloadCsv(filename: string, csv: string) {
  const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export type ImportFieldKey = 'deliveryDate' | 'customer' | 'sku' | 'quantity' | 'notes'
export type ImportField = {
  key: ImportFieldKey
  label: string
  required: boolean
  aliases: string[]
}

export const importFields: ImportField[] = [
  {
    key: 'deliveryDate',
    label: 'Delivery date',
    required: true,
    aliases: ['delivery date', 'date', 'delivery'],
  },
  {
    key: 'customer',
    label: 'Customer',
    required: true,
    aliases: ['customer', 'customer name', 'client'],
  },
  { key: 'sku', label: 'SKU', required: true, aliases: ['sku', 'product code', 'item code'] },
  {
    key: 'quantity',
    label: 'Quantity (kg)',
    required: true,
    aliases: ['quantity', 'qty', 'quantity kg', 'qty kg'],
  },
  { key: 'notes', label: 'Notes', required: false, aliases: ['notes', 'note', 'comments'] },
]

export type ColumnMapping = Record<ImportFieldKey, string | null>

const normalise = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

export function autoMatchColumns(headers: string[]): ColumnMapping {
  const used = new Set<string>()
  const mapping = {} as ColumnMapping
  for (const field of importFields) {
    const match = headers.find(
      (header) => !used.has(header) && field.aliases.includes(normalise(header)),
    )
    if (match) used.add(match)
    mapping[field.key] = match ?? null
  }
  return mapping
}

export const knownCustomers = [
  'Green Basket',
  'Naivas Kilimani',
  'Java House Westlands',
  'Mama Oliech Restaurant',
  'Zucchini Greengrocers',
]

export type ImportRow = {
  line: number
  values: Record<ImportFieldKey, string>
  errors: string[]
}

export function validateRows(table: CsvTable, mapping: ColumnMapping): ImportRow[] {
  const customers = new Set(knownCustomers.map((customer) => customer.toLowerCase()))
  return table.rows.map((row, index) => {
    const values = {} as Record<ImportFieldKey, string>
    for (const field of importFields) {
      const column = mapping[field.key]
      const position = column === null ? -1 : table.headers.indexOf(column)
      values[field.key] = position === -1 ? '' : (row[position] ?? '').trim()
    }
    const errors: string[] = []
    if (!values.sku) errors.push('Missing SKU')
    const quantity = Number(values.quantity)
    if (!values.quantity || !Number.isFinite(quantity)) errors.push('Quantity is not a number')
    else if (quantity <= 0) errors.push('Quantity must be greater than 0')
    if (!values.customer) errors.push('Missing customer')
    else if (!customers.has(values.customer.toLowerCase()))
      errors.push(`Unknown customer “${values.customer}”`)
    if (!values.deliveryDate || formatApiDate(values.deliveryDate) !== values.deliveryDate)
      errors.push('Delivery date must be YYYY-MM-DD')
    // Spreadsheet row number: row 1 is the header, so data starts on row 2.
    return { line: index + 2, values, errors }
  })
}

export const sampleCsvName = 'ftf-order-lines-sample.csv'
export const sampleCsv = [
  'Delivery Date,Customer,SKU,Qty,Notes',
  '2026-11-24,Green Basket,TOM-RND-1KG,40,',
  '2026-11-24,Naivas Kilimani,KAL-BNCH,25,"Deliver to loading bay 2, before 7am"',
  '2026-11-24,Java House Westlands,,12,Missing SKU example',
  '2026-11-25,Mama Oliech Restaurant,ONI-RED-1KG,-5,Negative quantity',
  '2026-11-25,Savanna Foods,AVO-HASS-4KG,18,Customer not on file',
  '25/11/2026,Zucchini Greengrocers,CAR-1KG,30,Wrong date format',
  '2026-11-26,Green Basket,SPN-BNCH,15,"Ask for ""Ruth"" at reception"',
  '2026-11-26,Java House Westlands,AVO-HASS-4KG,22,',
].join('\n')
