<script setup lang="ts">
import { shallowRef } from 'vue'
const quantity = shallowRef<number | null>(10)
const price = shallowRef<number | null>(250)
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-1">
      <label for="order-quantity" class="font-medium">Quantity (kg)</label
      ><InputNumber
        inputId="order-quantity"
        v-model="quantity"
        showButtons
        :min="1"
        :max="100"
        :step="1"
        fluid
      />
      <p class="text-muted-color">Between 1 and 100 kg.</p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="unit-price" class="font-medium">Unit price</label
      ><InputNumber
        inputId="unit-price"
        v-model="price"
        mode="currency"
        currency="KES"
        locale="en-KE"
        :min="0"
        fluid
      />
    </div>
  </div>
</template>
