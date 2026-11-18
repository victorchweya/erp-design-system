<template>
  <div class="flex flex-wrap items-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <ProgressSpinner class="size-12" aria-label="Loading deliveries" /><span
        >Loading deliveries</span
      >
    </div>
    <div class="flex flex-col items-center gap-2">
      <ProgressSpinner :value="60" class="size-12" aria-label="Upload progress" /><span
        >60% uploaded</span
      >
    </div>
  </div>
</template>
