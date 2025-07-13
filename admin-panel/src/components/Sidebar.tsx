
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  FolderTree,
  Users, 
  ShoppingCart, 
  Image,
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useUIStore } from '../store/ui'
import { cn } from '../lib/utils'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Products', href: '/products' },
  { icon: FolderOpen, label: 'Categories', href: '/categories' },
  { icon: FolderTree, label: 'Subcategories', href: '/subcategories' },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
  { icon: Image, label: 'Banners', href: '/banners' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore()
  const location = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: sidebarOpen ? '16rem' : '4rem',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-card border-r border-border",
          "flex flex-col"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <motion.div
            initial={false}
            animate={{
              opacity: sidebarOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-foreground">
                Admin Panel
              </span>
            )}
          </motion.div>
          
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                    "hover:bg-muted group",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: sidebarOpen ? 1 : 0,
                      width: sidebarOpen ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "whitespace-nowrap text-sm font-medium overflow-hidden",
                      isActive ? "text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              </Link>
            )
          })}
        </nav>
      </motion.div>
    </>
  )
}