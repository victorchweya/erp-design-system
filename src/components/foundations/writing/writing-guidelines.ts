import { formatCurrency, formatDate, formatTime } from '@/utils/format'

export interface WritingExample {
  do: string
  dont: string
}

export interface WritingGuideline {
  id: string
  label: string
  description: string
  rules: readonly string[]
  examples: readonly WritingExample[]
  link?: { to: string; label: string; text: string }
}

export interface WritingTerm {
  term: string
  meaning: string
  avoid: string
}

const sampleTime = '2026-11-18T11:30:00Z'

export const writingGuidelines: readonly WritingGuideline[] = [
  {
    id: 'writing-voice',
    label: 'Voice & tone',
    description:
      'Write for operations staff, farmers, and buyers who are often busy, on the move, or reading in a second language. Be clear, direct, and respectful.',
    rules: [
      'Use plain English and short sentences. Lead with what the reader needs to know or do.',
      'Address the reader as “you”. Use “we” only when FTF does something.',
      'Avoid jargon, idioms, and internal abbreviations.',
      'Stay calm and neutral. Do not use exclamation marks, jokes, or emoji in product copy.',
    ],
    examples: [
      {
        do: `Order FTF-1042 is running late. The driver now expects to arrive at ${formatTime(sampleTime)}.`,
        dont: 'Oops! Your delivery hit a snag!!',
      },
    ],
  },
  {
    id: 'writing-capitalisation',
    label: 'Capitalisation',
    description:
      'Use sentence case for headings, page titles, buttons, labels, table headers, tags, and menu items.',
    rules: [
      'Capitalise only the first word and proper nouns, such as Nairobi, Green Basket Kitchen, or DatePicker.',
      'Write acronyms in capitals: FTF, SKU, KES.',
      'Keep the brand tagline as written: Shaping the Future of Food.',
      'Write order statuses as they appear in the product: Confirmed, Pending, Cancelled.',
    ],
    examples: [
      { do: 'Delivery date', dont: 'Delivery Date' },
      { do: 'Create order', dont: 'Create Order' },
    ],
  },
  {
    id: 'writing-actions',
    label: 'Buttons & actions',
    description:
      'A button label says what will happen. Start with a verb and name the object when it is not obvious.',
    rules: [
      'Keep labels to one to three words: “Save order”, “Approve credit”, “Try again”.',
      'Avoid “OK”, “Submit”, “Yes”, and “No”. They do not describe the outcome.',
      'Use the same verb through a flow: “Archive draft” leads to “Draft archived”.',
      'Give the cancel option a specific label when it helps, such as “Keep draft”.',
    ],
    examples: [
      { do: 'Approve credit', dont: 'Submit' },
      { do: 'Archive draft · Keep draft', dont: 'Yes · No' },
    ],
  },
  {
    id: 'writing-labels',
    label: 'Labels & placeholders',
    description:
      'Every field has a visible label. Placeholders disappear while typing and are not reliably announced, so they never replace a label.',
    rules: [
      'Write labels as short nouns: “Supplier name”, “Delivery address”.',
      'Use placeholders only for format hints or examples, or to describe an empty filter such as “All statuses”.',
      'Put rules and requirements in help text below the field, not in the placeholder.',
      'Mark optional fields with “(optional)” after the label.',
    ],
    examples: [
      {
        do: 'Label “Phone number”, placeholder “e.g. 0712 345 678”',
        dont: 'No label, placeholder “Enter phone number”',
      },
    ],
  },
  {
    id: 'writing-errors',
    label: 'Error messages',
    description:
      'Say what happened and how to fix it. Do not blame the reader, and keep the data they entered.',
    rules: [
      'Field errors sit next to the field. Start with the fix: “Enter a supplier name.”',
      'Page errors explain what failed and what is still safe, then offer a way forward such as “Try again”.',
      'Avoid technical codes and vague words such as “invalid” or “error occurred”.',
      'Name the limit when a value is out of range.',
    ],
    examples: [
      { do: 'Enter a valid email address.', dont: 'Invalid input.' },
      {
        do: 'Enter 22 crates or fewer. Only 22 are in stock.',
        dont: 'Error 422: quantity exceeds stock.',
      },
    ],
  },
  {
    id: 'writing-empty-states',
    label: 'Empty states',
    description:
      'Explain why there is nothing to show and, when the reader can change that, offer the next step.',
    rules: [
      'Use the heading to say what is empty: “No supplier orders yet”.',
      'Use the body to say what will appear or why: “Orders from approved suppliers will appear here when they are created.”',
      'Add one action when the reader can resolve it: “Create order”, “Clear filters”, or “Try again”.',
      'When data could not load, say so and reassure: “Your filters are still applied.”',
    ],
    examples: [
      {
        do: 'No orders match these filters. Clear filters to see all orders.',
        dont: 'No data.',
      },
    ],
    link: { to: '/ui-blocks/empty-states', label: 'Empty states', text: 'See examples in' },
  },
  {
    id: 'writing-confirmations',
    label: 'Confirmations',
    description:
      'Confirm only actions that are destructive or hard to reverse. Name the object and the consequence.',
    rules: [
      'Ask a question that repeats the action and names the object.',
      'State what will happen, especially if it cannot be undone.',
      'Repeat the verb on the confirm button and focus the safe option by default.',
    ],
    examples: [
      {
        do: 'Delete supplier Kilimo Fresh? This can’t be undone.',
        dont: 'Are you sure you want to continue?',
      },
      { do: 'Delete supplier · Cancel', dont: 'OK · Cancel' },
    ],
    link: { to: '/ui-blocks/modals', label: 'Modals', text: 'See the confirmation pattern in' },
  },
  {
    id: 'writing-toasts',
    label: 'Toasts & success',
    description:
      'Use a toast for a short confirmation that does not need action. Keep problems that need a fix in the page, next to the cause.',
    rules: [
      'Write the summary as the object and outcome: “Order FTF-1042 confirmed”.',
      'Use the detail line only for what happens next.',
      'Do not repeat information that is already visible on the page.',
    ],
    examples: [
      {
        do: `Credit approved. Green Basket Kitchen can now order up to ${formatCurrency(100000)}.`,
        dont: 'Success! Operation completed successfully.',
      },
    ],
  },
  {
    id: 'writing-numbers',
    label: 'Numbers & dates',
    description:
      'Format values with the shared utilities so money, dates, and times read the same everywhere.',
    rules: [
      'Show money in Kenya shillings with formatCurrency.',
      'Use numerals for counts and always include the unit: “12 crates”, “10 kg”.',
      'Show dates as day, short month, and year, and times in Nairobi time.',
      'Use “—” when a value is missing.',
    ],
    examples: [
      {
        do: `${formatCurrency(12500)} · ${formatDate('2026-11-18')} · ${formatTime(sampleTime)}`,
        dont: 'KES12500 · 11/18/2026 · 11:30 UTC',
      },
    ],
    link: {
      to: '/foundations/formatting',
      label: 'Formatting',
      text: 'Utilities and outputs are listed in',
    },
  },
]

