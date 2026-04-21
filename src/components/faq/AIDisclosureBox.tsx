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
  },
  ru: {
    title: "AI Disclosure. ",
    body:
      "Ответы сгенерированы с помощью AI и проверены адвокатом Сергеем Веприцким (свидетельство №1114). Не заменяет индивидуальную консультацию.",
  },
} as const;

export default function AIDisclosureBox({ locale }: Props) {
  const l = labels[locale];

  return (
    <aside className="ai-disclosure">
      <div className="ai-disclosure-icon">
        <InfoIcon width={16} height={16} />
      </div>
      <div className="ai-disclosure-text">
        <span className="ai-disclosure-title">{l.title}</span>
        {l.body}
      </div>
    </aside>
  );
}
