import { useId } from 'react';
import { SORT_OPTIONS } from '../constants/sortOptions';
import type { SortKey } from '../types/sort';

interface SortSelectProps {
  value: SortKey;
  onChange: (sortKey: SortKey) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const selectId = useId();

  return (
    <div>
      <label htmlFor={selectId} className="visually-hidden">
        Trier par
      </label>
      <select
        id={selectId}
        className="field"
        value={value}
        onChange={(event) => {
          const option = SORT_OPTIONS.find((item) => item.value === event.target.value);
          if (option) onChange(option.value);
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
