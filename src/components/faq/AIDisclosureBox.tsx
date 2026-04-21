import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { InfoIcon } from "./Icon";

interface Props {
  locale: Locale;
}

const labels = {
  uk: {
    title: "AI Disclosure. ",
    body:
      "Відповіді згенеровані з допомогою AI і перевірені адвокатом Сергієм Веприцьким (свідоцтво №1114). Не замінює індивідуальну консультацію.",
    aboutHref: "/pro-nas/",
    aboutLabel: "Що таке AI Disclosure?",
  },
  ru: {
    title: "AI Disclosure. ",
    body:
      "Ответы сгенерированы с помощью AI и проверены адвокатом Сергеем Веприцким (свидетельство №1114). Не заменяет индивидуальную консультацию.",
    aboutHref: "/ru/o-nas/",
    aboutLabel: "Что такое AI Disclosure?",
  },
} as const;

export default function AIDisclosureBox({ locale }: Props) {
  const l = labels[locale];

  return (
    <aside className="ai-disclosure">
      <div className="ai-disclosure-icon">
        <InfoIcon width={24} height={24} />
      </div>
      <div className="ai-disclosure-text">
        <span className="ai-disclosure-title">{l.title}</span>
        {l.body}{" "}
        <Link href={l.aboutHref} className="ai-disclosure-link">
          {l.aboutLabel}
        </Link>
      </div>
    </aside>
  );
}
