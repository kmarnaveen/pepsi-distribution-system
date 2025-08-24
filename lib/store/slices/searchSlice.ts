import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchAnalytics {
  query: string
  count: number
  lastSearched: number
}

interface SearchState {
  recentSearches: string[]
  popularSearches: SearchAnalytics[]
  searchHistory: { query: string; timestamp: number; resultsCount: number }[]
  suggestions: string[]
}

const initialState: SearchState = {
  recentSearches: [],
  popularSearches: [
    { query: "Lays Classic", count: 245, lastSearched: Date.now() },
    { query: "Pepsi", count: 189, lastSearched: Date.now() },
    { query: "Doritos", count: 156, lastSearched: Date.now() },
    { query: "Kurkure", count: 134, lastSearched: Date.now() },
    { query: "Cheetos", count: 98, lastSearched: Date.now() },
  ],
  searchHistory: [],
  suggestions: [],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addToRecentSearches: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim()
      if (!query) return
      
      // Remove if already exists
      state.recentSearches = state.recentSearches.filter(s => s !== query)
      // Add to beginning
      state.recentSearches.unshift(query)
      // Keep only last 10
      state.recentSearches = state.recentSearches.slice(0, 10)
    },
    
    clearRecentSearches: (state) => {
      state.recentSearches = []
    },
    
    updatePopularSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim()
      if (!query) return
      
      const existing = state.popularSearches.find(s => s.query.toLowerCase() === query.toLowerCase())
      if (existing) {
        existing.count++
        existing.lastSearched = Date.now()
      } else {
        state.popularSearches.push({
          query,
          count: 1,
          lastSearched: Date.now()
        })
      }
      
      // Sort by count and keep top 10
      state.popularSearches = state.popularSearches
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
    },
    
    addToSearchHistory: (state, action: PayloadAction<{ query: string; resultsCount: number }>) => {
      const { query, resultsCount } = action.payload
      if (!query.trim()) return
      
      state.searchHistory.unshift({
        query,
        timestamp: Date.now(),
        resultsCount
      })
      
      // Keep only last 50 searches
      state.searchHistory = state.searchHistory.slice(0, 50)
    },
    
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload
    },
    
    clearSearchHistory: (state) => {
      state.searchHistory = []
    },
  },
})

export const {
  addToRecentSearches,
  clearRecentSearches,
  updatePopularSearch,
  addToSearchHistory,
  setSuggestions,
  clearSearchHistory,
} = searchSlice.actions

export default searchSlice.reducer
