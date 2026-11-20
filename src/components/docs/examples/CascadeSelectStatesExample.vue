<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="CascadeSelect-invalid-label" class="font-medium">Delivery area</span
      ><CascadeSelect
        :options="[]"
        placeholder="Choose an area"
        fluid
        invalid
        aria-labelledby="CascadeSelect-invalid-label"
        :inputProps="{ 'aria-describedby': 'CascadeSelect-error' }"
      />
      <p id="CascadeSelect-error" class="text-danger">Choose the area this customer is in.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="CascadeSelect-disabled-label" class="font-medium">Produce category</span
      ><CascadeSelect
        :options="[]"
        placeholder="Set by the purchase order"
        fluid
        disabled
        aria-labelledby="CascadeSelect-disabled-label"
      />
    </div>
  </div>
</template>
