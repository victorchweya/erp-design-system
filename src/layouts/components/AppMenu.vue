<script setup lang="ts">
import AngleDown from '@primeicons/vue/angle-down'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

defineEmits<{ navigate: [] }>()

const route = useRoute()
type MenuGroup = {
  id: string
  label: string
  heading?: string
  items: { label: string; to?: string }[]
}
const groups: MenuGroup[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    items: [
      { label: 'Color', to: '/foundations/color' },
      { label: 'Motion', to: '/foundations/motion' },
      { label: 'Spacing', to: '/foundations/spacing' },
      { label: 'Icons', to: '/foundations/icons' },
      { label: 'Typography', to: '/foundations/typography' },
    ],
  },
  {
    id: 'core-elements',
    label: 'Core elements',
    heading: 'Components',
    items: [
      { label: 'Button', to: '/components/core-elements/button' },
      { label: 'SplitButton' },
      { label: 'SpeedDial' },
      { label: 'Avatar' },
      { label: 'Badge' },
      { label: 'Card' },
      { label: 'Chip' },
      { label: 'Divider' },
      { label: 'Tag' },
      { label: 'Toolbar' },
      { label: 'Skeleton' },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    items: [
      { label: 'Inputs' },
      { label: 'Textarea' },
      { label: 'InputNumber' },
      { label: 'InputPassword' },
      { label: 'InputOtp' },
      { label: 'InputTags' },
      { label: 'AutoComplete' },
      { label: 'Select' },
      { label: 'MultiSelect' },
      { label: 'Listbox' },
      { label: 'CascadeSelect' },
      { label: 'TreeSelect' },
      { label: 'Checkbox' },
      { label: 'RadioButton' },
      { label: 'ToggleSwitch' },
      { label: 'ToggleButton' },
      { label: 'SelectButton' },
      { label: 'DatePicker' },
      { label: 'Slider' },
      { label: 'Rating' },
      { label: 'Knob' },
      { label: 'InputColor' },
      { label: 'FileUpload' },
      { label: 'Editor' },
      { label: 'Inplace' },
      { label: 'Labels & field layout' },
    ],
  },
]
const menuGroups = computed(() =>
  groups.map((group) => ({
    ...group,
    open: group.id === 'foundations' || group.items.some((item) => item.to === route.path),
  })),
)

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
              v-if="item.to"
              :to="item.to"
              :class="linkClass"
              :exact-active-class="activeClass"
              @click="$emit('navigate')"
              >{{ item.label }}</RouterLink
            >
            <span
              v-else
              role="link"
              aria-disabled="true"
              :title="`${item.label} documentation is not available yet`"
              class="flex rounded-lg px-2 py-2 leading-tight text-muted-color"
              >{{ item.label }}<span class="sr-only"> — documentation pending</span></span
            >
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
