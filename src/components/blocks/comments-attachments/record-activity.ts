export interface Teammate {
  id: string
  name: string
  initials: string
  role: string
}

export interface RecordComment {
  id: string
  authorId: string
  body: string
  createdAt: string
  editedAt?: string
}

export type AttachmentKind = 'pdf' | 'image' | 'csv'

export interface Attachment {
  id: string
  name: string
  kind: AttachmentKind
  size: number
  uploadedBy: string
  uploadedAt: string
  /** Local object URL. Null when the browser cannot create one. */
  url: string | null
}

export const CURRENT_USER_ID = 'amina'
export const COMMENT_LIMIT = 500
export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024
export const ACCEPTED_ATTACHMENTS = '.pdf,.png,.jpg,.jpeg,.webp,.csv'

export const teammates: Teammate[] = [
  { id: 'amina', name: 'Amina Hassan', initials: 'AH', role: 'Sales coordinator' },
  { id: 'brian', name: 'Brian Otieno', initials: 'BO', role: 'Warehouse lead' },
  { id: 'wanjiru', name: 'Wanjiru Kamau', initials: 'WK', role: 'Finance' },
  { id: 'peter', name: 'Peter Mwangi', initials: 'PM', role: 'Delivery planner' },
]

export function teammate(id: string): Teammate {
  return (
    teammates.find((person) => person.id === id) ?? {
      id,
      name: 'Former teammate',
      initials: '?',
      role: '',
    }
  )
}

export function sampleComments(): RecordComment[] {
  return [
    {
      id: 'c1',
      authorId: 'brian',
      body: 'Kale stock is short by 4 kg this morning. @Amina Hassan can we confirm a substitute with the customer?',
      createdAt: '2026-11-19T07:42:00+03:00',
    },
    {
      id: 'c2',
      authorId: 'amina',
      body: 'Green Basket accepts spinach for the shortfall. Updating the order lines now.',
      createdAt: '2026-11-19T08:15:00+03:00',
    },
    {
      id: 'c3',
      authorId: 'peter',
      body: 'Delivery moved to the 10:00 slot. Driver will use the Market Road entrance.',
      createdAt: '2026-11-19T09:03:00+03:00',
    },
  ]
}

const mentionPattern = new RegExp(`(@(?:${teammates.map((person) => person.name).join('|')}))`)

/** Split a comment into plain text and @mentions of known teammates. */
export function commentParts(body: string) {
  return body
    .split(mentionPattern)
    .filter(Boolean)
    .map((text) => ({ text, mention: mentionPattern.test(text) }))
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const extensionKinds: Record<string, AttachmentKind> = {
  pdf: 'pdf',
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  webp: 'image',
  csv: 'csv',
}

export function attachmentKind(name: string): AttachmentKind | null {
  const extension = name.split('.').pop()?.toLowerCase() ?? ''
  return extensionKinds[extension] ?? null
}

/** Returns a message describing why the file cannot be attached, or null when it is valid. */
export function attachmentError(file: File): string | null {
  if (!attachmentKind(file.name))
    return `${file.name} was not attached. Use a PDF, PNG, JPG, WebP or CSV file.`
  if (file.size > MAX_ATTACHMENT_BYTES)
    return `${file.name} was not attached. It is ${formatFileSize(file.size)}; the limit is 10 MB.`
  if (file.size === 0) return `${file.name} was not attached. The file is empty.`
  return null
}

// Small local files so preview and download work in this example without a server.
const samplePdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 120]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 52>>stream
BT /F1 14 Tf 20 60 Td (Delivery note FTF-1042) Tj ET
endstream endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
trailer<</Root 1 0 R>>
%%EOF`

export function sampleAttachmentFiles() {
  return [
    {
      file: new File([samplePdf], 'delivery-note-FTF-1042.pdf', { type: 'application/pdf' }),
      uploadedBy: 'peter',
      uploadedAt: '2026-11-19T09:05:00+03:00',
    },
    {
      file: new File(
        ['Produce,Quantity,Unit\nKale,16,kg\nSpinach,4,kg\nCarrots,15,kg\n'],
        'order-lines-FTF-1042.csv',
        { type: 'text/csv' },
      ),
      uploadedBy: 'amina',
      uploadedAt: '2026-11-19T08:20:00+03:00',
    },
  ]
}
