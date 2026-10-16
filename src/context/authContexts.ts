import { createContext } from 'react';
import type { AuthUser, LoginCredentials } from '../types/auth';

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
