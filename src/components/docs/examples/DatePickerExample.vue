<script setup lang="ts">
import { ref } from 'vue'
const date = ref<Date | null>(null)
const range = ref<(Date | null)[] | null>(null)
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-1">
      <label for="delivery-date" class="font-medium">Delivery date</label
      ><DatePicker
        inputId="delivery-date"
        v-model="date"
        dateFormat="dd/mm/yy"
        showIcon
        showClear
        fluid
        :pt="{ pcInputText: { root: { 'aria-describedby': 'delivery-date-help' } } }"
      />
      <p id="delivery-date-help" class="text-muted-color">Format: dd/mm/yyyy</p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="delivery-range" class="font-medium">Delivery window</label
      ><DatePicker
        inputId="delivery-range"
        v-model="range"
        selectionMode="range"
        dateFormat="dd/mm/yy"
        :manualInput="false"
        showIcon
        fluid
      />
    </div>
  </div>
</template>
