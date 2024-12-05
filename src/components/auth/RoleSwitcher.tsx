import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types/auth';

export const RoleSwitcher: React.FC = () => {
  const { user, switchRole, logout } = useAuthStore();

  const roleLabels: Record<UserRole, string> = {
    admin: '系统管理员',
    manager: '店长',
    employee: '员工',
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative inline-block text-left">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-700">
            {user?.name} ({roleLabels[user?.role || 'employee']})
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => {
              const roles: UserRole[] = ['admin', 'manager', 'employee'];
              const currentIndex = roles.indexOf(user?.role || 'employee');
              const nextRole = roles[(currentIndex + 1) % roles.length];
              switchRole(nextRole);
            }}
          >
            <UserCircle2 className="h-5 w-5 mr-2" />
            切换角色
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={logout}
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
};