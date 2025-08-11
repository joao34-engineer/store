import type { 
  Product, Category, Brand, Cart, Wishlist, Order, ProductReview,
  ApiResponse, AuthUser, RegisterData, LoginData, UserProfile, Coupon,
  ProductFilters, ReviewFormData, AddToCartData 
} from '../types'
import { mockApiService } from './mockApi'

// Base API configuration
const API_BASE_URL = 'http://localhost:8000/api'

// Check if we're in production (GitHub Pages) or local development
const isProduction = window.location.hostname.includes('github.io')

class ApiService {
  private token: string | null = null

  constructor() {
    this.token = localStorage.getItem('authToken')
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Token ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, defaultOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Authentication methods
  async register(data: RegisterData): Promise<AuthUser> {
    if (isProduction) {
      throw new Error('Registration not available in production')
    }
    const response = await this.request<AuthUser>('/store/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    this.setToken(response.token)
    return response
  }

  async login(data: LoginData): Promise<AuthUser> {
    if (isProduction) {
      throw new Error('Login not available in production')
    }
    const response = await this.request<AuthUser>('/store/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    this.setToken(response.token)
    return response
  }

  async logout(): Promise<void> {
    if (isProduction) {
      this.clearToken()
      return
    }
    await this.request('/store/auth/logout/', {
      method: 'POST'
    })
    this.clearToken()
  }

  private setToken(token: string) {
    this.token = token
    localStorage.setItem('authToken', token)
  }

  private clearToken() {
    this.token = null
    localStorage.removeItem('authToken')
  }

  // Product methods
  async getProducts(filters: ProductFilters = {}): Promise<ApiResponse<Product>> {
    if (isProduction) {
      const products = await mockApiService.getProducts()
      return {
        results: products,
        count: products.length,
        next: undefined,
        previous: undefined
      }
    }

    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })

    const queryString = params.toString()
    const endpoint = `/store/products/${queryString ? `?${queryString}` : ''}`
    
    return this.request<ApiResponse<Product>>(endpoint)
  }

  async getProduct(slug: string): Promise<Product> {
    if (isProduction) {
      return mockApiService.getProductBySlug(slug)
    }
    return this.request<Product>(`/store/products/${slug}/`)
  }

  async searchProducts(query: string): Promise<ApiResponse<Product>> {
    if (isProduction) {
      const products = await mockApiService.getProducts()
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      )
      return {
        results: filtered,
        count: filtered.length,
        next: undefined,
        previous: undefined
      }
    }
    return this.request<ApiResponse<Product>>(`/store/search/?q=${encodeURIComponent(query)}`)
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    if (isProduction) {
      return mockApiService.getCategories()
    }
    const response = await this.request<ApiResponse<Category>>('/store/categories/')
    return response.results
  }

  async getCategory(id: number): Promise<Category> {
    if (isProduction) {
      return mockApiService.getCategory(id)
    }
    return this.request<Category>(`/store/categories/${id}/`)
  }

  // Brand methods
  async getBrands(): Promise<Brand[]> {
    if (isProduction) {
      return []
    }
    const response = await this.request<ApiResponse<Brand>>('/store/brands/')
    return response.results
  }

  // Cart methods
  async getCart(): Promise<Cart> {
    if (isProduction) {
      throw new Error('Cart not available in production')
    }
    return this.request<Cart>('/store/cart/')
  }

  async addToCart(data: AddToCartData): Promise<{ message: string; cart: Cart }> {
    if (isProduction) {
      throw new Error('Cart not available in production')
    }
    return this.request<{ message: string; cart: Cart }>('/store/cart/', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async updateCartItem(itemId: number, quantity: number): Promise<{ message: string; cart: Cart }> {
    if (isProduction) {
      throw new Error('Cart not available in production')
    }
    return this.request<{ message: string; cart: Cart }>(`/store/cart/items/${itemId}/`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    })
  }

  async removeCartItem(itemId: number): Promise<{ message: string; cart: Cart }> {
    if (isProduction) {
      throw new Error('Cart not available in production')
    }
    return this.request<{ message: string; cart: Cart }>(`/store/cart/items/${itemId}/`, {
      method: 'DELETE'
    })
  }

  // Wishlist methods
  async getWishlist(): Promise<Wishlist> {
    if (isProduction) {
      throw new Error('Wishlist not available in production')
    }
    return this.request<Wishlist>('/store/wishlist/')
  }

  async toggleWishlist(productId: number): Promise<{ message: string; wishlist: Wishlist }> {
    if (isProduction) {
      throw new Error('Wishlist not available in production')
    }
    return this.request<{ message: string; wishlist: Wishlist }>('/store/wishlist/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId })
    })
  }

  // Review methods
  async getProductReviews(productId: number): Promise<ApiResponse<ProductReview>> {
    if (isProduction) {
      return {
        results: [],
        count: 0,
        next: undefined,
        previous: undefined
      }
    }
    return this.request<ApiResponse<ProductReview>>(`/store/reviews/?product_id=${productId}`)
  }

  async createReview(data: ReviewFormData): Promise<ProductReview> {
    if (isProduction) {
      throw new Error('Reviews not available in production')
    }
    return this.request<ProductReview>('/store/reviews/', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Order methods
  async getOrders(): Promise<ApiResponse<Order>> {
    if (isProduction) {
      throw new Error('Orders not available in production')
    }
    return this.request<ApiResponse<Order>>('/store/orders/')
  }

  async getOrder(orderNumber: string): Promise<Order> {
    if (isProduction) {
      throw new Error('Orders not available in production')
    }
    return this.request<Order>(`/store/orders/${orderNumber}/`)
  }

  // Coupon methods
  async validateCoupon(code: string, cartTotal: number): Promise<{ valid: boolean; coupon: Coupon; discount_amount: number }> {
    if (isProduction) {
      throw new Error('Coupons not available in production')
    }
    return this.request<{ valid: boolean; coupon: Coupon; discount_amount: number }>('/store/coupons/validate/', {
      method: 'POST',
      body: JSON.stringify({ code, cart_total: cartTotal })
    })
  }

  // User Profile methods
  async getUserProfile(): Promise<UserProfile> {
    if (isProduction) {
      throw new Error('User profile not available in production')
    }
    return this.request<UserProfile>('/store/profile/')
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token
  }

  getCurrentToken(): string | null {
    return this.token
  }
}

export const apiService = new ApiService()
export default apiService
