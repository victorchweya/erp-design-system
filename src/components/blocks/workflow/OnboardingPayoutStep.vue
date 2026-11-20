<script setup lang="ts">
import { useId } from 'vue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import ArrowLeft from '@primeicons/vue/arrow-left'
import { banks, focusFirstInvalid, resolvePayout, type PayoutDetails } from './supplier-onboarding'

defineProps<{ initialValues: PayoutDetails; nextLabel: string }>()
const emit = defineEmits<{ next: [values: PayoutDetails]; back: [] }>()
const id = useId()
const methods = [
  { label: 'M-Pesa', value: 'mpesa', help: 'Paid to a registered Safaricom number.' },
  { label: 'Bank transfer', value: 'bank', help: 'Paid to a Kenyan bank account.' },
]

function submit(event: FormSubmitEvent) {
  if (event.valid) emit('next', event.values as PayoutDetails)
  else focusFirstInvalid(event.originalEvent)
}
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues="initialValues"
    :resolver="resolvePayout"
    novalidate
    :validateOnValueUpdate="false"
    validateOnBlur
    class="flex flex-col gap-6 text-sm"
    @submit="submit"
  >
    <fieldset class="flex flex-col gap-3">
      <legend class="mb-2 font-medium">Payout method</legend>
      <RadioButtonGroup name="method" class="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <div v-for="method in methods" :key="method.value" class="flex items-start gap-2">
          <RadioButton
            :inputId="`${id}-${method.value}`"
            :value="method.value"
            :aria-describedby="`${id}-${method.value}-help`"
          />
          <div class="flex flex-col">
            <label :for="`${id}-${method.value}`" class="font-medium">{{ method.label }}</label>
            <span :id="`${id}-${method.value}-help`" class="text-muted">{{ method.help }}</span>
          </div>
        </div>
      </RadioButtonGroup>
    </fieldset>

    <div v-if="$form.method?.value !== 'bank'" class="flex flex-col gap-1 md:max-w-sm">
      <label :for="`${id}-mpesa`" class="font-medium">M-Pesa number</label>
      <InputText
        :id="`${id}-mpesa`"
        name="mpesaNumber"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        :aria-describedby="`${id}-mpesa-help ${id}-mpesa-error`"
        fluid
      />
      <p :id="`${id}-mpesa-help`" class="text-muted">
        Must be registered to the farm or its contact person.
      </p>
      <Message
        v-if="$form.mpesaNumber?.invalid"
        :id="`${id}-mpesa-error`"
        severity="error"
        variant="simple"
        size="small"
        >{{ $form.mpesaNumber.error?.message }}</Message
      >
    </div>
    <div v-else class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-1">
        <label :for="`${id}-bank`" class="font-medium">Bank</label>
        <Select
          :inputId="`${id}-bank`"
          name="bankName"
          :options="banks"
          placeholder="Choose a bank"
          :aria-describedby="`${id}-bank-error`"
          fluid
        />
        <Message
          v-if="$form.bankName?.invalid"
          :id="`${id}-bank-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.bankName.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-account-name`" class="font-medium">Account name</label>
        <InputText
          :id="`${id}-account-name`"
          name="accountName"
          :aria-describedby="`${id}-account-name-error`"
          fluid
        />
        <Message
          v-if="$form.accountName?.invalid"
          :id="`${id}-account-name-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.accountName.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1 md:col-span-2">
        <label :for="`${id}-account-number`" class="font-medium">Account number</label>
        <InputText
          :id="`${id}-account-number`"
          name="accountNumber"
          inputmode="numeric"
          autocomplete="off"
          :aria-describedby="`${id}-account-number-error`"
          fluid
        />
        <Message
          v-if="$form.accountNumber?.invalid"
          :id="`${id}-account-number-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ $form.accountNumber.error?.message }}</Message
        >
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-2">
      <Button type="button" severity="secondary" outlined @click="emit('back')"
        ><ArrowLeft aria-hidden="true" />Back</Button
      >
      <Button type="submit">{{ nextLabel }}</Button>
    </div>
  </Form>
</template>
