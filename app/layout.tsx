import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import MusicPlayer from '@/components/ui/MusicPlayer'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import LoadingScreen from '@/components/ui/LoadingScreen'
import PageTransition from '@/components/ui/PageTransition'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Aavansa — Luxury Jewellery for Every Day',
  description: 'Discover Aavansa — premium imitation jewellery designed for the modern woman. Affordable everyday luxury, delivered in gift-ready packaging.',
  keywords: 'jewellery, imitation jewellery, fashion jewellery, affordable luxury, necklaces, earrings, bangles, bridal jewellery',
  openGraph: {
    title: 'Aavansa — Luxury Jewellery for Every Day',
    description: 'Premium imitation jewellery. Affordable luxury for every occasion.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="font-body antialiased cursor-none">
        <SmoothScrollProvider>
          <CartProvider>
            <WishlistProvider>
              <LoadingScreen />
              <CustomCursor />
              <Header />
              <main className="min-h-screen">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <CartDrawer />
              <MusicPlayer />
            </WishlistProvider>
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
