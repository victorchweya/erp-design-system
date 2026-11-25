<script setup lang="ts">
import Times from '@primeicons/vue/times'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import { computed, ref, shallowRef, useId, useTemplateRef } from 'vue'
import type Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { useConfirm } from 'primevue/useconfirm'
import Ban from '@primeicons/vue/ban'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import Refresh from '@primeicons/vue/refresh'
import Search from '@primeicons/vue/search'
import Send from '@primeicons/vue/send'
import Trash from '@primeicons/vue/trash'
import UserEdit from '@primeicons/vue/user-edit'
import UserPlus from '@primeicons/vue/user-plus'
import { formatDateTime } from '@/utils/format'
import ChangeRoleDialog from './ChangeRoleDialog.vue'
import InviteUserDialog from './InviteUserDialog.vue'
import {
  isLastActiveAdmin,
  lastAdminMessage,
  roles,
  statusSeverity,
  type Role,
  type User,
} from './roles'

const id = useId()
const confirm = useConfirm()
const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const roleOptions = [...roles]

const users = ref<User[]>([
  {
    id: 1,
    name: 'Wanjiru Kamau',
    email: 'wanjiru.kamau@farmtofeed.co.ke',
    role: 'Admin',
    status: 'Active',
    lastActive: '2026-11-20T08:12:00+03:00',
  },
  {
    id: 2,
    name: 'Otieno Ochieng',
    email: 'otieno.ochieng@farmtofeed.co.ke',
    role: 'Admin',
    status: 'Suspended',
    lastActive: '2026-10-02T16:40:00+03:00',
  },
  {
    id: 3,
    name: 'Amina Hassan',
    email: 'amina.hassan@farmtofeed.co.ke',
    role: 'Operations',
    status: 'Active',
    lastActive: '2026-11-20T07:05:00+03:00',
  },
  {
    id: 4,
    name: 'Brian Mutua',
    email: 'brian.mutua@farmtofeed.co.ke',
    role: 'Finance',
    status: 'Active',
    lastActive: '2026-11-19T17:22:00+03:00',
  },
  {
    id: 5,
    name: 'Grace Njeri',
    email: 'grace.njeri@farmtofeed.co.ke',
    role: 'Sales',
    status: 'Invited',
    lastActive: null,
  },
  {
    id: 6,
    name: 'Peter Kiprono',
    email: 'peter.kiprono@farmtofeed.co.ke',
    role: 'Warehouse',
    status: 'Active',
    lastActive: '2026-11-18T05:48:00+03:00',
  },
  {
    id: 7,
    name: 'Faith Achieng',
    email: 'faith.achieng@farmtofeed.co.ke',
    role: 'Viewer',
    status: 'Active',
    lastActive: '2026-11-12T11:30:00+03:00',
  },
])

const query = shallowRef('')
const roleFilter = shallowRef<Role | null>(null)
const filtered = computed(() => {
  const search = query.value.trim().toLowerCase()
  return users.value.filter(
    (user) =>
      (!roleFilter.value || user.role === roleFilter.value) &&
      `${user.name} ${user.email}`.toLowerCase().includes(search),
  )
})
const existingEmails = computed(() => users.value.map((user) => user.email.toLowerCase()))

const feedback = shallowRef('')
const notice = shallowRef('')
const inviteVisible = shallowRef(false)
const roleVisible = shallowRef(false)
const activeUser = shallowRef<User | null>(null)
const activeIsLastAdmin = computed(
  () => !!activeUser.value && isLastActiveAdmin(users.value, activeUser.value),
)

function update(userId: number, changes: Partial<User>) {
  users.value = users.value.map((user) => (user.id === userId ? { ...user, ...changes } : user))
}

function announce(message: string) {
  notice.value = ''
  feedback.value = message
}

function invite({ email, role }: { email: string; role: Role }) {
  const nextId = Math.max(0, ...users.value.map((user) => user.id)) + 1
  users.value = [
    ...users.value,
    {
      id: nextId,
      name: email.split('@')[0] ?? email,
      email,
      role,
      status: 'Invited',
      lastActive: null,
    },
  ]
  announce(`Invite sent to ${email} as ${role} in this preview.`)
}

function changeRole(role: Role) {
  const user = activeUser.value
  if (!user) return
  update(user.id, { role })
  announce(`${user.name} is now ${role}.`)
}

function guardLastAdmin(user: User) {
  if (!isLastActiveAdmin(users.value, user)) return false
  feedback.value = ''
  notice.value = lastAdminMessage(user)
  return true
}

function suspend(user: User) {
  if (guardLastAdmin(user)) return
  confirm.require({
    group: id,
    header: `Suspend ${user.name}?`,
    message: `${user.name} will be signed out and cannot sign in until reactivated. Their records and history are kept.`,
    defaultFocus: 'reject',
    blockScroll: true,
    rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Suspend user', severity: 'danger' },
    accept: () => {
      update(user.id, { status: 'Suspended' })
      announce(`${user.name} is suspended.`)
    },
  })
}

function reactivate(user: User) {
  confirm.require({
    group: id,
    header: `Reactivate ${user.name}?`,
    message: `${user.name} will be able to sign in again with the ${user.role} role.`,
    blockScroll: true,
    rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Reactivate user' },
    accept: () => {
      update(user.id, { status: 'Active' })
      announce(`${user.name} is active again.`)
    },
  })
}

