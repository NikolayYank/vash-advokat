import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ru } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getContactLegalServiceSchema } from "@/lib/schema/contact-page";

export const metadata: Metadata = {
  title: "Контакты — адвокат в Харькове, Киеве, Софии",
  description:
    "Связаться с Фундацией адвокатов Украины: телефон, email, адрес офиса в Харькове, часы работы, форма записи на бесплатную консультацию.",
  alternates: {
    canonical: "/ru/kontakty",
    languages: {
      "uk-UA": "/kontakty",
      "ru-UA": "/ru/kontakty",
      "x-default": "/kontakty",
    },
  },
  openGraph: {
    title: "Контакты — Фундация адвокатов Украины",
    description:
      "Телефон, email, адрес офиса в Харькове. Бесплатная первая консультация, до 30 минут.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function KontaktyPageRu() {
  const breadcrumbs = [
    { name: "Главная", path: "/ru/" },
    { name: "Контакты", path: "/ru/kontakty/" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const contactSchema = getContactLegalServiceSchema("ru");

  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema]} id="kontakty-schema" />
      <SiteHeader dict={ru} locale="ru" switchPath="/kontakty" />
      <main className="container" style={{ padding: "var(--space-2xl) 0 var(--space-3xl)" }}>
        <Breadcrumbs items={breadcrumbs} ariaLabel="Хлебные крошки" />

        <h1 style={{ marginTop: "var(--space-md)" }}>Связаться с&nbsp;нами</h1>
        <p
          className="lead"
          style={{
            color: "var(--color-text-muted)",
            maxWidth: "65ch",
            marginBottom: "var(--space-2xl)",
          }}
        >
          Первая консультация — 0&nbsp;₴, до&nbsp;30&nbsp;минут. Позвоните или
          оставьте заявку — адвокат свяжется в&nbsp;течение рабочего дня. По&nbsp;экстренным
          делам (обыск, задержание) — звоните круглосуточно.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-2xl)",
          }}
          className="kontakty-grid"
        >
          <section aria-labelledby="contact-nap">
            <h2 id="contact-nap">Как связаться</h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "var(--space-md) 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
              }}
            >
              <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Phone size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div className="micro-label micro-label--muted">Телефон</div>
                  <a href="tel:+380505940785" className="contact-value" style={{ fontWeight: 700, color: "var(--color-primary)" }}>
                    +380 50 594 07 85
                  </a>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Mail size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div className="micro-label micro-label--muted">Email</div>
                  <a href="mailto:info@vash-advokat.org" className="contact-value" style={{ color: "var(--color-primary)" }}>
                    info@vash-advokat.org
                  </a>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <MapPin size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div className="micro-label micro-label--muted">Офис</div>
                  <address className="contact-value" style={{ fontStyle: "normal" }}>
                    г.&nbsp;Харьков, ул.&nbsp;Римарская,&nbsp;19
                    <br />
                    <span className="body-sm" style={{ color: "var(--color-text-muted)" }}>
                      Также офисы в&nbsp;Киеве и&nbsp;Софии (по&nbsp;предварительной записи)
                    </span>
                  </address>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Clock size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div className="micro-label micro-label--muted">Часы работы</div>
                  <div className="contact-value">
                    Пн–Пт: 9:00–18:00
                  </div>
                </div>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  background: "rgba(180, 83, 9, 0.08)",
                  border: "1px solid rgba(180, 83, 9, 0.3)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-md)",
                }}
              >
                <AlertCircle size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div className="micro-label micro-label--muted">Экстренная помощь</div>
                  <div className="contact-value" style={{ fontWeight: 500 }}>
                    Обыск, задержание, ДТП&nbsp;—{" "}
                    <strong>круглосуточно</strong>, включая выходные. Тот же номер телефона.
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <section aria-labelledby="consult-faq">
            <h2 id="consult-faq">Частые вопросы о консультации</h2>

            <h3 style={{ marginTop: "var(--space-lg)" }}>Сколько стоит первая консультация?</h3>
            <p>
              Бесплатно, до&nbsp;30&nbsp;минут. Этого обычно достаточно, чтобы разобраться с&nbsp;ситуацией
              и&nbsp;определить, нужна&nbsp;ли работа адвоката. Если нужна&nbsp;— обсудим стоимость
              прозрачно, без&nbsp;«сюрпризов».
            </p>

            <h3>Гарантируется ли конфиденциальность?</h3>
            <p>
              Да. Адвокатская тайна&nbsp;— статья&nbsp;22 Закона Украины «Об&nbsp;адвокатуре и&nbsp;адвокатской
              деятельности». Всё, что&nbsp;вы&nbsp;рассказываете на&nbsp;консультации, защищено законом, даже если
              вы&nbsp;не&nbsp;становитесь нашим клиентом.
            </p>

            <h3>Можно&nbsp;ли получить консультацию онлайн?</h3>
            <p>
              Да. По&nbsp;предварительной записи&nbsp;— Zoom, Telegram, WhatsApp, Viber. Для онлайн-консультации
              достаточно оставить заявку через форму ниже или позвонить.
            </p>

            <h3>Что&nbsp;делать, если дело срочное?</h3>
            <p>
              Звоните сразу на&nbsp;+380&nbsp;50&nbsp;594&nbsp;07&nbsp;85. Для экстренных случаев
              (обыск, задержание, ДТП) адвокат принимает звонки круглосуточно. Пока ждёте ответа&nbsp;—
              ничего не&nbsp;подписывайте, не&nbsp;отвечайте на&nbsp;вопросы следователя без&nbsp;адвоката.
            </p>

            <p style={{ marginTop: "var(--space-xl)" }}>
              <Link
                href="/ru/o-nas/"
                style={{
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                Об адвокате Сергее Веприцком&nbsp;&rarr;
              </Link>
            </p>
          </section>

          <section
            aria-labelledby="contact-form-heading"
            style={{
              background: "var(--color-muted-bg)",
              padding: "var(--space-2xl)",
              borderRadius: "var(--radius-xl)",
              marginTop: "var(--space-md)",
            }}
          >
            <h2 id="contact-form-heading" style={{ marginTop: 0 }}>
              Записаться на&nbsp;консультацию
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-lg)" }}>
              Оставьте имя и&nbsp;телефон&nbsp;— адвокат перезвонит в&nbsp;течение рабочего дня.
            </p>
            <ContactForm dict={ru.ctaFinal} />
          </section>
        </div>
      </main>
      <SiteFooter dict={ru} locale="ru" />
    </>
  );
}
