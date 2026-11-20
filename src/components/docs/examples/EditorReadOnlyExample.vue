<script setup lang="ts">
import { shallowRef } from 'vue'
import type { EditorLoadEvent } from 'primevue/editor'
const content = shallowRef('<p>Fresh <strong>local produce</strong> from partner farms.</p>')
function labelEditor(event: EditorLoadEvent) {
  event.instance.root.setAttribute('role', 'textbox')
  event.instance.root.setAttribute('aria-multiline', 'true')
  event.instance.root.setAttribute('aria-readonly', 'true')
  event.instance.root.setAttribute('aria-labelledby', 'readonly-description-label')
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <span id="readonly-description-label" class="font-medium">Produce description</span
    ><Editor v-model="content" readonly editorStyle="height: 8rem" @load="labelEditor"
      ><template #toolbar><span class="text-sm text-muted-color">Read-only</span></template></Editor
    >
  </div>
</template>
