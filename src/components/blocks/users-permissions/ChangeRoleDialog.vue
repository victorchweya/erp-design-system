<script setup lang="ts">
import { computed, shallowRef, useId, watch } from 'vue'
import { lastAdminMessage, roles, type Role, type User } from './roles'

const props = defineProps<{ user: User | null; lastAdmin: boolean }>()
const visible = defineModel<boolean>('visible', { required: true })
const emit = defineEmits<{ save: [role: Role] }>()

const id = useId()
const roleOptions = [...roles]
const role = shallowRef<Role | null>(null)

watch(visible, (open) => {
  if (open) role.value = props.user?.role ?? null
})

const blocked = computed(() => props.lastAdmin && role.value !== 'Admin')

function submit() {
  if (!role.value || blocked.value) return
  emit('save', role.value)
  visible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    blockScroll
    :header="user ? `Change role for ${user.name}` : 'Change role'"
    class="w-[calc(100vw-2rem)] max-w-lg"
  >
    <form
      :id="`${id}-form`"
      novalidate
      class="flex flex-col gap-4 text-sm"
      @submit.prevent="submit"
    >
      <div class="flex flex-col gap-1">
        <label :for="`${id}-role`" class="font-medium">Role</label>
        <Select
          v-model="role"
          :inputId="`${id}-role`"
          :options="roleOptions"
          :invalid="blocked"
          :aria-describedby="`${id}-role-help`"
          fluid
        />
        <Message
          v-if="blocked && user"
          :id="`${id}-role-help`"
          severity="warn"
          variant="simple"
          size="small"
          >{{ lastAdminMessage(user) }}</Message
        >
        <p v-else :id="`${id}-role-help`" class="text-muted">
          Permissions for each role are set in the roles and permissions matrix.
        </p>
      </div>
    </form>
    <template #footer>
      <Button type="button" severity="secondary" outlined @click="visible = false">Cancel</Button>
      <Button type="submit" :form="`${id}-form`" :disabled="blocked || role === user?.role"
        >Save role</Button
      >
    </template>
  </Dialog>
</template>
