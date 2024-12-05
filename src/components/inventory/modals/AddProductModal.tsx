import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { InventoryItem } from '../../../types/inventory';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<InventoryItem, 'id' | 'lastRestocked'>) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '染料' as const,
    currentStock: 0,
    minStock: 0,
    unit: '瓶',
    unitPrice: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(formData);
    onClose();
    setFormData({
      name: '',
      category: '染料',
      currentStock: 0,
      minStock: 0,
      unit: '瓶',
      unitPrice: 0,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="添加新商品">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            商品名称
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            类别
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as InventoryItem['category'],
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="染料">染料</option>
            <option value="洗护">洗护</option>
            <option value="工具">工具</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">
              当前库存
            </label>
            <input
              type="number"
              id="currentStock"
              value={formData.currentStock}
              onChange={(e) =>
                setFormData({ ...formData, currentStock: Number(e.target.value) })
              }
              min="0"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
              最小库存
            </label>
            <input
              type="number"
              id="minStock"
              value={formData.minStock}
              onChange={(e) =>
                setFormData({ ...formData, minStock: Number(e.target.value) })
              }
              min="0"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
              单位
            </label>
            <input
              type="text"
              id="unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
              单价
            </label>
            <input
              type="number"
              id="unitPrice"
              value={formData.unitPrice}
              onChange={(e) =>
                setFormData({ ...formData, unitPrice: Number(e.target.value) })
              }
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          >
            添加商品
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