<!-- Adapted from PrimeVue 5.0.5 Sidebar documentation: https://primevue.dev/sidebar -->
<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import logo from '@/assets/brand/logo.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Bell from '@primeicons/vue/bell'
import CalendarIcon from '@primeicons/vue/calendar'
import ChartBar from '@primeicons/vue/chart-bar'
import ChevronDown from '@primeicons/vue/chevron-down'
import Cog from '@primeicons/vue/cog'
import Comment from '@primeicons/vue/comment'
import Home from '@primeicons/vue/home'
import Inbox from '@primeicons/vue/inbox'
import Search from '@primeicons/vue/search'
import SidebarIcon from '@primeicons/vue/sidebar'
import Users from '@primeicons/vue/users'

const isMobile = ref(false)
const navOpen = ref(true)
const open = ref(false)
let mql: MediaQueryList | null = null
let onMqlChange: ((event: MediaQueryListEvent) => void) | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  mql = window.matchMedia('(max-width: 1023px)')
  isMobile.value = mql.matches
  navOpen.value = !isMobile.value
  onMqlChange = (event) => {
    isMobile.value = event.matches
    navOpen.value = !event.matches
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
      <SidebarBackdrop v-if="isMobile && (navOpen || open)" class="!absolute" />
      <!-- Left sidebar - icon collapsible -->
      <Sidebar
        id="nav"
        side="left"
        :collapsible="isMobile ? 'offcanvas' : 'icon'"
        :overlay="isMobile"
        v-model:open="navOpen"
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
                      v-if="navOpen"
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
                      <SidebarMenuBadge>5</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Search">
                        <Search aria-hidden="true" />
                        <span>Search</span>
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

              <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem :collapsible="true" :defaultOpen="true">
                      <SidebarMenuButton aria-label="Analytics">
                        <ChartBar aria-hidden="true" />
                        <span>Analytics</span>
                        <ChevronDown
                          aria-hidden="true"
                          class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                        />
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton :isActive="true">Overview</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>Reports</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Team">
                        <Users aria-hidden="true" />
                        <span>Team</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Calendar">
                        <CalendarIcon aria-hidden="true" />
                        <span>Calendar</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton aria-label="Settings">
                    <Cog aria-hidden="true" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>

      <!-- Main content -->
      <SidebarMain>
        <header
          class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
        >
          <SidebarTrigger
            target="nav"
            severity="secondary"
            :text="true"
            size="small"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon aria-hidden="true" />
          </SidebarTrigger>
          <span class="text-sm font-medium flex-1">Dashboard</span>
          <SidebarTrigger
            target="ai"
            severity="secondary"
            :text="true"
            size="small"
            aria-label="Toggle sidebar"
          >
            <Comment aria-hidden="true" />
          </SidebarTrigger>
        </header>
        <div class="flex-1 p-4 flex flex-col gap-4">
          <div class="rounded-lg bg-surface-100 dark:bg-surface-800 h-48"></div>
          <div class="rounded-lg bg-surface-100 dark:bg-surface-800 flex-1"></div>
        </div>
      </SidebarMain>

      <!-- Right sidebar - Claude-style chat, offcanvas -->
      <Sidebar
        id="ai"
        side="right"
        collapsible="offcanvas"
        overlay
        v-model:open="open"
        width="18rem"
      >
        <SidebarSpacer />
        <SidebarAside as="nav" aria-label="Example navigation">
          <SidebarPanel>
            <SidebarHeader>
              <div class="flex items-center gap-2 px-1">
                <span class="font-semibold text-sm text-surface-500">Weekly metrics overview</span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <div class="flex flex-col gap-4 px-3 py-2">
                <div class="rounded-xl bg-surface-100 dark:bg-surface-800 px-3 py-2.5 text-sm">
                  Show me this week&apos;s metrics
                </div>

                <div class="text-sm leading-relaxed">
                  <p>Here are your key metrics for this week:</p>
                  <ul class="mt-2 space-y-1.5 text-muted-color">
                    <li class="flex justify-between">
                      <span>Page views</span>
                      <span class="font-medium text-color">12,482</span>
                    </li>
                    <li class="flex justify-between">
                      <span>New users</span>
                      <span class="font-medium text-color">342</span>
                    </li>
                    <li class="flex justify-between">
                      <span>Bounce rate</span>
                      <span class="font-medium text-color">34%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </SidebarContent>

            <SidebarFooter>
              <div
                class="mx-1 rounded-xl border border-surface-200 dark:border-surface-700 px-3 py-2.5"
              >
                <InputText aria-label="Reply" placeholder="Type a reply…" fluid />
              </div>
            </SidebarFooter>
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>
    </SidebarLayout>
  </div>
</template>
