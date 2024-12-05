import React, { useState, useEffect } from 'react';
import { Modal } from '../../common/Modal';
import { useCategory } from '../../../contexts/CategoryContext';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const { state, addCategory, updateCategory, deleteCategory } = useCategory();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(editingId, name, description);
      setEditingId(null);
    } else {
      addCategory(name, description);
    }
    setName('');
    setDescription('');
  };

  const handleEdit = (id: string) => {
    const category = state.categories.find((c) => c.id === id);
    if (category) {
      setEditingId(id);
      setName(category.name);
      setDescription(category.description || '');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个类别吗？')) {
      deleteCategory(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="类别管理">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              类别名称
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              描述
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                取消
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {editingId ? '保存修改' : '添加类别'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">现有类别</h4>
          <div className="space-y-2">
            {state.categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <h5 className="text-sm font-medium text-gray-900">{category.name}</h5>
                  {category.description && (
                    <p className="text-sm text-gray-500">{category.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};