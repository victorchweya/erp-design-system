<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="Slider-invalid-label" class="font-medium">Invalid</span
      ><Slider
        :modelValue="25"
        invalid
        aria-labelledby="Slider-invalid-label"
        aria-describedby="Slider-error"
      />
      <p id="Slider-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="Slider-disabled-label" class="font-medium">Disabled</span
      ><Slider :modelValue="25" disabled aria-labelledby="Slider-disabled-label" />
    </div>
  </div>
</template>
