import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore';
import { UserAccount } from '../../types/settings';

export const UserSettings: React.FC = () => {
  const { stores, rolePermissions, users, addUser, updateUser, deleteUser } = useSettingsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserAccount> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      if ('id' in editingUser) {
        updateUser(editingUser.id!, editingUser);
      } else {
        addUser({
          ...editingUser,
          createdAt: new Date().toISOString(),
        } as UserAccount);
      }
      setEditingUser(null);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">用户管理</h3>
        <button
          onClick={() => {
            setEditingUser({
              username: '',
              name: '',
              role: 'employee',
              storeIds: [],
            });
            setIsEditing(true);
          }}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加用户
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <input
                type="text"
                value={editingUser?.username || ''}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, username: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                姓名
              </label>
              <input
                type="text"
                value={editingUser?.name || ''}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                角色
              </label>
              <select
                value={editingUser?.role || 'employee'}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {rolePermissions.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                所属门店
              </label>
              <select
                multiple
                value={editingUser?.storeIds || []}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    storeIds: Array.from(e.target.selectedOptions, option => option.value)
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                size={3}
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">按住 Ctrl/Command 键可多选</p>
            </div>
            {!editingUser?.id && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  初始密码
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">用户首次登录时需要修改密码</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingUser(null);
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
                用户名
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                姓名
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                角色
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                所属门店
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {rolePermissions.find(r => r.id === user.role)?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.storeIds
                    .map(id => stores.find(s => s.id === id)?.name)
                    .filter(Boolean)
                    .join(', ')}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setIsEditing(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('确定要删除这个用户吗？')) {
                        deleteUser(user.id);
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