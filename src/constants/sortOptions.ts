import type { SortOption } from '../types/sort';

export const SORT_OPTIONS: readonly SortOption[] = [
  { value: 'pertinence', label: 'Pertinence' },
  { value: 'prix', label: 'Prix croissant' },
  { value: 'note', label: 'Note décroissante' },
  { value: 'nom', label: 'Nom de A à Z' },
];
