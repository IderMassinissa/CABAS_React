import type { Product } from '../types/product';
import { formatPrice, getFinalPrice } from '../utils/price';

interface PriceTagProps {
  product: Pick<Product, 'price' | 'discountPercentage'>;
}

export function PriceTag({ product }: PriceTagProps) {
  const finalPrice = getFinalPrice(product);
  const hasDiscount = finalPrice < product.price;

  return (
    <span className="price-tag">
      <strong>{formatPrice(finalPrice)}</strong>
      {hasDiscount && (
        <del className="price-tag__original">
          <span className="visually-hidden">Prix d’origine : </span>
          {formatPrice(product.price)}
        </del>
      )}
    </span>
  );
}
