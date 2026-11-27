<script setup lang="ts">
import {
  appShellLayers,
  notificationLayers,
  overlayZIndex,
} from '@/theme/erp-theme/foundations/layers'

// Ordered from the bottom of the stack to the top.
const layers = [
  { name: 'Page content', zIndex: 'auto', detail: 'Cards, tables, forms', shadow: 'shadow-none' },
  {
    name: 'Sticky headers',
    zIndex: '1–10',
    detail: 'Table headers, page toolbars',
    shadow: 'shadow-xs',
  },
  {
    name: 'Topbar',
    zIndex: String(appShellLayers.topbar),
    detail: 'App shell header',
    shadow: 'shadow-none',
  },
  {
    name: 'Sidebar',
    zIndex: String(appShellLayers.sidebar),
    detail: 'App shell navigation',
    shadow: 'shadow-none',
  },
  {
    name: 'Overlays and menus',
    zIndex: `${overlayZIndex.overlay}+`,
    detail: 'Select, Popover, Menu',
    shadow: 'shadow-md',
  },
  {
    name: 'Modals and tooltips',
    zIndex: `${overlayZIndex.modal}+`,
    detail: 'Dialog, Drawer, Tooltip',
    shadow: 'shadow-xl',
  },
  {
    name: 'Notifications',
    zIndex: String(notificationLayers.toast),
    detail: 'ToastHost',
    shadow: 'shadow-xl',
  },
].map((layer, index, all) => ({
  ...layer,
  style: {
    bottom: `${0.75 + index * 3.25}rem`,
    left: `${0.75 + index * 0.75}rem`,
    right: `${0.75 + (all.length - 1 - index) * 0.75}rem`,
  },
}))
</script>

<template>
  <figure class="flex flex-col gap-3">
    <ol
      class="relative isolate h-[26rem] rounded-lg border border-dashed border-surface bg-emphasis p-0"
      aria-label="Stacking order, from page content at the bottom to notifications at the top"
    >
      <li
        v-for="layer in layers"
        :key="layer.name"
        :class="layer.shadow"
        :style="layer.style"
        class="absolute flex h-20 items-start justify-between gap-3 rounded-lg border border-surface bg-surface-0 p-3 dark:bg-surface-900"
      >
        <span class="flex min-w-0 flex-col">
          <span class="font-medium">{{ layer.name }}</span>
          <span class="truncate text-xs text-muted-color">{{ layer.detail }}</span>
        </span>
        <Tag severity="secondary" class="shrink-0"
          ><code>z {{ layer.zIndex }}</code></Tag
        >
      </li>
    </ol>
    <figcaption class="text-muted-color">
      Each layer sits above the ones before it. Values come from
      <code class="text-color">layers.ts</code> and PrimeVue’s DataTable styles.
    </figcaption>
  </figure>
</template>
