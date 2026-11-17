<script setup lang="ts">
import Bell from '@primeicons/vue/bell'
import ColorModeToggle from '@/components/playground/ColorModeToggle.vue'
import AppBreadcrumb from './AppBreadcrumb.vue'
import SidebarToggle from './SidebarToggle.vue'

defineProps<{ sidebarVisible: boolean; desktop: boolean }>()
defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between border-b border-surface-200 bg-surface-0 px-4 transition-[left] duration-200 motion-reduce:transition-none dark:border-surface-700 dark:bg-surface-900 sm:px-6 lg:px-8"
    :class="{ 'lg:left-72': sidebarVisible }"
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

    <div class="ml-auto flex shrink-0 items-center gap-6 pl-3 sm:gap-8">
      <ColorModeToggle />
      <span role="img" aria-label="Notifications" class="text-surface-500 dark:text-surface-400">
        <Bell :size="18" aria-hidden="true" />
      </span>
      <img
        src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png"
        alt="User avatar"
        width="32"
        height="32"
        class="size-8 rounded-full"
      />
    </div>
  </header>
</template>
