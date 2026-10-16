import { useCartActions, useCartEntries } from '../hooks/useCart';
import type { Product } from '../types/product';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const entries = useCartEntries();
  const { addProduct } = useCartActions();

  const isOutOfStock = product.stock <= 0;
  const isInCart = entries.some((entry) => entry.productId === product.id);

  const label = isOutOfStock
    ? 'Rupture de stock'
    : isInCart
      ? 'Déjà dans mon panier'
      : '+ Ajouter au panier';

  return (
    <button
      type="button"
      className="button button--block"
      disabled={isOutOfStock || isInCart}
      onClick={() => addProduct(product)}
    >
      {label}
    </button>
  );
}
