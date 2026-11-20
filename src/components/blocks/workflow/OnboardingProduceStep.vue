<script setup lang="ts">
import { useId } from 'vue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import ArrowLeft from '@primeicons/vue/arrow-left'
import {
  focusFirstInvalid,
  produceOptions,
  resolveProduce,
  supplyPatterns,
  type ProduceCapacity,
} from './supplier-onboarding'

defineProps<{ initialValues: ProduceCapacity; nextLabel: string }>()
const emit = defineEmits<{ next: [values: ProduceCapacity]; back: [] }>()
const id = useId()

function submit(event: FormSubmitEvent) {
  if (event.valid) emit('next', event.values as ProduceCapacity)
  else focusFirstInvalid(event.originalEvent)
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolveProduce"
    novalidate
    :validateOnValueUpdate="false"
    validateOnBlur
    class="flex flex-col gap-6 text-sm"
    @submit="submit"
  >
    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-1 md:col-span-2">
        <label :for="`${id}-produce`" class="font-medium">Produce supplied</label>
        <MultiSelect
          :inputId="`${id}-produce`"
          name="produce"
          :options="produceOptions"
          display="chip"
          placeholder="Choose produce"
          :aria-describedby="`${id}-produce-error`"
          fluid
        />
        <Message
          v-if="$form.produce?.invalid"
          :id="`${id}-produce-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.produce.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-capacity`" class="font-medium">Weekly capacity</label>
        <InputNumber
          :inputId="`${id}-capacity`"
          name="weeklyCapacityKg"
          suffix=" kg"
          :min="0"
          :max="200000"
          :maxFractionDigits="0"
          :aria-describedby="`${id}-capacity-help ${id}-capacity-error`"
          fluid
        />
        <p :id="`${id}-capacity-help`" class="text-muted">
          Total across all produce. Minimum 100 kg.
        </p>
        <Message
          v-if="$form.weeklyCapacityKg?.invalid"
          :id="`${id}-capacity-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.weeklyCapacityKg.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-pattern`" class="font-medium">Supply pattern</label>
        <Select
          :inputId="`${id}-pattern`"
          name="supplyPattern"
          :options="supplyPatterns"
          placeholder="Choose a pattern"
          :aria-describedby="`${id}-pattern-error`"
          fluid
        />
        <Message
          v-if="$form.supplyPattern?.invalid"
          :id="`${id}-pattern-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.supplyPattern.error?.message }}</Message
        >
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-2">
      <Button type="button" severity="secondary" outlined @click="emit('back')"
        ><ArrowLeft aria-hidden="true" />Back</Button
      >
      <Button type="submit">{{ nextLabel }}</Button>
    </div>
  </Form>
</template>
