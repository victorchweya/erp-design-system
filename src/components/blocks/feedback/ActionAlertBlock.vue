<script setup lang="ts">
import { ref } from 'vue'

const customerNoticeVisible = ref(true)
const retryNoticeVisible = ref(true)
const result = ref('')
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-3 py-4 sm:py-8">
    <Message
      v-if="customerNoticeVisible"
      severity="secondary"
      closable
      :closeButtonProps="{ 'aria-label': 'Dismiss customer notice' }"
      :pt="{ text: { class: 'min-w-0 flex-1' } }"
      class="w-full"
      @close="customerNoticeVisible = false"
    >
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-3">
        <div class="min-w-56 flex-1">
          <p class="font-medium text-color">Customer was not found in FTF records</p>
          <p class="mt-1 font-normal text-muted">
            Search again or add a new customer before continuing with the order.
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button
            type="button"
            severity="primary"
            size="small"
            outlined
            @click="result = 'Customer search opened in this preview.'"
          >
            Search customers
          </Button>
          <Button
            type="button"
            severity="primary"
            size="small"
            outlined
            @click="result = 'Add customer opened in this preview.'"
          >
            Add customer
          </Button>
        </div>
      </div>
    </Message>

    <Message
      v-if="retryNoticeVisible"
      severity="error"
      closable
      :closeButtonProps="{ 'aria-label': 'Dismiss order error' }"
      :pt="{ text: { class: 'min-w-0 flex-1' } }"
      class="w-full"
      @close="retryNoticeVisible = false"
    >
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-3">
        <p class="min-w-56 flex-1 font-medium">
          Order history could not be loaded. Your saved changes are safe.
        </p>
        <Button
          type="button"
          severity="primary"
          size="small"
          outlined
          @click="result = 'Order history retry started in this preview.'"
        >
          Try again
        </Button>
      </div>
    </Message>

    <p class="sr-only" aria-live="polite">{{ result }}</p>
  </div>
</template>
