import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { music } from '../content'
import { createAmbience, createFilePlayer } from '../lib/ambience'

const PREF = 'plumeria-music'

function readPref() {
  try {
    return localStorage.getItem(PREF) !== 'off'
  } catch {
    return true
  }
}

// Background music with a mute button. Browsers refuse to start sound until
// the visitor has clicked, tapped or pressed a key, so the music begins on
// their first interaction; the button pulses until then.
export default function MusicToggle() {
  const playerRef = useRef(null)
  const buttonRef = useRef(null)
  const [wanted, setWanted] = useState(readPref)
  const [started, setStarted] = useState(false)

  const player = () => (playerRef.current ??= music.src ? createFilePlayer(music.src) : createAmbience())

  // First interaction anywhere on the page (other than the button itself) starts the music.
  useEffect(() => {
    if (!wanted || started) return
    const start = (e) => {
      if (buttonRef.current?.contains(e.target)) return
      player().play()
      setStarted(true)
    }
    window.addEventListener('click', start)
    window.addEventListener('keydown', start)
    return () => {
      window.removeEventListener('click', start)
      window.removeEventListener('keydown', start)
    }
  }, [wanted, started])

  // Go quiet while the tab is in the background.
  useEffect(() => {
    if (!started || !wanted) return
    const onVisibility = () => (document.hidden ? player().pause() : player().play())
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [started, wanted])

  const playing = wanted && started

  const toggle = () => {
    const next = !playing
    if (next) player().play()
    else player().pause()
    setWanted(next)
    setStarted(true)
    try {
      localStorage.setItem(PREF, next ? 'on' : 'off')
    } catch {
      // Preference just won't be remembered.
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Mute background music' : 'Play background music'}
      title={playing ? 'Mute music' : 'Play music'}
      className="fixed bottom-5 left-5 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-espresso text-gold shadow-[0_12px_28px_-10px_rgb(0_0_0/0.6)] ring-1 ring-gold/50 transition-[background-color,color,scale] duration-300 hover:bg-gold hover:text-ink active:scale-95"
    >
      {wanted && !started && (
        <span className="absolute inset-0 animate-ping rounded-full ring-2 ring-gold/60" aria-hidden="true" />
      )}
      {playing ? <Volume2 className="size-5" aria-hidden="true" /> : <VolumeX className="size-5" aria-hidden="true" />}
    </button>
  )
}
