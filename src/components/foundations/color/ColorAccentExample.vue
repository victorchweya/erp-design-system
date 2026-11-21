<script setup lang="ts">
import Check from '@primeicons/vue/check'
import Truck from '@primeicons/vue/truck'
import ExclamationCircle from '@primeicons/vue/exclamation-circle'
import Pencil from '@primeicons/vue/pencil'

// Each colour role in context: a solid status, a live step, and a Cream decision panel.
const steps = [
  { label: 'Ordered', time: '06:10', state: 'done' },
  { label: 'Packed', time: '07:45', state: 'done' },
  { label: 'On the way', time: '08:20', state: 'live' },
  { label: 'Delivered', time: '–', state: 'upcoming' },
] as const
</script>

<template>
  <div class="grid gap-4 text-sm lg:grid-cols-2">
    <div class="flex flex-col gap-4 rounded-border border border-surface p-4">
      <div class="flex items-center justify-between gap-3">
        <p
          class="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-color"
        >
          <Truck aria-hidden="true" />Order FTF-1049
        </p>
        <Tag value="On the way" class="bg-primary text-primary-contrast" />
      </div>
      <ol class="grid grid-cols-4 gap-2" aria-label="Delivery progress">
        <li
          v-for="step in steps"
          :key="step.label"
          class="flex flex-col items-center gap-1 text-center"
          :aria-current="step.state === 'live' ? 'step' : undefined"
        >
          <span
            class="flex size-6 shrink-0 items-center justify-center rounded-full"
            :class="{
              'bg-primary text-primary-contrast': step.state === 'done',
              'border-2 border-live': step.state === 'live',
              'border border-surface': step.state === 'upcoming',
            }"
            aria-hidden="true"
          >
            <Check v-if="step.state === 'done'" class="size-3" />
            <span v-else-if="step.state === 'live'" class="size-2 rounded-full bg-live" />
          </span>
          <span :class="step.state === 'upcoming' ? 'text-muted-color' : 'font-medium'">{{
            step.label
          }}</span>
          <span
            class="font-mono text-xs"
            :class="step.state === 'live' ? 'text-live' : 'text-muted-color'"
            >{{ step.state === 'live' ? `now · ${step.time}` : step.time }}</span
          >
        </li>
      </ol>
      <div class="flex flex-col gap-1 border-t border-surface pt-3">
        <p
          class="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-color"
        >
          <Pencil aria-hidden="true" />Driver note
        </p>
        <p>“Gate B is closed this morning. Delivering to the side entrance.”</p>
      </div>
    </div>

    <section
      aria-labelledby="accent-decision-title"
      class="flex flex-col gap-3 rounded-border border border-note bg-note p-4 text-note"
    >
      <h3
        id="accent-decision-title"
        class="flex items-center gap-2 text-xs font-medium uppercase tracking-wide"
      >
        <ExclamationCircle aria-hidden="true" />Price change · awaiting you
      </h3>
      <p>Kinangop Highland Growers raised carrots from Ksh 62 to Ksh 68 per kg for PO-2026-0233.</p>
      <dl class="flex flex-col gap-2 border-t border-note pt-3">
        <div class="flex justify-between gap-4">
          <dt>Original order</dt>
          <dd class="tabular-nums">Ksh 24,800</dd>
        </div>
        <div class="flex justify-between gap-4 text-base font-medium">
          <dt>New total</dt>
          <dd class="tabular-nums">Ksh 27,200</dd>
        </div>
      </dl>
      <div class="flex flex-wrap gap-2">
        <Button type="button" label="Approve new price" />
        <Button type="button" label="Decline" severity="secondary" outlined />
      </div>
    </section>
  </div>
</template>
