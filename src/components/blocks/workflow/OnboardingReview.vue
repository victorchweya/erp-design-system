<script setup lang="ts">
import { computed } from 'vue'
import ArrowLeft from '@primeicons/vue/arrow-left'
import Pencil from '@primeicons/vue/pencil'
import { summarise, type StepValue, type SupplierDraft } from './supplier-onboarding'

const props = defineProps<{ draft: SupplierDraft; submitting: boolean }>()
const emit = defineEmits<{ edit: [step: StepValue]; back: []; submit: [] }>()
const sections = computed(() => summarise(props.draft))
</script>

<template>
  <div class="flex flex-col gap-6 text-sm">
    <section
      v-for="section in sections"
      :key="section.step"
      class="flex flex-col gap-3 rounded-lg border border-surface p-4"
      :aria-label="section.title"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h4 class="text-base font-medium">{{ section.title }}</h4>
        <Button
          type="button"
          severity="primary"
          text
          size="small"
          :aria-label="`Edit ${section.title.toLowerCase()}`"
          @click="emit('edit', section.step)"
          ><Pencil aria-hidden="true" />Edit</Button
        >
      </div>
      <dl class="grid gap-x-6 gap-y-2 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
        <template v-for="[label, value] in section.rows" :key="label">
          <dt class="text-muted">{{ label }}</dt>
          <dd class="break-words font-medium">{{ value }}</dd>
        </template>
      </dl>
    </section>
    <p class="text-muted">
      FTF procurement verifies new suppliers within two working days and confirms by SMS.
    </p>
    <div class="flex flex-wrap justify-between gap-2">
      <Button type="button" severity="secondary" outlined @click="emit('back')"
        ><ArrowLeft aria-hidden="true" />Back</Button
      >
      <Button type="button" :loading="submitting" @click="emit('submit')"
        >Submit for verification</Button
      >
    </div>
  </div>
</template>
