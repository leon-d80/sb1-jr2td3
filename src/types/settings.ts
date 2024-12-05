export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface ApiConfig {
  id: string;
  name: string;
  type: 'youzan' | 'wechat' | 'other';
  apiKey: string;
  apiSecret: string;
  enabled: boolean;
}

export interface RolePermission {
  id: string;
  name: string;
  modules: {
    dashboard: boolean;
    inventory: boolean;
    expenses: boolean;
    reports: boolean;
    settings: boolean;
  };
}

export interface UserStore {
  userId: string;
  storeId: string;
}

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  role: string;
  storeIds: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface Settings {
  logo?: string;
  companyName: string;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
}