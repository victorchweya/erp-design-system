<script setup lang="ts">
import { shallowRef } from 'vue'
import Envelope from '@primeicons/vue/envelope'

const result = shallowRef('')
</script>

<template>
  <Card class="mx-auto w-full max-w-md">
    <template #title
      ><div class="flex flex-col gap-4">
        <Envelope aria-hidden="true" class="size-8 text-primary" />
        <h4 class="text-xl font-medium">Check your email</h4>
      </div></template
    >
    <template #subtitle>Verify your email address to finish setting up your account.</template>
    <template #content
      ><div class="flex flex-col gap-4 text-sm">
        <p class="text-muted">
          Open the verification link in your inbox. If you cannot find it, check your spam folder or
          request another email.
        </p>
        <p role="status" class="text-muted" :class="{ 'sr-only': !result }">{{ result }}</p>
      </div></template
    >
    <template #footer
      ><div class="flex flex-col gap-4 text-sm">
        <Button
          type="button"
          fluid
          @click="result = 'Preview only: no verification email was sent.'"
          >Resend verification email</Button
        >
        <a href="#sign-in" class="text-center font-medium text-primary underline underline-offset-4"
          >Back to sign in</a
        >
      </div></template
    >
  </Card>
</template>
