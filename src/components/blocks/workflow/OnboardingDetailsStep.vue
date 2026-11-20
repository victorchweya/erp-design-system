<script setup lang="ts">
import { useId } from 'vue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import {
  counties,
  focusFirstInvalid,
  resolveDetails,
  type FarmDetails,
} from './supplier-onboarding'

defineProps<{ initialValues: FarmDetails; nextLabel: string }>()
const emit = defineEmits<{ next: [values: FarmDetails] }>()
const id = useId()

function submit(event: FormSubmitEvent) {
  if (event.valid) emit('next', event.values as FarmDetails)
  else focusFirstInvalid(event.originalEvent)
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolveDetails"
    novalidate
    :validateOnValueUpdate="false"
    validateOnBlur
    class="flex flex-col gap-6 text-sm"
    @submit="submit"
  >
    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-1">
        <label :for="`${id}-farm`" class="font-medium">Farm or business name</label>
        <InputText
          :id="`${id}-farm`"
          name="farmName"
          autocomplete="organization"
          required
          :aria-describedby="`${id}-farm-error`"
          fluid
        />
        <Message
          v-if="$form.farmName?.invalid"
          :id="`${id}-farm-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.farmName.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-contact`" class="font-medium">Contact person</label>
        <InputText
          :id="`${id}-contact`"
          name="contactName"
          autocomplete="name"
          required
          :aria-describedby="`${id}-contact-error`"
          fluid
        />
        <Message
          v-if="$form.contactName?.invalid"
          :id="`${id}-contact-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.contactName.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-phone`" class="font-medium">Mobile number</label>
        <InputText
          :id="`${id}-phone`"
          name="phone"
          type="tel"
          inputmode="tel"
          autocomplete="tel"
          required
          :aria-describedby="`${id}-phone-help ${id}-phone-error`"
          fluid
        />
        <p :id="`${id}-phone-help`" class="text-muted">For order and collection updates.</p>
        <Message
          v-if="$form.phone?.invalid"
          :id="`${id}-phone-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.phone.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-county`" class="font-medium">County</label>
        <Select
          :inputId="`${id}-county`"
          name="county"
          :options="counties"
          placeholder="Choose a county"
          :aria-describedby="`${id}-county-error`"
          fluid
        />
        <Message
          v-if="$form.county?.invalid"
          :id="`${id}-county-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.county.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1 md:col-span-2">
        <label :for="`${id}-email`" class="font-medium"
          >Email <span class="font-normal text-muted">(optional)</span></label
        >
        <InputText
          :id="`${id}-email`"
          name="email"
          type="email"
          autocomplete="email"
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
    </div>
    <div class="flex flex-wrap justify-end gap-2">
      <Button type="submit">{{ nextLabel }}</Button>
    </div>
  </Form>
</template>
