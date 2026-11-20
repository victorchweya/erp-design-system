<script setup lang="ts">
import { shallowRef } from 'vue'
const farmerName = shallowRef('')
const phone = shallowRef('')
const orderReference = shallowRef('')
</script>

<template>
  <div class="grid items-end gap-6 pt-4 sm:grid-cols-3">
    <FloatLabel>
      <InputText id="float-over-farmer" v-model="farmerName" autocomplete="name" fluid />
      <label for="float-over-farmer">Farmer name</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputText id="float-in-phone" v-model="phone" type="tel" autocomplete="tel" fluid />
      <label for="float-in-phone">Phone number</label>
    </FloatLabel>
    <FloatLabel variant="on">
      <InputText id="float-on-order" v-model="orderReference" fluid />
      <label for="float-on-order">Order reference</label>
    </FloatLabel>
  </div>
</template>
