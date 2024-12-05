import { create } from 'zustand';
import { User, LoginCredentials } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  switchRole: (role: User['role']) => void;
}

// Simulated user data - in a real app, this would come from an API
const users: User[] = [
  { id: '1', username: 'admin', role: 'admin', name: '系统管理员' },
  { id: '2', username: 'manager', role: 'manager', name: '店长' },
  { id: '3', username: 'employee', role: 'employee', name: '员工' },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials: LoginCredentials) => {
    // Simulate API call
    const user = users.find(u => u.username === credentials.username);
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  switchRole: (role: User['role']) => {
    set((state) => {
      if (!state.user) return state;
      const newUser = users.find(u => u.role === role);
      return newUser ? { user: newUser } : state;
    });
  },
}));