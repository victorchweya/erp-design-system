<script setup lang="ts">
import { useId } from 'vue'
const id = useId()
</script>

<template>
  <Fluid class="flex max-w-md flex-col gap-4"
    ><div class="flex flex-col gap-1">
      <label :for="id" class="font-medium">Supplier name</label><InputText :id="id" />
    </div>
    <Button type="button">Find supplier</Button></Fluid
  >
</template>
