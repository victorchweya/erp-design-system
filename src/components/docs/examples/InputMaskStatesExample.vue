<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="InputMask-invalid-label" class="font-medium">Invalid</span
      ><InputMask
        mask="+254 999 999 999"
        placeholder="+254 712 345 678"
        fluid
        invalid
        aria-labelledby="InputMask-invalid-label"
        aria-describedby="InputMask-error"
      />
      <p id="InputMask-error" class="text-danger">Enter all nine digits after +254.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="InputMask-disabled-label" class="font-medium">Disabled</span
      ><InputMask
        modelValue="+254 712 345 678"
        mask="+254 999 999 999"
        fluid
        disabled
        aria-labelledby="InputMask-disabled-label"
      />
    </div>
  </div>
</template>
