import type { Product, Category } from '../types'

// Mock data for testing
const mockCategories: Category[] = [
  {
    id: 1,
    name: "Women's Clothing",
    slug: "womens-clothing",
    description: "Stylish clothing for women",
    is_active: true,
    sort_order: 1,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Men's Clothing",
    slug: "mens-clothing",
    description: "Quality clothing for men",
    is_active: true,
    sort_order: 2,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    description: "Fashion accessories",
    is_active: true,
    sort_order: 3,
    created_at: "2024-01-01T00:00:00Z"
  }
]

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Women's Elegant Dress",
    slug: "womens-elegant-dress",
    description: "Beautiful elegant dress perfect for any occasion",
    price: 89.99,
    price_display: "$89.99",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[0],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
    stock: 15,
    status: "active",
    is_featured: false,
    average_rating: 0,
    review_count: 0,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Men's Casual Shirt",
    slug: "mens-casual-shirt",
    description: "Comfortable casual shirt for everyday wear",
    price: 49.99,
    price_display: "$49.99",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[1],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    stock: 25,
    status: "active",
    is_featured: false,
    average_rating: 0,
    review_count: 0,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Women's Summer Blouse",
    slug: "womens-summer-blouse",
    description: "Light and airy blouse perfect for summer",
    price: 35.99,
    price_display: "$35.99",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[0],
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
    stock: 30,
    status: "active",
    is_featured: false,
    average_rating: 0,
    review_count: 0,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Men's Formal Jacket",
    slug: "mens-formal-jacket",
    description: "Professional jacket for business occasions",
    price: 129.99,
    price_display: "$129.99",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[1],
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    stock: 12,
    status: "active",
    is_featured: false,
    average_rating: 0,
    review_count: 0,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "Designer Handbag",
    slug: "designer-handbag",
    description: "Luxury handbag with premium leather",
    price: 199.99,
    price_display: "$199.99",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[2],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    stock: 8,
    status: "active",
    is_featured: false,
    average_rating: 0,
    review_count: 0,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Women's Winter Coat",
    slug: "womens-winter-coat",
    description: "Warm and stylish coat for cold weather",
    price: 159.99,
    price_display: "$159.99",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[0],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    stock: 18,
    status: "active",
    is_featured: false,
    average_rating: 0,
    review_count: 0,
    created_at: "2024-01-01T00:00:00Z"
  }
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class MockApiService {
  // Product methods
  async getProducts(): Promise<Product[]> {
    await delay(500) // Simulate network delay
    return mockProducts
  }

  async getProduct(id: number): Promise<Product> {
    await delay(300)
    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }
    return product
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    await delay(400)
    return mockProducts.filter(p => p.category.id === categoryId)
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    await delay(300)
    return mockCategories
  }

  async getCategory(id: number): Promise<Category> {
    await delay(200)
    const category = mockCategories.find(c => c.id === id)
    if (!category) {
      throw new Error(`Category with id ${id} not found`)
    }
    return category
  }
}

export const mockApiService = new MockApiService()
export default mockApiService
