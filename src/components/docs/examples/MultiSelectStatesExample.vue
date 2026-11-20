<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="MultiSelect-invalid-label" class="font-medium">Delivery days</span
      ><MultiSelect
        :options="['Monday', 'Wednesday', 'Friday']"
        placeholder="Choose days"
        fluid
        invalid
        aria-labelledby="MultiSelect-invalid-label"
        :pt="{ hiddenInput: { 'aria-describedby': 'MultiSelect-error' } }"
      />
      <p id="MultiSelect-error" class="text-danger">Choose at least one delivery day.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="MultiSelect-disabled-label" class="font-medium">Certifications</span
      ><MultiSelect
        :modelValue="['GlobalG.A.P.', 'KEBS']"
        :options="['GlobalG.A.P.', 'KEBS', 'Organic']"
        fluid
        disabled
        aria-labelledby="MultiSelect-disabled-label"
      />
    </div>
  </div>
</template>
