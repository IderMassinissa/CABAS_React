import { useContext, type Context } from 'react';
import {
  CartActionsContext,
  CartCountContext,
  CartStateContext,
  type CartActions,
} from '../context/cartContexts';
import type { CartEntry } from '../types/cart';

function useRequiredContext<T>(context: Context<T | null>, hookName: string): T {
  const value = useContext(context);
  if (value === null) {
    throw new Error(`${hookName} must be used within a CartProvider`);
  }
  return value;
}

export function useCartEntries(): readonly CartEntry[] {
  return useRequiredContext(CartStateContext, 'useCartEntries');
}

export function useCartActions(): CartActions {
  return useRequiredContext(CartActionsContext, 'useCartActions');
}

export function useCartCount(): number {
  return useRequiredContext(CartCountContext, 'useCartCount');
}
