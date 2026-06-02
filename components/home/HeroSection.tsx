'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: 'easeOut' } as const,
})

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#1A1410]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85"
          alt="Luxury jewellery"
          className="w-full h-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1410]/95 via-[#1A1410]/65 to-[#1A1410]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-36">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mb-7">
            <div className="w-10 h-px bg-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-[11px] tracking-[0.4em] uppercase">
              Affordable Everyday Luxury
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.4)}
            className="font-heading text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 font-normal"
          >
            Luxury That
            <br />
            <em className="text-[#C9A96E] not-italic">Belongs</em> To
            <br />
            Every Day
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.6)}
            className="font-serif-italic text-white/70 text-xl sm:text-2xl leading-relaxed mb-10 max-w-md"
          >
            Elegant Jewellery Designed To Elevate Every Moment.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.8)} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A96E] text-white font-body text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#A07840] transition-all duration-300 group"
            >
              Shop Collection
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products?filter=bestseller"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-body text-[11px] tracking-[0.25em] uppercase font-medium hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
            >
              Best Sellers
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {[
              { value: '50,000+', label: 'Happy Customers' },
              { value: '4.9★', label: 'Avg Rating' },
              { value: 'From ₹399', label: 'Starting Price' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/10 px-4 py-2.5 rounded-sm"
              >
                <span className="font-heading text-[#C9A96E] text-sm font-semibold">{stat.value}</span>
                <span className="font-body text-white/50 text-[10px] tracking-widest uppercase">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-white/30 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A96E] to-transparent"
        />
      </motion.div>
    </section>
  )
}
