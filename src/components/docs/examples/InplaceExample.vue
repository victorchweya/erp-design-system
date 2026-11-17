<script setup lang="ts">
import { shallowRef } from 'vue'
const name = shallowRef('Farm order')
const draft = shallowRef(name.value)
function save(close: (event: Event) => void, event: Event) {
  if (!draft.value.trim()) return
  name.value = draft.value.trim()
  close(event)
}
</script>

<template>
  <div class="flex max-w-lg flex-col gap-3">
    <span class="font-medium">Order name</span
    ><Inplace :displayProps="{ 'aria-label': `Edit order name: ${name}` }" @open="draft = name"
      ><template #display>{{ name }}</template
      ><template #content="{ closeCallback }"
        ><form class="flex flex-col gap-3" @submit.prevent="save(closeCallback, $event)">
          <label for="inline-order-name">New order name</label
          ><InputText id="inline-order-name" v-model="draft" autofocus required fluid />
          <div class="flex gap-2">
            <Button type="submit" size="small" :disabled="!draft.trim()">Save</Button
            ><Button type="button" severity="secondary" outlined size="small" @click="closeCallback"
              >Cancel</Button
            >
          </div>
        </form></template
      ></Inplace
    >
  </div>
</template>
