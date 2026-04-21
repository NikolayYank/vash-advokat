import Link from "next/link";
import type { FaqCluster } from "@/lib/faq";
import {
  clusterTitle,
  clusterDescription,
  faqClusterPath,
} from "@/lib/faq";
import type { Locale } from "@/lib/i18n";
import { ArrowRightIcon } from "./Icon";

interface Props {
  cluster: FaqCluster;
  locale: Locale;
}

const labels = {
  uk: { questions: "питань" },
  ru: { questions: "вопросов" },
} as const;

export default function CategoryCard({ cluster, locale }: Props) {
  const title = clusterTitle(cluster, locale);
  const description = clusterDescription(cluster, locale);
  const href = faqClusterPath(cluster, locale);

  return (
    <Link href={href} className="cat-card">
      <div className="cat-card-arrow">
        <ArrowRightIcon width={20} height={20} />
      </div>
      <h3 className="cat-card-title">{title}</h3>
      <p className="cat-card-desc">{description}</p>
      <div className="cat-card-meta">
        {cluster.question_count} {labels[locale].questions}
      </div>
    </Link>
  );
}
