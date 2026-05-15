'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icon } from '@/lib/icons'
import { motion } from 'framer-motion'
import { mockProductionBatches } from '@/lib/mock-data'

const getBatchStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'completed':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'cancelled':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'paused':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function BatchesPage() {
  const activeBatches = mockProductionBatches.filter((b) => b.status === 'active').length
  const totalBatches = mockProductionBatches.length
  const avgMortality = 2.3

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Batch Management</h1>
          <p className="text-muted-foreground">Monitor production batches and cycles</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" className="w-4 h-4 mr-2" />
          Create Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Active Batches</p>
              <Icon name="Layers" className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{activeBatches}</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Total Batches</p>
              <Icon name="BarChart3" className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalBatches}</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Avg Mortality</p>
              <Icon name="TrendingUp" className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{avgMortality}%</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }}>
          <Card className="p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
              <Icon name="Package" className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">7,815 units</p>
          </Card>
        </motion.div>
      </div>

      <Card className="p-6 rounded-2xl border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Production Batches</h3>
          <Button variant="outline" size="sm">
            <Icon name="Filter" className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="space-y-3">
          {mockProductionBatches.map((batch) => (
            <motion.div key={batch.id} whileHover={{ x: 4 }}>
              <Card className="p-4 border border-border/30 hover:border-border/60 hover:bg-secondary/20 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-sm font-bold text-foreground">{batch.batch_number}</p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getBatchStatusColor(
                          batch.status
                        )}`}
                      >
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{batch.batch_type}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {batch.quantity_alive}/{batch.quantity_started} units
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Started: {batch.start_date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-4">
                    <Icon name="ChevronRight" className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
