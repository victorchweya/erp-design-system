<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import DecisionDialogExample from '@/components/blocks/backoffice/decision-dialog/DecisionDialogExample.vue'
// The Code tab shows the reusable block. The example only wires it to a fake save.
import code from '@/components/blocks/backoffice/decision-dialog/DecisionDialogBlock.vue?raw'

const examples = [
  {
    id: 'reject-price-change',
    title: 'Reject with a required reason',
    description: 'Confirm stays off until the reason is long enough.',
    component: DecisionDialogExample,
    code,
    props: {
      kind: 'reject',
      subject: 'price change',
      record: {
        reference: 'FTF-2207',
        summary: 'Tomatoes grade A, Ksh 95 to Ksh 120 per kg, Nairobi wholesale',
      },
    },
  },
  {
    id: 'reverse-stock-adjustment',
    title: 'Reverse a destructive action',
    description: 'Destructive decisions confirm with the danger button.',
    component: DecisionDialogExample,
    code,
    props: {
      kind: 'reverse',
      subject: 'stock adjustment',
      record: {
        reference: 'FTF-4410',
        summary: 'Spoilage write-off, 18 crates of kale, Kiambu cold room',
      },
      actor: 'Brian O.',
    },
  },
  {
    id: 'approve-with-note',
    title: 'Approve with an optional note',
    description: 'Approving is ready straight away, and the note is optional.',
    component: DecisionDialogExample,
    code,
    props: {
      kind: 'approve',
      subject: 'credit limit',
      record: {
        reference: 'FTF-2081',
        summary: 'Green Basket Kitchen, Ksh 100,000 to Ksh 250,000',
      },
      actor: 'Grace M.',
    },
  },
]
const usage = [
  'Use DecisionDialogBlock for every decision that needs a reason: approve, reject, request changes, cancel, reverse or reopen. Do not build a separate reason dialog. Set kind and subject: the title, button label, danger styling and whether a reason is required follow from them. The wording lives in decision-dialog.ts.',
  'Bind v-model:visible, pass the affected record, and handle confirm, which emits the trimmed reason. Set busy while saving, close on success, and keep the dialog open on failure so the reason is not lost.',
  'One line under the field holds the hint and turns into the error after the person leaves the field, so the message is never repeated. Escape closes the dialog only while the reason is empty; Cancel discards typed text. Each opening starts empty.',
  'After saving, show DecisionStamp on the record: who decided, when, and the reason, as plain text.',
]
</script>

<template>
  <BlockDoc
    eyebrow="UI blocks"
    title="Decision dialog"
    description="The one dialog for approving, rejecting, requesting changes to, cancelling, reversing or reopening a record, with a reason and a clear record of who decided."
    :usage="usage"
    :examples="examples"
  />
</template>
