import React from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { StockMovement, InventoryItem } from '../../types/inventory';

interface StockMovementHistoryProps {
  movements: StockMovement[];
  items: InventoryItem[];
}

export const StockMovementHistory: React.FC<StockMovementHistoryProps> = ({
  movements,
  items,
}) => {
  const getItemName = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    return item ? item.name : '未知商品';
  };

  const sortedMovements = [...movements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium mb-4">库存变动记录</h4>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                时间
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                商品
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                类型
              </th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                数量
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                备注
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedMovements.map((movement) => (
              <tr key={movement.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                  {format(new Date(movement.date), 'yyyy-MM-dd HH:mm', { locale: zhCN })}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {getItemName(movement.itemId)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      movement.type === 'in'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {movement.type === 'in' ? '入库' : '出库'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">
                  {movement.quantity}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {movement.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};