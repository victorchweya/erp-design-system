import { computed, toValue, watch, type MaybeRefOrGetter } from 'vue'
import {
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
  type LocationQuery,
  type LocationQueryRaw,
  type LocationQueryValue,
} from 'vue-router'

/**
 * Query keys for the supplier template. They share a `supplier` prefix so other
 * templates or filters on the same page can use the query string without colliding.
 */
export const supplierQueryKeys = {
  supplier: 'supplier',
  view: 'supplierView',
  search: 'supplierQ',
} as const

const MAX_SEARCH_LENGTH = 100
// History state flags: set on entries this template pushed, so leaving them can go back
// instead of adding another entry.
const OPENED_FROM_LIST = 'supplierOpenedFromList'
const OPENED_FROM_DETAIL = 'supplierOpenedFromDetail'

export interface SupplierRouteState {
  supplierId: string | null
  editing: boolean
  search: string
}

function firstValue(value: LocationQueryValue | LocationQueryValue[] | undefined) {
  const item = Array.isArray(value) ? value[0] : value
  return typeof item === 'string' ? item : null
}

/** Reads the template state from a query, dropping unknown suppliers and views. */
export function parseSupplierQuery(
  query: LocationQuery,
  supplierIds: readonly string[],
): SupplierRouteState {
  const id = firstValue(query[supplierQueryKeys.supplier])
  const supplierId = id && supplierIds.includes(id) ? id : null
  return {
    supplierId,
    editing: supplierId !== null && firstValue(query[supplierQueryKeys.view]) === 'edit',
    search: (firstValue(query[supplierQueryKeys.search]) ?? '').slice(0, MAX_SEARCH_LENGTH),
  }
}

/** Writes the template state into a query, keeping every key the template does not own. */
function toQuery(query: LocationQuery, state: SupplierRouteState): LocationQueryRaw {
  const next: LocationQueryRaw = { ...query }
  for (const key of Object.values(supplierQueryKeys)) delete next[key]
  if (state.supplierId) next[supplierQueryKeys.supplier] = state.supplierId
  if (state.editing) next[supplierQueryKeys.view] = 'edit'
  if (state.search) next[supplierQueryKeys.search] = state.search
  return next
}

export interface UseSupplierRouteOptions {
  /** Called before navigation leaves the edit view; resolve false to stay. */
  confirmLeaveEdit: () => boolean | Promise<boolean>
}

/**
 * Keeps the supplier list, detail, and edit views in the current route's query string so
 * refresh, Back, and shared links restore the same view without adding routes.
 */
export function useSupplierRoute(
  supplierIds: MaybeRefOrGetter<readonly string[]>,
  { confirmLeaveEdit }: UseSupplierRouteOptions,
) {
  const route = useRoute()
  const router = useRouter()
  const path = route.path
  const state = computed(() => parseSupplierQuery(route.query, toValue(supplierIds)))

  function navigate(
    changes: Partial<SupplierRouteState>,
    mode: 'push' | 'replace',
    historyState?: Record<string, boolean>,
  ) {
    return router[mode]({
      query: toQuery(route.query, { ...state.value, ...changes }),
      hash: route.hash,
      state: historyState,
    })
  }

  // Leaving a view this template pushed goes back, so the in-page action and the
  // browser's Back button share one history entry.
  function leave(changes: Partial<SupplierRouteState>, flag: string, fallback: 'push' | 'replace') {
    if (router.options.history.state[flag]) return router.back()
    return navigate(changes, fallback)
  }

  const open = (supplierId: string) =>
    navigate({ supplierId, editing: false }, 'push', { [OPENED_FROM_LIST]: true })
  const backToList = () => leave({ supplierId: null, editing: false }, OPENED_FROM_LIST, 'push')
  const openEdit = () => navigate({ editing: true }, 'push', { [OPENED_FROM_DETAIL]: true })
  const closeEdit = () => leave({ editing: false }, OPENED_FROM_DETAIL, 'replace')
  // Typing replaces the entry so each keystroke does not add to history.
  const setSearch = (search: string) =>
    navigate({ search: search.slice(0, MAX_SEARCH_LENGTH) }, 'replace')

  // Replace invalid or unknown values so the URL matches the view on screen.
  watch(
    () => route.query,
    (query) => {
      if (route.path !== path) return
      const normalized = toQuery(query, state.value)
      const stale = Object.values(supplierQueryKeys).some(
        (key) => (query[key] ?? undefined) !== normalized[key],
      )
      if (stale) router.replace({ query: normalized, hash: route.hash })
    },
    { immediate: true },
  )

  onBeforeRouteUpdate((to) => {
    if (!state.value.editing) return true
    const next = parseSupplierQuery(to.query, toValue(supplierIds))
    const staysInEdit = next.editing && next.supplierId === state.value.supplierId
    return staysInEdit || confirmLeaveEdit()
  })
  onBeforeRouteLeave(() => !state.value.editing || confirmLeaveEdit())

  return { state, open, backToList, openEdit, closeEdit, setSearch }
}
