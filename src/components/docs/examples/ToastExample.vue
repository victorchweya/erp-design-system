<script setup lang="ts">
import { useId } from 'vue'
import { useToast } from 'primevue/usetoast'
const group = useId()
const toast = useToast()
type ToastSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
type ButtonSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'

const examples: Array<{
  label: string
  severity: ToastSeverity
  buttonSeverity: ButtonSeverity
  summary: string
  detail: string
}> = [
  {
    label: 'Success',
    severity: 'success',
    buttonSeverity: 'success',
    summary: 'Prompts added',
    detail: '24 prompts will run in the next cycle.',
  },
  {
    label: 'Info',
    severity: 'info',
    buttonSeverity: 'info',
    summary: 'Price list updated',
    detail: 'The latest supplier prices are now available.',
  },
  {
    label: 'Warning',
    severity: 'warn',
    buttonSeverity: 'warn',
    summary: 'Credit limit nearly reached',
    detail: 'Review the balance before confirming.',
  },
  {
    label: 'Error',
    severity: 'error',
    buttonSeverity: 'danger',
    summary: 'Order was not submitted',
    detail: 'Check the order and try again.',
  },
  {
    label: 'Secondary',
    severity: 'secondary',
    buttonSeverity: 'secondary',
    summary: 'Sync queued',
    detail: 'The inventory sync will start shortly.',
  },
  {
    label: 'Contrast',
    severity: 'contrast',
    buttonSeverity: 'contrast',
    summary: 'Working offline',
    detail: 'Changes will sync when the connection returns.',
  },
]

function show(severity: ToastSeverity, summary: string, detail: string) {
  toast.add({
    group,
    severity,
    summary,
    detail,
    life: 4000,
  })
}
</script>

<template>
  <Toast
    :group="group"
    :breakpoints="{ '640px': { width: 'calc(100vw - 2rem)', right: '1rem', left: '1rem' } }"
  />
  <div class="flex flex-wrap gap-2">
    <Button
      v-for="example in examples"
      :key="example.severity"
      type="button"
      :severity="example.buttonSeverity"
      outlined
      @click="show(example.severity, example.summary, example.detail)"
    >
      {{ example.label }}
    </Button>
  </div>
</template>
