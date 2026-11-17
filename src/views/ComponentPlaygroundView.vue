<script setup lang="ts">
import logo from '@/assets/brand/logo.svg'
import ButtonsPreview from '@/components/playground/ButtonsPreview.vue'
import ColorModeToggle from '@/components/playground/ColorModeToggle.vue'
import FormPreview from '@/components/playground/FormPreview.vue'
import TablePreview from '@/components/playground/TablePreview.vue'
</script>

<template>
  <a href="#components" class="sr-only focus:not-sr-only">Skip to components</a>

  <header class="border-b border-surface bg-surface-0 dark:bg-surface-900">
    <div
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-8"
    >
      <a href="/" aria-label="Farm to Feed homepage" class="inline-flex shrink-0">
        <img :src="logo" alt="Farm to Feed" width="215" height="32" class="h-8 w-auto" />
      </a>
      <ColorModeToggle />
    </div>
  </header>

  <main
    id="components"
    class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:gap-10 lg:px-8 lg:py-12"
  >
    <div class="flex flex-col gap-3">
      <p class="font-mono text-sm text-muted-color">Components / Playground</p>
      <h1 class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Component playground
      </h1>
      <p class="max-w-[64ch] text-pretty text-base text-muted-color">
        The building blocks of your ERP interface. Explore the variants, edit the fields, and try
        the interactions.
      </p>
    </div>

    <div class="grid items-stretch gap-6 lg:grid-cols-2">
      <ButtonsPreview />
      <FormPreview />
    </div>

    <TablePreview />
  </main>
</template>
