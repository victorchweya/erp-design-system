<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="SelectButton-invalid-label" class="font-medium">Invalid</span
      ><SelectButton
        :options="['Day', 'Week']"
        invalid
        aria-labelledby="SelectButton-invalid-label"
        aria-describedby="SelectButton-error"
      />
      <p id="SelectButton-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="SelectButton-disabled-label" class="font-medium">Disabled</span
      ><SelectButton
        :options="['Day', 'Week']"
        disabled
        aria-labelledby="SelectButton-disabled-label"
      />
    </div>
  </div>
</template>
