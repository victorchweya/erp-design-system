<script setup lang="ts">
import { shallowRef } from 'vue'
const progress = shallowRef(40)
</script>

<template>
  <div class="flex flex-col gap-4">
    <ProgressBar :value="progress" aria-label="Preparing delivery" />
    <div class="flex flex-wrap gap-2">
      <Button
        type="button"
        :disabled="progress >= 100"
        @click="progress = Math.min(100, progress + 20)"
        >Advance progress</Button
      ><Button type="button" severity="secondary" outlined @click="progress = 0">Reset</Button>
    </div>
    <ProgressBar mode="indeterminate" aria-label="Waiting for a driver" />
  </div>
</template>
