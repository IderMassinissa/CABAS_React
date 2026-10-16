import { useId, useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { PageTitle } from '../components/PageTitle';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { hasApiStatus } from '../services/ApiError';

const INVALID_CREDENTIALS_MESSAGE = 'Identifiants incorrects.';
const NETWORK_ERROR_MESSAGE = 'Connexion impossible. Vérifiez votre connexion et réessayez.';

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const usernameId = useId();
  const passwordId = useId();
  const errorId = useId();

  // Déjà connecté
  if (user) {
    return <Navigate to={ROUTES.catalog} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await login({ username: username.trim(), password });
      void navigate(ROUTES.catalog, { replace: true });
    } catch (error) {
      setErrorMessage(
        hasApiStatus(error, 400) ? INVALID_CREDENTIALS_MESSAGE : NETWORK_ERROR_MESSAGE,
      );
      setIsSubmitting(false);
    }
  }

  const hasInvalidCredentials = errorMessage === INVALID_CREDENTIALS_MESSAGE;

  return (
    <section className="auth">
      <PageTitle title="Connexion" />
      <h1>Connexion</h1>
      <p className="auth__subtitle">Connectez-vous pour proposer un produit</p>

      {errorMessage && (
        <p id={errorId} className="alert" role="alert">
          {errorMessage}
        </p>
      )}

      <form
        className="form"
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <div className="form__field">
          <label htmlFor={usernameId}>Nom d’utilisateur</label>
          <input
            id={usernameId}
            className="field"
            autoComplete="username"
            required
            value={username}
            aria-invalid={hasInvalidCredentials}
            aria-describedby={hasInvalidCredentials ? errorId : undefined}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form__field">
          <label htmlFor={passwordId}>Mot de passe</label>
          <input
            id={passwordId}
            type="password"
            className="field"
            autoComplete="current-password"
            required
            value={password}
            aria-invalid={hasInvalidCredentials}
            aria-describedby={hasInvalidCredentials ? errorId : undefined}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="button button--block" disabled={isSubmitting}>
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <p className="auth__hint">Compte de test : emilys / emilyspass</p>
    </section>
  );
}
