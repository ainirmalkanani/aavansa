'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef       = useRef<HTMLImageElement>(null)
  const titleRef     = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Cinematic image reveal
      gsap.fromTo(imgRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 0.45, duration: 2.2, ease: 'power3.out' }
      )
      // Subtle parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const words = ['Luxury', 'That', 'Belongs', 'To', 'Every', 'Day']

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0F0C0A]"
    >
      {/* BG Image */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85"
          alt=""
          className="w-full h-full object-cover opacity-0"
          style={{ willChange: 'transform, opacity' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0C0A]/95 via-[#0F0C0A]/60 to-[#0F0C0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C0A]/70 via-transparent to-transparent" />
      </div>

      {/* Floating gold orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A96E]/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-[#C9A96E]/4 blur-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-36">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-10 h-px bg-[#C9A96E] origin-left"
            />
            <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.45em] uppercase">
              Affordable Everyday Luxury
            </span>
          </motion.div>

          {/* Headline — word by word reveal */}
          <div ref={titleRef} className="overflow-hidden mb-6">
            <h1 className="font-heading text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] text-white leading-[0.95] font-normal">
              {['Luxury That', 'Belongs To', 'Every Day'].map((line, lineIdx) => (
                <div key={lineIdx} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.9,
                      delay: 0.8 + lineIdx * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {lineIdx === 1 ? (
                      <>
                        <em className="text-[#C9A96E] not-italic">Belongs</em>
                        <span className="text-white"> To</span>
                      </>
                    ) : (
                      line
                    )}
                  </motion.div>
                </div>
              ))}
            </h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="font-serif-italic text-white/60 text-xl sm:text-2xl leading-relaxed mb-10 max-w-md"
          >
            Elegant Jewellery Designed To Elevate Every Moment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#C9A96E] text-white font-body text-[11px] tracking-[0.28em] uppercase font-medium hover:bg-[#A07840] transition-all duration-400 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Shop Collection
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              {/* Shine sweep */}
              <motion.span
                className="absolute inset-0 bg-white/10 -skew-x-12"
                initial={{ x: '-150%' }}
                whileHover={{ x: '150%' }}
                transition={{ duration: 0.5 }}
              />
            </Link>
            <Link
              href="/products?filter=bestseller"
              className="inline-flex items-center justify-center px-9 py-4 border border-white/25 text-white font-body text-[11px] tracking-[0.28em] uppercase font-medium hover:border-[#C9A96E] hover:text-[#C9A96E] hover:bg-white/5 transition-all duration-400 backdrop-blur-sm"
            >
              Best Sellers
            </Link>
          </motion.div>

          {/* Stats pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="flex flex-wrap gap-3 mt-14"
          >
            {[
              { value: '50,000+', label: 'Happy Customers' },
              { value: '4.9 ★', label: 'Avg Rating' },
              { value: 'From ₹399', label: 'Starting Price' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 + i * 0.1 }}
                className="flex items-center gap-2.5 bg-white/6 backdrop-blur-sm border border-white/8 px-4 py-2.5 hover:border-[#C9A96E]/40 transition-colors duration-300"
              >
                <span className="font-heading text-[#C9A96E] text-sm font-semibold">{stat.value}</span>
                <span className="font-body text-white/40 text-[9px] tracking-[0.2em] uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-white/25 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="relative w-px h-12 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#C9A96E]"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Side text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
      >
        <span
          className="font-body text-white/20 text-[9px] tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Aavansa Jewellery 2025
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-[#C9A96E]/40 to-transparent" />
      </motion.div>
    </section>
  )
}
