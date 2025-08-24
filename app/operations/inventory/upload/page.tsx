import Link from 'next/link'
import { ArrowLeft, Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle, X } from 'lucide-react'

export default function InventoryUploadPage() {
  // Mock upload history
  const uploadHistory = [
    {
      id: 1,
      fileName: 'stock_sheet_2024-08-23.xlsx',
      uploadDate: '2024-08-23 09:30 AM',
      status: 'success',
      recordsProcessed: 1247,
      errors: 0,
      warnings: 3
    },
    {
      id: 2,
      fileName: 'stock_sheet_2024-08-22.xlsx',
      uploadDate: '2024-08-22 09:15 AM',
      status: 'success',
      recordsProcessed: 1198,
      errors: 0,
      warnings: 1
    },
    {
      id: 3,
      fileName: 'stock_sheet_2024-08-21.xlsx',
      uploadDate: '2024-08-21 09:45 AM',
      status: 'partial',
      recordsProcessed: 1156,
      errors: 12,
      warnings: 8
    }
  ]

  const validationRules = [
    'Material codes must exist in the system',
    'Quantities must be non-negative numbers',
    'Expiry dates must be in the future',
    'Batch numbers must be alphanumeric',
    'Location codes must be valid',
    'All required columns must be present'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/operations" className="text-pepsi-blue lg:hidden">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Inventory Upload</h1>
              <p className="text-sm text-gray-600">Upload and manage stock data</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Upload Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upload Stock Sheet</h2>
            <Link href="/templates/stock_template.xlsx" className="btn-secondary text-sm">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Link>
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pepsi-blue transition-colors">
            <div className="mx-auto w-16 h-16 bg-pepsi-blue/10 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-pepsi-blue" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Excel File</h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your stock sheet here, or click to browse
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="btn-primary">
                Choose File
              </button>
              <span className="text-sm text-gray-500">Excel files only (.xlsx, .xls)</span>
            </div>
          </div>

          {/* File Info */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileSpreadsheet className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">No file selected</p>
                <p className="text-xs text-gray-500">Maximum file size: 10 MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Rules */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Validation Rules</h3>
          <div className="space-y-2">
            {validationRules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-pepsi-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expected File Format */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-3">Expected File Format</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 bg-gray-50">Location</th>
                  <th className="text-left py-2 px-3 bg-gray-50">Plant Name</th>
                  <th className="text-left py-2 px-3 bg-gray-50">Material No</th>
                  <th className="text-left py-2 px-3 bg-gray-50">Material Description</th>
                  <th className="text-left py-2 px-3 bg-gray-50">Batch No</th>
                  <th className="text-left py-2 px-3 bg-gray-50">Qty in CS</th>
                  <th className="text-left py-2 px-3 bg-gray-50">MRP</th>
                  <th className="text-left py-2 px-3 bg-gray-50">EXP Date</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b">
                  <td className="py-2 px-3">South</td>
                  <td className="py-2 px-3">Trichy</td>
                  <td className="py-2 px-3">56501</td>
                  <td className="py-2 px-3">QK 500g Jar Rs135(20)all India</td>
                  <td className="py-2 px-3">TV140225</td>
                  <td className="py-2 px-3">4.000</td>
                  <td className="py-2 px-3">135.00</td>
                  <td className="py-2 px-3">2/14/26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload History */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {uploadHistory.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    upload.status === 'success' ? 'bg-success' :
                    upload.status === 'partial' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{upload.fileName}</p>
                    <p className="text-xs text-gray-600">{upload.uploadDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-gray-600">{upload.recordsProcessed} processed</span>
                      {upload.errors > 0 && (
                        <span className="text-error">{upload.errors} errors</span>
                      )}
                      {upload.warnings > 0 && (
                        <span className="text-warning">{upload.warnings} warnings</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {upload.status === 'success' && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                      {upload.status === 'partial' && (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                      {upload.status === 'error' && (
                        <X className="w-4 h-4 text-error" />
                      )}
                      <span className={`text-xs capitalize ${
                        upload.status === 'success' ? 'text-success' :
                        upload.status === 'partial' ? 'text-warning' : 'text-error'
                      }`}>
                        {upload.status}
                      </span>
                    </div>
                  </div>
                  
                  <button className="text-pepsi-blue text-sm font-medium hover:underline">
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="card border-l-4 border-pepsi-blue">
          <h3 className="font-semibold text-gray-900 mb-3">Tips for Successful Upload</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Ensure all material codes exist in the system before uploading</p>
            <p>• Use the exact column names as shown in the template</p>
            <p>• Date formats should be MM/DD/YY or DD/MM/YYYY</p>
            <p>• Remove any merged cells or formatting from the Excel file</p>
            <p>• Double-check quantities for reasonableness</p>
            <p>• Upload files during off-peak hours for better performance</p>
          </div>
        </div>
      </div>
    </div>
  )
}
