<script setup lang="ts">
import { shallowRef, useId } from 'vue'
const id = useId()
const visible = shallowRef(false)
const owners = ['Amina Hassan', 'Brian Otieno', 'Grace Wanjiku']
const assigned = shallowRef<string | null>(null)
const draft = shallowRef<string | null>(null)
const error = shallowRef('')
function open() {
  draft.value = assigned.value
  error.value = ''
  visible.value = true
}
function save() {
  if (!draft.value || !owners.includes(draft.value)) {
    error.value = 'Choose a team member.'
    return
  }
  assigned.value = draft.value
  visible.value = false
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <p role="status" class="text-sm text-muted">
      {{ assigned ? `Assigned to ${assigned} in this preview.` : 'This order is unassigned.' }}
    </p>
    <Button
      type="button"
      severity="secondary"
      outlined
      aria-haspopup="dialog"
      :aria-controls="id"
      :aria-expanded="visible"
      @click="open"
      >Assign order</Button
    >
  </div>
  <Dialog
    :id="id"
    v-model:visible="visible"
    modal
    blockScroll
    header="Assign order"
    class="w-[calc(100vw-2rem)] max-w-lg"
  >
    <form :id="`${id}-form`" novalidate class="flex flex-col gap-4 text-sm" @submit.prevent="save">
      <p class="text-muted">Choose who will coordinate order FTF-1042.</p>
      <div class="flex flex-col gap-2">
        <label :for="`${id}-owner`" class="font-medium">Team member</label
        ><Select
          :inputId="`${id}-owner`"
          v-model="draft"
          :options="owners"
          placeholder="Choose a team member"
          :invalid="!!error"
          :aria-invalid="!!error"
          :aria-describedby="`${id}-error`"
          fluid
        /><Message
          v-if="error"
          :id="`${id}-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ error }}</Message
        >
      </div>
    </form>
    <template #footer
      ><Button type="button" severity="secondary" outlined @click="visible = false">Cancel</Button
      ><Button type="submit" :form="`${id}-form`">Save assignment</Button></template
    >
  </Dialog>
</template>
