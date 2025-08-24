import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'base' | 'lg'
}

export function Card({ children, className, hover = true, padding = 'base' }: CardProps) {
  const paddingClasses = {
    sm: 'p-3',
    base: 'p-4',
    lg: 'p-6'
  }
  
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border',
        hover && 'hover:shadow-md transition-shadow',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800 animate-pulse-slow'
      case 'approved':
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'in-transit':
      case 'dispatched':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <span
      className={cn(
        'px-3 py-1 text-xs font-medium rounded-full',
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'base' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'base', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    base: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-pepsi-blue',
        sizeClasses[size],
        className
      )}
    />
  )
}

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      {icon && (
        <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {action}
    </div>
  )
}
