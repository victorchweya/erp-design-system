<script setup lang="ts">
import { computed, shallowRef } from 'vue'
const terms = [
  { label: 'Cash on delivery (M-Pesa)', value: 'cod', days: 0 },
  { label: 'Net 7 days', value: 'net-7', days: 7 },
  { label: 'Net 14 days', value: 'net-14', days: 14 },
  { label: 'Net 30 days', value: 'net-30', days: 30 },
]
const paymentTerms = shallowRef('net-7')
const dueSummary = computed(() => {
  const days = terms.find((term) => term.value === paymentTerms.value)?.days ?? 0
  return days === 0
    ? 'Payment is collected on delivery.'
    : `Invoices fall due ${days} days after delivery.`
})
</script>

<template>
  <fieldset class="flex flex-col gap-3" aria-describedby="payment-terms-hint">
    <legend class="mb-1 font-medium">Payment terms</legend>
    <p id="payment-terms-hint" class="text-muted-color">
      Net 30 needs credit approval from Finance.
    </p>
    <RadioButtonGroup v-model="paymentTerms" name="payment-terms" class="flex flex-col gap-3">
      <div v-for="term in terms" :key="term.value" class="flex items-center gap-2">
        <RadioButton :inputId="`payment-terms-${term.value}`" :value="term.value" />
        <label :for="`payment-terms-${term.value}`">{{ term.label }}</label>
      </div>
    </RadioButtonGroup>
    <p class="text-muted-color">{{ dueSummary }}</p>
  </fieldset>
</template>
