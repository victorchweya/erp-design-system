import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import * as PrimeIcons from '@primeicons/vue'
import PrimeVue from 'primevue/config'
import IconGallery from '../IconGallery.vue'

enableAutoUnmount(afterEach)
const require = createRequire(import.meta.url)
const mountGallery = () => mount(IconGallery, { global: { plugins: [PrimeVue] } })

it('shows every exported icon with a valid individual import path', () => {
  const wrapper = mountGallery()
  const expectedNames = Object.keys(PrimeIcons).filter((name) => name !== 'createIcon')
  const items = wrapper.findAll('li')

  expect(items.map((item) => item.get('span').text()).sort()).toEqual(expectedNames.sort())
  for (const item of items) {
    const path = item.get('code').text()
    expect(existsSync(require.resolve(`@primeicons/vue/${path}`))).toBe(true)
    expect(item.get('svg').classes()).toContain(`p-icon-${path}`)
  }
})

it('filters names and import paths, handles no results, and restores the full library', async () => {
  const wrapper = mountGallery()
  const initialCount = wrapper.findAll('li').length
  const search = wrapper.get('input')

  await search.setValue('  ARROW-U-TURN  ')
  expect(wrapper.findAll('li').map((item) => item.get('code').text())).toEqual([
    'arrow-u-turn-up-left',
    'arrow-u-turn-up-right',
  ])

  await search.setValue('heading 1')
  expect(wrapper.findAll('li').map((item) => item.get('code').text())).toEqual(['heading-1'])

  await search.setValue('no-matching-icon')
  expect(wrapper.findAll('li')).toHaveLength(0)
  expect(wrapper.get('[role="status"]').text()).toMatch(/^0 of /)

  await search.setValue('')
  expect(wrapper.findAll('li')).toHaveLength(initialCount)
})
