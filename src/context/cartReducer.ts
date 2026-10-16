import type { CartEntry } from '../types/cart';
import type { Product } from '../types/product';
import { clampQuantity, toCartEntry } from '../utils/cart';

export type CartAction =
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'REMOVE_PRODUCT'; productId: number }
  | { type: 'CLEAR' };

export function cartReducer(state: readonly CartEntry[], action: CartAction): readonly CartEntry[] {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const { product } = action;
      const isAlreadyInCart = state.some((entry) => entry.productId === product.id);
      if (isAlreadyInCart || product.stock <= 0) return state;
      return [...state, toCartEntry(product)];
    }

    case 'UPDATE_QUANTITY':
      return state.map((entry) =>
        entry.productId === action.productId
          ? { ...entry, quantity: clampQuantity(action.quantity, entry.stock) }
          : entry,
      );

    case 'REMOVE_PRODUCT':
      return state.filter((entry) => entry.productId !== action.productId);

    case 'CLEAR':
      return state.length === 0 ? state : [];
  }
}
