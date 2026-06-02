'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const steps = [20, 45, 70, 90, 100]
    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setVisible(false), 400)
      }
    }, 280)

    // Hard cap — always disappear after 2.2s
    const cap = setTimeout(() => setVisible(false), 2200)

    return () => { clearInterval(interval); clearTimeout(cap) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-[#1A1410] flex flex-col items-center justify-center"
        >
          {/* Background shimmer */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.03]"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-heading text-5xl sm:text-6xl tracking-[0.3em] text-white uppercase"
              >
                Aavansa
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-serif-italic text-[#C9A96E] text-lg tracking-[0.2em]"
            >
              Luxury Jewellery
            </motion.p>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-px bg-[#C9A96E] origin-left"
            />

            {/* Progress bar */}
            <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C9A96E] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Progress number */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-[10px] tracking-[0.35em] text-white/30 uppercase"
            >
              {progress}%
            </motion.span>
          </div>

          {/* Exit curtain — slides up */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '100%' }}
            exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute inset-0 bg-[#C9A96E]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
