import Link from 'next/link'
import { 
  ArrowLeft, Search, Filter, MoreVertical, 
  Clock, AlertCircle, CheckCircle, Eye,
  Download, RefreshCw
} from 'lucide-react'

export default function PendingOrdersPage() {
  // Mock pending orders data
  const pendingOrders = [
    {
      id: 'ORD-2024-001',
      dbCode: 'DB-2024-001',
      distributor: 'Mumbai Central Distributors',
      orderDate: '2024-08-23',
      orderTime: '09:30 AM',
      totalItems: 12,
      totalValue: 25450,
      priority: 'high',
      creditStatus: 'approved',
      stockStatus: 'available',
      lastModified: '10 min ago',
      contact: '+91 98765 43210'
    },
    {
      id: 'ORD-2024-002',
      dbCode: 'DB-2024-015',
      distributor: 'Pune West Enterprises',
      orderDate: '2024-08-23',
      orderTime: '09:45 AM',
      totalItems: 8,
      totalValue: 18200,
      priority: 'medium',
      creditStatus: 'pending',
      stockStatus: 'partial',
      lastModified: '25 min ago',
      contact: '+91 98765 43211'
    },
    {
      id: 'ORD-2024-003',
      dbCode: 'DB-2024-032',
      distributor: 'Nashik Distribution Hub',
      orderDate: '2024-08-23',
      orderTime: '08:15 AM',
      totalItems: 15,
      totalValue: 32100,
      priority: 'low',
      creditStatus: 'approved',
      stockStatus: 'available',
      lastModified: '1 hour ago',
      contact: '+91 98765 43212'
    },
    {
      id: 'ORD-2024-004',
      dbCode: 'DB-2024-007',
      distributor: 'Thane Industrial Supplies',
      orderDate: '2024-08-23',
      orderTime: '10:20 AM',
      totalItems: 20,
      totalValue: 45300,
      priority: 'high',
      creditStatus: 'approved',
      stockStatus: 'shortage',
      lastModified: '5 min ago',
      contact: '+91 98765 43213'
    },
    {
      id: 'ORD-2024-005',
      dbCode: 'DB-2024-019',
      distributor: 'Kalyan Trade Center',
      orderDate: '2024-08-22',
      orderTime: '04:30 PM',
      totalItems: 6,
      totalValue: 15750,
      priority: 'medium',
      creditStatus: 'approved',
      stockStatus: 'available',
      lastModified: '2 hours ago',
      contact: '+91 98765 43214'
    }
  ]

  const stats = {
    total: pendingOrders.length,
    highPriority: pendingOrders.filter(o => o.priority === 'high').length,
    creditIssues: pendingOrders.filter(o => o.creditStatus === 'pending').length,
    stockIssues: pendingOrders.filter(o => o.stockStatus === 'shortage' || o.stockStatus === 'partial').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/operations" className="text-pepsi-blue lg:hidden">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pending Orders</h1>
                <p className="text-sm text-gray-600">{stats.total} orders awaiting processing</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button className="btn-secondary text-sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="btn-primary text-sm">
                Process All
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pepsi-blue/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-pepsi-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Credit Issues</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.creditIssues}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Stock Issues</p>
                <p className="text-2xl font-bold text-orange-600">{stats.stockIssues}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, distributors..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue"
                />
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Filters</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Priorities</option>
                <option>High Priority</option>
                <option>Medium Priority</option>
                <option>Low Priority</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Status</option>
                <option>Credit Approved</option>
                <option>Credit Pending</option>
                <option>Stock Available</option>
                <option>Stock Issues</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Order Details</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Distributor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Items & Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Modified</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingOrders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="card mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Selected: 0 orders</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary text-sm" disabled>
                Approve Selected
              </button>
              <button className="btn-secondary text-sm" disabled>
                Process Selected
              </button>
              <button className="btn-danger text-sm" disabled>
                Cancel Selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderRow({ order }: { order: any }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-success" />
      case 'pending': return <Clock className="w-4 h-4 text-warning" />
      case 'available': return <CheckCircle className="w-4 h-4 text-success" />
      case 'partial': return <AlertCircle className="w-4 h-4 text-warning" />
      case 'shortage': return <AlertCircle className="w-4 h-4 text-error" />
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-4">
        <input type="checkbox" className="rounded border-gray-300" />
      </td>
      
      <td className="py-4 px-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <p className="font-medium text-gray-900">{order.id}</p>
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(order.priority)}`}>
              {order.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600">{order.orderDate} • {order.orderTime}</p>
          <p className="text-xs text-gray-500">{order.dbCode}</p>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div>
          <p className="font-medium text-gray-900 text-sm">{order.distributor}</p>
          <p className="text-xs text-gray-500">{order.contact}</p>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div>
          <p className="font-semibold text-gray-900">₹{order.totalValue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">{order.totalItems} items</p>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            {getStatusIcon(order.creditStatus)}
            <span className="text-xs text-gray-600">Credit {order.creditStatus}</span>
          </div>
          <div className="flex items-center space-x-1">
            {getStatusIcon(order.stockStatus)}
            <span className="text-xs text-gray-600">Stock {order.stockStatus}</span>
          </div>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <p className="text-sm text-gray-600">{order.lastModified}</p>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-gray-100" title="View Details">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button className="text-pepsi-blue text-sm font-medium hover:underline">
            Process
          </button>
          <button className="p-1 rounded hover:bg-gray-100">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </td>
    </tr>
  )
}
