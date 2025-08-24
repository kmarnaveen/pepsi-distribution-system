"use client";

import { useEffect, useState } from "react";
import { Package, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";

interface StockAlert {
  id: string;
  name: string;
  brand: string;
  currentStock: number;
  level: 'critical' | 'low' | 'normal' | 'high';
  inCart: number;
}

export default function RealTimeStockMonitor() {
  const { allProducts } = useAppSelector((state) => state.products as any);
  const { items: cartItems, stockUpdates } = useAppSelector((state) => state.cart as any);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    const alerts: StockAlert[] = [];

    allProducts.forEach((product: any) => {
      // Get real-time stock (considering cart reservations)
      const currentStock = stockUpdates[product.id] ?? product.stock;
      const cartItem = cartItems?.find((item: any) => item.id === product.id);
      const inCart = cartItem?.quantity || 0;

      let level: StockAlert['level'] = 'normal';
      if (currentStock === 0) level = 'critical';
      else if (currentStock <= 5) level = 'critical';
      else if (currentStock <= 20) level = 'low';
      else if (currentStock > 100) level = 'high';

      // Only show alerts for low/critical stock or high activity items
      if (level === 'critical' || level === 'low' || inCart > 0) {
        alerts.push({
          id: product.id,
          name: product.name,
          brand: product.brandName,
          currentStock,
          level,
          inCart
        });
      }
    });

    // Sort by priority: critical first, then low stock, then by cart activity
    alerts.sort((a, b) => {
      const priorityOrder = { critical: 0, low: 1, normal: 2, high: 3 };
      if (a.level !== b.level) {
        return priorityOrder[a.level] - priorityOrder[b.level];
      }
      return b.inCart - a.inCart;
    });

    setStockAlerts(alerts.slice(0, 5)); // Show top 5 alerts
  }, [allProducts, cartItems, stockUpdates]);

  const getStockIcon = (level: StockAlert['level']) => {
    switch (level) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'low':
        return <TrendingDown className="w-4 h-4 text-orange-500" />;
      case 'high':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Package className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStockColor = (level: StockAlert['level']) => {
    switch (level) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'low':
        return 'border-l-orange-500 bg-orange-50';
      case 'high':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  if (stockAlerts.length === 0) {
    return (
      <div className="card text-center py-6">
        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-sm text-gray-600">All stock levels normal</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium text-gray-800">
          Real-time Stock Alerts
        </h3>
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
          {stockAlerts.filter(alert => alert.level === 'critical').length} Critical
        </span>
      </div>

      {stockAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`card border-l-4 ${getStockColor(alert.level)} p-3`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStockIcon(alert.level)}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm truncate">
                  {alert.name}
                </h4>
                <p className="text-xs text-gray-600">{alert.brand}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold ${
                  alert.level === 'critical' 
                    ? 'text-red-600' 
                    : alert.level === 'low' 
                    ? 'text-orange-600' 
                    : 'text-gray-900'
                }`}>
                  {alert.currentStock}
                </span>
                {alert.inCart > 0 && (
                  <span className="text-xs bg-pepsi-blue text-white px-1 py-0.5 rounded">
                    {alert.inCart} in cart
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {alert.level === 'critical' && 'Urgent restock needed'}
                {alert.level === 'low' && 'Low stock warning'}
                {alert.level === 'normal' && 'Normal levels'}
                {alert.level === 'high' && 'High stock'}
              </p>
            </div>
          </div>

          {/* Stock Level Bar */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Stock Level</span>
              <span>{alert.currentStock > 0 ? 'Available' : 'Out of Stock'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  alert.level === 'critical'
                    ? 'bg-red-500'
                    : alert.level === 'low'
                    ? 'bg-orange-500'
                    : alert.level === 'high'
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                }`}
                style={{
                  width: `${Math.min(100, Math.max(5, (alert.currentStock / 100) * 100))}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
