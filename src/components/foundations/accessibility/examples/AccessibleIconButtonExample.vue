<script setup lang="ts">
import Pencil from '@primeicons/vue/pencil'
import Trash from '@primeicons/vue/trash'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <span class="font-medium">Sukuma wiki · 40 kg</span>
    <div class="flex gap-2">
      <Button
        type="button"
        severity="primary"
        variant="outlined"
        iconOnly
        aria-label="Edit Sukuma wiki line"
        v-tooltip.top="'Edit'"
        ><Pencil aria-hidden="true"
      /></Button>
      <Button
        type="button"
        severity="danger"
        variant="outlined"
        iconOnly
        aria-label="Remove Sukuma wiki line"
        v-tooltip.top="'Remove'"
        ><Trash aria-hidden="true"
      /></Button>
    </div>
  </div>
</template>
