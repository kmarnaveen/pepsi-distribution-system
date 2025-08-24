import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distributor Portal - PepsiCo',
  description: 'Place orders, track deliveries, and manage your distribution business',
}

export default function DistributorLayout({
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
