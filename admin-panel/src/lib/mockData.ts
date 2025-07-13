import type { Product, Category, Subcategory, Order, User, Banner } from '../types'

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'Books',
    slug: 'books',
    description: 'Books and literature',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '4',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Home decor and garden supplies',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
]

export const mockSubcategories: Subcategory[] = [
  {
    id: '1',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Mobile phones and accessories',
    categoryId: '1',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Computers and laptops',
    categoryId: '1',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'Men\'s Clothing',
    slug: 'mens-clothing',
    description: 'Clothing for men',
    categoryId: '2',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '4',
    name: 'Women\'s Clothing',
    slug: 'womens-clothing',
    description: 'Clothing for women',
    categoryId: '2',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced features',
    price: 999,
    discountPrice: 899,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
    ],
    category: mockCategories[0],
    subcategory: mockSubcategories[0],
    stock: 50,
    sku: 'IP15PRO001',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    featured: true
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Powerful laptop with M2 chip',
    price: 1299,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
    ],
    category: mockCategories[0],
    subcategory: mockSubcategories[1],
    stock: 25,
    sku: 'MBA2024001',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    featured: true
  },
  {
    id: '3',
    name: 'Classic T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 29,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f37f5ad3?w=400&h=400&fit=crop'
    ],
    category: mockCategories[1],
    subcategory: mockSubcategories[2],
    stock: 100,
    sku: 'TSH001',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    featured: false
  },
  {
    id: '4',
    name: 'Summer Dress',
    description: 'Elegant summer dress',
    price: 89,
    discountPrice: 69,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'
    ],
    category: mockCategories[1],
    subcategory: mockSubcategories[3],
    stock: 75,
    sku: 'DRESS001',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    featured: false
  },
  {
    id: '5',
    name: 'JavaScript: The Good Parts',
    description: 'Essential JavaScript programming guide',
    price: 39,
    images: [
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop'
    ],
    category: mockCategories[2],
    stock: 200,
    sku: 'BOOK001',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    featured: false
  },
  {
    id: '6',
    name: 'Garden Planter Set',
    description: 'Set of 3 ceramic planters',
    price: 149,
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop'
    ],
    category: mockCategories[3],
    stock: 30,
    sku: 'PLANT001',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    featured: true
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    isActive: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c446?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-02T10:00:00Z',
    updatedAt: '2024-01-02T10:00:00Z',
    isActive: true
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-03T10:00:00Z',
    updatedAt: '2024-01-03T10:00:00Z',
    isActive: true
  }
]

export const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Up to 50% off on summer collection',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    link: '/products?category=clothing',
    isActive: true,
    order: 1,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Tech Deals',
    description: 'Latest gadgets at best prices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop',
    link: '/products?category=electronics',
    isActive: true,
    order: 2,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
]

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    items: [
      {
        id: '1',
        productId: '1',
        product: mockProducts[0],
        quantity: 1,
        price: 899,
        total: 899
      }
    ],
    subtotal: 899,
    tax: 89.9,
    shipping: 10,
    total: 998.9,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    billingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-01-12T10:30:00Z'
  },
  {
    id: '2',
    userId: '3',
    user: mockUsers[2],
    items: [
      {
        id: '2',
        productId: '2',
        product: mockProducts[1],
        quantity: 1,
        price: 1299,
        total: 1299
      }
    ],
    subtotal: 1299,
    tax: 129.9,
    shipping: 0,
    total: 1428.9,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    billingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    createdAt: '2024-01-14T10:30:00Z',
    updatedAt: '2024-01-14T10:30:00Z'
  }
]