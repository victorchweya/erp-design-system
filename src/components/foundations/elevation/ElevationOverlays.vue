<script setup lang="ts">
import { overlayZIndex } from '@/theme/erp-theme/foundations/layers'

const categories = [
  {
    key: 'overlay',
    base: overlayZIndex.overlay,
    components:
      'Select, MultiSelect, AutoComplete, CascadeSelect, TreeSelect, DatePicker, Password, Popover, ConfirmPopup, ColorPicker, DataTable filter menu, ScrollTop',
  },
  {
    key: 'menu',
    base: overlayZIndex.menu,
    components: 'Popup Menu, TieredMenu, ContextMenu, MegaMenu, Menubar mobile menu',
  },
  {
    key: 'modal',
    base: overlayZIndex.modal,
    components: 'Dialog, ConfirmDialog, DynamicDialog, Drawer, BlockUI, Image preview',
  },
  { key: 'tooltip', base: overlayZIndex.tooltip, components: 'Tooltip directive' },
]

// Mirrors PrimeVue's ZIndex utility: same category adds 1; a new category adds its base.
const drawer = overlayZIndex.modal + 1
const dialog = drawer + 1
const select = dialog + overlayZIndex.overlay + 1
const sequence = [
  { step: 'Open a Drawer', zIndex: drawer, rule: `modal base ${overlayZIndex.modal} + 1` },
  { step: 'Open a Dialog from the Drawer', zIndex: dialog, rule: 'Same category: previous + 1' },
  {
    step: 'Open a Select in the Dialog',
    zIndex: select,
    rule: `New category: previous + overlay base ${overlayZIndex.overlay} + 1`,
  },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <DataTable
      :value="categories"
      size="small"
      showGridlines
      aria-label="PrimeVue z-index categories"
    >
      <Column field="key" header="Category"
        ><template #body="{ data }"
          ><code>{{ data.key }}</code></template
        ></Column
      >
      <Column field="base" header="Base"
        ><template #body="{ data }"
          ><span class="tabular-nums">{{ data.base }}</span></template
        ></Column
      >
      <Column field="components" header="Components" />
    </DataTable>

    <div class="flex flex-col gap-3">
      <h3 class="text-base font-medium">Nested overlays</h3>
      <p class="leading-relaxed text-muted-color">
        PrimeVue tracks every open layer. A new layer always opens above the topmost one, so a
        Dialog opened from a Drawer, or a Select inside that Dialog, stacks correctly without manual
        z-index values. Values are released when each layer closes.
      </p>
      <DataTable
        :value="sequence"
        size="small"
        showGridlines
        aria-label="Example z-index sequence for nested overlays"
      >
        <Column field="step" header="Action" />
        <Column field="zIndex" header="z-index"
          ><template #body="{ data }"
            ><span class="tabular-nums">{{ data.zIndex }}</span></template
          ></Column
        >
        <Column field="rule" header="Rule" />
      </DataTable>
    </div>
  </div>
</template>
