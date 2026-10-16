import { useId } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputId = useId();

  return (
    <form role="search" className="search-bar" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={inputId} className="visually-hidden">
        Rechercher un produit
      </label>
      <input
        id={inputId}
        type="search"
        className="field"
        placeholder="Rechercher un produit…"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  );
}
