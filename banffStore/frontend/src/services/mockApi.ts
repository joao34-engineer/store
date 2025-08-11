import type { Product, Category } from '../types'

// Mock data based on real Django database
const mockCategories: Category[] = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    description: "Stylish clothing for everyone",
    is_active: true,
    sort_order: 1,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Accessories",
    slug: "accessories",
    description: "Fashion accessories",
    is_active: true,
    sort_order: 2,
    created_at: "2024-01-01T00:00:00Z"
  }
]

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Basic Tee",
    slug: "basic-tee",
    description: "The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee its own look.",
    price: 35.00,
    price_display: "R$ 35,00",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[0], // Clothing
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 50,
    status: "active",
    is_featured: true,
    average_rating: 4.5,
    review_count: 23,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    description: "Made from 100% organic cotton, this sustainable t-shirt is perfect for everyday wear. Soft, comfortable, and environmentally friendly.",
    price: 28.00,
    price_display: "R$ 28,00",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[0], // Clothing
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    stock: 30,
    status: "active",
    is_featured: true,
    average_rating: 4.8,
    review_count: 15,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Classic Baseball Cap",
    slug: "classic-baseball-cap",
    description: "A timeless baseball cap made from high-quality materials. Perfect for outdoor activities or casual wear.",
    price: 25.00,
    price_display: "R$ 25,00",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[1], // Accessories
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
    stock: 40,
    status: "active",
    is_featured: true,
    average_rating: 4.3,
    review_count: 8,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Premium Hoodie",
    slug: "premium-hoodie",
    description: "Ultra-soft premium hoodie with a perfect fit. Made from a blend of cotton and polyester for maximum comfort.",
    price: 65.00,
    price_display: "R$ 65,00",
    discount_percentage: 0,
    is_on_sale: false,
    category: mockCategories[0], // Clothing
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    stock: 20,
    status: "active",
    is_featured: true,
    average_rating: 4.7,
    review_count: 12,
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
