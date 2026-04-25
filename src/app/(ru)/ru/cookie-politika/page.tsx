import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageContent from "@/components/LegalPageContent";
import { ru } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getLegalWebPageSchema } from "@/lib/schema/legal-page";

export const metadata: Metadata = {
  title: ru.meta.cookieTitle,
  description: ru.meta.cookieDescription,
  alternates: {
    canonical: "/ru/cookie-politika",
    languages: {
      "uk-UA": "/cookie-polityka",
      "ru-UA": "/ru/cookie-politika",
      "x-default": "/cookie-polityka",
    },
  },
  openGraph: {
    title: ru.legal.cookieTitle,
    description: ru.meta.cookieDescription,
    locale: "ru_UA",
    type: "website",
  },
};

export default function CookiePageRu() {
  const breadcrumbs = [
    { name: ru.legal.breadcrumbRoot, path: "/ru/" },
    { name: ru.legal.cookieTitle, path: "/ru/cookie-politika/" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const webPageSchema = getLegalWebPageSchema("cookie", {
    title: ru.legal.cookieTitle,
    path: "/ru/cookie-politika/",
    description: ru.meta.cookieDescription,
    locale: "ru",
    dateModified: ru.legal.lastUpdatedDate,
  });

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} id="cookie-schema" />
      <LegalPageContent
        dict={ru}
        locale="ru"
        switchPath="/cookie-polityka"
        breadcrumbs={breadcrumbs}
        breadcrumbLabel={ru.legal.breadcrumbLabel}
        title={ru.legal.cookieTitle}
        lastUpdatedLabel={ru.legal.lastUpdatedLabel}
        lastUpdatedDate={ru.legal.lastUpdatedDate}
      >
        <p>
          Настоящая Политика cookie объясняет, как сайт <strong>vash-advokat.org</strong>{" "}
          использует cookie-файлы и&nbsp;аналогичные технологии. Политика дополняет{" "}
          <Link href="/ru/politika-konfidencialnosti/">Политику конфиденциальности</Link>.
        </p>
        <p>
          На&nbsp;момент публикации этой редакции Сайт работает в&nbsp;<strong>essentials-only режиме</strong>
          &nbsp;— используются только технически необходимые cookie. Аналитика (Google Analytics&nbsp;4)
          и&nbsp;маркетинговые cookie будут подключены позже, исключительно с&nbsp;вашего согласия через
          cookie-баннер.
        </p>

        <h2>1. Что такое cookie</h2>
        <p>
          Cookie&nbsp;— это&nbsp;небольшие текстовые файлы, которые сайт сохраняет в&nbsp;вашем
          браузере, чтобы запомнить вас между визитами (например, выбранный язык интерфейса).
        </p>
        <p>
          К&nbsp;cookie по&nbsp;функциям близки: <em>localStorage</em>, <em>sessionStorage</em>{" "}
          (то&nbsp;же хранилище браузера) и&nbsp;<em>web beacons</em> (пиксельные изображения для
          аналитики). В&nbsp;этой Политике все они для&nbsp;удобства называются «cookie».
        </p>

        <h2>2. Категории cookie на&nbsp;Сайте</h2>

        <h3>2.1. Технически необходимые (всегда активны)</h3>
        <p>
          Без&nbsp;этих cookie Сайт не&nbsp;может корректно работать. Согласие не&nbsp;требуется&nbsp;—
          они являются частью базового функционала.
        </p>
        <ul>
          <li>
            <strong>Настройка языка</strong>&nbsp;— запоминает выбор между украинской и&nbsp;русской
            версией (localStorage, до&nbsp;30&nbsp;дней)
          </li>
          <li>
            <strong>Cookie-согласие</strong> (в&nbsp;будущем, после подключения аналитики)&nbsp;—
            сохраняет ваше решение по&nbsp;необязательным cookie (localStorage, 12&nbsp;месяцев)
          </li>
          <li>
            <strong>CSRF-токены</strong>&nbsp;— защита формы консультации от&nbsp;подделки запросов
            (session-only)
          </li>
        </ul>

        <h3>2.2. Аналитические (в&nbsp;будущем, с&nbsp;вашего согласия)</h3>
        <p>
          На&nbsp;момент этой редакции&nbsp;<strong>не&nbsp;используются</strong>. После подключения
          Google Analytics&nbsp;4 мы&nbsp;добавим cookie-баннер. Ниже&nbsp;— плановый перечень:
        </p>
        <ul>
          <li>
            <strong>_ga</strong> (Google Analytics)&nbsp;— уникальный идентификатор посетителя, 2&nbsp;года
          </li>
          <li>
            <strong>_ga_XXXXXXXXXX</strong> (GA4 property)&nbsp;— состояние сессии, 2&nbsp;года
          </li>
          <li>
            <strong>_gid</strong>&nbsp;— идентификатор посетителя для&nbsp;сессии, 24&nbsp;часа
          </li>
        </ul>
        <p>
          Мы&nbsp;будем использовать{" "}
          <a
            href="https://support.google.com/analytics/answer/9976101"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Consent Mode&nbsp;v2
          </a>
          &nbsp;— без&nbsp;вашего согласия аналитика остаётся в&nbsp;режиме «denied» и&nbsp;персональные
          данные не&nbsp;собираются.
        </p>

        <h3>2.3. Маркетинговые / рекламные</h3>
        <p>
          <strong>Не&nbsp;используются.</strong> Фундация не&nbsp;ведёт рекламные кампании
          по&nbsp;ретаргетингу, не&nbsp;устанавливает pixel'и Facebook, TikTok, LinkedIn на&nbsp;этом
          Сайте.
        </p>

        <h2>3. Сторонние сервисы и&nbsp;их&nbsp;cookie</h2>
        <p>На&nbsp;момент публикации этой редакции:</p>
        <ul>
          <li>
            <strong>GitHub Pages</strong> (хостинг)&nbsp;— не&nbsp;устанавливает собственных cookie
            посетителям, но&nbsp;может логировать IP-адреса в&nbsp;access-логах. Политика GitHub:{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Privacy Statement
            </a>
          </li>
          <li>
            <strong>Mux</strong> (видео-плеер для&nbsp;hero-ролика на&nbsp;главной странице)&nbsp;—
            загружается только после вашего взаимодействия с&nbsp;видео (facade pattern). Может
            устанавливать cookie для&nbsp;адаптивного bitrate. Политика:{" "}
            <a href="https://www.mux.com/privacy" target="_blank" rel="noopener noreferrer">
              Mux Privacy Policy
            </a>
          </li>
        </ul>
        <p>В&nbsp;будущем могут добавиться:</p>
        <ul>
          <li>Google Analytics&nbsp;4 (см. §2.2)</li>
          <li>
            Google Fonts&nbsp;— сейчас шрифты self-hosted, cookie Google Fonts не&nbsp;устанавливаются
          </li>
        </ul>

        <h2>4. Управление cookie</h2>
        <p>Вы&nbsp;можете управлять cookie несколькими способами:</p>

        <h3>4.1. Через баннер на&nbsp;Сайте</h3>
        <p>
          После подключения аналитики появится cookie-баннер с&nbsp;кнопками «Принять» /
          «Только&nbsp;необходимые» / «Настройки». Ваш выбор сохраняется на&nbsp;12&nbsp;месяцев.
          Изменить решение можно через ссылку «Настройки cookie» в&nbsp;подвале.
        </p>

        <h3>4.2. Через настройки браузера</h3>
        <p>Все современные браузеры позволяют заблокировать или&nbsp;удалить cookie:</p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/ru/kb/enable-and-disable-cookies-website-preferences"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/ru-ru/microsoft-edge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edge
            </a>
          </li>
        </ul>
        <p>
          <strong>Внимание:</strong> блокировка всех cookie, включая технически необходимые,
          может&nbsp;нарушить работу Сайта (например, переключение языка перестанет запоминаться).
        </p>

        <h3>4.3. Google Ads Settings</h3>
        <p>
          Если Сайт в&nbsp;будущем начнёт&nbsp;использовать Google Ads&nbsp;— вы&nbsp;сможете управлять
          рекламным профилем через{" "}
          <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">
            Google My Ad Center
          </a>
          . Сейчас этого нет.
        </p>

        <h2>5. Do&nbsp;Not&nbsp;Track (DNT)</h2>
        <p>
          Сайт уважает HTTP-заголовок <code>DNT:&nbsp;1</code>. В&nbsp;режиме DNT аналитика
          не&nbsp;включается, даже если вы&nbsp;нажали «Принять» в&nbsp;баннере&nbsp;— DNT имеет
          приоритет.
        </p>

        <h2>6. Изменения в&nbsp;этой Политике</h2>
        <p>
          При&nbsp;подключении новых сервисов (Google Analytics, Facebook Pixel, других)
          мы&nbsp;обновим эту Политику до&nbsp;их&nbsp;запуска. Дата последнего обновления указана
          вверху.
        </p>

        <h2>7. Контакты</h2>
        <p>
          Вопросы о&nbsp;cookie&nbsp;— на{" "}
          <a href="mailto:info@vash-advokat.org">info@vash-advokat.org</a> с&nbsp;темой
          «Cookie».
        </p>
        <p>
          Полная информация об&nbsp;обработке персональных данных&nbsp;— в{" "}
          <Link href="/ru/politika-konfidencialnosti/">Политике конфиденциальности</Link>.
        </p>
      </LegalPageContent>
    </>
  );
}
