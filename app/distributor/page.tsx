"use client";

import Link from "next/link";
import Image from "next/image";
import GoogleSearch from "../../components/GoogleSearch";
import RealTimeStockMonitor from "../../components/RealTimeStockMonitor";
import {
  Search,
  ShoppingCart,
  Bell,
  User,
  Package,
  Clock,
  Truck,
  FileText,
  Receipt,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import distributorData from "../../lib/distributor-data.json";
import plantsData from "../../lib/plants-data.json";
import { useAppSelector } from "../../lib/store/hooks";

export default function DistributorDashboard() {
  // Redux state for cart with fallback
  const cartState = useAppSelector(state => state.cart);
  const totalItems = (cartState as any)?.totalItems || 0;

  // Dynamic data from JSON file
  const {
    distributorInfo,
    recentInvoices,
    fritoLayBrands,
    quickActions,
    todaysHighlights,
  } = distributorData;

  // Icon mapping for dynamic rendering
  const iconMap = {
    Package: Package,
    FileText: FileText,
    Receipt: Receipt,
    Truck: Truck,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm safe-area-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pepsi-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">
                  {distributorInfo.id}
                </h1>
                <p className="text-sm text-gray-600">{distributorInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pepsi-red text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="p-2">
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b">
        <GoogleSearch placeholder="Search products..." />
      </div>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const IconComponent =
                iconMap[action.icon as keyof typeof iconMap];
              return (
                <Link key={index} href={action.href} className="card group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pepsi-blue/10 rounded-lg flex items-center justify-center group-hover:bg-pepsi-blue/20 transition-colors">
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-pepsi-blue" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Serving Plant Information */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Serving Plant
          </h2>
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {distributorData.distributorInfo.servingPlant.name} Plant
                  </h3>
                  <p className="text-sm text-gray-600">
                    Code: {distributorData.distributorInfo.servingPlant.code}
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Location</p>
                <p className="font-medium text-gray-900">
                  {distributorData.distributorInfo.servingPlant.location}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Coverage</p>
                <p className="font-medium text-gray-900">
                  {distributorData.distributorInfo.distributionRadius}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Region: {plantsData.region} • Total Plants: {plantsData.totalPlants}
              </p>
            </div>
          </div>
        </section>

        {/* Frito-Lay Brands */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Frito-Lay Brands
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {fritoLayBrands.map((brand, index) => (
              <Link key={index} href={brand.href} className="card group">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-lg flex items-center justify-center p-2">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={48}
                      height={48}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {brand.productCount} products
                  </p>
                  {/* <p className="text-xs text-pepsi-blue font-medium">
                    Top: {brand.topSelling}
                  </p> */}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Invoices */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Invoices
            </h2>
            <Link
              href="/distributor/invoices"
              className="text-pepsi-blue text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">
                        {invoice.id}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {invoice.date} • {invoice.items} items
                    </p>
                    <p className="text-xs text-gray-500">
                      GST: {invoice.gstAmount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {invoice.amount}
                    </p>
                    <button className="text-pepsi-blue text-sm font-medium">
                      View Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real-time Stock Monitor */}
        <section>
          <RealTimeStockMonitor />
        </section>

        {/* Today's Highlights */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Today&apos;s Highlights
          </h2>

          {/* Available Stocks */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-800 mb-2">
              Available Stocks
            </h3>
            <div className="space-y-2">
              {todaysHighlights.availableStocks.map((stock, index) => (
                <div key={index} className="card border-l-4 border-success">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          stock.status === "High Stock"
                            ? "bg-green-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        <TrendingUp
                          className={`w-5 h-5 ${
                            stock.status === "High Stock"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {stock.brand}
                        </h4>
                        <p className="text-sm text-gray-600">{stock.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          stock.status === "High Stock"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {stock.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Offers */}
          <div>
            <h3 className="text-md font-medium text-gray-800 mb-2">
              Current Offers
            </h3>
            <div className="space-y-2">
              {todaysHighlights.currentOffers.map((offer, index) => (
                <div key={index} className="card border-l-4 border-pepsi-red">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pepsi-red/10 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-pepsi-red" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">
                          {offer.title}
                        </h4>
                        <span className="px-2 py-1 text-xs font-bold bg-pepsi-red text-white rounded-full">
                          {offer.discount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {offer.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Valid until: {offer.validUntil}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t safe-area-bottom">
        <div className="grid grid-cols-5 py-2">
          <Link
            href="/distributor"
            className="flex flex-col items-center py-2 text-pepsi-blue"
          >
            <Package className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/distributor/products"
            className="flex flex-col items-center py-2 text-gray-600"
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
            <Receipt className="w-5 h-5" />
            <span className="text-xs mt-1">Invoices</span>
          </Link>
          <Link
            href="/distributor/account"
            className="flex flex-col items-center py-2 text-gray-600"
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </nav>

      {/* Spacer for bottom navigation */}
      <div className="h-16"></div>
    </div>
  );
}
