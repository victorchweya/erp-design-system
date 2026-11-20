<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="Listbox-invalid-label" class="font-medium">Quality grade</span
      ><Listbox
        :options="['Grade 1', 'Grade 2', 'Reject']"
        invalid
        aria-labelledby="Listbox-invalid-label"
        :pt="{ list: { 'aria-describedby': 'Listbox-error', 'aria-invalid': true } }"
      />
      <p id="Listbox-error" class="text-danger">Choose a grade before you accept the crate.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="Listbox-disabled-label" class="font-medium">Storage zone</span
      ><Listbox
        modelValue="Cold room"
        :options="['Cold room', 'Ambient']"
        disabled
        aria-labelledby="Listbox-disabled-label"
      />
    </div>
  </div>
</template>
