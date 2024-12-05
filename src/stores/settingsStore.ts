import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Store, ApiConfig, RolePermission, UserStore, UserAccount, Settings } from '../types/settings';

interface SettingsState {
  stores: Store[];
  apiConfigs: ApiConfig[];
  rolePermissions: RolePermission[];
  userStores: UserStore[];
  users: UserAccount[];
  settings: Settings;
  logo?: string;
  addStore: (store: Omit<Store, 'id'>) => void;
  updateStore: (id: string, store: Partial<Store>) => void;
  deleteStore: (id: string) => void;
  addApiConfig: (config: Omit<ApiConfig, 'id'>) => void;
  updateApiConfig: (id: string, config: Partial<ApiConfig>) => void;
  deleteApiConfig: (id: string) => void;
  updateRolePermissions: (id: string, permissions: Partial<RolePermission['modules']>) => void;
  assignUserToStore: (userId: string, storeId: string) => void;
  removeUserFromStore: (userId: string, storeId: string) => void;
  addUser: (user: UserAccount) => void;
  updateUser: (id: string, user: Partial<UserAccount>) => void;
  deleteUser: (id: string) => void;
  updateLogo: (logo: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      stores: [
        { id: '1', name: '咔咔染总店', address: '北京市朝阳区', phone: '010-12345678' },
        { id: '2', name: '咔咔染分店1', address: '北京市海淀区', phone: '010-87654321' },
      ],
      apiConfigs: [
        {
          id: '1',
          name: '有赞收银',
          type: 'youzan',
          apiKey: 'yz_test_key',
          apiSecret: 'yz_test_secret',
          enabled: true,
        },
      ],
      rolePermissions: [
        {
          id: 'admin',
          name: '系统管理员',
          modules: {
            dashboard: true,
            inventory: true,
            expenses: true,
            reports: true,
            settings: true,
          },
        },
        {
          id: 'manager',
          name: '店长',
          modules: {
            dashboard: true,
            inventory: true,
            expenses: true,
            reports: true,
            settings: false,
          },
        },
        {
          id: 'employee',
          name: '员工',
          modules: {
            dashboard: true,
            inventory: true,
            expenses: false,
            reports: false,
            settings: false,
          },
        },
      ],
      userStores: [],
      users: [],
      settings: {
        companyName: '咔咔染',
        theme: {
          primaryColor: '#3B82F6',
          accentColor: '#EF4444',
        },
      },
      logo: undefined,
      addStore: (store) =>
        set((state) => ({
          stores: [...state.stores, { ...store, id: Date.now().toString() }],
        })),
      updateStore: (id, store) =>
        set((state) => ({
          stores: state.stores.map((s) => (s.id === id ? { ...s, ...store } : s)),
        })),
      deleteStore: (id) =>
        set((state) => ({
          stores: state.stores.filter((s) => s.id !== id),
        })),
      addApiConfig: (config) =>
        set((state) => ({
          apiConfigs: [...state.apiConfigs, { ...config, id: Date.now().toString() }],
        })),
      updateApiConfig: (id, config) =>
        set((state) => ({
          apiConfigs: state.apiConfigs.map((c) => (c.id === id ? { ...c, ...config } : c)),
        })),
      deleteApiConfig: (id) =>
        set((state) => ({
          apiConfigs: state.apiConfigs.filter((c) => c.id !== id),
        })),
      updateRolePermissions: (id, permissions) =>
        set((state) => ({
          rolePermissions: state.rolePermissions.map((r) =>
            r.id === id ? { ...r, modules: { ...r.modules, ...permissions } } : r
          ),
        })),
      assignUserToStore: (userId, storeId) =>
        set((state) => ({
          userStores: [...state.userStores, { userId, storeId }],
        })),
      removeUserFromStore: (userId, storeId) =>
        set((state) => ({
          userStores: state.userStores.filter(
            (us) => !(us.userId === userId && us.storeId === storeId)
          ),
        })),
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      updateUser: (id, user) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),
      updateLogo: (logo) =>
        set(() => ({
          logo,
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);