<script setup lang="ts">
import ToastHost from '@/components/ToastHost.vue'
import { computed, nextTick, ref, shallowRef, useId, useTemplateRef } from 'vue'
import { useToast } from 'primevue/usetoast'
import Building from '@primeicons/vue/building'
import Bell from '@primeicons/vue/bell'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import InfoCircle from '@primeicons/vue/info-circle'
import SettingsProfileForm from './SettingsProfileForm.vue'
import SettingsNotifications from './SettingsNotifications.vue'
import SettingsDangerZone from './SettingsDangerZone.vue'
import {
  cloneSettings,
  defaultSettings,
  settingsEqual,
  validateProfile,
  type CompanyProfile,
  type ProfileErrors,
} from './settings'

type SectionKey = 'profile' | 'notifications' | 'danger'

const id = useId()
const toast = useToast()
const sections = [
  {
    key: 'profile',
    label: 'Company profile',
    description: 'Legal and contact details used on invoices and delivery notes.',
    icon: Building,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    description: 'Choose which updates your team receives.',
    icon: Bell,
  },
  {
    key: 'danger',
    label: 'Danger zone',
    description: 'Actions that affect every user in this company.',
    icon: ExclamationTriangle,
  },
] as const
const active = shallowRef<SectionKey>('profile')
const current = computed(() => sections.find(({ key }) => key === active.value)!)
const heading = useTemplateRef<HTMLElement>('heading')
const profileForm = useTemplateRef<InstanceType<typeof SettingsProfileForm>>('profileForm')

const saved = shallowRef(cloneSettings(defaultSettings))
const draft = ref(cloneSettings(defaultSettings))
const submitted = shallowRef(false)
const deactivated = shallowRef(false)

const dirty = computed(() => !settingsEqual(draft.value, saved.value))
const errors = computed<ProfileErrors>(() =>
  submitted.value ? validateProfile(draft.value.profile) : {},
)

async function select(key: SectionKey) {
  active.value = key
  await nextTick()
  heading.value?.focus()
}

async function save() {
  submitted.value = true
  const firstError = Object.keys(errors.value)[0] as keyof CompanyProfile | undefined
  if (firstError) {
    active.value = 'profile'
    await nextTick()
    profileForm.value?.focusField(firstError)
    return
  }
  saved.value = cloneSettings(draft.value)
  submitted.value = false
  toast.add({
    group: id,
    severity: 'success',
    summary: 'Settings saved',
    detail: 'Your company settings were updated in this preview.',
    life: 4000,
  })
}

function discard() {
  draft.value = cloneSettings(saved.value)
  submitted.value = false
}
</script>

<template>
  <div class="settings flex flex-col gap-6 text-color">
    <header class="flex flex-col gap-1">
      <h3 class="text-xl font-medium tracking-tight sm:text-2xl">Settings</h3>
      <p class="text-sm text-muted">Manage {{ saved.profile.name }} company preferences.</p>
    </header>
    <div class="settings-layout grid min-w-0 items-start gap-6">
      <nav aria-label="Settings sections">
        <ul class="flex gap-1 overflow-x-auto settings-nav">
          <li v-for="section in sections" :key="section.key" class="shrink-0">
            <!-- The current section uses the Kale selected tint; Danger zone reads red. -->
            <Button
              type="button"
              variant="text"
              severity="secondary"
              :aria-current="active === section.key ? 'true' : undefined"
              class="w-full justify-start"
              :class="{ 'bg-highlight': active === section.key }"
              @click="select(section.key)"
            >
              <component
                :is="section.icon"
                aria-hidden="true"
                :class="section.key === 'danger' ? 'text-danger' : undefined"
              />
              <span :class="section.key === 'danger' ? 'text-danger' : undefined">{{
                section.label
              }}</span>
            </Button>
          </li>
        </ul>
      </nav>
      <form novalidate class="flex min-w-0 flex-col gap-6" @submit.prevent="save">
        <section :aria-labelledby="`${id}-section`" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <h4
              :id="`${id}-section`"
              ref="heading"
              tabindex="-1"
              class="text-lg font-medium outline-hidden"
              :class="{ 'text-danger': active === 'danger' }"
            >
              {{ current.label }}
            </h4>
            <p class="text-sm text-muted">{{ current.description }}</p>
          </div>
          <Message v-if="active === 'profile'" severity="info">
            <template #icon="{ class: iconClass }">
              <InfoCircle :class="iconClass" aria-hidden="true" />
            </template>
            Changes apply to new invoices and delivery notes. Documents already issued keep the
            details they were issued with.
          </Message>
          <SettingsProfileForm
            v-if="active === 'profile'"
            ref="profileForm"
            v-model="draft.profile"
            :errors="errors"
          />
          <SettingsNotifications
            v-else-if="active === 'notifications'"
            v-model="draft.notifications"
          />
          <SettingsDangerZone
            v-else
            v-model:deactivated="deactivated"
            :companyName="saved.profile.name"
          />
        </section>
        <div
          v-if="dirty"
          role="region"
          aria-label="Unsaved changes"
          class="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 rounded-border border border-note bg-note p-3 text-sm text-note shadow-md"
        >
          <p class="font-medium">You have unsaved changes.</p>
          <div class="flex flex-wrap gap-2">
            <Button type="button" severity="secondary" outlined @click="discard">Discard</Button>
            <Button type="submit">Save changes</Button>
          </div>
        </div>
      </form>
    </div>
    <p role="status" class="sr-only">{{ dirty ? 'You have unsaved changes.' : '' }}</p>
    <ToastHost
      :group="id"
      :breakpoints="{ '640px': { width: 'calc(100vw - 2rem)', right: '1rem', left: '1rem' } }"
    />
  </div>
</template>

<style scoped>
.settings {
  container-type: inline-size;
}

@container (min-width: 44rem) {
  .settings-layout {
    grid-template-columns: 13rem minmax(0, 1fr);
  }

  .settings-nav {
    flex-direction: column;
  }
}
</style>
