import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser, LoginCredentials } from '../types'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  setUser: (user: AuthUser | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          // Mock user data
          const mockUser: AuthUser = {
            id: '1',
            email: credentials.email,
            name: 'Admin User',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            isActive: true
          }
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)