import type { CartEntry } from '../types/cart';
import type { Product } from '../types/product';
import { getFinalPrice, roundToCents } from './price';

export interface CartSummary {
  productCount: number;
  itemCount: number;
  total: number;
}

export function toCartEntry(product: Product): CartEntry {
  return {
    productId: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    discountPercentage: product.discountPercentage,
    stock: product.stock,
    quantity: 1,
  };
}

export function clampQuantity(quantity: number, stock: number): number {
  return Math.min(Math.max(Math.trunc(quantity), 1), stock);
}

export function getEntrySubtotal(entry: CartEntry): number {
  return roundToCents(getFinalPrice(entry) * entry.quantity);
}

export function getCartSummary(entries: readonly CartEntry[]): CartSummary {
  return {
    productCount: entries.length,
    itemCount: entries.reduce((sum, entry) => sum + entry.quantity, 0),
    total: roundToCents(entries.reduce((sum, entry) => sum + getEntrySubtotal(entry), 0)),
  };
}

function isCartEntry(value: unknown): value is CartEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    'productId' in value &&
    typeof value.productId === 'number' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'thumbnail' in value &&
    typeof value.thumbnail === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    'discountPercentage' in value &&
    typeof value.discountPercentage === 'number' &&
    'stock' in value &&
    typeof value.stock === 'number' &&
    'quantity' in value &&
    typeof value.quantity === 'number' &&
    value.quantity >= 1
  );
}

export function isCartEntries(value: unknown): value is CartEntry[] {
  return Array.isArray(value) && value.every(isCartEntry);
}
