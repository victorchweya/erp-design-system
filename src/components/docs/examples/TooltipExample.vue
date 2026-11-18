<script setup lang="ts">
import { useId } from 'vue'
import vTooltip from 'primevue/tooltip'
const id = useId()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="font-medium">Order reference</label
    ><InputText
      :id="id"
      v-tooltip.focus="'Find the reference on your order confirmation.'"
      :aria-describedby="`${id}-help`"
      class="w-full sm:max-w-xs"
    />
    <p :id="`${id}-help`" class="text-muted">For example, FTF-1042.</p>
  </div>
</template>
