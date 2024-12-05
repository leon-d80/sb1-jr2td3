import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore';
import { ApiConfig } from '../../types/settings';

export const ApiSettings: React.FC = () => {
  const { apiConfigs, addApiConfig, updateApiConfig, deleteApiConfig } = useSettingsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingConfig, setEditingConfig] = useState<Partial<ApiConfig> | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingConfig) {
      if ('id' in editingConfig) {
        updateApiConfig(editingConfig.id!, editingConfig);
      } else {
        addApiConfig(editingConfig as Omit<ApiConfig, 'id'>);
      }
      setEditingConfig(null);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">API 设置</h3>
        <button
          onClick={() => {
            setEditingConfig({
              name: '',
              type: 'youzan',
              apiKey: '',
              apiSecret: '',
              enabled: true,
            });
            setIsEditing(true);
          }}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加 API
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                API 名称
              </label>
              <input
                type="text"
                value={editingConfig?.name || ''}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                类型
              </label>
              <select
                value={editingConfig?.type || 'youzan'}
                onChange={(e) =>
                  setEditingConfig({
                    ...editingConfig,
                    type: e.target.value as ApiConfig['type'],
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="youzan">有赞</option>
                <option value="wechat">企业微信</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <input
                type="text"
                value={editingConfig?.apiKey || ''}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, apiKey: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                API Secret
              </label>
              <input
                type="password"
                value={editingConfig?.apiSecret || ''}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, apiSecret: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={editingConfig?.enabled ?? true}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, enabled: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-900">启用</label>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingConfig(null);
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
                API 名称
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                类型
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                状态
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {apiConfigs.map((config) => (
              <tr key={config.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{config.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {config.type === 'youzan'
                    ? '有赞'
                    : config.type === 'wechat'
                    ? '企业微信'
                    : '其他'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      config.enabled
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {config.enabled ? '已启用' : '已禁用'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingConfig(config);
                      setIsEditing(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('确定要删除这个 API 配置吗？')) {
                        deleteApiConfig(config.id);
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