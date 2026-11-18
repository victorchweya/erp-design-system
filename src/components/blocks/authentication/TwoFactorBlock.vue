<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'

const id = useId()
const result = shallowRef('')
const initialValues = { code: '' }
function resolver({ values }: FormResolverOptions) {
  const errors: Record<string, { message: string }[]> = {}
  if (typeof values.code !== 'string' || !/^\d{6}$/.test(values.code))
    errors.code = [{ message: 'Enter all six digits.' }]
  return { values, errors }
}
function submit(event: FormSubmitEvent) {
  result.value = event.valid ? 'Code format validated in this preview. No code was verified.' : ''
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
      <template #title><h3 class="text-2xl font-medium">Two-factor authentication</h3></template>
      <template #subtitle>Enter the six-digit code from your authenticator app.</template>
      <template #content
        ><div class="flex flex-col gap-4 text-sm">
          <fieldset class="min-w-0">
            <legend class="mb-2 font-medium">Authentication code</legend>
            <InputOtp
              name="code"
              :length="6"
              integerOnly
              class="grid grid-cols-6"
              @change="result = ''"
            >
              <template #default="{ attrs, events, index }">
                <InputText
                  v-bind="attrs"
                  v-on="events"
                  :id="`${id}-digit-${index}`"
                  :aria-label="`Digit ${index} of 6`"
                  :aria-describedby="`${id}-code-help ${id}-code-error`"
                  :invalid="$form.code?.invalid"
                  type="text"
                  inputmode="numeric"
                  :autocomplete="index === 1 ? 'one-time-code' : 'off'"
                  maxlength="1"
                  required
                  class="min-w-0 w-full text-center"
                />
              </template>
            </InputOtp>
            <p :id="`${id}-code-help`" class="mt-2 text-muted">
              You can paste the whole code into the first field.
            </p>
            <Message
              v-if="$form.code?.invalid"
              :id="`${id}-code-error`"
              severity="error"
              variant="simple"
              size="small"
              >{{ $form.code.error?.message }}</Message
            >
          </fieldset>
          <p role="status" class="text-muted" :class="{ 'sr-only': !result }">{{ result }}</p>
        </div></template
      >
      <template #footer
        ><div class="flex flex-col gap-4 text-sm">
          <Button type="submit" fluid>Verify code</Button>
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
