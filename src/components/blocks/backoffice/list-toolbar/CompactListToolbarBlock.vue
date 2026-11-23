<script setup lang="ts">
import { computed, nextTick, shallowRef, useId, useTemplateRef } from 'vue'
import ListToolbarBlock, { type ListToolbarAppliedFilter } from './ListToolbarBlock.vue'

type Supplier = { name: string; county: string; status: 'Active' | 'On hold' }
const suppliers: Supplier[] = [
  { name: 'Kijani Growers Ltd', county: 'Kiambu', status: 'Active' },
  { name: 'Naivasha Fresh Farms', county: 'Nakuru', status: 'Active' },
  { name: 'Limuru Dairy Co-op', county: 'Kiambu', status: 'On hold' },
  { name: 'Mwangi Family Farm', county: 'Murang’a', status: 'Active' },
  { name: 'Thika Greens Aggregators', county: 'Kiambu', status: 'On hold' },
]

const id = useId()
const toolbar = useTemplateRef<InstanceType<typeof ListToolbarBlock>>('toolbar')
const search = shallowRef('')
const status = shallowRef<string | null>(null)
const exportNote = shallowRef('')

const rows = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  return suppliers.filter(
    (supplier) =>
      (!keyword || supplier.name.toLowerCase().includes(keyword)) &&
      (!status.value || supplier.status === status.value),
  )
})
const appliedFilters = computed(() => {
  const applied: ListToolbarAppliedFilter[] = []
  if (search.value.trim())
    applied.push({ key: 'search', label: 'Search', value: search.value.trim() })
  if (status.value) applied.push({ key: 'status', label: 'Status', value: status.value })
  return applied
})

function removeFilter(key: string) {
  if (key === 'search') search.value = ''
  else status.value = null
}
function clearFilters() {
  search.value = ''
  status.value = null
}
function clearFromEmptyState() {
  clearFilters()
  void nextTick(() => toolbar.value?.focusSearch())
}
function exportCsv() {
  exportNote.value = `Exported ${rows.value.length} ${rows.value.length === 1 ? 'supplier' : 'suppliers'} to CSV in this preview.`
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <ListToolbarBlock
      ref="toolbar"
      v-model:search="search"
      search-label="Search suppliers"
      search-placeholder="Supplier name"
      :applied-filters="appliedFilters"
      :total="rows.length"
      :noun="{ one: 'supplier', other: 'suppliers' }"
      exportable
      @remove-filter="removeFilter"
      @clear="clearFilters"
      @export="exportCsv"
    >
      <template #filters="{ size }">
        <div class="sm:w-36">
          <label :for="`${id}-status`" class="sr-only">Status</label>
          <Select
            v-model="status"
            :inputId="`${id}-status`"
            :options="['Active', 'On hold']"
            :size="size"
            placeholder="Status"
            showClear
            fluid
          />
        </div>
      </template>
    </ListToolbarBlock>
    <DataTable
      :value="rows"
      dataKey="name"
      size="small"
      :tableProps="{ 'aria-label': 'Suppliers' }"
    >
      <Column field="name" header="Supplier" />
      <Column field="county" header="County" />
      <Column field="status" header="Status">
        <template #body="{ data }"
          ><Tag :severity="data.status === 'Active' ? 'success' : 'warn'">{{
            data.status
          }}</Tag></template
        >
      </Column>
      <template #empty>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p>No suppliers match these filters.</p>
          <Button
            type="button"
            size="small"
            severity="secondary"
            outlined
            @click="clearFromEmptyState"
            >Clear filters</Button
          >
        </div>
      </template>
    </DataTable>
    <p role="status" class="text-sm text-muted">{{ exportNote }}</p>
  </div>
</template>
