'use client'

import { useEffect, useRef } from 'react'

export default function MusicPlayer() {
  const audioRef   = useRef<HTMLAudioElement | null>(null)
  const unlockedRef = useRef(false)

  useEffect(() => {
    /* ── 1. Create the audio element ───────────────────────── */
    const audio        = new Audio('/music/ambient.mp3')
    audio.loop         = true
    audio.volume       = 0.7      // 70% — clearly audible
    audio.muted        = true     // start muted so autoplay is allowed
    audio.preload      = 'auto'
    audioRef.current   = audio

    /* ── 2. Try silent autoplay right away ─────────────────── */
    const tryPlay = () => {
      audio.play().catch(() => {
        // Blocked — will retry on interaction
      })
    }
    tryPlay()

    /* ── 3. Unlock: unmute + resume on FIRST interaction ───── */
    const unlock = () => {
      if (unlockedRef.current) return
      unlockedRef.current = true

      const a = audioRef.current
      if (!a) return

      a.muted  = false
      a.volume = 0.7

      if (a.paused) {
        a.play().catch(() => {})
      }

      removeListeners()
    }

    /* ── 4. Listen on EVERY possible interaction ────────────── */
    const events = ['click', 'scroll', 'touchstart', 'touchend',
                    'keydown', 'mousemove', 'pointerdown', 'wheel']

    const removeListeners = () =>
      events.forEach(e => document.removeEventListener(e, unlock))

    events.forEach(e =>
      document.addEventListener(e, unlock, { once: true, passive: true })
    )

    /* ── 5. Fallback: try after 1 s even without interaction ── */
    const fallback = setTimeout(() => {
      if (!unlockedRef.current) {
        const a = audioRef.current
        if (!a) return
        a.muted  = false
        a.volume = 0.7
        a.play().catch(() => {})
      }
    }, 1000)

    return () => {
      clearTimeout(fallback)
      removeListeners()
      audio.pause()
      audio.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null   // completely invisible — no UI
}
