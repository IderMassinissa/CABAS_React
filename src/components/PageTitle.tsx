interface PageTitleProps {
  title: string;
}

/** Titre de l'onglet ; React 19 le remonte dans le <head>. */
export function PageTitle({ title }: PageTitleProps) {
  return <title>{`${title} · CABAS`}</title>;
}