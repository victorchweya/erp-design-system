<script setup lang="ts">
import { useId } from 'vue'
import { useToast } from 'primevue/usetoast'
const group = useId()
const toast = useToast()
function show() {
  toast.add({
    group,
    severity: 'success',
    summary: 'Preview complete',
    detail: 'This action only updates the example.',
    life: 4000,
  })
}
</script>

<template>
  <Toast
    :group="group"
    :breakpoints="{ '640px': { width: 'calc(100vw - 2rem)', right: '1rem', left: '1rem' } }"
  /><Button type="button" @click="show">Show feedback</Button>
</template>
