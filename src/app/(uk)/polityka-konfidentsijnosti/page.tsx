import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageContent from "@/components/LegalPageContent";
import { uk } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getLegalWebPageSchema } from "@/lib/schema/legal-page";

export const metadata: Metadata = {
  title: uk.meta.privacyTitle,
  description: uk.meta.privacyDescription,
  alternates: {
    canonical: "/polityka-konfidentsijnosti",
    languages: {
      "uk-UA": "/polityka-konfidentsijnosti",
      "ru-UA": "/ru/politika-konfidencialnosti",
      "x-default": "/polityka-konfidentsijnosti",
    },
  },
  openGraph: {
    title: uk.legal.privacyTitle,
    description: uk.meta.privacyDescription,
    locale: "uk_UA",
    type: "website",
  },
};

export default function PrivacyPageUk() {
  const breadcrumbs = [
    { name: uk.legal.breadcrumbRoot, path: "/" },
    { name: uk.legal.privacyTitle, path: "/polityka-konfidentsijnosti/" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const webPageSchema = getLegalWebPageSchema("privacy", {
    title: uk.legal.privacyTitle,
    path: "/polityka-konfidentsijnosti/",
    description: uk.meta.privacyDescription,
    locale: "uk",
    dateModified: uk.legal.lastUpdatedDate,
  });

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} id="privacy-schema" />
      <LegalPageContent
        dict={uk}
        locale="uk"
        switchPath="/ru/politika-konfidencialnosti"
        breadcrumbs={breadcrumbs}
        breadcrumbLabel={uk.legal.breadcrumbLabel}
        title={uk.legal.privacyTitle}
        lastUpdatedLabel={uk.legal.lastUpdatedLabel}
        lastUpdatedDate={uk.legal.lastUpdatedDate}
      >
        <p>
          Адвокатське об&apos;єднання «Фундація адвокатів України» (далі — «ми», «Фундація»)
          поважає вашу приватність і&nbsp;обробляє персональні дані відповідно до Закону України
          «Про захист персональних даних» №2297-VI від 01.06.2010 і&nbsp;стандартів GDPR у частині,
          що&nbsp;застосовна до відвідувачів сайту <strong>vash-advokat.org</strong>.
        </p>
        <p>
          Ця політика пояснює, які дані ми збираємо, для чого, як довго зберігаємо та&nbsp;як ви
          можете скористатися своїми правами.
        </p>

        <h2>1. Володілець персональних даних</h2>
        <address>
          <strong>Адвокатське об&apos;єднання «Фундація адвокатів України»</strong>
          <br />
          Наказ Міністерства юстиції України №1076/5 від 19.05.2010
          <br />
          м.&nbsp;Харків, вул.&nbsp;Римарська, 19
          <br />
          Email: <a href="mailto:promo.vashadvokat@gmail.com">promo.vashadvokat@gmail.com</a>
          <br />
          Телефон: <a href="tel:+380505940785">+380 50 594 07 85</a>
        </address>

        <h2>2. Які дані ми збираємо</h2>
        <h3>2.1. Дані, які ви надаєте самостійно</h3>
        <ul>
          <li>
            <strong>Через форму консультації</strong> — ім&apos;я, номер телефону, опис ситуації
            (якщо заповнюєте поле «повідомлення»). Email — за вашим бажанням.
          </li>
          <li>
            <strong>Через пряме звернення</strong> (email, телефон, месенджери) — дані, які ви
            самостійно надаєте в повідомленні.
          </li>
          <li>
            <strong>При укладенні договору на правову допомогу</strong> — повний набір даних,
            передбачених законодавством про адвокатську діяльність. Обробка таких даних регулюється
            окремим договором і Законом України «Про адвокатуру та адвокатську діяльність».
          </li>
        </ul>

        <h3>2.2. Дані, які збираються автоматично</h3>
        <ul>
          <li>
            <strong>Технічні дані</strong> — IP-адреса, тип браузера, операційна система, мова,
            referer, URL сторінок, які ви переглядали. Збираються сервером статичного хостингу
            (GitHub Pages) в&nbsp;стандартних access-логах.
          </li>
          <li>
            <strong>Cookie та аналогічні технології</strong> — детально описані в{" "}
            <Link href="/cookie-polityka/">Політиці cookie</Link>.
          </li>
          <li>
            <strong>Аналітика</strong> — у майбутньому сайт може використовувати Google Analytics
            (GA4) за умови вашої згоди. До підключення та отримання згоди жодних аналітичних
            трекерів не&nbsp;встановлюється.
          </li>
        </ul>

        <h2>3. Для чого ми використовуємо дані</h2>
        <ol>
          <li>
            <strong>Надання юридичної консультації</strong> на&nbsp;вашу вимогу (відповідь на звернення,
            підготовка правової позиції, укладення договору).
          </li>
          <li>
            <strong>Зв&apos;язок з&nbsp;вами</strong> щодо вашого запиту (дзвінок, повідомлення,
            уточнюючі питання).
          </li>
          <li>
            <strong>Виконання законодавчих вимог</strong> (документообіг адвоката, реєстр договорів,
            звітність).
          </li>
          <li>
            <strong>Покращення роботи сайту</strong> (аналіз технічних логів, швидкість, помилки).
          </li>
          <li>
            <strong>Безпека</strong> (виявлення зловживань, DDoS, спам-атак).
          </li>
        </ol>
        <p>
          Ми <strong>не</strong> використовуємо ваші дані для автоматичного профілювання,
          рекламного таргетингу чи продажу третім особам.
        </p>

        <h2>4. Правова підстава обробки</h2>
        <ul>
          <li>
            <strong>Ваша згода</strong> (коли ви залишаєте заявку через форму або підписуєтеся
            на&nbsp;розсилку — у майбутньому).
          </li>
          <li>
            <strong>Виконання договору</strong> або переддоговірні заходи (коли ви стаєте клієнтом).
          </li>
          <li>
            <strong>Законний інтерес</strong> (технічна безпека сайту, журнал доступу).
          </li>
          <li>
            <strong>Законодавча вимога</strong> (адвокатський документообіг, податкова звітність).
          </li>
        </ul>

        <h2>5. Кому ми передаємо дані</h2>
        <p>
          Ми <strong>не продаємо</strong> ваші дані і не передаємо третім особам з маркетинговою
          метою. Передача можлива лише:
        </p>
        <ul>
          <li>
            <strong>Адвокатам/юристам Фундації</strong>, які працюють з вашим запитом (адвокатська
            таємниця, стаття&nbsp;22 Закону України «Про адвокатуру та адвокатську діяльність»).
          </li>
          <li>
            <strong>Сервіс-провайдерам</strong>: GitHub Pages (хостинг), email-сервіс (Gmail).
            Ці&nbsp;провайдери мають власні політики конфіденційності.
          </li>
          <li>
            <strong>Державним органам</strong> за&nbsp;прямою вимогою закону (суди, прокуратура,
            поліція&nbsp;— виключно у межах передбачених КПК/ЦПК/КАС).
          </li>
          <li>
            <strong>Банк/платіжна система</strong>&nbsp;— при оплаті правничих послуг, у межах
            реквізитів платежу.
          </li>
        </ul>

        <h2>6. Міжнародна передача</h2>
        <p>
          Окремі сервіс-провайдери (GitHub, Google) можуть обробляти дані на серверах поза межами
          України. Передача здійснюється відповідно до стандартних договірних умов цих провайдерів.
          Якщо ви хочете, щоб ваші дані оброблялися виключно в межах України&nbsp;— зверніться до нас
          альтернативним каналом (телефон, особиста зустріч).
        </p>

        <h2>7. Строки зберігання</h2>
        <ul>
          <li>
            <strong>Заявки через форму</strong> (без укладення договору) — до 12&nbsp;місяців з моменту
            останнього контакту, потім видаляються.
          </li>
          <li>
            <strong>Дані клієнтів</strong> (з&nbsp;укладеним договором) — протягом строку, передбаченого
            законодавством про адвокатську діяльність (зазвичай 5&nbsp;років після завершення справи
            або&nbsp;більше, якщо цього вимагає закон).
          </li>
          <li>
            <strong>Технічні логи сервера</strong> — до 30&nbsp;днів.
          </li>
          <li>
            <strong>Cookie</strong> — за&nbsp;тривалостями, зазначеними в{" "}
            <Link href="/cookie-polityka/">Політиці cookie</Link>.
          </li>
        </ul>

        <h2>8. Ваші права</h2>
        <p>
          Відповідно до Закону України «Про захист персональних даних» і&nbsp;стандартів GDPR ви&nbsp;маєте право:
        </p>
        <ul>
          <li>Отримати підтвердження обробки і&nbsp;доступ до своїх даних</li>
          <li>Виправити неточні або неповні дані</li>
          <li>Вимагати видалення ваших даних («право на&nbsp;забуття»)</li>
          <li>Обмежити обробку</li>
          <li>Перенести дані (data portability)</li>
          <li>Відкликати згоду в&nbsp;будь-який момент</li>
          <li>
            Подати скаргу до{" "}
            <a href="https://www.ombudsman.gov.ua/" target="_blank" rel="noopener noreferrer">
              Уповноваженого Верховної Ради з&nbsp;прав людини
            </a>
            &nbsp;— відповідальної за захист персональних даних в&nbsp;Україні
          </li>
        </ul>
        <p>
          Реалізація прав&nbsp;— безкоштовна. Ми відповідаємо на запит протягом 30&nbsp;днів
          (можливе продовження до 60&nbsp;днів за&nbsp;складних запитів).
        </p>
        <p>
          Для запиту напишіть на{" "}
          <a href="mailto:promo.vashadvokat@gmail.com">promo.vashadvokat@gmail.com</a> із&nbsp;темою
          «Запит щодо персональних даних» або зателефонуйте за контактним номером.
        </p>

        <h2>9. Діти</h2>
        <p>
          Сайт не&nbsp;призначений для осіб, молодших 16&nbsp;років. Ми не&nbsp;збираємо свідомо дані
          неповнолітніх. Якщо ви&nbsp;вважаєте, що дитина передала нам дані без&nbsp;дозволу батьків,
          зв&apos;яжіться&nbsp;— ми&nbsp;видалимо їх.
        </p>

        <h2>10. Захист даних</h2>
        <p>
          Ми&nbsp;застосовуємо технічні та&nbsp;організаційні заходи для захисту даних:
        </p>
        <ul>
          <li>HTTPS-шифрування всього трафіку сайту</li>
          <li>Обмеження доступу до даних клієнтів тільки адвокатам і&nbsp;юристам Фундації</li>
          <li>
            Зобов&apos;язання конфіденційності для всіх співробітників (адвокатська таємниця —
            довічно)
          </li>
          <li>Регулярне оновлення технічних залежностей сайту</li>
        </ul>
        <p>
          Жодні заходи не&nbsp;гарантують 100% безпеки. У випадку виявлення витоку даних,
          що&nbsp;впливає на&nbsp;ваші права, ми&nbsp;повідомимо вас протягом 72&nbsp;годин.
        </p>

        <h2>11. Зміни цієї політики</h2>
        <p>
          Ми&nbsp;можемо оновлювати цю політику. Актуальна редакція завжди доступна за&nbsp;цим URL.
          Дата останнього оновлення зазначена на&nbsp;початку сторінки. Про істотні зміни
          ми&nbsp;повідомимо активних клієнтів окремо.
        </p>

        <h2>12. Контакти для запитів</h2>
        <address>
          <strong>Фундація адвокатів України</strong>
          <br />
          Email: <a href="mailto:promo.vashadvokat@gmail.com">promo.vashadvokat@gmail.com</a>
          <br />
          Телефон: <a href="tel:+380505940785">+380 50 594 07 85</a>
          <br />
          Адреса: м.&nbsp;Харків, вул.&nbsp;Римарська, 19
        </address>
        <p>
          Для формальних скарг у сфері захисту персональних даних&nbsp;— Уповноважений Верховної
          Ради з&nbsp;прав людини, департамент з&nbsp;питань захисту персональних даних.
        </p>
      </LegalPageContent>
    </>
  );
}
