import Link from 'next/link'
import { 
  Menu, Bell, User, Search, Filter,
  ShoppingCart, Package, Users, TrendingUp,
  Clock, AlertCircle, CheckCircle, Truck,
  Upload, Download, BarChart3, Factory
} from 'lucide-react'

export default function OperationsDashboard() {
  // Mock data for demonstration
  const todayStats = {
    totalOrders: 47,
    totalValue: '₹2,85,200',
    pendingInvoices: 12,
    generatedInvoices: 35
  }

  const pendingOrders = [
    { id: 'ORD-001', dbCode: 'DB-2024-001', distributor: 'Mumbai Central', value: '₹25,450', items: 12, priority: 'high' },
    { id: 'ORD-002', dbCode: 'DB-2024-015', distributor: 'Pune West', value: '₹18,200', items: 8, priority: 'medium' },
    { id: 'ORD-003', dbCode: 'DB-2024-032', distributor: 'Nashik', value: '₹32,100', items: 15, priority: 'low' },
    { id: 'ORD-004', dbCode: 'DB-2024-007', distributor: 'Thane', value: '₹45,300', items: 20, priority: 'high' }
  ]

  const stockAlerts = [
    { product: 'Pepsi 250ml Can (24 pack)', currentStock: 45, minStock: 100, status: 'low' },
    { product: 'Lays Classic 50g', currentStock: 12, minStock: 50, status: 'critical' },
    { product: 'Tropicana Orange 1L', currentStock: 8, minStock: 30, status: 'critical' }
  ]

  const recentActivity = [
    { action: 'Order processed', details: 'ORD-125 for DB-2024-001', time: '2 min ago', type: 'success' },
    { action: 'Stock uploaded', details: 'Daily inventory sheet processed', time: '15 min ago', type: 'info' },
    { action: 'Credit alert', details: 'DB-2024-032 approaching limit', time: '30 min ago', type: 'warning' },
    { action: 'Order delivered', details: 'ORD-120 delivered successfully', time: '1 hour ago', type: 'success' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pepsi-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Snacks Operations Dashboard</h1>
                  <p className="text-sm text-gray-600">Mumbai Region - Invoice Generation System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, distributors..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pepsi-blue focus:border-pepsi-blue"
                />
              </div>
              
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pepsi-red text-white text-xs rounded-full flex items-center justify-center">5</span>
              </button>
              
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <User className="w-6 h-6 text-gray-600" />
                <span className="hidden md:block text-sm font-medium text-gray-700">Accountant</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <Link href="/operations" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-pepsi-blue text-white">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              
              <div className="space-y-1">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</h3>
                <Link href="/operations/orders/pending" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Clock className="w-5 h-5" />
                  <span>Pending Invoices</span>
                  <span className="ml-auto bg-pepsi-red text-white text-xs px-2 py-1 rounded-full">{todayStats.pendingInvoices}</span>
                </Link>
                <Link href="/operations/orders/processing" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Package className="w-5 h-5" />
                  <span>Generated Invoices</span>
                </Link>
                <Link href="/operations/orders/completed" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <CheckCircle className="w-5 h-5" />
                  <span>Completed Orders</span>
                </Link>
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Inventory</h3>
                <Link href="/operations/plants" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Factory className="w-5 h-5" />
                  <span>Plant Network</span>
                  <span className="ml-auto bg-pepsi-blue text-white text-xs px-2 py-1 rounded-full">11</span>
                </Link>
                <Link href="/operations/inventory/stock" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Package className="w-5 h-5" />
                  <span>Snacks Stock</span>
                </Link>
                <Link href="/operations/inventory/upload" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Upload className="w-5 h-5" />
                  <span>Upload Data</span>
                </Link>
                <Link href="/operations/inventory/reconciliation" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <AlertCircle className="w-5 h-5" />
                  <span>Reconciliation</span>
                  <span className="ml-auto bg-warning text-white text-xs px-2 py-1 rounded-full">5</span>
                </Link>
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Finance</h3>
                <Link href="/operations/finance/credit" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Users className="w-5 h-5" />
                  <span>Credit Management</span>
                </Link>
                <Link href="/operations/finance/outstanding" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <TrendingUp className="w-5 h-5" />
                  <span>Outstanding</span>
                </Link>
              </div>
              
              <div className="space-y-1">
                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reports</h3>
                <Link href="/operations/reports" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Download className="w-5 h-5" />
                  <span>Generate Reports</span>
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.totalOrders}</p>
                  <p className="text-sm text-success">+12% from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-pepsi-blue/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-pepsi-blue" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.totalValue}</p>
                  <p className="text-sm text-success">+8% from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Invoices</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.pendingInvoices}</p>
                  <p className="text-sm text-warning">Needs processing</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Generated Today</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.generatedInvoices}</p>
                  <p className="text-sm text-success">Invoices ready</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Orders */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Pending Orders</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                  <Link href="/operations/orders/pending" className="text-pepsi-blue text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="space-y-3">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{order.id}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.priority === 'high' ? 'bg-red-100 text-red-800' :
                          order.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.distributor} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.value}</p>
                      <button className="text-pepsi-blue text-sm font-medium hover:underline">
                        Process
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Alerts */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Stock Alerts</h2>
                <Link href="/operations/inventory/reconciliation" className="text-pepsi-blue text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3">
                {stockAlerts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{item.product}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Stock: {item.currentStock}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-600">Min: {item.minStock}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 py-2">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-success' :
                    activity.type === 'warning' ? 'bg-warning' :
                    activity.type === 'error' ? 'bg-error' : 'bg-pepsi-blue'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
