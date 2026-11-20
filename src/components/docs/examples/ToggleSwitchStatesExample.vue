<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-3">
        <ToggleSwitch
          inputId="ToggleSwitch-invalid"
          invalid
          :pt="{ input: { 'aria-describedby': 'ToggleSwitch-error' } }"
        /><label for="ToggleSwitch-invalid">Cold-chain tracking</label>
      </div>
      <p id="ToggleSwitch-error" class="text-danger">
        Turn on cold-chain tracking for chilled produce.
      </p>
    </div>
    <div class="flex items-center gap-3">
      <ToggleSwitch inputId="ToggleSwitch-disabled" :modelValue="true" disabled /><label
        for="ToggleSwitch-disabled"
        >Automatic invoice numbering</label
      >
    </div>
  </div>
</template>
