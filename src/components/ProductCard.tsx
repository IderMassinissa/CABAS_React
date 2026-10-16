import { Link } from 'react-router';
import { getProductPath } from '../constants/routes';
import type { Product } from '../types/product';
import { getCategoryLabel } from '../utils/catalog';
import { PriceTag } from './PriceTag';
import { Rating } from './Rating';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-card__image"
        loading="lazy"
      />
      <div className="product-card__body">
        <h2 className="product-card__title">
          {/* Le pseudo-élément ::after étend le lien à toute la carte */}
          <Link to={getProductPath(product.id)} className="product-card__link">
            {product.title}
          </Link>
        </h2>
        <p className="product-card__meta">
          <Rating value={product.rating} />
          <PriceTag product={product} />
        </p>
        <p className="product-card__badges">
          <span className="badge">{product.availabilityStatus}</span>
          <span className="badge">{getCategoryLabel(product.category)}</span>
        </p>
      </div>
    </article>
  );
}
