'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icon } from '@/lib/icons'
import { motion } from 'framer-motion'

const mockInventory = [
  { id: '1', name: 'Broiler Starter Feed', quantity: 450, unit: 'bags', reorderLevel: 100, status: 'ok' },
  { id: '2', name: 'Broiler Finisher Feed', quantity: 230, unit: 'bags', reorderLevel: 150, status: 'low' },
  { id: '3', name: 'Layer Feed', quantity: 120, unit: 'bags', reorderLevel: 200, status: 'critical' },
  { id: '4', name: 'Fish Feed Pellets', quantity: 85, unit: 'bags', reorderLevel: 50, status: 'ok' },
  { id: '5', name: 'Grower Feed', quantity: 340, unit: 'bags', reorderLevel: 100, status: 'ok' },
]

export default function FeedInventoryPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feed Inventory</h1>
          <p className="text-muted-foreground">Manage feed stock and supply chain</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" className="w-4 h-4 mr-2" />
          Add Stock In
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div whileHover={{ y: -2 }} className="col-span-1">
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
              <Icon name="Package" className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">1,225 bags</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="col-span-1">
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
              <Icon name="AlertTriangle" className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">2 items</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="col-span-1">
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Critical</p>
              <Icon name="AlertCircle" className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">1 item</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="col-span-1">
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Stock Value</p>
              <Icon name="DollarSign" className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">125,400</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="col-span-1">
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Turnover</p>
              <Icon name="TrendingUp" className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">18 days</p>
          </Card>
        </motion.div>
      </div>

      <Card className="p-6 rounded-2xl border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Feed Stock Levels</h3>
          <Button variant="outline" size="sm">
            <Icon name="Download" className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Product</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Current Stock</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Reorder Level</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInventory.map((item) => (
                <tr key={item.id} className="border-b border-border/30 hover:bg-secondary/30">
                  <td className="px-4 py-3 text-sm text-foreground">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{item.quantity} {item.unit}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{item.reorderLevel} {item.unit}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'ok'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : item.status === 'low'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {item.status === 'ok' ? 'Optimal' : item.status === 'low' ? 'Low Stock' : 'Critical'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View</Button>
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
