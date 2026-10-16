import { useCallback, useMemo, useState } from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { PageTitle } from '../components/PageTitle';
import { ProductList } from '../components/ProductList';
import { SearchBar } from '../components/SearchBar';
import { SortSelect } from '../components/SortSelect';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { searchProducts } from '../services/api';
import type { SortKey } from '../types/sort';
import { filterByCategory, findCategoryBySlug, sortProducts } from '../utils/catalog';
import { formatProductCount } from '../utils/format';

const SEARCH_DEBOUNCE_MS = 400;

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('pertinence');

  const searchTerm = useDebounce(query.trim(), SEARCH_DEBOUNCE_MS);

  const fetchProducts = useCallback(
    (signal: AbortSignal) => searchProducts(searchTerm, signal),
    [searchTerm],
  );
  const { data, loading, error, reload } = useFetch(fetchProducts);

  const selectedCategory = findCategoryBySlug(categorySlug)?.value ?? null;

  // Filtre et tri en mémoire, aucun nouvel appel vers l'API
  const visibleProducts = useMemo(
    () => sortProducts(filterByCategory(data?.products ?? [], selectedCategory), sortKey),
    [data, selectedCategory, sortKey],
  );

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <PageTitle title="Catalogue" />
      <h1 id="catalog-title" className="visually-hidden">
        Catalogue
      </h1>

      <div className="catalog__toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter value={categorySlug} onChange={setCategorySlug} />
        <SortSelect value={sortKey} onChange={setSortKey} />
      </div>

      {loading && <Loader label="Chargement des produits…" />}

      {error && <ErrorMessage message="Impossible de charger les produits." onRetry={reload} />}

      {data &&
        (visibleProducts.length > 0 ? (
          <>
            <p className="catalog__count">{formatProductCount(visibleProducts.length)}</p>
            <ProductList products={visibleProducts} />
          </>
        ) : (
          <EmptyState message="Aucun produit ne correspond à votre recherche." />
        ))}
    </section>
  );
}
