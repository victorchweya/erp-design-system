<script setup lang="ts">
import { fontSizes, fontWeights } from '@/theme/erp-theme/foundations/typography'

defineProps<{
  id: string
  label: string
  size: keyof typeof fontSizes
  weight: keyof typeof fontWeights
  description: string
}>()

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
}
const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

function pixels(value: string) {
  return `${Number.parseFloat(value) * 16}px`
}
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-title`" class="flex scroll-mt-24 flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h2 :id="`${id}-title`" class="text-xl font-medium">{{ label }}</h2>
      <p class="text-muted-color">{{ description }}</p>
    </div>
    <Card class="min-w-0">
      <template #content>
        <p class="break-words" :class="[sizeClasses[size], weightClasses[weight]]">
          Shaping the Future of Food
        </p>
      </template>
      <template #footer>
        <dl class="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <div>
            <dt class="text-muted-color">Tailwind</dt>
            <dd class="font-mono">{{ sizeClasses[size] }} {{ weightClasses[weight] }}</dd>
          </div>
          <div>
            <dt class="text-muted-color">Weight</dt>
            <dd>{{ fontWeights[weight] }}</dd>
          </div>
          <div>
            <dt class="text-muted-color">Size</dt>
            <dd>{{ pixels(fontSizes[size][0]) }}</dd>
          </div>
          <div>
            <dt class="text-muted-color">Line height</dt>
            <dd>
              {{ pixels(fontSizes[size][1] === '1' ? fontSizes[size][0] : fontSizes[size][1]) }}
            </dd>
          </div>
        </dl>
      </template>
    </Card>
  </section>
</template>
