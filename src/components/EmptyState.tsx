import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  children?: ReactNode;
}

export function EmptyState({ message, children }: EmptyStateProps) {
  return (
    <div className="state" role="status">
      <p>{message}</p>
      {children}
    </div>
  );
}
