'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, AlertTriangle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../lib/store/hooks'
import { addToCart, removeFromCart, updateQuantity, clearCart, CartItem as CartItemType } from '../../../lib/store/slices/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items: cartItems, totalItems, totalAmount } = useAppSelector(state => state.cart);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      variant: item.variant,
      brandName: item.brandName,
      brandLogo: item.brandLogo,
      ptr: item.ptr,
      mrp: item.mrp,
      scheme: item.scheme,
      stock: item.stock
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate totals
  const subtotal = totalAmount;
  const schemeDiscount = Math.round(subtotal * 0.05); // 5% scheme discount
  const gst = Math.round((subtotal - schemeDiscount) * 0.18);
  const total = subtotal - schemeDiscount + gst;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm safe-area-top sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/distributor/products" className="text-pepsi-blue">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Shopping Cart</h1>
            </div>
            <span className="text-sm text-gray-600">{cartItems.length} items</span>
          </div>
        </div>
      </header>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 text-center mb-6">Add some products to get started</p>
          <Link href="/distributor/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <main className="px-4 py-4 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Schemes Applied */}
            <div className="card border-l-4 border-success">
              <h3 className="font-medium text-gray-900 mb-2">Snacks Schemes Applied</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lays 10% Extra Offer</span>
                  <span className="text-success">+ 2.4 packs free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kurkure Buy 2 Get 1</span>
                  <span className="text-warning">Add 1 more to get free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cheetos 15% Off</span>
                  <span className="text-success">- ₹101</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card">
              <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Scheme Discount</span>
                  <span className="text-success">- ₹{schemeDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-900">₹{gst.toLocaleString()}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Credit Limit Info */}
            <div className="card border-l-4 border-pepsi-blue">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Credit Limit</h3>
                  <p className="text-sm text-gray-600">Available: ₹2,45,000 of ₹5,00,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">After this order</p>
                  <p className="font-medium text-gray-900">₹2,01,050 remaining</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pepsi-blue h-2 rounded-full" 
                    style={{ width: '58%' }}
                  ></div>
                </div>
              </div>
            </div>
          </main>

          {/* Bottom Checkout Section */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t safe-area-bottom">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="text-sm font-medium text-gray-900">Tomorrow, 10 AM - 2 PM</p>
                </div>
              </div>
              <Link href="/distributor/invoice" className="btn-primary w-full text-center block">
                Generate Invoice
              </Link>
            </div>
          </div>

          {/* Spacer for fixed bottom section */}
          <div className="h-32"></div>
        </>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t safe-area-bottom" style={{ transform: cartItems.length > 0 ? 'translateY(120px)' : 'translateY(0)' }}>
        <div className="grid grid-cols-5 py-2">
          <Link href="/distributor" className="flex flex-col items-center py-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/distributor/products" className="flex flex-col items-center py-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs mt-1">Products</span>
          </Link>
          <Link href="/distributor/cart" className="flex flex-col items-center py-2 text-pepsi-blue">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pepsi-red text-white text-xs rounded-full flex items-center justify-center">{cartItems.length}</span>
            </div>
            <span className="text-xs mt-1">Cart</span>
          </Link>
          <Link href="/distributor/orders" className="flex flex-col items-center py-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link href="/distributor/account" className="flex flex-col items-center py-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();
  const { stockUpdates } = useAppSelector(state => state.cart);
  
  // Get real-time stock
  const currentStock = stockUpdates[item.id] ?? item.stock;
  const isLowStock = currentStock <= 10;
  const isOutOfStock = currentStock === 0;
  const canAddMore = item.quantity < currentStock;
  
  const handleIncrement = () => {
    if (canAddMore) {
      dispatch(addToCart({
        id: item.id,
        name: item.name,
        variant: item.variant,
        brandName: item.brandName,
        brandLogo: item.brandLogo,
        ptr: item.ptr,
        mrp: item.mrp,
        scheme: item.scheme,
        stock: item.stock
      }));
    }
  };

  const handleDecrement = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleRemove = () => {
    dispatch(updateQuantity({ id: item.id, quantity: 0 }));
  };

  return (
    <div className={`card ${isLowStock ? 'border-l-4 border-orange-500' : isOutOfStock ? 'border-l-4 border-red-500' : ''}`}>
      {/* Stock Warning Banner */}
      {(isLowStock || isOutOfStock) && (
        <div className={`mb-3 p-2 rounded ${isOutOfStock ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'}`}>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-medium">
              {isOutOfStock ? 'Out of stock!' : `Only ${currentStock} left in stock`}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
          <Image
            src={item.brandLogo}
            alt={item.brandName}
            width={48}
            height={48}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm mb-1">
                {item.name} {item.variant}
              </h3>
              <p className="text-xs text-gray-600 mb-1">{item.brandName}</p>
              {item.scheme && (
                <span className="inline-block bg-success/10 text-success text-xs px-2 py-1 rounded-full">
                  {item.scheme}
                </span>
              )}
            </div>
            <button onClick={handleRemove} className="p-1 text-gray-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleDecrement}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <button 
                onClick={handleIncrement}
                disabled={!canAddMore}
                className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                  canAddMore 
                    ? 'border-gray-300 hover:bg-gray-50' 
                    : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                }`}
              >
                <Plus className={`w-4 h-4 ${canAddMore ? 'text-gray-600' : 'text-gray-400'}`} />
              </button>
              
              {/* Stock indicator */}
              <span className={`text-xs font-medium ${
                isOutOfStock 
                  ? 'text-red-600' 
                  : isLowStock 
                  ? 'text-orange-600' 
                  : 'text-gray-500'
              }`}>
                {currentStock} left
              </span>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">₹{(item.ptr * item.quantity).toLocaleString()}</p>
              <p className="text-xs text-gray-500">₹{item.ptr} per case</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
