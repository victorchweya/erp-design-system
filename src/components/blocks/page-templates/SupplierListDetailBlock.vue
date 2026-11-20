<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import SupplierListPanel from './SupplierListPanel.vue'
import SupplierDetailPanel from './SupplierDetailPanel.vue'
import SupplierEditDrawer from './SupplierEditDrawer.vue'
import { sampleSuppliers, supplierDetails, type Supplier, type SupplierDetails } from './suppliers'

// Local copy so preview edits never change the shared sample data.
const suppliers = ref<Supplier[]>(structuredClone(sampleSuppliers))
const query = shallowRef('')
const selectedId = shallowRef<string | null>(null)
const returnFocusId = shallowRef<string | null>(null)
const editing = shallowRef(false)
const feedback = shallowRef('')
let editTrigger: HTMLElement | null = null

const selected = computed(() => suppliers.value.find(({ id }) => id === selectedId.value) ?? null)
const selectedDetails = computed(() => (selected.value ? supplierDetails(selected.value) : null))

function open(id: string) {
  feedback.value = ''
  selectedId.value = id
}

function back() {
  returnFocusId.value = selectedId.value
  selectedId.value = null
}

function edit(event: Event) {
  editTrigger = event.currentTarget as HTMLElement
  editing.value = true
}

function save(details: SupplierDetails) {
  if (!selected.value) return
  Object.assign(selected.value, details)
  feedback.value = `${details.name} saved in this preview.`
}
</script>

<template>
  <div class="text-color">
    <SupplierDetailPanel
      v-if="selected"
      :supplier="selected"
      :feedback="feedback"
      @back="back"
      @edit="edit"
    />
    <SupplierListPanel
      v-else
      v-model:query="query"
      :suppliers="suppliers"
      :focusId="returnFocusId"
      @open="open"
    />
    <SupplierEditDrawer
      v-if="selectedDetails"
      v-model:visible="editing"
      :supplier="selectedDetails"
      @save="save"
      @after-hide="editTrigger?.focus()"
    />
  </div>
</template>
