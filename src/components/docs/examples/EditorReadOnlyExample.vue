<script setup lang="ts">
import { shallowRef } from 'vue'
const content = shallowRef('<p>Fresh <strong>local produce</strong> from partner farms.</p>')
</script>

<template>
  <Editor
    v-model="content"
    readonly
    editorStyle="height: 8rem"
    aria-label="Read-only produce description"
    ><template #toolbar
      ><span class="text-sm text-muted-color">Read-only description</span></template
    ></Editor
  >
</template>
