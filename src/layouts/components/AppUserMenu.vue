<script setup lang="ts">
import Cog from '@primeicons/vue/cog'
import SignOut from '@primeicons/vue/sign-out'
import User from '@primeicons/vue/user'
import Users from '@primeicons/vue/users'
import { shallowRef, useTemplateRef } from 'vue'
import type Menu from 'primevue/menu'

const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const visible = shallowRef(false)
const feedback = shallowRef('')
const items = [
  { label: 'Profile', icon: User, command: () => (feedback.value = 'Profile selected.') },
  { label: 'Team', icon: Users, command: () => (feedback.value = 'Team selected.') },
  { label: 'Preferences', icon: Cog, command: () => (feedback.value = 'Preferences selected.') },
  { separator: true },
  { label: 'Sign out', icon: SignOut, command: () => (feedback.value = 'Sign out selected.') },
]
</script>

<template>
  <Button
    id="user-menu-trigger"
    type="button"
    iconOnly
    rounded
    text
    severity="secondary"
    aria-label="Open user menu"
    aria-haspopup="menu"
    aria-controls="user-menu"
    :aria-expanded="visible"
    @click="menu?.toggle($event)"
  >
    <User aria-hidden="true" />
    <span
      class="pointer-events-none absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
      aria-hidden="true"
    />
  </Button>
  <Menu
    id="user-menu"
    ref="menu"
    :model="items"
    aria-labelledby="user-menu-trigger"
    popup
    class="w-56"
    @show="visible = true"
    @hide="visible = false"
  >
    <template #start>
      <div class="border-b border-surface px-3 py-3">
        <p class="font-medium text-color">Amina Hassan</p>
        <p class="truncate text-sm text-muted">amina@farmtofeed.com</p>
      </div>
    </template>
  </Menu>
  <p class="sr-only" role="status">{{ feedback }}</p>
</template>
