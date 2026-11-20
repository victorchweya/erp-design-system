<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { formatCurrency } from '@/utils/format'

const SPINNER_DELAY = 300
const loading = shallowRef(false)
const showSpinner = shallowRef(false)
const result = shallowRef('')
let delayTimer: ReturnType<typeof setTimeout> | undefined
let requestTimer: ReturnType<typeof setTimeout> | undefined

// Fast responses finish before the spinner appears, so the panel never flickers.
function load(duration: number) {
  if (loading.value) return
  loading.value = true
  result.value = ''
  delayTimer = setTimeout(() => (showSpinner.value = true), SPINNER_DELAY)
  requestTimer = setTimeout(() => {
    clearTimeout(delayTimer)
    showSpinner.value = false
    loading.value = false
    result.value = `Green Basket loaded in ${duration} ms. Available credit ${formatCurrency(250000)}.`
  }, duration)
}
onBeforeUnmount(() => {
  clearTimeout(delayTimer)
  clearTimeout(requestTimer)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <Button
        type="button"
        severity="secondary"
        outlined
        :aria-disabled="loading"
        @click="load(150)"
        >Load fast response (150 ms)</Button
      >
      <Button
        type="button"
        severity="secondary"
        outlined
        :aria-disabled="loading"
        @click="load(2000)"
        >Load slow response (2 s)</Button
      >
    </div>
    <div
      :aria-busy="loading"
      class="flex min-h-20 items-center gap-3 rounded-border border border-surface p-4"
    >
      <template v-if="showSpinner">
        <ProgressSpinner :strokeWidth="6" class="m-0 h-8 w-8" aria-label="Loading customer" />
        <span class="text-muted">Loading customer…</span>
      </template>
      <span v-else-if="result">{{ result }}</span>
      <span v-else-if="!loading" class="text-muted"
        >Choose a response speed to load a customer.</span
      >
    </div>
    <p role="status" class="sr-only">{{ showSpinner ? 'Loading customer' : result }}</p>
  </div>
</template>
