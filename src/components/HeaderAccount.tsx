import { NavLink } from 'react-router';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

/** La partie « compte » de l'en-tête : il ny'a que ce composant qui dépend de l'authentification. */
export function HeaderAccount() {
  const { user, logout } = useAuth();

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
          onClick={logout}
        >
          Se déconnecter
        </button>
      </li>
    </>
  );
}
