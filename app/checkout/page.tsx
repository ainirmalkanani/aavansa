'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, ChevronLeft, Truck, RotateCcw } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { initiateRazorpayPayment } from '@/lib/razorpay'
import type { CheckoutForm } from '@/types'

const initialForm: CheckoutForm = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', pincode: '',
  paymentMethod: 'razorpay',
}

const STATES = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Uttar Pradesh',
  'West Bengal', 'Rajasthan', 'Telangana', 'Andhra Pradesh', 'Kerala', 'Punjab',
  'Haryana', 'Madhya Pradesh', 'Odisha', 'Assam', 'Bihar', 'Goa']

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, discount, clearCart } = useCart()
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const update = (field: keyof CheckoutForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setLoading(true)

    try {
      const { createOrder, confirmOrderPayment } = await import('@/lib/supabase/queries')

      // Persist order to Supabase first
      const orderPayload = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        payment_method: form.paymentMethod,
        subtotal: subtotal * 100,
        shipping: shipping * 100,
        discount: discount * 100,
        total: total * 100,
        items: items.map((i) => ({
          product_id: i.product.id,
          product_name: i.product.name,
          product_image: i.product.images[0] ?? '',
          quantity: i.quantity,
          unit_price: i.product.price * 100,
          total_price: i.product.price * i.quantity * 100,
          selected_color: i.selectedColor,
        })),
      }

      const { orderId } = await createOrder(orderPayload).catch(() => ({ orderId: '' }))

      if (form.paymentMethod === 'cod') {
        setSuccess(true)
        clearCart()
        setLoading(false)
        return
      }

      await initiateRazorpayPayment({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: total * 100,
        currency: 'INR',
        name: 'Aavansa',
        description: `Order of ${items.length} item(s)`,
        order_id: `order_${Date.now()}`,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#C9A96E' },
        handler: async (response) => {
          if (orderId) {
            await confirmOrderPayment(orderId, response).catch(() => {})
          }
          setSuccess(true)
          clearCart()
          setLoading(false)
        },
        modal: { ondismiss: () => setLoading(false) },
      })
    } catch {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white border border-[#F0EBE1] p-12"
        >
          <div className="w-20 h-20 bg-[#F5EDD8] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#C9A96E]" />
          </div>
          <h1 className="text-3xl font-normal text-[#2C2420] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            Order Confirmed!
          </h1>
          <p className="text-[#5C4A3E] mb-2 italic text-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Thank you for choosing Aavansa
          </p>
          <p className="text-[#8B8279] text-sm mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
            We've sent your order confirmation to {form.email || 'your email'}. Expect delivery in 3-5 business days.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/products"
              className="w-full py-4 bg-[#2C2420] text-white text-xs tracking-widest uppercase hover:bg-[#C9A96E] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Continue Shopping
            </Link>
            <Link href="/" className="text-sm text-[#8B8279] hover:text-[#C9A96E] transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8B8279] mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem' }}>
            Your cart is empty
          </p>
          <Link href="/products" className="text-sm text-[#C9A96E] underline" style={{ fontFamily: 'var(--font-inter)' }}>
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Checkout Header */}
      <div className="bg-white border-b border-[#F0EBE1] py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl tracking-[0.15em] text-[#2C2420] uppercase" style={{ fontFamily: 'var(--font-playfair)' }}>
            Aavansa
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>
            <Shield size={14} className="text-[#C9A96E]" />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <Link href="/cart" className="flex items-center gap-1 text-sm text-[#8B8279] hover:text-[#2C2420] mb-8 transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
              <ChevronLeft size={16} /> Back to Cart
            </Link>

            <form onSubmit={handlePayment} className="space-y-8">
              {/* Contact */}
              <div>
                <h2 className="text-xl font-normal text-[#2C2420] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { id: 'firstName', label: 'First Name', type: 'text' },
                    { id: 'lastName', label: 'Last Name', type: 'text' },
                  ].map(({ id, label, type }) => (
                    <div key={id}>
                      <label className="block text-xs tracking-wider text-[#8B8279] uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        value={form[id as keyof CheckoutForm]}
                        onChange={(e) => update(id as keyof CheckoutForm, e.target.value)}
                        required
                        className="w-full border-b border-[#D4C9BE] bg-transparent py-3 text-sm text-[#2C2420] placeholder:text-[#B8AFA8] focus:outline-none focus:border-[#C9A96E] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs tracking-wider text-[#8B8279] uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                      className="w-full border-b border-[#D4C9BE] bg-transparent py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-[#8B8279] uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      required
                      pattern="[0-9]{10}"
                      className="w-full border-b border-[#D4C9BE] bg-transparent py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-xl font-normal text-[#2C2420] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Delivery Address
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs tracking-wider text-[#8B8279] uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                      Address
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                      required
                      placeholder="House no., Street, Area"
                      className="w-full border-b border-[#D4C9BE] bg-transparent py-3 text-sm placeholder:text-[#B8AFA8] focus:outline-none focus:border-[#C9A96E] transition-colors"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-1">
                      <label className="block text-xs tracking-wider text-[#8B8279] uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => update('city', e.target.value)}
                        required
                        className="w-full border-b border-[#D4C9BE] bg-transparent py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs tracking-wider text-[#8B8279] uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>State</label>
                      <select
                        value={form.state}
                        onChange={(e) => update('state', e.target.value)}
                        required
                        className="w-full border-b border-[#D4C9BE] bg-transparent py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors cursor-pointer"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        <option value="">Select</option>
                        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs tracking-wider text-[#8B8279] uppercase mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Pincode</label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) => update('pincode', e.target.value)}
                        required
                        pattern="[0-9]{6}"
                        className="w-full border-b border-[#D4C9BE] bg-transparent py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-xl font-normal text-[#2C2420] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'razorpay', label: 'Online Payment', sub: 'UPI, Cards, Net Banking, Wallets', icon: '💳' },
                    { value: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives', icon: '💵' },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                        form.paymentMethod === method.value
                          ? 'border-[#C9A96E] bg-[#FDFAF5]'
                          : 'border-[#F0EBE1] bg-white hover:border-[#E8D5B0]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={form.paymentMethod === method.value}
                        onChange={() => update('paymentMethod', method.value)}
                        className="accent-[#C9A96E]"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-[#2C2420]" style={{ fontFamily: 'var(--font-inter)' }}>{method.label}</p>
                        <p className="text-xs text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>{method.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#C9A96E] text-white text-sm tracking-widest uppercase font-medium hover:bg-[#A07840] transition-colors disabled:opacity-60"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {loading ? 'Processing...' : `Place Order · ${formatPrice(total)}`}
              </motion.button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#F0EBE1] p-6 sticky top-24">
              <h2 className="text-lg font-normal text-[#2C2420] mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 overflow-hidden bg-[#F5F1EB]">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#2C2420] text-white text-[10px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#2C2420] line-clamp-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {item.product.name}
                      </p>
                      {item.selectedColor && (
                        <p className="text-[10px] text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>
                          {item.selectedColor}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-[#2C2420] shrink-0" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0EBE1] pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-playfair)' }}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#5C8C6C]">
                    <span style={{ fontFamily: 'var(--font-inter)' }}>Discount</span>
                    <span style={{ fontFamily: 'var(--font-playfair)' }}>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>Shipping</span>
                  <span className={shipping === 0 ? 'text-[#5C8C6C]' : ''} style={{ fontFamily: 'var(--font-playfair)' }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="border-t border-[#F0EBE1] pt-3 flex justify-between font-medium">
                  <span style={{ fontFamily: 'var(--font-inter)' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-playfair)' }}>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {[
                  { icon: Shield, text: 'Secure SSL Checkout' },
                  { icon: Truck, text: '3-5 day delivery' },
                  { icon: RotateCcw, text: '7-day easy returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-[#8B8279]" style={{ fontFamily: 'var(--font-inter)' }}>
                    <Icon size={13} className="text-[#C9A96E]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
