import ProductsClient from '@/components/product/ProductsClient'
import { getProducts, getCategories } from '@/lib/supabase/queries'
import { adaptProduct } from '@/lib/supabase/adapters'
import { products as staticProducts, categories as staticCategories } from '@/data/products'

export default async function ProductsPage() {
  const [productsRaw, categoriesRaw] = await Promise.all([
    getProducts().catch(() => []),
    getCategories().catch(() => []),
  ])

  const products = productsRaw.length > 0 ? productsRaw.map(adaptProduct) : staticProducts
  const categories = categoriesRaw.length > 0
    ? categoriesRaw.map((c) => ({ name: c.name, image: c.image_url ?? '', count: c.product_count ?? 0 }))
    : staticCategories

  return <ProductsClient products={products} categories={categories} />
}
