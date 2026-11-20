<script setup lang="ts">
import { computed, ref } from 'vue'
const days = [
  { label: 'Monday', value: 'mon' },
  { label: 'Tuesday', value: 'tue' },
  { label: 'Wednesday', value: 'wed' },
  { label: 'Thursday', value: 'thu' },
  { label: 'Friday', value: 'fri' },
  { label: 'Saturday', value: 'sat' },
]
const deliveryDays = ref<string[]>(['mon', 'thu'])
const noDays = computed(() => deliveryDays.value.length === 0)
const describedBy = computed(() =>
  noDays.value ? 'delivery-days-hint delivery-days-error' : 'delivery-days-hint',
)
</script>

<template>
  <fieldset class="flex flex-col gap-3" :aria-describedby="describedBy">
    <legend class="mb-1 font-medium">Delivery days</legend>
    <p id="delivery-days-hint" class="text-muted-color">
      Choose the days this customer accepts deliveries.
    </p>
    <CheckboxGroup
      v-model="deliveryDays"
      name="delivery-days"
      :invalid="noDays"
      class="flex flex-wrap gap-x-6 gap-y-3"
    >
      <div v-for="day in days" :key="day.value" class="flex items-center gap-2">
        <Checkbox :inputId="`delivery-day-${day.value}`" :value="day.value" />
        <label :for="`delivery-day-${day.value}`">{{ day.label }}</label>
      </div>
    </CheckboxGroup>
    <p v-if="noDays" id="delivery-days-error" class="text-danger">
      Choose at least one delivery day.
    </p>
    <p v-else class="text-muted-color">{{ deliveryDays.length }} days a week.</p>
  </fieldset>
</template>
