'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationGroups } from '@/config/navigation'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <Icon name="Sprout" className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-sidebar-foreground">PoultryOps</span>
            <span className="text-xs text-sidebar-accent-foreground">TrueOps</span>
          </div>
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="p-4 space-y-8">
        {navigationGroups.map((group) => (
          <div key={group.id}>
            <h3 className="px-3 py-2 text-xs font-semibold uppercase text-sidebar-accent-foreground opacity-70">
              {group.label}
            </h3>
            <ul className="space-y-1 px-1">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative',
                        active
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-sidebar-primary rounded-lg"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                        />
                      )}
                      <Icon
                        name={item.icon}
                        className={cn(
                          'w-5 h-5 relative z-10',
                          active ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground'
                        )}
                      />
                      <span className="relative z-10 flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="relative z-10 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
