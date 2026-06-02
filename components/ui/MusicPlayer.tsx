'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)          // start muted (browser policy)
  const [visible, setVisible] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [volume, setVolume] = useState(0.25)
  const hasInteracted = useRef(false)

  /* ── Mount: create audio element ── */
  useEffect(() => {
    const audio = new Audio('/music/ambient.mp3')
    audio.loop = true
    audio.volume = volume
    audio.muted = true          // must start muted to pass autoplay policy
    audioRef.current = audio

    // Show player after 2 s
    const t1 = setTimeout(() => setVisible(true), 2000)

    // Show "Click to enable music" toast after 3 s
    const t2 = setTimeout(() => setShowToast(true), 3000)
    const t3 = setTimeout(() => setShowToast(false), 7000)

    // Try autoplay (muted — usually allowed)
    audio.play().then(() => setPlaying(true)).catch(() => {})

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      audio.pause()
      audio.src = ''
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── First user interaction → unmute ── */
  const handleFirstClick = useCallback(() => {
    if (hasInteracted.current) return
    hasInteracted.current = true
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false
    setMuted(false)
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
    setShowToast(false)
  }, [])

  /* ── Toggle play/pause ── */
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    handleFirstClick()
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  /* ── Toggle mute ── */
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    handleFirstClick()
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  /* ── Volume ── */
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) {
      audioRef.current.volume = v
      if (v > 0 && audioRef.current.muted) {
        audioRef.current.muted = false
        setMuted(false)
      }
    }
  }

  const isSilent = muted || volume === 0

  return (
    <>
      {/* Toast nudge */}
      <AnimatePresence>
        {showToast && visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-28 left-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-2.5 bg-[#2C2420]/90 backdrop-blur-md text-white px-5 py-3 rounded-full border border-[#C9A96E]/30 shadow-xl">
              <Music size={13} className="text-[#C9A96E]" />
              <span className="font-body text-[11px] tracking-[0.15em] uppercase">
                Tap 🎵 to enable ambient music
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Player */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="fixed bottom-6 right-5 sm:right-7 z-50 group"
          >
            {/* Volume slider — appears on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              whileHover={{ opacity: 1, height: 'auto' }}
              className="absolute bottom-full right-0 mb-3 overflow-hidden"
            >
              <div className="bg-[#2C2420]/95 backdrop-blur-md border border-[#C9A96E]/25 rounded-2xl p-4 shadow-2xl flex flex-col items-center gap-3 min-w-[120px]">
                <span className="font-body text-[9px] text-[#C9A96E] tracking-[0.25em] uppercase">Volume</span>
                {/* Vertical range slider */}
                <div className="relative h-20 flex items-center justify-center">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isSilent ? 0 : volume}
                    onChange={handleVolume}
                    className="appearance-none cursor-pointer"
                    style={{
                      writingMode: 'vertical-lr' as const,
                      direction: 'rtl',
                      width: '4px',
                      height: '70px',
                      background: `linear-gradient(to top, #C9A96E ${(isSilent ? 0 : volume) * 100}%, #5C4A3E ${(isSilent ? 0 : volume) * 100}%)`,
                      borderRadius: '4px',
                      outline: 'none',
                      border: 'none',
                    }}
                  />
                </div>
                {/* Track name */}
                <p className="font-body text-[8px] text-[#8B8279] tracking-wider text-center max-w-[90px] truncate">
                  Luxury Ambient
                </p>
              </div>
            </motion.div>

            {/* Main button */}
            <button
              onClick={togglePlay}
              aria-label={playing && !isSilent ? 'Pause music' : 'Play music'}
              className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#2C2420] border border-[#C9A96E]/40 shadow-2xl flex items-center justify-center hover:border-[#C9A96E] transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] overflow-visible"
              style={{ width: '52px', height: '52px' }}
            >
              {/* Pulse rings when playing & unmuted */}
              {playing && !isSilent && (
                <>
                  <span className="absolute inset-0 rounded-full border border-[#C9A96E]/30 animate-ping" />
                  <span className="absolute -inset-2 rounded-full border border-[#C9A96E]/15 animate-ping" style={{ animationDelay: '0.3s' }} />
                </>
              )}

              {/* Sound wave bars — visible when playing & unmuted */}
              {playing && !isSilent ? (
                <div className="flex items-end gap-[2.5px] h-5">
                  {[1, 1.6, 1.2, 1.8, 1].map((scale, i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] bg-[#C9A96E] rounded-full"
                      animate={{ scaleY: [0.4, scale, 0.4] }}
                      transition={{
                        duration: 0.8 + i * 0.1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.15,
                      }}
                      style={{ height: '16px', transformOrigin: 'bottom' }}
                    />
                  ))}
                </div>
              ) : (
                <Music size={18} className="text-[#C9A96E]" />
              )}
            </button>

            {/* Mute toggle — small button */}
            <button
              onClick={toggleMute}
              aria-label={isSilent ? 'Unmute' : 'Mute'}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C9A96E] flex items-center justify-center shadow-md hover:bg-[#A07840] transition-colors"
            >
              {isSilent
                ? <VolumeX size={10} className="text-white" />
                : <Volume2 size={10} className="text-white" />
              }
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
