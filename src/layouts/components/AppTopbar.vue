<script setup lang="ts">
import Bell from '@primeicons/vue/bell'
import { RouterLink } from 'vue-router'
import ColorModeToggle from '@/components/ColorModeToggle.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import SidebarToggle from './SidebarToggle.vue'
import AppUserMenu from './AppUserMenu.vue'

defineProps<{ sidebarVisible: boolean; desktop: boolean }>()
defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between border-b border-surface bg-surface-0 px-4 transition-[left] duration-200 motion-reduce:transition-none dark:bg-surface-900 sm:px-6 lg:px-8"
    :class="{ 'lg:left-64': sidebarVisible }"
  >
    <div class="flex min-w-0 items-center gap-3">
      <SidebarToggle
        v-if="!desktop || !sidebarVisible"
        :visible="sidebarVisible"
        class="shrink-0"
        @toggle="$emit('toggleSidebar')"
      />
      <AppBreadcrumb />
    </div>

    <div class="ml-auto flex shrink-0 items-center pl-3">
      <div class="flex items-center gap-1">
        <ColorModeToggle />
        <span class="mx-1 h-5 w-px bg-surface" aria-hidden="true" />
        <Button
          type="button"
          iconOnly
          rounded
          text
          severity="secondary"
          size="small"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell aria-hidden="true" />
          <span
            class="pointer-events-none absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
            aria-hidden="true"
          />
        </Button>
        <span class="mx-1 h-5 w-px bg-surface" aria-hidden="true" />
        <AppUserMenu />
      </div>
    </div>
  </header>
</template>
