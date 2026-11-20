<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import RecordCommentsBlock from '@/components/blocks/comments-attachments/RecordCommentsBlock.vue'
import code0 from '@/components/blocks/comments-attachments/RecordCommentsBlock.vue?raw'
import RecordAttachmentsBlock from '@/components/blocks/comments-attachments/RecordAttachmentsBlock.vue'
import code1 from '@/components/blocks/comments-attachments/RecordAttachmentsBlock.vue?raw'
import RecordSidePanelBlock from '@/components/blocks/comments-attachments/RecordSidePanelBlock.vue'
import code2 from '@/components/blocks/comments-attachments/RecordSidePanelBlock.vue?raw'
const examples = [
  {
    id: 'record-comments',
    title: 'Record comments',
    description:
      'Discuss an order with teammates: mention people, post with Ctrl+Enter or ⌘+Enter, and edit or delete your own comments.',
    component: RecordCommentsBlock,
    code: code0,
  },
  {
    id: 'record-attachments',
    title: 'Attachments',
    description:
      'Drop or choose files, see why a file was rejected, then preview, download, or remove what is attached.',
    component: RecordAttachmentsBlock,
    code: code1,
    mobilePreview: true,
  },
  {
    id: 'record-side-panel',
    title: 'Record side panel',
    description:
      'Keep comments and attachments beside the record they belong to, with counts on each tab.',
    component: RecordSidePanelBlock,
    code: code2,
  },
]
const usage = [
  'Comments use Textarea with a visible label, a character limit, and AutoComplete to insert @mentions. Only the author sees Edit and Delete, and deleting asks for confirmation. New comments, including replies from teammates, are announced politely.',
  'Attachments use FileUpload with customUpload, so nothing leaves the browser. Each chosen or dropped file is checked for type (PDF, PNG, JPG, WebP or CSV) and size (10 MB) with a specific error. Preview and download use local object URLs, which are revoked when a file is removed or the panel unmounts.',
  'The panels live in the same folder as the blocks (CommentsPanel, AttachmentsPanel, useAttachments, record-activity.ts). Replace the sample data and local handlers with your comment and upload APIs.',
]
</script>

<template>
  <BlockDoc
    title="Comments & attachments"
    description="Collaboration panels for discussing a record and keeping its supporting files together."
    :usage="usage"
    :examples="examples"
  />
</template>
