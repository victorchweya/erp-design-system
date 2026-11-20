<script setup lang="ts">
import { computed, shallowRef, useId, useTemplateRef } from 'vue'

const id = useId()
const quantity = shallowRef('')
const error = shallowRef('')
const saved = shallowRef('')
const field = useTemplateRef<{ $el: HTMLInputElement }>('field')
const describedBy = computed(() => (error.value ? `${id}-hint ${id}-error` : `${id}-hint`))

function submit() {
  const value = Number(quantity.value)
  saved.value = ''
  if (!quantity.value.trim() || !Number.isFinite(value) || value <= 0) {
    error.value = 'Enter a quantity greater than 0.'
    field.value?.$el.focus()
    return
  }
  error.value = ''
  saved.value = `Quantity of ${value} kg saved in this preview.`
}
</script>

<template>
  <form novalidate class="flex max-w-sm flex-col gap-4" @submit.prevent="submit">
    <div class="flex flex-col gap-1">
      <label :for="`${id}-quantity`" class="font-medium">Quantity (kg)</label>
      <InputText
        :id="`${id}-quantity`"
        ref="field"
        v-model="quantity"
        inputmode="decimal"
        :invalid="!!error"
        :aria-describedby="describedBy"
        fluid
      />
      <p :id="`${id}-hint`" class="text-muted-color">Use the weight on the delivery note.</p>
      <Message v-if="error" :id="`${id}-error`" severity="error" size="small" variant="simple">{{
        error
      }}</Message>
    </div>
    <Button type="submit" class="self-start">Save quantity</Button>
    <p role="status" class="text-muted-color" :class="{ 'sr-only': !saved }">{{ saved }}</p>
  </form>
</template>
