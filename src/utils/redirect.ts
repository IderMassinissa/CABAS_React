// route protégée

/** État transmis à /connexion : la page que le visiteur voulait atteindre. */
export interface RedirectState {
  from: string;
}

/** Chemin interne uniquement : refuse "//domaine" et les URL absolues (redirection ouverte). */
function isInternalPath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//');
}

/** Extrait la page demandée de l'état de navigation, ou null s'il est absent ou invalide. */
export function getRedirectPath(state: unknown): string | null {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof state.from === 'string' &&
    isInternalPath(state.from)
  ) {
    return state.from;
  }
  return null;
}
