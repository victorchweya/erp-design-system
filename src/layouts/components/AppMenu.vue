<script setup lang="ts">
import AngleDown from '@primeicons/vue/angle-down'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { componentPages } from '@/data/component-pages'
import { blockPages } from '@/data/block-pages'

defineEmits<{ navigate: [] }>()

const route = useRoute()
type MenuGroup = {
  id: string
  label: string
  heading?: string
  items: { label: string; to: string }[]
  groups?: { label: string; items: { label: string; to: string }[] }[]
}
const componentGroupOrder = [
  'Form',
  'Button',
  'Data',
  'Panel',
  'Overlay',
  'File',
  'Menu',
  'Messages',
  'Media',
  'Misc',
]
const groups: MenuGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    items: [
      { label: 'Color', to: '/foundations/color' },
      { label: 'Motion', to: '/foundations/motion' },
      { label: 'Spacing', to: '/foundations/spacing' },
      { label: 'Elevation', to: '/foundations/elevation' },
      { label: 'Icons', to: '/foundations/icons' },
      { label: 'Typography', to: '/foundations/typography' },
      { label: 'Formatting', to: '/foundations/formatting' },
      { label: 'Writing', to: '/foundations/writing' },
      { label: 'Accessibility', to: '/foundations/accessibility' },
      { label: 'Data visualization', to: '/foundations/data-visualization' },
    ],
  },
  ...componentGroupOrder.map((label, index) => ({
    id: label.toLowerCase().replace(/ /g, '-'),
    label,
    heading: index === 0 ? 'Components' : undefined,
    items: componentPages
      .filter((page) => page.group === label)
      .sort((a, b) => (label === 'Misc' ? a.label.localeCompare(b.label) : 0))
      .map((page) => ({ label: page.label, to: page.path })),
  })),
  {
    id: 'ui-blocks',
    label: 'UI blocks',
    items: blockPages
      .filter((page) => !page.group)
      .map((page) => ({ label: page.label, to: page.path })),
    groups: ['KPI / metric card', 'Charts', 'ERP patterns'].map((label) => ({
      label,
      items: blockPages
        .filter((page) => page.group === label)
        .map((page) => ({ label: page.label, to: page.path })),
    })),
  },
]
const menuGroups = computed(() =>
  groups.map((group) => ({
    ...group,
    open:
      group.id === 'foundations' ||
      group.items.some((item) => item.to === route.path) ||
      group.groups?.some((nestedGroup) => nestedGroup.items.some((item) => item.to === route.path)),
  })),
)

const linkClass =
  'flex rounded-lg px-2 py-2 leading-tight text-surface-700 transition-colors hover:bg-primary-50 hover:text-surface-900 dark:text-surface-200 dark:hover:bg-primary-950/40 dark:hover:text-surface-50'
const activeClass =
  'bg-primary-50 font-medium text-primary-600 dark:bg-primary-950/40 dark:text-surface-50'
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
    <template v-for="group in menuGroups" :key="group.id">
      <h2 v-if="group.heading" class="mt-4 px-2 py-1 font-medium">{{ group.heading }}</h2>
      <details :open="group.open" class="group menu-group">
        <summary
          :class="[
            linkClass,
            'cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden',
          ]"
        >
          <span class="menu-group-label">{{ group.label }}</span>
          <AngleDown
            :size="14"
            aria-hidden="true"
            class="ml-auto text-surface-500 transition-transform group-open:rotate-180 dark:text-surface-400"
          />
        </summary>
        <ul
          class="ml-6 mt-1 flex flex-col gap-1 border-l border-surface-200 pl-2 dark:border-surface-700"
        >
          <li v-for="item in group.items" :key="item.label">
            <RouterLink
              :to="item.to"
              :class="linkClass"
              :exact-active-class="activeClass"
              @click="$emit('navigate')"
              >{{ item.label }}</RouterLink
            >
          </li>
          <li v-for="nestedGroup in group.groups" :key="nestedGroup.label">
            <details
              :open="nestedGroup.items.some((item) => item.to === route.path)"
              class="group/nested menu-group"
            >
              <summary
                :class="[
                  linkClass,
                  'cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden',
                ]"
              >
                <span class="menu-group-label">{{ nestedGroup.label }}</span>
                <AngleDown
                  :size="14"
                  aria-hidden="true"
                  class="ml-auto text-surface-500 transition-transform group-open/nested:rotate-180 dark:text-surface-400"
                />
              </summary>
              <ul
                class="ml-4 mt-1 flex flex-col gap-1 border-l border-surface-200 pl-2 dark:border-surface-700"
              >
                <li v-for="item in nestedGroup.items" :key="item.label">
                  <RouterLink
                    :to="item.to"
                    :class="linkClass"
                    :exact-active-class="activeClass"
                    @click="$emit('navigate')"
                    >{{ item.label }}</RouterLink
                  >
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </template>
  </nav>
</template>

<style scoped>
.menu-group:has([aria-current='page']) > summary > .menu-group-label {
  @apply font-medium;
  color: var(--p-text-color);
}
</style>
