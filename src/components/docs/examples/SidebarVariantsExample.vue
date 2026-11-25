<!-- Adapted from PrimeVue 5.0.5 Sidebar documentation: https://primevue.dev/sidebar -->
<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import logo from '@/assets/brand/logo.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Bell from '@primeicons/vue/bell'
import CalendarIcon from '@primeicons/vue/calendar'
import ChartBar from '@primeicons/vue/chart-bar'
import ChevronDown from '@primeicons/vue/chevron-down'
import CreditCard from '@primeicons/vue/credit-card'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import Folder from '@primeicons/vue/folder'
import Home from '@primeicons/vue/home'
import Inbox from '@primeicons/vue/inbox'
import Search from '@primeicons/vue/search'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import SidebarIcon from '@primeicons/vue/sidebar'
import Star from '@primeicons/vue/star'
import Users from '@primeicons/vue/users'

const isMobile = ref(false)
const open = ref(true)
const variant = ref<'sidebar' | 'floating' | 'inset'>('sidebar')
const collapsible = ref<'icon' | 'offcanvas' | 'none'>('icon')
const side = ref<'left' | 'right'>('left')
const overlay = ref(false)
const openOnHover = ref(false)
const backdrop = ref(false)
let mql: MediaQueryList | null = null
let onMqlChange: ((event: MediaQueryListEvent) => void) | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  mql = window.matchMedia('(max-width: 1023px)')
  isMobile.value = mql.matches
  open.value = !isMobile.value
  onMqlChange = (event) => {
    isMobile.value = event.matches
    open.value = !event.matches
  }
  mql.addEventListener('change', onMqlChange)
})

onBeforeUnmount(() => {
  if (mql && onMqlChange) {
    mql.removeEventListener('change', onMqlChange)
  }
})

