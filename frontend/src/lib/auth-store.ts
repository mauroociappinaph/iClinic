import { create } from 'zustand';
import { login, register } from './auth-service';

interface User {
  email: string;
  // Add other user properties here as needed
}

interface AuthData {
  user: User | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string, rol: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

interface AuthState extends AuthData, AuthActions {}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  login: async (email, password) => {
    const data = await login(email, password);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      set({ user: { email } });
    }
  },
  register: async (nombre, email, password, rol) => {
    const data = await register(nombre, email, password, rol);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      set({ user: { email } });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ user: { email: 'user@example.com' } }); // You might want to fetch actual user data here
    }
  },
}));
