<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="Checkbox-invalid-label" class="font-medium">Invalid</span
      ><Checkbox
        binary
        invalid
        aria-labelledby="Checkbox-invalid-label"
        aria-describedby="Checkbox-error"
      />
      <p id="Checkbox-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="Checkbox-disabled-label" class="font-medium">Disabled</span
      ><Checkbox binary disabled aria-labelledby="Checkbox-disabled-label" />
    </div>
  </div>
</template>
