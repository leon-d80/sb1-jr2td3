import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore';

export const StoreSettings: React.FC = () => {
  const { stores, addStore, updateStore, deleteStore } = useSettingsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingStore, setEditingStore] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStore) {
      if (editingStore.id) {
        updateStore(editingStore.id, editingStore);
      } else {
        addStore(editingStore);
      }
      setEditingStore(null);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">门店管理</h3>
        <button
          onClick={() => {
            setEditingStore({ name: '', address: '', phone: '' });
            setIsEditing(true);
          }}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加门店
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                门店名称
              </label>
              <input
                type="text"
                value={editingStore.name}
                onChange={(e) =>
                  setEditingStore({ ...editingStore, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                地址
              </label>
              <input
                type="text"
                value={editingStore.address}
                onChange={(e) =>
                  setEditingStore({ ...editingStore, address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                电话
              </label>
              <input
                type="text"
                value={editingStore.phone}
                onChange={(e) =>
                  setEditingStore({ ...editingStore, phone: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingStore(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                门店名称
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                地址
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                电话
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {stores.map((store) => (
              <tr key={store.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{store.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {store.address}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{store.phone}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingStore(store);
                      setIsEditing(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('确定要删除这个门店吗？')) {
                        deleteStore(store.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};