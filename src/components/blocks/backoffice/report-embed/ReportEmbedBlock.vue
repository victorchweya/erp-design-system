<script setup lang="ts">
// GOAL: Pick a report and read it in place, with clear loading and failed states.
import { computed, shallowRef, useId, useTemplateRef, watch } from 'vue'
import Refresh from '@primeicons/vue/refresh'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import Inbox from '@primeicons/vue/inbox'
import type { ReportDefinition, ReportState } from './reports'

const props = withDefaults(
  defineProps<{
    reports: ReportDefinition[]
    /** Set by the parent: loading while a signed address is fetched, failed when that fails. */
    state?: ReportState
    /** Why the report failed, in plain words. */
    errorMessage?: string
    /** What the report frame may do. The default suits a hosted report that needs its scripts. */
    sandbox?: string
  }>(),
  {
    state: 'ready',
    errorMessage: 'The report server did not respond.',
    sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads',
  },
)
const emit = defineEmits<{
  /** Try the same report again after it failed. */
  retry: []
  /** Ask for a new signed address, because the current one may have expired. */
  refresh: []
}>()
/** Id of the report being read. The parent decides what to load when it changes. */
const selected = defineModel<string | null>('selected', { default: null })

const id = useId()
const area = useTemplateRef<HTMLElement>('area')
const frameLoaded = shallowRef(false)

const current = computed(() => props.reports.find((report) => report.id === selected.value))
const groups = computed(() => {
  const byCategory = new Map<string, ReportDefinition[]>()
  for (const report of props.reports) {
    byCategory.set(report.category, [...(byCategory.get(report.category) ?? []), report])
  }
  return Array.from(byCategory, ([label, items]) => ({ label, items }))
})
// The frame can still be fetching its page after the address is ready.
const busy = computed(
  () =>
    !!current.value &&
    (props.state === 'loading' || (props.state === 'ready' && !frameLoaded.value)),
)
const statusText = computed(() => (busy.value ? `Loading ${current.value?.name}` : ''))

watch([() => current.value?.url, () => props.state], () => (frameLoaded.value = false))

// The button that was pressed disappears or is disabled while loading, so keep focus in the report area.
function ask(event: 'retry' | 'refresh') {
  area.value?.focus()
  if (event === 'retry') emit('retry')
  else emit('refresh')
}
</script>

<template>
  <section class="flex h-full min-h-0 flex-col gap-2 text-sm" aria-label="Report viewer">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
      <div class="w-full sm:w-64">
        <label :for="`${id}-report`" class="sr-only">Report</label>
        <Select
          v-model="selected"
          :inputId="`${id}-report`"
          :options="groups"
          optionLabel="name"
          optionValue="id"
          optionGroupLabel="label"
          optionGroupChildren="items"
          placeholder="Choose a report"
          size="small"
          :disabled="!reports.length"
          fluid
        />
      </div>
      <p v-if="current?.description" class="min-w-0 flex-1 basis-48 truncate text-muted">
        {{ current.description }}
      </p>
      <Button
        v-if="current"
        type="button"
        label="Refresh"
        size="small"
        severity="primary"
        outlined
        class="ml-auto"
        :disabled="state !== 'ready'"
        @click="ask('refresh')"
      >
        <template #icon="{ class: iconClass }">
          <Refresh :class="iconClass" aria-hidden="true" />
        </template>
      </Button>
    </div>
    <div
      ref="area"
      tabindex="-1"
      role="region"
      :aria-label="current ? `${current.name} report` : 'Report'"
      :aria-busy="busy"
      class="relative flex min-h-96 flex-1 flex-col gap-2"
    >
      <p role="status" class="sr-only">{{ statusText }}</p>
      <div v-if="!current" class="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <Inbox :size="32" aria-hidden="true" class="text-muted" />
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-lg font-medium">Choose a report</h3>
          <p class="max-w-md text-sm text-muted">Select a report above to read it here.</p>
        </div>
      </div>
      <div
        v-else-if="state === 'failed'"
        role="alert"
        class="flex flex-1 flex-col items-center justify-center gap-4 text-center"
      >
        <ExclamationTriangle :size="32" aria-hidden="true" class="text-error" />
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-lg font-medium">Could not load {{ current.name }}</h3>
          <p class="max-w-md text-sm text-muted">{{ errorMessage }}</p>
        </div>
        <Button type="button" size="small" severity="primary" outlined @click="ask('retry')">
          <Refresh aria-hidden="true" />Retry
        </Button>
      </div>
      <template v-else>
        <iframe
          v-if="state === 'ready'"
          :key="current.url"
          :src="current.url"
          :title="current.name"
          :sandbox="sandbox"
          loading="lazy"
          class="min-h-0 w-full flex-1 border border-surface"
          @load="frameLoaded = true"
        />
        <div v-if="busy" class="absolute inset-0 flex flex-col gap-2 bg-surface" aria-hidden="true">
          <p class="text-muted">Loading {{ current.name }}…</p>
          <Skeleton width="40%" />
          <Skeleton height="auto" class="flex-1" />
        </div>
      </template>
    </div>
  </section>
</template>
