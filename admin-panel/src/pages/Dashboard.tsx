import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'positive' as const,
    icon: DollarSign,
    description: 'from last month',
  },
  {
    title: 'Total Users',
    value: '2,350',
    change: '+180.1%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'from last month',
  },
  {
    title: 'Total Orders',
    value: '12,234',
    change: '+19%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
    description: 'from last month',
  },
  {
    title: 'Total Products',
    value: '573',
    change: '+201',
    changeType: 'positive' as const,
    icon: Package,
    description: 'from last month',
  },
]

const recentOrders = [
  {
    id: '#3210',
    customer: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '$42.25',
    status: 'Completed',
  },
  {
    id: '#3209',
    customer: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '$74.99',
    status: 'Processing',
  },
  {
    id: '#3208',
    customer: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '$99.99',
    status: 'Completed',
  },
  {
    id: '#3207',
    customer: 'William Kim',
    email: 'will@email.com',
    amount: '$39.99',
    status: 'Pending',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your store.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-3 py-1">
              <Eye className="w-4 h-4 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1 text-red-500" />
                    )}
                    <span className={stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                    <span className="ml-1">{stat.description}</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="lg:col-span-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Chart component would go here
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    (Use libraries like Recharts or Chart.js)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                You have {recentOrders.length} orders this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {order.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm font-medium">{order.amount}</div>
                      <Badge
                        variant={
                          order.status === 'Completed' ? 'success' :
                          order.status === 'Processing' ? 'info' :
                          'warning'
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}