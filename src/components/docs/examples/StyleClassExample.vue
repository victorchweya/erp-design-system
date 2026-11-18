<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import vStyleclass from 'primevue/styleclass'
const id = useId()
const expanded = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button
      v-styleclass="{ selector: '@next', toggleClass: 'hidden' }"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="id"
      class="self-start"
      @click="expanded = !expanded"
      >Toggle instructions</Button
    >
    <div :id="id" class="hidden rounded-lg border border-surface p-4">
      Keep produce shaded until collection.
    </div>
  </div>
</template>
