<script setup lang="ts">
import { shallowRef, useId } from 'vue'
const id = useId()
const visible = shallowRef(false)
const saved = shallowRef('14 Market Road, Nairobi')
const draft = shallowRef('')
const error = shallowRef('')
const feedback = shallowRef('')
let trigger: HTMLElement | null = null
function open(event: Event) {
  trigger = event.currentTarget as HTMLElement
  draft.value = saved.value
  error.value = ''
  visible.value = true
}
function save() {
  const address = draft.value.trim()
  if (!address) {
    error.value = 'Enter a delivery address.'
    return
  }
  saved.value = address
  feedback.value = 'Delivery address saved in this preview.'
  visible.value = false
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <p class="text-sm text-muted">Current address: {{ saved }}</p>
    <Button
      type="button"
      aria-haspopup="dialog"
      :aria-controls="id"
      :aria-expanded="visible"
      @click="open"
      >Edit delivery address</Button
    >
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">{{ feedback }}</p>
  </div>
  <Drawer
    :id="id"
    v-model:visible="visible"
    header="Edit delivery"
    aria-label="Edit delivery address"
    position="right"
    :dismissable="false"
    blockScroll
    class="w-full sm:w-96"
    @after-hide="trigger?.focus()"
  >
    <form :id="`${id}-form`" novalidate class="flex flex-col gap-4 text-sm" @submit.prevent="save">
      <p class="text-muted">
        Update the address for order FTF-1042. Changes apply only after saving.
      </p>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-address`" class="font-medium">Delivery address</label>
        <Textarea
          :id="`${id}-address`"
          v-model="draft"
          :rows="4"
          required
          autofocus
          :invalid="!!error"
          :aria-invalid="!!error"
          :aria-describedby="`${id}-help ${id}-error`"
          fluid
        />
        <p :id="`${id}-help`" class="text-muted">Required. Include the building and street.</p>
        <Message v-if="error" :id="`${id}-error`" severity="error" variant="simple" size="small">{{
          error
        }}</Message>
      </div>
    </form>
    <template #footer
      ><div class="flex flex-wrap justify-end gap-2">
        <Button type="button" severity="secondary" outlined @click="visible = false">Cancel</Button
        ><Button type="submit" :form="`${id}-form`">Save changes</Button>
      </div></template
    >
  </Drawer>
</template>
