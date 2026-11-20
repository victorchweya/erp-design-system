<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div class="flex flex-col gap-1">
      <label for="vehicle-plate-small">Small</label
      ><InputMask
        id="vehicle-plate-small"
        mask="aaa 999a"
        placeholder="KDA 123A"
        size="small"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="vehicle-plate-default">Default</label
      ><InputMask id="vehicle-plate-default" mask="aaa 999a" placeholder="KDA 123A" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label for="vehicle-plate-large">Large, filled</label
      ><InputMask
        id="vehicle-plate-large"
        mask="aaa 999a"
        placeholder="KDA 123A"
        size="large"
        variant="filled"
        fluid
      />
    </div>
  </div>
</template>
