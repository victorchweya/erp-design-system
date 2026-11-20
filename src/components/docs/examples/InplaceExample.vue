<script setup lang="ts">
import { nextTick, shallowRef, useTemplateRef } from 'vue'
const name = shallowRef('Farm order')
const draft = shallowRef(name.value)
const nameInput = useTemplateRef<{ $el: HTMLInputElement }>('nameInput')
async function open() {
  draft.value = name.value
  await nextTick()
  nameInput.value?.$el.focus()
}
function save(close: (event: Event) => void, event: Event) {
  if (!draft.value.trim()) return
  name.value = draft.value.trim()
  close(event)
}
</script>

<template>
  <div class="flex max-w-lg flex-col gap-3">
    <span class="font-medium">Order name</span
    ><Inplace :displayProps="{ 'aria-label': `Edit order name: ${name}` }" @open="open"
      ><template #display>{{ name }}</template
      ><template #content="{ closeCallback }"
        ><form
          class="flex flex-col gap-3"
          @submit.prevent="save(closeCallback, $event)"
          @keydown.esc="closeCallback"
        >
          <label for="inline-order-name">New order name</label
          ><InputText id="inline-order-name" ref="nameInput" v-model="draft" required fluid />
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
