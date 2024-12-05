import React from 'react';
import { InventoryItem } from '../../types/inventory';

interface InventoryListProps {
  items: InventoryItem[];
}

export const InventoryList: React.FC<InventoryListProps> = ({ items }) => {
  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名称
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                类别
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                库存量
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                单价
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                库存价值
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr
                key={item.id}
                className={
                  item.currentStock <= item.minStock
                    ? 'bg-red-50'
                    : 'hover:bg-gray-50'
                }
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                  {item.currentStock} {item.unit}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                  {new Intl.NumberFormat('zh-CN', {
                    style: 'currency',
                    currency: 'CNY',
                  }).format(item.unitPrice)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                  {new Intl.NumberFormat('zh-CN', {
                    style: 'currency',
                    currency: 'CNY',
                  }).format(item.currentStock * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};