import { useContext, type Context } from 'react';

/** Lit un contexte et lève une erreur explicite si le provider est absent. */
export function useRequiredContext<T>(context: Context<T | null>, hookName: string): T {
  const value = useContext(context);
  if (value === null) {
    throw new Error(`${hookName} must be used within its provider`);
  }
  return value;
}
