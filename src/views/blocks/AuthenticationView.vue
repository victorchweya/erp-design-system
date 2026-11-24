<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import SignInBlock from '@/components/blocks/authentication/SignInBlock.vue'
import signInCode from '@/components/blocks/authentication/SignInBlock.vue?raw'
import SignUpBlock from '@/components/blocks/authentication/SignUpBlock.vue'
import signUpCode from '@/components/blocks/authentication/SignUpBlock.vue?raw'
import ForgotPasswordBlock from '@/components/blocks/authentication/ForgotPasswordBlock.vue'
import forgotPasswordCode from '@/components/blocks/authentication/ForgotPasswordBlock.vue?raw'
import ResetPasswordBlock from '@/components/blocks/authentication/ResetPasswordBlock.vue'
import resetPasswordCode from '@/components/blocks/authentication/ResetPasswordBlock.vue?raw'
import EmailVerificationBlock from '@/components/blocks/authentication/EmailVerificationBlock.vue'
import emailVerificationCode from '@/components/blocks/authentication/EmailVerificationBlock.vue?raw'
import TwoFactorBlock from '@/components/blocks/authentication/TwoFactorBlock.vue'
import twoFactorCode from '@/components/blocks/authentication/TwoFactorBlock.vue?raw'

const examples = [
  {
    id: 'sign-in',
    title: 'Sign in',
    description: 'Email and password login with a password reveal control and recovery links.',
    component: SignInBlock,
    code: signInCode,
  },
  {
    id: 'sign-up',
    title: 'Sign up',
    description: 'Account creation with a name, email, and new password.',
    component: SignUpBlock,
    code: signUpCode,
  },
  {
    id: 'forgot-password',
    title: 'Forgot password',
    description: 'Request a reset link with the same response whether an account exists or not.',
    component: ForgotPasswordBlock,
    code: forgotPasswordCode,
  },
  {
    id: 'reset-password',
    title: 'Reset password',
    description: 'Set and confirm a new password after opening a valid reset link.',
    component: ResetPasswordBlock,
    code: resetPasswordCode,
  },
  {
    id: 'email-verification',
    title: 'Email verification',
    description: 'An inbox reminder with an option to resend the verification email.',
    component: EmailVerificationBlock,
    code: emailVerificationCode,
  },
  {
    id: 'two-factor',
    title: 'Two-factor authentication',
    description: 'A six-digit authenticator challenge with paste support and labelled code fields.',
    component: TwoFactorBlock,
    code: twoFactorCode,
  },
]
const usage = [
  'Use the full auth block, including the brand symbol and card spacing. Links jump between examples here; replace them with your application routes.',
  'These previews only validate input locally. Connect sign-in, account creation, reset links, email verification, and code verification to your authentication service. Keep secrets out of URLs, logs, and browser storage.',
  'New passwords use a 12-character minimum in these examples. Match your service’s policy and enforce it on the server. Sign in accepts existing passwords without applying the new-password policy.',
  'Keep reset and resend responses generic. Your service must validate expiring, single-use tokens, manage sessions, and limit repeated attempts and email requests.',
]
</script>

<template>
  <BlockDoc
    title="Authentication"
    description="Reusable account access and recovery pages, built with native PrimeVue cards and forms."
    :usage="usage"
    :examples="examples"
  />
</template>
