<script setup lang="ts">
import { shallowRef } from 'vue'
import CheckCircle from '@primeicons/vue/check-circle'
import TimesCircle from '@primeicons/vue/times-circle'

const state = shallowRef<'error' | 'loaded' | 'dismissed'>('error')
const messageLayout = {
  content: { class: 'items-start gap-3 p-4' },
  text: { class: 'min-w-0 flex-1' },
  closeButton: { class: '-mr-1 -mt-1' },
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 py-4 sm:py-6">
    <Message
      v-if="state !== 'dismissed'"
      :key="state"
      :severity="state === 'error' ? 'error' : 'success'"
      closable
      :closeButtonProps="{ 'aria-label': 'Dismiss order history notice' }"
      :pt="messageLayout"
      class="w-full"
      @close="state = 'dismissed'"
    >
      <template #icon>
        <component
          :is="state === 'error' ? TimesCircle : CheckCircle"
          size="var(--p-message-icon-size)"
          class="mt-0.5 shrink-0"
          aria-hidden="true"
        />
      </template>
      <div class="flex min-w-0 flex-col gap-2 text-sm font-normal">
        <p class="font-medium">
          {{ state === 'error' ? 'Order history could not be loaded' : 'Order history loaded' }}
        </p>
        <p v-if="state === 'error'">Your order is safe. Try loading the history again.</p>
        <p v-else>Order history loaded in this preview.</p>
        <div v-if="state === 'error'" class="-ml-2 flex flex-wrap gap-2 pt-1">
          <Button type="button" severity="danger" text size="small" @click="state = 'loaded'"
            >Try again</Button
          >
        </div>
      </div>
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
