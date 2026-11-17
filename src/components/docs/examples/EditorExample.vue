<script setup lang="ts">
import { shallowRef } from 'vue'
import type { EditorLoadEvent } from 'primevue/editor'
const content = shallowRef('<p>Shaping the Future of Food</p>')
function labelEditor(event: EditorLoadEvent) {
  event.instance.root.setAttribute('role', 'textbox')
  event.instance.root.setAttribute('aria-multiline', 'true')
  event.instance.root.setAttribute('aria-labelledby', 'produce-description-label')
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <span id="produce-description-label" class="font-medium">Produce description</span
    ><Editor
      v-model="content"
      editorStyle="height: 12rem"
      :formats="['bold', 'italic', 'underline']"
      @load="labelEditor"
      ><template #toolbar
        ><span class="ql-formats"
          ><button type="button" class="ql-bold" aria-label="Bold"></button
          ><button type="button" class="ql-italic" aria-label="Italic"></button
          ><button
            type="button"
            class="ql-underline"
            aria-label="Underline"
          ></button></span></template
    ></Editor>
    <p class="text-muted-color">Formatted content stays in this preview.</p>
  </div>
</template>
