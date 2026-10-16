import type { Product } from '../types/product';
import { formatDiscount } from '../utils/format';
import { PriceTag } from './PriceTag';
import { Rating } from './Rating';
import { ReviewList } from './ReviewList';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const specifications = [
    { label: 'Référence', value: product.sku },
    { label: 'Poids', value: String(product.weight) },
    { label: 'Garantie', value: product.warrantyInformation },
    { label: 'Livraison', value: product.shippingInformation },
    { label: 'Politique de retour', value: product.returnPolicy },
  ];

  return (
    <article className="product-details">
      <img
        src={product.images[0] ?? product.thumbnail}
        alt={product.title}
        className="product-details__image"
      />

      <div className="product-details__info">
        <h1>{product.title}</h1>

        <p className="product-details__meta">
          <Rating value={product.rating} reviewCount={product.reviews.length} />
          <span>{product.brand ?? 'Marque non renseignée'}</span>
          <span>Stock : {product.stock}</span>
        </p>

        <p className="product-details__price">
          <PriceTag product={product} />
          {product.discountPercentage > 0 && (
            <span className="badge">{formatDiscount(product.discountPercentage)}</span>
          )}
        </p>
      </div>

      <section className="product-details__section" aria-labelledby="description-title">
        <h2 id="description-title">Description</h2>
        <p>{product.description}</p>
      </section>

      <section className="product-details__section" aria-labelledby="specifications-title">
        <h2 id="specifications-title">Caractéristiques</h2>
        <dl className="specifications">
          {specifications.map(({ label, value }) => (
            <div key={label} className="specifications__row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="product-details__section" aria-labelledby="reviews-title">
        <h2 id="reviews-title">Avis clients</h2>
        <ReviewList reviews={product.reviews} />
      </section>
    </article>
  );
}
