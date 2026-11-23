<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import Plus from '@primeicons/vue/plus'

const id = useId()
const visible = shallowRef(false)
const draft = shallowRef('')
const saved = shallowRef('')

function open() {
  draft.value = saved.value
  visible.value = true
}

function save() {
  saved.value = draft.value.trim()
  visible.value = false
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <p role="status" class="text-sm text-muted-color">
      {{ saved ? `Note for DLV-2291: ${saved}` : 'No note on delivery DLV-2291.' }}
    </p>
    <Button
      type="button"
      severity="primary"
      outlined
      aria-haspopup="dialog"
      :aria-controls="id"
      :aria-expanded="visible"
      @click="open"
      ><Plus aria-hidden="true" />Add delivery note</Button
    >
  </div>
  <Dialog
    :id="id"
    v-model:visible="visible"
    header="Delivery note"
    position="bottomright"
    :modal="false"
    :draggable="false"
    class="w-[calc(100vw-2rem)] max-w-sm"
  >
    <form :id="`${id}-form`" class="flex flex-col gap-1 text-sm" @submit.prevent="save">
      <label :for="`${id}-note`" class="font-medium">Note for the driver</label>
      <Textarea
        :id="`${id}-note`"
        v-model="draft"
        rows="3"
        autoResize
        autofocus
        :aria-describedby="`${id}-help`"
      />
      <small :id="`${id}-help`" class="text-muted-color"
        >You can still scroll and use the page while this is open.</small
      >
    </form>
    <template #footer>
      <Button type="button" severity="secondary" outlined @click="visible = false">Cancel</Button>
      <Button type="submit" :form="`${id}-form`">Save note</Button>
    </template>
  </Dialog>
</template>
