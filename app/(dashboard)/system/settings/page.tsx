'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/lib/icons'
import { motion } from 'framer-motion'
import { useFarmStore } from '@/store/farmStore'
import { useState } from 'react'

export default function SettingsPage() {
  const { farm, profile } = useFarmStore()
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'profile', label: 'Profile', icon: 'Users2' },
    { id: 'farm', label: 'Farm', icon: 'Building2' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'security', label: 'Security', icon: 'Lock' },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and farm configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-foreground border-b-primary'
                : 'text-muted-foreground border-b-transparent hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon as any} className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 rounded-2xl border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6">General Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Language</label>
                <select className="mt-2 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>English</option>
                  <option>French</option>
                  <option>Swahili</option>
                  <option>Zulu</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Timezone</label>
                <select className="mt-2 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Africa/Johannesburg</option>
                  <option>Africa/Lagos</option>
                  <option>Africa/Nairobi</option>
                  <option>Africa/Cairo</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Theme</label>
                <div className="mt-2 flex gap-4">
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:border-primary">
                    Light
                  </button>
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:border-primary">
                    Dark
                  </button>
                  <button className="px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:border-primary">
                    Auto
                  </button>
                </div>
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90">Save Changes</Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 rounded-2xl border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input
                    type="text"
                    defaultValue={profile?.first_name || ''}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <Input
                    type="text"
                    defaultValue={profile?.last_name || ''}
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" defaultValue="admin@farm.example.com" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <Input type="tel" placeholder="+27123456789" className="mt-2" />
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90">Update Profile</Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Farm Settings */}
      {activeTab === 'farm' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 rounded-2xl border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6">Farm Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Farm Name</label>
                <Input
                  type="text"
                  defaultValue={farm?.name || ''}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Location</label>
                <Input
                  type="text"
                  defaultValue={farm?.location || ''}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Country</label>
                  <Input
                    type="text"
                    defaultValue={farm?.country || ''}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Currency</label>
                  <select className="mt-2 w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>ZAR - South African Rand</option>
                    <option>NGN - Nigerian Naira</option>
                    <option>KES - Kenyan Shilling</option>
                  </select>
                </div>
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90">Update Farm</Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Billing */}
      {activeTab === 'billing' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 rounded-2xl border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6">Subscription Plan</h3>
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-foreground">Current Plan: <span className="text-primary">Professional</span></p>
                <p className="text-xs text-muted-foreground mt-1">R 2,999/month</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Plan Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="CheckCircle" className="w-4 h-4 text-green-600" />
                    Unlimited users
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="CheckCircle" className="w-4 h-4 text-green-600" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="CheckCircle" className="w-4 h-4 text-green-600" />
                    Priority support
                  </li>
                </ul>
              </div>
              <Button variant="outline" className="mt-6">Upgrade Plan</Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="p-6 rounded-2xl border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-6">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Password</label>
                <Button variant="outline" className="mt-2">Change Password</Button>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-4">Active Sessions</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Chrome on macOS</p>
                      <p className="text-xs text-muted-foreground">Last accessed today</p>
                    </div>
                    <Button variant="ghost" size="sm">Sign Out</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
