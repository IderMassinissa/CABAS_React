import { Link, NavLink } from 'react-router';
import { ROUTES } from '../constants/routes';

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to={ROUTES.catalog} className="header__logo">
          CABAS
        </Link>

        <nav aria-label="Navigation principale">
          <ul className="header__nav">
            <li className="header__desktop-only">
              <NavLink to={ROUTES.catalog} end className="header__link">
                Catalogue
              </NavLink>
            </li>
            <li className="header__desktop-only">
              <NavLink to={ROUTES.newProduct} className="header__link">
                Proposer un produit
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.cart} className="header__link header__link--pill">
                Panier
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.login} className="header__link header__link--pill">
                Se connecter
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
