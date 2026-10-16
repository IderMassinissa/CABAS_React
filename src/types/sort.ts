export type SortKey = 'pertinence' | 'prix' | 'note' | 'nom';

export interface SortOption {
  value: SortKey;
  label: string;
}
