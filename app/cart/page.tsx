'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Gift } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { products } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartCount, subtotal, shipping, total, discount } = useCart()
  const upsells = products.filter((p) => !items.find((i) => i.product.id === p.id)).slice(0, 4)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag size={64} className="text-[#D4C9BE] mb-6" />
        <h1 className="text-4xl font-normal text-[#2C2420] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          Your Bag is Empty
        </h1>
        <p className="text-[#8B8279] text-lg italic mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Discover our collection and find your perfect piece
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-10 py-4 bg-[#2C2420] text-white text-sm tracking-widest uppercase hover:bg-[#C9A96E] transition-colors"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Shop Collection <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-normal text-[#2C2420] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          Your Bag
        </h1>
        <p className="text-[#8B8279] mb-10" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}>
          {cartCount} {cartCount === 1 ? 'item' : 'items'}
        </p>

        {/* Bundle Offer */}
        <div className="bg-[#F5EDD8] border border-[#E8D5B0] p-4 mb-8 flex items-center gap-4">
          <Gift size={20} className="text-[#C9A96E] shrink-0" />
          <p className="text-sm text-[#2C2420]" style={{ fontFamily: 'var(--font-inter)' }}>
            {cartCount >= 3
              ? '🎉 15% discount applied! You are saving ' + formatPrice(discount)
              : cartCount >= 2
              ? '✨ 10% discount applied! Add 1 more item for 15% off'
              : 'Add 2+ items to get 10% off · Add 3+ items for 15% off'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-5 bg-white p-5 border border-[#F0EBE1]"
              >
                <div className="w-28 h-32 shrink-0 overflow-hidden bg-[#F5F1EB]">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#C9A96E] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                    {item.product.category}
                  </p>
                  <h3 className="text-lg font-normal text-[#2C2420] mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {item.product.name}
                  </h3>
                  {item.selectedColor && (
                    <p className="text-xs text-[#8B8279] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                      Colour: {item.selectedColor}
                    </p>
                  )}
                  <div className="flex items-center justify-between flex-wrap gap-4 mt-3">
                    <div className="flex items-center border border-[#E8D5B0]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-9 text-center text-sm" style={{ fontFamily: 'var(--font-inter)' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420]"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-normal text-[#2C2420]" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button onClick={() => removeItem(item.product.id)} className="text-[#D4C9BE] hover:text-[#8B4A4A] transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white border border-[#F0EBE1] p-6 sticky top-24">
              <h2 className="text-xl font-normal text-[#2C2420] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Order Summary
              </h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-playfair)' }}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#5C8C6C]">
                    <span style={{ fontFamily: 'var(--font-inter)' }}>Bundle Discount</span>
                    <span style={{ fontFamily: 'var(--font-playfair)' }}>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>Shipping</span>
                  <span className={shipping === 0 ? 'text-[#5C8C6C]' : ''} style={{ fontFamily: 'var(--font-playfair)' }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>
                    Add {formatPrice(999 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="border-t border-[#F0EBE1] pt-3 flex justify-between font-medium text-base">
                  <span style={{ fontFamily: 'var(--font-inter)' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-playfair)' }}>{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#2C2420] text-white text-xs tracking-widest uppercase hover:bg-[#C9A96E] transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Checkout <ArrowRight size={14} />
              </Link>
              <div className="mt-4 flex flex-col gap-2">
                {['Secure 256-bit SSL Encryption', 'Easy 7-day Returns', 'Free Gift Packaging'].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-[10px] text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>
                    <span className="text-[#C9A96E]">✓</span> {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upsells */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
              Complete the Look
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {upsells.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
