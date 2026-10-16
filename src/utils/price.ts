import type { Product } from '../types/product';

type DiscountedPrice = Pick<Product, 'price' | 'discountPercentage'>;

/** Prix avec remise arrondi au centime*/
export function getFinalPrice({ price, discountPercentage }: DiscountedPrice): number {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
}

const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}
