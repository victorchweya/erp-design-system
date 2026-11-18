import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { defineComponent } from 'vue'
import SignInBlock from '../authentication/SignInBlock.vue'
import SignUpBlock from '../authentication/SignUpBlock.vue'
import ForgotPasswordBlock from '../authentication/ForgotPasswordBlock.vue'
import ResetPasswordBlock from '../authentication/ResetPasswordBlock.vue'
import EmailVerificationBlock from '../authentication/EmailVerificationBlock.vue'
import TwoFactorBlock from '../authentication/TwoFactorBlock.vue'

enableAutoUnmount(afterEach)
const options = { global: { plugins: [PrimeVue] }, attachTo: document.body }
async function submit(wrapper: VueWrapper) {
  await wrapper.get('form').trigger('submit')
  await flushPromises()
}

it('validates sign-in fields without imposing the new-password policy or changing the password', async () => {
  const wrapper = mount(SignInBlock, options)
  await submit(wrapper)
  expect(wrapper.findAll('[role="alert"]')).toHaveLength(2)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  const password = wrapper.get<HTMLInputElement>('input[name="password"]')
  await wrapper.get('input[name="email"]').setValue('invalid')
  await password.setValue(' old ')
  await submit(wrapper)
  expect(wrapper.findAll('[role="alert"]')).toHaveLength(1)
  await wrapper.get('input[name="email"]').setValue('team@example.com')
  await wrapper.get('button[aria-controls]').trigger('click')
  expect(password.attributes('type')).toBe('text')
  expect(password.element.value).toBe(' old ')
  expect(wrapper.get('button[aria-controls]').attributes('aria-pressed')).toBe('true')
  await submit(wrapper)
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).not.toBe('')
  expect(wrapper.get('[role="status"]').text()).not.toContain('old')
  await password.setValue('changed')
  expect(wrapper.get('[role="status"]').text()).toBe('')
})

it('requires a name, valid email, and a sufficiently long new password for sign-up', async () => {
  const wrapper = mount(SignUpBlock, options)
  await wrapper.get('input[name="name"]').setValue('   ')
  await wrapper.get('input[name="email"]').setValue('invalid')
  await wrapper.get('input[name="password"]').setValue('short')
  await submit(wrapper)
  expect(wrapper.findAll('[role="alert"]')).toHaveLength(3)
  await wrapper.get('input[name="name"]').setValue('Sam Grower')
  await wrapper.get('input[name="email"]').setValue('sam@example.com')
  await wrapper.get('input[name="password"]').setValue('a long passphrase')
  await submit(wrapper)
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).not.toBe('')
  expect(wrapper.text()).not.toContain('a long passphrase')
})

it('keeps password-recovery feedback generic for different email addresses', async () => {
  const wrapper = mount(ForgotPasswordBlock, options)
  await submit(wrapper)
  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await wrapper.get('input').setValue('known@example.com')
  await submit(wrapper)
  const feedback = wrapper.get('[role="status"]').text()
  expect(feedback).not.toBe('')
  await wrapper.get('input').setValue('unknown@example.com')
  await submit(wrapper)
  expect(wrapper.get('[role="status"]').text()).toBe(feedback)
})

it('requires matching new passwords and preserves significant whitespace', async () => {
  const wrapper = mount(ResetPasswordBlock, options)
  await wrapper.get('input[name="password"]').setValue('short')
  await wrapper.get('input[name="confirmation"]').setValue('short')
  await submit(wrapper)
  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  await wrapper.get('input[name="password"]').setValue(' a long passphrase ')
  await wrapper.get('input[name="confirmation"]').setValue('a long passphrase')
  await submit(wrapper)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await wrapper.get('input[name="confirmation"]').setValue(' a long passphrase ')
  await submit(wrapper)
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).not.toBe('')
  expect(wrapper.text()).not.toContain('a long passphrase')
})

it('supports a complete pasted 2FA code and rejects incomplete or nonnumeric input', async () => {
  const wrapper = mount(TwoFactorBlock, options)
  const fields = wrapper.findAll<HTMLInputElement>('input')
  expect(fields).toHaveLength(6)
  expect(new Set(fields.map((field) => field.attributes('aria-label'))).size).toBe(6)
  await fields[0]!.setValue('1')
  await submit(wrapper)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  await fields[0]!.trigger('paste', { clipboardData: { getData: () => '123456' } })
  await submit(wrapper)
  expect(fields.map((field) => field.element.value).join('')).toBe('123456')
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).not.toContain('123456')
  expect(wrapper.get('[role="status"]').text()).not.toBe('')
  await fields[0]!.trigger('paste', { clipboardData: { getData: () => '12' } })
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await submit(wrapper)
  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  await fields[5]!.setValue('x')
  await submit(wrapper)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  expect(wrapper.find('[role="alert"]').exists()).toBe(true)
})

it('announces resend feedback without claiming an email was sent', async () => {
  const wrapper = mount(EmailVerificationBlock, options)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await wrapper.get('button').trigger('click')
  expect(wrapper.get('[role="status"]').text()).toMatch(/no .*email was sent/i)
})

it('keeps labels and error descriptions unique when forms share a page', async () => {
  const host = mount(
    defineComponent({ components: { SignInBlock }, template: '<SignInBlock /><SignInBlock />' }),
    options,
  )
  const [first, second] = host.findAllComponents(SignInBlock) as [VueWrapper, VueWrapper]
  await submit(first)
  await submit(second)
  const ids = [first, second].flatMap((wrapper) =>
    wrapper.findAll('[id]').map((element) => element.attributes('id')),
  )
  expect(new Set(ids).size).toBe(ids.length)
  for (const wrapper of [first, second]) {
    for (const field of wrapper.findAll('input')) {
      expect(wrapper.find(`label[for="${field.attributes('id')}"]`).exists()).toBe(true)
      expect(wrapper.find(`[id="${field.attributes('aria-describedby')}"]`).exists()).toBe(true)
    }
  }
})
