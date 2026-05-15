'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/lib/icons'
import { useFarmStore } from '@/store/farmStore'
import { useState, useEffect } from 'react'
import type { UserProfile } from '@/types/app'

export function Topbar() {
  const router = useRouter()
  const { profile } = useFarmStore()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      router.push('/auth/login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="h-16 bg-card border-b border-border sticky top-0 z-10 flex items-center justify-between px-8">
      {/* Search */}
      <div className="flex-1 flex items-center gap-3 max-w-md">
        <div className="w-full relative">
          <Icon
            name="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search operations..."
            className="w-full pl-10 pr-4 h-10 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <Icon name="Bell" className="w-5 h-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <Icon name="Users2" className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="font-medium text-sm text-foreground">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-xs text-muted-foreground">Farm Owner</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/system/settings">
                <Icon name="Settings" className="w-4 h-4 mr-2" />
                Settings
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/system/settings?tab=profile">
                <Icon name="Users2" className="w-4 h-4 mr-2" />
                Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={loading}>
              <Icon name="LogOut" className="w-4 h-4 mr-2" />
              {loading ? 'Logging out...' : 'Logout'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
