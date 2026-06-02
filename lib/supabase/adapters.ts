/**
 * Adapts Supabase DB rows to the Product type used throughout the app.
 * DB prices are stored in paise (int); UI expects rupees (number).
 */
import type { ProductWithDetails } from './queries'
import type { Product, Review as AppReview, ProductFeature } from '@/types'
import type { Database } from './database.types'

type DBReview = Database['public']['Tables']['reviews']['Row']

export function adaptProduct(p: ProductWithDetails): Product {
  const images = (p.product_images ?? [])
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((img) => img.url)

  const features: ProductFeature[] = (p.product_features ?? [])
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((f) => ({ icon: f.icon, title: f.title, description: f.description ?? '' }))

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Math.round((p.price ?? 0) / 100),
    comparePrice: Math.round((p.compare_price ?? 0) / 100),
    images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=90'],
    category: p.category_name ?? '',
    subcategory: p.subcategory ?? undefined,
    description: p.description ?? '',
    shortDescription: p.short_description ?? '',
    material: p.material ?? '',
    weight: p.weight ?? '',
    colors: p.colors ?? [],
    stock: p.stock ?? 0,
    sold: p.sold ?? 0,
    rating: Number(p.rating ?? 0),
    reviewCount: p.review_count ?? 0,
    badges: (p.badges ?? []) as Product['badges'],
    features,
  }
}

export function adaptReview(r: DBReview): AppReview {
  return {
    id: r.id,
    productId: r.product_id,
    user: r.user_name,
    avatar: r.avatar_url ?? 'https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=100&q=80',
    rating: r.rating,
    title: r.title ?? '',
    body: r.body ?? '',
    date: r.created_at?.split('T')[0] ?? '',
    verified: r.is_verified ?? false,
    helpful: r.helpful ?? 0,
    images: r.images && r.images.length > 0 ? r.images : undefined,
  }
}
