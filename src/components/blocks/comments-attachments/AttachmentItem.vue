<script setup lang="ts">
import { computed, useId } from 'vue'
import Download from '@primeicons/vue/download'
import Eye from '@primeicons/vue/eye'
import FileExcel from '@primeicons/vue/file-excel'
import FilePdf from '@primeicons/vue/file-pdf'
import Image from '@primeicons/vue/image'
import Trash from '@primeicons/vue/trash'
import { formatDateTime } from '@/utils/format'
import { formatFileSize, teammate, type Attachment } from './record-activity'

const props = defineProps<{ attachment: Attachment }>()
const emit = defineEmits<{ remove: [event: Event] }>()
const id = useId()
const kinds = {
  pdf: { icon: FilePdf, label: 'PDF' },
  image: { icon: Image, label: 'Image' },
  csv: { icon: FileExcel, label: 'CSV' },
}
const kind = computed(() => kinds[props.attachment.kind])
// Browsers can display PDFs and images; CSV files are downloaded instead.
const canPreview = computed(() => !!props.attachment.url && props.attachment.kind !== 'csv')
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 rounded-border border border-surface p-3">
    <component :is="kind.icon" :size="24" aria-hidden="true" class="shrink-0 text-muted" />
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <p :id="`${id}-name`" class="break-all font-medium">{{ attachment.name }}</p>
      <p class="text-xs text-muted">
        {{ kind.label }} · {{ formatFileSize(attachment.size) }} ·
        {{ teammate(attachment.uploadedBy).name }} ·
        <time :datetime="attachment.uploadedAt">{{ formatDateTime(attachment.uploadedAt) }}</time>
      </p>
    </div>
    <div class="flex flex-wrap gap-1">
      <Button
        v-if="canPreview"
        v-slot="slotProps"
        asChild
        size="small"
        variant="text"
        severity="secondary"
      >
        <a
          :href="attachment.url!"
          target="_blank"
          rel="noopener"
          :class="slotProps.class"
          :aria-describedby="`${id}-name`"
          ><Eye aria-hidden="true" />Preview<span class="sr-only"> (opens in a new tab)</span></a
        >
      </Button>
      <Button
        v-if="attachment.url"
        v-slot="slotProps"
        asChild
        size="small"
        variant="text"
        severity="secondary"
      >
        <a
          :href="attachment.url"
          :download="attachment.name"
          :class="slotProps.class"
          :aria-describedby="`${id}-name`"
          ><Download aria-hidden="true" />Download</a
        >
      </Button>
      <Button
        type="button"
        size="small"
        variant="text"
        severity="danger"
        aria-haspopup="dialog"
        :aria-describedby="`${id}-name`"
        @click="emit('remove', $event)"
        ><Trash aria-hidden="true" />Remove</Button
      >
    </div>
  </div>
</template>
