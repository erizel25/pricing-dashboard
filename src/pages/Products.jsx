import React, { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import { useStore } from '../store/store'

function Products() {
  const { products, ingredients, addProduct, updateProduct, deleteProduct, calculateProductCost } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [],
    quantities: [],
    sellingPrice: ''
  })

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id)
      setFormData({
        name: product.name,
        ingredients: product.ingredients || [],
        quantities: product.quantities || [],
        sellingPrice: product.sellingPrice
      })
    } else {
      setEditingId(null)
      setFormData({ name: '', ingredients: [], quantities: [], sellingPrice: '' })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const totalCost = calculateProductCost(formData.ingredients, formData.quantities)
    
    const productData = {
      name: formData.name,
      ingredients: formData.ingredients,
      quantities: formData.quantities,
      totalCost,
      sellingPrice: parseFloat(formData.sellingPrice)
    }

    if (editingId) {
      updateProduct(editingId, productData)
    } else {
      addProduct(productData)
    }

    handleCloseModal()
  }

  const handleIngredientToggle = (ingId) => {
    setFormData(prev => {
      const newIngredients = prev.ingredients.includes(ingId)
        ? prev.ingredients.filter(id => id !== ingId)
        : [...prev.ingredients, ingId]
      
      const newQuantities = newIngredients.length > prev.ingredients.length
        ? [...prev.quantities, 1]
        : prev.quantities.filter((_, i) => i < newIngredients.length)
      
      return { ...prev, ingredients: newIngredients, quantities: newQuantities }
    })
  }

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...formData.quantities]
    newQuantities[index] = parseFloat(value) || 0
    setFormData({ ...formData, quantities: newQuantities })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Package size={48} className="mx-auto mb-4 opacity-50" />
            <p>No products yet. Add your first product to get started!</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ingredients</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Cost</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Selling Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Profit</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Margin</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(product => {
                const profit = product.sellingPrice - product.totalCost
                const margin = product.sellingPrice > 0 ? ((profit / product.sellingPrice) * 100).toFixed(1) : 0
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.ingredients?.length || 0} items</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">${product.totalCost.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">${product.sellingPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className={profit > 0 ? 'text-green-600' : 'text-red-600'}>
                        ${profit.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span className={margin > 40 ? 'text-green-600' : margin > 20 ? 'text-yellow-600' : 'text-red-600'}>
                        {margin}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Ingredients</label>
            <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-2">
              {ingredients.map(ing => {
                const index = formData.ingredients.indexOf(ing.id)
                const isSelected = index !== -1
                
                return (
                  <div key={ing.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleIngredientToggle(ing.id)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label className="ml-2 text-sm text-gray-700 flex-1">{ing.name}</label>
                    {isSelected && (
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={formData.quantities[index]}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="w-16 border rounded px-2 py-1 text-sm"
                        placeholder="Qty"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Product
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Products
