import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  variant: string
  brandName: string
  brandLogo: string
  ptr: number
  mrp: number
  quantity: number
  scheme?: string | null
  stock: number
  maxAvailable: number // Track maximum available stock
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  isOpen: boolean
  stockUpdates: { [productId: string]: number } // Track real-time stock changes
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false,
  stockUpdates: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity' | 'maxAvailable'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      const currentStock = state.stockUpdates[action.payload.id] ?? action.payload.stock
      
      if (existingItem) {
        // Check if we can add more (don't exceed available stock)
        if (existingItem.quantity < currentStock) {
          existingItem.quantity += 1
          // Update real-time stock
          state.stockUpdates[action.payload.id] = currentStock - 1
        }
      } else {
        // Add new item if stock is available
        if (currentStock > 0) {
          state.items.push({ 
            ...action.payload, 
            quantity: 1,
            maxAvailable: currentStock
          })
          // Update real-time stock
          state.stockUpdates[action.payload.id] = currentStock - 1
        }
      }
      
      cartSlice.caseReducers.updateTotals(state)
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload)
      
      if (existingItem) {
        // Return stock when removing from cart
        const currentStock = state.stockUpdates[action.payload] ?? existingItem.stock
        
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
          // Return 1 item to stock
          state.stockUpdates[action.payload] = currentStock + 1
        } else {
          // Return all quantity to stock and remove item
          state.stockUpdates[action.payload] = currentStock + existingItem.quantity
          state.items = state.items.filter(item => item.id !== action.payload)
        }
      }
      
      cartSlice.caseReducers.updateTotals(state)
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        const currentStock = state.stockUpdates[action.payload.id] ?? existingItem.stock
        const oldQuantity = existingItem.quantity
        const newQuantity = action.payload.quantity
        
        if (newQuantity <= 0) {
          // Return all stock and remove item
          state.stockUpdates[action.payload.id] = currentStock + oldQuantity
          state.items = state.items.filter(item => item.id !== action.payload.id)
        } else if (newQuantity <= currentStock + oldQuantity) {
          // Update quantity and adjust stock
          existingItem.quantity = newQuantity
          state.stockUpdates[action.payload.id] = currentStock + oldQuantity - newQuantity
        }
        // If newQuantity exceeds available stock, don't update
      }
      
      cartSlice.caseReducers.updateTotals(state)
    },
    
    clearCart: (state) => {
      // Return all stock when clearing cart
      state.items.forEach(item => {
        const currentStock = state.stockUpdates[item.id] ?? item.stock
        state.stockUpdates[item.id] = currentStock + item.quantity
      })
      
      state.items = []
      cartSlice.caseReducers.updateTotals(state)
    },
    
    // New action to update stock from external sources
    updateStock: (state, action: PayloadAction<{ id: string; stock: number }>) => {
      const { id, stock } = action.payload
      state.stockUpdates[id] = stock
      
      // Update existing cart items if stock changes
      const cartItem = state.items.find(item => item.id === id)
      if (cartItem) {
        cartItem.stock = stock
        // If cart quantity exceeds new stock, adjust it
        if (cartItem.quantity > stock) {
          cartItem.quantity = Math.max(0, stock)
        }
      }
      
      cartSlice.caseReducers.updateTotals(state)
    },
    
    // Sync stock updates with products
    syncStockUpdates: (state, action: PayloadAction<{ [productId: string]: number }>) => {
      state.stockUpdates = { ...state.stockUpdates, ...action.payload }
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    updateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + (item.ptr * item.quantity), 0)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  updateStock,
  syncStockUpdates,
} = cartSlice.actions

export default cartSlice.reducer
