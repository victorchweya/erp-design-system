<script setup lang="ts">
import { onBeforeUnmount, useId, useTemplateRef } from 'vue'
import Print from '@primeicons/vue/print'
import logo from '@/assets/brand/logo.svg'
import { seller, type DocumentMeta } from './documents'

defineProps<{ title: string; number: string; meta: DocumentMeta[] }>()

/*
 * Print scoping: main.css only hides the app shell while <body> has PRINT_CLASS, and then
 * prints only the element marked with TARGET_CLASS. Both are set just before window.print()
 * and removed on `afterprint`, so printing any other page (or Ctrl+P here) is unaffected.
 */
const PRINT_CLASS = 'print-document'
const TARGET_CLASS = 'print-target'
const titleId = useId()
const documentEl = useTemplateRef<HTMLElement>('document')

function clearPrintMarks() {
  document.body.classList.remove(PRINT_CLASS)
  documentEl.value?.classList.remove(TARGET_CLASS)
}

function printDocument() {
  if (!documentEl.value) return
  document.body.classList.add(PRINT_CLASS)
  documentEl.value.classList.add(TARGET_CLASS)
  window.addEventListener('afterprint', clearPrintMarks, { once: true })
  window.print()
}

onBeforeUnmount(() => {
  window.removeEventListener('afterprint', clearPrintMarks)
  clearPrintMarks()
})
</script>

<template>
  <div class="flex min-w-0 flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-3 print:hidden">
      <div class="flex min-w-0 flex-wrap items-center gap-3"><slot name="actions" /></div>
      <Button type="button" size="small" severity="primary" outlined @click="printDocument">
        <Print aria-hidden="true" /> Print {{ title.toLowerCase() }}
      </Button>
    </div>

    <article
      ref="document"
      :aria-labelledby="titleId"
      class="flex min-w-0 flex-col gap-6 rounded-xl border border-surface bg-surface-0 p-4 text-sm sm:p-8 dark:bg-surface-900 print:rounded-none print:border-0 print:p-0"
    >
      <header class="flex flex-wrap items-start justify-between gap-6 border-b border-surface pb-6">
        <div class="flex min-w-0 flex-col gap-3">
          <img :src="logo" alt="Farm to Feed" width="215" height="32" class="h-7 w-auto" />
          <address class="flex flex-col not-italic text-muted">
            <span class="font-medium text-color">{{ seller.name }}</span>
            <span v-for="line in seller.address" :key="line">{{ line }}</span>
            <span>KRA PIN {{ seller.kraPin }}</span>
            <span>{{ seller.email }}</span>
          </address>
        </div>
        <div class="flex min-w-0 flex-col items-start gap-2 sm:items-end print:items-end">
          <h3 :id="titleId" class="text-2xl font-medium tracking-tight">{{ title }}</h3>
          <p class="font-medium tabular-nums">{{ number }}</p>
          <slot name="status" />
        </div>
      </header>

      <dl
        :aria-label="`${title} details`"
        class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4"
      >
        <div v-for="item in meta" :key="item.label" class="flex min-w-0 flex-col gap-1">
          <dt class="text-xs font-medium uppercase tracking-wide text-muted">{{ item.label }}</dt>
          <dd class="wrap-break-word">{{ item.value }}</dd>
        </div>
      </dl>

      <slot />

      <footer class="border-t border-surface pt-4 text-xs text-muted">
        Sample document for layout only. Company, customer, tax, and payment details are fictional.
      </footer>
    </article>
  </div>
</template>
