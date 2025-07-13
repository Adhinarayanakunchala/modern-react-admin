import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ViewMode, FilterOptions } from '../types'

interface UIState {
  viewMode: ViewMode
  sidebarOpen: boolean
  filters: FilterOptions
  setViewMode: (mode: ViewMode) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setFilters: (filters: FilterOptions) => void
  resetFilters: () => void
}

const initialFilters: FilterOptions = {
  search: '',
  category: '',
  subcategory: '',
  status: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 10
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      viewMode: 'table',
      sidebarOpen: true,
      filters: initialFilters,
      
      setViewMode: (mode: ViewMode) => {
        set({ viewMode: mode })
      },
      
      toggleSidebar: () => {
        const { sidebarOpen } = get()
        set({ sidebarOpen: !sidebarOpen })
      },
      
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open })
      },
      
      setFilters: (filters: FilterOptions) => {
        const { filters: currentFilters } = get()
        set({ filters: { ...currentFilters, ...filters } })
      },
      
      resetFilters: () => {
        set({ filters: initialFilters })
      }
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        sidebarOpen: state.sidebarOpen,
        filters: state.filters
      })
    }
  )
)