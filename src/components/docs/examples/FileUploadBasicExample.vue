<script setup lang="ts">
import { shallowRef } from 'vue'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
const filename = shallowRef('No image selected.')
function select(event: FileUploadUploaderEvent) {
  const file = Array.isArray(event.files) ? event.files[0] : event.files
  filename.value = file
    ? `Selected ${file.name} locally. Nothing was uploaded.`
    : 'No image selected.'
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <FileUpload
      mode="basic"
      name="image"
      accept="image/*"
      :maxFileSize="1000000"
      customUpload
      auto
      chooseLabel="Choose an image"
      @uploader="select"
    />
    <p role="status" class="text-muted-color">{{ filename }}</p>
  </div>
</template>
