'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'Is the jewellery safe for sensitive skin?', a: 'Absolutely. All Aavansa jewellery is made with hypoallergenic materials, rigorously tested and certified safe for sensitive skin. Our pieces are nickel-free and lead-free, making them suitable for everyday wear.' },
  { q: 'How long will the gold plating last?', a: 'With proper care, our jewellery maintains its finish for 6–12 months with daily wear. We use a multi-layer plating process that is significantly more durable than standard fashion jewellery. Avoid contact with perfume, water, and chemicals to extend longevity.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day easy return policy. If you are not completely satisfied with your purchase, simply contact our team and we will arrange a free return pickup. Refunds are processed within 5–7 business days.' },
  { q: 'Do you offer gift packaging?', a: 'Yes! Every single Aavansa order arrives in our signature luxury gift box with ribbon, tissue, and a personalised care card — at no extra charge. Perfect for gifting.' },
  { q: 'How long does shipping take?', a: 'Standard delivery takes 3–5 business days across India. Express delivery (1–2 days) is available for major cities. All orders above ₹999 receive free standard shipping.' },
  { q: 'Can I customise or personalise jewellery?', a: 'Yes! We offer personalisation services for select pieces. Contact us via WhatsApp or email to discuss your requirements. Custom orders typically take 7–10 business days.' },
  { q: 'How should I care for my Aavansa jewellery?', a: 'Store your jewellery in the provided box when not in use. Avoid contact with water, perfume, lotion, and chemicals. Wipe gently with a soft cloth after wearing. Remove before swimming, exercising, or sleeping.' },
]

function Item({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-[#F0EBE1]"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-heading text-[#2C2420] font-normal text-base sm:text-lg">{item.q}</span>
        <span className={`shrink-0 w-8 h-8 border flex items-center justify-center transition-all ${open ? 'border-[#C9A96E] bg-[#C9A96E] text-white' : 'border-[#D4C9BE] text-[#8B8279]'}`}>
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="font-serif-italic text-[#5C4A3E] leading-relaxed pb-5 text-base sm:text-lg">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#C9A96E]" />
              <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">Questions & Answers</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal leading-tight mb-5">
              Frequently Asked Questions
            </h2>
            <p className="font-serif-italic text-[#5C4A3E] leading-relaxed text-lg mb-8">
              Have more questions? We are here to help. Reach us via WhatsApp, email, or call — our team responds within 2 hours.
            </p>
            <div className="p-6 bg-[#FDFAF5] border border-[#E8D5B0]">
              <p className="font-body text-[9px] tracking-[0.3em] text-[#C9A96E] uppercase mb-3">Need Help?</p>
              <p className="font-body text-[#2C2420] font-medium text-sm mb-1">WhatsApp: +91 98765 43210</p>
              <p className="font-body text-[#8B8279] text-sm">hello@aavansa.com</p>
              <p className="font-body text-[#8B8279] text-sm">Mon–Sat, 10am – 7pm IST</p>
            </div>
          </motion.div>

          {/* FAQ List */}
          <div>
            {faqs.map((faq, i) => (
              <Item key={i} item={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
