<script setup lang="ts">
import Search from '@primeicons/vue/search'
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div class="flex flex-col gap-1">
      <label for="iconfield-size-small">Small</label
      ><IconField
        ><InputIcon><Search aria-hidden="true" focusable="false" /></InputIcon
        ><InputText id="iconfield-size-small" size="small" placeholder="Search orders" fluid
      /></IconField>
    </div>
    <div class="flex flex-col gap-1">
      <label for="iconfield-size-default">Default</label
      ><IconField
        ><InputIcon><Search aria-hidden="true" focusable="false" /></InputIcon
        ><InputText id="iconfield-size-default" placeholder="Search orders" fluid
      /></IconField>
    </div>
    <div class="flex flex-col gap-1">
      <label for="iconfield-size-large">Large, filled</label
      ><IconField
        ><InputIcon><Search aria-hidden="true" focusable="false" /></InputIcon
        ><InputText
          id="iconfield-size-large"
          size="large"
          variant="filled"
          placeholder="Search orders"
          fluid
      /></IconField>
    </div>
  </div>
</template>
