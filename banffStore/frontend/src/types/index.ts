// Core types for the application
export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: Category
  image?: string
  stock: number
  available: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description?: string
  created_at: string
}

export interface CartItem {
  id: number
  product: Product
  quantity: number
  total_price: number
}

export interface Cart {
  id: number
  user: number
  items: CartItem[]
  total_amount: number
  created_at: string
}

export interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
}

// Navigation related types
export interface NavigationItem {
  name: string
  href?: string
  onClick?: () => void
}

export interface MegaMenuSection {
  id: string
  title: string
  items: NavigationItem[]
}

// API response types
export interface ApiResponse<T> {
  results: T[]
  count: number
  next?: string
  previous?: string
}

export interface ApiError {
  message: string
  status: number
  details?: any
}
