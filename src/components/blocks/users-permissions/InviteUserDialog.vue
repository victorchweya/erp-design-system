<script setup lang="ts">
import { computed, shallowRef, useId, watch } from 'vue'
import { emailPattern, roles, type Role } from './roles'

const props = defineProps<{ existingEmails: string[] }>()
const visible = defineModel<boolean>('visible', { required: true })
const emit = defineEmits<{ invite: [invite: { email: string; role: Role }] }>()

const id = useId()
const roleOptions = [...roles]
const email = shallowRef('')
const role = shallowRef<Role | null>(null)
const submitted = shallowRef(false)

const emailError = computed(() => {
  const value = email.value.trim().toLowerCase()
  if (!emailPattern.test(value)) return 'Enter a valid email address.'
  return props.existingEmails.includes(value) ? 'This person already has an account.' : ''
})
const roleError = computed(() => (role.value ? '' : 'Choose a role.'))

watch(visible, (open) => {
  if (!open) return
  email.value = ''
  role.value = null
  submitted.value = false
})

function submit() {
  submitted.value = true
  if (emailError.value || roleError.value || !role.value) return
  emit('invite', { email: email.value.trim().toLowerCase(), role: role.value })
  visible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    blockScroll
    header="Invite user"
    class="w-[calc(100vw-2rem)] max-w-lg"
  >
    <form
      :id="`${id}-form`"
      novalidate
      class="flex flex-col gap-4 text-sm"
      @submit.prevent="submit"
    >
      <p class="text-muted">They will get an email link to set up their account.</p>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-email`" class="font-medium">Work email</label>
        <InputText
          :id="`${id}-email`"
          v-model="email"
          type="email"
          autocomplete="off"
          required
          :invalid="submitted && !!emailError"
          :aria-invalid="submitted && !!emailError"
          :aria-describedby="`${id}-email-error`"
          fluid
        />
        <Message
          v-if="submitted && emailError"
          :id="`${id}-email-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ emailError }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-role`" class="font-medium">Role</label>
        <Select
          v-model="role"
          :inputId="`${id}-role`"
          :options="roleOptions"
          placeholder="Choose a role"
          :invalid="submitted && !!roleError"
          :aria-invalid="submitted && !!roleError"
          :aria-describedby="`${id}-role-error`"
          fluid
        />
        <Message
          v-if="submitted && roleError"
          :id="`${id}-role-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ roleError }}</Message
        >
      </div>
    </form>
    <template #footer>
      <Button type="button" severity="secondary" outlined @click="visible = false">Cancel</Button>
      <Button type="submit" :form="`${id}-form`">Send invite</Button>
    </template>
  </Dialog>
</template>
