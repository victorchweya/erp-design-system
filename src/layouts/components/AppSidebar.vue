<script setup lang="ts">
import logo from '@/assets/brand/logo.svg'
import AppMenu from './AppMenu.vue'
import SidebarToggle from './SidebarToggle.vue'

defineProps<{ desktop: boolean }>()
const visible = defineModel<boolean>('visible', { required: true })
defineEmits<{ navigate: []; toggleSidebar: [] }>()

function restoreTriggerFocus() {
  document.getElementById('sidebar-toggle')?.focus()
}
</script>

<template>
  <aside
    v-if="desktop"
    id="app-sidebar"
    aria-label="Application sidebar"
    :inert="!visible"
    class="fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-surface-200 bg-surface-0 transition-transform duration-200 motion-reduce:transition-none dark:border-surface-700 dark:bg-surface-900"
    :class="visible ? 'translate-x-0' : '-translate-x-full'"
  >
    <div
      class="flex h-16 shrink-0 items-center justify-between border-b border-surface-200 px-5 dark:border-surface-800"
    >
      <a href="/" aria-label="Farm to Feed homepage">
        <img :src="logo" alt="Farm to Feed" width="215" height="32" class="h-6 w-auto" />
      </a>
      <SidebarToggle v-if="visible" :visible="visible" @toggle="$emit('toggleSidebar')" />
    </div>
    <div class="app-sidebar-scroll flex-1 overflow-y-auto p-2">
      <AppMenu @navigate="$emit('navigate')" />
    </div>
  </aside>

  <Drawer
    v-else
    id="app-sidebar"
    v-model:visible="visible"
    aria-label="Application sidebar"
    blockScroll
    class="w-72"
    :dt="{ header: { padding: '0 1.25rem' }, content: { padding: '0.5rem' } }"
    :pt="{ header: { class: 'h-16 shrink-0 border-b border-surface' } }"
    @after-hide="restoreTriggerFocus"
  >
    <template #header>
      <a href="/" aria-label="Farm to Feed homepage">
        <img :src="logo" alt="Farm to Feed" width="215" height="32" class="h-6 w-auto" />
      </a>
    </template>
    <AppMenu @navigate="$emit('navigate')" />
  </Drawer>
</template>

<style scoped>
.app-sidebar-scroll {
  scrollbar-gutter: stable;
  scrollbar-color: var(--p-surface-300) transparent;
  scrollbar-width: thin;
}

:global(.app-dark) .app-sidebar-scroll {
  scrollbar-color: var(--p-surface-700) transparent;
}
</style>
