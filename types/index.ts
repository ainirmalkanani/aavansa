export interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice: number
  images: string[]
  video?: string
  category: string
  subcategory?: string
  description: string
  shortDescription: string
  material: string
  weight: string
  dimensions?: string
  colors: string[]
  stock: number
  sold: number
  rating: number
  reviewCount: number
  badges: ('bestseller' | 'trending' | 'new' | 'limited')[]
  features: ProductFeature[]
  isWishlisted?: boolean
}

export interface ProductFeature {
  icon: string
  title: string
  description: string
}

export interface Review {
  id: string
  productId: string
  user: string
  avatar: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
}

export interface WishlistItem {
  product: Product
  addedAt: string
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  razorpayOrderId?: string
  createdAt: string
}

export interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  paymentMethod: 'razorpay' | 'cod'
}
