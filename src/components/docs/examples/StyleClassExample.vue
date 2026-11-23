<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import vStyleclass from 'primevue/styleclass'

const id = useId()
// StyleClass changes the DOM only. Track the state yourself for aria-expanded.
const expanded = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button
      v-styleclass="{ selector: '@next', toggleClass: 'hidden' }"
      type="button"
      severity="primary"
      outlined
      :aria-expanded="expanded"
      :aria-controls="id"
      class="self-start"
      @click="expanded = !expanded"
      >Handling instructions</Button
    >
    <div :id="id" class="hidden rounded-border border border-surface p-4">
      Keep produce shaded until collection. Stack crates no more than five high.
    </div>
  </div>
</template>
