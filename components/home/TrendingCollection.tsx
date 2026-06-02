'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { products as staticProducts } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

export default function TrendingCollection({ products }: { products?: Product[] }) {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const list = (products && products.length > 0)
    ? products
    : staticProducts.filter((p) => p.badges.includes('trending'))

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#F5EDD8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-5"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-[#C9A96E]" />
              <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">What's Hot Right Now</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal">Trending Collection</h2>
            <p className="font-serif-italic text-[#8B8279] text-lg mt-2">Styles capturing hearts this season</p>
          </div>
          <div className="hidden md:flex gap-2 shrink-0">
            {[ArrowLeft, ArrowRight].map((Icon, i) => (
              <button
                key={i}
                onClick={() => scroll(i === 0 ? 'left' : 'right')}
                className="w-10 h-10 border border-[#D4C9BE] flex items-center justify-center text-[#2C2420] hover:bg-[#2C2420] hover:text-white hover:border-[#2C2420] transition-all"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8"
        >
          {[...list, ...staticProducts.slice(0, 4)].map((product, i) => (
            <motion.div
              key={`${product.id}-${i}`}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="w-[200px] sm:w-[240px] md:w-[260px] shrink-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="md:hidden text-center font-body text-[10px] text-[#B8AFA8] tracking-wider uppercase mt-4">
          Swipe to explore →
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-10"
        >
          <Link
            href="/products?filter=trending"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#2C2420] text-white font-body text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#C9A96E] transition-all duration-300 group"
          >
            View All Trending
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
