import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Operations Dashboard - PepsiCo',
  description: 'Manage orders, inventory, and business operations',
}

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
