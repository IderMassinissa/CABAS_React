import type { Product } from '../types/product';

type DiscountedPrice = Pick<Product, 'price' | 'discountPercentage'>;

export function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Prix avec remise arrondi au centime*/
export function getFinalPrice({ price, discountPercentage }: DiscountedPrice): number {
  return roundToCents(price * (1 - discountPercentage / 100));
}

const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}