export const writingTerms: readonly WritingTerm[] = [
  {
    term: 'Order',
    meaning: 'A customer’s request for produce, identified by a number such as FTF-1042.',
    avoid: 'Ticket, request',
  },
  {
    term: 'Item',
    meaning: 'One product and its quantity within an order.',
    avoid: 'Line, row',
  },
  {
    term: 'Customer',
    meaning: 'A business that buys from FTF, such as a restaurant, kitchen, or retailer.',
    avoid: 'Client, account',
  },
  {
    term: 'Supplier',
    meaning: 'A farmer or aggregator that sells produce to FTF.',
    avoid: 'Vendor, seller',
  },
  {
    term: 'Produce',
    meaning: 'Fresh fruit, vegetables, and herbs that FTF sells.',
    avoid: 'Goods, stock items',
  },
  {
    term: 'Pack',
    meaning: 'The unit a product is sold in, such as a 10 kg crate. Prices are per pack.',
    avoid: 'Unit, package',
  },
  {
    term: 'SKU',
    meaning: 'The product code, such as FTF-TOM. Show it in tables and exports.',
    avoid: 'Item code, product ID',
  },
  {
    term: 'Delivery',
    meaning: 'Taking an order to the customer’s address within a delivery slot.',
    avoid: 'Shipment, drop',
  },
  {
    term: 'Pickup',
    meaning: 'The customer collects the order from a warehouse.',
    avoid: 'Collection, self-delivery',
  },
  {
    term: 'Dispatch',
    meaning: 'The warehouse hands the order to a driver. Not the same as delivered.',
    avoid: 'Sent, shipped',
  },
  {
    term: 'Available credit',
    meaning: 'The credit limit minus the outstanding balance.',
    avoid: 'Balance, allowance',
  },
]
