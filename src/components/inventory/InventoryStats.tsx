import React from 'react';
import { InventoryItem } from '../../types/inventory';

interface InventoryStatsProps {
  items: InventoryItem[];
}

export const InventoryStats: React.FC<InventoryStatsProps> = ({ items }) => {
  const totalValue = items.reduce(
    (sum, item) => sum + item.currentStock * item.unitPrice,
    0
  );

  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-1">库存总值</p>
        <p className="text-xl font-semibold">
          {new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY',
          }).format(totalValue)}
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-1">商品类别统计</p>
        <div className="space-y-1">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div key={category} className="flex justify-between text-sm">
              <span>{category}</span>
              <span className="font-medium">{count}种</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};