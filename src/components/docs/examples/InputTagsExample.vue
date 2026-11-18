<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Kale', 'Carrot'])
</script>

<template>
  <div class="flex max-w-lg flex-col gap-1">
    <label for="produce-tags" class="font-medium">Produce tags</label
    ><InputTags
      inputId="produce-tags"
      v-model="tags"
      delimiter=","
      :max="5"
      fluid
      :inputProps="{ 'aria-describedby': 'produce-tags-help' }"
    />
    <p id="produce-tags-help" class="text-muted-color">
      Press Enter or type a comma to add a tag. Up to five tags; duplicates are not allowed.
    </p>
    <p class="text-muted-color">{{ tags.length }} of 5 tags.</p>
  </div>
</template>
