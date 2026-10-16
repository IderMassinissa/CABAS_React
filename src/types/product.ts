// Structure des types du domaine

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  availabilityStatus: string;
  tags: string[];
  reviews: Review[];
  thumbnail: string;
  images: string[];
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
