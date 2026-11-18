<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div class="flex flex-col gap-1">
      <label for="input-small">Small</label
      ><InputText id="input-small" size="small" placeholder="Small" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label for="input-default">Default</label
      ><InputText id="input-default" placeholder="Default" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label for="input-large">Large, filled</label
      ><InputText id="input-large" size="large" variant="filled" placeholder="Large" fluid />
    </div>
  </div>
</template>
