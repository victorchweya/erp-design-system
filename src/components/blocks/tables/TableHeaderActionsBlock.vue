<script lang="ts">
export interface TableColumnOption {
  key: string
  label: string
  required?: boolean
}
</script>

<script setup lang="ts">
import { computed, useId, useTemplateRef } from 'vue'
import type Popover from 'primevue/popover'
import Download from '@primeicons/vue/download'
import Table from '@primeicons/vue/table'

const props = defineProps<{
  columns: readonly TableColumnOption[]
  visibleColumns: string[]
}>()

const emit = defineEmits<{
  'update:visibleColumns': [columns: string[]]
  export: []
}>()

const id = useId()
const columnsPopover = useTemplateRef<InstanceType<typeof Popover>>('columnsPopover')
const allColumnsVisible = computed(() => props.visibleColumns.length === props.columns.length)

function setColumn(column: TableColumnOption, visible: boolean) {
  if (column.required) return
  emit(
    'update:visibleColumns',
    visible
      ? [...props.visibleColumns, column.key]
      : props.visibleColumns.filter((key) => key !== column.key),
  )
}

function showAll() {
  emit(
    'update:visibleColumns',
    props.columns.map(({ key }) => key),
  )
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button type="button" severity="primary" outlined @click="$emit('export')">
      <Download aria-hidden="true" />
      Export
    </Button>
    <Button
      type="button"
      iconOnly
      severity="primary"
      outlined
      aria-label="Columns"
      v-tooltip.top="'Columns'"
      aria-haspopup="dialog"
      :aria-controls="`${id}-columns`"
      @click="columnsPopover?.toggle($event)"
    >
      <Table aria-hidden="true" />
    </Button>

    <Popover :id="`${id}-columns`" ref="columnsPopover" aria-label="Choose columns">
      <div class="flex w-60 max-w-full flex-col gap-2">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-medium">Columns</span>
          <Button
            type="button"
            size="small"
            severity="primary"
            text
            :disabled="allColumnsVisible"
            @click="showAll"
            >Show all</Button
          >
        </div>
        <ul class="flex max-h-72 flex-col gap-1.5 overflow-y-auto">
          <li v-for="column in columns" :key="column.key" class="flex items-center gap-2">
            <Checkbox
              :modelValue="visibleColumns.includes(column.key)"
              binary
              :inputId="`${id}-column-${column.key}`"
              :disabled="column.required"
              @update:modelValue="setColumn(column, $event)"
            />
            <label :for="`${id}-column-${column.key}`" class="text-sm">
              {{ column.label
              }}<span v-if="column.required" class="text-muted"> (always shown)</span>
            </label>
          </li>
        </ul>
      </div>
    </Popover>
  </div>
</template>
