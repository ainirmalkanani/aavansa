'use client'

import { useEffect, useRef } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const unlockedRef = useRef(false)

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/music/ambient.mp3')
    audio.loop = true
    audio.volume = 0.18        // very soft — 18% volume
    audio.muted = true         // must start muted (browser autoplay policy)
    audioRef.current = audio

    // Try silent autoplay immediately
    audio.play().catch(() => {})

    // Unlock & unmute on FIRST interaction (click, scroll, touch, keydown)
    const unlock = () => {
      if (unlockedRef.current) return
      unlockedRef.current = true

      const a = audioRef.current
      if (!a) return

      a.muted = false

      // If paused (autoplay was blocked), start it
      if (a.paused) {
        a.play().catch(() => {})
      }

      // Remove all listeners after first interaction
      document.removeEventListener('click',     unlock)
      document.removeEventListener('scroll',    unlock)
      document.removeEventListener('touchstart',unlock)
      document.removeEventListener('keydown',   unlock)
    }

    document.addEventListener('click',      unlock, { passive: true })
    document.addEventListener('scroll',     unlock, { passive: true })
    document.addEventListener('touchstart', unlock, { passive: true })
    document.addEventListener('keydown',    unlock, { passive: true })

    return () => {
      audio.pause()
      audio.src = ''
      document.removeEventListener('click',     unlock)
      document.removeEventListener('scroll',    unlock)
      document.removeEventListener('touchstart',unlock)
      document.removeEventListener('keydown',   unlock)
    }
  }, [])

  // Renders nothing — completely invisible
  return null
}
