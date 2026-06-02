'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

const navLinks = [
  {
    label: 'Collections',
    href: '/products',
    sub: ['Necklaces', 'Earrings', 'Bangles', 'Rings', 'Bridal', 'Traditional'],
  },
  { label: 'Best Sellers', href: '/products?filter=bestseller' },
  { label: 'New Arrivals', href: '/products?filter=new' },
  { label: 'Bridal', href: '/products?category=bridal' },
  { label: 'Gifts', href: '/products?category=gifts' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { cartCount, toggleCart } = useCart()
  const { count: wishlistCount } = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#2C2420] text-white text-center py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block text-[11px] tracking-[0.2em] uppercase font-body">
          Free Shipping Above ₹999 &nbsp;·&nbsp; Premium Gift Packaging On Every Order &nbsp;·&nbsp; 6-Month Tarnish-Free Guarantee &nbsp;·&nbsp; Easy 7-Day Returns &nbsp;·&nbsp; Free Shipping Above ₹999 &nbsp;·&nbsp; Premium Gift Packaging On Every Order &nbsp;·&nbsp; 6-Month Tarnish-Free Guarantee &nbsp;·&nbsp; Easy 7-Day Returns &nbsp;·&nbsp;
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-[#F0EBE1]'
            : 'bg-[#FDFAF5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2 text-[#2C2420] hover:text-[#C9A96E] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 text-center">
              <span className="font-heading text-2xl md:text-3xl tracking-[0.18em] text-[#2C2420] uppercase block">
                Aavansa
              </span>
              <span className="font-body text-[9px] tracking-[0.35em] text-[#C9A96E] uppercase block -mt-0.5">
                Luxury Jewellery
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.sub && setActiveMenu(link.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 font-body text-[11px] tracking-[0.18em] text-[#2C2420] hover:text-[#C9A96E] transition-colors uppercase font-medium"
                  >
                    {link.label}
                    {link.sub && <ChevronDown size={12} />}
                  </Link>

                  <AnimatePresence>
                    {link.sub && activeMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-3 w-48 bg-white shadow-xl border-t-2 border-[#C9A96E] py-1"
                      >
                        {link.sub.map((sub) => (
                          <Link
                            key={sub}
                            href={`/products?category=${sub.toLowerCase()}`}
                            className="block px-5 py-2.5 font-body text-[11px] tracking-wider text-[#5C4A3E] hover:text-[#C9A96E] hover:bg-[#FDFAF5] transition-colors uppercase"
                          >
                            {sub}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 md:gap-2">
              <button className="p-2 text-[#2C2420] hover:text-[#C9A96E] transition-colors hidden sm:flex" aria-label="Search">
                <Search size={19} />
              </button>
              <Link href="/wishlist" className="p-2 text-[#2C2420] hover:text-[#C9A96E] transition-colors relative hidden sm:flex" aria-label="Wishlist">
                <Heart size={19} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C9A96E] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-body font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleCart}
                className="p-2 text-[#2C2420] hover:text-[#C9A96E] transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={19} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#C9A96E] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-body font-medium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t border-[#F0EBE1] overflow-hidden"
            >
              <div className="px-5 py-5 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block font-body text-xs tracking-[0.18em] text-[#2C2420] uppercase font-medium py-3 border-b border-[#F5F1EB] hover:text-[#C9A96E] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-4">
                  <Link href="/wishlist" className="flex items-center gap-2 text-[#8B8279] hover:text-[#C9A96E] transition-colors" onClick={() => setMobileOpen(false)}>
                    <Heart size={17} />
                    <span className="font-body text-xs tracking-wider">Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
