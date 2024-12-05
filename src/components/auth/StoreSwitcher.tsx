import React, { useState } from 'react';
import { Store, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useSettingsStore } from '../../stores/settingsStore';

export const StoreSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { stores } = useSettingsStore();
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  const handleStoreChange = (store: typeof stores[0]) => {
    setSelectedStore(store);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative inline-block text-left">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center justify-between w-56 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center">
                <Store className="h-5 w-5 mr-2 text-gray-500" />
                <span className="truncate">{selectedStore.name}</span>
              </div>
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {stores.map((store) => (
                    <button
                      key={store.id}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        selectedStore.id === store.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleStoreChange(store)}
                    >
                      {store.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
};