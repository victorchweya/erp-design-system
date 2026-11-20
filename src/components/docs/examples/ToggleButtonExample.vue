<script setup lang="ts">
import { shallowRef } from 'vue'
import Star from '@primeicons/vue/star'
import StarFill from '@primeicons/vue/star-fill'
const favourite = shallowRef(false)
const archived = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-4">
      <ToggleButton v-model="favourite" onLabel="Favourite supplier" offLabel="Favourite supplier"
        ><template #icon="{ value, class: iconClass }"
          ><StarFill v-if="value" :class="iconClass" aria-hidden="true" /><Star
            v-else
            :class="iconClass"
            aria-hidden="true" /></template
      ></ToggleButton>
      <ToggleButton
        v-model="archived"
        onLabel="Show archived orders"
        offLabel="Show archived orders"
        size="small"
      /><ToggleButton :modelValue="false" onLabel="Bulk edit" offLabel="Bulk edit" disabled />
    </div>
    <p class="text-muted-color">
      {{ favourite ? 'Marked as a favourite supplier.' : 'Not a favourite supplier.' }}
      {{ archived ? 'Archived orders are shown.' : 'Archived orders are hidden.' }}
    </p>
  </div>
</template>
