import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

const AUTH_URL = 'https://functions.poehali.dev/90efd614-080f-4e88-9890-94bda588582e';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  phone?: string;
  city?: string;
  address?: string;
  created_at?: string;
}

export interface Order {
  id: number;
  customer_name: string;
  city: string;
  address: string;
  delivery_method: string;
  payment_method: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  created_at: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  orders: Order[];
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string, name: string) => Promise<string | null>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => Promise<boolean>;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('dw_token'));
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (t: string) => {
    const res = await fetch(`${AUTH_URL}?action=me`, {
      headers: { 'X-Auth-Token': t },
    });
    if (!res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('dw_token');
      return;
    }
    const data = await res.json();
    setUser(data.user);
    setOrders(data.orders || []);
  };

  useEffect(() => {
    if (token) fetchProfile(token);
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    setLoading(true);
    const res = await fetch(`${AUTH_URL}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return data.error || 'Ошибка входа';
    localStorage.setItem('dw_token', data.token);
    setToken(data.token);
    setUser(data.user);
    await fetchProfile(data.token);
    return null;
  };

  const register = async (email: string, password: string, name: string): Promise<string | null> => {
    setLoading(true);
    const res = await fetch(`${AUTH_URL}?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return data.error || 'Ошибка регистрации';
    localStorage.setItem('dw_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return null;
  };

  const logout = async () => {
    if (token) {
      await fetch(`${AUTH_URL}?action=logout`, {
        method: 'POST',
        headers: { 'X-Auth-Token': token },
      });
    }
    setUser(null);
    setToken(null);
    setOrders([]);
    localStorage.removeItem('dw_token');
  };

  const updateProfile = async (data: Partial<AuthUser>): Promise<boolean> => {
    if (!token) return false;
    const res = await fetch(`${AUTH_URL}?action=me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setUser(prev => prev ? { ...prev, ...data } : prev);
    }
    return res.ok;
  };

  const refreshProfile = () => {
    if (token) fetchProfile(token);
  };

  return (
    <AuthContext.Provider value={{ user, orders, token, loading, login, register, logout, updateProfile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
