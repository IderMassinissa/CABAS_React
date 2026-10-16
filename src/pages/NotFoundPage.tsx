import { Link } from 'react-router';
import { PageTitle } from '../components/PageTitle';
import { ROUTES } from '../constants/routes';

interface NotFoundPageProps {
  title?: string;
}

/** Page 404 */
export function NotFoundPage({ title = 'Cette page n’existe pas' }: NotFoundPageProps) {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <PageTitle title={title} />
      <p className="not-found__code" aria-hidden="true">
        404
      </p>
      <h1 id="not-found-title">{title}</h1>
      <Link to={ROUTES.catalog} className="button">
        Retour au catalogue
      </Link>
    </section>
  );
}
