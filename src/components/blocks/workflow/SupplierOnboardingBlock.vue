<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, useId, watch } from 'vue'
import CheckCircle from '@primeicons/vue/check-circle'
import OnboardingDetailsStep from './OnboardingDetailsStep.vue'
import OnboardingProduceStep from './OnboardingProduceStep.vue'
import OnboardingPayoutStep from './OnboardingPayoutStep.vue'
import OnboardingReview from './OnboardingReview.vue'
import {
  emptyDraft,
  steps,
  type FarmDetails,
  type PayoutDetails,
  type ProduceCapacity,
  type StepValue,
} from './supplier-onboarding'

const id = useId()
const active = shallowRef<StepValue>('details')
const draft = ref(emptyDraft())
const returnToReview = shallowRef(false)
const formKey = shallowRef(0)
const submitting = shallowRef(false)
const reference = shallowRef('')
const announcement = shallowRef('')

const activeIndex = computed(() => steps.findIndex((step) => step.value === active.value))
const nextLabel = computed(() => {
  const next = steps[activeIndex.value + 1]
  return returnToReview.value || !next ? 'Save and review' : `Next: ${next.title}`
})
const headingId = (step: StepValue | 'done') => `${id}-${step}-heading`
const focusHeading = (step: StepValue | 'done') =>
  nextTick(() => document.getElementById(headingId(step))?.focus())

watch(active, (step) => {
  const index = steps.findIndex((item) => item.value === step)
  announcement.value = `Step ${index + 1} of ${steps.length}: ${steps[index]!.title}`
  focusHeading(step)
})

function goTo(step: StepValue) {
  // Leaving review (Edit, Back, or a step header) returns there on the next save.
  if (active.value === 'review' && step !== 'review') returnToReview.value = true
  if (step === 'review') returnToReview.value = false
  active.value = step
}
function advance(next: StepValue) {
  goTo(returnToReview.value ? 'review' : next)
}
function back() {
  goTo(steps[Math.max(activeIndex.value - 1, 0)]!.value)
}
function saveDetails(values: FarmDetails) {
  draft.value.details = values
  advance('produce')
}
function saveProduce(values: ProduceCapacity) {
  draft.value.produce = values
  advance('payout')
}
function savePayout(values: PayoutDetails) {
  draft.value.payout = values
  advance('review')
}
function submit() {
  submitting.value = true
  window.setTimeout(() => {
    submitting.value = false
    reference.value = 'SUP-0457'
    announcement.value = `${draft.value.details.farmName} submitted for verification.`
    focusHeading('done')
  }, 600)
}
function restart() {
  draft.value = emptyDraft()
  formKey.value += 1
  reference.value = ''
  returnToReview.value = false
  active.value = 'details'
}
</script>

<template>
  <Card>
    <template #title><h3 class="text-xl font-medium">Onboard a farm supplier</h3></template>
    <template #subtitle>Collect the details procurement needs before the first purchase.</template>
    <template #content>
      <div v-if="reference" class="flex flex-col items-start gap-4 text-sm">
        <h4
          :id="headingId('done')"
          tabindex="-1"
          class="flex items-center gap-2 text-lg font-medium focus:outline-none"
        >
          <CheckCircle class="text-success" aria-hidden="true" />Supplier submitted
        </h4>
        <p class="text-muted">
          {{ draft.details.farmName }} is waiting for verification under reference {{ reference }}.
          We’ll send an SMS to {{ draft.details.phone }} when it is approved.
        </p>
        <Button type="button" severity="secondary" outlined @click="restart"
          >Onboard another supplier</Button
        >
      </div>
      <Stepper
        v-else
        :key="formKey"
        :value="active"
        aria-label="Supplier onboarding"
        @update:value="goTo($event as StepValue)"
      >
        <StepList>
          <Step
            v-for="(step, index) in steps"
            :key="step.value"
            :value="step.value"
            :disabled="index > activeIndex"
            ><span class="sr-only sm:not-sr-only">{{ step.title }}</span></Step
          >
        </StepList>
        <StepPanels>
          <StepPanel v-for="step in steps" :key="step.value" :value="step.value">
            <div class="flex flex-col gap-6">
              <header class="flex flex-col gap-1 text-sm">
                <h4
                  :id="headingId(step.value)"
                  tabindex="-1"
                  class="text-lg font-medium focus:outline-none"
                >
                  {{ step.title }}
                </h4>
                <p class="text-muted">{{ step.description }}</p>
              </header>
              <OnboardingDetailsStep
                v-if="step.value === 'details'"
                :initialValues="draft.details"
                :nextLabel="nextLabel"
                @next="saveDetails"
              />
              <OnboardingProduceStep
                v-else-if="step.value === 'produce'"
                :initialValues="draft.produce"
                :nextLabel="nextLabel"
                @next="saveProduce"
                @back="back"
              />
              <OnboardingPayoutStep
                v-else-if="step.value === 'payout'"
                :initialValues="draft.payout"
                :nextLabel="nextLabel"
                @next="savePayout"
                @back="back"
              />
              <OnboardingReview
                v-else
                :draft="draft"
                :submitting="submitting"
                @edit="goTo"
                @back="back"
                @submit="submit"
              />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
      <p role="status" class="sr-only">{{ announcement }}</p>
    </template>
  </Card>
</template>
