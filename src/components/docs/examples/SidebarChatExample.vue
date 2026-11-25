<!-- Adapted from PrimeVue 5.0.5 Sidebar documentation: https://primevue.dev/sidebar -->
<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import logo from '@/assets/brand/logo.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Globe from '@primeicons/vue/globe'
import PenToSquare from '@primeicons/vue/pen-to-square'
import Search from '@primeicons/vue/search'
import SidebarIcon from '@primeicons/vue/sidebar'
import Trash from '@primeicons/vue/trash'

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

const chatHistory = [
  {
    label: 'Today',
    chats: [
      {
        title: 'PrimeVue Sidebar component',
        active: true,
      },
      { title: 'How to use Vue composables' },
      { title: 'Fix TypeScript generics issue' },
    ],
  },
  {
    label: 'Yesterday',
    chats: [
      { title: 'Design system architecture' },
      { title: 'Vue 3 new features overview' },
      { title: 'CSS light-dark() function usage' },
    ],
  },
  {
    label: 'Previous 7 days',
    chats: [
      { title: 'Build a dashboard layout' },
      { title: 'Tailwind v4 migration guide' },
      { title: 'Node.js API authentication' },
      { title: 'Monorepo setup with pnpm' },
      { title: 'Deploy Nuxt to Vercel' },
    ],
  },
  {
    label: 'Previous 30 days',
    chats: [
      { title: 'GraphQL schema design' },
      { title: 'WebSocket real-time updates' },
      { title: 'PostgreSQL query optimization' },
      { title: 'Docker compose for dev env' },
    ],
  },
]
</script>

<template>
  <div class="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
    <SidebarLayout class="!min-h-0 h-[36rem] !relative isolate">
      <SidebarBackdrop v-if="isMobile && open" class="!absolute" />
      <Sidebar
        id="chat-history"
        :collapsible="isMobile ? 'offcanvas' : 'icon'"
        :overlay="isMobile"
        v-model:open="open"
        width="16rem"
      >
        <SidebarSpacer />
        <SidebarAside as="nav" aria-label="Example navigation">
          <SidebarPanel>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton class="!p-1" aria-label="Ask Sprout">
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
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton aria-label="Search">
                    <Search aria-hidden="true" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton aria-label="New chat">
                    <PenToSquare aria-hidden="true" />
                    <span>New chat</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton aria-label="Browse web">
                    <Globe aria-hidden="true" />
                    <span>Browse web</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup v-for="group in chatHistory" :key="group.label">
                <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="chat in group.chats" :key="chat.title">
                      <SidebarMenuButton :isActive="!!chat.active" :aria-label="chat.title">
                        <span>{{ chat.title }}</span>
                      </SidebarMenuButton>
                      <SidebarMenuAction :showOnHover="true" :aria-label="`Delete ${chat.title}`">
                        <Trash aria-hidden="true" />
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
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>

      <SidebarMain>
        <header
          class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
        >
          <SidebarTrigger
            severity="secondary"
            target="chat-history"
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
