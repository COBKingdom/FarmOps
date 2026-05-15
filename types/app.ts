// Domain Models
export type Farm = {
  id: string
  owner_id: string
  name: string
  description?: string
  location?: string
  phone?: string
  email?: string
  country?: string
  timezone: string
  currency_code: string
  is_active: boolean
  subscription_plan: string
  created_at: string
  updated_at: string
}

export type Branch = {
  id: string
  farm_id: string
  name: string
  location?: string
  phone?: string
  manager_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  farm_id: string
  name: string
  category: string
  description?: string
  unit_of_measure: string
  reorder_level: number
  price_per_unit?: number
  supplier_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type InventoryItem = {
  id: string
  branch_id: string
  product_id: string
  quantity_on_hand: number
  quantity_reserved: number
  quantity_available: number
  last_counted_at?: string
  warehouse_location?: string
  created_at: string
  updated_at: string
}

export type ProductionBatch = {
  id: string
  branch_id: string
  batch_type: string
  batch_number: string
  start_date?: string
  expected_end_date?: string
  actual_end_date?: string
  quantity_started?: number
  quantity_alive?: number
  expected_yield?: number
  actual_yield?: number
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

export type Expense = {
  id: string
  branch_id: string
  category: string
  description?: string
  amount: number
  expense_date: string
  payment_method?: string
  reference_number?: string
  approved_by?: string
  status: string
  notes?: string
  recorded_by?: string
  created_at: string
  updated_at: string
}

export type Sale = {
  id: string
  branch_id: string
  batch_id?: string
  customer_name: string
  product_sold: string
  quantity_sold: number
  unit_of_measure?: string
  price_per_unit: number
  total_amount: number
  sale_date: string
  payment_status: string
  notes?: string
  recorded_by?: string
  created_at: string
  updated_at: string
}

export type Debtor = {
  id: string
  farm_id: string
  customer_name: string
  phone?: string
  email?: string
  total_debt: number
  paid_amount: number
  outstanding_amount: number
  status: string
  created_at: string
  updated_at: string
}

export type StaffMember = {
  id: string
  farm_id: string
  branch_id?: string
  auth_user_id?: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  role: string
  position?: string
  hire_date?: string
  salary?: number
  status: string
  created_at: string
  updated_at: string
}

export type UserProfile = {
  id: string
  first_name?: string
  last_name?: string
  avatar_url?: string
  phone?: string
  country?: string
  timezone: string
  theme: string
  language: string
  two_factor_enabled: boolean
  created_at: string
  updated_at: string
}

// Dashboard Metrics
export type DashboardMetrics = {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  activeBatches: number
  lowStockAlerts: number
  outstandingDebts: number
  feedConsumptionToday: number
  mortalityRate: number
}

// Navigation
export type NavigationItem = {
  id: string
  label: string
  href: string
  icon: string
  children?: NavigationItem[]
  badge?: number | string
}

export type NavigationGroup = {
  id: string
  label: string
  items: NavigationItem[]
}

// UI States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type ApiResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
  code?: number
}

// Form Types
export type LoginFormData = {
  email: string
  password: string
}

export type SignupFormData = {
  email: string
  password: string
  first_name: string
  last_name: string
  farm_name: string
  country: string
}

// Batch Status
export enum BatchStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
}

// Expense Categories
export enum ExpenseCategory {
  FEED = 'feed',
  LABOR = 'labor',
  MEDICATION = 'medication',
  UTILITIES = 'utilities',
  MAINTENANCE = 'maintenance',
  TRANSPORT = 'transport',
  OTHER = 'other',
}

// Sale Status
export enum SaleStatus {
  UNPAID = 'unpaid',
  PARTIAL = 'partial',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

// Role Types
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  FARM_OWNER = 'farm_owner',
  OPERATIONS_MANAGER = 'operations_manager',
  ACCOUNTANT = 'accountant',
  SUPERVISOR = 'supervisor',
  INVENTORY_OFFICER = 'inventory_officer',
  SALES_OFFICER = 'sales_officer',
  STAFF_VIEWER = 'staff_viewer',
}
