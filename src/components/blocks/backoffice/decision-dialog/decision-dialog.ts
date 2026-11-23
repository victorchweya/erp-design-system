import type { Component } from 'vue'
import Ban from '@primeicons/vue/ban'
import CheckCircle from '@primeicons/vue/check-circle'
import Replay from '@primeicons/vue/replay'
import TimesCircle from '@primeicons/vue/times-circle'
import Pencil from '@primeicons/vue/pencil'
import Undo from '@primeicons/vue/undo'

export type DecisionKind = 'approve' | 'reject' | 'changes' | 'cancel' | 'reverse' | 'reopen'

export interface DecisionRecord {
  /** Record reference, for example FTF-4410. */
  reference: string
  /** One line saying what the decision affects. */
  summary: string
}

interface DecisionKindCopy {
  /** Verb used for the title and confirm button, followed by the subject. */
  verb: string
  /** The verb already says what is decided, so the subject is not added: "Request changes". */
  standalone?: boolean
  /** Past tense used by the audit stamp. */
  past: string
  /** Visible label of the reason field. */
  reasonLabel: string
  /** Small icon on the audit stamp; the past-tense verb always carries the meaning too. */
  icon: Component
  /** Why the reason is asked for, in one short sentence that fits beside the counter. */
  hint: string
  /** Name of the saved text, read by screen readers on the audit stamp. */
  stampLabel: string
  required: boolean
  /** Destructive decisions use the danger button. */
  destructive: boolean
}

export const decisionKinds: Record<DecisionKind, DecisionKindCopy> = {
  approve: {
    icon: CheckCircle,
    verb: 'Approve',
    past: 'Approved',
    reasonLabel: 'Note (optional)',
    hint: 'Optional. Saved with the approval.',
    stampLabel: 'Note',
    required: false,
    destructive: false,
  },
  reject: {
    icon: TimesCircle,
    verb: 'Reject',
    past: 'Rejected',
    reasonLabel: 'Reason for rejecting',
    hint: 'The requester sees this on the record.',
    stampLabel: 'Reason',
    required: true,
    destructive: true,
  },
  changes: {
    icon: Pencil,
    verb: 'Request changes',
    standalone: true,
    past: 'Changes requested',
    reasonLabel: 'What needs to change?',
    hint: 'The requester sees this before resubmitting.',
    stampLabel: 'Changes needed',
    required: true,
    destructive: false,
  },
  cancel: {
    icon: Ban,
    verb: 'Cancel',
    past: 'Cancelled',
    reasonLabel: 'Reason for cancelling',
    hint: 'Others see why this was cancelled.',
    stampLabel: 'Reason',
    required: true,
    destructive: true,
  },
  reverse: {
    icon: Undo,
    verb: 'Reverse',
    past: 'Reversed',
    reasonLabel: 'Reason for reversing',
    hint: 'Saved with your name and the time.',
    stampLabel: 'Reason',
    required: true,
    destructive: true,
  },
  reopen: {
    icon: Replay,
    verb: 'Reopen',
    past: 'Reopened',
    reasonLabel: 'Reason for reopening',
    hint: 'Saved with your name and the time.',
    stampLabel: 'Reason',
    required: true,
    destructive: false,
  },
}

/** Title of the dialog and label of its confirm button, for example "Reject price change". */
export function decisionTitle(kind: DecisionKind, subject: string) {
  const { verb, standalone } = decisionKinds[kind]
  return standalone ? verb : `${verb} ${subject}`
}
