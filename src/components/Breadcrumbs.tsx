import Link from "next/link";

export interface BreadcrumbUiItem {
  name: string;
  path: string;
}

interface Props {
  items: BreadcrumbUiItem[];
  ariaLabel: string;
  className?: string;
}

export default function Breadcrumbs({ items, ariaLabel, className }: Props) {
  if (items.length < 2) return null;

  return (
    <nav aria-label={ariaLabel} className={`breadcrumbs${className ? ` ${className}` : ""}`}>
      <ol className="breadcrumbs-list">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.path} className="breadcrumbs-item">
              {isLast ? (
                <span aria-current="page" className="breadcrumbs-current">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="breadcrumbs-link">
                    {item.name}
                  </Link>
                  <span className="breadcrumbs-separator" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
