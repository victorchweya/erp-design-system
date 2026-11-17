<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="CascadeSelect-invalid-label" class="font-medium">Invalid</span
      ><CascadeSelect
        placeholder="Choose produce"
        fluid
        invalid
        aria-labelledby="CascadeSelect-invalid-label"
        aria-describedby="CascadeSelect-error"
      />
      <p id="CascadeSelect-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="CascadeSelect-disabled-label" class="font-medium">Disabled</span
      ><CascadeSelect
        placeholder="Choose produce"
        fluid
        disabled
        aria-labelledby="CascadeSelect-disabled-label"
      />
    </div>
  </div>
</template>
