<script setup lang="ts">
import { shallowRef } from 'vue'
import CheckCircle from '@primeicons/vue/check-circle'
import TimesCircle from '@primeicons/vue/times-circle'

const state = shallowRef<'error' | 'loaded' | 'dismissed'>('error')
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 py-4 sm:py-6">
    <Message
      v-if="state !== 'dismissed'"
      :key="state"
      :severity="state === 'error' ? 'error' : 'success'"
      closable
      :closeButtonProps="{ 'aria-label': 'Dismiss order history notice' }"
      :pt="
        state === 'error'
          ? {
              content: { class: 'items-start' },
              text: { class: 'min-w-0 flex-1' },
              closeButton: { class: 'shrink-0 self-start' },
            }
          : undefined
      "
      class="w-full"
      @close="state = 'dismissed'"
    >
      <template #icon>
        <component
          :is="state === 'error' ? TimesCircle : CheckCircle"
          size="var(--p-message-icon-size)"
          :class="['shrink-0', { 'mt-0.5': state === 'error' }]"
          aria-hidden="true"
        />
      </template>
      <div v-if="state === 'error'" class="flex min-w-0 flex-col items-start gap-2">
        <span>Order history could not be loaded. Your order is safe.</span>
        <Button type="button" severity="primary" outlined size="small" @click="state = 'loaded'"
          >Try again</Button
        >
      </div>
      <span v-else>Order history loaded.</span>
    </Message>
    <Button
      v-if="state !== 'error'"
      type="button"
      severity="secondary"
      outlined
      size="small"
      @click="state = 'error'"
      >Show error again</Button
    >
  </div>
</template>
