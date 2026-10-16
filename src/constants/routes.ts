// routage et gabarit commun

export const ROUTES = {
  catalog: '/',
  product: '/produits/:id',
  cart: '/panier',
  login: '/connexion',
  newProduct: '/proposer',
} as const;

export function getProductPath(productId: number): string {
  return `/produits/${productId}`;
}
