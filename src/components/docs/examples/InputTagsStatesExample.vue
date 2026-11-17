<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="InputTags-invalid-label" class="font-medium">Invalid</span
      ><InputTags
        fluid
        invalid
        aria-labelledby="InputTags-invalid-label"
        aria-describedby="InputTags-error"
      />
      <p id="InputTags-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="InputTags-disabled-label" class="font-medium">Disabled</span
      ><InputTags fluid disabled aria-labelledby="InputTags-disabled-label" />
    </div>
  </div>
</template>
