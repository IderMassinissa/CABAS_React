import type { Category } from './category';

export interface NewProduct {
  title: string;
  category: Category;
  brand?: string; // une marque vide n'est pas envoyée comme ca
  price: number;
  stock: number;
  description: string;
  tags: string[];
  userId: number;
}
