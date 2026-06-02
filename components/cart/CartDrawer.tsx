'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, cartCount, subtotal, shipping, total, discount } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0EBE1]">
              <div>
                <h2
                  className="text-xl font-normal text-[#2C2420]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Your Bag
                </h2>
                <p className="text-xs text-[#8B8279] mt-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Offer Bar */}
            {cartCount > 0 && (
              <div className="px-6 py-3 bg-[#F5EDD8] text-center">
                <p className="text-xs tracking-wider text-[#2C2420]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {cartCount >= 3
                    ? '🎉 15% discount applied to your order!'
                    : cartCount >= 2
                    ? '✨ 10% discount applied! Add 1 more for 15% off'
                    : '🛍 Add 1 more item for 10% off'}
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-[#D4C9BE] mb-4" />
                  <h3
                    className="text-xl font-normal text-[#2C2420] mb-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Your bag is empty
                  </h3>
                  <p className="text-[#8B8279] text-sm mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    Add some beautiful pieces to your collection
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-[#2C2420] text-white text-xs tracking-widest uppercase hover:bg-[#C9A96E] transition-colors"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 py-4 border-b border-[#F0EBE1]">
                      <div className="w-20 h-24 overflow-hidden shrink-0 bg-[#F5F1EB]">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-sm font-normal text-[#2C2420] leading-snug mb-1 line-clamp-2"
                          style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-[#C9A96E] tracking-wider uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                          {item.product.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#E8D5B0]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-sm text-[#2C2420]" style={{ fontFamily: 'var(--font-inter)' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] transition-colors"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-[#2C2420]" style={{ fontFamily: 'var(--font-playfair)' }}>
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-[#D4C9BE] hover:text-[#8B4A4A] transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#F0EBE1] px-6 py-6 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>Subtotal</span>
                    <span style={{ fontFamily: 'var(--font-playfair)' }}>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-[#5C8C6C]">
                      <span style={{ fontFamily: 'var(--font-inter)' }}>Discount ({cartCount >= 3 ? '15%' : '10%'})</span>
                      <span style={{ fontFamily: 'var(--font-playfair)' }}>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>Shipping</span>
                    <span className={shipping === 0 ? 'text-[#5C8C6C]' : ''} style={{ fontFamily: 'var(--font-playfair)' }}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium text-base pt-2 border-t border-[#F0EBE1]">
                    <span style={{ fontFamily: 'var(--font-inter)' }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-playfair)' }}>{formatPrice(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#2C2420] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#C9A96E] transition-colors group"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Proceed to Checkout
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs tracking-wider text-[#8B8279] hover:text-[#2C2420] transition-colors py-2"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
