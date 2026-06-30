import React from 'react'
import { User, Bell } from 'lucide-react'

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Welcome to Pricing Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <User size={20} />
            <span className="text-sm">Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
