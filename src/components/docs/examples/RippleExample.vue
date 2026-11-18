<script setup lang="ts">
import { shallowRef } from 'vue'
import vRipple from 'primevue/ripple'
const count = shallowRef(0)
</script>

<template>
  <div class="flex flex-col gap-4">
    <button
      v-ripple
      type="button"
      class="relative overflow-hidden self-start rounded-md border border-surface bg-surface px-6 py-4 font-medium text-color"
      @click="count++"
    >
      Try ripple
    </button>
    <p role="status">Activated {{ count }} times.</p>
  </div>
</template>
