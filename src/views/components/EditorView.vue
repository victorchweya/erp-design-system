<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import EditorExample from '@/components/docs/examples/EditorExample.vue'
import code0 from '@/components/docs/examples/EditorExample.vue?raw'
import EditorReadOnlyExample from '@/components/docs/examples/EditorReadOnlyExample.vue'
import code1 from '@/components/docs/examples/EditorReadOnlyExample.vue?raw'
const examples = [
  {
    id: 'editor-0',
    title: 'Formatted text',
    description: 'Bold, italic, and underline are available through an accessible custom toolbar.',
    component: EditorExample,
    code: code0,
  },
  {
    id: 'editor-1',
    title: 'Read-only content',
    description:
      'Use readonly to display content without editing. The content area is still named and marked read-only. Sanitize untrusted rich text before storing or rendering it.',
    component: EditorReadOnlyExample,
    code: code1,
  },
]
const api = [
  {
    name: 'modelValue',
    type: 'string',
    default: '—',
    description: 'Bound value. Use v-model.',
  },
  {
    name: 'readonly',
    type: 'boolean',
    default: 'false',
    description: 'Display the value without allowing edits.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Show the error state.',
  },
  {
    name: 'editorStyle',
    type: 'any',
    default: '—',
    description: 'Style of the editable content area.',
  },
]
const accessibility = [
  'Label the editable textbox and every toolbar button. Preserve tab access to the toolbar and content.',
  'Quill\u2019s default toolbar dropdowns have limited arrow-key support. This example uses labelled buttons only.',
]
</script>

<template>
  <ComponentDoc
    title="Editor"
    category="Form"
    description="Edit formatted text when plain text is not sufficient."
    usage="Bind an HTML string with v-model and provide a small, labelled toolbar. This installed Editor uses Quill. PrimeVue marks this component deprecated in v5; use Textarea when formatting is unnecessary."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/editor"
  />
</template>
