// Architecture du hook
import { useCallback, useEffect, useMemo, useState } from 'react';

type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

/** Identifie une requête : la fonction appelée et le numéro de rechargement. */
interface FetchRequest<T> {
  fetcher: Fetcher<T>;
  reloadCount: number;
}

/** Résultat reçu, rattaché à la requête qui l'a produit. */
interface SettledResult<T> {
  request: FetchRequest<T>;
  data: T | null;
  error: Error | null;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

export function useFetch<T>(fetcher: Fetcher<T>): FetchState<T> {
  const [reloadCount, setReloadCount] = useState(0);
  const [settled, setSettled] = useState<SettledResult<T> | null>(null);

  const request = useMemo<FetchRequest<T>>(
    () => ({ fetcher, reloadCount }),
    [fetcher, reloadCount],
  );

  useEffect(() => {
    const controller = new AbortController();

    request.fetcher(controller.signal).then(
      (data) => {
        if (controller.signal.aborted) return;
        setSettled({ request, data, error: null });
      },
      (error: unknown) => {
        if (controller.signal.aborted) return;
        setSettled({
          request,
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      },
    );

    return () => controller.abort();
  }, [request]);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  const isCurrent = settled !== null && settled.request === request;

  return {
    data: isCurrent ? settled.data : null,
    loading: !isCurrent,
    error: isCurrent ? settled.error : null,
    reload,
  };
}
