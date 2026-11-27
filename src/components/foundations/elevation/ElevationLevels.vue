<script setup lang="ts">
import { semantic } from '@/theme/erp-theme/base'

const { overlay } = semantic
const levels = [
  {
    name: 'Flat',
    utility: 'shadow-none',
    preview: 'shadow-none border border-surface',
    token: 'card.shadow: none',
    use: 'Page content, Card, DataTable, Panel. Separate with a 1px border, not a shadow.',
  },
  {
    name: 'Raised',
    utility: 'shadow-xs',
    preview: 'shadow-xs border border-surface',
    token: 'No preset token',
    use: 'Sticky toolbars with content scrolling beneath them, and cards that lift on hover or drag.',
  },
  {
    name: 'Overlay',
    utility: 'shadow-md',
    preview: 'shadow-md border border-surface',
    token: 'overlay.select | popover | navigation.shadow',
    value: overlay.popover.shadow,
    use: 'Select, AutoComplete, DatePicker, Popover, Tooltip, and popup menus.',
  },
  {
    name: 'Modal',
    utility: 'shadow-xl',
    preview: 'shadow-xl border border-surface',
    token: 'overlay.modal.shadow',
    value: overlay.modal.shadow,
    use: 'Dialog, ConfirmDialog, and Drawer, always above a mask.',
  },
]
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <Card v-for="level in levels" :key="level.name" class="min-w-0">
      <template #content>
        <div class="flex flex-col gap-4">
          <div
            :class="level.preview"
            class="h-16 rounded-lg bg-surface-0 dark:bg-surface-800"
            aria-hidden="true"
          />
          <div class="flex flex-col gap-1">
            <h3 class="text-base font-medium">{{ level.name }}</h3>
            <p class="text-muted-color">{{ level.use }}</p>
          </div>
          <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
            <dt class="text-muted-color">Utility</dt>
            <dd>
              <code>{{ level.utility }}</code>
            </dd>
            <dt class="text-muted-color">Token</dt>
            <dd>
              <code>{{ level.token }}</code>
            </dd>
            <template v-if="level.value">
              <dt class="text-muted-color">Value</dt>
              <dd>
                <code class="wrap-break-word">{{ level.value }}</code>
              </dd>
            </template>
          </dl>
        </div>
      </template>
    </Card>
  </div>
</template>
