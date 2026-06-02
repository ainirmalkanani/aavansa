'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Share2, Heart } from 'lucide-react'

const gallery = [
  { src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', likes: '2.4K' },
  { src: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80', likes: '1.8K' },
  { src: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80', likes: '3.1K' },
  { src: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80', likes: '2.7K' },
  { src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', likes: '1.5K' },
  { src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', likes: '4.2K' },
]

export default function InstagramGallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Share2 size={16} className="text-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-[10px] tracking-[0.4em] uppercase">@aavansa.jewels</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#2C2420] font-normal">Style Diaries</h2>
          <p className="font-serif-italic text-[#8B8279] text-lg mt-3">Tag us @aavansa.jewels to be featured</p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2">
          {gallery.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <img
                src={item.src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#2C2420]/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <Heart size={20} className="mx-auto mb-1 fill-white" />
                  <span className="font-body text-xs font-medium">{item.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.25em] uppercase text-[#2C2420] border-b border-[#2C2420] pb-0.5 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors"
          >
            <Share2 size={13} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
