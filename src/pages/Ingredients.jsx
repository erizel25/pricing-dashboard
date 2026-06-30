import React, { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import { useStore } from '../store/store'

function Ingredients() {
  const { ingredients, addIngredient, updateIngredient, deleteIngredient } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: 'kg',
    supplier: ''
  })

  const handleOpenModal = (ingredient = null) => {
    if (ingredient) {
      setEditingId(ingredient.id)
      setFormData(ingredient)
    } else {
      setEditingId(null)
      setFormData({ name: '', price: '', unit: 'kg', supplier: '' })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const ingredientData = {
      name: formData.name,
      price: parseFloat(formData.price),
      unit: formData.unit,
      supplier: formData.supplier
    }

    if (editingId) {
      updateIngredient(editingId, ingredientData)
    } else {
      addIngredient(ingredientData)
    }

    handleCloseModal()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ingredients</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Ingredient</span>
        </button>
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {ingredients.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No ingredients yet. Add your first ingredient!
          </div>
        ) : (
          ingredients.map(ingredient => (
            <div key={ingredient.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{ingredient.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Supplier: {ingredient.supplier}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(ingredient)}
                    className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteIngredient(ingredient.id)}
                    className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-sm text-gray-600">Price per unit</p>
                <p className="text-3xl font-bold text-blue-600">${ingredient.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">Per {ingredient.unit}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Table View for details */}
      {ingredients.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ingredient Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price/Unit</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Supplier</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ingredients.map(ingredient => (
                <tr key={ingredient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{ingredient.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ingredient.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">${ingredient.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ingredient.supplier}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenModal(ingredient)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteIngredient(ingredient.id)}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Ingredient' : 'Add New Ingredient'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredient Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measurement</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="liter">Liter (L)</option>
              <option value="ml">Milliliter (ml)</option>
              <option value="dozen">Dozen</option>
              <option value="unit">Unit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
            <input
              type="text"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Ingredient
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

export default Ingredients
