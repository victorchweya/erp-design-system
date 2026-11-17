<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="Select-invalid-label" class="font-medium">Invalid</span
      ><Select
        :options="['Kale', 'Carrot']"
        placeholder="Choose produce"
        fluid
        invalid
        aria-labelledby="Select-invalid-label"
        aria-describedby="Select-error"
      />
      <p id="Select-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="Select-disabled-label" class="font-medium">Disabled</span
      ><Select
        :options="['Kale', 'Carrot']"
        placeholder="Choose produce"
        fluid
        disabled
        aria-labelledby="Select-disabled-label"
      />
    </div>
  </div>
</template>
