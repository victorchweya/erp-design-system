<script setup lang="ts">
import { computed, useId } from 'vue'
import { importFields, type ColumnMapping, type ImportFieldKey } from './csv'

defineProps<{ headers: string[] }>()
const mapping = defineModel<ColumnMapping>({ required: true })
const id = useId()

const duplicateColumns = computed(() => {
  const counts = new Map<string, number>()
  for (const column of Object.values(mapping.value)) {
    if (column) counts.set(column, (counts.get(column) ?? 0) + 1)
  }
  return new Set([...counts].filter(([, count]) => count > 1).map(([column]) => column))
})

const errors = computed(
  () =>
    Object.fromEntries(
      importFields.map(({ key, required }) => {
        const column = mapping.value[key]
        if (!column) return [key, required ? 'Choose a column for this required field.' : '']
        return [
          key,
          duplicateColumns.value.has(column) ? `“${column}” is mapped to more than one field.` : '',
        ]
      }),
    ) as Record<ImportFieldKey, string>,
)

function update(key: ImportFieldKey, column: string | null) {
  mapping.value = { ...mapping.value, [key]: column ?? null }
}
</script>

<template>
  <fieldset class="flex flex-col gap-4">
    <legend class="mb-2 font-medium">Match your columns to order-line fields</legend>
    <p class="text-muted">
      Columns were matched by name where possible. Required fields are marked
      <span aria-hidden="true">*</span><span class="sr-only">as required</span>.
    </p>
    <div class="grid gap-4 md:grid-cols-2">
      <div v-for="field in importFields" :key="field.key" class="flex flex-col gap-1">
        <label :for="`${id}-${field.key}`" class="font-medium">
          {{ field.label }}
          <span v-if="field.required" class="text-danger" aria-hidden="true">*</span>
          <span v-else class="font-normal text-muted">(optional)</span>
        </label>
        <Select
          :inputId="`${id}-${field.key}`"
          :modelValue="mapping[field.key]"
          :options="headers"
          placeholder="Not mapped"
          showClear
          :invalid="!!errors[field.key]"
          :aria-required="field.required"
          :aria-describedby="`${id}-${field.key}-error`"
          fluid
          @update:modelValue="update(field.key, $event)"
        />
        <Message
          v-if="errors[field.key]"
          :id="`${id}-${field.key}-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ errors[field.key] }}</Message
        >
      </div>
    </div>
  </fieldset>
</template>
