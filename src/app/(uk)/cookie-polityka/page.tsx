import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageContent from "@/components/LegalPageContent";
import { uk } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getLegalWebPageSchema } from "@/lib/schema/legal-page";

export const metadata: Metadata = {
  title: uk.meta.cookieTitle,
  description: uk.meta.cookieDescription,
  alternates: {
    canonical: "/cookie-polityka",
    languages: {
      "uk-UA": "/cookie-polityka",
      "ru-UA": "/ru/cookie-politika",
      "x-default": "/cookie-polityka",
    },
  },
  openGraph: {
    title: uk.legal.cookieTitle,
    description: uk.meta.cookieDescription,
    locale: "uk_UA",
    type: "website",
  },
};

export default function CookiePageUk() {
  const breadcrumbs = [
    { name: uk.legal.breadcrumbRoot, path: "/" },
    { name: uk.legal.cookieTitle, path: "/cookie-polityka/" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const webPageSchema = getLegalWebPageSchema("cookie", {
    title: uk.legal.cookieTitle,
    path: "/cookie-polityka/",
    description: uk.meta.cookieDescription,
    locale: "uk",
    dateModified: uk.legal.lastUpdatedDate,
  });

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} id="cookie-schema" />
      <LegalPageContent
        dict={uk}
        locale="uk"
        switchPath="/ru/cookie-politika"
        breadcrumbs={breadcrumbs}
        breadcrumbLabel={uk.legal.breadcrumbLabel}
        title={uk.legal.cookieTitle}
        lastUpdatedLabel={uk.legal.lastUpdatedLabel}
        lastUpdatedDate={uk.legal.lastUpdatedDate}
      >
        <p>
          Ця Політика cookie пояснює, як сайт <strong>vash-advokat.org</strong> використовує
          cookie-файли та&nbsp;аналогічні технології. Політика доповнює{" "}
          <Link href="/polityka-konfidentsijnosti/">Політику конфіденційності</Link>.
        </p>
        <p>
          На момент публікації цієї редакції Сайт працює в&nbsp;<strong>essentials-only режимі</strong>
          &nbsp;— використовуються лише технічно необхідні cookie. Аналітика (Google Analytics 4)
          і&nbsp;маркетингові cookie будуть підключені пізніше, виключно з&nbsp;вашої згоди через
          cookie-баннер.
        </p>

        <h2>1. Що таке cookie</h2>
        <p>
          Cookie&nbsp;— це&nbsp;невеликі текстові файли, які сайт зберігає у&nbsp;вашому браузері,
          щоб запам&apos;ятати вас між&nbsp;візитами (наприклад, обрану мову інтерфейсу).
        </p>
        <p>
          До&nbsp;cookie&nbsp;за&nbsp;функціями наближені: <em>localStorage</em>, <em>sessionStorage</em>{" "}
          (те&nbsp;саме сховище браузера) та&nbsp;<em>web beacons</em> (піксельні зображення для аналітики).
          У&nbsp;цій Політиці всі вони для&nbsp;зручності називаються «cookie».
        </p>

        <h2>2. Категорії cookie на Сайті</h2>

        <h3>2.1. Технічно необхідні (завжди активні)</h3>
        <p>
          Без&nbsp;цих cookie Сайт не&nbsp;може коректно працювати. Згода не&nbsp;потрібна&nbsp;— вони
          є&nbsp;частиною базової функціональності.
        </p>
        <ul>
          <li>
            <strong>Налаштування мови</strong>&nbsp;— запам&apos;ятовує вибір між&nbsp;українською і&nbsp;російською версією
            (localStorage, до&nbsp;30&nbsp;днів)
          </li>
          <li>
            <strong>Cookie-консент</strong> (у&nbsp;майбутньому, після&nbsp;підключення аналітики)&nbsp;—
            зберігає ваше рішення щодо&nbsp;необов&apos;язкових cookie (localStorage, 12&nbsp;місяців)
          </li>
          <li>
            <strong>CSRF-токени</strong>&nbsp;— захист форми консультації від&nbsp;підробки запитів
            (session-only)
          </li>
        </ul>

        <h3>2.2. Аналітичні (у&nbsp;майбутньому, за&nbsp;вашою згодою)</h3>
        <p>
          На&nbsp;момент цієї редакції&nbsp;<strong>не&nbsp;використовуються</strong>. Після підключення
          Google Analytics&nbsp;4 ми&nbsp;додамо cookie-баннер. Нижче&nbsp;— плановий перелік:
        </p>
        <ul>
          <li>
            <strong>_ga</strong> (Google Analytics)&nbsp;— унікальний ідентифікатор відвідувача, 2&nbsp;роки
          </li>
          <li>
            <strong>_ga_XXXXXXXXXX</strong> (GA4 property)&nbsp;— стан сесії, 2&nbsp;роки
          </li>
          <li>
            <strong>_gid</strong>&nbsp;— ідентифікатор відвідувача для&nbsp;сесії, 24&nbsp;години
          </li>
        </ul>
        <p>
          Ми&nbsp;будемо використовувати <a href="https://support.google.com/analytics/answer/9976101" target="_blank" rel="noopener noreferrer">Google Consent Mode&nbsp;v2</a>{" "}
          — без&nbsp;вашої згоди аналітика залишається в&nbsp;режимі «denied» і&nbsp;персональні дані
          не&nbsp;збираються.
        </p>

        <h3>2.3. Маркетингові / рекламні</h3>
        <p>
          <strong>Не&nbsp;використовуються.</strong> Фундація не&nbsp;веде рекламні кампанії з&nbsp;ретаргетингу,
          не&nbsp;встановлює pixel'і Facebook, TikTok, LinkedIn на&nbsp;цьому Сайті.
        </p>

        <h2>3. Сторонні сервіси і&nbsp;їхні cookie</h2>
        <p>На момент публікації цієї редакції:</p>
        <ul>
          <li>
            <strong>GitHub Pages</strong> (хостинг) — не&nbsp;встановлює власних cookie відвідувачам,
            але&nbsp;може логувати IP-адреси в&nbsp;access-логах. Політика GitHub:{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Privacy Statement
            </a>
          </li>
          <li>
            <strong>Mux</strong> (відео-плеєр для&nbsp;hero-ролика на&nbsp;головній сторінці)&nbsp;—
            завантажується тільки після вашої взаємодії з&nbsp;відео (facade pattern). Може
            встановлювати cookie для&nbsp;адаптивного bitrate. Політика:{" "}
            <a href="https://www.mux.com/privacy" target="_blank" rel="noopener noreferrer">
              Mux Privacy Policy
            </a>
          </li>
        </ul>
        <p>У&nbsp;майбутньому можуть додатися:</p>
        <ul>
          <li>Google Analytics&nbsp;4 (див. §2.2)</li>
          <li>
            Google Fonts&nbsp;— зараз шрифти self-hosted, cookie Google Fonts не&nbsp;встановлюються
          </li>
        </ul>

        <h2>4. Керування cookie</h2>
        <p>Ви&nbsp;можете керувати cookie кількома способами:</p>

        <h3>4.1. Через баннер на&nbsp;Сайті</h3>
        <p>
          Після підключення аналітики з&nbsp;&apos;явиться cookie-баннер із&nbsp;кнопками
          «Прийняти» / «Тільки&nbsp;необхідні» / «Налаштування». Ваш вибір зберігається
          на&nbsp;12&nbsp;місяців. Змінити рішення можна через посилання «Cookie налаштування»
          у&nbsp;футері.
        </p>

        <h3>4.2. Через налаштування браузера</h3>
        <p>
          Всі сучасні браузери дозволяють заблокувати або&nbsp;видалити cookie:
        </p>
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
              href="https://support.mozilla.org/uk/kb/enable-and-disable-cookies-website-preferences"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/ua-ua/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/uk-ua/microsoft-edge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edge
            </a>
          </li>
        </ul>
        <p>
          <strong>Увага:</strong> блокування всіх cookie, зокрема технічно необхідних,
          може&nbsp;порушити роботу Сайту (наприклад, перемикання мови перестане запам&apos;ятовуватися).
        </p>

        <h3>4.3. Google Ads Settings</h3>
        <p>
          Якщо Сайт у&nbsp;майбутньому почне&nbsp;використовувати Google Ads&nbsp;—
          ви&nbsp;зможете керувати рекламним профілем через{" "}
          <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">
            Google My Ad Center
          </a>
          . Наразі цього немає.
        </p>

        <h2>5. Do&nbsp;Not&nbsp;Track (DNT)</h2>
        <p>
          Сайт поважає заголовок HTTP <code>DNT:&nbsp;1</code>. У&nbsp;режимі DNT аналітика
          не&nbsp;вмикається навіть якщо ви&nbsp;натисли «Прийняти» в&nbsp;баннері&nbsp;— DNT
          має&nbsp;пріоритет.
        </p>

        <h2>6. Зміни в&nbsp;цій Політиці</h2>
        <p>
          При підключенні нових сервісів (Google Analytics, Facebook Pixel, інших) ми&nbsp;оновимо
          цю Політику до&nbsp;їх&nbsp;запуску. Дата останнього оновлення зазначена вгорі.
        </p>

        <h2>7. Контакти</h2>
        <p>
          Питання про&nbsp;cookie&nbsp;— на&nbsp;<a href="mailto:info@vash-advokat.org">
            info@vash-advokat.org
          </a>{" "}
          із&nbsp;темою «Cookie».
        </p>
        <p>
          Повна інформація про&nbsp;обробку персональних даних&nbsp;— у&nbsp;<Link href="/polityka-konfidentsijnosti/">Політиці конфіденційності</Link>.
        </p>
      </LegalPageContent>
    </>
  );
}
