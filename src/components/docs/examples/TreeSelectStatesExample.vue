<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="TreeSelect-invalid-label" class="font-medium">Invalid</span
      ><TreeSelect
        placeholder="Choose produce"
        fluid
        invalid
        aria-labelledby="TreeSelect-invalid-label"
        aria-describedby="TreeSelect-error"
      />
      <p id="TreeSelect-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="TreeSelect-disabled-label" class="font-medium">Disabled</span
      ><TreeSelect
        placeholder="Choose produce"
        fluid
        disabled
        aria-labelledby="TreeSelect-disabled-label"
      />
    </div>
  </div>
</template>
