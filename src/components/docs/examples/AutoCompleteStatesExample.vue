<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="supplier-invalid" class="font-medium">Supplier</label
      ><AutoComplete
        inputId="supplier-invalid"
        modelValue="Kiambu Fresh"
        :suggestions="[]"
        fluid
        invalid
        :inputProps="{ 'aria-describedby': 'supplier-invalid-error' }"
      />
      <p id="supplier-invalid-error" class="text-danger">
        No approved supplier matches this name. Choose one from the list.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="warehouse-disabled" class="font-medium">Receiving warehouse</label
      ><AutoComplete
        inputId="warehouse-disabled"
        modelValue="Nairobi central"
        :suggestions="[]"
        fluid
        disabled
        :inputProps="{ 'aria-describedby': 'warehouse-disabled-help' }"
      />
      <p id="warehouse-disabled-help" class="text-muted-color">Set by the purchase order.</p>
    </div>
  </div>
</template>
