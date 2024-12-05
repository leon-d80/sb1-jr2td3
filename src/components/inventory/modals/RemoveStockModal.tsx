import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { InventoryItem } from '../../../types/inventory';

interface RemoveStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  onRemoveStock: (itemId: string, quantity: number, reason: string) => void;
}

export const RemoveStockModal: React.FC<RemoveStockModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveStock,
}) => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItemId && quantity) {
      onRemoveStock(selectedItemId, Number(quantity), reason);
      onClose();
      setSelectedItemId('');
      setQuantity('');
      setReason('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="出库">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="item" className="block text-sm font-medium text-gray-700">
            商品
          </label>
          <select
            id="item"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">选择商品</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.category}) - 当前库存: {item.currentStock}
                {item.unit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            数量
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max={selectedItem?.currentStock}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            出库原因
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">选择原因</option>
            <option value="sale">销售</option>
            <option value="damage">损坏</option>
            <option value="expired">过期</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            确认出库
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            取消
          </button>
        </div>
      </form>
    </Modal>
  );
};