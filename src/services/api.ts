// Structure du service API
import type { LoginCredentials, LoginResponse } from '../types/auth';
import type { NewProduct } from '../types/newProduct';
import type { Product, ProductSearchResponse } from '../types/product';
import { ApiError } from './ApiError';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  return data as T;
}

function postJson<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function searchProducts(
  query: string,
  signal?: AbortSignal,
): Promise<ProductSearchResponse> {
  // limit=0 : sinon l'API ne renvoie que 30 résultats
  const params = new URLSearchParams({ q: query, limit: '0' });
  return request<ProductSearchResponse>(`/products/search?${params.toString()}`, { signal });
}

export function getProductById(id: string | number, signal?: AbortSignal): Promise<Product> {
  return request<Product>(`/products/${encodeURIComponent(id)}`, { signal });
}

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return postJson<LoginResponse>('/auth/login', credentials);
}

export function createProduct(payload: NewProduct): Promise<NewProduct & { id: number }> {
  return postJson<NewProduct & { id: number }>('/products/add', payload);
}
