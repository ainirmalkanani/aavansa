'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'

const badgeConfig = {
  bestseller: { label: 'Best Seller', bg: 'bg-[#2C2420]' },
  trending:   { label: 'Trending',    bg: 'bg-[#C9A96E]' },
  new:        { label: 'New',         bg: 'bg-[#5C8C6C]' },
  limited:    { label: 'Limited',     bg: 'bg-[#8B4A4A]' },
}

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const discount = calculateDiscount(product.price, product.comparePrice)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-400"
      onMouseEnter={() => { setHovered(true); if (product.images[1]) setImgIdx(1) }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0) }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#F5F1EB]">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.badges.slice(0, 1).map((badge) => (
            <span
              key={badge}
              className={`${badgeConfig[badge].bg} text-white font-body text-[8px] tracking-[0.2em] uppercase px-2 py-1 font-medium`}
            >
              {badgeConfig[badge].label}
            </span>
          ))}
          {discount > 0 && (
            <span className="bg-[#C9A96E] text-white font-body text-[8px] tracking-[0.2em] uppercase px-2 py-1 font-medium">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Stock warning */}
        {product.stock <= 8 && product.stock > 0 && (
          <div className="absolute bottom-10 left-2 right-2">
            <div className="bg-white/92 backdrop-blur-sm text-[#2C2420] font-body text-[9px] tracking-wider px-2.5 py-1.5 text-center uppercase">
              Only {product.stock} left
            </div>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-white shadow-sm transition-all duration-300 ${
            hovered || wishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Wishlist"
        >
          <Heart
            size={14}
            className={wishlisted ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#5C4A3E]'}
          />
        </button>

        {/* Quick actions overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-0 left-0 right-0 flex"
            >
              <button
                onClick={() => addItem(product, 1)}
                className="flex-1 bg-[#2C2420] text-white py-3 font-body text-[9px] tracking-[0.2em] uppercase font-medium hover:bg-[#C9A96E] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={12} />
                Add to Cart
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="w-11 bg-white/95 text-[#2C2420] flex items-center justify-center hover:bg-[#F5F1EB] transition-colors border-l border-[#F0EBE1]"
              >
                <Eye size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-3.5 sm:p-4">
        <p className="font-body text-[9px] text-[#C9A96E] tracking-[0.2em] uppercase mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-[#2C2420] text-sm sm:text-[15px] font-normal leading-snug mb-2 hover:text-[#C9A96E] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={9}
              className={i < Math.floor(product.rating) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'fill-[#E8E0D8] text-[#E8E0D8]'}
            />
          ))}
          <span className="font-body text-[9px] text-[#8B8279] ml-0.5">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-heading text-[#2C2420] font-semibold text-base">
            {formatPrice(product.price)}
          </span>
          <span className="font-body text-[#B8AFA8] text-xs line-through">
            {formatPrice(product.comparePrice)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
