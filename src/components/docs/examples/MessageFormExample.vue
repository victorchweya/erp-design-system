<script setup lang="ts">
import { Form, type FormResolverOptions } from '@primevue/forms'

const initialValues = { reference: '' }

function resolver({ values }: FormResolverOptions) {
  const reference = typeof values.reference === 'string' ? values.reference.trim() : ''
  return {
    values: { ...values, reference },
    errors: reference ? {} : { reference: [{ message: 'Enter an order reference.' }] },
  }
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    :validateOnValueUpdate="false"
    validateOnBlur
    class="flex max-w-sm flex-col gap-2"
  >
    <label for="message-order-reference" class="font-medium">Order reference</label>
    <InputText
      id="message-order-reference"
      name="reference"
      :invalid="$form.reference?.invalid"
      aria-describedby="message-order-reference-error"
      fluid
    />
    <Message
      v-if="$form.reference?.invalid"
      id="message-order-reference-error"
      severity="error"
      variant="simple"
      size="small"
    >
      {{ $form.reference.error?.message }}
    </Message>
  </Form>
</template>
