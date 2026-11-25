<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import WorkflowExample from '@/components/blocks/workflow/WorkflowExample.vue'
import ApprovalFlowBlock from '@/components/blocks/workflow/ApprovalFlowBlock.vue'
import approvalBlockCode from '@/components/blocks/workflow/ApprovalFlowBlock.vue?raw'
import approvalHistoryCode from '@/components/blocks/workflow/ApprovalHistory.vue?raw'
import decisionDialogCode from '@/components/blocks/backoffice/decision-dialog/DecisionDialogBlock.vue?raw'
import decisionDialogDataCode from '@/components/blocks/backoffice/decision-dialog/decision-dialog.ts?raw'
import approvalDataCode from '@/components/blocks/workflow/approval-flow.ts?raw'
import SupplierOnboardingBlock from '@/components/blocks/workflow/SupplierOnboardingBlock.vue'
import onboardingBlockCode from '@/components/blocks/workflow/SupplierOnboardingBlock.vue?raw'
import detailsStepCode from '@/components/blocks/workflow/OnboardingDetailsStep.vue?raw'
import produceStepCode from '@/components/blocks/workflow/OnboardingProduceStep.vue?raw'
import payoutStepCode from '@/components/blocks/workflow/OnboardingPayoutStep.vue?raw'
import reviewCode from '@/components/blocks/workflow/OnboardingReview.vue?raw'
import onboardingDataCode from '@/components/blocks/workflow/supplier-onboarding.ts?raw'
import ActivityFeedBlock from '@/components/blocks/workflow/ActivityFeedBlock.vue'
import activityBlockCode from '@/components/blocks/workflow/ActivityFeedBlock.vue?raw'
import activityListCode from '@/components/blocks/workflow/ActivityFeedList.vue?raw'
import auditTableCode from '@/components/blocks/workflow/AuditLogTable.vue?raw'
import activityDataCode from '@/components/blocks/workflow/activity-feed.ts?raw'

const examples = [
  {
    id: 'approval-flow',
    title: 'Approval with status history',
    description:
      'A credit-limit request moves from the requester to the sales manager and finance. Each decision is added to the history with its actor, time, and comment.',
    component: ApprovalFlowBlock,
    files: [
      { name: 'ApprovalFlowBlock.vue', code: approvalBlockCode },
      { name: 'ApprovalHistory.vue', code: approvalHistoryCode },
      { name: 'DecisionDialogBlock.vue', code: decisionDialogCode },
      { name: 'decision-dialog.ts', code: decisionDialogDataCode },
      { name: 'approval-flow.ts', code: approvalDataCode },
    ],
  },
  {
    id: 'supplier-onboarding',
    title: 'Multi-step wizard',
    description:
      'Onboard a farm supplier in four steps. Each step is validated before moving on, and the review step links back to any section.',
    component: SupplierOnboardingBlock,
    files: [
      { name: 'SupplierOnboardingBlock.vue', code: onboardingBlockCode },
      { name: 'OnboardingDetailsStep.vue', code: detailsStepCode },
      { name: 'OnboardingProduceStep.vue', code: produceStepCode },
      { name: 'OnboardingPayoutStep.vue', code: payoutStepCode },
      { name: 'OnboardingReview.vue', code: reviewCode },
      { name: 'supplier-onboarding.ts', code: onboardingDataCode },
    ],
  },
  {
    id: 'activity-feed',
    title: 'Activity feed and audit log',
    description:
      'Review recent changes grouped by day, filter by type or user, and switch to a sortable audit table.',
    component: ActivityFeedBlock,
    files: [
      { name: 'ActivityFeedBlock.vue', code: activityBlockCode },
      { name: 'ActivityFeedList.vue', code: activityListCode },
      { name: 'AuditLogTable.vue', code: auditTableCode },
      { name: 'activity-feed.ts', code: activityDataCode },
    ],
  },
]
const sections = [
  { id: 'how-to-use', label: 'How to use' },
  ...examples.map(({ id, title }) => ({ id, label: title })),
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">UI blocks</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Workflow</h1>
        <p class="text-base leading-relaxed text-muted">
          Patterns for approvals, guided multi-step entry, and the history of changes to a record.
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="how-to-use"
          aria-labelledby="workflow-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="workflow-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted">
            Each pattern has several files. Switch to <Tag severity="secondary">Code</Tag> and use
            <Tag severity="secondary">Source file</Tag> to copy every file into the same folder.
          </p>
          <p class="leading-relaxed text-muted">
            Show actions the viewer cannot take as disabled, with the reason beside them. Ask for
            the reason in the Decision dialog, the same one used across UI blocks, before
            rejecting or sending work back, and record every decision in the history.
          </p>
          <p class="leading-relaxed text-muted">
            Validate each wizard step before moving on, keep entered values when going back, and
            move focus to the new step heading. Status changes are announced to screen readers.
          </p>
          <p class="leading-relaxed text-muted">
            These are local previews. Connect roles, approvals, supplier records, payout
            verification, and audit export to your services before using them in the ERP.
          </p>
        </section>
        <section
          v-for="example in examples"
          :id="example.id"
          :key="example.id"
          :aria-labelledby="`${example.id}-title`"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 :id="`${example.id}-title`" class="text-2xl font-medium">{{ example.title }}</h2>
          <p class="leading-relaxed text-muted">{{ example.description }}</p>
          <WorkflowExample :title="example.title" :files="example.files">
            <component :is="example.component" />
          </WorkflowExample>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
