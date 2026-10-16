import { Link } from 'react-router';
import { CartItem } from '../components/CartItem';
import { EmptyState } from '../components/EmptyState';
import { PageTitle } from '../components/PageTitle';
import { ROUTES } from '../constants/routes';
import { useCartActions, useCartEntries } from '../hooks/useCart';
import { getCartSummary } from '../utils/cart';
import { formatItemCount, formatProductCount } from '../utils/format';
import { formatPrice } from '../utils/price';

export function CartPage() {
  const entries = useCartEntries();
  const { clearCart } = useCartActions();

  if (entries.length === 0) {
    return (
      <section className="cart">
        <PageTitle title="Mon panier" />
        <h1>Mon panier</h1>
        <EmptyState message="Votre panier est vide.">
          <Link to={ROUTES.catalog} className="button">
            Voir le catalogue
          </Link>
        </EmptyState>
      </section>
    );
  }

  const { productCount, itemCount, total } = getCartSummary(entries);

  return (
    <section className="cart">
      <PageTitle title="Mon panier" />
      <h1>Mon panier</h1>
      <p className="cart__summary">
        {formatProductCount(productCount)} · {formatItemCount(itemCount)} · Total{' '}
        <strong>{formatPrice(total)}</strong>
      </p>

      <ul className="cart__list">
        {entries.map((entry) => (
          <li key={entry.productId}>
            <CartItem entry={entry} />
          </li>
        ))}
      </ul>

      <button type="button" className="button button--block" onClick={clearCart}>
        Vider le panier
      </button>
    </section>
  );
}
