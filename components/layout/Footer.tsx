import Link from 'next/link'
import { Share2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#2C2420] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-heading text-2xl tracking-[0.18em] uppercase mb-0.5">Aavansa</h3>
            <p className="font-body text-[9px] tracking-[0.35em] text-[#C9A96E] uppercase mb-5">Luxury Jewellery</p>
            <p className="font-serif-italic text-sm text-[#B8AFA8] leading-relaxed mb-6">
              Crafting affordable luxury for the modern woman. Every piece tells a story of elegance, confidence, and everyday grace.
            </p>
            <div className="flex gap-3">
              {[Share2, ExternalLink, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[#5C4A3E] flex items-center justify-center text-[#B8AFA8] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-5">Shop</h4>
            <ul className="space-y-2.5">
              {['New Arrivals', 'Best Sellers', 'Necklaces', 'Earrings', 'Bangles', 'Rings', 'Bridal', 'Gift Sets'].map((item) => (
                <li key={item}>
                  <Link href="/products" className="font-body text-sm text-[#B8AFA8] hover:text-[#C9A96E] transition-colors tracking-wide">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-body text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-5">Help</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Size Guide', 'Care Instructions', 'Shipping Policy', 'Return Policy', 'Track Order', 'Contact Us', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-[#B8AFA8] hover:text-[#C9A96E] transition-colors tracking-wide">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex gap-3 text-sm text-[#B8AFA8]">
                <Mail size={15} className="mt-0.5 shrink-0 text-[#C9A96E]" />
                <span className="font-body">hello@aavansa.com</span>
              </li>
              <li className="flex gap-3 text-sm text-[#B8AFA8]">
                <Phone size={15} className="mt-0.5 shrink-0 text-[#C9A96E]" />
                <span className="font-body">+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-sm text-[#B8AFA8]">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#C9A96E]" />
                <span className="font-body">Mumbai, Maharashtra</span>
              </li>
            </ul>
            <div className="mt-7">
              <h5 className="font-body text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-3">We Accept</h5>
              <div className="flex gap-2 flex-wrap">
                {['UPI', 'Visa', 'MC', 'RuPay', 'COD'].map((p) => (
                  <span key={p} className="font-body text-[9px] border border-[#5C4A3E] text-[#B8AFA8] px-2.5 py-1 rounded tracking-wider">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#3D3430]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-[#8B8279] tracking-wide">
            © {new Date().getFullYear()} Aavansa. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="font-body text-xs text-[#8B8279] hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
