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
  bestseller: { label: 'Best Seller', cls: 'bg-[#2C2420] text-white' },
  trending:   { label: 'Trending',    cls: 'bg-[#C9A96E] text-white' },
  new:        { label: 'New',         cls: 'bg-[#5C8C6C] text-white' },
  limited:    { label: 'Limited',     cls: 'bg-[#8B4A4A] text-white' },
}

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered]     = useState(false)
  const [imgIdx, setImgIdx]       = useState(0)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem }               = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const discount   = calculateDiscount(product.price, product.comparePrice)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-white"
      onMouseEnter={() => { setHovered(true); if (product.images[1]) setImgIdx(1) }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0) }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#F5F1EB]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <motion.img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </Link>

        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/40 via-transparent to-transparent"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badges.slice(0, 1).map((b) => (
            <span key={b} className={`${badgeConfig[b].cls} font-body text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium`}>
              {badgeConfig[b].label}
            </span>
          ))}
          {discount > 0 && (
            <span className="bg-[#C9A96E] text-white font-body text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium">
              {discount}% Off
            </span>
          )}
        </div>

        {/* Low stock */}
        {product.stock <= 6 && product.stock > 0 && (
          <div className="absolute bottom-12 left-2 right-2 z-10">
            <div className="flex items-center justify-center gap-1.5 bg-white/90 backdrop-blur-sm py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E07B4A] animate-pulse" />
              <span className="font-body text-[9px] tracking-wider text-[#2C2420] uppercase">Only {product.stock} left</span>
            </div>
          </div>
        )}

        {/* Wishlist */}
        <motion.button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 w-8 h-8 bg-white shadow-md flex items-center justify-center z-10 hover:scale-110 transition-transform"
          animate={{ opacity: hovered || wishlisted ? 1 : 0, y: hovered || wishlisted ? 0 : -4 }}
          transition={{ duration: 0.2 }}
          aria-label="Wishlist"
        >
          <Heart size={13} className={wishlisted ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#5C4A3E]'} />
        </motion.button>

        {/* Bottom action bar */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute bottom-0 left-0 right-0 flex z-10"
            >
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 font-body text-[9px] tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 transition-colors duration-200 ${
                  justAdded
                    ? 'bg-[#5C8C6C] text-white'
                    : 'bg-[#2C2420] text-white hover:bg-[#C9A96E]'
                }`}
              >
                <ShoppingBag size={12} />
                {justAdded ? '✓ Added!' : 'Add to Cart'}
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="w-11 bg-white/95 text-[#2C2420] flex items-center justify-center hover:bg-[#F5F1EB] border-l border-[#F0EBE1] transition-colors"
              >
                <Eye size={13} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-3.5 sm:p-4">
        <p className="font-body text-[9px] text-[#C9A96E] tracking-[0.22em] uppercase mb-1">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-[#2C2420] text-sm sm:text-[15px] font-normal leading-snug mb-2 hover:text-[#C9A96E] transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={9} className={i < Math.floor(product.rating) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'fill-[#E8E0D8] text-[#E8E0D8]'} />
          ))}
          <span className="font-body text-[9px] text-[#B8AFA8] ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-[#2C2420] font-semibold text-base leading-none">{formatPrice(product.price)}</span>
          <span className="font-body text-[#C4B9AE] text-xs line-through leading-none">{formatPrice(product.comparePrice)}</span>
        </div>
      </div>
    </motion.div>
  )
}
