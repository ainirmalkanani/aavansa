'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Leaf, Zap, Gem, Feather, Gift } from 'lucide-react'

const features = [
  { icon: Gem,     title: 'Premium Finish',       desc: 'Multi-layer gold & silver plating ensures a lustrous finish that rivals fine jewellery.' },
  { icon: Leaf,    title: 'Skin Friendly',         desc: 'Hypoallergenic materials tested and certified safe for all skin types, including sensitive skin.' },
  { icon: Shield,  title: 'Tarnish Resistant',     desc: '6-month tarnish-free guarantee. Our special coating keeps your jewellery brilliant longer.' },
  { icon: Zap,     title: 'Affordable Luxury',     desc: 'Fine jewellery aesthetics at a fraction of the price. Starting from just ₹399.' },
  { icon: Feather, title: 'Lightweight Comfort',   desc: 'Engineered for all-day comfort. Wear from morning meetings to evening celebrations.' },
  { icon: Gift,    title: 'Gift Ready Packaging',  desc: 'Every order arrives in a premium gift box with ribbon and care card — no extra charge.' },
]

export default function WhyAavansa() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">The Aavansa Difference</span>
            <div className="w-10 h-px bg-[#C9A96E]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal">Why Choose Aavansa</h2>
          <p className="font-serif-italic text-[#8B8279] text-lg md:text-xl mt-3 max-w-lg mx-auto">
            Crafted with intention. Designed for every woman.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F0EBE1]">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white p-7 sm:p-8 md:p-10 group hover:bg-[#2C2420] transition-all duration-500"
            >
              <div className="w-12 h-12 border border-[#E8D5B0] flex items-center justify-center text-[#C9A96E] mb-5 group-hover:bg-[#C9A96E] group-hover:border-[#C9A96E] group-hover:text-white transition-all duration-300">
                <f.icon size={22} />
              </div>
              <h3 className="font-heading text-xl text-[#2C2420] group-hover:text-white mb-2.5 transition-colors duration-300 font-normal">
                {f.title}
              </h3>
              <p className="font-serif-italic text-[#8B8279] group-hover:text-white/60 leading-relaxed transition-colors duration-300 text-base">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
