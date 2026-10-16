interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="state state--error" role="alert">
      <p>
        <span aria-hidden="true">⚠ </span>
        {message}
      </p>
      {onRetry && (
        <button type="button" className="button" onClick={onRetry}>
          Réessayer
        </button>
      )}
    </div>
  );
}
