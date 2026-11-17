<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="InputNumber-invalid-label" class="font-medium">Invalid</span
      ><InputNumber
        fluid
        invalid
        aria-labelledby="InputNumber-invalid-label"
        aria-describedby="InputNumber-error"
      />
      <p id="InputNumber-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="InputNumber-disabled-label" class="font-medium">Disabled</span
      ><InputNumber fluid disabled aria-labelledby="InputNumber-disabled-label" />
    </div>
  </div>
</template>
