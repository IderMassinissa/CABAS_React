export type Category =
  | 'smartphones'
  | 'laptops'
  | 'mobile-accessories'
  | 'kitchen-accessories'
  | 'sports-accessories'
  | 'groceries';

export interface CategoryOption {
  slug: string; // valeur dans l'URL, en français du coup.
  value: Category; // identifiant de l'API
  label: string; // libellé affiché
}
