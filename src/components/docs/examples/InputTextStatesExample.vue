<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="supplier-name-invalid" class="font-medium">Supplier name</label
      ><InputText
        id="supplier-name-invalid"
        fluid
        invalid
        autocomplete="organization"
        aria-describedby="supplier-name-invalid-error"
      />
      <p id="supplier-name-invalid-error" class="text-danger">
        Enter the supplier's registered business name.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="supplier-code-disabled" class="font-medium">Supplier code</label
      ><InputText
        id="supplier-code-disabled"
        modelValue="SUP-0142"
        fluid
        disabled
        aria-describedby="supplier-code-disabled-help"
      />
      <p id="supplier-code-disabled-help" class="text-muted-color">
        Generated when the supplier is approved.
      </p>
    </div>
  </div>
</template>
