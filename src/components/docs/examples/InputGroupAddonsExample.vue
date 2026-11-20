<script setup lang="ts">
import { shallowRef } from 'vue'
const orderValue = shallowRef<number | null>(18500)
const netWeight = shallowRef<number | null>(42.5)
const pricePerKg = shallowRef<number | null>(120)
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-3">
    <div class="flex flex-col gap-1">
      <label for="group-order-value" class="font-medium">Order value (KES)</label
      ><InputGroup
        ><InputGroupAddon>KES</InputGroupAddon
        ><InputNumber
          inputId="group-order-value"
          v-model="orderValue"
          locale="en-KE"
          :min="0"
          :maxFractionDigits="2"
          fluid
      /></InputGroup>
    </div>
    <div class="flex flex-col gap-1">
      <label for="group-net-weight" class="font-medium">Net weight (kg)</label
      ><InputGroup
        ><InputNumber
          inputId="group-net-weight"
          v-model="netWeight"
          locale="en-KE"
          :min="0"
          :maxFractionDigits="2"
          fluid
        /><InputGroupAddon>kg</InputGroupAddon></InputGroup
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="group-price-per-kg" class="font-medium">Price per kg (KES)</label
      ><InputGroup
        ><InputGroupAddon>KES</InputGroupAddon
        ><InputNumber
          inputId="group-price-per-kg"
          v-model="pricePerKg"
          locale="en-KE"
          :min="0"
          :maxFractionDigits="2"
          fluid
        /><InputGroupAddon>/ kg</InputGroupAddon></InputGroup
      >
    </div>
  </div>
</template>
