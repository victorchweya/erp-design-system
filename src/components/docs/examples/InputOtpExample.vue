<script setup lang="ts">
import { shallowRef } from 'vue'
const code = shallowRef('')
const maskedCode = shallowRef('')
</script>

<template>
  <div class="flex flex-col gap-6">
    <fieldset class="flex min-w-0 flex-col gap-3">
      <legend class="mb-2 font-medium">Verification code</legend>
      <InputOtp v-model="code" :length="6" integerOnly />
      <p class="text-muted-color">Enter the six-digit code. This preview does not verify it.</p>
    </fieldset>
    <fieldset class="flex min-w-0 flex-col gap-3">
      <legend class="mb-2 font-medium">Masked code</legend>
      <InputOtp v-model="maskedCode" :length="4" integerOnly mask />
    </fieldset>
  </div>
</template>
