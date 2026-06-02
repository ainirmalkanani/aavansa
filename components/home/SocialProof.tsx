'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Award, Package, Smile } from 'lucide-react'

const stats = [
  { icon: Smile,   value: '50,000+',  label: 'Happy Customers', desc: 'Women who wear Aavansa daily' },
  { icon: Star,    value: '4.9 / 5',  label: 'Average Rating',  desc: 'Based on verified reviews' },
  { icon: Package, value: '1,20,000+',label: 'Orders Delivered', desc: 'Across India' },
  { icon: Award,   value: '98%',      label: 'Satisfaction',    desc: 'Customers who recommend us' },
]

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white border-y border-[#F0EBE1]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Loved By Thousands</span>
            <div className="w-10 h-px bg-[#C9A96E]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal">
            The Aavansa Promise
          </h2>
          <p className="font-serif-italic text-[#8B8279] text-lg md:text-xl mt-3">
            Real numbers. Real customers. Real elegance.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#F0EBE1]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-6 sm:p-8 md:p-10 text-center group hover:bg-[#FDFAF5] transition-colors"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 mb-5 border border-[#E8D5B0] text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-white group-hover:border-[#C9A96E] transition-all">
                <stat.icon size={19} />
              </div>
              <span className="font-heading text-3xl md:text-4xl text-[#2C2420] block font-normal">{stat.value}</span>
              <p className="font-body text-[9px] tracking-[0.25em] uppercase text-[#C9A96E] mt-2 mb-1">{stat.label}</p>
              <p className="font-serif-italic text-sm text-[#8B8279]">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* As Seen In */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          <span className="font-body text-[9px] tracking-[0.3em] text-[#B8AFA8] uppercase">As Seen In</span>
          {['Vogue India', 'Femina', 'Elle India', 'Cosmopolitan'].map((name) => (
            <span key={name} className="font-heading text-sm text-[#C4B9AE] italic">{name}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
