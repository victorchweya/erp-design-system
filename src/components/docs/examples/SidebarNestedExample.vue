<!-- Adapted from PrimeVue 5.0.5 Sidebar documentation: https://primevue.dev/sidebar -->
<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import logo from '@/assets/brand/logo.svg'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ChevronDown from '@primeicons/vue/chevron-down'
import Folder from '@primeicons/vue/folder'
import Globe from '@primeicons/vue/globe'
import ImageIcon from '@primeicons/vue/image'
import SidebarIcon from '@primeicons/vue/sidebar'
import Video from '@primeicons/vue/video'

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
        id="nested"
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
                  <SidebarMenuButton class="!p-1" aria-label="File Manager">
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
                <SidebarGroupLabel>Files</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem :collapsible="true" :defaultOpen="true">
                      <SidebarMenuButton aria-label="Documents">
                        <Folder aria-hidden="true" />
                        <span>Documents</span>
                        <ChevronDown
                          aria-hidden="true"
                          class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                        />
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuItem :collapsible="true" :defaultOpen="true">
                          <SidebarMenuButton aria-label="Work">
                            <span>Work</span>
                            <ChevronDown
                              aria-hidden="true"
                              class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                            />
                          </SidebarMenuButton>
                          <SidebarMenuSub>
                            <SidebarMenuItem :collapsible="true" :defaultOpen="true">
                              <SidebarMenuButton aria-label="Projects">
                                <span>Projects</span>
                                <ChevronDown
                                  aria-hidden="true"
                                  class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                                />
                              </SidebarMenuButton>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton :isActive="true">
                                    <span>Q1 Report</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton>
                                    <span>Q2 Report</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton>
                                    <span>Roadmap</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </SidebarMenuItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton>
                                <span>Invoices</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton>
                                <span>Contracts</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </SidebarMenuItem>
                        <SidebarMenuItem :collapsible="true">
                          <SidebarMenuButton aria-label="Personal">
                            <span>Personal</span>
                            <ChevronDown
                              aria-hidden="true"
                              class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                            />
                          </SidebarMenuButton>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton>
                                <span>Recipes</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton>
                                <span>Travel</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </SidebarMenuItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Media</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem :collapsible="true">
                      <SidebarMenuButton aria-label="Photos">
                        <ImageIcon aria-hidden="true" />
                        <span>Photos</span>
                        <ChevronDown
                          aria-hidden="true"
                          class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                        />
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>2024</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>2025</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                    <SidebarMenuItem :collapsible="true">
                      <SidebarMenuButton aria-label="Videos">
                        <Video aria-hidden="true" />
                        <span>Videos</span>
                        <ChevronDown
                          aria-hidden="true"
                          class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                        />
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Tutorials</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Recordings</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Bookmarks</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem :collapsible="true">
                      <SidebarMenuButton aria-label="Websites">
                        <Globe aria-hidden="true" />
                        <span>Websites</span>
                        <ChevronDown
                          aria-hidden="true"
                          class="ml-auto transition-transform duration-200 [[data-open]>&]:rotate-180"
                        />
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Blog</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Portfolio</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <span>Documentation</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
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

      <SidebarMain>
        <header
          class="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4"
        >
          <SidebarTrigger
            severity="secondary"
            target="nested"
            :text="true"
            size="small"
            aria-label="Toggle sidebar"
          >
            <SidebarIcon aria-hidden="true" />
          </SidebarTrigger>
          <span class="text-sm font-medium">File Manager</span>
        </header>
        <div class="flex-1 p-6">
          <h3 class="text-2xl font-bold mb-4">Q1 Report</h3>
          <p class="text-muted-color">Documents &gt; Work &gt; Projects &gt; Q1 Report</p>
        </div>
      </SidebarMain>
    </SidebarLayout>
  </div>
</template>
