<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="Textarea-invalid-label" class="font-medium">Invalid</span
      ><Textarea
        rows="3"
        fluid
        invalid
        aria-labelledby="Textarea-invalid-label"
        aria-describedby="Textarea-error"
      />
      <p id="Textarea-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="Textarea-disabled-label" class="font-medium">Disabled</span
      ><Textarea rows="3" fluid disabled aria-labelledby="Textarea-disabled-label" />
    </div>
  </div>
</template>
