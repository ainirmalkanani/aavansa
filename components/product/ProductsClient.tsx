'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/product/ProductCard'
import type { Product } from '@/types'

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'new' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Sellers', value: 'bestseller' },
  { label: 'Highest Rated', value: 'rating' },
]

interface Props {
  products: Product[]
  categories: { name: string; image: string; count: number }[]
}

export default function ProductsClient({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    let result = [...products]
    if (selectedCategory) {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
    }
    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price)
      case 'price-desc': return result.sort((a, b) => b.price - a.price)
      case 'bestseller': return result.filter((p) => p.badges.includes('bestseller'))
      case 'new': return result.filter((p) => p.badges.includes('new'))
      case 'rating': return result.sort((a, b) => b.rating - a.rating)
      default: return result
    }
  }, [selectedCategory, sort, products])

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Hero Banner */}
      <div className="bg-[#2C2420] text-white py-16 md:py-24 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p
            className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Our Collection
          </p>
          <h1
            className="text-4xl md:text-6xl font-normal"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            All Jewellery
          </h1>
          <p
            className="text-white/60 text-lg mt-3 italic"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {products.length} handpicked pieces for every occasion
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 px-5 py-2.5 text-xs tracking-widest uppercase border transition-all ${
              !selectedCategory
                ? 'bg-[#2C2420] text-white border-[#2C2420]'
                : 'border-[#D4C9BE] text-[#8B8279] hover:border-[#2C2420] hover:text-[#2C2420]'
            }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`shrink-0 px-5 py-2.5 text-xs tracking-widest uppercase border transition-all ${
                selectedCategory === cat.name
                  ? 'bg-[#2C2420] text-white border-[#2C2420]'
                  : 'border-[#D4C9BE] text-[#8B8279] hover:border-[#2C2420] hover:text-[#2C2420]'
              }`}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>
            {filtered.length} products
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-[#D4C9BE] bg-white px-4 py-2.5 text-[#2C2420] focus:outline-none focus:border-[#C9A96E] cursor-pointer"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#8B8279] text-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
