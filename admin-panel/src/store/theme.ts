import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '../types'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      
      setTheme: (theme: Theme) => {
        set({ theme })
        applyTheme(theme)
      },
      
      toggleTheme: () => {
        const { theme } = get()
        const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'green' : 'light'
        set({ theme: nextTheme })
        applyTheme(nextTheme)
      }
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme)
        }
      }
    }
  )
)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark', 'green')
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('theme-storage')
  if (stored) {
    try {
      const { state } = JSON.parse(stored)
      applyTheme(state.theme)
    } catch (error) {
      console.error('Failed to parse theme from localStorage:', error)
    }
  }
}