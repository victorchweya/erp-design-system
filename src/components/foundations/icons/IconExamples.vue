<script setup lang="ts">
import Search from '@primeicons/vue/search'
import CheckCircle from '@primeicons/vue/check-circle'
import InfoCircle from '@primeicons/vue/info-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import TimesCircle from '@primeicons/vue/times-circle'

const sizes = [
  { pixels: 12, usage: 'Small controls and chips' },
  { pixels: 16, usage: 'Default and large controls' },
  { pixels: 20, usage: 'Larger standalone actions and navigation' },
  { pixels: 24, usage: 'Standalone icons' },
  { pixels: 32, usage: 'Feature and empty-state icons' },
]
const colours = [
  { label: 'Primary', utility: 'text-primary', icon: Search },
  { label: 'Muted', utility: 'text-muted', icon: Search },
  { label: 'Success', utility: 'text-success', icon: CheckCircle },
  { label: 'Info', utility: 'text-info', icon: InfoCircle },
  { label: 'Warn', utility: 'text-warn', icon: ExclamationTriangle },
  { label: 'Danger', utility: 'text-danger', icon: TimesCircle },
]
</script>

<template>
  <section
    id="icons-sizes"
    aria-labelledby="icons-sizes-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="icons-sizes-title" class="text-2xl font-medium">Sizes</h2>
    <p class="text-muted-color">
      Use 12, 16, 20, 24, or 32px to match the surrounding content. The size property sets both
      width and height. Keep the icon size consistent within a group.
    </p>
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <Card v-for="size in sizes" :key="size.pixels" class="min-w-0">
        <template #content>
          <div class="flex h-12 items-center text-primary">
            <Search :size="size.pixels" aria-hidden="true" focusable="false" />
          </div>
        </template>
        <template #footer>
          <div class="flex flex-col gap-1">
            <h3 class="font-medium">{{ size.pixels }}px</h3>
            <code class="text-xs text-muted-color">:size="{{ size.pixels }}"</code>
            <p class="text-sm text-muted-color">{{ size.usage }}</p>
          </div>
        </template>
      </Card>
    </div>
  </section>
  <section
    id="icons-colours"
    aria-labelledby="icons-colours-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="icons-colours-title" class="text-2xl font-medium">Colours</h2>
    <p class="text-muted-color">
      Use the same semantic text colours as the rest of the interface. These adapt to light and dark
      mode. On a coloured button, inherit its contrast colour.
    </p>
    <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <Card v-for="colour in colours" :key="colour.utility" class="min-w-0">
        <template #content>
          <span class="inline-flex items-center gap-2" :class="colour.utility">
            <component :is="colour.icon" :size="24" aria-hidden="true" focusable="false" />
            <span class="font-medium">{{ colour.label }}</span>
          </span>
        </template>
        <template #footer>
          <code class="text-xs text-muted-color">{{ colour.utility }}</code>
        </template>
      </Card>
    </div>
  </section>
</template>
