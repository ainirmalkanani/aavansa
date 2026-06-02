'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products as staticProducts } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

export default function ProductShowcase({ products }: { products?: Product[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60])

  const source = (products && products.length >= 3) ? products : staticProducts
  const featured = [source[5] ?? source[0], source[0], source[1]]

  return (
    <section ref={ref} className="py-16 md:py-28 bg-[#1A1410] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Editorial Collection</span>
            <div className="w-10 h-px bg-[#C9A96E]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight">
            Statement Pieces
            <br />
            <em className="text-[#C9A96E] not-italic">For Every Chapter</em>
          </h2>
        </motion.div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large left */}
          <motion.div style={{ y: y1 }} className="lg:col-span-2 relative overflow-hidden group cursor-pointer">
            <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
              <img
                src={featured[0].images[0]}
                alt={featured[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <span className="font-body text-[#C9A96E] text-[9px] tracking-[0.25em] uppercase">{featured[0].category}</span>
              <h3 className="font-heading text-white text-xl sm:text-2xl md:text-3xl font-normal mt-1 mb-3">{featured[0].name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-heading text-white text-xl">{formatPrice(featured[0].price)}</span>
                <Link
                  href={`/products/${featured[0].slug}`}
                  className="inline-flex items-center gap-2 text-white border-b border-white/40 font-body text-xs tracking-wider hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors group"
                >
                  Shop Now <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {featured.slice(1).map((product, i) => (
              <motion.div
                key={product.id}
                style={{ y: i === 0 ? y2 : y1 }}
                className="relative overflow-hidden group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="font-body text-[#C9A96E] text-[9px] tracking-[0.25em] uppercase">{product.category}</span>
                  <h3 className="font-heading text-white text-sm sm:text-base font-normal mt-1 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-white text-sm">{formatPrice(product.price)}</span>
                    <Link href={`/products/${product.slug}`} className="text-white/70 hover:text-[#C9A96E] transition-colors">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
