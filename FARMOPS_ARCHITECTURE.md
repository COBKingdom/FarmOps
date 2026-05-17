# FarmOps - Agricultural Operations Management Platform
## Enterprise Architecture Documentation

---

## Overview

FarmOps is a professional operational management platform for farms, agribusinesses, and food production operations across Africa. It's designed as part of the TrueOps ecosystem and built on enterprise-grade architecture inspired by AquaOps but adapted specifically for agriculture workflows.

### Key Features
- Multi-farm/branch operations management
- Production batch tracking (poultry, fishery, crops, livestock)
- Comprehensive inventory management with low-stock alerts
- Advanced financial tracking (sales, expenses, debtors)
- Real-time dashboards with KPI metrics
- Role-based access control (RBAC)
- Mobile-optimized responsive design
- Dark/light theme support
- PWA-ready architecture

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + Custom design tokens
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charting**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Date Handling**: date-fns

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Row-Level Security**: PostgreSQL RLS Policies
- **Real-time**: Supabase Realtime

---

## Database Schema

### Core Tables

#### `farms`
- Owner's primary farm entity
- Manages farm metadata, location, timezone, currency
- Supports subscription tiers

#### `branches`
- Multi-location support
- Each branch tracks separate operations, inventory
- Manager assignment capability

#### `products`
- Feed types, chemicals, raw materials, seeds
- Supports multiple units of measure
- Price tracking and supplier relationships

#### `inventory`
- Real-time stock tracking at branch level
- Quantity on hand, reserved, available
- Warehouse location tracking
- Last counted timestamp for audits

#### `inventory_movements`
- Audit trail for all inventory changes
- Tracks: stock-in, stock-out, adjustments
- Links to reference transactions
- User tracking for accountability

#### `production_batches`
- Core production lifecycle management
- Batch type (poultry, fish, crops, etc.)
- Quantity tracking (started, alive, expected yield, actual yield)
- Status progression (active, completed, cancelled, paused)

#### `production_logs`
- Daily production metrics
- Egg production, weight, mortality, feed consumption
- Unique constraint per batch/date/metric
- User recording attribution

#### `expenses`
- Categorized operational costs
- Feed, labor, medication, utilities, maintenance
- Payment tracking and approval workflows
- Branch-level cost isolation

#### `sales`
- Revenue tracking tied to batches
- Customer management
- Payment status tracking (paid, unpaid, partial)
- Product and quantity flexibility

#### `debtors`
- Customer credit tracking
- Outstanding debt calculation
- Payment history
- Status management

#### `staff`
- Employee/user management
- Role assignment
- Hire date, salary, contact info
- Auth user linking for system access

#### `user_profiles`
- User metadata and preferences
- Theme, language, timezone settings
- Two-factor authentication state
- Avatar URL for UI personalization

#### `activity_logs`
- System audit trail
- All actions tracked with user attribution
- IP and user agent capture
- Entity-level action tracking

#### `notifications`
- User notification system
- Read/unread state
- Linked to farms for isolation

#### `suppliers`
- Supplier directory
- Contact and payment terms
- Status tracking

#### `bank_accounts`
- Farm financial accounts
- Balance tracking
- Multi-account support

---

## Folder Structure

