import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { CartEntry } from '../types/cart';
import { isCartEntries } from '../utils/cart';
import { readJson, writeJson } from '../utils/storage';
import {
  CartActionsContext,
  CartCountContext,
  CartStateContext,
  type CartActions,
} from './cartContexts';
import { cartReducer } from './cartReducer';

const CART_STORAGE_KEY = 'cabas.cart';

function loadCart(): readonly CartEntry[] {
  return readJson(CART_STORAGE_KEY, isCartEntries) ?? [];
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [entries, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    writeJson(CART_STORAGE_KEY, entries);
  }, [entries]);

  const actions = useMemo<CartActions>(
    () => ({
      addProduct: (product) => dispatch({ type: 'ADD_PRODUCT', product }),
      updateQuantity: (productId, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
      removeProduct: (productId) => dispatch({ type: 'REMOVE_PRODUCT', productId }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [],
  );

  return (
    <CartActionsContext value={actions}>
      <CartStateContext value={entries}>
        <CartCountContext value={entries.length}>{children}</CartCountContext>
      </CartStateContext>
    </CartActionsContext>
  );
}
