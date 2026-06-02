'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Gift, Sparkles } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const { subscribeNewsletter } = await import('@/lib/supabase/queries')
      await subscribeNewsletter(email)
    } catch {}
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#2C2420] relative overflow-hidden">
      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9A96E 0,#C9A96E 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <Gift size={17} className="text-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Exclusive Members Club</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight mb-3">
            Join the Inner Circle
          </h2>
          <p className="font-serif-italic text-white/55 text-xl mb-5">
            Get 15% off your first order + early access to new collections
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {['15% Off First Order', 'Early Access to New Arrivals', 'Exclusive Member Offers', 'Style Tips & Care Guides'].map((perk) => (
              <span key={perk} className="flex items-center gap-1.5 font-body text-[10px] text-white/45 tracking-wider uppercase">
                <Sparkles size={9} className="text-[#C9A96E]" />
                {perk}
              </span>
            ))}
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-heading text-xl text-white font-normal mb-2">Welcome to the Inner Circle!</h3>
              <p className="font-serif-italic text-white/50 text-lg">Your 15% discount code has been sent to {email}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/8 border border-white/15 text-white placeholder:text-white/35 px-5 py-4 font-body text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#C9A96E] text-white px-7 py-4 font-body text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#A07840] transition-colors flex items-center gap-2 justify-center shrink-0 disabled:opacity-60"
              >
                {loading ? 'Joining...' : <><span>Subscribe</span><ArrowRight size={13} /></>}
              </button>
            </form>
          )}

          <p className="font-body text-white/25 text-xs mt-4 tracking-wider">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  )
}
