import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// How long the logo screen stays up on a visitor's first load, counted from
// the moment the page started loading.
const SPLASH_MS = 2600
const SPLASH_SEEN = 'plumeria-splash-seen'

function dismissSplash() {
  const splash = document.getElementById('splash')
  const root = document.documentElement
  if (!splash) return

  // Once per browser session: reloads and later visits in the same tab skip it.
  let seen = false
  try {
    seen = sessionStorage.getItem(SPLASH_SEEN) === '1'
    sessionStorage.setItem(SPLASH_SEEN, '1')
  } catch {
    // Storage unavailable (private mode, blocked): just show the splash.
  }

  if (seen) {
    splash.remove()
    root.classList.remove('is-loading')
    return
  }

  setTimeout(
    () => {
      splash.classList.add('is-leaving')
      root.classList.remove('is-loading')
      // Remove after the fade; a timer rather than transitionend so it can never get stuck.
      setTimeout(() => splash.remove(), 900)
    },
    Math.max(0, SPLASH_MS - performance.now()),
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

dismissSplash()
