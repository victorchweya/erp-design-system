<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="SelectButton-invalid-label" class="font-medium">Delivery window</span
      ><SelectButton
        :options="['Morning', 'Afternoon']"
        invalid
        aria-labelledby="SelectButton-invalid-label"
        aria-describedby="SelectButton-error"
      />
      <p id="SelectButton-error" class="text-danger">Choose a delivery window.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="SelectButton-disabled-label" class="font-medium">Order type</span
      ><SelectButton
        modelValue="Standing order"
        :options="['One-off', 'Standing order']"
        disabled
        aria-labelledby="SelectButton-disabled-label"
      />
    </div>
  </div>
</template>
