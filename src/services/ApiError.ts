// Erreur HTTP : conserve le code de statut pour que l'interface
// distingue un 404 d'une autre erreur serveur.
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/** Vrai si l'erreur est une réponse HTTP portant ce code de statut. */
export function hasApiStatus(error: unknown, status: number): boolean {
  return error instanceof ApiError && error.status === status;
}

/** Vrai si l'erreur est une réponse HTTP 404 (ressource inexistante). */
export function isNotFoundError(error: unknown): boolean {
  return hasApiStatus(error, 404);
}
