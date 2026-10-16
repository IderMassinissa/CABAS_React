import { formatRating } from '../utils/format';

interface RatingProps {
  value: number;
  reviewCount?: number;
}

export function Rating({ value, reviewCount }: RatingProps) {
  return (
    <span className="rating">
      <span aria-hidden="true">★ </span>
      <span className="visually-hidden">Note : </span>
      {formatRating(value)}
      <span className="visually-hidden"> sur 5</span>
      {reviewCount !== undefined && ` (${reviewCount} avis)`}
    </span>
  );
}
