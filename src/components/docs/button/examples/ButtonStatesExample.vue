<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import Spinner from '@primeicons/vue/spinner'

const state = shallowRef<'idle' | 'loading' | 'complete'>('idle')
const messages = {
  idle: 'Run the example to preview a loading state.',
  loading: 'Processing the example…',
  complete: 'Example complete.',
}
let timer: ReturnType<typeof setTimeout> | undefined

function runExample() {
  if (state.value === 'loading') return
  state.value = 'loading'
  timer = setTimeout(() => {
    state.value = 'complete'
    timer = undefined
  }, 1200)
}

onBeforeUnmount(() => {
  if (timer !== undefined) clearTimeout(timer)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-4">
      <Button type="button" disabled>Disabled</Button>
      <Button
        type="button"
        :disabled="state === 'loading'"
        :aria-busy="state === 'loading'"
        @click="runExample"
      >
        <Spinner
          v-if="state === 'loading'"
          :size="16"
          class="motion-safe:animate-spin"
          aria-hidden="true"
          focusable="false"
        />
        {{ state === 'loading' ? 'Processing' : 'Run example' }}
      </Button>
    </div>
    <p role="status" class="text-sm text-muted-color">{{ messages[state] }}</p>
  </div>
</template>
