<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="received-quantity-invalid" class="font-medium">Quantity received (kg)</label
      ><InputNumber
        inputId="received-quantity-invalid"
        :modelValue="0"
        :min="0"
        fluid
        invalid
        :pt="{ pcInputText: { root: { 'aria-describedby': 'received-quantity-invalid-error' } } }"
      />
      <p id="received-quantity-invalid-error" class="text-danger">
        Enter a quantity greater than 0 kg.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="unit-price-disabled" class="font-medium">Unit price</label
      ><InputNumber
        inputId="unit-price-disabled"
        :modelValue="250"
        mode="currency"
        currency="KES"
        locale="en-KE"
        fluid
        disabled
        :pt="{ pcInputText: { root: { 'aria-describedby': 'unit-price-disabled-help' } } }"
      />
      <p id="unit-price-disabled-help" class="text-muted-color">Set by the purchase order.</p>
    </div>
  </div>
</template>
