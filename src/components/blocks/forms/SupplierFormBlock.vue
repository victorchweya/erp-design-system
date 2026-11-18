<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'
const id = useId()
const result = shallowRef('')
const initialValues = { name: '', email: '', notes: '' }
function resolver({ values }: FormResolverOptions) {
  const name = typeof values.name === 'string' ? values.name.trim() : ''
  const email = typeof values.email === 'string' ? values.email.trim() : ''
  const errors: Record<string, { message: string }[]> = {}
  if (!name) errors.name = [{ message: 'Enter a supplier name.' }]
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = [{ message: 'Enter a valid email address.' }]
  return { values: { ...values, name, email }, errors }
}
function submit(event: FormSubmitEvent) {
  result.value = event.valid ? `Saved ${event.values.name} in this preview.` : ''
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
    @submit="submit"
  >
    <Card>
      <template #title><h3 class="text-xl font-medium">Supplier details</h3></template>
      <template #subtitle>Add the contact details your team needs to place orders.</template>
      <template #content>
        <div class="flex flex-col gap-6 text-sm">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-1">
              <label :for="`${id}-name`" class="font-medium">Supplier name</label
              ><InputText
                :id="`${id}-name`"
                name="name"
                required
                :aria-describedby="`${id}-name-error`"
                fluid
              /><Message
                v-if="$form.name?.invalid"
                :id="`${id}-name-error`"
                severity="error"
                variant="simple"
                size="small"
                >{{ $form.name.error?.message }}</Message
              >
            </div>
            <div class="flex flex-col gap-1">
              <label :for="`${id}-email`" class="font-medium">Contact email</label
              ><InputText
                :id="`${id}-email`"
                name="email"
                type="email"
                autocomplete="email"
                required
                :aria-describedby="`${id}-email-error`"
                fluid
              /><Message
                v-if="$form.email?.invalid"
                :id="`${id}-email-error`"
                severity="error"
                variant="simple"
                size="small"
                >{{ $form.email.error?.message }}</Message
              >
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label :for="`${id}-notes`" class="font-medium"
              >Notes <span class="font-normal text-muted">(optional)</span></label
            ><Textarea
              :id="`${id}-notes`"
              name="notes"
              :rows="3"
              :aria-describedby="`${id}-notes-help`"
              fluid
            />
            <p :id="`${id}-notes-help`" class="text-muted">
              Delivery preferences or other details for your team.
            </p>
          </div>
          <p role="status" class="text-muted" :class="{ 'sr-only': !result }">{{ result }}</p>
        </div>
      </template>
      <template #footer
        ><div class="flex flex-wrap justify-end gap-2">
          <Button type="reset" severity="secondary" outlined @click="result = ''">Reset form</Button
          ><Button type="submit">Save supplier</Button>
        </div></template
      >
    </Card>
  </Form>
</template>
