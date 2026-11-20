<script setup lang="ts">
const guidance = [
  {
    indicator: 'Skeleton',
    when: 'First load of a page, table, or card whose layout is known.',
    example: 'Opening the orders list or a supplier record.',
  },
  {
    indicator: 'Spinner',
    when: 'A small area loads with an unknown layout, and only after about 300 ms.',
    example: 'Looking up a customer’s credit in a side panel.',
  },
  {
    indicator: 'Button state',
    when: 'An action the user started is saving. Keep the label visible and block repeats.',
    example: 'Confirm dispatch, Approve invoice.',
  },
  {
    indicator: 'Indeterminate bar',
    when: 'Existing content is being refreshed and should stay readable.',
    example: 'Refreshing today’s delivery runs.',
  },
  {
    indicator: 'Progress bar',
    when: 'Work with measurable steps that takes more than a few seconds.',
    example: 'Importing 120 price lines or uploading delivery notes.',
  },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[36rem] border-collapse text-left">
        <caption class="sr-only">
          Which loading indicator to use
        </caption>
        <thead>
          <tr class="border-b border-surface">
            <th scope="col" class="p-2 font-medium">Indicator</th>
            <th scope="col" class="p-2 font-medium">Use when</th>
            <th scope="col" class="p-2 font-medium">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in guidance" :key="row.indicator" class="border-b border-surface">
            <th scope="row" class="p-2 align-top font-medium">{{ row.indicator }}</th>
            <td class="p-2 align-top text-muted">{{ row.when }}</td>
            <td class="p-2 align-top text-muted">{{ row.example }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex max-w-md flex-col gap-2">
      <div class="flex justify-between gap-3">
        <span id="import-progress-label" class="font-medium">Importing price list</span>
        <span class="text-muted">72 of 120 lines</span>
      </div>
      <ProgressBar :value="60" aria-labelledby="import-progress-label" />
    </div>
  </div>
</template>
