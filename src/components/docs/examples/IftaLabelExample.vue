<script setup lang="ts">
import { ref, shallowRef } from 'vue'
const invoiceNumber = shallowRef('')
const grade = shallowRef<string | null>('grade-1')
const deliveryDate = ref<Date | null>(null)
const grades = [
  { label: 'Grade 1', value: 'grade-1' },
  { label: 'Grade 2', value: 'grade-2' },
  { label: 'Processing grade', value: 'processing' },
]
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-3">
    <IftaLabel>
      <InputText id="ifta-invoice" v-model="invoiceNumber" fluid />
      <label for="ifta-invoice">Supplier invoice no.</label>
    </IftaLabel>
    <IftaLabel>
      <Select
        v-model="grade"
        inputId="ifta-grade"
        ariaLabelledby="ifta-grade-label"
        :options="grades"
        optionLabel="label"
        optionValue="value"
        fluid
      />
      <label id="ifta-grade-label" for="ifta-grade">Produce grade</label>
    </IftaLabel>
    <IftaLabel>
      <DatePicker
        v-model="deliveryDate"
        inputId="ifta-delivery-date"
        dateFormat="dd/mm/yy"
        showIcon
        iconDisplay="input"
        fluid
      />
      <label for="ifta-delivery-date">Delivery date</label>
    </IftaLabel>
  </div>
</template>
