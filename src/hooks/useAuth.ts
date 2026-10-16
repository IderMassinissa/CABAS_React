import { AuthContext, type AuthContextValue } from '../context/authContexts';
import { useRequiredContext } from './useRequiredContext';

export function useAuth(): AuthContextValue {
  return useRequiredContext(AuthContext, 'useAuth');
}
