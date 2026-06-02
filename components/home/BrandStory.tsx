'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function BrandStory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="py-16 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Images */}
          <div className="relative order-2 lg:order-1">
            <motion.div style={{ y }}>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85"
                  alt="Brand Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 w-1/2 aspect-square overflow-hidden border-4 border-white shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=85"
                  alt="Jewellery detail"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            <div className="absolute -left-3 top-1/4 w-1 h-28 bg-[#C9A96E]" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-[#C9A96E]" />
              <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Our Story</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal leading-tight mb-6">
              Every Woman Deserves to
              <em className="block text-[#C9A96E] not-italic">Feel Elegant Daily</em>
            </h2>

            <div className="space-y-4 text-[#5C4A3E] font-serif-italic text-lg leading-relaxed">
              <p>
                Aavansa was born from a simple belief: luxury is not a privilege — it is a right. Every woman, regardless of her budget, deserves to feel beautiful, confident, and elegant every single day.
              </p>
              <p>
                We create jewellery that bridges the gap between high fashion and everyday life. Pieces crafted with the precision of fine jewellery, at prices that make sense.
              </p>
              <p>
                Because when you feel elegant, you carry yourself differently. And that quiet confidence? That is the true luxury we offer.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10 mb-10">
              {[
                { num: '2019', label: 'Founded' },
                { num: '200+', label: 'Designs' },
                { num: '50K+', label: 'Women Served' },
                { num: '100%', label: 'Passion' },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#E8D5B0] pl-4">
                  <p className="font-heading text-2xl text-[#2C2420] font-normal">{item.num}</p>
                  <p className="font-body text-[9px] tracking-[0.25em] text-[#8B8279] uppercase mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C2420] text-white font-body text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#C9A96E] transition-all duration-300 group"
            >
              Explore Collection
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
