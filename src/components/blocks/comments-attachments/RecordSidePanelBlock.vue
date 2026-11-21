<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import AttachmentsPanel from './AttachmentsPanel.vue'
import CommentsPanel from './CommentsPanel.vue'
import { useAttachments } from './useAttachments'
import {
  CURRENT_USER_ID,
  sampleAttachmentFiles,
  sampleComments,
  type RecordComment,
} from './record-activity'
import { formatCurrency, formatDate } from '@/utils/format'

const active = shallowRef('comments')
const comments = ref<RecordComment[]>(sampleComments())
const { attachments, add, remove } = useAttachments(sampleAttachmentFiles())

function attach(files: File[]) {
  add(files.map((file) => ({ file, uploadedBy: CURRENT_USER_ID })))
}
</script>

<template>
  <div class="grid gap-6 text-sm lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
    <Card class="min-w-0">
      <template #title><h3 class="text-xl font-medium">Order FTF-1042</h3></template>
      <template #subtitle>Green Basket · Nairobi</template>
      <template #content>
        <dl class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-1">
            <dt class="text-muted">Status</dt>
            <dd><Tag class="bg-primary text-primary-contrast">Confirmed</Tag></dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Delivery</dt>
            <dd>{{ formatDate('2026-11-20') }}, 10:00 slot</dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Items</dt>
            <dd>Kale 16 kg · Spinach 4 kg · Carrots 15 kg</dd>
          </div>
          <div class="space-y-1">
            <dt class="text-muted">Order total</dt>
            <dd class="tabular-nums">{{ formatCurrency(12450) }}</dd>
          </div>
        </dl>
      </template>
    </Card>
    <aside class="min-w-0" aria-label="Order activity">
      <Card>
        <template #content>
          <Tabs v-model:value="active">
            <TabList aria-label="Comments and attachments">
              <Tab value="comments" class="flex items-center gap-2"
                >Comments <Badge :value="comments.length" severity="secondary"
              /></Tab>
              <Tab value="attachments" class="flex items-center gap-2"
                >Attachments <Badge :value="attachments.length" severity="secondary"
              /></Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="comments">
                <CommentsPanel v-model="comments" record="order FTF-1042" />
              </TabPanel>
              <TabPanel value="attachments">
                <AttachmentsPanel
                  record="order FTF-1042"
                  :attachments="attachments"
                  @add="attach"
                  @remove="remove"
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </template>
      </Card>
    </aside>
  </div>
</template>
