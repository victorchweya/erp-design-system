<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import Home from '@primeicons/vue/home'
import Truck from '@primeicons/vue/truck'
import Bars from '@primeicons/vue/bars'
const id = useId()
const open = shallowRef(false)
const active = shallowRef('Orders')
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-surface">
    <SidebarLayout style="min-height: 20rem; position: relative"
      ><Sidebar :id="id" v-model:open="open" width="12rem" collapsible="icon"
        ><SidebarSpacer /><SidebarAside
          ><SidebarPanel
            ><SidebarHeader><p class="font-medium">Farm to Feed</p></SidebarHeader
            ><SidebarContent
              ><SidebarMenu
                ><SidebarMenuItem
                  ><SidebarMenuButton
                    :isActive="active === 'Orders'"
                    aria-label="Orders"
                    @click="active = 'Orders'"
                    ><Home aria-hidden="true" /><span>Orders</span></SidebarMenuButton
                  ></SidebarMenuItem
                ><SidebarMenuItem
                  ><SidebarMenuButton
                    :isActive="active === 'Deliveries'"
                    aria-label="Deliveries"
                    @click="active = 'Deliveries'"
                    ><Truck aria-hidden="true" /><span>Deliveries</span></SidebarMenuButton
                  ></SidebarMenuItem
                ></SidebarMenu
              ></SidebarContent
            ></SidebarPanel
          ></SidebarAside
        ></Sidebar
      ><SidebarMain class="min-w-0"
        ><div class="flex flex-col gap-4 p-4">
          <SidebarTrigger :target="id" aria-label="Toggle preview navigation" class="self-start"
            ><Bars aria-hidden="true"
          /></SidebarTrigger>
          <p role="status">{{ active }}</p>
        </div></SidebarMain
      ></SidebarLayout
    >
  </div>
</template>
