const ratingFormatter = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatRating(rating: number): string {
  return ratingFormatter.format(rating);
}

export function formatProductCount(count: number): string {
  return `${count} ${count > 1 ? 'produits' : 'produit'}`;
}
