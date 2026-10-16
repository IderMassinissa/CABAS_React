import { Link, NavLink } from 'react-router';
import { ROUTES } from '../constants/routes';
import { useCartCount } from '../hooks/useCart';
import { formatProductCount } from '../utils/format';
import { HeaderAccount } from './HeaderAccount';

export function Header() {
  const cartCount = useCartCount();

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
                <span className="header__count" aria-hidden="true">
                  {cartCount}
                </span>
                <span className="visually-hidden"> ({formatProductCount(cartCount)})</span>
              </NavLink>
            </li>
            <HeaderAccount />
          </ul>
        </nav>
      </div>
    </header>
  );
}
