"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSearchQuery } from "@/lib/store/slices/productsSlice";
import { 
  addToRecentSearches, 
  updatePopularSearch, 
  addToSearchHistory,
  clearRecentSearches 
} from "@/lib/store/slices/searchSlice";
import productsData from "@/lib/products-data.json";

interface GoogleSearchProps {
  placeholder?: string;
  className?: string;
  redirectToProducts?: boolean; // Option to redirect to products page on search
}

// Mock data for popular searches and recent searches
const POPULAR_SEARCHES = [
  "Lays Classic",
  "Pepsi",
  "Doritos",
  "Kurkure",
  "Cheetos",
  "Uncle Chips",
  "Bingo",
  "Simply Salted"
];

export default function GoogleSearch({ 
  placeholder = "Search products...", 
  className = "",
  redirectToProducts = true 
}: GoogleSearchProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { searchQuery, allProducts, filteredProducts } = useAppSelector((state) => state.products as any);
  const { recentSearches, popularSearches } = useAppSelector((state) => state.search as any);
  
  const [localQuery, setLocalQuery] = useState(searchQuery || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    // No need for localStorage as we're using Redux
  }, []);

  // Generate suggestions based on current query
  useEffect(() => {
    if (!localQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const query = localQuery.toLowerCase();
    const productSuggestions: string[] = [];
    const brandSuggestions: string[] = [];
    const variantSuggestions: string[] = [];

    // Use Redux products if available, otherwise use static data
    const products = allProducts && allProducts.length > 0 ? allProducts : [];
    
    // If Redux doesn't have products, generate from JSON data
    if (products.length === 0) {
      Object.entries(productsData.brands).forEach(([brandKey, brand]) => {
        // Check brand name
        if (brand.name.toLowerCase().includes(query)) {
          if (!brandSuggestions.includes(brand.name)) {
            brandSuggestions.push(brand.name);
          }
        }
        
        // Check products in this brand
        brand.products.forEach((product: any) => {
          if (product.name.toLowerCase().includes(query)) {
            if (!productSuggestions.includes(product.name)) {
              productSuggestions.push(product.name);
            }
          }
          if (product.variant && product.variant.toLowerCase().includes(query)) {
            const variantText = `${product.name} ${product.variant}`;
            if (!variantSuggestions.includes(variantText)) {
              variantSuggestions.push(variantText);
            }
          }
        });
      });
    } else {
      // Generate suggestions from Redux products
      products.forEach((product: any) => {
        if (product.name.toLowerCase().includes(query)) {
          if (!productSuggestions.some(s => s.toLowerCase() === product.name.toLowerCase())) {
            productSuggestions.push(product.name);
          }
        }
        if (product.brandName.toLowerCase().includes(query)) {
          if (!brandSuggestions.some(s => s.toLowerCase() === product.brandName.toLowerCase())) {
            brandSuggestions.push(product.brandName);
          }
        }
        if (product.variant && product.variant.toLowerCase().includes(query)) {
          const variantText = `${product.name} ${product.variant}`;
          if (!variantSuggestions.some(s => s.toLowerCase() === variantText.toLowerCase())) {
            variantSuggestions.push(variantText);
          }
        }
      });
    }

    // Combine and limit suggestions
    const allSuggestions = [
      ...brandSuggestions.slice(0, 2),
      ...productSuggestions.slice(0, 3),
      ...variantSuggestions.slice(0, 2)
    ].slice(0, 6);

    setSuggestions(allSuggestions);
  }, [localQuery, allProducts]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 150); // 150ms debounce

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localQuery, dispatch]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    dispatch(setSearchQuery(query));
    
    if (query.trim()) {
      // Add to recent searches and update analytics
      dispatch(addToRecentSearches(query));
      dispatch(updatePopularSearch(query));
      dispatch(addToSearchHistory({ 
        query, 
        resultsCount: filteredProducts ? filteredProducts.length : 0 
      }));

      // Redirect to products page if specified
      if (redirectToProducts && window.location.pathname !== '/distributor/products') {
        router.push('/distributor/products');
      }
    }
    
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setLocalQuery("");
    dispatch(setSearchQuery(""));
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    const allOptions = [
      localQuery.trim() ? `Search for "${localQuery}"` : "",
      ...suggestions,
      ...recentSearches,
      ...popularSearches.map((item: any) => item.query)
    ].filter(Boolean);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < allOptions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allOptions[selectedIndex]) {
          const selectedOption = allOptions[selectedIndex];
          const query = selectedOption.startsWith('Search for "') 
            ? localQuery 
            : selectedOption;
          handleSearch(query);
        } else if (localQuery.trim()) {
          handleSearch(localQuery);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleClearRecentSearches = () => {
    dispatch(clearRecentSearches());
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue transition-all duration-200 bg-white shadow-sm"
        />
        {localQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
          {/* Current query suggestion */}
          {localQuery.trim() && (
            <div
              onClick={() => handleSearch(localQuery)}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            >
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-gray-900">Search for &quot;{localQuery}&quot;</span>
            </div>
          )}

          {/* Auto-complete suggestions */}
          {suggestions.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-900">{suggestion}</span>
                </div>
              ))}
            </>
          )}

          {/* Recent searches */}
          {!localQuery.trim() && recentSearches.length > 0 && (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recent Searches
                </span>
                <button
                  onClick={handleClearRecentSearches}
                  className="text-xs text-pepsi-blue hover:text-pepsi-blue/80"
                >
                  Clear all
                </button>
              </div>
              {recentSearches.map((search: string, index: number) => (
                <div
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-900">{search}</span>
                </div>
              ))}
            </>
          )}

          {/* Popular searches */}
          {!localQuery.trim() && recentSearches.length === 0 && (
            <>
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Popular Searches
              </div>
              {popularSearches.slice(0, 6).map((searchItem: any, index: number) => (
                <div
                  key={index}
                  onClick={() => handleSearch(searchItem.query)}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-900">{searchItem.query}</span>
                  </div>
                  <span className="text-xs text-gray-500">{searchItem.count}</span>
                </div>
              ))}
            </>
          )}

          {/* No results */}
          {localQuery.trim() && suggestions.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-500">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-medium">No suggestions found for &quot;{localQuery}&quot;</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for brands like Lays, Doritos, Kurkure</p>
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {["Lays", "Doritos", "Kurkure", "Cheetos"].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleSearch(brand)}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
