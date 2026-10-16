import { useCallback, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { login as loginRequest } from '../services/api';
import type { AuthSession, LoginCredentials } from '../types/auth';
import { isAuthSession, toAuthUser } from '../utils/auth';
import { AuthContext, type AuthContextValue } from './authContexts';

// Jeton en localStorage pour conserver la sessions au rechargement.
const AUTH_STORAGE_KEY = 'cabas.auth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useLocalStorage<AuthSession | null>(
    AUTH_STORAGE_KEY,
    null,
    isAuthSession,
  );

  // Les erreurs remontent à l'appelant, qui distingue identifiants incorrects et panne réseau
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await loginRequest(credentials);
      setSession({ user: toAuthUser(response), token: response.accessToken });
    },
    [setSession],
  );

  const logout = useCallback(() => setSession(null), [setSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      login,
      logout,
    }),
    [session, login, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
