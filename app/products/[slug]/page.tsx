import { notFound } from 'next/navigation'
import { getProductBySlug, getProductReviews, getRelatedProducts } from '@/lib/supabase/queries'
import { adaptProduct, adaptReview } from '@/lib/supabase/adapters'
import { products as staticProducts, reviews as staticReviews } from '@/data/products'
import ProductDetailClient from '@/components/product/ProductDetailClient'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const productRaw = await getProductBySlug(slug).catch(() => null)
  const product = productRaw ? adaptProduct(productRaw) : staticProducts.find((p) => p.slug === slug) ?? null
  if (!product) notFound()

  const [reviewsRaw, relatedRaw] = await Promise.all([
    productRaw ? getProductReviews(productRaw.id).catch(() => []) : Promise.resolve([]),
    productRaw ? getRelatedProducts(product.category, productRaw.id, 4).catch(() => []) : Promise.resolve([]),
  ])

  const reviews = reviewsRaw.length > 0
    ? reviewsRaw.map(adaptReview)
    : staticReviews.filter((r) => r.productId === product.id)

  const related = relatedRaw.length > 0
    ? relatedRaw.map(adaptProduct)
    : staticProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  return <ProductDetailClient product={product} reviews={reviews} related={related} />
}
