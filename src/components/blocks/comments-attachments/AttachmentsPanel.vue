<script setup lang="ts">
import TimesCircle from '@primeicons/vue/times-circle'
import { nextTick, shallowRef, useId, useTemplateRef } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import type FileUpload from 'primevue/fileupload'
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import CloudUpload from '@primeicons/vue/cloud-upload'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import Paperclip from '@primeicons/vue/paperclip'
import AttachmentItem from './AttachmentItem.vue'
import { ACCEPTED_ATTACHMENTS, attachmentError, type Attachment } from './record-activity'

const props = defineProps<{ record: string; attachments: readonly Attachment[] }>()
const emit = defineEmits<{ add: [files: File[]]; remove: [id: string] }>()
const id = useId()
const confirm = useConfirm()
const uploader = useTemplateRef<InstanceType<typeof FileUpload>>('uploader')
const uploadArea = useTemplateRef<HTMLElement>('uploadArea')
const errors = shallowRef<string[]>([])
const status = shallowRef('')

// Validate every chosen or dropped file ourselves so each rejection gets a specific message.
function select(event: FileUploadSelectEvent) {
  const source = event.originalEvent as DragEvent & { target: HTMLInputElement }
  const files = Array.from(source.dataTransfer?.files ?? source.target?.files ?? [])
  const valid = files.filter((file) => !attachmentError(file))
  errors.value = files.map(attachmentError).filter((error): error is string => !!error)
  if (valid.length) emit('add', valid)
  status.value = valid.length
    ? `${valid.length} ${valid.length === 1 ? 'file' : 'files'} attached.`
    : 'No files were attached.'
  // Files live in the attachment list, so reset the uploader's own queue.
  nextTick(() => uploader.value?.clear())
}
function remove(attachment: Attachment, event: Event) {
  confirm.require({
    group: id,
    target: event.currentTarget as HTMLElement,
    message: `Remove ${attachment.name} from ${props.record}?`,
    icon: ExclamationTriangle,
    defaultFocus: 'reject',
    rejectProps: { label: 'Keep file', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Remove file', severity: 'danger' },
    accept: () => {
      emit('remove', attachment.id)
      status.value = `${attachment.name} removed.`
      // Return focus to the choose button, which stays available after removal.
      uploadArea.value?.querySelector<HTMLElement>('button')?.focus()
    },
  })
}
</script>

<template>
  <section class="flex flex-col gap-4 text-sm" :aria-labelledby="`${id}-title`">
    <h3 :id="`${id}-title`" class="sr-only">Attachments on {{ record }}</h3>
    <div ref="uploadArea">
      <FileUpload
        ref="uploader"
        name="attachments[]"
        :accept="ACCEPTED_ATTACHMENTS"
        multiple
        customUpload
        chooseLabel="Choose files"
        :showUploadButton="false"
        :showCancelButton="false"
        :chooseButtonProps="{ size: 'small', 'aria-describedby': `${id}-rules` }"
        @select="select"
      >
        <template #content><span hidden /></template>
        <template #empty>
          <div class="flex flex-col items-center gap-2 py-4 text-center">
            <CloudUpload :size="28" aria-hidden="true" class="text-muted" />
            <p class="font-medium">Drop files here or choose files</p>
            <p :id="`${id}-rules`" class="text-xs text-muted">
              PDF, PNG, JPG, WebP or CSV, up to 10 MB each. Files stay in this browser preview.
            </p>
          </div>
        </template>
      </FileUpload>
    </div>
    <Message v-if="errors.length" severity="error" closable @close="errors = []">
      <template #icon="{ class: iconClass }">
        <TimesCircle :class="iconClass" aria-hidden="true" />
      </template>
      <ul class="flex flex-col gap-1">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </Message>
    <ul
      v-if="attachments.length"
      class="flex flex-col gap-2"
      :aria-label="`Attachments on ${record}`"
    >
      <li v-for="attachment in attachments" :key="attachment.id">
        <AttachmentItem :attachment="attachment" @remove="remove(attachment, $event)" />
      </li>
    </ul>
    <div v-else class="flex flex-col items-center gap-2 py-6 text-center">
      <Paperclip :size="28" aria-hidden="true" class="text-muted" />
      <p class="font-medium">No attachments yet</p>
      <p class="text-muted">Add delivery notes, invoices, photos or order line exports.</p>
    </div>
    <p role="status" class="sr-only">{{ status }}</p>
    <ConfirmPopup :group="id" aria-label="Remove attachment" class="max-w-[calc(100vw-2rem)]" />
  </section>
</template>
