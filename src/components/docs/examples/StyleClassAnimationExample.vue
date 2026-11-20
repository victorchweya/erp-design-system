<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import vStyleclass from 'primevue/styleclass'

const id = useId()
const expanded = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <!--
      StyleClass waits for animationend before it adds leaveToClass. Do not switch the
      animation off with motion-reduce:animate-none; the global reduced-motion rule
      already shortens it so the end event still fires.
    -->
    <Button
      v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-fadein',
        leaveActiveClass: 'animate-fadeout',
        leaveToClass: 'hidden',
      }"
      type="button"
      severity="secondary"
      outlined
      :aria-expanded="expanded"
      :aria-controls="id"
      class="self-start"
      @click="expanded = !expanded"
      >Delivery checklist</Button
    >
    <ul :id="id" class="hidden list-disc rounded-border border border-surface p-4 pl-8">
      <li>Check the seal number against the delivery note.</li>
      <li>Weigh every crate before unloading.</li>
      <li>Record rejected items with a reason.</li>
    </ul>
  </div>
</template>
