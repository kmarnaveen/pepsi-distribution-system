'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Printer, Send, Check } from 'lucide-react'

export default function InvoicePage() {
  // Mock invoice data
  const invoiceData = {
    invoiceNumber: 'INV-SNK-2024-001',
    invoiceDate: '2024-08-23',
    dueDate: '2024-09-22',
    distributor: {
      name: 'Mumbai Central Distributors',
      dbCode: 'DB-2024-001',
      address: '123, Central Street, Mumbai - 400001',
      gstin: '27ABCDE1234F1Z5',
      contact: '+91 98765 43210'
    },
    company: {
      name: 'PepsiCo India Holdings Pvt Ltd',
      address: 'Gurgaon, Haryana - 122001',
      gstin: '06AABCP0000A1ZN',
      contact: '+91 124-4646000'
    },
    items: [
      {
        id: 'P001',
        name: 'Lays Classic 50g',
        hsn: '20052010',
        pack: '24 packs per case',
        quantity: 2,
        rate: 432,
        amount: 864,
        gstRate: 18,
        gstAmount: 155.52
      },
      {
        id: 'P003',
        name: 'Kurkure Masala Munch 70g',
        hsn: '20052020',
        pack: '18 packs per case',
        quantity: 1,
        rate: 486,
        amount: 486,
        gstRate: 18,
        gstAmount: 87.48
      },
      {
        id: 'P004',
        name: 'Cheetos Crunchy 40g',
        hsn: '20052030',
        pack: '30 packs per case',
        quantity: 1,
        rate: 675,
        amount: 675,
        gstRate: 18,
        gstAmount: 121.50
      }
    ]
  }

  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
  const totalGst = invoiceData.items.reduce((sum, item) => sum + item.gstAmount, 0)
  const schemeDiscount = 101
  const netAmount = subtotal - schemeDiscount
  const grandTotal = netAmount + totalGst

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm safe-area-top print:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/distributor/cart" className="text-pepsi-blue">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Invoice</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary text-sm">
                <Send className="w-4 h-4 mr-2" />
                Send
              </button>
              <button className="btn-secondary text-sm" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
              <button className="btn-primary text-sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Invoice Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 print:p-0">
        <div className="bg-white shadow-sm rounded-lg print:shadow-none print:rounded-none">
          {/* Invoice Header */}
          <div className="p-6 border-b print:border-gray-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-pepsi-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">PepsiCo India</h1>
                    <p className="text-sm text-gray-600">Snacks Division</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{invoiceData.company.name}</p>
                  <p>{invoiceData.company.address}</p>
                  <p>GSTIN: {invoiceData.company.gstin}</p>
                </div>
              </div>
              
              <div className="text-right">
                <h2 className="text-3xl font-bold text-pepsi-blue mb-2">INVOICE</h2>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Invoice #:</span> {invoiceData.invoiceNumber}</p>
                  <p><span className="font-medium">Date:</span> {invoiceData.invoiceDate}</p>
                  <p><span className="font-medium">Due Date:</span> {invoiceData.dueDate}</p>
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
                <div className="text-sm text-gray-700">
                  <p className="font-medium">{invoiceData.distributor.name}</p>
                  <p>DB Code: {invoiceData.distributor.dbCode}</p>
                  <p>{invoiceData.distributor.address}</p>
                  <p>GSTIN: {invoiceData.distributor.gstin}</p>
                  <p>Contact: {invoiceData.distributor.contact}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Invoice Summary:</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span>{invoiceData.items.length} products</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Quantity:</span>
                    <span>{invoiceData.items.reduce((sum, item) => sum + item.quantity, 0)} cases</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Grand Total:</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium text-gray-600">S.No</th>
                    <th className="text-left py-3 font-medium text-gray-600">Product Description</th>
                    <th className="text-left py-3 font-medium text-gray-600">HSN Code</th>
                    <th className="text-center py-3 font-medium text-gray-600">Qty</th>
                    <th className="text-right py-3 font-medium text-gray-600">Rate</th>
                    <th className="text-right py-3 font-medium text-gray-600">Amount</th>
                    <th className="text-right py-3 font-medium text-gray-600">GST</th>
                    <th className="text-right py-3 font-medium text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoiceData.items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.pack}</p>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600">{item.hsn}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">₹{item.rate.toLocaleString()}</td>
                      <td className="py-3 text-right">₹{item.amount.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <div>
                          <p>{item.gstRate}%</p>
                          <p className="text-xs">₹{item.gstAmount.toFixed(2)}</p>
                        </div>
                      </td>
                      <td className="py-3 text-right font-medium">₹{(item.amount + item.gstAmount).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoice Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-80">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scheme Discount:</span>
                    <span className="text-success">- ₹{schemeDiscount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Amount:</span>
                    <span className="text-gray-900">₹{netAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total GST (18%):</span>
                    <span className="text-gray-900">₹{totalGst.toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Grand Total:</span>
                    <span className="text-gray-900">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="mt-8 pt-6 border-t">
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Payment Terms:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Payment due within 30 days</li>
                    <li>• 2% early payment discount if paid within 10 days</li>
                    <li>• Late payment charges: 2% per month</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Goods once sold will not be taken back</li>
                    <li>• Subject to jurisdiction</li>
                    <li>• E&OE (Errors & Omissions Excepted)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="mt-8 pt-6 border-t text-right">
              <div className="inline-flex items-center space-x-2 text-success">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Digitally Generated Invoice</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
}
