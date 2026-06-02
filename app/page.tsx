import HeroSection from '@/components/home/HeroSection'
import SocialProof from '@/components/home/SocialProof'
import BestSellers from '@/components/home/BestSellers'
import BrandStory from '@/components/home/BrandStory'
import WhyAavansa from '@/components/home/WhyAavansa'
import TrendingCollection from '@/components/home/TrendingCollection'
import ProductShowcase from '@/components/home/ProductShowcase'
import CustomerReviews from '@/components/home/CustomerReviews'
import InstagramGallery from '@/components/home/InstagramGallery'
import FAQ from '@/components/home/FAQ'
import Newsletter from '@/components/home/Newsletter'
import { getBestSellers, getTrendingProducts, getFeaturedProducts, getAllReviews } from '@/lib/supabase/queries'
import { adaptProduct, adaptReview } from '@/lib/supabase/adapters'
import type { Product } from '@/types'

export default async function Home() {
  // Fetch from Supabase — parallel for performance
  const [bestSellersRaw, trendingRaw, featuredRaw, reviewsRaw] = await Promise.all([
    getBestSellers(4).catch(() => []),
    getTrendingProducts(8).catch(() => []),
    getFeaturedProducts(3).catch(() => []),
    getAllReviews(6).catch(() => []),
  ])

  const bestSellers = bestSellersRaw.map(adaptProduct)
  const trending = trendingRaw.map(adaptProduct)
  const featured = featuredRaw.map(adaptProduct)
  const reviews = reviewsRaw.map(adaptReview)

  return (
    <>
      <HeroSection />
      <SocialProof />
      <BestSellers products={bestSellers} />
      <BrandStory />
      <WhyAavansa />
      <TrendingCollection products={trending} />
      <ProductShowcase products={featured} />
      <CustomerReviews reviews={reviews} />
      <InstagramGallery />
      <FAQ />
      <Newsletter />
    </>
  )
}
