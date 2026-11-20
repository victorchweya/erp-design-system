<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="Slider-invalid" class="font-medium">Cold room temperature (°C)</label
      ><Slider
        inputId="Slider-invalid"
        :modelValue="12"
        :min="0"
        :max="15"
        invalid
        :pt="{ input: { 'aria-describedby': 'Slider-error', 'aria-invalid': true } }"
      />
      <p id="Slider-error" class="text-danger">
        12 °C is too warm. Set a temperature between 2 and 8 °C.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="Slider-disabled" class="font-medium">Reorder threshold (%)</label
      ><Slider inputId="Slider-disabled" :modelValue="25" disabled />
      <p class="text-muted-color">25%. Set by the warehouse manager.</p>
    </div>
  </div>
</template>
