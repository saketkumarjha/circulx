'use client'

import { useState } from 'react'
import { Home, ShoppingCart, Clock, Settings, User, CreditCard, HelpCircle, BarChart } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import YouTubePlayer from "./video-player"

export default function TutorialDashboard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = "xQRo9Iy5YHM"

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r bg-gray-50/50 lg:min-h-[600px] p-4 space-y-6">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">S</div>
          <span className="font-semibold">SparkLayer</span>
        </div>
        
        <div className="p-2 bg-gray-100 rounded-md flex items-center gap-2">
          <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
          <span>B2B Store</span>
        </div>

        <nav className="space-y-1">
          <NavItem icon={<Home className="h-4 w-4" />} label="Home" />
          <NavItem icon={<ShoppingCart className="h-4 w-4" />} label="Orders" />
          <NavItem icon={<Clock className="h-4 w-4" />} label="Activity" />
          <NavItem icon={<Settings className="h-4 w-4" />} label="Configuration" />
          <NavItem icon={<User className="h-4 w-4" />} label="Account" />
          <NavItem icon={<CreditCard className="h-4 w-4" />} label="Billing" />
          <NavItem icon={<HelpCircle className="h-4 w-4" />} label="Help" />
        </nav>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Test mode</span>
            <Switch />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-xl font-semibold">Dashboard</h3>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="bg-green-50 text-green-600 border-green-100">
              Live Data
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Claire Alice</span>
            </div>
          </div>
        </div>

        {/* B2B Sales Performance */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h4 className="font-medium">B2B Sales Performance</h4>
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="60">Last 60 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative aspect-video bg-white rounded-lg border p-4">
            <YouTubePlayer 
              videoId={videoId}
              isPlaying={isPlaying}
              onPlayClick={() => setIsPlaying(true)}
            />
          </div>
        </div>

        {/* B2B Data Feed Activity */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h4 className="font-medium">B2B Data Feed Activity</h4>
            <Button variant="ghost" size="sm">View Details</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActivityCard title="Products syncronised" time="2 hours ago" />
            <ActivityCard title="Price lists syncronised" time="2 hours ago" />
            <ActivityCard title="Customers syncronised" time="2 hours ago" />
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-2 py-1.5 text-gray-600 hover:text-gray-900 cursor-pointer">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}

function ActivityCard({ title, time }: { title: string; time: string }) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <BarChart className="h-4 w-4" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        <span>Last syncronised: {time}</span>
      </div>
    </div>
  )
}

