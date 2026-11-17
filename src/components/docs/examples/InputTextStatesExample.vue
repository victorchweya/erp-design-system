<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="InputText-invalid-label" class="font-medium">Invalid</span
      ><InputText
        fluid
        invalid
        aria-labelledby="InputText-invalid-label"
        aria-describedby="InputText-error"
      />
      <p id="InputText-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="InputText-disabled-label" class="font-medium">Disabled</span
      ><InputText fluid disabled aria-labelledby="InputText-disabled-label" />
    </div>
  </div>
</template>
