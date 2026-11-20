<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <Checkbox
          inputId="Checkbox-invalid"
          binary
          invalid
          :pt="{ input: { 'aria-describedby': 'Checkbox-error' } }"
        /><label for="Checkbox-invalid">I inspected this delivery</label>
      </div>
      <p id="Checkbox-error" class="text-danger">Confirm the inspection before you accept it.</p>
    </div>
    <div class="flex items-center gap-2">
      <Checkbox inputId="Checkbox-disabled" :modelValue="true" binary disabled /><label
        for="Checkbox-disabled"
        >Supplier verified by Procurement</label
      >
    </div>
  </div>
</template>
