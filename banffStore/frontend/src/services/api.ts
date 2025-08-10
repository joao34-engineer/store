import type { Product, Category, ApiResponse } from '../types'

// Base API configuration
const API_BASE_URL = 'http://localhost:8000/api'

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
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

  // Product methods
  async getProducts(): Promise<Product[]> {
    const response = await this.request<ApiResponse<Product>>('/store/products/')
    return response.results
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/store/products/${id}/`)
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await this.request<ApiResponse<Product>>(`/store/category/${categoryId}/products/`)
    return response.results
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    const response = await this.request<ApiResponse<Category>>('/store/categories/')
    return response.results
  }

  async getCategory(id: number): Promise<Category> {
    return this.request<Category>(`/store/categories/${id}/`)
  }
}

export const apiService = new ApiService()
export default apiService
