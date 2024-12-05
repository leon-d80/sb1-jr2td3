import React from 'react';
import { Settings, Store, Users, Link, UserCircle, KeyRound } from 'lucide-react';
import { StoreSettings } from './StoreSettings';
import { RoleSettings } from './RoleSettings';
import { ApiSettings } from './ApiSettings';
import { LoginSettings } from './LoginSettings';
import { useAuthStore } from '../../stores/authStore';

export const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'stores' | 'roles' | 'api' | 'login'>('stores');
  const user = useAuthStore((state) => state.user);

  if (user?.role !== 'admin') {
    return (
      <div className="p-8 text-center text-gray-500">
        您没有权限访问系统设置
      </div>
    );
  }

  const tabs = [
    { id: 'stores', label: '门店管理', icon: Store },
    { id: 'roles', label: '角色权限', icon: Users },
    { id: 'api', label: 'API 设置', icon: Link },
    { id: 'login', label: '登录设置', icon: KeyRound },
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5 inline-block mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'stores' && <StoreSettings />}
        {activeTab === 'roles' && <RoleSettings />}
        {activeTab === 'api' && <ApiSettings />}
        {activeTab === 'login' && <LoginSettings />}
      </div>
    </div>
  );
};