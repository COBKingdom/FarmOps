'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icon } from '@/lib/icons'
import { motion } from 'framer-motion'
import { mockSales } from '@/lib/mock-data'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const salesByDay = [
  { day: 'Mon', revenue: 5200, orders: 8 },
  { day: 'Tue', revenue: 6100, orders: 10 },
  { day: 'Wed', revenue: 4900, orders: 7 },
  { day: 'Thu', revenue: 7200, orders: 12 },
  { day: 'Fri', revenue: 8900, orders: 15 },
  { day: 'Sat', revenue: 6800, orders: 11 },
  { day: 'Sun', revenue: 5100, orders: 6 },
]

export default function SalesPage() {
  const totalRevenue = mockSales.reduce((acc, s) => acc + s.total_amount, 0)
  const paidAmount = mockSales
    .filter((s) => s.payment_status === 'paid')
    .reduce((acc, s) => acc + s.total_amount, 0)
  const unpaidAmount = mockSales
    .filter((s) => s.payment_status === 'unpaid')
    .reduce((acc, s) => acc + s.total_amount, 0)

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales</h1>
          <p className="text-muted-foreground">Track sales and revenue</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" className="w-4 h-4 mr-2" />
          Record Sale
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <Icon name="DollarSign" className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">+12.5% vs last period</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Paid Sales</p>
              <Icon name="CheckCircle" className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">{paidAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2">{mockSales.filter((s) => s.payment_status === 'paid').length} transactions</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Unpaid Sales</p>
              <Icon name="Clock" className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">{unpaidAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2">{mockSales.filter((s) => s.payment_status === 'unpaid').length} transactions</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Avg Transaction</p>
              <Icon name="TrendingUp" className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{Math.round(totalRevenue / mockSales.length).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2">{mockSales.length} total sales</p>
          </Card>
        </motion.div>
      </div>

      <motion.div whileHover={{ y: -2 }}>
        <Card className="p-6 rounded-2xl border border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Sales Trend</h3>
            <p className="text-sm text-muted-foreground">Weekly revenue and order count</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="orders" fill="#9333ea" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <Card className="p-6 rounded-2xl border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Sales</h3>
          <Button variant="outline" size="sm">
            <Icon name="Download" className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Customer</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Product</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Quantity</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSales.map((sale) => (
                <tr key={sale.id} className="border-b border-border/30 hover:bg-secondary/30">
                  <td className="px-4 py-3 text-sm text-foreground">{sale.customer_name}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{sale.product_sold}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {sale.quantity_sold} {sale.unit_of_measure}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{sale.total_amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sale.payment_status === 'paid'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {sale.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
