<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="Select-invalid-label" class="font-medium">Receiving warehouse</span
      ><Select
        :options="['Nairobi DC', 'Mombasa DC']"
        placeholder="Choose a warehouse"
        fluid
        invalid
        aria-labelledby="Select-invalid-label"
        :pt="{ label: { 'aria-describedby': 'Select-error' } }"
      />
      <p id="Select-error" class="text-danger">Choose a warehouse to receive this delivery.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="Select-disabled-label" class="font-medium">Currency</span
      ><Select
        modelValue="KES"
        :options="['KES']"
        fluid
        disabled
        aria-labelledby="Select-disabled-label"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span id="Select-loading-label" class="font-medium">Delivery route</span
      ><Select
        :options="[]"
        placeholder="Loading routes"
        fluid
        loading
        aria-labelledby="Select-loading-label"
      />
    </div>
  </div>
</template>
