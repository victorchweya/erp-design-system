<script setup lang="ts">
// From PrimeVue 5.0.5 accessibility docs. Tabs Home/End follow the component source.
const rows = [
  { component: 'DataTable', keys: ['Tab'], action: 'Moves through sortable headers and buttons.' },
  { component: 'DataTable', keys: ['Enter', 'Space'], action: 'Sorts the focused column.' },
  {
    component: 'DataTable',
    keys: ['↑', '↓', 'Home', 'End'],
    action: 'Moves between rows when selection is enabled.',
  },
  { component: 'DataTable', keys: ['Space'], action: 'Toggles selection of the focused row.' },
  { component: 'Select', keys: ['Enter', 'Space', '↓'], action: 'Opens the list.' },
  { component: 'Select', keys: ['↑', '↓'], action: 'Moves between options.' },
  { component: 'Select', keys: ['Enter'], action: 'Selects the option and closes the list.' },
  { component: 'Select', keys: ['Esc'], action: 'Closes the list and returns focus to Select.' },
  {
    component: 'Menu (popup)',
    keys: ['↑', '↓', 'Home', 'End'],
    action: 'Moves between items.',
  },
  {
    component: 'Menu (popup)',
    keys: ['Enter', 'Space'],
    action: 'Runs the item, closes the menu, and returns focus to the trigger.',
  },
  {
    component: 'Menu (popup)',
    keys: ['Esc'],
    action: 'Closes the menu and returns focus to the trigger.',
  },
  {
    component: 'Dialog',
    keys: ['Tab', 'Shift + Tab'],
    action: 'Keeps focus inside a modal dialog.',
  },
  {
    component: 'Dialog',
    keys: ['Esc'],
    action: 'Closes the dialog unless closeOnEscape is false.',
  },
  { component: 'Tabs', keys: ['←', '→'], action: 'Moves between tabs, wrapping at each end.' },
  { component: 'Tabs', keys: ['Home', 'End'], action: 'Moves to the first or last tab.' },
  { component: 'Tabs', keys: ['Enter', 'Space'], action: 'Activates the focused tab.' },
  {
    component: 'DatePicker',
    keys: ['←', '→', '↑', '↓'],
    action: 'Moves by day or week in the calendar.',
  },
  {
    component: 'DatePicker',
    keys: ['Page Up', 'Page Down'],
    action: 'Moves to the previous or next month; add Shift for a year.',
  },
  { component: 'DatePicker', keys: ['Enter'], action: 'Selects the date and closes the calendar.' },
  {
    component: 'DatePicker',
    keys: ['Esc'],
    action: 'Closes the calendar and returns focus to the input.',
  },
]
</script>

<template>
  <DataTable
    :value="rows"
    rowGroupMode="rowspan"
    groupRowsBy="component"
    size="small"
    showGridlines
    aria-label="Keyboard support for common ERP components"
  >
    <Column field="component" header="Component"
      ><template #body="{ data }"
        ><span class="font-medium">{{ data.component }}</span></template
      ></Column
    >
    <Column header="Keys"
      ><template #body="{ data }"
        ><span class="flex flex-wrap gap-1"
          ><kbd
            v-for="key in data.keys"
            :key="key"
            class="whitespace-nowrap rounded-sm border border-surface bg-emphasis px-1.5 py-0.5 font-sans text-xs"
            >{{ key }}</kbd
          ></span
        ></template
      ></Column
    >
    <Column field="action" header="Behaviour" />
  </DataTable>
</template>
