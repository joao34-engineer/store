// Core types for the application
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent?: number
  is_active: boolean
  sort_order: number
  children?: Category[]
  created_at: string
}

export interface Brand {
  id: number
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
}

export interface ProductImage {
  id: number
  image: string
  alt_text?: string
  sort_order: number
  is_primary: boolean
}

export interface ProductAttributeValue {
  id: number
  attribute_name: string
  value: string
  slug: string
}

export interface ProductVariant {
  id: number
  sku: string
  price?: number
  price_display?: string
  stock: number
  image?: string
  attributes: ProductAttributeValue[]
}

export interface ProductReview {
  id: number
  user_name: string
  user_avatar?: string
  rating: number
  title: string
  comment: string
  is_verified_purchase: boolean
  helpful_votes: number
  created_at: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description?: string
  short_description?: string
  sku?: string
  price: number
  price_display: string
  compare_at_price?: number
  compare_at_price_display?: string
  discount_percentage: number
  is_on_sale: boolean
  category: Category
  brand?: Brand
  image?: string
  images?: ProductImage[]
  stock: number
  is_low_stock?: boolean
  low_stock_threshold?: number
  weight?: number
  dimensions?: string
  status: string
  is_featured: boolean
  variants?: ProductVariant[]
  reviews?: ProductReview[]
  average_rating: number
  review_count: number
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at?: string
}

export interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
}

export interface UserProfile {
  user: User
  phone?: string
  birth_date?: string
  avatar?: string
  newsletter_subscribed: boolean
  default_address_line1?: string
  default_address_line2?: string
  default_city?: string
  default_state?: string
  default_zip_code?: string
  default_country?: string
}

export interface CartItem {
  id: number
  product: Product
  product_id?: number
  variant?: ProductVariant
  variant_id?: number
  quantity: number
  unit_price: number
  unit_price_display: string
  total_price: number
  total_price_display: string
}

export interface Cart {
  id: number
  items: CartItem[]
  total_amount: number
  total_amount_display: string
  total_items: number
  created_at: string
  updated_at: string
}

export interface Wishlist {
  id: number
  products: Product[]
  product_count: number
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  product: Product
  variant?: ProductVariant
  quantity: number
  unit_price: number
  unit_price_display: string
  total_price: number
  total_price_display: string
}

export interface Order {
  id: number
  order_number: string
  user: User
  status: string
  status_display: string
  payment_status: string
  payment_status_display: string
  items: OrderItem[]
  subtotal: number
  subtotal_display: string
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total_amount: number
  total_amount_display: string
  billing_first_name: string
  billing_last_name: string
  billing_email: string
  shipping_first_name: string
  shipping_last_name: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Coupon {
  id: number
  code: string
  description?: string
  discount_type: 'percentage' | 'fixed'
  discount_type_display: string
  discount_value: number
  minimum_amount?: number
  is_valid: boolean
  valid_from: string
  valid_until: string
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
  details?: unknown
}

// Authentication types
export interface AuthUser {
  user: User
  token: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  first_name?: string
  last_name?: string
}

export interface LoginData {
  username: string
  password: string
}

// Filter types for product listing
export interface ProductFilters {
  category?: string
  brand?: string
  min_price?: number
  max_price?: number
  in_stock?: boolean
  featured?: boolean
  min_rating?: number
  search?: string
  ordering?: string
}

// Form types
export interface ReviewFormData {
  product: number
  rating: number
  title: string
  comment: string
}

export interface AddToCartData {
  product_id: number
  variant_id?: number
  quantity: number
}

// UI State types
export interface LoadingState {
  isLoading: boolean
  error?: string
}

export interface PaginationInfo {
  count: number
  next?: string
  previous?: string
  current_page: number
  total_pages: number
}
