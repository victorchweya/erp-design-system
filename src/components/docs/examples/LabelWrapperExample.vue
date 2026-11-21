<script setup lang="ts">
import { shallowRef } from 'vue'
const deliverySlot = shallowRef('morning')
const deliverySlots = [
  { id: 'morning', name: 'Morning', detail: '06:00 to 10:00, for restaurant prep' },
  { id: 'midday', name: 'Midday', detail: '11:00 to 14:00, for retail restocking' },
  { id: 'evening', name: 'Evening', detail: '16:00 to 19:00, for next-day orders' },
]
</script>

<template>
  <fieldset class="flex max-w-md flex-col gap-3">
    <legend class="mb-2 font-medium">Delivery slot</legend>
    <Label
      v-for="option in deliverySlots"
      :key="option.id"
      :class="[
        'cursor-pointer items-start gap-3 rounded-md border p-3',
        deliverySlot === option.id ? 'border-primary' : 'border-surface',
      ]"
    >
      <RadioButton v-model="deliverySlot" name="label-delivery-slot" :value="option.id" />
      <span class="flex flex-col gap-0.5">
        <span class="font-medium">{{ option.name }}</span>
        <span class="font-normal text-muted-color">{{ option.detail }}</span>
      </span>
    </Label>
  </fieldset>
</template>
