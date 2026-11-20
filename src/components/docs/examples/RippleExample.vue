<script setup lang="ts">
import { shallowRef } from 'vue'
import vRipple from 'primevue/ripple'

const status = shallowRef('Choose a quick action.')
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- The host needs relative and overflow-hidden to contain the ripple. -->
    <button
      v-ripple
      type="button"
      class="relative flex max-w-xs flex-col gap-1 self-start overflow-hidden rounded-border border border-surface bg-surface p-4 text-left text-color hover:bg-emphasis"
      @click="status = 'Record delivery selected.'"
    >
      <span class="font-medium">Record delivery</span>
      <span class="text-sm text-muted-color">Log weights for an arriving truck</span>
    </button>
    <p role="status" class="text-muted-color">{{ status }}</p>
  </div>
</template>
