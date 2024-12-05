import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';

export const RoleSettings: React.FC = () => {
  const { rolePermissions, updateRolePermissions } = useSettingsStore();

  const modules = [
    { key: 'dashboard', label: '财务概览' },
    { key: 'inventory', label: '库存管理' },
    { key: 'expenses', label: '支出管理' },
    { key: 'reports', label: '报表分析' },
    { key: 'settings', label: '系统设置' },
  ] as const;

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">角色权限管理</h3>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                角色
              </th>
              {modules.map((module) => (
                <th
                  key={module.key}
                  className="px-6 py-3 text-center text-sm font-semibold text-gray-900"
                >
                  {module.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rolePermissions.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {role.name}
                </td>
                {modules.map((module) => (
                  <td key={module.key} className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={role.modules[module.key]}
                      onChange={(e) =>
                        updateRolePermissions(role.id, {
                          [module.key]: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={role.id === 'admin' && module.key === 'settings'}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};