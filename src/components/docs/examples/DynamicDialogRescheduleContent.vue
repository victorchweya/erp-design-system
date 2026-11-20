<script setup lang="ts">
import { inject, shallowRef, useId, type Ref } from 'vue'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

interface RescheduleData {
  delivery: string
  customer: string
  window: string
}

const id = useId()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const data = dialogRef?.value.data as RescheduleData
const windows = ['Friday, 08:00–12:00', 'Friday, 13:00–17:00', 'Saturday, 08:00–12:00']
const selected = shallowRef(data.window)

function save() {
  dialogRef?.value.close({ window: selected.value })
}

function cancel() {
  dialogRef?.value.close()
}
</script>

<template>
  <form class="flex flex-col gap-4 text-sm" @submit.prevent="save">
    <p class="text-muted-color">{{ data.customer }} · {{ data.delivery }}</p>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-window`" class="font-medium">Delivery window</label>
      <!-- Select has no autofocus prop, so pass it to the focusable label element. -->
      <Select
        :inputId="`${id}-window`"
        v-model="selected"
        :options="windows"
        :pt="{ label: { autofocus: true } }"
        fluid
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" outlined @click="cancel">Cancel</Button>
      <Button type="submit">Save window</Button>
    </div>
  </form>
</template>
