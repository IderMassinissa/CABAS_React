import {
  CartActionsContext,
  CartCountContext,
  CartStateContext,
  type CartActions,
} from '../context/cartContexts';
import type { CartEntry } from '../types/cart';
import { useRequiredContext } from './useRequiredContext';

export function useCartEntries(): readonly CartEntry[] {
  return useRequiredContext(CartStateContext, 'useCartEntries');
}

export function useCartActions(): CartActions {
  return useRequiredContext(CartActionsContext, 'useCartActions');
}

export function useCartCount(): number {
  return useRequiredContext(CartCountContext, 'useCartCount');
}
