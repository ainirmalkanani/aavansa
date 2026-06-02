import { createClient } from './client'
import type { Database } from './database.types'

type Product = Database['public']['Tables']['products']['Row']
type ProductImage = Database['public']['Tables']['product_images']['Row']
type ProductFeature = Database['public']['Tables']['product_features']['Row']
type Review = Database['public']['Tables']['reviews']['Row']
type Category = Database['public']['Tables']['categories']['Row']

export type ProductWithDetails = Product & {
  product_images: ProductImage[]
  product_features: ProductFeature[]
}

// ── Products ──────────────────────────────────────────────────

export async function getProducts(opts?: {
  category?: string
  badge?: string
  featured?: boolean
  limit?: number
}) {
  const supabase = createClient()
  let query = supabase
    .from('products')
    .select(`*, product_images(*), product_features(*)`)
    .eq('is_active', true)
    .order('sold', { ascending: false })

  if (opts?.category) {
    query = query.ilike('category_name', opts.category)
  }
  if (opts?.badge) {
    query = query.contains('badges', [opts.badge])
  }
  if (opts?.featured) {
    query = query.eq('is_featured', true)
  }
  if (opts?.limit) {
    query = query.limit(opts.limit)
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as unknown as ProductWithDetails[]
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_images(*), product_features(*)`)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data as unknown as ProductWithDetails
}

export async function getBestSellers(limit = 4): Promise<ProductWithDetails[]> {
  return getProducts({ badge: 'bestseller', limit })
}

export async function getTrendingProducts(limit = 8): Promise<ProductWithDetails[]> {
  return getProducts({ badge: 'trending', limit })
}

export async function getFeaturedProducts(limit = 6): Promise<ProductWithDetails[]> {
  return getProducts({ featured: true, limit })
}

export async function getRelatedProducts(categoryName: string, excludeId: string, limit = 4): Promise<ProductWithDetails[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_images(*), product_features(*)`)
    .eq('is_active', true)
    .ilike('category_name', categoryName)
    .neq('id', excludeId)
    .limit(limit)

  if (error) throw error
  return (data ?? []) as unknown as ProductWithDetails[]
}

// ── Reviews ───────────────────────────────────────────────────

export async function getProductReviews(productId: string): Promise<Review[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('helpful', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getAllReviews(limit = 6): Promise<Review[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('helpful', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export async function submitReview(review: {
  product_id: string
  user_name: string
  rating: number
  title: string
  body: string
}): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('reviews').insert(review)
  if (error) throw error
}

// ── Categories ────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  if (error) throw error
  return data ?? []
}

// ── Orders ────────────────────────────────────────────────────

export async function createOrder(orderData: {
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  payment_method: string
  subtotal: number
  shipping: number
  discount: number
  total: number
  items: Array<{
    product_id: string
    product_name: string
    product_image: string
    quantity: number
    unit_price: number
    total_price: number
    selected_color?: string
  }>
}): Promise<{ orderId: string; orderNumber: string }> {
  const supabase = createClient()

  // Generate order number via DB function
  const { data: numData, error: numError } = await supabase
    .rpc('generate_order_number')
  if (numError) throw numError

  const orderNumber = numData as string

  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      first_name: orderData.first_name,
      last_name: orderData.last_name,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      state: orderData.state,
      pincode: orderData.pincode,
      payment_method: orderData.payment_method,
      payment_status: orderData.payment_method === 'cod' ? 'pending' : 'pending',
      status: 'pending',
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      discount: orderData.discount,
      total: orderData.total,
    })
    .select('id')
    .single()

  if (orderError) throw orderError

  // Insert order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    product_image: item.product_image,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.total_price,
    selected_color: item.selected_color ?? null,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) throw itemsError

  return { orderId: order.id, orderNumber }
}

export async function confirmOrderPayment(
  orderId: string,
  razorpayData: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('orders')
    .update({
      status: 'confirmed',
      payment_status: 'paid',
      razorpay_order_id: razorpayData.razorpay_order_id,
      razorpay_payment_id: razorpayData.razorpay_payment_id,
      razorpay_signature: razorpayData.razorpay_signature,
    })
    .eq('id', orderId)

  if (error) throw error
}

// ── Newsletter ─────────────────────────────────────────────────

export async function subscribeNewsletter(email: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email }, { onConflict: 'email' })

  if (error) throw error
}

// ── Coupons ────────────────────────────────────────────────────

export async function validateCoupon(code: string, orderTotal: number): Promise<{
  valid: boolean
  discount: number
  message: string
}> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single()

  if (error || !data) return { valid: false, discount: 0, message: 'Invalid coupon code' }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { valid: false, discount: 0, message: 'This coupon has expired' }
  }
  if (data.max_uses && data.used_count && data.used_count >= data.max_uses) {
    return { valid: false, discount: 0, message: 'This coupon has reached its usage limit' }
  }
  if (data.min_order && orderTotal < data.min_order) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order of ₹${data.min_order / 100} required for this coupon`,
    }
  }

  const discount = data.type === 'percentage'
    ? Math.round((orderTotal * data.value) / 100)
    : data.value

  return { valid: true, discount, message: `${data.value}${data.type === 'percentage' ? '%' : '₹'} discount applied!` }
}

// ── Helpers ────────────────────────────────────────────────────

/** Convert DB price (paise) to display rupees */
export function dbPriceToRupees(paise: number): number {
  return paise / 100
}

/** Convert display rupees to DB paise */
export function rupeesToDbPrice(rupees: number): number {
  return Math.round(rupees * 100)
}
