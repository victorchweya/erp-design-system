<!-- Adapted from PrimeVue 5.0.5 Sidebar documentation: https://primevue.dev/sidebar -->
<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import logo from '@/assets/brand/logo.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Bell from '@primeicons/vue/bell'
import Cog from '@primeicons/vue/cog'
import Home from '@primeicons/vue/home'
import Inbox from '@primeicons/vue/inbox'
import Search from '@primeicons/vue/search'
import SidebarIcon from '@primeicons/vue/sidebar'
import Users from '@primeicons/vue/users'

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
</script>

<template>
  <div class="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
    <SidebarLayout class="!min-h-0 h-[36rem] !relative isolate">
      <SidebarBackdrop v-if="isMobile && open" class="!absolute" />
      <Sidebar
        id="mobile-nav"
        :collapsible="isMobile ? 'offcanvas' : 'icon'"
        :overlay="isMobile"
        v-model:open="open"
        width="14rem"
      >
        <SidebarSpacer />
        <SidebarAside as="nav" aria-label="Example navigation">
          <SidebarPanel>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton class="!p-1" aria-label="Farm to Feed">
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
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
                      <SidebarMenuBadge>3</SidebarMenuBadge>
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
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Settings">
                        <Cog aria-hidden="true" />
                        <span>Settings</span>
                      </SidebarMenuButton>
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
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>

      <SidebarMain>
        <header
          class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
        >
          <SidebarTrigger
            severity="secondary"
            target="mobile-nav"
            :text="true"
            size="small"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon aria-hidden="true" />
          </SidebarTrigger>
          <span class="text-sm font-medium">Dashboard</span>
          <span
            class="ml-auto text-xs text-muted-color rounded-md bg-surface-100 dark:bg-surface-800 px-2 py-1"
            >{{ isMobile ? 'Mobile' : 'Desktop' }}</span
          >
        </header>
        <div class="flex-1 p-4 flex flex-col gap-4">
          <div class="rounded-lg bg-surface-100 dark:bg-surface-800 h-48"></div>
          <div class="rounded-lg bg-surface-100 dark:bg-surface-800 flex-1"></div>
        </div>
      </SidebarMain>
    </SidebarLayout>
  </div>
</template>
