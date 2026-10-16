import { NavLink, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

/** La partie « compte » de l'en-tête : il ny'a que ce composant qui dépend de l'authentification. */
export function HeaderAccount() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    // Quitter la page protégée dans le même événement : un seul rendu, pas de détour par /connexion
    if (location.pathname === ROUTES.newProduct) {
      void navigate(ROUTES.catalog, { replace: true });
    }
    logout();
  }

  if (!user) {
    return (
      <li>
        <NavLink to={ROUTES.login} className="header__link header__link--pill">
          Se connecter
        </NavLink>
      </li>
    );
  }

  return (
    <>
      <li className="header__user">
        <img src={user.image} alt={`Avatar de ${user.firstName}`} className="header__avatar" />
        <span className="header__desktop-only">{user.firstName}</span>
      </li>
      <li>
        <button
          type="button"
          className="header__link header__link--pill header__button"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
      </li>
    </>
  );
}
