import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { uk } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getContactLegalServiceSchema } from "@/lib/schema/contact-page";

export const metadata: Metadata = {
  title: "Контакти — адвокат у Харкові, Києві, Софії",
  description:
    "Зв'язатися з Фундацією адвокатів України: телефон, email, адреса офісу в Харкові, години роботи, форма запису на безкоштовну консультацію.",
  alternates: {
    canonical: "/kontakty",
    languages: {
      "uk-UA": "/kontakty",
      "ru-UA": "/ru/kontakty",
      "x-default": "/kontakty",
    },
  },
  openGraph: {
    title: "Контакти — Фундація адвокатів України",
    description:
      "Телефон, email, адреса офісу в Харкові. Безкоштовна перша консультація, до 30 хвилин.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function KontaktyPage() {
  const breadcrumbs = [
    { name: "Головна", path: "/" },
    { name: "Контакти", path: "/kontakty/" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const contactSchema = getContactLegalServiceSchema("uk");

  return (
    <>
      <JsonLd data={[contactSchema, breadcrumbSchema]} id="kontakty-schema" />
      <main className="container" style={{ padding: "var(--space-2xl) 0 var(--space-3xl)" }}>
        <Breadcrumbs items={breadcrumbs} ariaLabel="Хлібні крихти" />

        <h1 style={{ marginTop: "var(--space-md)" }}>Зв&apos;язатися з&nbsp;нами</h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
            maxWidth: "65ch",
            marginBottom: "var(--space-2xl)",
          }}
        >
          Перша консультація — 0&nbsp;₴, до&nbsp;30&nbsp;хвилин. Зателефонуйте або
          залиште заявку — адвокат зв&apos;яжеться протягом робочого дня. У&nbsp;екстрених
          справах (обшук, затримання) — телефонуйте цілодобово.
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
            <h2 id="contact-nap">Як зв&apos;язатися</h2>
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
                  <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Телефон</div>
                  <a href="tel:+380505940785" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-primary)" }}>
                    +380 50 594 07 85
                  </a>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Mail size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Email</div>
                  <a href="mailto:promo.vashadvokat@gmail.com" style={{ fontSize: "1.0625rem", color: "var(--color-primary)" }}>
                    promo.vashadvokat@gmail.com
                  </a>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <MapPin size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Офіс</div>
                  <address style={{ fontStyle: "normal", fontSize: "1.0625rem" }}>
                    м.&nbsp;Харків, вул.&nbsp;Римарська,&nbsp;19
                    <br />
                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
                      Також офіси в&nbsp;Києві та&nbsp;Софії (за&nbsp;попереднім записом)
                    </span>
                  </address>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Clock size={20} style={{ color: "var(--color-accent-warm)", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Години роботи</div>
                  <div style={{ fontSize: "1.0625rem" }}>
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
                  <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Екстрена допомога</div>
                  <div style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                    Обшук, затримання, ДТП&nbsp;—{" "}
                    <strong>цілодобово</strong>, включно з&nbsp;вихідними. Той самий номер телефону.
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <section aria-labelledby="consult-faq">
            <h2 id="consult-faq">Часті питання про консультацію</h2>

            <h3 style={{ marginTop: "var(--space-lg)" }}>Скільки коштує перша консультація?</h3>
            <p>
              Безкоштовно, до&nbsp;30&nbsp;хвилин. Цього зазвичай достатньо, щоб розібратися з&nbsp;ситуацією
              і&nbsp;визначити, чи&nbsp;потрібна робота адвоката. Якщо потрібна&nbsp;— обговоримо вартість
              прозоро, без&nbsp;«сюрпризів».
            </p>

            <h3>Чи гарантується конфіденційність?</h3>
            <p>
              Так. Адвокатська таємниця&nbsp;— стаття&nbsp;22 Закону України «Про&nbsp;адвокатуру та&nbsp;адвокатську
              діяльність». Усе, що&nbsp;ви&nbsp;розказуєте на&nbsp;консультації, захищено законом, навіть якщо
              ви&nbsp;не&nbsp;стаєте нашим клієнтом.
            </p>

            <h3>Чи можна отримати консультацію онлайн?</h3>
            <p>
              Так. За&nbsp;попереднім записом&nbsp;— Zoom, Telegram, WhatsApp, Viber. Для онлайн-консультації
              достатньо залишити заявку через форму нижче або зателефонувати.
            </p>

            <h3>Що&nbsp;робити, якщо справа термінова?</h3>
            <p>
              Телефонуйте одразу на&nbsp;+380&nbsp;50&nbsp;594&nbsp;07&nbsp;85. Для екстрених випадків
              (обшук, затримання, ДТП) адвокат приймає дзвінки цілодобово. Поки чекаєте на&nbsp;відповідь&nbsp;—
              нічого не&nbsp;підписуйте, не&nbsp;відповідайте на&nbsp;питання слідчого без&nbsp;адвоката.
            </p>

            <p style={{ marginTop: "var(--space-xl)" }}>
              <Link
                href="/pro-nas/"
                style={{
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                Про адвоката Сергія Веприцького&nbsp;&rarr;
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
              Записатися на&nbsp;консультацію
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-lg)" }}>
              Залиште ім&apos;я і&nbsp;телефон&nbsp;— адвокат зателефонує протягом робочого дня.
            </p>
            <ContactForm dict={uk.ctaFinal} />
          </section>
        </div>
      </main>
    </>
  );
}
