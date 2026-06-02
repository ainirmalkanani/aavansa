'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote, CheckCircle } from 'lucide-react'
import { reviews as staticReviews } from '@/data/products'
import type { Review } from '@/types'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={i < rating ? 'fill-[#C9A96E] text-[#C9A96E]' : 'fill-[#E8E0D8] text-[#E8E0D8]'} />
      ))}
    </div>
  )
}

export default function CustomerReviews({ reviews }: { reviews?: Review[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const list = (reviews && reviews.length > 0) ? reviews : staticReviews

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Real Stories</span>
            <div className="w-10 h-px bg-[#C9A96E]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars rating={5} />
            <span className="font-heading text-[#2C2420] font-semibold">4.9</span>
            <span className="font-body text-[#8B8279] text-sm">from 1,200+ reviews</span>
          </div>
        </motion.div>

        {/* Featured Review */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#FDFAF5] p-6 sm:p-8 md:p-12 mb-6 relative"
        >
          <Quote className="text-[#E8D5B0] absolute top-6 left-6 opacity-60" size={44} />
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-1">
              <Stars rating={list[active].rating} />
              <h3 className="font-heading text-xl md:text-2xl text-[#2C2420] mt-4 mb-4 font-normal">
                "{list[active].title}"
              </h3>
              <p className="font-serif-italic text-[#5C4A3E] leading-relaxed text-lg">
                {list[active].body}
              </p>
              <div className="flex items-center gap-3 mt-6">
                <img src={list[active].avatar} alt={list[active].user} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-body font-medium text-[#2C2420] text-sm">{list[active].user}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <CheckCircle size={10} className="text-[#5C8C6C]" />
                    <span className="font-body text-[9px] text-[#5C8C6C] tracking-wider uppercase">Verified Purchase</span>
                  </div>
                </div>
              </div>
            </div>
            {list[active].images && (
              <div className="md:w-56 shrink-0">
                <img src={list[active].images![0]} alt="Review" className="w-full aspect-square object-cover" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {list.map((review, i) => (
            <motion.button
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              onClick={() => setActive(i)}
              className={`text-left p-5 border transition-all ${
                active === i
                  ? 'border-[#C9A96E] bg-[#FDFAF5]'
                  : 'border-[#F0EBE1] bg-white hover:border-[#E8D5B0]'
              }`}
            >
              <Stars rating={review.rating} />
              <p className="font-heading text-[#2C2420] font-normal mt-3 mb-2 text-sm sm:text-base line-clamp-1">
                {review.title}
              </p>
              <p className="font-serif-italic text-[#8B8279] text-sm sm:text-base line-clamp-2">{review.body}</p>
              <div className="flex items-center gap-2 mt-4">
                <img src={review.avatar} alt={review.user} className="w-7 h-7 rounded-full object-cover" />
                <span className="font-body text-xs text-[#8B8279]">{review.user}</span>
              </div>
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  )
}
