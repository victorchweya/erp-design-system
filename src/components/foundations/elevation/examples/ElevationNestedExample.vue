<script setup lang="ts">
import { shallowRef, useId } from 'vue'

const id = useId()
const drawerVisible = shallowRef(false)
const dialogVisible = shallowRef(false)
const deliverySlot = shallowRef('Morning')
const reason = shallowRef<string>()
let drawerTrigger: HTMLElement | null = null
let dialogTrigger: HTMLElement | null = null

function openDrawer(event: Event) {
  drawerTrigger = event.currentTarget as HTMLElement
  drawerVisible.value = true
}

function openDialog(event: Event) {
  dialogTrigger = event.currentTarget as HTMLElement
  dialogVisible.value = true
}
</script>

<template>
  <Button
    type="button"
    aria-haspopup="dialog"
    :aria-controls="`${id}-drawer`"
    :aria-expanded="drawerVisible"
    @click="openDrawer"
    >Open order FTF-1042</Button
  >
  <Drawer
    :id="`${id}-drawer`"
    v-model:visible="drawerVisible"
    header="Order FTF-1042"
    position="right"
    class="w-full sm:w-96"
    @after-hide="drawerTrigger?.focus()"
  >
    <div class="flex flex-col gap-4 text-sm">
      <div class="flex flex-col gap-1">
        <span :id="`${id}-slot`" class="font-medium">Delivery slot</span>
        <Select
          v-model="deliverySlot"
          :aria-labelledby="`${id}-slot`"
          :options="['Morning', 'Afternoon', 'Evening']"
          fluid
        />
      </div>
      <Button
        type="button"
        severity="danger"
        outlined
        class="self-start"
        aria-haspopup="dialog"
        :aria-controls="`${id}-dialog`"
        :aria-expanded="dialogVisible"
        @click="openDialog"
        >Cancel order</Button
      >
    </div>
  </Drawer>
  <Dialog
    :id="`${id}-dialog`"
    v-model:visible="dialogVisible"
    modal
    header="Cancel order"
    class="w-[calc(100vw-2rem)] max-w-sm"
    @after-hide="dialogTrigger?.focus()"
  >
    <div class="flex flex-col gap-1 text-sm">
      <span :id="`${id}-reason`" class="font-medium">Reason</span>
      <Select
        v-model="reason"
        :aria-labelledby="`${id}-reason`"
        :options="['Customer request', 'Out of stock', 'Duplicate order']"
        placeholder="Select a reason"
        fluid
      />
    </div>
    <template #footer>
      <Button type="button" severity="secondary" outlined @click="dialogVisible = false"
        >Keep order</Button
      >
      <Button type="button" severity="danger" @click="dialogVisible = false">Cancel order</Button>
    </template>
  </Dialog>
</template>
