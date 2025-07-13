export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  images: string[]
  category: Category
  subcategory?: Subcategory
  stock: number
  sku: string
  status: 'active' | 'inactive' | 'draft'
  createdAt: string
  updatedAt: string
  featured: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  categoryId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  user: User
  items: OrderItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  shippingAddress: Address
  billingAddress: Address
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  total: number
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Banner {
  id: string
  title: string
  description?: string
  image: string
  link?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Settings {
  id: string
  siteName: string
  siteUrl: string
  logo?: string
  favicon?: string
  theme: 'light' | 'dark' | 'green' | 'system'
  currency: string
  timezone: string
  emailSettings: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
  }
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
  updatedAt: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type Theme = 'light' | 'dark' | 'green' | 'system'

export type ViewMode = 'table' | 'cards' | 'grid'

export interface FilterOptions {
  search?: string
  category?: string
  subcategory?: string
  status?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}