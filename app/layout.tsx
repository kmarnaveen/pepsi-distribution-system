import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '../components/providers/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PepsiCo Distribution System',
  description: 'Digital distribution management system for PepsiCo distributors and operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
