import Link from 'next/link'
import { ArrowLeft, Clock, ShoppingCart } from 'lucide-react'
import distributorData from '../../../lib/distributor-data.json'

export default function OffersPage() {
  const { todaysHighlights } = distributorData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm safe-area-top">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link href="/distributor" className="p-1">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="font-bold text-gray-900">Today&apos;s Offers</h1>
              <p className="text-sm text-gray-600">Special deals on Frito-Lay products</p>
            </div>
          </div>
        </div>
      </header>

      {/* Offers List */}
      <main className="px-4 py-4 space-y-4">
        {todaysHighlights.currentOffers.map((offer, index) => (
          <div key={index} className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pepsi-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{offer.title}</h3>
                  <span className="px-3 py-1 text-sm font-bold bg-pepsi-red text-white rounded-full">
                    {offer.discount}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                  <Link 
                    href="/distributor/products"
                    className="flex items-center space-x-2 px-4 py-2 bg-pepsi-blue text-white rounded-lg text-sm font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Shop Now</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
