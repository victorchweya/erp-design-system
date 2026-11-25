<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import NotFoundPageBlock from '@/components/blocks/error-pages/NotFoundPageBlock.vue'
import notFoundCode from '@/components/blocks/error-pages/NotFoundPageBlock.vue?raw'
import NoAccessPageBlock from '@/components/blocks/error-pages/NoAccessPageBlock.vue'
import noAccessCode from '@/components/blocks/error-pages/NoAccessPageBlock.vue?raw'
import ServerErrorPageBlock from '@/components/blocks/error-pages/ServerErrorPageBlock.vue'
import serverErrorCode from '@/components/blocks/error-pages/ServerErrorPageBlock.vue?raw'
import OfflinePageBlock from '@/components/blocks/error-pages/OfflinePageBlock.vue'
import offlineCode from '@/components/blocks/error-pages/OfflinePageBlock.vue?raw'
import ErrorPage from '@/components/blocks/error-pages/ErrorPage.vue'
import errorPageCode from '@/components/blocks/error-pages/ErrorPage.vue?raw'

const support = {
  headingTag: 'h3',
  homeTo: '/components',
  supportHref: 'mailto:support@example.com',
}

const examples = [
  {
    id: 'not-found',
    title: 'Page not found',
    description:
      'Use when an address does not match any page. Show the requested address as text and offer a route home.',
    component: NotFoundPageBlock,
    props: { ...support, path: '/orders/FTF-1042/invoice' },
    code: notFoundCode,
  },
  {
    id: 'no-access',
    title: 'No access',
    description:
      'Use when the page exists but the account lacks permission. Say who approves access and let the reader request it.',
    component: NoAccessPageBlock,
    props: { ...support, approver: 'Wanjiru Kamau, Operations manager' },
    code: noAccessCode,
  },
  {
    id: 'server-error',
    title: 'Something went wrong',
    description:
      'Use when the server fails unexpectedly. Offer a retry and a reference that support can trace.',
    component: ServerErrorPageBlock,
    props: support,
    code: serverErrorCode,
  },
  {
    id: 'offline',
    title: 'Offline',
    description: 'Use when the device has no connection. Retrying is the only useful action.',
    component: OfflinePageBlock,
    props: { headingTag: 'h3', supportHref: support.supportHref },
    code: offlineCode,
  },
  {
    id: 'maintenance',
    title: 'Planned maintenance',
    description: 'Use during planned downtime. Give the expected return time in the viewer’s local time.',
    component: OfflinePageBlock,
    props: { headingTag: 'h3', variant: 'maintenance', supportHref: support.supportHref },
    code: offlineCode,
  },
  {
    id: 'layout',
    title: 'Shared layout',
    description:
      'Every error page uses the same heading and spacing as empty states, without a card wrapper or brand symbol. Copy it with the page you need, or compose a new case from its icon, details, and actions slots.',
    component: ErrorPage,
    props: {
      headingTag: 'h3',
      heading: 'Heading that says what happened',
      description: 'Explain what is still safe and what the reader can do next.',
    },
    code: errorPageCode,
  },
]

const usage = [
  'Use an error page when the whole page cannot be shown. For a failed section or empty list inside a working page, use an empty state instead.',
  'Use h1 for the heading when the error replaces the page content, and pass headingTag when it sits below an existing page title. Show any address or reference as plain text.',
  'Say what happened without blaming the reader, then give one primary action. Pass supportHref to add Contact support with your team’s support channel.',
]
</script>

<template>
  <BlockDoc
    title="Error pages"
    description="Full-page states for missing pages, missing access, server failures, and downtime."
    :usage="usage"
    :examples="examples"
  />
</template>
