import { create } from 'zustand'

const initialProducts = [
  { id: 1, name: 'Pizza Margherita', ingredients: [1, 2, 3], quantities: [0.2, 0.15, 0.02], totalCost: 5.50, sellingPrice: 12.00 },
  { id: 2, name: 'Pasta Carbonara', ingredients: [4, 5, 6], quantities: [0.3, 0.08, 0.1], totalCost: 4.75, sellingPrice: 11.00 },
]

const initialIngredients = [
  { id: 1, name: 'Tomato Sauce', price: 2.50, unit: 'kg', supplier: 'Fresh Foods' },
  { id: 2, name: 'Mozzarella Cheese', price: 8.00, unit: 'kg', supplier: 'Dairy Co' },
  { id: 3, name: 'Olive Oil', price: 15.00, unit: 'liter', supplier: 'Mediterranean' },
  { id: 4, name: 'Pasta', price: 1.50, unit: 'kg', supplier: 'Grain Mills' },
  { id: 5, name: 'Eggs', price: 3.00, unit: 'dozen', supplier: 'Farm Fresh' },
  { id: 6, name: 'Bacon', price: 12.00, unit: 'kg', supplier: 'Meat House' },
]

export const useStore = create((set, get) => ({
  products: initialProducts,
  ingredients: initialIngredients,
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Date.now() }]
  })),
  
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),
  
  addIngredient: (ingredient) => set((state) => ({
    ingredients: [...state.ingredients, { ...ingredient, id: Date.now() }]
  })),
  
  updateIngredient: (id, updatedIngredient) => set((state) => ({
    ingredients: state.ingredients.map(ing => ing.id === id ? { ...ing, ...updatedIngredient } : ing)
  })),
  
  deleteIngredient: (id) => set((state) => ({
    ingredients: state.ingredients.filter(ing => ing.id !== id)
  })),
  
  getProductById: (id) => {
    const product = get().products.find(p => p.id === id)
    return product
  },
  
  getIngredientById: (id) => {
    const ingredient = get().ingredients.find(ing => ing.id === id)
    return ingredient
  },
  
  calculateProductCost: (ingredientIds, quantities) => {
    const ingredients = get().ingredients
    let totalCost = 0
    
    ingredientIds.forEach((id, index) => {
      const ing = ingredients.find(i => i.id === id)
      if (ing) {
        totalCost += ing.price * (quantities[index] || 1)
      }
    })
    
    return parseFloat(totalCost.toFixed(2))
  }
}))
