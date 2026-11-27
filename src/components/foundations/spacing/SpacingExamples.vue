<script setup lang="ts">
import ControlDensityExample from './ControlDensityExample.vue'
</script>

<template>
  <section
    id="spacing-examples"
    aria-labelledby="spacing-examples-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="spacing-examples-title" class="text-2xl font-medium">Padding & gaps</h2>
    <p class="text-muted-color">
      Padding creates space inside a surface. Gap separates items in a flex or grid layout.
    </p>
    <div class="grid gap-4 sm:grid-cols-2">
      <Card class="min-w-0" role="figure" aria-label="Padding example">
        <template #content>
          <div class="rounded-lg bg-primary-50 p-6 dark:bg-primary-950">
            <div class="rounded-sm border border-dashed border-primary bg-surface p-4 text-sm">
              Content
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex flex-col gap-1">
            <span class="font-medium">Padding</span
            ><code class="text-sm text-muted-color">p-6 · 24px</code>
          </div>
        </template>
      </Card>
      <Card class="min-w-0" role="figure" aria-label="Gap example">
        <template #content>
          <div
            class="flex gap-4 rounded-lg bg-primary-50 p-6 dark:bg-primary-950"
            aria-hidden="true"
          >
            <div v-for="item in 3" :key="item" class="h-14 min-w-0 flex-1 rounded-sm bg-primary" />
          </div>
        </template>
        <template #footer>
          <div class="flex flex-col gap-1">
            <span class="font-medium">Gap</span
            ><code class="text-sm text-muted-color">gap-4 · 16px</code>
          </div>
        </template>
      </Card>
    </div>
  </section>

  <section
    id="spacing-controls"
    aria-labelledby="spacing-controls-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="spacing-controls-title" class="text-2xl font-medium">Control spacing</h2>
    <p class="text-muted-color">
      Compact controls share one theme scale. Use size="small" for dense actions, the default for
      ordinary forms, and size="large" for more prominent controls. At a 16px root, single-line
      controls are approximately 31px, 35px, and 42px high, including borders. Textareas and chip
      fields grow with content.
    </p>
    <ControlDensityExample />

    <p class="text-sm text-muted-color">
      Cards use 20px padding and 8px gaps. Some existing component internals use 18px padding or a
      26px alignment margin; these remain component-specific rather than new scale steps.
    </p>
  </section>
</template>
