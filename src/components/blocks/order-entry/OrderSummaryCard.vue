<script setup lang="ts">
import { computed, useId } from 'vue'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import { customer, money } from './order-entry'

const props = defineProps<{ subtotal: number; delivery: number; packs: number; valid: boolean }>()
const emit = defineEmits<{ submit: []; approval: [] }>()
const resolution = defineModel<'upfront' | 'approval' | 'split'>({ required: true })
const id = useId()
const available = customer.creditLimit - customer.outstanding
const total = computed(() => props.subtotal + props.delivery)
const shortfall = computed(() => Math.max(0, total.value - available))
const choices = computed(() => [
  {
    value: 'upfront',
    title: `Collect ${money(shortfall.value)} upfront`,
    description: 'Receive payment before releasing the delivery.',
  },
  {
    value: 'approval',
    title: 'Request a credit review',
    description: 'Hold dispatch until the finance team approves.',
  },
  {
    value: 'split',
    title: 'Split the order',
    description: 'Review which items fit within the available credit.',
  },
])
const action = computed(() => {
  if (!shortfall.value) return 'Confirm order'
  return {
    upfront: 'Prepare payment request',
    approval: 'Send for credit review',
    split: 'Prepare split order',
  }[resolution.value]
})
</script>

<template>
  <div class="flex min-w-0 flex-col gap-4">
    <Card>
      <template #title><h3 class="text-lg font-medium">Order summary</h3></template>
      <template #content>
        <dl aria-label="Order totals" class="flex flex-col gap-3 text-sm">
          <div class="flex justify-between gap-4">
            <dt class="text-muted">Subtotal · {{ packs }} packs</dt>
            <dd class="whitespace-nowrap tabular-nums">{{ money(subtotal) }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-muted">Pricing</dt>
            <dd>Customer rate</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-muted">Delivery · Westlands</dt>
            <dd class="whitespace-nowrap tabular-nums">{{ money(delivery) }}</dd>
          </div>
          <div
            class="flex flex-wrap items-center justify-between gap-2 border-t border-surface pt-4"
          >
            <dt class="font-medium">Total</dt>
            <dd class="text-xl font-medium tabular-nums" aria-live="polite">{{ money(total) }}</dd>
          </div>
        </dl>
      </template>
      <template #footer
        ><p class="text-xs text-muted">14-day payment terms · invoice on delivery.</p></template
      >
    </Card>

    <Card v-if="shortfall > 0 && subtotal > 0">
      <template #title><h3 class="text-lg font-medium">Credit check</h3></template>
      <template #content>
        <div class="flex flex-col gap-4">
          <Message
            severity="warn"
            :pt="{
              content: { class: 'items-start' },
              text: { class: 'min-w-0 flex-1' },
            }"
          >
            <template #icon
              ><ExclamationTriangle
                size="var(--p-message-icon-size)"
                class="mt-0.5 shrink-0"
                aria-hidden="true"
            /></template>
            <span class="text-sm font-normal"
              >{{ money(shortfall) }} over available credit. Resolve this before dispatch.</span
            >
          </Message>
          <dl class="flex flex-col gap-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted">Available credit</dt>
              <dd class="tabular-nums">{{ money(available) }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted">Order total</dt>
              <dd class="tabular-nums">{{ money(total) }}</dd>
            </div>
          </dl>
          <fieldset class="flex min-w-0 flex-col gap-3">
            <legend class="pb-3 text-sm font-medium">How would you like to proceed?</legend>
            <label
              v-for="choice in choices"
              :key="choice.value"
              :for="`${id}-${choice.value}`"
              class="flex cursor-pointer items-start gap-3 rounded-md border border-surface p-3"
            >
              <RadioButton
                v-model="resolution"
                :inputId="`${id}-${choice.value}`"
                :name="`${id}-credit`"
                :value="choice.value"
                class="mt-0.5 shrink-0"
              />
              <span class="flex min-w-0 flex-col gap-1 text-sm"
                ><span class="font-medium">{{ choice.title }}</span
                ><span class="text-xs text-muted">{{ choice.description }}</span></span
              >
            </label>
          </fieldset>
        </div>
      </template>
    </Card>
    <p v-else-if="subtotal > 0" class="text-sm text-muted">
      This order is within the customer’s available credit.
    </p>
    <div class="flex flex-col gap-2">
      <Button type="button" :disabled="!valid" fluid @click="emit('submit')">{{ action }}</Button>
      <Button
        type="button"
        severity="secondary"
        outlined
        :disabled="!valid"
        fluid
        @click="emit('approval')"
        >Send to sales lead for review</Button
      >
      <p v-if="!valid" class="text-xs text-muted">
        Add at least one item and enter a delivery address to continue.
      </p>
    </div>
  </div>
</template>
