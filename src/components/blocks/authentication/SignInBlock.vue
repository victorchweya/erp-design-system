<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'

const id = useId()
const result = shallowRef('')
const mask = shallowRef(true)
const initialValues = { email: '', password: '' }
function resolver({ values }: FormResolverOptions) {
  const email = typeof values.email === 'string' ? values.email.trim() : ''
  const errors: Record<string, { message: string }[]> = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = [{ message: 'Enter a valid email address.' }]
  if (typeof values.password !== 'string' || !values.password.length)
    errors.password = [{ message: 'Enter your password.' }]
  return { values: { ...values, email }, errors }
}
function submit(event: FormSubmitEvent) {
  result.value = event.valid ? 'Form validated in this preview. No sign-in request was sent.' : ''
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
      <template #title><h3 class="text-2xl font-medium">Welcome back</h3></template>
      <template #subtitle>Sign in to your Farm to Feed account.</template>
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
          <div class="flex flex-col gap-2">
            <label :for="`${id}-password`" class="font-medium">Password</label>
            <InputGroup>
              <InputPassword
                :id="`${id}-password`"
                name="password"
                :mask="mask"
                autocomplete="current-password"
                required
                :aria-describedby="`${id}-password-error`"
                fluid
              />
              <Button
                type="button"
                severity="secondary"
                outlined
                :aria-label="mask ? 'Show password' : 'Hide password'"
                :aria-pressed="!mask"
                :aria-controls="`${id}-password`"
                @click="mask = !mask"
                >{{ mask ? 'Show' : 'Hide' }}</Button
              >
            </InputGroup>

            <Message
              v-if="$form.password?.invalid"
              :id="`${id}-password-error`"
              severity="error"
              variant="simple"
              size="small"
              >{{ $form.password.error?.message }}</Message
            >
          </div>
          <a href="#forgot-password" class="font-medium text-primary underline underline-offset-4"
            >Forgot password?</a
          >
          <p role="status" class="text-muted" :class="{ 'sr-only': !result }">{{ result }}</p>
        </div></template
      >
      <template #footer
        ><div class="flex flex-col gap-4 text-sm">
          <Button type="submit" fluid>Sign in</Button>
          <p class="text-center text-muted">
            New to Farm to Feed?
            <a href="#sign-up" class="font-medium text-primary underline underline-offset-4"
              >Create an account</a
            >
          </p>
        </div></template
      >
    </Card>
  </Form>
</template>
