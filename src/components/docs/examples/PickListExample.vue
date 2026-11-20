<script setup lang="ts">
import { ref } from 'vue'
import type { ListboxPassThroughMethodOptions } from 'primevue/listbox'
const lists = ref([
  [
    { id: '1', name: 'Valley Growers' },
    { id: '2', name: 'Green Acres' },
    { id: '3', name: 'Sunrise Farm' },
  ],
  [],
])
function listAttributes({ props }: ListboxPassThroughMethodOptions) {
  return {
    'aria-label': props.options === lists.value[0] ? 'Available suppliers' : 'Assigned suppliers',
  }
}
</script>

<template>
  <PickList
    v-model="lists"
    dataKey="id"
    breakpoint="900px"
    :showSourceControls="false"
    :moveToTargetProps="{ 'aria-label': 'Assign selected suppliers' }"
    :moveAllToTargetProps="{ 'aria-label': 'Assign all suppliers' }"
    :moveToSourceProps="{ 'aria-label': 'Remove selected suppliers' }"
    :moveAllToSourceProps="{ 'aria-label': 'Remove all suppliers' }"
    :pt="{ pcListbox: { list: listAttributes } }"
    ><template #sourceheader>Available suppliers</template
    ><template #targetheader>Assigned suppliers</template
    ><template #option="{ option }">{{ option.name }}</template></PickList
  >
</template>
