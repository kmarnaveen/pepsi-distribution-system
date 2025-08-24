"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ShoppingCart, Plus, Minus } from "lucide-react";
import GoogleSearch from "../../../components/GoogleSearch";
import productsData from "../../../lib/products-data.json";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  setProducts,
  setSelectedCategory,
  reserveStock,
  releaseStock,
  Product,
} from "../../../lib/store/slices/productsSlice";
import {
  addToCart,
  removeFromCart,
  CartItem,
  updateStock,
} from "../../../lib/store/slices/cartSlice";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { filteredProducts, selectedCategory } = useAppSelector(
    (state) => state.products
  );
  const { items: cartItems, totalItems } = useAppSelector(
    (state) => state.cart
  );

  // Initialize products data on component mount
  useEffect(() => {
    const allBrands = Object.keys(productsData.brands);
    const allProducts = allBrands.flatMap((brandKey) => {
      const brand =
        productsData.brands[brandKey as keyof typeof productsData.brands];
      return brand.products.map((product) => ({
        ...product,
        brandKey,
        brandName: brand.name,
        brandLogo: brand.logo,
        brandIcon: brand.icon,
        scheme: product.scheme || undefined,
      }));
    });

    dispatch(setProducts(allProducts));
  }, [dispatch]);

  // Extract categories for filter tabs
  const allBrands = Object.keys(productsData.brands);
  const categories = [
    "All",
    ...allBrands.map(
      (brand) =>
        productsData.brands[brand as keyof typeof productsData.brands].name
    ),
  ];

  const handleAddToCart = (product: Product) => {
    // Check if stock is available
    if (product.stock > 0) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          variant: product.variant,
          brandName: product.brandName,
          brandLogo: product.brandLogo,
          ptr: product.ptr,
          mrp: product.mrp,
          scheme: product.scheme,
          stock: product.stock,
        })
      );

      // Reserve stock in products
      dispatch(reserveStock({ id: product.id, quantity: 1 }));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    const cartItem = (cartItems as CartItem[]).find(
      (item: CartItem) => item.id === productId
    );
    if (cartItem) {
      dispatch(removeFromCart(productId));
      // Release stock back to products
      dispatch(releaseStock({ id: productId, quantity: 1 }));
    }
  };

  const getCartItemQuantity = (productId: string) => {
    const cartItem = cartItems.find((item: CartItem) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm safe-area-top sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/distributor" className="text-pepsi-blue">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Products</h1>
            </div>
            <Link href="/distributor/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pepsi-red text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="bg-white border-b px-4 py-3 space-y-3">
        <GoogleSearch placeholder="Search products..." />

        {/* Category Tabs */}
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => dispatch(setSelectedCategory(category))}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  category === selectedCategory
                    ? "bg-pepsi-blue text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="px-4 py-4">
        <div className="space-y-3">
          {filteredProducts.map((product: Product) => (
            <div key={product.id} className="card">
              <div className="flex items-start space-x-3">
                {/* Product Brand Logo */}
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  <Image
                    src={product.brandLogo}
                    alt={product.brandName}
                    width={48}
                    height={48}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {product.brandName} • {product.variant}
                      </p>
                    </div>
                    {product.scheme && (
                      <span className="px-2 py-1 text-xs font-medium bg-pepsi-red text-white rounded-full ml-2 flex-shrink-0">
                        {product.scheme}
                      </span>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.ptr}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.mrp}
                    </span>
                  </div>

                  {/* Stock Status and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-medium ${
                          product.stock > 50
                            ? "text-green-600"
                            : product.stock > 10
                            ? "text-yellow-600"
                            : product.stock > 0
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} left`
                          : "Out of stock"}
                      </span>
                      
                      {/* Stock Level Indicator */}
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${
                          product.stock > 50
                            ? "bg-green-500"
                            : product.stock > 10
                            ? "bg-yellow-500"
                            : product.stock > 0
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}></div>
                        {product.stock <= 10 && product.stock > 0 && (
                          <span className="ml-1 text-xs text-orange-600 font-medium">
                            Low!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Controls */}
                    <div className="flex items-center space-x-2">
                      {getCartItemQuantity(product.id) > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleRemoveFromCart(product.id)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="font-medium text-gray-900 min-w-[20px] text-center">
                            {getCartItemQuantity(product.id)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={getCartItemQuantity(product.id) >= product.stock}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              getCartItemQuantity(product.id) >= product.stock
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-pepsi-blue hover:bg-pepsi-blue/90"
                            }`}
                          >
                            <Plus className={`w-4 h-4 ${
                              getCartItemQuantity(product.id) >= product.stock
                                ? "text-gray-400"
                                : "text-white"
                            }`} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            product.stock === 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-pepsi-blue text-white hover:bg-pepsi-blue/90"
                          }`}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Spacer */}
      <div className="h-16"></div>

      {/* Cart Summary (if items in cart) */}
      {totalItems > 0 && (
        <div className="fixed bottom-16 left-4 right-4 z-20">
          <Link
            href="/distributor/cart"
            className="block bg-pepsi-blue text-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{totalItems} items in cart</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>View Cart</span>
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t safe-area-bottom">
        <div className="grid grid-cols-5 py-2">
          <Link
            href="/distributor"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/distributor/products"
            className="flex flex-col items-center py-2 text-pepsi-blue"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Products</span>
          </Link>
          <Link
            href="/distributor/cart"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pepsi-red text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link>
          <Link
            href="/distributor/invoices"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xs mt-1">Invoices</span>
          </Link>
          <Link
            href="/distributor/account"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
