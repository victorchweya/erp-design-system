<script setup lang="ts">
import { onBeforeUnmount, shallowRef, useId } from 'vue'
import ReportEmbedBlock from './ReportEmbedBlock.vue'
import { buildSampleReports, type ReportState } from './reports'

const props = defineProps<{
  /** Adds a control for choosing the state, so each state can be inspected. */
  stateSwitcher?: boolean
}>()

const id = useId()
const stateOptions: { label: string; value: ReportState }[] = [
  { label: 'Ready', value: 'ready' },
  { label: 'Loading', value: 'loading' },
  { label: 'Failed', value: 'failed' },
]
const signs = shallowRef(0)
const reports = shallowRef(buildSampleReports(signs.value))
const selected = shallowRef<string | null>(props.stateSwitcher ? 'supplier-payments' : 'growth')
const state = shallowRef<ReportState>(props.stateSwitcher ? 'failed' : 'ready')
let timer: ReturnType<typeof setTimeout> | undefined

// Replace with your call for a signed address. The preview just waits, then succeeds.
function sign() {
  clearTimeout(timer)
  state.value = 'loading'
  timer = setTimeout(() => {
    signs.value += 1
    reports.value = buildSampleReports(signs.value)
    state.value = 'ready'
  }, 900)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-if="stateSwitcher" class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <span :id="`${id}-state`" class="text-sm text-muted">Preview state</span>
      <SelectButton
        v-model="state"
        :options="stateOptions"
        optionLabel="label"
        optionValue="value"
        :allowEmpty="false"
        size="small"
        :ariaLabelledby="`${id}-state`"
      />
    </div>
    <div class="h-[28rem]">
      <ReportEmbedBlock
        v-model:selected="selected"
        :reports="reports"
        :state="state"
        @update:selected="sign"
        @retry="sign"
        @refresh="sign"
      />
    </div>
  </div>
</template>
