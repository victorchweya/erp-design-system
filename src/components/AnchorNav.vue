<script setup lang="ts">
defineProps<{
  items: readonly { id: string; label: string }[]
  activeId: string
  inline?: boolean
}>()
</script>

<template>
  <nav
    aria-label="On this page"
    class="flex flex-col gap-3 text-sm"
    :class="{ 'rounded-lg border border-surface p-4': inline }"
  >
    <p class="font-medium" :class="{ 'pl-4': !inline }">On this page</p>
    <div
      :class="inline ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-col border-l border-surface'"
    >
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        :aria-current="activeId === item.id ? 'location' : undefined"
        :class="[
          inline
            ? 'underline-offset-4 hover:underline'
            : '-ml-px border-l-2 py-2 pl-4 transition-colors hover:text-color',
          activeId === item.id
            ? inline
              ? 'font-medium text-primary'
              : 'border-primary font-medium text-color'
            : inline
              ? 'text-muted-color'
              : 'border-transparent text-muted-color',
        ]"
        >{{ item.label }}</a
      >
    </div>
  </nav>
</template>
