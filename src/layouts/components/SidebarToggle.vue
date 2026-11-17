<script setup lang="ts">
defineProps<{ visible: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <Button
    id="sidebar-toggle"
    type="button"
    iconOnly
    rounded
    variant="text"
    severity="secondary"
    :aria-label="visible ? 'Hide sidebar' : 'Show sidebar'"
    :aria-expanded="visible"
    aria-controls="app-sidebar"
    @click="$emit('toggle')"
  >
    <svg
      aria-hidden="true"
      fill="none"
      width="15"
      height="15"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      :class="{ '-scale-x-100': !visible }"
    >
      <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
      <line x1="9" x2="9" y1="3" y2="21" />
    </svg>
  </Button>
</template>
