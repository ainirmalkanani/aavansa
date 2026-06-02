'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Heart, ShoppingBag, Shield, Truck, RotateCcw, CheckCircle,
  ChevronLeft, ChevronRight, Zap, Award, Feather, Gem, Leaf, Package
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, calculateDiscount, calculateSavings } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'
import type { Product, Review } from '@/types'

const iconMap: Record<string, React.FC<{size?: number}>> = {
  Shield, Leaf, Feather, Package, Gem, Zap
}

interface Props {
  product: Product
  reviews: Review[]
  related: Product[]
}

export default function ProductDetailClient({ product, reviews, related }: Props) {
  const [activeImg, setActiveImg] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const discount = calculateDiscount(product.price, product.comparePrice)
  const savings = calculateSavings(product.price, product.comparePrice)

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#C9A96E] transition-colors">Jewellery</Link>
          <span>/</span>
          <span className="text-[#2C2420]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-[#F5F1EB]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setActiveImg((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges.includes('bestseller') && (
                  <span className="bg-[#2C2420] text-white text-[9px] tracking-widest uppercase px-2.5 py-1" style={{ fontFamily: 'var(--font-inter)' }}>
                    Best Seller
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-[#C9A96E] text-white text-[9px] tracking-widest uppercase px-2.5 py-1" style={{ fontFamily: 'var(--font-inter)' }}>
                    {discount}% Off
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 shrink-0 overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#C9A96E]' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] tracking-widest text-[#C9A96E] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                {product.category}
              </span>
              {product.badges.includes('trending') && (
                <span className="flex items-center gap-1 text-[10px] text-[#C9A96E] tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>
                  <Zap size={10} className="fill-[#C9A96E]" /> Trending
                </span>
              )}
            </div>

            <h1
              className="text-3xl md:text-4xl font-normal text-[#2C2420] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#D4C9BE]'} />
                ))}
              </div>
              <span className="text-sm text-[#2C2420] font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{product.rating}</span>
              <span className="text-sm text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>({product.reviewCount} reviews)</span>
              <span className="text-sm text-[#5C8C6C]" style={{ fontFamily: 'var(--font-inter)' }}>{product.sold.toLocaleString()} sold</span>
            </div>

            {/* Price */}
            <div className="bg-[#FDFAF5] border border-[#E8D5B0] p-5 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-normal text-[#2C2420]" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-[#B8AFA8] line-through" style={{ fontFamily: 'var(--font-inter)' }}>
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="text-sm text-[#5C8C6C] font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                  {discount}% off
                </span>
              </div>
              <p className="text-sm text-[#5C8C6C]" style={{ fontFamily: 'var(--font-inter)' }}>
                You save {formatPrice(savings)} on this purchase
              </p>
            </div>

            {product.stock <= 10 && (
              <div className="flex items-center gap-2 mb-4 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                <div className="w-2 h-2 rounded-full bg-[#E07B4A] animate-pulse" />
                <span className="text-[#E07B4A]">Only {product.stock} left in stock — order soon!</span>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-6 text-xs text-[#8B8279] bg-white border border-[#F0EBE1] px-4 py-2.5"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#5C8C6C]" />
              Someone from Mumbai just purchased this 2 minutes ago
            </motion.div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-xs tracking-widest text-[#8B8279] uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                Colour: <span className="text-[#2C2420]">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs border transition-all ${selectedColor === color ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-[#D4C9BE] text-[#5C4A3E] hover:border-[#C9A96E]'}`}
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Cart */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-[#D4C9BE]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-12 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] transition-colors">-</button>
                <span className="w-10 text-center text-sm" style={{ fontFamily: 'var(--font-inter)' }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-11 h-12 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] transition-colors">+</button>
              </div>
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 ${addedToCart ? 'bg-[#5C8C6C] text-white' : 'bg-[#2C2420] text-white hover:bg-[#C9A96E]'}`}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {addedToCart ? <><CheckCircle size={16} /> Added!</> : <><ShoppingBag size={16} /> Add to Bag</>}
              </motion.button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${wishlisted ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-[#D4C9BE] text-[#8B8279] hover:border-[#C9A96E]'}`}
              >
                <Heart size={18} className={wishlisted ? 'fill-white' : ''} />
              </button>
            </div>

            <Link
              href="/checkout"
              onClick={() => addItem(product, quantity, selectedColor)}
              className="w-full flex items-center justify-center py-3 border border-[#2C2420] text-[#2C2420] text-sm tracking-widest uppercase hover:bg-[#2C2420] hover:text-white transition-all mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Buy Now
            </Link>

            {/* Bundle Offer */}
            <div className="bg-[#2C2420] text-white p-5 mb-6">
              <p className="text-[#C9A96E] text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Bundle & Save</p>
              <div className="flex gap-4">
                {[{ buy: 'Buy 2', save: '10% Off' }, { buy: 'Buy 3+', save: '15% Off' }].map((o) => (
                  <div key={o.buy} className="flex-1 border border-[#C9A96E]/30 text-center py-3">
                    <p className="text-xs text-[#C9A96E]" style={{ fontFamily: 'var(--font-inter)' }}>{o.buy}</p>
                    <p className="text-white font-semibold" style={{ fontFamily: 'var(--font-playfair)' }}>{o.save}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Shield, label: 'Secure Checkout', sub: '100% safe payment' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '7-day hassle-free' },
                { icon: Truck, label: 'Fast Shipping', sub: '3-5 business days' },
                { icon: Award, label: 'Quality Assured', sub: '6-month guarantee' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-white border border-[#F0EBE1]">
                  <item.icon size={18} className="text-[#C9A96E] shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-[#2C2420]" style={{ fontFamily: 'var(--font-inter)' }}>{item.label}</p>
                    <p className="text-[10px] text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="border-t border-[#F0EBE1] pt-6 space-y-3">
              {[
                { label: 'Material', value: product.material },
                { label: 'Weight', value: product.weight },
                { label: 'Availability', value: product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock' },
              ].map((d) => (
                <div key={d.label} className="flex gap-4">
                  <span className="text-xs tracking-wider text-[#8B8279] uppercase w-24 shrink-0 pt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{d.label}</span>
                  <span className="text-sm text-[#2C2420]" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>The Story Behind</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-normal text-[#2C2420] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              {product.name}
            </h2>
            <p className="text-[#5C4A3E] leading-relaxed text-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {product.description}
            </p>
            <div className="mt-8">
              <h3 className="text-xs tracking-widest text-[#8B8279] uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>What Makes It Special</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.features.map((feature) => {
                  const Icon = iconMap[feature.icon] || Shield
                  return (
                    <div key={feature.title} className="flex gap-3">
                      <div className="w-10 h-10 border border-[#E8D5B0] flex items-center justify-center shrink-0 text-[#C9A96E]">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2C2420]" style={{ fontFamily: 'var(--font-inter)' }}>{feature.title}</p>
                        <p className="text-xs text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-[#F5F1EB]">
            <img src={product.images[1] || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>Customer Reviews</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-[#F0EBE1] p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < review.rating ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-[#D4C9BE]'} />
                    ))}
                  </div>
                  <h4 className="font-normal text-[#2C2420] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{review.title}</h4>
                  <p className="text-[#5C4A3E] text-sm leading-relaxed italic" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1rem' }}>{review.body}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <img src={review.avatar} alt={review.user} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-medium text-[#2C2420]" style={{ fontFamily: 'var(--font-inter)' }}>{review.user}</p>
                      <div className="flex items-center gap-1">
                        <CheckCircle size={10} className="text-[#5C8C6C]" />
                        <span className="text-[10px] text-[#5C8C6C]" style={{ fontFamily: 'var(--font-inter)' }}>Verified Purchase</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>You May Also Love</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#F0EBE1] md:hidden z-40">
        <div className="flex gap-3">
          <div>
            <p className="text-xs text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>Price</p>
            <p className="text-lg font-normal text-[#2C2420]" style={{ fontFamily: 'var(--font-playfair)' }}>{formatPrice(product.price)}</p>
          </div>
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-medium transition-all ${addedToCart ? 'bg-[#5C8C6C] text-white' : 'bg-[#2C2420] text-white'}`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {addedToCart ? <><CheckCircle size={15} /> Added!</> : <><ShoppingBag size={15} /> Add to Bag</>}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
