import React, { useState } from 'react';
import { Menu, X, BarChart3, Package, FileText, Settings, Store, Users, Link, KeyRound } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface FloatingSidebarProps {
  onNavigate: (view: 'dashboard' | 'inventory' | 'reports' | 'settings') => void;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setIsHovered(false);
      setExpandedItem(null);
    }
  };

  const navigationItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: '财务概览', href: '#dashboard', view: 'dashboard' as const },
    { icon: <Package className="w-5 h-5" />, label: '库存管理', href: '#inventory', view: 'inventory' as const },
    { icon: <FileText className="w-5 h-5" />, label: '报表分析', href: '#reports', view: 'reports' as const },
    ...(user?.role === 'admin' ? [
      {
        icon: <Settings className="w-5 h-5" />,
        label: '系统设置',
        href: '#settings',
        view: 'settings' as const,
        subItems: [
          { icon: <Store className="w-4 h-4" />, label: '门店管理', href: '#settings/stores' },
          { icon: <Users className="w-4 h-4" />, label: '角色权限', href: '#settings/roles' },
          { icon: <Link className="w-4 h-4" />, label: 'API 设置', href: '#settings/api' },
          { icon: <KeyRound className="w-4 h-4" />, label: '登录设置', href: '#settings/login' }
        ]
      }
    ] : [])
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if ('view' in item) {
      onNavigate(item.view);
      setIsOpen(false);
      setIsHovered(false);
      setExpandedItem(null);
    }
  };

  return (
    <div
      className="fixed left-0 bottom-8 z-50 flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-r-lg shadow-lg transition-all duration-300 ${
          isHovered || isOpen ? 'translate-x-0' : '-translate-x-8'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div
        className={`absolute left-0 bottom-0 bg-white rounded-r-lg shadow-xl transition-all duration-300 transform ${
          isOpen || isHovered ? 'translate-x-12' : '-translate-x-full'
        }`}
      >
        <nav className="py-2">
          {navigationItems.map((item, index) => (
            <div key={index}>
              <a
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  if ('subItems' in item) {
                    setExpandedItem(expandedItem === item.href ? null : item.href);
                  } else {
                    handleNavigation(item);
                  }
                }}
              >
                <span className="text-blue-600">{item.icon}</span>
                <span className="ml-3 whitespace-nowrap">{item.label}</span>
                {'subItems' in item && (
                  <span className="ml-auto">
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedItem === item.href ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                )}
              </a>
              {'subItems' in item && expandedItem === item.href && (
                <div className="pl-12 py-1 bg-gray-50">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item);
                      }}
                    >
                      <span className="text-gray-400 mr-2">{subItem.icon}</span>
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};