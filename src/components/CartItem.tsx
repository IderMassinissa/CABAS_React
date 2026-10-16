import { Link } from 'react-router';
import { getProductPath } from '../constants/routes';
import { useCartActions } from '../hooks/useCart';
import type { CartEntry } from '../types/cart';
import { getEntrySubtotal } from '../utils/cart';
import { formatPrice, getFinalPrice } from '../utils/price';
import { QuantitySelector } from './QuantitySelector';

interface CartItemProps {
  entry: CartEntry;
}

export function CartItem({ entry }: CartItemProps) {
  const { updateQuantity, removeProduct } = useCartActions();

  return (
    <article className="cart-item">
      <img src={entry.thumbnail} alt="" className="cart-item__image" loading="lazy" />

      <div>
        <h2 className="cart-item__title">
          <Link to={getProductPath(entry.productId)}>{entry.title}</Link>
        </h2>
        <p className="cart-item__unit-price">{formatPrice(getFinalPrice(entry))} l’unité</p>
      </div>

      <div className="cart-item__actions">
        <QuantitySelector
          value={entry.quantity}
          max={entry.stock}
          label={entry.title}
          onChange={(quantity) => updateQuantity(entry.productId, quantity)}
        />
        <p className="cart-item__subtotal">
          <span className="visually-hidden">Sous-total : </span>
          {formatPrice(getEntrySubtotal(entry))}
        </p>
        <button
          type="button"
          className="button"
          aria-label={`Retirer ${entry.title} du panier`}
          onClick={() => removeProduct(entry.productId)}
        >
          Retirer
        </button>
      </div>
    </article>
  );
}
