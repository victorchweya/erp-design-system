<script setup lang="ts">
import { shallowRef } from 'vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'
const initialValues = { produce: '' }
const result = shallowRef('')
function resolver({ values }: FormResolverOptions) {
  const produce = typeof values.produce === 'string' ? values.produce.trim() : ''
  return {
    values: { ...values, produce },
    errors: produce ? {} : { produce: [{ message: 'Enter a produce name.' }] },
  }
}
function submit(event: FormSubmitEvent) {
  result.value = event.valid ? `Saved ${event.values.produce} in this preview.` : ''
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolver"
    :validateOnValueUpdate="false"
    validateOnBlur
    class="flex max-w-sm flex-col gap-4"
    @submit="submit"
  >
    <div class="flex flex-col gap-2">
      <label for="form-produce" class="font-medium">Produce name</label
      ><InputText
        id="form-produce"
        name="produce"
        aria-describedby="form-produce-help form-produce-error"
        fluid
      />
      <p id="form-produce-help" class="text-muted-color">
        Required. Enter the name customers will recognise.
      </p>
      <Message
        v-if="$form.produce?.invalid"
        id="form-produce-error"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.produce.error?.message }}</Message
      >
    </div>
    <div class="flex flex-wrap gap-2">
      <Button type="submit" size="small">Save produce</Button
      ><Button type="reset" size="small" severity="secondary" outlined @click="result = ''"
        >Reset</Button
      >
    </div>
    <p role="status" class="text-muted-color">{{ result }}</p>
  </Form>
</template>
