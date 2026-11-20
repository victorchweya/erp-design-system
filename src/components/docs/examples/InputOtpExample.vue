<script setup lang="ts">
import { shallowRef } from 'vue'
const code = shallowRef('')
const pin = shallowRef('')
</script>

<template>
  <div class="flex flex-col gap-6">
    <fieldset class="flex min-w-0 flex-col gap-3">
      <legend class="mb-2 font-medium">Verification code</legend>
      <InputOtp
        v-model="code"
        :length="6"
        integerOnly
        :pt="{
          pcInputText: {
            root: {
              'aria-label': 'Verification code digit',
              'aria-describedby': 'verification-code-help',
            },
          },
        }"
      />
      <p id="verification-code-help" class="text-muted-color">
        Enter the six-digit code sent to your phone. This preview does not verify it.
      </p>
    </fieldset>
    <fieldset class="flex min-w-0 flex-col gap-3">
      <legend class="mb-2 font-medium">Approval PIN</legend>
      <InputOtp
        v-model="pin"
        :length="4"
        integerOnly
        mask
        :pt="{ pcInputText: { root: { 'aria-label': 'Approval PIN digit' } } }"
      />
    </fieldset>
  </div>
</template>
