<script setup lang="ts">
import { useId } from 'vue'
import vTooltip from 'primevue/tooltip'

const id = useId()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="font-medium">Order reference</label>
    <!-- The field already has aria-describedby, so add the tooltip id to it. -->
    <InputText
      :id="id"
      v-tooltip.right.both="{
        value: 'Find it on the order confirmation email or SMS.',
        id: `${id}-tooltip`,
      }"
      :aria-describedby="`${id}-help ${id}-tooltip`"
      class="w-full sm:max-w-xs"
    />
    <small :id="`${id}-help`" class="text-muted-color">For example, FTF-1042.</small>
  </div>
</template>
