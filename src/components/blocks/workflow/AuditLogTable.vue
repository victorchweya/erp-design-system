<script setup lang="ts">
import { shallowRef } from 'vue'
import Download from '@primeicons/vue/download'
import { formatDateTime } from '@/utils/format'
import {
  describeChanges,
  formatRelative,
  typeLabel,
  typeSeverity,
  type ActivityEntry,
} from './activity-feed'

const props = defineProps<{ entries: ActivityEntry[]; now: Date }>()
const exportMessage = shallowRef('')

function exportLog() {
  exportMessage.value = `Export prepared for ${props.entries.length} entries in this preview. Connect it to your export service.`
}
</script>

<template>
  <DataTable
    :value="entries"
    dataKey="id"
    size="small"
    showGridlines
    paginator
    :rows="10"
    sortField="at"
    :sortOrder="-1"
    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
    :tableProps="{ 'aria-label': 'Audit log' }"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-sm text-muted">{{ entries.length }} entries, newest first.</p>
        <Button type="button" severity="primary" outlined size="small" @click="exportLog"
          ><Download aria-hidden="true" />Export CSV</Button
        >
      </div>
      <p role="status" class="pt-2 text-sm text-muted" :class="{ 'sr-only': !exportMessage }">
        {{ exportMessage }}
      </p>
    </template>
    <Column field="at" header="Time" sortable class="whitespace-nowrap">
      <template #body="{ data }">
        <time :datetime="data.at">{{ formatDateTime(data.at) }}</time>
        <span class="block text-muted">{{ formatRelative(data.at, now) }}</span>
      </template>
    </Column>
    <Column field="actor" header="User" sortable />
    <Column field="type" header="Type" sortable>
      <template #body="{ data }">
        <Tag :severity="typeSeverity[(data as ActivityEntry).type]">{{
          typeLabel[(data as ActivityEntry).type]
        }}</Tag>
      </template>
    </Column>
    <Column field="record" header="Record" sortable />
    <Column header="Action">
      <template #body="{ data }">
        <span>{{ data.action }}</span>
        <span v-if="data.changes" class="block text-muted">{{
          describeChanges(data.changes)
        }}</span>
        <span v-else-if="data.comment" class="block text-muted">“{{ data.comment }}”</span>
      </template>
    </Column>
    <template #empty><p class="py-4">No entries match these filters.</p></template>
  </DataTable>
</template>
