<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="InputOtp-invalid-label" class="font-medium">Invalid</span
      ><InputOtp
        :length="4"
        integerOnly
        invalid
        aria-labelledby="InputOtp-invalid-label"
        aria-describedby="InputOtp-error"
      />
      <p id="InputOtp-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="InputOtp-disabled-label" class="font-medium">Disabled</span
      ><InputOtp :length="4" integerOnly disabled aria-labelledby="InputOtp-disabled-label" />
    </div>
  </div>
</template>
