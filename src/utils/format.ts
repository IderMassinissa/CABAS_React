const ratingFormatter = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatRating(rating: number): string {
  return ratingFormatter.format(rating);
}

function formatCount(count: number, singular: string, plural: string): string {
  return `${count} ${count > 1 ? plural : singular}`;
}

export function formatProductCount(count: number): string {
  return formatCount(count, 'produit', 'produits');
}

export function formatItemCount(count: number): string {
  return formatCount(count, 'article', 'articles');
}

const discountFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' });

/** On affiche la remise en pourcentage négatif */
export function formatDiscount(discountPercentage: number): string {
  return discountFormatter.format(-discountPercentage / 100);
}

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}
