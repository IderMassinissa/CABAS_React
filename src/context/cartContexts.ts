import { createContext } from 'react';
import type { CartEntry } from '../types/cart';
import type { Product } from '../types/product';

export interface CartActions {
  addProduct: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
}

export const CartStateContext = createContext<readonly CartEntry[] | null>(null);
export const CartActionsContext = createContext<CartActions | null>(null);
export const CartCountContext = createContext<number | null>(null);
