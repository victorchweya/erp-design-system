<script setup lang="ts">
import { computed, nextTick, shallowRef, useId, watch } from 'vue'
import FilterSlash from '@primeicons/vue/filter-slash'
import ActivityFeedList from './ActivityFeedList.vue'
import AuditLogTable from './AuditLogTable.vue'
import {
  activityTypes,
  actors,
  createActivity,
  groupByDay,
  type ActivityType,
} from './activity-feed'

const PAGE_SIZE = 8
const id = useId()
const now = new Date()
const entries = createActivity(now)
const views = ['Feed', 'Audit table']

const view = shallowRef('Feed')
const type = shallowRef<ActivityType | null>(null)
const actor = shallowRef<string | null>(null)
const visibleCount = shallowRef(PAGE_SIZE)
const announcement = shallowRef('')

const filtered = computed(() =>
  entries.filter(
    (entry) =>
      (!type.value || entry.type === type.value) && (!actor.value || entry.actor === actor.value),
  ),
)
const visible = computed(() => filtered.value.slice(0, visibleCount.value))
const groups = computed(() => groupByDay(visible.value, now))
const remaining = computed(() => filtered.value.length - visible.value.length)
const hasFilters = computed(() => !!type.value || !!actor.value)

watch([type, actor], () => {
  visibleCount.value = PAGE_SIZE
  announcement.value = `${filtered.value.length} ${filtered.value.length === 1 ? 'activity' : 'activities'} match these filters.`
})

function loadMore() {
  const firstNew = filtered.value[visibleCount.value]
  visibleCount.value += PAGE_SIZE
  announcement.value = `Showing ${visible.value.length} of ${filtered.value.length} activities.`
  if (firstNew) nextTick(() => document.getElementById(`${id}-${firstNew.id}`)?.focus())
}

function clearFilters() {
  type.value = null
  actor.value = null
}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h3 class="text-xl font-medium">Activity</h3>
        <SelectButton
          v-model="view"
          :options="views"
          :allowEmpty="false"
          size="small"
          aria-label="Activity view"
        />
      </div>
    </template>
    <template #subtitle>Changes, comments, and system events across orders and suppliers.</template>
    <template #content>
      <div class="flex flex-col gap-6 text-sm">
        <div class="flex flex-wrap items-end gap-3">
          <div class="flex min-w-0 flex-1 basis-44 flex-col gap-1">
            <label :for="`${id}-type`" class="font-medium">Type</label>
            <Select
              v-model="type"
              :inputId="`${id}-type`"
              :options="activityTypes"
              optionLabel="label"
              optionValue="value"
              placeholder="All types"
              showClear
              fluid
            />
          </div>
          <div class="flex min-w-0 flex-1 basis-44 flex-col gap-1">
            <label :for="`${id}-actor`" class="font-medium">User</label>
            <Select
              v-model="actor"
              :inputId="`${id}-actor`"
              :options="actors"
              placeholder="All users"
              showClear
              fluid
            />
          </div>
          <Button
            type="button"
            severity="secondary"
            outlined
            :disabled="!hasFilters"
            @click="clearFilters"
            ><FilterSlash aria-hidden="true" />Clear filters</Button
          >
        </div>

        <p role="status" class="sr-only">{{ announcement }}</p>

        <template v-if="view === 'Feed'">
          <ActivityFeedList v-if="groups.length" :groups="groups" :now="now" :idPrefix="id" />
          <div v-else class="flex flex-col items-start gap-3 py-4">
            <p>No activity matches these filters.</p>
            <Button type="button" severity="secondary" outlined size="small" @click="clearFilters"
              >Clear filters</Button
            >
          </div>
          <div v-if="filtered.length" class="flex flex-wrap items-center gap-3">
            <Button
              v-if="remaining > 0"
              type="button"
              severity="secondary"
              outlined
              @click="loadMore"
              >Load {{ Math.min(remaining, PAGE_SIZE) }} more</Button
            >
            <p class="text-muted">
              Showing {{ visible.length }} of {{ filtered.length }}
              {{ filtered.length === 1 ? 'activity' : 'activities' }}
            </p>
          </div>
        </template>
        <AuditLogTable v-else :entries="filtered" :now="now" />
      </div>
    </template>
  </Card>
</template>
