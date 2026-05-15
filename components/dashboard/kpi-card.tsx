'use client'

import { Card } from '@/components/ui/card'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { IconName } from '@/lib/icons'

interface KPICardProps {
  title: string
  value: string | number
  icon: IconName
  trend?: {
    value: number
    isPositive: boolean
  }
  description?: string
  onClick?: () => void
  className?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
}

const variantStyles = {
  default: {
    bg: 'bg-card',
    icon: 'bg-secondary',
    iconColor: 'text-muted-foreground',
  },
  primary: {
    bg: 'bg-card',
    icon: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  success: {
    bg: 'bg-card',
    icon: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  warning: {
    bg: 'bg-card',
    icon: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  danger: {
    bg: 'bg-card',
    icon: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
  },
}

export function KPICard({
  title,
  value,
  icon,
  trend,
  description,
  onClick,
  className,
  variant = 'default',
}: KPICardProps) {
  const styles = variantStyles[variant]
  const trendColor = trend?.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  const trendIcon = trend?.isPositive ? 'TrendingUp' : 'TrendingUp'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      <Card
        className={cn(
          `p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer group ${styles.bg}`,
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              `w-12 h-12 rounded-xl flex items-center justify-center ${styles.icon}`
            )}
          >
            <Icon name={icon} className={cn('w-6 h-6', styles.iconColor)} />
          </div>
          {trend && (
            <div
              className={cn(
                'text-sm font-semibold flex items-center gap-1',
                trendColor
              )}
            >
              <Icon name={trendIcon} className="w-4 h-4" />
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
