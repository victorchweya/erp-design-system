<script setup lang="ts">
import AngleDown from '@primeicons/vue/angle-down'
import { RouterLink } from 'vue-router'

defineEmits<{ navigate: [] }>()

const foundations = [
  { label: 'Color', to: '/foundations/color' },
  { label: 'Motion', to: '/foundations/motion' },
  { label: 'Spacing', to: '/foundations/spacing' },
  { label: 'Icons', to: '/foundations/icons' },
  { label: 'Typography', to: '/foundations/typography' },
]

const linkClass =
  'flex rounded-lg px-2 py-2 leading-tight text-surface-700 transition-colors hover:bg-primary-50 hover:text-surface-900 dark:text-surface-200 dark:hover:bg-primary-950/40 dark:hover:text-surface-50'
const activeClass =
  'bg-primary-50 font-medium text-surface-900 dark:bg-primary-950/40 dark:text-surface-50'
</script>

<template>
  <nav aria-label="Design system navigation" class="flex flex-col gap-1 text-sm">
    <h2 class="px-2 py-1 font-medium">Getting started</h2>
    <RouterLink
      to="/general"
      :class="linkClass"
      :exact-active-class="activeClass"
      @click="$emit('navigate')"
    >
      General
    </RouterLink>
    <details open class="group menu-group">
      <summary
        :class="[
          linkClass,
          'cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden',
        ]"
      >
        <span class="menu-group-label">Foundations</span>
        <AngleDown
          :size="14"
          aria-hidden="true"
          class="ml-auto text-surface-500 transition-transform group-open:rotate-180 dark:text-surface-400"
        />
      </summary>
      <ul
        class="ml-6 mt-1 flex flex-col gap-1 border-l border-surface-200 pl-2 dark:border-surface-700"
      >
        <li v-for="section in foundations" :key="section.to">
          <RouterLink
            :to="section.to"
            :class="linkClass"
            :exact-active-class="activeClass"
            @click="$emit('navigate')"
          >
            {{ section.label }}
          </RouterLink>
        </li>
      </ul>
    </details>
    <RouterLink
      to="/"
      :class="linkClass"
      :exact-active-class="activeClass"
      @click="$emit('navigate')"
    >
      Component playground
    </RouterLink>
  </nav>
</template>

<style scoped>
.menu-group:has([aria-current='page']) > summary > .menu-group-label {
  @apply font-medium;
  color: var(--p-text-color);
}
</style>
