import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import type { RedirectState } from '../utils/redirect';

/** Route de mise en page : affiche ses enfants si l'utilisateur est connecté. */
export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const state: RedirectState = {
      from: `${location.pathname}${location.search}${location.hash}`,
    };
    return <Navigate to={ROUTES.login} replace state={state} />;
  }

  return <Outlet />;
}
