import { CATEGORY_OPTIONS } from '../constants/categories';
import type { Category, CategoryOption } from '../types/category';
import type { Product } from '../types/product';
import type { SortKey } from '../types/sort';
import { getFinalPrice } from './price';

type ProductComparator = (a: Product, b: Product) => number;

const titleCollator = new Intl.Collator('fr');

// null : ordre de l'API (pertinence)
const SORT_COMPARATORS: Record<SortKey, ProductComparator | null> = {
  pertinence: null,
  prix: (a, b) => getFinalPrice(a) - getFinalPrice(b),
  note: (a, b) => b.rating - a.rating,
  nom: (a, b) => titleCollator.compare(a.title, b.title),
};

export function findCategoryBySlug(slug: string): CategoryOption | undefined {
  return CATEGORY_OPTIONS.find((option) => option.slug === slug);
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? category;
}

export function filterByCategory(
  products: readonly Product[],
  category: Category | null,
): readonly Product[] {
  return category === null ? products : products.filter((product) => product.category === category);
}

/** On renvoie ici une copie triée, le tableau reçu n'est jamais modifié. */
export function sortProducts(products: readonly Product[], sortKey: SortKey): readonly Product[] {
  const comparator = SORT_COMPARATORS[sortKey];
  return comparator ? [...products].sort(comparator) : products;
}
