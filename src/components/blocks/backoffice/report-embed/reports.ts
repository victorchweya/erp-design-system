export interface ReportDefinition {
  id: string
  name: string
  /** Groups the reports in the picker. */
  category: string
  description?: string
  /** Signed address of the report page. Signed addresses expire, so ask for a new one on refresh. */
  url: string
}

export type ReportState = 'loading' | 'ready' | 'failed'

/**
 * A neutral report page for previews, built as a data address so it makes no network requests.
 * The text colours follow the viewer's light or dark preference.
 */
export function sampleReportUrl(title: string, rows: [string, string][], stamp = 0): string {
  const escape = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const body = rows
    .map(
      ([label, value]) => `<tr><td>${escape(label)}</td><td class="n">${escape(value)}</td></tr>`,
    )
    .join('')
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${escape(title)}</title>
<style>:root{color-scheme:light dark}body{font:14px system-ui,sans-serif;margin:0;padding:16px}
h1{font-size:16px;margin:0 0 12px}table{border-collapse:collapse;width:100%;max-width:36rem}
td{padding:6px 8px;border-bottom:1px solid GrayText}.n{text-align:right;font-variant-numeric:tabular-nums}</style>
<h1>${escape(title)}</h1><table>${body}</table><!-- signed ${stamp} --></html>`
  return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
}

const kes = (amount: number) => `Ksh ${amount.toLocaleString('en-KE')}`

/** Builds the sample catalogue. Pass a new stamp to simulate a freshly signed address. */
export function buildSampleReports(stamp = 0): ReportDefinition[] {
  const report = (
    id: string,
    name: string,
    category: string,
    description: string,
    rows: [string, string][],
  ): ReportDefinition => ({
    id,
    name,
    category,
    description,
    url: sampleReportUrl(name, rows, stamp),
  })
  return [
    report('growth', 'Growth dashboard', 'Dashboards', 'New and returning buyers by week.', [
      ['New buyers', '46'],
      ['Returning buyers', '212'],
      ['Orders per buyer', '3.4'],
    ]),
    report(
      'operations',
      'Operations dashboard',
      'Dashboards',
      'Orders, deliveries and delays today.',
      [
        ['Orders today', '128'],
        ['Delivered on time', '94%'],
        ['Delayed', '8'],
      ],
    ),
    report(
      'supplier-payments',
      'Supplier payments',
      'Finance',
      'Paid and outstanding balances by supplier.',
      [
        ['Kijani Growers Ltd', kes(184500)],
        ['Naivasha Fresh Farms', kes(92300)],
        ['Limuru Dairy Co-op', kes(41800)],
      ],
    ),
    report(
      'receivables-ageing',
      'Receivables ageing',
      'Finance',
      'Unpaid customer invoices by age.',
      [
        ['0 to 30 days', kes(1240000)],
        ['31 to 60 days', kes(386000)],
        ['Over 60 days', kes(72500)],
      ],
    ),
    report(
      'stock-reconciliation',
      'Stock reconciliation',
      'Reconciliations',
      'Counted stock against recorded stock.',
      [
        ['Tomatoes (kg)', '+12'],
        ['Kale (crates)', '-18'],
        ['Avocados (kg)', '0'],
      ],
    ),
    report(
      'payment-reconciliation',
      'Payment reconciliation',
      'Reconciliations',
      'Mobile money receipts against orders.',
      [
        ['Matched', '412'],
        ['Unmatched', '7'],
        ['Refunded', '3'],
      ],
    ),
  ]
}
