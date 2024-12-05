import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { InventoryItem } from '../../../types/inventory';
import { Plus, Upload, ListPlus } from 'lucide-react';
import { AddProductModal } from './AddProductModal';
import { CategoryModal } from './CategoryModal';
import { useCategory } from '../../../contexts/CategoryContext';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: InventoryItem[];
  onAddStock: (itemId: string, quantity: number, notes?: string) => void;
  onAddProduct: (product: Omit<InventoryItem, 'id' | 'lastRestocked'>) => void;
}

export const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  items,
  onAddStock,
  onAddProduct,
}) => {
  const { state: categoryState } = useCategory();
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItemId && quantity) {
      onAddStock(selectedItemId, Number(quantity), notes);
      onClose();
      setSelectedItemId('');
      setQuantity('');
      setNotes('');
      setImage(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddProduct = (product: Omit<InventoryItem, 'id' | 'lastRestocked'>) => {
    onAddProduct(product);
    setIsAddProductModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="入库">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="item" className="block text-sm font-medium text-gray-700">
              商品
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-500"
              >
                <ListPlus className="w-4 h-4 mr-1" />
                管理类别
              </button>
              <button
                type="button"
                onClick={() => setIsAddProductModalOpen(true)}
                className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                添加新商品
              </button>
            </div>
          </div>
          <select
            id="item"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">选择商品</option>
            {categoryState.categories.map((category) => (
              <optgroup key={category.id} label={category.name}>
                {items
                  .filter((item) => item.category === category.name)
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>

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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              上传图片
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                选择图片
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {image && (
                <span className="ml-3 text-sm text-gray-500">{image.name}</span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              备注
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            >
              确认入库
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

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </>
  );
};