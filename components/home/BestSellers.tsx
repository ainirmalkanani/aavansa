'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products as staticProducts } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

export default function BestSellers({ products }: { products?: Product[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const list = (products && products.length > 0)
    ? products.slice(0, 4)
    : staticProducts.filter((p) => p.badges.includes('bestseller')).slice(0, 4)

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-px bg-[#C9A96E]" />
              <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Customer Favourites</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal">Best Sellers</h2>
            <p className="font-serif-italic text-[#8B8279] text-lg mt-2">Pieces loved by thousands of women across India</p>
          </div>
          <Link
            href="/products?filter=bestseller"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-[#2C2420] border-b border-[#2C2420] pb-0.5 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors group shrink-0"
          >
            View All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {list.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Bundle Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 md:mt-10 bg-[#2C2420] text-white px-6 py-6 md:px-10 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div>
            <p className="font-body text-[#C9A96E] text-[9px] tracking-[0.3em] uppercase mb-1.5">Limited Time Offer</p>
            <h3 className="font-heading text-2xl md:text-3xl font-normal">Buy More, Save More</h3>
            <p className="font-serif-italic text-white/50 mt-1 text-lg">The more you love, the more you save</p>
          </div>
          <div className="flex gap-3 sm:gap-5 shrink-0">
            {[
              { buy: 'Buy 2', save: '10% Off', active: false },
              { buy: 'Buy 3+', save: '15% Off', active: true },
            ].map((o) => (
              <div
                key={o.buy}
                className={`border ${o.active ? 'border-[#C9A96E] bg-[#C9A96E]/10' : 'border-white/20'} px-5 sm:px-8 py-4 text-center min-w-[90px]`}
              >
                <p className="font-body text-[#C9A96E] text-[9px] tracking-[0.2em] uppercase mb-0.5">{o.buy}</p>
                <p className="font-heading text-white text-xl font-semibold">{o.save}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
