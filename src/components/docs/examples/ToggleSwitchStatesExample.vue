<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="ToggleSwitch-invalid-label" class="font-medium">Invalid</span
      ><ToggleSwitch
        invalid
        aria-labelledby="ToggleSwitch-invalid-label"
        aria-describedby="ToggleSwitch-error"
      />
      <p id="ToggleSwitch-error" class="text-danger">Choose a valid value to continue.</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="ToggleSwitch-disabled-label" class="font-medium">Disabled</span
      ><ToggleSwitch disabled aria-labelledby="ToggleSwitch-disabled-label" />
    </div>
  </div>
</template>
