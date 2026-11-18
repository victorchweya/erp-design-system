<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'

const id = useId()
const result = shallowRef('')
const initialValues = { email: '' }
function resolver({ values }: FormResolverOptions) {
  const email = typeof values.email === 'string' ? values.email.trim() : ''
  const errors: Record<string, { message: string }[]> = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = [{ message: 'Enter a valid email address.' }]
  return { values: { email }, errors }
}
function submit(event: FormSubmitEvent) {
  result.value = event.valid
    ? 'If an account exists for this email, you will receive reset instructions. Preview only: no email was sent.'
    : ''
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    novalidate
    :validateOnValueUpdate="false"
    validateOnBlur
    class="mx-auto w-full max-w-md"
    @submit="submit"
    @input="result = ''"
  >
    <Card>
      <template #title><h4 class="text-xl font-medium">Forgot your password?</h4></template>
      <template #subtitle>Enter your email to request a password reset link.</template>
      <template #content
        ><div class="flex flex-col gap-4 text-sm">
          <div class="flex flex-col gap-2">
            <label :for="`${id}-email`" class="font-medium">Email</label>
            <InputText
              :id="`${id}-email`"
              name="email"
              type="email"
              autocomplete="email"
              required
              :aria-describedby="`${id}-email-error`"
              fluid
            />

            <Message
              v-if="$form.email?.invalid"
              :id="`${id}-email-error`"
              severity="error"
              variant="simple"
              size="small"
              >{{ $form.email.error?.message }}</Message
            >
          </div>
          <p role="status" class="text-muted" :class="{ 'sr-only': !result }">{{ result }}</p>
        </div></template
      >
      <template #footer
        ><div class="flex flex-col gap-4 text-sm">
          <Button type="submit" fluid>Send reset link</Button>
          <a
            href="#sign-in"
            class="text-center font-medium text-primary underline underline-offset-4"
            >Back to sign in</a
          >
        </div></template
      >
    </Card>
  </Form>
</template>
