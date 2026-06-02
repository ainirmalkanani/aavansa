'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, ShoppingBag, ArrowRight, Trash2, Plus, Minus, Gift } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const {
    isOpen, closeCart, items, removeItem, updateQuantity,
    cartCount, subtotal, shipping, total, discount,
  } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260, mass: 0.8 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-[#FDFAF5] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0EBE1] bg-white">
              <div>
                <h2 className="font-heading text-xl text-[#2C2420] font-normal">Your Bag</h2>
                <p className="font-body text-[10px] text-[#8B8279] tracking-wider mt-0.5">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] hover:bg-[#F5F1EB] transition-all rounded-sm"
              >
                <X size={19} />
              </button>
            </div>

            {/* Bundle offer strip */}
            {cartCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-5 py-3 bg-[#2C2420] text-white text-center"
              >
                <p className="font-body text-[10px] tracking-[0.15em]">
                  {cartCount >= 3
                    ? `🎉 15% bundle discount applied — saving ${formatPrice(discount)}!`
                    : cartCount >= 2
                    ? '✨ 10% off applied! Add 1 more for 15% off'
                    : '🛍 Add 2+ items — get 10% off automatically'}
                </p>
              </motion.div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#F5F1EB] flex items-center justify-center">
                    <ShoppingBag size={32} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-[#2C2420] font-normal mb-1">Your bag is empty</h3>
                    <p className="font-serif-italic text-[#8B8279] text-base">Discover something beautiful</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-7 py-3 bg-[#2C2420] text-white font-body text-[10px] tracking-[0.25em] uppercase hover:bg-[#C9A96E] transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
                      className="flex gap-4 py-4 border-b border-[#F0EBE1] last:border-0"
                    >
                      {/* Image */}
                      <Link href={`/products/${item.product.slug}`} onClick={closeCart}>
                        <div className="w-20 h-24 overflow-hidden shrink-0 bg-[#F5F1EB]">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-[9px] text-[#C9A96E] tracking-[0.2em] uppercase mb-0.5">
                          {item.product.category}
                        </p>
                        <Link href={`/products/${item.product.slug}`} onClick={closeCart}>
                          <h4 className="font-heading text-sm text-[#2C2420] font-normal leading-snug mb-1 line-clamp-2 hover:text-[#C9A96E] transition-colors">
                            {item.product.name}
                          </h4>
                        </Link>
                        {item.selectedColor && (
                          <p className="font-body text-[9px] text-[#B8AFA8] mb-2 tracking-wide">
                            Colour: {item.selectedColor}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          {/* Qty stepper */}
                          <div className="flex items-center border border-[#E8D5B0]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] hover:bg-[#F5F1EB] transition-colors"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-7 text-center font-body text-xs text-[#2C2420]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="w-7 h-7 flex items-center justify-center text-[#8B8279] hover:text-[#2C2420] hover:bg-[#F5F1EB] transition-colors disabled:opacity-30"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-heading text-sm font-semibold text-[#2C2420]">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-[#D4C9BE] hover:text-[#8B4A4A] transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#F0EBE1] px-5 py-5 bg-white space-y-3.5">
                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-body text-[#8B8279]">Subtotal</span>
                    <span className="font-heading">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#5C8C6C]">
                      <span className="font-body">Bundle Discount ({cartCount >= 3 ? '15%' : '10%'})</span>
                      <span className="font-heading">−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-body text-[#8B8279]">Shipping</span>
                    <span className={`font-heading ${shipping === 0 ? 'text-[#5C8C6C]' : ''}`}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-body text-[9px] text-[#B8AFA8] tracking-wide">
                      Add {formatPrice(999 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between font-semibold text-base border-t border-[#F0EBE1] pt-2.5">
                    <span className="font-body">Total</span>
                    <span className="font-heading">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Gift packaging note */}
                <div className="flex items-center gap-2 bg-[#F5EDD8] px-3 py-2.5 rounded-sm">
                  <Gift size={13} className="text-[#C9A96E] shrink-0" />
                  <p className="font-body text-[9px] text-[#5C4A3E] tracking-wide">
                    Complimentary luxury gift packaging included
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#2C2420] text-white font-body text-[10px] tracking-[0.28em] uppercase font-medium hover:bg-[#C9A96E] transition-colors duration-300 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center font-body text-[10px] tracking-wider text-[#8B8279] hover:text-[#C9A96E] transition-colors py-1"
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
