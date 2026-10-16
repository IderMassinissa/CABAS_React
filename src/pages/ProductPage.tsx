import { useCallback } from 'react';
import { Link, useParams } from 'react-router';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { PageTitle } from '../components/PageTitle';
import { ProductDetails } from '../components/ProductDetails';
import { ROUTES } from '../constants/routes';
import { useFetch } from '../hooks/useFetch';
import { getProductById } from '../services/api';
import { isNotFoundError } from '../services/ApiError';
import { NotFoundPage } from './NotFoundPage';

export function ProductPage() {
  const { id = '' } = useParams<'id'>();

  const fetchProduct = useCallback((signal: AbortSignal) => getProductById(id, signal), [id]);
  const { data: product, loading, error, reload } = useFetch(fetchProduct);

  // Produit inexistant : 404 dédiée, distincte d'une panne
  if (isNotFoundError(error)) {
    return <NotFoundPage title="Produit introuvable" />;
  }

  return (
    <section className="product-page">
      <Link to={ROUTES.catalog} className="back-link">
        ← Retour au catalogue
      </Link>

      {loading && <Loader label="Chargement du produit…" />}

      {error && (
        <ErrorMessage
          message="Impossible de charger le produit. Vérifiez votre connexion."
          onRetry={reload}
        />
      )}

      {product && (
        <>
          <PageTitle title={product.title} />
          <ProductDetails product={product} />
        </>
      )}
    </section>
  );
}
