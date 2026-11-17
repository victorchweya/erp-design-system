<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import * as PrimeIcons from '@primeicons/vue'

const query = shallowRef('')
const icons = Object.entries(PrimeIcons)
  .flatMap(([name, component]) => {
    // The package also exports createIcon, which is a function rather than an icon component.
    if (typeof component !== 'object' || component === null) return []
    const path = name
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([a-zA-Z])(\d)/g, '$1-$2')
      .toLowerCase()
    return [{ name, path, component }]
  })
  .sort((a, b) => a.path.localeCompare(b.path))
const visibleIcons = computed(() => {
  const term = query.value.toLowerCase().replace(/[\s-]/g, '')
  return icons.filter((icon) => icon.name.toLowerCase().includes(term))
})
</script>

<template>
  <section
    id="icons-gallery"
    aria-labelledby="icons-gallery-title"
    class="flex scroll-mt-24 flex-col gap-4"
  >
    <h2 id="icons-gallery-title" class="text-2xl font-medium">Icon library</h2>
    <p class="text-muted-color">
      All {{ icons.length }} icons from our installed @primeicons/vue package. Use the path below
      each icon after @primeicons/vue/ when importing it.
    </p>
    <div class="flex flex-col gap-2">
      <label for="icon-search" class="text-sm font-medium">Search icons</label>
      <InputText
        id="icon-search"
        v-model="query"
        type="search"
        placeholder="Try arrow-left or shopping-cart"
        aria-describedby="icon-results"
        class="w-full sm:max-w-sm"
      />
    </div>
    <p id="icon-results" role="status" class="text-sm text-muted-color">
      {{ visibleIcons.length }} of {{ icons.length }} icons
    </p>
    <ul v-if="visibleIcons.length" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <li v-for="icon in visibleIcons" :key="icon.path" class="min-w-0">
        <Card class="h-full">
          <template #content>
            <div class="flex flex-col items-center gap-3 text-center">
              <component :is="icon.component" :size="24" aria-hidden="true" focusable="false" />
              <span class="break-all text-sm font-medium">{{ icon.name }}</span>
              <code class="break-all text-xs text-muted-color">{{ icon.path }}</code>
            </div>
          </template>
        </Card>
      </li>
    </ul>
    <p v-else class="text-muted-color">No icons match “{{ query }}”. Try another name.</p>
  </section>
</template>
