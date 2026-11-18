<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'

const id = useId()
const result = shallowRef('')
const initialValues = { name: '', email: '', password: '' }
function resolver({ values }: FormResolverOptions) {
  const email = typeof values.email === 'string' ? values.email.trim() : ''
  const errors: Record<string, { message: string }[]> = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = [{ message: 'Enter a valid email address.' }]
  const name = typeof values.name === 'string' ? values.name.trim() : ''
  if (!name) errors.name = [{ message: 'Enter your name.' }]
  if (typeof values.password !== 'string' || values.password.length < 12)
    errors.password = [{ message: 'Use at least 12 characters.' }]
  return { values: { ...values, name, email }, errors }
}
function submit(event: FormSubmitEvent) {
  result.value = event.valid ? 'Form validated in this preview. No account was created.' : ''
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
      <template #title><h3 class="text-2xl font-medium">Create your account</h3></template>
      <template #subtitle>Get started with Farm to Feed.</template>
      <template #content
        ><div class="flex flex-col gap-4 text-sm">
          <div class="flex flex-col gap-2">
            <label :for="`${id}-name`" class="font-medium">Full name</label>
            <InputText
              :id="`${id}-name`"
              name="name"
              type="text"
              autocomplete="name"
              required
              :aria-describedby="`${id}-name-error`"
              fluid
            />

            <Message
              v-if="$form.name?.invalid"
              :id="`${id}-name-error`"
              severity="error"
              variant="simple"
              size="small"
              >{{ $form.name.error?.message }}</Message
            >
          </div>
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
            <InputPassword
              :id="`${id}-password`"
              name="password"
              autocomplete="new-password"
              required
              :aria-describedby="`${id}-password-help ${id}-password-error`"
              fluid
            />
            <p :id="`${id}-password-help`" class="text-muted">Use at least 12 characters.</p>
            <Message
              v-if="$form.password?.invalid"
              :id="`${id}-password-error`"
              severity="error"
              variant="simple"
              size="small"
              >{{ $form.password.error?.message }}</Message
            >
          </div>
          <p role="status" class="text-muted" :class="{ 'sr-only': !result }">{{ result }}</p>
        </div></template
      >
      <template #footer
        ><div class="flex flex-col gap-4 text-sm">
          <Button type="submit" fluid>Create account</Button>
          <p class="text-center text-muted">
            Already have an account?
            <a href="#sign-in" class="font-medium text-primary underline underline-offset-4"
              >Sign in</a
            >
          </p>
        </div></template
      >
    </Card>
  </Form>
</template>
