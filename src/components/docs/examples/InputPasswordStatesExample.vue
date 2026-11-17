<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="InputPassword-invalid-label" class="font-medium">Invalid</span
      ><InputPassword
        fluid
        autocomplete="new-password"
        invalid
        aria-labelledby="InputPassword-invalid-label"
        aria-describedby="InputPassword-error"
      />
      <p id="InputPassword-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="InputPassword-disabled-label" class="font-medium">Disabled</span
      ><InputPassword
        fluid
        autocomplete="new-password"
        disabled
        aria-labelledby="InputPassword-disabled-label"
      />
    </div>
  </div>
</template>
