<script setup lang="ts">
import { shallowRef } from 'vue'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
const result = shallowRef('Choose up to three images. Nothing is uploaded.')
function preview(event: FileUploadUploaderEvent) {
  const files = Array.isArray(event.files) ? event.files : [event.files]
  result.value = `${files.length} image(s) selected locally: ${files.map((file) => file.name).join(', ')}. Nothing was uploaded.`
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <FileUpload
      name="images[]"
      accept="image/*"
      multiple
      :fileLimit="3"
      :maxFileSize="1000000"
      customUpload
      uploadLabel="Preview selection"
      :chooseButtonProps="{ severity: 'primary', outlined: true }"
      :uploadButtonProps="{ severity: 'primary' }"
      :cancelButtonProps="{ severity: 'secondary', outlined: true }"
      @uploader="preview"
      @clear="result = 'Selection cleared. Nothing was uploaded.'"
      @remove="result = 'Selection changed. Preview the remaining files.'"
      ><template #empty
        ><p class="text-muted-color">
          Drop up to three images here, or use Choose. Maximum 1 MB per image.
        </p></template
      ></FileUpload
    >
    <p role="status" class="text-muted-color">{{ result }}</p>
  </div>
</template>
