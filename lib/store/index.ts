import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import productsReducer from './slices/productsSlice'
import searchReducer from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
