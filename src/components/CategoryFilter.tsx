import { useId } from 'react';
import { CATEGORY_OPTIONS } from '../constants/categories';

interface CategoryFilterProps {
  value: string; // slug de l'URL, '' pour toutes les catégories
  onChange: (slug: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const selectId = useId();

  return (
    <div>
      <label htmlFor={selectId} className="visually-hidden">
        Catégorie
      </label>
      <select
        id={selectId}
        className="field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {CATEGORY_OPTIONS.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
