<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'

const id = useId()
const result = shallowRef('')
const initialValues = { password: '', confirmation: '' }
function resolver({ values }: FormResolverOptions) {
  const errors: Record<string, { message: string }[]> = {}
  if (typeof values.password !== 'string' || values.password.length < 12)
    errors.password = [{ message: 'Use at least 12 characters.' }]
  if (!values.confirmation || values.confirmation !== values.password)
    errors.confirmation = [{ message: 'Passwords must match.' }]
  return { values, errors }
}
function submit(event: FormSubmitEvent) {
  result.value = event.valid ? 'Form validated in this preview. Your password has not changed.' : ''
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
      <template #title><h3 class="text-2xl font-medium">Set a new password</h3></template>
      <template #subtitle>Choose a password you have not used for this account.</template>
      <template #content
        ><div class="flex flex-col gap-4 text-sm">
          <div class="flex flex-col gap-2">
            <label :for="`${id}-password`" class="font-medium">New password</label>
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
          <div class="flex flex-col gap-2">
            <label :for="`${id}-confirmation`" class="font-medium">Confirm new password</label>
            <InputPassword
              :id="`${id}-confirmation`"
              name="confirmation"
              autocomplete="new-password"
              required
              :aria-describedby="`${id}-confirmation-error`"
              fluid
            />

            <Message
              v-if="$form.confirmation?.invalid"
              :id="`${id}-confirmation-error`"
              severity="error"
              variant="simple"
              size="small"
              >{{ $form.confirmation.error?.message }}</Message
            >
          </div>
          <p role="status" class="text-muted" :class="{ 'sr-only': !result }">{{ result }}</p>
        </div></template
      >
      <template #footer
        ><div class="flex flex-col gap-4 text-sm">
          <Button type="submit" fluid>Reset password</Button>
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
