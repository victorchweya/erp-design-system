<script setup lang="ts">
import { shallowRef } from 'vue'
const favourite = shallowRef(false)
const compact = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ToggleButton
      v-model="favourite"
      onLabel="Saved"
      offLabel="Save favourite"
      aria-label="Save as favourite"
    /><ToggleButton
      v-model="compact"
      onLabel="Compact view"
      offLabel="Comfortable view"
      aria-label="Compact view"
      size="small"
    /><ToggleButton
      :modelValue="false"
      offLabel="Unavailable"
      disabled
      aria-label="Unavailable option"
    />
  </div>
</template>
