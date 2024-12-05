export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}