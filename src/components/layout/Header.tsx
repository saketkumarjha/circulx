'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Mail, ShoppingBag, User, Menu } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/Modal"
import Login from '@/app/login/page'
import Signup from '@/app/signup/page'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<'login' | 'signup'>('login')
  const router = useRouter()
  
  const categories = [
    "Storage Tanks, Drums",
    "Oils, Grease & Lubricants",
    "Heater, Thermostat",
    "Wire Mesh & Gratings",
    "Containers",
    "Papers",
    "Wire Mesh & Gratings",
    "Containers",
    "Papers"
  ]

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  const openModal = (content: 'login' | 'signup') => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const switchModalContent = () => {
    setModalContent(modalContent === 'login' ? 'signup' : 'login')
  }

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Positioned at top left */}
          <Link href="/" className="flex items-center gap-2 mr-auto">
            <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Circulx</span>
          </Link>

          {/* Search Bar - Centered on larger screens */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-gray-300"
              />
            </div>
          </div>

          {/* Right Navigation - Shifted more to the right */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <button className="relative hidden sm:block">
              <Mail className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
            </button>
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <User className="w-6 h-6 text-gray-600" />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => openModal('login')}
                className="hidden sm:block px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                Sign In
              </button>
            )}
            <button
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-4 sm:hidden">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-gray-300"
                />
              </div>
              {!user && (
                <button 
                  onClick={() => openModal('login')}
                  className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Categories Navigation */}
      <div className="bg-[#004D40] text-white overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-3 space-x-4 sm:space-x-8">
            <span className="text-sm whitespace-nowrap">Explore:</span>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="text-sm whitespace-nowrap hover:text-gray-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onBack={switchModalContent}
      >
        {modalContent === 'login' ? (
          <Login onSignupClick={switchModalContent} />
        ) : (
          <Signup onLoginClick={switchModalContent} />
        )}
      </Modal>
    </header>
  )
}