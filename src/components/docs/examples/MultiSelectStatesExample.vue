<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="MultiSelect-invalid-label" class="font-medium">Invalid</span
      ><MultiSelect
        :options="['Kale', 'Carrot']"
        fluid
        invalid
        aria-labelledby="MultiSelect-invalid-label"
        aria-describedby="MultiSelect-error"
      />
      <p id="MultiSelect-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="MultiSelect-disabled-label" class="font-medium">Disabled</span
      ><MultiSelect
        :options="['Kale', 'Carrot']"
        fluid
        disabled
        aria-labelledby="MultiSelect-disabled-label"
      />
    </div>
  </div>
</template>
