import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'base' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'base', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-pepsi-blue hover:bg-blue-700 text-white focus:ring-pepsi-blue",
    secondary: "border-2 border-pepsi-blue text-pepsi-blue hover:bg-pepsi-blue hover:text-white focus:ring-pepsi-blue",
    danger: "bg-pepsi-red hover:bg-red-700 text-white focus:ring-pepsi-red",
    success: "bg-success hover:bg-green-700 text-white focus:ring-success"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    base: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
