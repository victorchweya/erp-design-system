<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="TreeSelect-invalid-label" class="font-medium">Storage location</span
      ><TreeSelect
        :options="[]"
        placeholder="Choose a location"
        fluid
        invalid
        aria-labelledby="TreeSelect-invalid-label"
        :inputProps="{ 'aria-describedby': 'TreeSelect-error', 'aria-invalid': true }"
      />
      <p id="TreeSelect-error" class="text-danger">Choose where this stock is stored.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="TreeSelect-disabled-label" class="font-medium">Cost centre</span
      ><TreeSelect
        :options="[]"
        placeholder="Set by Finance"
        fluid
        disabled
        aria-labelledby="TreeSelect-disabled-label"
      />
    </div>
  </div>
</template>
