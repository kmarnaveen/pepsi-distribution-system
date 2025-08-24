import Link from "next/link";
import { ShoppingCart, Users, BarChart3, Package } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pepsi-blue to-blue-800">
      {/* Header */}
      <header className="safe-area-top px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-pepsi-blue">P</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">PepsiCo</h1>
                <p className="text-blue-200 text-sm">Distribution System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              PepsiCo Snacks Division
            </h2>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Digital Invoice Generation System
            </h3>
            <p className="text-blue-200 text-lg">
              Streamlined order processing and invoice generation for snacks
              products
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Distributor Card */}
            <Link href="/distributor" className="group">
              <div className="card bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Distributor Portal
                  </h3>
                  <p className="text-blue-200 mb-4">
                    Browse snacks products, place orders, and generate invoices
                  </p>
                  <div className="flex items-center justify-center text-white font-medium">
                    <span>Access Portal</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Operations Card */}
            <Link href="/operations" className="group">
              <div className="card bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Invoice Operations
                  </h3>
                  <p className="text-blue-200 mb-4">
                    Process orders, manage snacks inventory, and generate
                    invoices
                  </p>
                  <div className="flex items-center justify-center text-white font-medium">
                    <span>Access Dashboard</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
