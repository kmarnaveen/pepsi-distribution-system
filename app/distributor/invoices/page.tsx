import Link from 'next/link'
import { ArrowLeft, Download, Eye, Search, Filter } from 'lucide-react'
import distributorData from '../../../lib/distributor-data.json'

export default function InvoicesPage() {
  const { recentInvoices } = distributorData

  // Extended invoice data for this page
  const allInvoices = [
    ...recentInvoices,
    {
      id: "INV-2025-004",
      date: "2025-08-20", 
      status: "Paid",
      amount: "₹15,750",
      items: 8,
      gstAmount: "₹2,362"
    },
    {
      id: "INV-2025-005",
      date: "2025-08-19",
      status: "Paid", 
      amount: "₹28,900",
      items: 18,
      gstAmount: "₹4,335"
    },
    {
      id: "INV-2025-006",
      date: "2025-08-18",
      status: "Overdue",
      amount: "₹12,400", 
      items: 6,
      gstAmount: "₹1,860"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm safe-area-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/distributor" className="p-1">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="font-bold text-gray-900">Invoice History</h1>
                <p className="text-sm text-gray-600">All your generated invoices</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices by ID, date, or amount..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue"
          />
        </div>
      </div>

      {/* Invoice Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="card text-center">
            <h3 className="text-lg font-bold text-gray-900">₹1,32,800</h3>
            <p className="text-sm text-gray-600">Total Invoiced</p>
          </div>
          <div className="card text-center">
            <h3 className="text-lg font-bold text-green-600">₹1,20,400</h3>
            <p className="text-sm text-gray-600">Paid</p>
          </div>
          <div className="card text-center">
            <h3 className="text-lg font-bold text-red-600">₹12,400</h3>
            <p className="text-sm text-gray-600">Overdue</p>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <main className="px-4 pb-20">
        <div className="space-y-3">
          {allInvoices.map((invoice) => (
            <div key={invoice.id} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{invoice.id}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-800'
                      : invoice.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{invoice.amount}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>{invoice.date}</span>
                <span>{invoice.items} items • GST: {invoice.gstAmount}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Link 
                  href={`/distributor/invoice?id=${invoice.id}`}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-pepsi-blue text-white rounded-lg text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Invoice</span>
                </Link>
                <button className="flex items-center justify-center space-x-2 py-2 px-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
