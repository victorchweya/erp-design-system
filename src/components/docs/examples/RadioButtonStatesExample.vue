<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="RadioButton-invalid-label" class="font-medium">Invalid</span
      ><RadioButton
        name="radio-states"
        value="example"
        invalid
        aria-labelledby="RadioButton-invalid-label"
        aria-describedby="RadioButton-error"
      />
      <p id="RadioButton-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="RadioButton-disabled-label" class="font-medium">Disabled</span
      ><RadioButton
        name="radio-states"
        value="example"
        disabled
        aria-labelledby="RadioButton-disabled-label"
      />
    </div>
  </div>
</template>
