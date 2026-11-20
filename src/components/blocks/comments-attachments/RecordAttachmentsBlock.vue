<script setup lang="ts">
import AttachmentsPanel from './AttachmentsPanel.vue'
import { useAttachments } from './useAttachments'
import { CURRENT_USER_ID, sampleAttachmentFiles } from './record-activity'

const { attachments, add, remove } = useAttachments(sampleAttachmentFiles())

// Replace with your upload request; keep the local list in sync with the server response.
function attach(files: File[]) {
  add(files.map((file) => ({ file, uploadedBy: CURRENT_USER_ID })))
}
</script>

<template>
  <Card class="max-w-2xl">
    <template #title><h3 class="text-lg font-medium">Attachments</h3></template>
    <template #subtitle>Order FTF-1042 · Green Basket</template>
    <template #content>
      <AttachmentsPanel
        record="order FTF-1042"
        :attachments="attachments"
        @add="attach"
        @remove="remove"
      />
    </template>
  </Card>
</template>
