import type { Product, Category, ApiResponse } from '../types'
import { mockApiService } from './mockApi'

// Base API configuration
const API_BASE_URL = 'http://localhost:8000/api'

// Check if we're in production (GitHub Pages) or local development
const isProduction = window.location.hostname.includes('github.io')

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
    if (isProduction) {
      return mockApiService.getProducts()
    }
    const response = await this.request<ApiResponse<Product>>('/store/products/')
    return response.results
  }

  async getProduct(id: number): Promise<Product> {
    if (isProduction) {
      return mockApiService.getProduct(id)
    }
    return this.request<Product>(`/store/products/${id}/`)
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    if (isProduction) {
      return mockApiService.getProductsByCategory(categoryId)
    }
    const response = await this.request<ApiResponse<Product>>(`/store/category/${categoryId}/products/`)
    return response.results
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
}

export const apiService = new ApiService()
export default apiService
