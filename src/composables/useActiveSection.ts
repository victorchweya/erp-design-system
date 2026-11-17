import { onBeforeUnmount, onMounted, readonly, shallowRef, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export function useActiveSection(sectionIds: MaybeRefOrGetter<readonly string[]>) {
  const activeId = shallowRef('')
  let targets: { element: HTMLElement; offset: number }[] = []
  let frame: number | undefined

  function update() {
    let current = targets[0]
    for (const target of targets) {
      if (target.element.getBoundingClientRect().top > target.offset + 1) break
      current = target
    }
    if (
      window.scrollY > 0 &&
      Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight
    ) {
      current = targets[targets.length - 1]
    }
    activeId.value = current?.element.id ?? ''
  }

  function scheduleUpdate() {
    frame ??= window.requestAnimationFrame(() => {
      frame = undefined
      update()
    })
  }

  onMounted(() => {
    watch(
      () => toValue(sectionIds),
      (ids) => {
        targets = ids.flatMap((id) => {
          const element = document.getElementById(id)
          return element
            ? [
                {
                  element,
                  offset: Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0,
                },
              ]
            : []
        })
        update()
      },
      { immediate: true, flush: 'post' },
    )
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    if (frame !== undefined) window.cancelAnimationFrame(frame)
  })

  return readonly(activeId)
}
