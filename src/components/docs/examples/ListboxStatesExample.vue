<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="Listbox-invalid-label" class="font-medium">Invalid</span
      ><Listbox
        :options="['Kale', 'Carrot']"
        invalid
        aria-labelledby="Listbox-invalid-label"
        aria-describedby="Listbox-error"
      />
      <p id="Listbox-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="Listbox-disabled-label" class="font-medium">Disabled</span
      ><Listbox :options="['Kale', 'Carrot']" disabled aria-labelledby="Listbox-disabled-label" />
    </div>
  </div>
</template>
