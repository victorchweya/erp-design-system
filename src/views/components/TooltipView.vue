<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import IconButtonsExample from '@/components/docs/examples/TooltipIconButtonsExample.vue'
import iconButtonsCode from '@/components/docs/examples/TooltipIconButtonsExample.vue?raw'
import FieldExample from '@/components/docs/examples/TooltipExample.vue'
import fieldCode from '@/components/docs/examples/TooltipExample.vue?raw'

const examples = [
  {
    id: 'tooltip-icon-buttons',
    title: 'Icon-only actions',
    description:
      'Show the action name for icon-only buttons. The button still needs its own aria-label; the tooltip only makes the name visible.',
    component: IconButtonsExample,
    code: iconButtonsCode,
  },
  {
    id: 'tooltip-field',
    title: 'Extra help on a field',
    description:
      'A target that already has aria-describedby keeps it, so the tooltip is not announced. Give the tooltip an id and add it to aria-describedby. Keep essential instructions in visible help text.',
    component: FieldExample,
    code: fieldCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'string | { value, ... }',
    default: '—',
    description: 'Tooltip text, or an options object with value and the options below.',
  },
  {
    name: '.top .bottom .left .right',
    type: 'modifier',
    default: '.right',
    description: 'Side of the target where the tooltip appears.',
  },
  {
    name: '.focus .both',
    type: 'modifier',
    default: 'hover',
    description:
      'When the tooltip shows. The default is hover only. Use .both so keyboard users see it on focus too.',
  },
  {
    name: 'id',
    type: 'string',
    default: 'generated',
    description: 'Id of the tooltip element. Set it when you need to reference the tooltip.',
  },
  {
    name: 'showDelay / hideDelay',
    type: 'number',
    default: '0',
    description: 'Delay in milliseconds before the tooltip shows or hides.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Turns the tooltip off without removing the directive.',
  },
]
const accessibility = [
  'A tooltip is announced as a description through aria-describedby. It never replaces a label: name icon-only buttons with aria-label.',
  'The default trigger is hover only. Use .both, or .focus, so people using a keyboard see the tooltip. Escape closes it.',
  'Tooltips cannot be reached with the keyboard. Do not put links, buttons or essential instructions in them; use Popover or visible help text instead.',
  'A disabled button does not receive pointer or focus events, so its tooltip never shows. Explain why an action is unavailable in visible text.',
]
</script>

<template>
  <ComponentDoc
    title="Tooltip"
    componentName="Tooltip"
    category="Overlay"
    description="Show a short, non-essential hint when people hover over or focus an element."
    usage="is a directive, not a component. Import it as vTooltip in each file that uses it, and add .both so it also shows on keyboard focus."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/tooltip"
  />
</template>
