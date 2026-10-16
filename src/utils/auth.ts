// l'authentification
import type { AuthSession, AuthUser } from '../types/auth';

/** Ne conserve que les champs utiles de l'api*/
export function toAuthUser({ id, username, firstName, image }: AuthUser): AuthUser {
  return { id, username, firstName, image };
}

function isAuthUser(value: unknown): value is AuthUser {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'username' in value &&
    typeof value.username === 'string' &&
    'firstName' in value &&
    typeof value.firstName === 'string' &&
    'image' in value &&
    typeof value.image === 'string'
  );
}

export function isAuthSession(value: unknown): value is AuthSession {
  return (
    typeof value === 'object' &&
    value !== null &&
    'token' in value &&
    typeof value.token === 'string' &&
    'user' in value &&
    isAuthUser(value.user)
  );
}
