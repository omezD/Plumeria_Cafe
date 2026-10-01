import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'

function subscribe(callback) {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
