<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="supplier-phone-invalid" class="font-medium">Supplier phone</label
      ><InputMask
        id="supplier-phone-invalid"
        mask="+254 999 999 999"
        placeholder="+254 712 345 678"
        fluid
        invalid
        autocomplete="tel"
        aria-describedby="supplier-phone-invalid-error"
      />
      <p id="supplier-phone-invalid-error" class="text-danger">
        Enter all nine digits after +254.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="driver-phone-disabled" class="font-medium">Driver phone</label
      ><InputMask
        id="driver-phone-disabled"
        modelValue="+254 712 345 678"
        mask="+254 999 999 999"
        fluid
        disabled
        aria-describedby="driver-phone-disabled-help"
      />
      <p id="driver-phone-disabled-help" class="text-muted-color">
        Managed by the transport team.
      </p>
    </div>
  </div>
</template>
