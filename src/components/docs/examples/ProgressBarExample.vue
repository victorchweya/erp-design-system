<script setup lang="ts">
import { shallowRef } from 'vue'
const progress = shallowRef(40)
</script>

<template>
  <div class="flex max-w-lg flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span id="picking-progress-label" class="font-medium">Picking order FTF-1049</span>
      <ProgressBar :value="progress" aria-labelledby="picking-progress-label" />
    </div>
    <div class="flex flex-wrap gap-2">
      <Button
        type="button"
        :disabled="progress >= 100"
        @click="progress = Math.min(100, progress + 20)"
        >Advance progress</Button
      ><Button type="button" severity="secondary" outlined @click="progress = 0">Reset</Button>
    </div>
    <p role="status" class="text-muted-color">
      {{ progress >= 100 ? 'Order FTF-1049 is picked.' : '' }}
    </p>
    <div class="flex flex-col gap-2">
      <span id="driver-progress-label" class="font-medium">Waiting for a driver</span>
      <ProgressBar mode="indeterminate" aria-labelledby="driver-progress-label" />
    </div>
  </div>
</template>
