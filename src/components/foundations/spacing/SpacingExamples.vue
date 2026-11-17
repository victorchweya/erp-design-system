<script setup lang="ts">
import { spacing } from '@/theme/erp-theme/foundations/spacing'

const controls = [
  {
    label: 'Small',
    size: 'small',
    x: 2.5,
    y: 1.5,
    token: 'form.field.sm',
    utility: 'px-2.5 py-1.5',
  },
  { label: 'Default', size: undefined, x: 3, y: 2, token: 'form.field', utility: 'px-3 py-2' },
  {
    label: 'Large',
    size: 'large',
    x: 3.5,
    y: 2.5,
    token: 'form.field.lg',
    utility: 'px-3.5 py-2.5',
  },
] as const
const examples = controls.map((control) => ({
  ...control,
  horizontal: `${Number.parseFloat(spacing[control.x]) * 16}px`,
  vertical: `${Number.parseFloat(spacing[control.y]) * 16}px`,
}))
</script>

<template>
  <section
    id="spacing-examples"
    aria-labelledby="spacing-examples-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="spacing-examples-title" class="text-3xl font-medium">Padding & gaps</h2>
    <p class="text-muted-color">
      Padding creates space inside a surface. Gap separates items in a flex or grid layout.
    </p>
    <div class="grid gap-4 sm:grid-cols-2">
      <Card class="min-w-0" role="figure" aria-label="Padding example">
        <template #content>
          <div class="rounded-lg bg-primary-50 p-6 dark:bg-primary-950">
            <div class="rounded border border-dashed border-primary bg-surface p-4 text-sm">
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
            <div v-for="item in 3" :key="item" class="h-14 min-w-0 flex-1 rounded bg-primary" />
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
    <h2 id="spacing-controls-title" class="text-3xl font-medium">Control spacing</h2>
    <p class="text-muted-color">
      PrimeVue buttons and inputs share form.field padding tokens. Use the component’s size property
      to change density. The utilities below describe the equivalent padding; they do not need to be
      added to the controls.
    </p>
    <div class="grid gap-4 lg:grid-cols-3">
      <Card v-for="control in examples" :key="control.label" class="min-w-0">
        <template #title
          ><h3>{{ control.label }}</h3></template
        >
        <template #content>
          <div class="flex flex-col items-start gap-4">
            <InputText
              modelValue="Fresh produce"
              :size="control.size"
              readonly
              :aria-label="`${control.label} input spacing example`"
              class="w-full"
            />
            <Button :size="control.size">Confirm order</Button>
          </div>
        </template>
        <template #footer>
          <div class="flex flex-col gap-1">
            <p class="text-sm text-muted-color">
              {{ control.horizontal }} horizontal / {{ control.vertical }} vertical
            </p>
            <code class="text-xs text-muted-color">{{ control.utility }}</code>
            <code class="break-all text-xs text-muted-color"
              >{{ control.token }}.padding.x / .y</code
            >
          </div>
        </template>
      </Card>
    </div>
    <p class="text-sm text-muted-color">
      Cards use 20px padding and 8px gaps. Some existing component internals use 18px padding or a
      26px alignment margin; these remain component-specific rather than new scale steps.
    </p>
  </section>
</template>
