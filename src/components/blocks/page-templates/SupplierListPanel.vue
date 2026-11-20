<script setup lang="ts">
import { computed, nextTick, onMounted, useTemplateRef } from 'vue'
import Search from '@primeicons/vue/search'
import { statusSeverity, type Supplier } from './suppliers'

const props = defineProps<{ suppliers: Supplier[]; focusId?: string | null }>()
const emit = defineEmits<{ open: [id: string] }>()
const query = defineModel<string>('query', { default: '' })
const root = useTemplateRef<HTMLElement>('root')

const filtered = computed(() => {
  const search = query.value.trim().toLowerCase()
  return props.suppliers.filter((supplier) =>
    `${supplier.name} ${supplier.contact} ${supplier.county} ${supplier.produce}`
      .toLowerCase()
      .includes(search),
  )
})

// Return focus to the row the user opened before going back.
onMounted(async () => {
  if (!props.focusId) return
  await nextTick()
  const row = root.value?.querySelector<HTMLElement>(`[data-supplier-id="${props.focusId}"]`)
  ;(row ?? root.value?.querySelector<HTMLElement>('h3'))?.focus()
})
</script>

<template>
  <div ref="root" class="flex flex-col gap-4">
    <header class="flex flex-col gap-1">
      <h3 tabindex="-1" class="text-xl font-medium tracking-tight outline-none">Suppliers</h3>
      <p class="text-sm text-muted">Open a supplier to review details, orders, and activity.</p>
    </header>
    <DataTable
      :value="filtered"
      dataKey="id"
      size="small"
      showGridlines
      scrollable
      :tableProps="{ 'aria-label': 'Suppliers' }"
    >
      <template #header>
        <div class="flex flex-wrap items-center gap-3">
          <IconField class="min-w-0 flex-1 basis-56">
            <InputIcon><Search aria-hidden="true" /></InputIcon>
            <InputText
              v-model="query"
              aria-label="Search suppliers"
              placeholder="Name, contact, county, or produce"
              fluid
            />
          </IconField>
          <span role="status" class="text-sm text-muted">{{ filtered.length }} suppliers</span>
        </div>
      </template>
      <Column field="name" header="Supplier">
        <template #body="{ data }">
          <Button
            type="button"
            variant="link"
            class="p-0 text-left"
            :data-supplier-id="data.id"
            :aria-label="`Open ${data.name}`"
            @click="emit('open', data.id)"
            >{{ data.name }}</Button
          >
        </template>
      </Column>
      <Column field="county" header="County" />
      <Column field="produce" header="Produce" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :severity="statusSeverity[data.status as Supplier['status']]">{{ data.status }}</Tag>
        </template>
      </Column>
      <template #empty>
        <div class="flex flex-col items-start gap-3 py-4">
          <p>No suppliers match “{{ query }}”.</p>
          <Button type="button" severity="secondary" outlined size="small" @click="query = ''"
            >Clear search</Button
          >
        </div>
      </template>
    </DataTable>
  </div>
</template>
