import { computed, shallowRef, watch } from 'vue'
import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router'

export interface UseRouteDrawerOptions {
  /** Query parameter that carries the record id. Defaults to `record`. */
  key?: string
  /** Return false for ids that do not exist; the drawer stays closed and the parameter is removed. */
  isKnown?: (id: string) => boolean
}

/**
 * Keeps a drawer and its record id in the current route's query string, so the open drawer has
 * its own link: a shared or reloaded link opens it, Back closes it, and closing never leaves the page.
 */
export function useRouteDrawer({ key: keyOption, isKnown }: UseRouteDrawerOptions = {}) {
  const route = useRoute()
  const router = useRouter()
  const path = route.path
  const key = () => keyOption ?? 'record'
  // History state flag: set on the entry that opening pushed, so closing can go back to the
  // entry before it instead of adding another one.
  const openedHere = () => `routeDrawer:${key()}`

  const recordId = computed(() => {
    const raw = route.query[key()]
    const id = Array.isArray(raw) ? raw[0] : raw
    if (!id || (isKnown && !isKnown(id))) return null
    return id
  })
  const visible = computed(() => recordId.value !== null)

  // The slide-out takes a moment; keep the last id so the content does not blank while it runs.
  const lastId = shallowRef<string | null>(recordId.value)
  watch(recordId, (id) => {
    if (id) lastId.value = id
  })

  function withRecord(id: string | null): LocationQueryRaw {
    const query: LocationQueryRaw = { ...route.query }
    if (id) query[key()] = id
    else delete query[key()]
    return query
  }

  function open(id: string) {
    if (recordId.value === id) return
    // Opening another record while one is open swaps it in place, so Back still closes the drawer.
    const switching = recordId.value !== null
    return router[switching ? 'replace' : 'push']({
      query: withRecord(id),
      hash: route.hash,
      state: { [openedHere()]: switching ? !!router.options.history.state[openedHere()] : true },
    })
  }

  function close() {
    if (!visible.value) return
    // Opened by this page: Back to the entry before it. Opened by a shared link: nothing earlier
    // to return to, so replace the URL and stay on the page.
    if (router.options.history.state[openedHere()]) return router.back()
    return router.replace({ query: withRecord(null), hash: route.hash })
  }

  // Drop ids that do not exist so the address matches what is on screen.
  watch(
    () => route.query[key()],
    (raw) => {
      if (route.path !== path || raw === undefined || visible.value) return
      router.replace({ query: withRecord(null), hash: route.hash })
    },
    { immediate: true },
  )

  return { recordId, lastId, visible, open, close }
}
