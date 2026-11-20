<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div class="flex flex-col gap-1">
      <span id="unit-select-small-label">Small</span
      ><Select
        :options="['Kilogram', 'Crate', 'Bunch']"
        placeholder="Choose a unit"
        size="small"
        aria-labelledby="unit-select-small-label"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <span id="unit-select-default-label">Default</span
      ><Select
        :options="['Kilogram', 'Crate', 'Bunch']"
        placeholder="Choose a unit"
        aria-labelledby="unit-select-default-label"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <span id="unit-select-large-label">Large, filled</span
      ><Select
        :options="['Kilogram', 'Crate', 'Bunch']"
        placeholder="Choose a unit"
        size="large"
        variant="filled"
        aria-labelledby="unit-select-large-label"
        fluid
      />
    </div>
  </div>
</template>
