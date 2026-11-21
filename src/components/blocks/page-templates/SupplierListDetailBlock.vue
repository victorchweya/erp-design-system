<script setup lang="ts">
import { computed, ref, shallowRef, useTemplateRef, watch } from 'vue'
import SupplierListPanel from './SupplierListPanel.vue'
import SupplierDetailPanel from './SupplierDetailPanel.vue'
import SupplierEditDrawer from './SupplierEditDrawer.vue'
import { sampleSuppliers, supplierDetails, type Supplier, type SupplierDetails } from './suppliers'
import { useSupplierRoute } from './useSupplierRoute'

// Local copy so preview edits never change the shared sample data.
const suppliers = ref<Supplier[]>(structuredClone(sampleSuppliers))
const supplierIds = sampleSuppliers.map(({ id }) => id)
const drawer = useTemplateRef('drawer')
const returnFocusId = shallowRef<string | null>(null)
const feedback = shallowRef('')
let editTrigger: HTMLElement | null = null

// The selected supplier, edit view, and search live in the URL query.
const { state, open, backToList, openEdit, closeEdit, setSearch } = useSupplierRoute(supplierIds, {
  confirmLeaveEdit: () => drawer.value?.confirmDiscard() ?? true,
})

const selected = computed(
  () => suppliers.value.find(({ id }) => id === state.value.supplierId) ?? null,
)
const selectedDetails = computed(() => (selected.value ? supplierDetails(selected.value) : null))
const query = computed({ get: () => state.value.search, set: setSearch })
const editing = computed({
  get: () => state.value.editing,
  set: (value) => (value ? openEdit() : closeEdit()),
})

// Covers in-page actions and browser Back/Forward alike.
watch(
  () => state.value.supplierId,
  (_, previous) => {
    feedback.value = ''
    // Return focus to the row the user opened before going back.
    if (previous) returnFocusId.value = previous
  },
)

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
      @back="backToList"
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
      ref="drawer"
      v-model:visible="editing"
      :supplier="selectedDetails"
      @save="save"
      @after-hide="editTrigger?.focus()"
    />
  </div>
</template>