function remove(user: User) {
  if (guardLastAdmin(user)) return
  confirm.require({
    group: id,
    header: `Remove ${user.name}?`,
    message: `${user.name} will lose access immediately. You can invite them again later.`,
    defaultFocus: 'reject',
    blockScroll: true,
    rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Remove user', severity: 'danger' },
    accept: () => {
      users.value = users.value.filter((other) => other.id !== user.id)
      announce(`${user.name} was removed.`)
    },
  })
}

const menuItems = computed<MenuItem[]>(() => {
  const user = activeUser.value
  if (!user) return []
  return [
    { label: 'Change role', icon: UserEdit, command: () => (roleVisible.value = true) },
    ...(user.status === 'Invited'
      ? [
          {
            label: 'Resend invite',
            icon: Send,
            command: () => announce(`Invite resent to ${user.email} in this preview.`),
          },
        ]
      : []),
    user.status === 'Suspended'
      ? { label: 'Reactivate', icon: Refresh, command: () => reactivate(user) }
      : { label: 'Suspend', icon: Ban, command: () => suspend(user) },
    { separator: true },
    { label: 'Remove user', icon: Trash, command: () => remove(user) },
  ]
})

function openMenu(event: Event, user: User) {
  activeUser.value = user
  menu.value?.toggle(event)
}

function clearFilters() {
  query.value = ''
  roleFilter.value = null
}
const searchInput = useTemplateRef<{ $el: HTMLInputElement }>('searchInput')

function clearSearch() {
  query.value = ''
  searchInput.value?.$el.focus()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <DataTable
      :value="filtered"
      dataKey="id"
      size="small"
      showGridlines
      scrollable
      :tableProps="{ 'aria-label': 'Users' }"
    >
      <template #header>
        <div class="flex flex-col gap-3">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h5 class="text-base font-medium">Users</h5>
              <p class="text-sm text-muted">Invite people and manage what they can access.</p>
            </div>
            <Button
              type="button"
              size="small"
              aria-haspopup="dialog"
              :aria-expanded="inviteVisible"
              @click="inviteVisible = true"
            >
              <UserPlus aria-hidden="true" />
              Invite user
            </Button>
          </div>
          <div class="flex flex-wrap items-end gap-3">
            <IconField class="min-w-0 flex-1 basis-48">
              <InputIcon><Search aria-hidden="true" /></InputIcon>
              <InputText
                ref="searchInput"
                v-model="query"
                aria-label="Search users"
                placeholder="Name or email"
                fluid
              />
              <InputIcon v-if="query">
                <button
                  type="button"
                  aria-label="Clear user search"
                  title="Clear user search"
                  class="-m-1 flex rounded-sm p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
                  @click="clearSearch"
                >
                  <Times aria-hidden="true" focusable="false" />
                </button>
              </InputIcon>
            </IconField>
            <Select
              v-model="roleFilter"
              :options="roleOptions"
              aria-label="Filter users by role"
              placeholder="All roles"
              showClear
              class="flex-1 basis-40"
            />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex flex-wrap items-center gap-3 text-sm">
          <span>No users match these filters.</span>
          <Button type="button" size="small" severity="primary" outlined @click="clearFilters"
            >Clear filters</Button
          >
        </div>
      </template>
      <Column header="Name">
        <template #body="{ data }">
          <div class="flex flex-col">
            <span class="font-medium">{{ data.name }}</span>
            <span class="text-muted">{{ data.email }}</span>
          </div>
        </template>
      </Column>
      <Column field="role" header="Role">
        <template #body="{ data }">
          <Tag :severity="data.role === 'Admin' ? 'contrast' : 'secondary'">{{ data.role }}</Tag>
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag :severity="statusSeverity[data.status as User['status']]">{{ data.status }}</Tag>
        </template>
      </Column>
      <Column header="Last active">
        <template #body="{ data }">
          {{ data.lastActive ? formatDateTime(data.lastActive) : 'Never signed in' }}
        </template>
      </Column>
      <Column header="Actions" headerClass="w-16">
        <template #body="{ data }">
          <Button
            type="button"
            severity="primary"
            text
            rounded
            size="small"
            :aria-label="`Actions for ${data.name}`"
            aria-haspopup="menu"
            :aria-controls="`${id}-menu`"
            @click="openMenu($event, data)"
          >
            <EllipsisV aria-hidden="true" />
          </Button>
        </template>
      </Column>
    </DataTable>
    <Message v-if="notice" severity="warn" role="alert" closable @close="notice = ''">
      <template #icon="{ class: iconClass }">
        <ExclamationTriangle :class="iconClass" aria-hidden="true" />
      </template>
      {{ notice }}
    </Message>
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">
      {{ feedback }}
    </p>
  </div>
  <Menu :id="`${id}-menu`" ref="menu" :model="menuItems" popup />
  <InviteUserDialog
    v-model:visible="inviteVisible"
    :existingEmails="existingEmails"
    @invite="invite"
  />
  <ChangeRoleDialog
    v-model:visible="roleVisible"
    :user="activeUser"
    :lastAdmin="activeIsLastAdmin"
    @save="changeRole"
  />
  <ConfirmDialog :group="id" class="w-[calc(100vw-2rem)] max-w-lg" />
</template>
