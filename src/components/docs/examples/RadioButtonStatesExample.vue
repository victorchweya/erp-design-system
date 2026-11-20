<script setup lang="ts">
const slots = ['Morning', 'Afternoon']
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <fieldset class="flex flex-col gap-3" aria-describedby="RadioButton-error">
      <legend class="mb-1 font-medium">Delivery slot</legend>
      <div v-for="slot in slots" :key="slot" class="flex items-center gap-2">
        <RadioButton
          :inputId="`RadioButton-invalid-${slot}`"
          name="delivery-slot"
          :value="slot"
          invalid
        /><label :for="`RadioButton-invalid-${slot}`">{{ slot }}</label>
      </div>
      <p id="RadioButton-error" class="text-danger">Choose a delivery slot.</p>
    </fieldset>
    <fieldset class="flex flex-col gap-3">
      <legend class="mb-1 font-medium">Billing currency</legend>
      <div class="flex items-center gap-2">
        <RadioButton
          inputId="RadioButton-disabled-kes"
          name="billing-currency"
          value="KES"
          modelValue="KES"
          disabled
        /><label for="RadioButton-disabled-kes">Kenyan shilling (KES)</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton
          inputId="RadioButton-disabled-usd"
          name="billing-currency"
          value="USD"
          modelValue="KES"
          disabled
        /><label for="RadioButton-disabled-usd">US dollar (USD)</label>
      </div>
    </fieldset>
  </div>
</template>
