<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="AutoComplete-invalid-label" class="font-medium">Invalid</span
      ><AutoComplete
        fluid
        invalid
        aria-labelledby="AutoComplete-invalid-label"
        aria-describedby="AutoComplete-error"
      />
      <p id="AutoComplete-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="AutoComplete-disabled-label" class="font-medium">Disabled</span
      ><AutoComplete fluid disabled aria-labelledby="AutoComplete-disabled-label" />
    </div>
  </div>
</template>
