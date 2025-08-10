'use client'

import Layout from './components/layout/Layout'
import ComprehensiveProductPage from './components/product/ComprehensiveProductPage'
import { useProduct } from './hooks/useProducts'

interface ProductPageProps {
  onNavigateBack?: () => void
  productId?: number
}

export default function ProductPage({ onNavigateBack, productId = 1 }: ProductPageProps) {
  const { product, loading, error } = useProduct(productId)

  // Mock product data for now since API might not be ready
  const mockProduct = {
    id: 1,
    name: "Basic Tee",
    description: "The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.",
    price: 35,
    category: { id: 1, name: "Clothing", created_at: "2024-01-01" },
    image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
    stock: 10,
    available: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }

  const currentProduct = product || mockProduct

  if (loading) {
    return (
      <Layout onNavigateBack={onNavigateBack}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <div className="bg-gray-200 h-96 rounded"></div>
              <div className="mt-8 lg:mt-0">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout onNavigateBack={onNavigateBack}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">Error loading product</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout onNavigateBack={onNavigateBack}>
      {/* Comprehensive Product Page */}
      <ComprehensiveProductPage 
        productData={{
          name: currentProduct.name,
          price: currentProduct.price,
          description: currentProduct.description,
          rating: 3.9,
          reviewCount: 512,
          images: [
            currentProduct.image || "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-01.jpg",
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-02.jpg"
          ],
          colors: [
            { name: "Black", value: "black", available: true },
            { name: "Heather Grey", value: "heather-grey", available: true }
          ],
          sizes: [
            { name: "XXS", value: "xxs", available: true },
            { name: "XS", value: "xs", available: true },
            { name: "S", value: "s", available: true },
            { name: "M", value: "m", available: true },
            { name: "L", value: "l", available: true },
            { name: "XL", value: "xl", available: false }
          ]
        }}
      />
    </Layout>
  )
}
