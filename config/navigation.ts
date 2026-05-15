import type { NavigationGroup } from '@/types/app'

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'main',
    label: 'MAIN',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'LayoutDashboard',
      },
      {
        id: 'operations',
        label: 'Operations Overview',
        href: '/operations',
        icon: 'ClipboardList',
      },
      {
        id: 'activities',
        label: 'Daily Activities',
        href: '/activities',
        icon: 'Calendar',
      },
    ],
  },
  {
    id: 'farm_management',
    label: 'FARM MANAGEMENT',
    items: [
      {
        id: 'poultry',
        label: 'Poultry',
        href: '/farm/poultry',
        icon: 'Bird',
      },
      {
        id: 'fishery',
        label: 'Fishery',
        href: '/farm/fishery',
        icon: 'Fish',
      },
      {
        id: 'crops',
        label: 'Crop Production',
        href: '/farm/crops',
        icon: 'Sprout',
      },
      {
        id: 'livestock',
        label: 'Livestock',
        href: '/farm/livestock',
        icon: 'Beef',
      },
      {
        id: 'greenhouse',
        label: 'Greenhouse',
        href: '/farm/greenhouse',
        icon: 'Trees',
      },
      {
        id: 'processing',
        label: 'Processing Units',
        href: '/farm/processing',
        icon: 'Factory',
      },
    ],
  },
  {
    id: 'inventory',
    label: 'INVENTORY & STOCK',
    items: [
      {
        id: 'feed_inventory',
        label: 'Feed Inventory',
        href: '/inventory/feed',
        icon: 'Package',
      },
      {
        id: 'raw_materials',
        label: 'Raw Materials',
        href: '/inventory/materials',
        icon: 'Boxes',
      },
      {
        id: 'chemicals',
        label: 'Chemicals & Medication',
        href: '/inventory/chemicals',
        icon: 'Pill',
      },
      {
        id: 'warehouse',
        label: 'Warehouse',
        href: '/inventory/warehouse',
        icon: 'Building2',
      },
      {
        id: 'purchase_orders',
        label: 'Purchase Orders',
        href: '/inventory/orders',
        icon: 'ShoppingCart',
      },
      {
        id: 'suppliers',
        label: 'Suppliers',
        href: '/inventory/suppliers',
        icon: 'Truck',
      },
    ],
  },
  {
    id: 'production',
    label: 'PRODUCTION',
    items: [
      {
        id: 'yield_tracking',
        label: 'Yield Tracking',
        href: '/production/yield',
        icon: 'TrendingUp',
      },
      {
        id: 'mortality',
        label: 'Mortality Tracking',
        href: '/production/mortality',
        icon: 'AlertTriangle',
      },
      {
        id: 'harvest',
        label: 'Harvest Records',
        href: '/production/harvest',
        icon: 'Combine',
      },
      {
        id: 'egg_production',
        label: 'Egg Production',
        href: '/production/eggs',
        icon: 'Egg',
      },
      {
        id: 'weight_monitoring',
        label: 'Weight Monitoring',
        href: '/production/weight',
        icon: 'Scale',
      },
      {
        id: 'batches',
        label: 'Batch Management',
        href: '/production/batches',
        icon: 'Layers',
      },
    ],
  },
  {
    id: 'finance',
    label: 'SALES & FINANCE',
    items: [
      {
        id: 'sales',
        label: 'Sales',
        href: '/finance/sales',
        icon: 'DollarSign',
      },
      {
        id: 'customers',
        label: 'Customers',
        href: '/finance/customers',
        icon: 'Users',
      },
      {
        id: 'debtors',
        label: 'Debtors',
        href: '/finance/debtors',
        icon: 'AlertCircle',
      },
      {
        id: 'expenses',
        label: 'Expenses',
        href: '/finance/expenses',
        icon: 'CreditCard',
      },
      {
        id: 'cash_flow',
        label: 'Cash Flow',
        href: '/finance/cashflow',
        icon: 'BarChart3',
      },
      {
        id: 'bank_accounts',
        label: 'Bank Accounts',
        href: '/finance/accounts',
        icon: 'Landmark',
      },
      {
        id: 'profitability',
        label: 'Profit Analytics',
        href: '/finance/profitability',
        icon: 'PieChart',
      },
    ],
  },
  {
    id: 'operations',
    label: 'STAFF & OPERATIONS',
    items: [
      {
        id: 'staff',
        label: 'Staff Management',
        href: '/staff/management',
        icon: 'Users2',
      },
      {
        id: 'attendance',
        label: 'Attendance',
        href: '/staff/attendance',
        icon: 'Clock',
      },
      {
        id: 'tasks',
        label: 'Task Assignment',
        href: '/staff/tasks',
        icon: 'CheckSquare',
      },
      {
        id: 'logs',
        label: 'Operational Logs',
        href: '/staff/logs',
        icon: 'FileText',
      },
      {
        id: 'incidents',
        label: 'Incident Reports',
        href: '/staff/incidents',
        icon: 'AlertTriangle',
      },
    ],
  },
  {
    id: 'reports',
    label: 'REPORTS & ANALYTICS',
    items: [
      {
        id: 'financial_reports',
        label: 'Financial Reports',
        href: '/reports/financial',
        icon: 'FileBarChart',
      },
      {
        id: 'production_reports',
        label: 'Production Reports',
        href: '/reports/production',
        icon: 'FileText',
      },
      {
        id: 'inventory_reports',
        label: 'Inventory Reports',
        href: '/reports/inventory',
        icon: 'FileBarChart',
      },
      {
        id: 'insights',
        label: 'Operational Insights',
        href: '/reports/insights',
        icon: 'Lightbulb',
      },
      {
        id: 'forecasts',
        label: 'Forecasts',
        href: '/reports/forecasts',
        icon: 'Eye',
      },
      {
        id: 'export',
        label: 'Export Center',
        href: '/reports/export',
        icon: 'Download',
      },
    ],
  },
  {
    id: 'system',
    label: 'SYSTEM',
    items: [
      {
        id: 'notifications',
        label: 'Notifications',
        href: '/system/notifications',
        icon: 'Bell',
      },
      {
        id: 'settings',
        label: 'Settings',
        href: '/system/settings',
        icon: 'Settings',
      },
      {
        id: 'billing',
        label: 'Subscription & Billing',
        href: '/system/billing',
        icon: 'CreditCard',
      },
      {
        id: 'permissions',
        label: 'Role Permissions',
        href: '/system/permissions',
        icon: 'Lock',
      },
      {
        id: 'audit',
        label: 'Audit Logs',
        href: '/system/audit',
        icon: 'BookOpen',
      },
    ],
  },
]

export function getNavigationGroups() {
  return navigationGroups
}

export function getAllNavItems() {
  return navigationGroups.flatMap((group) => group.items)
}

export function findNavItem(href: string) {
  return getAllNavItems().find((item) => item.href === href)
}
