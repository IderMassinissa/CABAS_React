import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { readJson, writeJson } from '../utils/storage';

/**
 * État persisté dans le localStorage, avec la même API que useState.
 * Une valeur stockée absente ou invalide est remplacée par `fallback`.
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readJson(key, isValid) ?? fallback);

  useEffect(() => {
    writeJson(key, value);
  }, [key, value]);

  return [value, setValue];
}
