<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import Refresh from '@primeicons/vue/refresh'
import { formatNumber, formatTime } from '@/utils/format'

interface Run {
  route: string
  driver: string
  crates: number
  status: string
}

const runs = shallowRef<Run[]>([
  { route: 'Westlands & Parklands', driver: 'Peter Mwangi', crates: 64, status: 'Loading' },
  { route: 'Industrial Area', driver: 'Grace Achieng', crates: 48, status: 'In transit' },
  { route: 'Karen & Langata', driver: 'Samuel Kiprono', crates: 72, status: 'Planned' },
])
const refreshing = shallowRef(false)
const updatedAt = shallowRef(new Date())
const message = shallowRef('')
let timer: ReturnType<typeof setTimeout> | undefined

// Keep the current rows visible; only the indicator and the updated rows change.
function refresh() {
  if (refreshing.value) return
  refreshing.value = true
  message.value = 'Refreshing runs'
  timer = setTimeout(() => {
    runs.value = runs.value.map((run) =>
      run.status === 'Loading'
        ? { ...run, status: 'In transit' }
        : run.status === 'Planned'
          ? { ...run, status: 'Loading' }
          : run,
    )
    updatedAt.value = new Date()
    refreshing.value = false
    message.value = `Runs updated at ${formatTime(updatedAt.value)}`
  }, 1500)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-muted">Updated {{ formatTime(updatedAt) }}</p>
      <Button
        type="button"
        severity="primary"
        outlined
        size="small"
        :aria-disabled="refreshing"
        @click="refresh"
      >
        <Refresh :class="{ 'animate-spin': refreshing }" aria-hidden="true" />
        {{ refreshing ? 'Refreshing…' : 'Refresh' }}
      </Button>
    </div>
    <p role="status" class="sr-only">{{ message }}</p>
    <div class="h-1">
      <ProgressBar
        v-if="refreshing"
        mode="indeterminate"
        class="h-1"
        aria-label="Refreshing runs"
      />
    </div>
    <div :aria-busy="refreshing">
      <DataTable
        :value="runs"
        dataKey="route"
        size="small"
        showGridlines
        :tableProps="{ 'aria-label': 'Today’s delivery runs' }"
      >
        <Column field="route" header="Route" style="min-width: 10rem" />
        <Column field="driver" header="Driver" style="min-width: 9rem" />
        <Column field="crates" header="Crates" style="min-width: 5rem">
          <template #body="{ data }">{{ formatNumber(data.crates) }}</template>
        </Column>
        <Column field="status" header="Status" style="min-width: 7rem">
          <template #body="{ data }">
            <Tag
              :severity="data.status === 'Planned' ? 'secondary' : 'info'"
              :value="data.status"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
