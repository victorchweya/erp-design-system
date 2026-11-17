<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="DatePicker-invalid-label" class="font-medium">Invalid</span
      ><DatePicker
        dateFormat="dd/mm/yy"
        fluid
        invalid
        aria-labelledby="DatePicker-invalid-label"
        aria-describedby="DatePicker-error"
      />
      <p id="DatePicker-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="DatePicker-disabled-label" class="font-medium">Disabled</span
      ><DatePicker
        dateFormat="dd/mm/yy"
        fluid
        disabled
        aria-labelledby="DatePicker-disabled-label"
      />
    </div>
  </div>
</template>
