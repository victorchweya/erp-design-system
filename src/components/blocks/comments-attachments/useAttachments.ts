import { onScopeDispose, readonly, shallowRef } from 'vue'
import { attachmentKind, type Attachment } from './record-activity'

interface AttachmentSource {
  file: File
  uploadedBy: string
  uploadedAt?: string
}

/**
 * Keeps a record's attachments with local object URLs for preview and download.
 * URLs are revoked when an attachment is removed and when the owning component unmounts.
 */
export function useAttachments(initial: AttachmentSource[] = []) {
  const attachments = shallowRef<Attachment[]>([])
  let nextId = 0

  function objectUrl(file: File) {
    try {
      return URL.createObjectURL(file)
    } catch {
      return null // Preview and download are hidden when no URL is available.
    }
  }
  function revoke(attachment: Attachment) {
    if (attachment.url && typeof URL.revokeObjectURL === 'function')
      URL.revokeObjectURL(attachment.url)
  }
  function toAttachment({ file, uploadedBy, uploadedAt }: AttachmentSource): Attachment {
    return {
      id: `attachment-${++nextId}`,
      name: file.name,
      kind: attachmentKind(file.name) ?? 'pdf',
      size: file.size,
      uploadedBy,
      uploadedAt: uploadedAt ?? new Date().toISOString(),
      url: objectUrl(file),
    }
  }

  function add(sources: AttachmentSource[]) {
    const added = sources.map(toAttachment)
    attachments.value = [...added, ...attachments.value]
    return added
  }
  function remove(id: string) {
    const attachment = attachments.value.find((item) => item.id === id)
    if (!attachment) return
    revoke(attachment)
    attachments.value = attachments.value.filter((item) => item.id !== id)
  }

  add(initial)
  onScopeDispose(() => attachments.value.forEach(revoke))

  return { attachments: readonly(attachments), add, remove }
}
