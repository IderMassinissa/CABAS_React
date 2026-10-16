interface LoaderProps {
  label?: string;
}

export function Loader({ label = 'Chargement…' }: LoaderProps) {
  return (
    <div className="state" role="status">
      <span className="loader__spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
