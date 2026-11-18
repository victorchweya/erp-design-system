<script setup lang="ts">
import Check from '@primeicons/vue/check'
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Chip label="Kale" /><Chip label="Local produce"
      ><template #icon><Check :size="12" aria-hidden="true" /></template
    ></Chip>
  </div>
</template>
