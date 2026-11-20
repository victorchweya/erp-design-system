<script setup lang="ts">
const pastDate = new Date(2026, 0, 12)
const orderDate = new Date(2026, 10, 18)
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="expected-delivery-invalid" class="font-medium">Expected delivery date</label
      ><DatePicker
        inputId="expected-delivery-invalid"
        :modelValue="pastDate"
        dateFormat="dd/mm/yy"
        fluid
        invalid
        :pt="{ pcInputText: { root: { 'aria-describedby': 'expected-delivery-invalid-error' } } }"
      />
      <p id="expected-delivery-invalid-error" class="text-danger">
        Choose a date after the order date, 18/11/2026.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="order-date-disabled" class="font-medium">Order date</label
      ><DatePicker
        inputId="order-date-disabled"
        :modelValue="orderDate"
        dateFormat="dd/mm/yy"
        fluid
        disabled
        :pt="{ pcInputText: { root: { 'aria-describedby': 'order-date-disabled-help' } } }"
      />
      <p id="order-date-disabled-help" class="text-muted-color">
        Set when the purchase order was raised.
      </p>
    </div>
  </div>
</template>