```
/vercel/share/v0-project/
├── app/                           # Next.js app router
│   ├── (auth)/                   # Auth routes (grouped)
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── callback/
│   │   └── error/
│   ├── (dashboard)/              # Protected routes (grouped)
│   │   ├── dashboard/
│   │   ├── inventory/
│   │   │   ├── feed/
│   │   │   ├── materials/
│   │   │   ├── chemicals/
│   │   │   └── warehouse/
│   │   ├── production/
│   │   │   ├── batches/
│   │   │   ├── yield/
│   │   │   ├── mortality/
│   │   │   └── harvest/
│   │   ├── finance/
│   │   │   ├── sales/
│   │   │   ├── expenses/
│   │   │   ├── cashflow/
│   │   │   └── debtors/
│   │   ├── farm/
│   │   │   ├── poultry/
│   │   │   ├── fishery/
│   │   │   ├── crops/
│   │   │   └── livestock/
│   │   ├── staff/
│   │   ├── reports/
│   │   └── system/
│   │       ├── settings/
│   │       ├── notifications/
│   │       └── billing/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home/redirect
│   └── globals.css               # Global styles with design tokens
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   ├── topbar.tsx            # Header with search & profile
│   │   └── dashboard-layout.tsx  # Protected layout wrapper
│   ├── dashboard/
│   │   ├── kpi-card.tsx          # KPI metric card
│   │   └── charts.tsx            # Chart components
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── proxy.ts              # Session proxy
│   ├── icons.tsx                 # Icon component factory
│   ├── utils.ts                  # Helper utilities (cn function)
│   ├── mock-data.ts              # Development mock data
│   └── validation.ts             # Input validation schemas
├── hooks/                        # Custom React hooks
│   ├── use-farm.ts               # Farm data hook
│   └── use-auth.ts               # Auth state hook
├── store/
│   └── farmStore.ts              # Zustand farm state store
├── config/
│   ├── navigation.ts             # Sidebar navigation structure
│   └── permissions.ts            # RBAC configuration
├── types/
│   ├── app.ts                    # Application domain types
│   ├── database.ts               # Supabase generated types
│   └── index.ts                  # Type exports
├── middleware.ts                 # Auth middleware
├── tailwind.config.ts            # Tailwind configuration
├── next.config.mjs               # Next.js configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## Key Architectural Patterns

### 1. Modular Route Organization
- **Auth Routes** (`(auth)`) - Public routes for login/signup
- **Dashboard Routes** (`(dashboard)`) - Protected routes with auth check
- **Module Organization** - Grouped by feature (inventory, finance, production, etc.)

### 2. Supabase Integration
- **Client-side**: Uses `@supabase/supabase-js` for browser operations
- **Server-side**: Uses `@supabase/ssr` for secure server rendering
- **RLS Policies**: Row-level security ensures multi-tenant data isolation
- **Trigger-based Auto-provisioning**: User profiles auto-created on signup

### 3. State Management (Zustand)
```typescript
// Farm store example
const { farm, branches, profile, selectedBranchId } = useFarmStore()
```
- Minimal boilerplate
- Persistent across components
- Single source of truth for app state

### 4. Component Structure
- **Layout Components**: Sidebar, Topbar, DashboardLayout
- **Dashboard Components**: KPICard, Charts, DataTables
- **shadcn/ui Integration**: Pre-built accessible components
- **Responsive Design**: Mobile-first with Tailwind breakpoints

### 5. Design Token System
```css
:root {
  --primary: oklch(0.45 0.2 80);      /* Green */
  --accent: oklch(0.35 0.15 140);     /* Teal */
  --background: oklch(0.98 0.001 70); /* Off-white */
  --foreground: oklch(0.2 0.01 0);    /* Dark gray */
}
```
- Supports light and dark themes
- OKLCH color space for perceptual consistency
- Semantic naming (primary, secondary, muted, destructive)

### 6. Role-Based Access Control
```typescript
enum UserRole {
  SUPER_ADMIN,
  FARM_OWNER,
  OPERATIONS_MANAGER,
  ACCOUNTANT,
  SUPERVISOR,
  INVENTORY_OFFICER,
  SALES_OFFICER,
  STAFF_VIEWER,
}
```
- Modular permission system
- Future middleware for route protection
- Farm-level isolation

---

## Dashboard Metrics

The dashboard displays 8 core KPI metrics:

1. **Total Revenue** - Sum of all sales (trend +12.5%)
2. **Operating Expenses** - Sum of expense categories (trend -3.2%)
3. **Net Profit** - Revenue minus expenses (trend +8.3%)
4. **Active Batches** - Count of in-progress production batches
5. **Low Stock Alerts** - Inventory below reorder level
6. **Outstanding Debts** - Customer credit outstanding
7. **Feed Consumption (Today)** - Daily feed usage
8. **Mortality Rate** - Weekly average mortality percentage

### Charts
- **Production Trends**: 7-day egg production line chart
- **Revenue vs Expenses**: Bar chart comparison
- **Expense Breakdown**: Pie chart by category
- **Sales Trend**: Weekly revenue and order count

---

## Authentication Flow

1. **Signup** - User creates account with farm details
   - Email verification trigger
   - Auto-creates user profile
   - Redirects to success page

2. **Login** - Email/password authentication
   - Session management via HTTP-only cookies
   - Farm and branch data loaded on first access
   - Redirects to dashboard

3. **Logout** - User signs out
   - Session cleared
   - Redirects to login page

4. **Protected Routes** - Middleware checks auth status
   - Unauthorized users redirected to login
   - User data pre-fetched in layout

---

## Inventory System

### Stock Movements
- **Stock-In**: Receiving from suppliers
- **Stock-Out**: Sales or usage
- **Adjustments**: Inventory corrections
- **Transfers**: Between branches

### Alerts
- Low stock warnings at reorder level
- Critical status at 50% of reorder level
- Automated suggestion to reorder

### Audit Trail
- Every movement logged to `inventory_movements`
- User attribution for accountability
- Reference linking (sales, production, purchases)

---

## Production Workflows

### Poultry (Broilers)
1. Chick purchase → Batch creation
2. Daily feed tracking
3. Weekly mortality logging
4. Growth monitoring
5. Harvest at market weight
6. Sales recording
7. Profit calculation

### Poultry (Layers)
1. Pullet rearing
2. Production cycle setup
3. Daily egg production tracking
4. Feed consumption monitoring
5. Ongoing sales until replacement

### Fishery
1. Pond setup/stocking
2. Feed tracking
3. Water quality logs (optional)
4. Growth monitoring
5. Harvest management
6. Sales analytics

### Crops
1. Land preparation
2. Planting cycle
3. Fertilizer tracking
4. Irrigation logs
5. Pest management records
6. Harvest records
7. Warehouse intake

---

## Financial System

### Expense Tracking
- **Categories**: Feed, Labor, Medication, Utilities, Maintenance, Transport, Other
- **Approval Workflow**: Pending → Approved
- **Payment Methods**: Bank transfer, Cash, Check
- **Recurring**: Template support (TBD)

### Sales Management
- Tied to production batches
- Customer tracking
- Payment status (Paid, Unpaid, Partial)
- Multi-product support

### Debtors
- Customer credit tracking
- Outstanding amount calculation
- Payment history
- Collection notes

### Cash Flow
- Bank account management
- Balance tracking
- Transfer history
- Reconciliation support (TBD)

---

## Mobile Optimization

### Responsive Breakpoints
- **Mobile** (`<640px`): Single column, collapsed navigation
- **Tablet** (`640-1024px`): Two columns, sidebar visible
- **Desktop** (`>1024px`): Full layout with all features

### Mobile Features
- Bottom navigation (future)
- Swipeable cards
- Floating action buttons
- Touch-friendly form inputs (48px+ targets)
- Offline-ready structure with service worker (future)

---

## Deployment & Performance

### Build Optimization
- Next.js 16 with Turbopack (default bundler)
- Tree-shaking of unused components
- Code splitting by route
- Dynamic imports for heavy libraries

### Runtime Performance
- Server-side rendering for protected routes
- Static generation for auth pages
- SWR for data fetching and caching
- Skeleton loaders for smooth UX

### Security
- HTTP-only cookies for sessions
- CSRF protection via Next.js
- Input validation with Zod
- RLS policies enforce data isolation
- Secrets management via environment variables

---

## Development Roadmap

### Phase 1: Foundation (Complete)
- ✅ Database schema
- ✅ Authentication system
- ✅ Layout and navigation
- ✅ Dashboard with KPIs
- ✅ Basic CRUD pages

### Phase 2: Core Features (In Progress)
- [ ] Full inventory CRUD
- [ ] Production batch workflows
- [ ] Advanced expense tracking
- [ ] Sales management
- [ ] Debtor tracking

### Phase 3: Analytics & Reports
- [ ] Financial reports (PDF/Excel export)
- [ ] Production reports
- [ ] Inventory forecasting
- [ ] Profitability analysis
- [ ] Export center

### Phase 4: Advanced Features
- [ ] Real-time notifications
- [ ] API integrations
- [ ] Mobile app (React Native)
- [ ] AI-powered insights
- [ ] Multi-language support

### Phase 5: Enterprise
- [ ] Multi-tenant SaaS
- [ ] Advanced billing integration
- [ ] Audit log export
- [ ] Custom branding
- [ ] SSO integration

---

## Configuration & Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback (dev only)

# App
NEXT_PUBLIC_APP_NAME=FarmOps
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## Testing & Quality Assurance

### Recommended Testing Tools
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Type Safety**: TypeScript strict mode
- **Linting**: ESLint with Next.js config
- **Code Formatting**: Prettier

---

## Support & Contributing

### Getting Started
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables
4. Run dev server: `pnpm dev`
5. Open `http://localhost:3000`

### Project Structure Philosophy
- **DRY**: Reusable components and utilities
- **SOLID**: Single responsibility, open/closed principles
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimize metrics and bundle size
- **Accessibility**: WCAG 2.1 AA compliance

---

## License & Attribution

FarmOps is built as part of the TrueOps ecosystem for African agriculture businesses.

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Production-Ready MVP
