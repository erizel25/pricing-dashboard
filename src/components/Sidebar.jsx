import React from 'react'
import { BarChart3, Package, Ingredient, Settings } from 'lucide-react'

function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'ingredients', label: 'Ingredients', icon: Ingredient },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-64 bg-slate-900 text-white shadow-lg flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">💰 Pricing Hub</h1>
        <p className="text-sm text-slate-400 mt-1">Admin Dashboard</p>
      </div>
      
      <nav className="p-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 p-3 rounded-lg">
          <p className="text-sm text-slate-400">Version 1.0</p>
          <p className="text-xs text-slate-500 mt-1">© 2024 Pricing Hub</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
