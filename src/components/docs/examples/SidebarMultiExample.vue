<!-- Adapted from PrimeVue 5.0.5 Sidebar documentation: https://primevue.dev/sidebar -->
<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import logo from '@/assets/brand/logo.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Code from '@primeicons/vue/code'
import Cog from '@primeicons/vue/cog'
import Database from '@primeicons/vue/database'
import ExternalLink from '@primeicons/vue/external-link'
import Globe from '@primeicons/vue/globe'
import Home from '@primeicons/vue/home'
import Key from '@primeicons/vue/key'
import Server from '@primeicons/vue/server'
import SidebarIcon from '@primeicons/vue/sidebar'

const isMobile = ref(false)
const open = ref(false)
const secondaryOpen = ref(true)
let mql: MediaQueryList | null = null
let onMqlChange: ((event: MediaQueryListEvent) => void) | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  mql = window.matchMedia('(max-width: 1023px)')
  isMobile.value = mql.matches
  secondaryOpen.value = !isMobile.value
  onMqlChange = (event) => {
    isMobile.value = event.matches
    secondaryOpen.value = !event.matches
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
      <SidebarBackdrop v-if="isMobile && (open || secondaryOpen)" class="!absolute" />
      <!-- Icon bar - always collapsed, opens on hover as overlay -->
      <Sidebar
        id="iconbar"
        side="left"
        :collapsible="isMobile ? 'offcanvas' : 'icon'"
        :overlay="true"
        :openOnHover="!isMobile"
        width="12rem"
        v-model:open="open"
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
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton :isActive="true" aria-label="Home">
                        <Home aria-hidden="true" />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Database">
                        <Database aria-hidden="true" />
                        <span>Database</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Authentication">
                        <Key aria-hidden="true" />
                        <span>Authentication</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Edge Functions">
                        <Server aria-hidden="true" />
                        <span>Edge Functions</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Storage">
                        <Globe aria-hidden="true" />
                        <span>Storage</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="SQL Editor">
                        <Code aria-hidden="true" />
                        <span>SQL Editor</span>
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

      <!-- Secondary sidebar - always open on desktop, offcanvas on mobile -->
      <Sidebar
        id="secondary"
        side="left"
        width="14rem"
        :collapsible="isMobile ? 'offcanvas' : 'none'"
        :overlay="isMobile"
        v-model:open="secondaryOpen"
      >
        <SidebarSpacer />
        <SidebarAside as="nav" aria-label="Example navigation">
          <SidebarPanel>
            <SidebarHeader>
              <div class="px-1">
                <span class="font-semibold text-sm">Settings</span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Configuration</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton :isActive="true" aria-label="General"
                        ><span>General</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Compute and Disk"
                        ><span>Compute and Disk</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Infrastructure"
                        ><span>Infrastructure</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Integrations"
                        ><span>Integrations</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="API Keys"
                        ><span>API Keys</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="JWT Keys"
                        ><span>JWT Keys</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Log Drains"
                        ><span>Log Drains</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Add-ons"
                        ><span>Add-ons</span></SidebarMenuButton
                      >
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Integrations</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Data API">
                        <span>Data API</span>
                        <ExternalLink aria-hidden="true" class="ml-auto" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Vault">
                        <span>Vault</span>
                        <SidebarMenuBadge>BETA</SidebarMenuBadge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Billing</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Subscription">
                        <span>Subscription</span>
                        <ExternalLink aria-hidden="true" class="ml-auto" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton aria-label="Usage">
                        <span>Usage</span>
                        <ExternalLink aria-hidden="true" class="ml-auto" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>

      <!-- Main content -->
      <SidebarMain>
        <header
          class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
        >
          <SidebarTrigger
            v-if="isMobile"
            target="iconbar"
            severity="secondary"
            :text="true"
            size="small"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon aria-hidden="true" />
          </SidebarTrigger>
          <SidebarTrigger
            v-if="isMobile"
            target="secondary"
            severity="secondary"
            :text="true"
            size="small"
            aria-label="Toggle sidebar"
          >
            <Cog aria-hidden="true" />
          </SidebarTrigger>
          <span class="text-sm font-medium">Table Editor</span>
          <span class="text-xs text-muted-color">/ users</span>
        </header>
        <div class="flex-1 p-4 flex flex-col gap-4">
          <div class="rounded-lg bg-surface-100 dark:bg-surface-800 h-48"></div>
          <div class="rounded-lg bg-surface-100 dark:bg-surface-800 flex-1"></div>
        </div>
      </SidebarMain>
    </SidebarLayout>
  </div>
</template>
