'use client'

import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import ProductCard from '@/components/product/ProductCard'

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-[#C9A96E]" />
          <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
            Saved Items
          </span>
        </div>
        <h1 className="text-4xl font-normal text-[#2C2420] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          My Wishlist
        </h1>
        <p className="text-[#8B8279] mb-10" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
          {items.length} {items.length === 1 ? 'item' : 'items'} saved
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={64} className="text-[#D4C9BE] mb-6" />
            <h2 className="text-3xl font-normal text-[#2C2420] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Your wishlist is empty
            </h2>
            <p className="text-[#8B8279] italic mb-8" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
              Save pieces you love for later
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#2C2420] text-white text-sm tracking-widest uppercase hover:bg-[#C9A96E] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map(({ product }) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
