<script setup lang="ts">
import { shallowRef } from 'vue'
const plain = shallowRef('')
const floating = shallowRef('')
const infield = shallowRef('')
</script>

<template>
  <div class="grid items-end gap-6 sm:grid-cols-3">
    <div class="flex flex-col gap-1">
      <label for="plain-label" class="font-medium">Visible label</label
      ><InputText id="plain-label" v-model="plain" fluid />
    </div>
    <FloatLabel variant="on"
      ><InputText id="floating-label" v-model="floating" fluid /><label for="floating-label"
        >Floating label</label
      ></FloatLabel
    ><IftaLabel
      ><InputText id="infield-label" v-model="infield" fluid /><label for="infield-label"
        >Infield label</label
      ></IftaLabel
    >
  </div>
</template>
