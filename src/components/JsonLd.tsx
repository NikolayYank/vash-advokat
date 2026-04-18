import { escapeJson } from "@/lib/schema/constants";

interface JsonLdProps {
  data: unknown | unknown[];
  id?: string;
}

// Server component — рендерит <script type="application/ld+json"> с безопасной сериализацией.
// Используется в layout.tsx и page.tsx. Не ставить "use client".
export default function JsonLd({ data, id }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, idx) => (
        <script
          key={id ? `${id}-${idx}` : idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJson(entry) }}
        />
      ))}
    </>
  );
}
