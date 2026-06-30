import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '../components/StatCard'
import { Package, Ingredient, TrendingUp, DollarSign } from 'lucide-react'
import { useStore } from '../store/store'

function Dashboard() {
  const { products, ingredients } = useStore()

  const chartData = products.slice(0, 5).map(p => ({
    name: p.name.substring(0, 10),
    cost: p.totalCost,
    price: p.sellingPrice,
    profit: (p.sellingPrice - p.totalCost).toFixed(2)
  }))

  const totalRevenue = products.reduce((sum, p) => sum + p.sellingPrice, 0)
  const totalCost = products.reduce((sum, p) => sum + p.totalCost, 0)
  const totalProfit = totalRevenue - totalCost
  const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0

  const pieData = [
    { name: 'Profit', value: totalProfit },
    { name: 'Cost', value: totalCost }
  ]

  const COLORS = ['#10b981', '#ef4444']

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          trend={12}
          color="blue"
        />
        <StatCard
          title="Total Ingredients"
          value={ingredients.length}
          icon={Ingredient}
          trend={5}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          trend={8}
          color="green"
        />
        <StatCard
          title="Profit Margin"
          value={`${profitMargin}%`}
          icon={TrendingUp}
          trend={-2}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Costs vs Prices</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#ef4444" name="Cost" />
                <Bar dataKey="price" fill="#10b981" name="Price" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No products to display
            </div>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Distribution</h2>
          {pieData[0].value > 0 || pieData[1].value > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No data to display
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
