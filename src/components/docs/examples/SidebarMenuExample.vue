<!-- Adapted from PrimeVue 5.0.5 Sidebar documentation: https://primevue.dev/sidebar -->
<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import logo from '@/assets/brand/logo.svg'
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import Bell from '@primeicons/vue/bell'
import Check from '@primeicons/vue/check'
import ChevronDown from '@primeicons/vue/chevron-down'
import Cog from '@primeicons/vue/cog'
import Home from '@primeicons/vue/home'
import Inbox from '@primeicons/vue/inbox'
import Plus from '@primeicons/vue/plus'
import Search from '@primeicons/vue/search'
import SidebarIcon from '@primeicons/vue/sidebar'
import SignOut from '@primeicons/vue/sign-out'
import Users from '@primeicons/vue/users'
import type Menu from 'primevue/menu'

const companyMenu = useTemplateRef<InstanceType<typeof Menu>>('companyMenu')
const userMenu = useTemplateRef<InstanceType<typeof Menu>>('userMenu')
const isMobile = ref(false)
const open = ref(true)
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

const companies = [
  { name: 'Farm to Feed', logo: symbol },
  { name: 'FTF Operations', logo: symbol },
  { name: 'FTF Procurement', logo: symbol },
]
const activeCompany = ref(companies[0]!)
const userMenuItems = [
  { label: 'Settings', icon: Cog },
  { label: 'Notifications', icon: Bell },
  { separator: true },
  { label: 'Sign out', icon: SignOut },
]
const companyMenuItems = computed(() => [
  ...companies.map((c) => ({
    label: c.name,
    logo: c.logo,
    active: activeCompany.value.name === c.name,
    command: () => {
      activeCompany.value = c
    },
  })),
  { separator: true },
])
</script>

<template>
  <div class="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
    <SidebarLayout class="!min-h-0 h-[36rem] !relative isolate">
      <SidebarBackdrop v-if="isMobile && open" class="!absolute" />
      <Sidebar
        id="menu-demo"
        :collapsible="isMobile ? 'offcanvas' : 'icon'"
        :overlay="isMobile"
        v-model:open="open"
      >
        <SidebarSpacer />
        <SidebarAside as="nav" aria-label="Example navigation">
          <SidebarPanel>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    class="!p-1"
                    @click="(e: Event) => companyMenu?.toggle(e)"
                    :aria-label="activeCompany.name"
                    aria-haspopup="menu"
                    aria-controls="company_menu"
                  >
                    <img
                      v-if="open"
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
                    <span
                      v-if="open && activeCompany.name !== 'Farm to Feed'"
                      class="truncate text-xs"
                      >{{ activeCompany.name.replace('FTF ', '') }}</span
                    >
                    <ChevronDown aria-hidden="true" class="ml-auto" />
                  </SidebarMenuButton>
                  <Menu ref="companyMenu" id="company_menu" :model="companyMenuItems" :popup="true">
                    <template #start>
                      <div class="px-3 py-1 text-sm font-medium text-muted-color">Companies</div>
                    </template>
                    <template #item="{ item }">
                      <div class="flex items-center gap-2 p-2">
                        <img
                          v-if="item.logo"
                          :src="item.logo"
                          alt=""
                          width="20"
                          height="20"
                          class="size-5 shrink-0"
                        />
                        <span class="text-sm">{{ item.label }}</span>
                        <Check aria-hidden="true" v-if="item.active" class="ml-auto" />
                      </div>
                    </template>
                    <template #end>
                      <div class="flex items-center gap-2 p-2 px-3">
                        <Plus aria-hidden="true" />
                        <div class="text-sm font-medium text-muted-color">Add company</div>
                      </div>
                    </template>
                  </Menu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton :isActive="true" aria-label="Home">
                        <Home aria-hidden="true" />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Inbox">
                        <Inbox aria-hidden="true" />
                        <span>Inbox</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Search">
                        <Search aria-hidden="true" />
                        <span>Search</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Team">
                        <Users aria-hidden="true" />
                        <span>Team</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Notifications">
                        <Bell aria-hidden="true" />
                        <span>Notifications</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    class="!p-1"
                    @click="(e: Event) => userMenu?.toggle(e)"
                    aria-label="John Doe"
                    aria-haspopup="menu"
                    aria-controls="user_menu"
                  >
                    <Avatar label="JD" shape="circle" class="size-6 shrink-0 text-xs" />
                    <span>John Doe</span>
                    <ChevronDown aria-hidden="true" class="ml-auto" />
                  </SidebarMenuButton>
                  <Menu ref="userMenu" id="user_menu" :model="userMenuItems" :popup="true">
                    <template #itemicon="{ item }"
                      ><component :is="item.icon" aria-hidden="true"
                    /></template>
                    <template #start>
                      <div class="px-3 py-1 text-xs font-medium text-muted-color">
                        john@acme.com
                      </div>
                    </template>
                  </Menu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>

      <SidebarMain>
        <header
          class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
        >
          <SidebarTrigger
            severity="secondary"
            target="menu-demo"
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
</template>
