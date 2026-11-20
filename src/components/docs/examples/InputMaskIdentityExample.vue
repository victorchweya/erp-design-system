<script setup lang="ts">
import { shallowRef } from 'vue'
const kraPin = shallowRef('')
const nationalId = shallowRef('')
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-1">
      <label for="supplier-kra-pin" class="font-medium">KRA PIN</label
      ><InputMask
        id="supplier-kra-pin"
        v-model="kraPin"
        mask="a999999999a"
        placeholder="A123456789Z"
        aria-describedby="supplier-kra-pin-help"
        fluid
      />
      <p id="supplier-kra-pin-help" class="text-muted-color">
        A letter, nine digits, then a letter, as printed on the PIN certificate.
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="supplier-national-id" class="font-medium">National ID number</label
      ><InputMask
        id="supplier-national-id"
        v-model="nationalId"
        mask="9999999?9"
        placeholder="12345678"
        inputmode="numeric"
        aria-describedby="supplier-national-id-help"
        fluid
      />
      <p id="supplier-national-id-help" class="text-muted-color">Seven or eight digits.</p>
    </div>
  </div>
</template>
