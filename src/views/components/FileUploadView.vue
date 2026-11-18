<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import FileUploadExample from '@/components/docs/examples/FileUploadExample.vue'
import code0 from '@/components/docs/examples/FileUploadExample.vue?raw'
import FileUploadBasicExample from '@/components/docs/examples/FileUploadBasicExample.vue'
import code1 from '@/components/docs/examples/FileUploadBasicExample.vue?raw'
const examples = [
  {
    id: 'file-upload-0',
    title: 'Multiple files',
    description:
      'Selection is limited to three images of up to 1 MB each. Preview selection reports filenames without sending them anywhere.',
    component: FileUploadExample,
    code: code0,
  },
  {
    id: 'file-upload-1',
    title: 'Compact selection',
    description: 'A single browse button works when drag and drop is unnecessary.',
    component: FileUploadBasicExample,
    code: code1,
  },
]
const api = [
  {
    name: 'mode',
    type: 'any',
    default: 'advanced',
    description: 'Advanced drag-and-drop or basic browse button.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'Allow more than one selection.',
  },
  {
    name: 'accept',
    type: 'string',
    default: '—',
    description: 'Allowed file-type hint, such as image/*.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevent interaction.',
  },
  {
    name: 'auto',
    type: 'boolean',
    default: 'false',
    description: 'Run the upload handler after selection.',
  },
  {
    name: 'maxFileSize',
    type: 'number',
    default: '—',
    description: 'Maximum file size in bytes.',
  },
  {
    name: 'customUpload',
    type: 'boolean',
    default: '—',
    description: 'Handle files through the uploader event.',
  },
]
const accessibility = [
  'Keep Choose, remove, and cancel actions keyboard accessible and describe file limits before selection.',
  'Announce selection and errors. Application upload handlers must validate files on the server as well as in the browser.',
]
</script>

<template>
  <ComponentDoc
    title="FileUpload"
    category="File"
    description="Select files with browsing, drag and drop, and useful limits."
    usage="Use accept, maxFileSize, and fileLimit to guide selection. Use customUpload to handle selected files in your application. Both examples below process selection locally."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/fileupload"
  />
</template>
