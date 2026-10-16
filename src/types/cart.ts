import type { Product } from './product';

export interface CartEntry extends Pick<
  Product,
  'title' | 'thumbnail' | 'price' | 'discountPercentage' | 'stock'
> {
  productId: number;
  quantity: number;
}
