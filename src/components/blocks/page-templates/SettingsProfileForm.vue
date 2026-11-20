<script setup lang="ts">
import { useId } from 'vue'
import { settingsCounties, type CompanyProfile, type ProfileErrors } from './settings'

const props = defineProps<{ errors: ProfileErrors }>()
const profile = defineModel<CompanyProfile>({ required: true })
const id = useId()

function update<K extends keyof CompanyProfile>(key: K, value: CompanyProfile[K]) {
  profile.value = { ...profile.value, [key]: value }
}
function describedBy(key: keyof CompanyProfile, help?: string) {
  return (
    [help, props.errors[key] ? `${id}-${key}-error` : null].filter(Boolean).join(' ') || undefined
  )
}
function focusField(key: keyof CompanyProfile) {
  document.getElementById(`${id}-${key}`)?.focus()
}
defineExpose({ focusField })
</script>

<template>
  <div class="grid gap-4 text-sm sm:grid-cols-2">
    <div class="flex flex-col gap-1 sm:col-span-2">
      <label :for="`${id}-name`" class="font-medium">Company name</label>
      <InputText
        :id="`${id}-name`"
        :modelValue="profile.name"
        autocomplete="organization"
        required
        :invalid="!!errors.name"
        :aria-describedby="describedBy('name')"
        fluid
        @update:modelValue="update('name', $event ?? '')"
      />
      <Message
        v-if="errors.name"
        :id="`${id}-name-error`"
        severity="error"
        variant="simple"
        size="small"
        >{{ errors.name }}</Message
      >
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-kraPin`" class="font-medium">KRA PIN</label>
      <InputText
        :id="`${id}-kraPin`"
        :modelValue="profile.kraPin"
        required
        :invalid="!!errors.kraPin"
        :aria-describedby="describedBy('kraPin', `${id}-kraPin-help`)"
        fluid
        @update:modelValue="update('kraPin', $event ?? '')"
      />
      <p :id="`${id}-kraPin-help`" class="text-xs text-muted">Shown on invoices.</p>
      <Message
        v-if="errors.kraPin"
        :id="`${id}-kraPin-error`"
        severity="error"
        variant="simple"
        size="small"
        >{{ errors.kraPin }}</Message
      >
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-email`" class="font-medium">Billing email</label>
      <InputText
        :id="`${id}-email`"
        :modelValue="profile.email"
        type="email"
        autocomplete="email"
        required
        :invalid="!!errors.email"
        :aria-describedby="describedBy('email')"
        fluid
        @update:modelValue="update('email', $event ?? '')"
      />
      <Message
        v-if="errors.email"
        :id="`${id}-email-error`"
        severity="error"
        variant="simple"
        size="small"
        >{{ errors.email }}</Message
      >
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-phone`" class="font-medium">Phone</label>
      <InputText
        :id="`${id}-phone`"
        :modelValue="profile.phone"
        type="tel"
        autocomplete="tel"
        fluid
        @update:modelValue="update('phone', $event ?? '')"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-county`" class="font-medium">County</label>
      <Select
        :inputId="`${id}-county`"
        :modelValue="profile.county"
        :options="settingsCounties"
        fluid
        @update:modelValue="update('county', $event)"
      />
    </div>
    <div class="flex flex-col gap-1 sm:col-span-2">
      <label :for="`${id}-address`" class="font-medium">Delivery address</label>
      <Textarea
        :id="`${id}-address`"
        :modelValue="profile.address"
        :rows="3"
        autocomplete="street-address"
        fluid
        @update:modelValue="update('address', $event ?? '')"
      />
    </div>
  </div>
</template>
