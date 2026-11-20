<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import CodeExample from '@/components/CodeExample.vue'

const props = defineProps<{ title: string; files: { name: string; code: string }[] }>()
const id = useId()
const selected = shallowRef(props.files[0]!.name)
const source = computed(() => props.files.find((file) => file.name === selected.value)!)
</script>

<template>
  <div class="flex min-w-0 flex-col gap-3">
    <div class="flex flex-col gap-1 self-start">
      <label :for="`${id}-source`" class="font-medium">Source file</label>
      <Select
        v-model="selected"
        :inputId="`${id}-source`"
        :options="files"
        optionLabel="name"
        optionValue="name"
        size="small"
      />
    </div>
    <CodeExample
      :title="source.name"
      :code="source.code"
      :language="source.name.endsWith('.ts') ? 'TypeScript' : 'Vue'"
      tabbed
    >
      <slot />
    </CodeExample>
  </div>
</template>
