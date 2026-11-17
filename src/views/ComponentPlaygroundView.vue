<script setup lang="ts">
import ButtonsPreview from '@/components/playground/ButtonsPreview.vue'
import FormPreview from '@/components/playground/FormPreview.vue'
import TablePreview from '@/components/playground/TablePreview.vue'
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:gap-10 lg:px-8 lg:py-12">
    <div class="flex flex-col gap-3">
      <p class="font-mono text-sm text-muted-color">Components / Playground</p>
      <h1
        id="playground-heading"
        class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
      >
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
  </div>
</template>
