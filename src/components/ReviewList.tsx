// la fiche produit
import type { Review } from '../types/product';
import { formatDate } from '../utils/format';
import { Rating } from './Rating';

interface ReviewListProps {
  reviews: readonly Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p>Aucun avis pour ce produit.</p>;
  }

  return (
    <ul className="review-list">
      {reviews.map((review) => (
        // Pas d'identifiant fourni par l'API
        <li key={`${review.reviewerName}-${review.date}`} className="review-list__item">
          <p>
            <Rating value={review.rating} /> {review.comment}
          </p>
          <p className="review-list__author">
            {review.reviewerName}, <time dateTime={review.date}>{formatDate(review.date)}</time>
          </p>
        </li>
      ))}
    </ul>
  );
}
