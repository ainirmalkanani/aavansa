'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX  = useMotionValue(-100)
  const cursorY  = useMotionValue(-100)
  const trailX   = useMotionValue(-100)
  const trailY   = useMotionValue(-100)
  const [hovered, setHovered]   = useState(false)
  const [clicked, setClicked]   = useState(false)
  const [hidden,  setHidden]    = useState(false)
  const [isTouch, setIsTouch]   = useState(false)

  const springX = useSpring(trailX, { stiffness: 120, damping: 18, mass: 0.5 })
  const springY = useSpring(trailY, { stiffness: 120, damping: 18, mass: 0.5 })

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    const addHover = () => setHovered(true)
    const removeHover = () => setHovered(false)
    const addClick = () => { setClicked(true); setTimeout(() => setClicked(false), 180) }
    const hide = () => setHidden(true)
    const show = () => setHidden(false)

    document.addEventListener('mousemove', move)
    document.addEventListener('mousedown', addClick)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    const interactives = document.querySelectorAll('a, button, [role="button"], input, select, textarea, label')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    // MutationObserver for dynamic elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', addClick)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      observer.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Dot — snaps instantly to mouse */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: hidden ? 0 : 1 }}
      >
        <motion.div
          className="rounded-full bg-[#C9A96E]"
          animate={{
            width:  clicked ? 6 : hovered ? 8 : 6,
            height: clicked ? 6 : hovered ? 8 : 6,
          }}
          transition={{ duration: 0.12 }}
        />
      </motion.div>

      {/* Ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: hidden ? 0 : 1 }}
      >
        <motion.div
          className="rounded-full border border-[#C9A96E]"
          animate={{
            width:  clicked ? 28 : hovered ? 44 : 32,
            height: clicked ? 28 : hovered ? 44 : 32,
            opacity: hovered ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.18 }}
        />
      </motion.div>
    </>
  )
}
