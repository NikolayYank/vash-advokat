import { SITE_URL } from "./constants";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
