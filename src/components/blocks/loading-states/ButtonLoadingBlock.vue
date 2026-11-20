<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import Send from '@primeicons/vue/send'
import Spinner from '@primeicons/vue/spinner'
import { formatTime } from '@/utils/format'

const saving = shallowRef(false)
const message = shallowRef('')
let timer: ReturnType<typeof setTimeout> | undefined

// aria-disabled keeps the button focusable while the request runs; the guard blocks repeats.
function confirmDispatch() {
  if (saving.value) return
  saving.value = true
  message.value = ''
  timer = setTimeout(() => {
    saving.value = false
    message.value = `FTF-1042 dispatched at ${formatTime(new Date())}.`
  }, 1800)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button
      type="button"
      :aria-disabled="saving"
      :class="{ 'cursor-progress': saving }"
      @click="confirmDispatch"
    >
      <Spinner v-if="saving" class="animate-spin" aria-hidden="true" />
      <Send v-else aria-hidden="true" />
      {{ saving ? 'Confirming dispatch…' : 'Confirm dispatch' }}
    </Button>
    <p role="status" class="text-muted">{{ message }}</p>
  </div>
</template>
