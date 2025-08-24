import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  variant: string
  mrp: number
  ptr: number
  stock: number
  scheme?: string | null
  brandKey: string
  brandName: string
  brandLogo: string
  brandIcon: string
}

interface ProductsState {
  allProducts: Product[]
  filteredProducts: Product[]
  selectedCategory: string
  searchQuery: string
  isLoading: boolean
}

const initialState: ProductsState = {
  allProducts: [],
  filteredProducts: [],
  selectedCategory: 'All',
  searchQuery: '',
  isLoading: false,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload
      state.filteredProducts = action.payload
    },
    
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      productsSlice.caseReducers.filterProducts(state)
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      productsSlice.caseReducers.filterProducts(state)
    },
    
    filterProducts: (state) => {
      let filtered = state.allProducts
      
      // Filter by category
      if (state.selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.brandName === state.selectedCategory)
      }
      
      // Filter by search query
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.brandName.toLowerCase().includes(query) ||
          product.variant.toLowerCase().includes(query)
        )
      }
      
      state.filteredProducts = filtered
    },
    
    updateProductStock: (state, action: PayloadAction<{ id: string; stock: number }>) => {
      const product = state.allProducts.find(p => p.id === action.payload.id)
      if (product) {
        product.stock = action.payload.stock
      }
      
      const filteredProduct = state.filteredProducts.find(p => p.id === action.payload.id)
      if (filteredProduct) {
        filteredProduct.stock = action.payload.stock
      }
    },
    
    // Batch update multiple products stock
    batchUpdateStock: (state, action: PayloadAction<{ [productId: string]: number }>) => {
      Object.entries(action.payload).forEach(([id, stock]) => {
        const product = state.allProducts.find(p => p.id === id)
        if (product) {
          product.stock = stock
        }
        
        const filteredProduct = state.filteredProducts.find(p => p.id === id)
        if (filteredProduct) {
          filteredProduct.stock = stock
        }
      })
    },
    
    // Reserve stock (when adding to cart)
    reserveStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.allProducts.find(p => p.id === action.payload.id)
      if (product && product.stock >= action.payload.quantity) {
        product.stock -= action.payload.quantity
      }
      
      const filteredProduct = state.filteredProducts.find(p => p.id === action.payload.id)
      if (filteredProduct && filteredProduct.stock >= action.payload.quantity) {
        filteredProduct.stock -= action.payload.quantity
      }
    },
    
    // Release stock (when removing from cart)
    releaseStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.allProducts.find(p => p.id === action.payload.id)
      if (product) {
        product.stock += action.payload.quantity
      }
      
      const filteredProduct = state.filteredProducts.find(p => p.id === action.payload.id)
      if (filteredProduct) {
        filteredProduct.stock += action.payload.quantity
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setProducts,
  setSelectedCategory,
  setSearchQuery,
  updateProductStock,
  batchUpdateStock,
  reserveStock,
  releaseStock,
  setLoading,
} = productsSlice.actions

export default productsSlice.reducer
