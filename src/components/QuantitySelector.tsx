interface QuantitySelectorProps {
  value: number;
  max: number;
  label: string; // le nom du produit, pour des boutons explicites au lecteur d'écran
  onChange: (quantity: number) => void;
}

const MIN_QUANTITY = 1;

export function QuantitySelector({ value, max, label, onChange }: QuantitySelectorProps) {
  return (
    <div className="quantity-selector" role="group" aria-label={`Quantité de ${label}`}>
      <button
        type="button"
        className="quantity-selector__button"
        aria-label={`Diminuer la quantité de ${label}`}
        disabled={value <= MIN_QUANTITY}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <output className="quantity-selector__value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="quantity-selector__button"
        aria-label={`Augmenter la quantité de ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