const variantOptions = [
  { label: 'Sidebar', value: 'sidebar' },
  { label: 'Floating', value: 'floating' },
  { label: 'Inset', value: 'inset' },
]
const collapsibleOptions = [
  { label: 'Icon', value: 'icon' },
  { label: 'Offcanvas', value: 'offcanvas' },
  { label: 'None', value: 'none' },
]
const sideOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
]
type NavItem = {
  icon: import('vue').Component
  label: string
  isActive?: boolean
  badge?: string
  subItems?: { label: string; isActive?: boolean }[]
}
const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Navigation',
    items: [
      { icon: Home, label: 'Home', isActive: true },
      { icon: Inbox, label: 'Inbox', badge: '12' },
      { icon: Search, label: 'Search' },
      { icon: Bell, label: 'Notifications', badge: '3' },
    ],
  },
  {
    label: 'Projects',
    items: [
      {
        icon: ChartBar,
        label: 'Analytics',
        subItems: [
          { label: 'Overview', isActive: true },
          { label: 'Reports' },
          { label: 'Real-time' },
        ],
      },
      { icon: Users, label: 'Team' },
      { icon: CalendarIcon, label: 'Calendar' },
      {
        icon: Folder,
        label: 'Documents',
        subItems: [{ label: 'Shared' }, { label: 'Private' }, { label: 'Archived' }],
      },
    ],
  },
  {
    label: 'Billing',
    items: [
      { icon: CreditCard, label: 'Payments' },
      { icon: ShoppingCart, label: 'Orders' },
      { icon: Star, label: 'Subscriptions' },
    ],
  },
]
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start gap-4 mb-4">
      <div class="flex flex-col gap-1.5">
        <label for="sidebar-variant">Variant</label>
        <Select
          inputId="sidebar-variant"
          v-model="variant"
          :options="variantOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Variant"
          class="w-40"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <label for="sidebar-collapsible">Collapsible</label>
        <Select
          inputId="sidebar-collapsible"
          v-model="collapsible"
          :options="collapsibleOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Collapsible"
          class="w-40"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <span>Side</span>
        <SelectButton
          aria-label="Sidebar side"
          v-model="side"
          :options="sideOptions"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label for="overlay-sw">Overlay</Label>
        <ToggleSwitch v-model="overlay" inputId="overlay-sw" />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label for="hover-sw">Open on Hover</Label>
        <ToggleSwitch v-model="openOnHover" inputId="hover-sw" />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label for="backdrop-sw">Backdrop</Label>
        <ToggleSwitch v-model="backdrop" inputId="backdrop-sw" />
      </div>
    </div>
    <div class="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
      <SidebarLayout class="!min-h-0 h-[36rem] !relative isolate">
        <SidebarBackdrop v-if="(backdrop || isMobile) && open" class="!absolute" />
        <SidebarMain v-if="side === 'right'">
          <header
            class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
          >
            <SidebarTrigger
              severity="secondary"
              target="variants-demo"
              :text="true"
              size="small"
              aria-label="Toggle sidebar"
            >
              <SidebarIcon aria-hidden="true" />
            </SidebarTrigger>
          </header>
          <div class="flex-1 p-4 flex flex-col gap-4">
            <div class="rounded-lg bg-surface-100 dark:bg-surface-800 h-48"></div>
            <div class="rounded-lg bg-surface-100 dark:bg-surface-800 flex-1"></div>
          </div>
        </SidebarMain>
        <Sidebar
          id="variants-demo"
          :variant="variant"
          :collapsible="isMobile ? 'offcanvas' : collapsible"
          :side="side"
          :overlay="isMobile || overlay"
          :openOnHover="openOnHover"
          v-model:open="open"
        >
          <SidebarSpacer />
          <SidebarAside as="nav" aria-label="Example navigation">
            <SidebarPanel>
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton class="!px-1" aria-label="Farm to Feed">
                      <img
                        v-if="open || collapsible === 'none'"
                        :src="logo"
                        alt=""
                        width="215"
                        height="32"
                        class="h-5 w-auto max-w-full shrink-0"
                      />
                      <img
                        v-else
                        :src="symbol"
                        alt=""
                        width="24"
                        height="24"
                        class="size-6 shrink-0"
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup v-for="group in navGroups" :key="group.label">
                  <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem
                        v-for="item in group.items"
                        :key="item.label"
                        :collapsible="!!item.subItems"
                        :defaultOpen="
                          item.subItems ? item.subItems.some((s) => s.isActive) : undefined
                        "
                      >
                        <SidebarMenuButton :isActive="item.isActive" :aria-label="item.label">
                          <component :is="item.icon" aria-hidden="true" />
                          <span>{{ item.label }}</span>
                          <ChevronDown
                            aria-hidden="true"
                            v-if="item.subItems"
                            class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                          />
                        </SidebarMenuButton>
                        <SidebarMenuBadge v-if="item.badge">{{ item.badge }}</SidebarMenuBadge>
                        <SidebarMenuSub v-if="item.subItems">
                          <SidebarMenuSubItem v-for="sub in item.subItems" :key="sub.label">
                            <SidebarMenuSubButton :isActive="sub.isActive">
                              <span>{{ sub.label }}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                        <SidebarMenuAction
                          v-else-if="!item.badge"
                          :showOnHover="true"
                          :aria-label="`More actions for ${item.label}`"
                        >
                          <EllipsisV aria-hidden="true" />
                        </SidebarMenuAction>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton class="!p-1" aria-label="John Doe">
                      <Avatar label="JD" shape="circle" class="size-6 shrink-0 text-xs" />
                      <span>John Doe</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
              <SidebarRail />
            </SidebarPanel>
          </SidebarAside>
        </Sidebar>
        <SidebarMain v-if="side === 'left'">
          <header
            class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
          >
            <SidebarTrigger
              severity="secondary"
              target="variants-demo"
              :text="true"
              size="small"
              aria-label="Toggle sidebar"
            >
              <SidebarIcon aria-hidden="true" />
            </SidebarTrigger>
          </header>
          <div class="flex-1 p-4 flex flex-col gap-4">
            <div class="rounded-lg bg-surface-100 dark:bg-surface-800 h-48"></div>
            <div class="rounded-lg bg-surface-100 dark:bg-surface-800 flex-1"></div>
          </div>
        </SidebarMain>
      </SidebarLayout>
    </div>
  </div>
</template>
