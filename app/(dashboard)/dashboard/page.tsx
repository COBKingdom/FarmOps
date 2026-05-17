'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { KPICard } from '@/components/dashboard/kpi-card'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import {
  mockDashboardMetrics,
  mockProductionData,
  mockExpenseCategories,
  mockSales,
  mockExpenses,
  mockProductionBatches,
} from '@/lib/mock-data'
import { Icon } from '@/lib/icons'
import { useFarmStore } from '@/store/farmStore'

const COLORS = ['#9333ea', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1']

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } },
}

export default function DashboardPage() {
  const { farm } = useFarmStore()

  const totalRevenue = mockSales.reduce((acc, sale) => acc + sale.total_amount, 0)
  const totalExpenses = mockExpenses.reduce((acc, exp) => acc + exp.amount, 0)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          {farm?.name || 'Welcome to PoultryOps'} - Operational command center
        </p>
      </div>

      {/* KPI Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <KPICard
            title="Total Revenue"
            value={`${totalRevenue.toLocaleString()}`}
            icon="DollarSign"
            trend={{ value: 12.5, isPositive: true }}
            variant="primary"
            description="Last 30 days"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Operating Expenses"
            value={`${totalExpenses.toLocaleString()}`}
            icon="CreditCard"
            trend={{ value: 3.2, isPositive: false }}
            variant="warning"
            description="Last 30 days"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Net Profit"
            value={`${(totalRevenue - totalExpenses).toLocaleString()}`}
            icon="TrendingUp"
            trend={{ value: 8.3, isPositive: true }}
            variant="success"
            description="Operating margin"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Active Batches"
            value={mockProductionBatches.length}
            icon="Layers"
            trend={{ value: 2, isPositive: true }}
            variant="default"
            description="In production"
          />
        </motion.div>
      </motion.div>

      {/* Secondary Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <KPICard
            title="Low Stock Alerts"
            value="5"
            icon="AlertTriangle"
            variant="danger"
            description="Items below reorder level"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Outstanding Debts"
            value="10,000"
            icon="AlertCircle"
            variant="warning"
            description="From customers"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Feed Consumption"
            value="245.5 kg"
            icon="Package"
            variant="default"
            description="Today"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <KPICard
            title="Mortality Rate"
            value="2.3%"
            icon="TrendingUp"
            trend={{ value: 0.5, isPositive: true }}
            variant="default"
            description="This week average"
          />
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Production Trends */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 rounded-2xl border border-border/50 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Production Trends</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockProductionData}>
                <defs>
                  <linearGradient id="colorEggs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="eggs"
                  stroke="#9333ea"
                  fillOpacity={1}
                  fill="url(#colorEggs)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Revenue vs Expenses */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 rounded-2xl border border-border/50 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Financial Overview</h3>
              <p className="text-sm text-muted-foreground">Revenue vs Expenses</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ name: 'Overview', revenue: totalRevenue, expenses: totalExpenses }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </motion.div>

      {/* Expense Breakdown & Recent Activities */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Expense Categories */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 rounded-2xl border border-border/50 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Expense Breakdown</h3>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockExpenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockExpenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Recent Sales */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 rounded-2xl border border-border/50 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recent Sales</h3>
                <p className="text-sm text-muted-foreground">Latest transactions</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/finance/sales">View All</a>
              </Button>
            </div>
            <div className="space-y-3">
              {mockSales.slice(0, 3).map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{sale.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{sale.product_sold}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{sale.total_amount.toLocaleString()}</p>
                    <p className={`text-xs ${sale.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {sale.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'New Batch', icon: 'Plus', href: '/production/batches' },
            { label: 'Record Sale', icon: 'DollarSign', href: '/finance/sales' },
            { label: 'Add Expense', icon: 'CreditCard', href: '/finance/expenses' },
            { label: 'Inventory Check', icon: 'Package', href: '/inventory/feed' },
          ].map((action) => (
            <Button
              key={action.label}
              asChild
              variant="outline"
              className="h-auto flex flex-col items-center justify-center py-4 gap-2 rounded-xl border border-border/50 hover:bg-secondary/50"
            >
              <a href={action.href}>
                <Icon name={action.icon as any} className="w-6 h-6" />
                <span className="text-xs text-center">{action.label}</span>
              </a>
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
