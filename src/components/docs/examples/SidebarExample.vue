<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'
import Users from '@primeicons/vue/users'
import Receipt from '@primeicons/vue/receipt'
import Cog from '@primeicons/vue/cog'
import Bars from '@primeicons/vue/bars'

const id = useId()
const open = shallowRef(true)
const active = shallowRef('Purchase orders')
const groups = [
  {
    label: 'Procurement',
    items: [
      { label: 'Purchase orders', icon: ShoppingCart },
      { label: 'Suppliers', icon: Users },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Deliveries', icon: Truck },
      { label: 'Invoices', icon: Receipt },
    ],
  },
]
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-surface">
    <SidebarLayout class="relative min-h-80">
      <Sidebar :id="id" v-model:open="open" width="14rem" collapsible="icon">
        <SidebarSpacer />
        <SidebarAside as="nav" aria-label="Preview navigation">
          <SidebarPanel>
            <SidebarHeader>
              <p class="truncate px-2 font-medium">Farm to Feed</p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup v-for="group in groups" :key="group.label">
                <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in group.items" :key="item.label">
                      <!-- The label is hidden in icon mode, so aria-label keeps the button named. -->
                      <SidebarMenuButton
                        :isActive="active === item.label"
                        :aria-label="item.label"
                        :aria-current="active === item.label ? 'page' : undefined"
                        @click="active = item.label"
                      >
                        <component :is="item.icon" aria-hidden="true" />
                        <span>{{ item.label }}</span>
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
                    :isActive="active === 'Settings'"
                    aria-label="Settings"
                    :aria-current="active === 'Settings' ? 'page' : undefined"
                    @click="active = 'Settings'"
                  >
                    <Cog aria-hidden="true" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>
      <SidebarMain class="min-w-0">
        <div class="flex flex-col gap-4 p-4">
          <SidebarTrigger
            :target="id"
            severity="secondary"
            text
            size="small"
            aria-label="Toggle navigation"
            class="self-start"
          >
            <Bars aria-hidden="true" />
          </SidebarTrigger>
          <p role="status" class="text-sm">{{ active }} page shown in this preview.</p>
        </div>
      </SidebarMain>
    </SidebarLayout>
  </div>
</template>
