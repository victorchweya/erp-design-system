<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import AppTopbar from './components/AppTopbar.vue'

const desktopQuery = window.matchMedia('(min-width: 1024px)')
const isDesktop = shallowRef(desktopQuery.matches)
const sidebarVisible = shallowRef(isDesktop.value)

function updateViewport(event: MediaQueryListEvent) {
  isDesktop.value = event.matches
  sidebarVisible.value = event.matches
}

function closeMobileSidebar() {
  if (!isDesktop.value) sidebarVisible.value = false
}

async function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value
  if (isDesktop.value) {
    await nextTick()
    document.getElementById('sidebar-toggle')?.focus()
  }
}

onMounted(() => desktopQuery.addEventListener('change', updateViewport))
onBeforeUnmount(() => desktopQuery.removeEventListener('change', updateViewport))
</script>

<template>
  <div class="min-h-dvh bg-surface-0 dark:bg-surface-950">
    <a href="#main-content" class="sr-only focus:not-sr-only">Skip to components</a>

    <AppSidebar
      v-model:visible="sidebarVisible"
      :desktop="isDesktop"
      @navigate="closeMobileSidebar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="min-w-0 transition-[padding] duration-200 motion-reduce:transition-none"
      :class="{ 'lg:pl-64': sidebarVisible }"
    >
      <AppTopbar
        :sidebar-visible="sidebarVisible"
        :desktop="isDesktop"
        @toggle-sidebar="toggleSidebar"
      />

      <main
        id="main-content"
        tabindex="-1"
        class="min-h-dvh bg-surface-0 pt-14 dark:bg-surface-950"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
