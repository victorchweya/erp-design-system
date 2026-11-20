<script setup lang="ts">
import { shallowRef } from 'vue'
import Phone from '@primeicons/vue/phone'
const supplierName = shallowRef('')
const mpesaNumber = shallowRef('')
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <Label for="label-supplier-name" class="font-medium">Supplier name</Label>
      <InputText
        id="label-supplier-name"
        v-model="supplierName"
        autocomplete="organization"
        fluid
      />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="label-mpesa-number" class="gap-2 font-medium">
        <Phone aria-hidden="true" focusable="false" />
        <span>M-Pesa phone number</span>
        <span aria-hidden="true" class="text-danger">*</span>
      </Label>
      <InputText
        id="label-mpesa-number"
        v-model="mpesaNumber"
        type="tel"
        autocomplete="tel"
        aria-describedby="label-mpesa-hint"
        required
        fluid
      />
      <p id="label-mpesa-hint" class="text-muted-color">Required. Format 07XX XXX XXX.</p>
    </div>
  </div>
</template>
