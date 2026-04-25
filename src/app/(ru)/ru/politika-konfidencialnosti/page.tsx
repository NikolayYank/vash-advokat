import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageContent from "@/components/LegalPageContent";
import { ru } from "@/lib/i18n";
import { getBreadcrumbSchema } from "@/lib/schema/breadcrumbs";
import { getLegalWebPageSchema } from "@/lib/schema/legal-page";

export const metadata: Metadata = {
  title: ru.meta.privacyTitle,
  description: ru.meta.privacyDescription,
  alternates: {
    canonical: "/ru/politika-konfidencialnosti",
    languages: {
      "uk-UA": "/polityka-konfidentsijnosti",
      "ru-UA": "/ru/politika-konfidencialnosti",
      "x-default": "/polityka-konfidentsijnosti",
    },
  },
  openGraph: {
    title: ru.legal.privacyTitle,
    description: ru.meta.privacyDescription,
    locale: "ru_UA",
    type: "website",
  },
};

export default function PrivacyPageRu() {
  const breadcrumbs = [
    { name: ru.legal.breadcrumbRoot, path: "/ru/" },
    { name: ru.legal.privacyTitle, path: "/ru/politika-konfidencialnosti/" },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const webPageSchema = getLegalWebPageSchema("privacy", {
    title: ru.legal.privacyTitle,
    path: "/ru/politika-konfidencialnosti/",
    description: ru.meta.privacyDescription,
    locale: "ru",
    dateModified: ru.legal.lastUpdatedDate,
  });

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} id="privacy-schema" />
      <LegalPageContent
        dict={ru}
        locale="ru"
        switchPath="/polityka-konfidentsijnosti"
        breadcrumbs={breadcrumbs}
        breadcrumbLabel={ru.legal.breadcrumbLabel}
        title={ru.legal.privacyTitle}
        lastUpdatedLabel={ru.legal.lastUpdatedLabel}
        lastUpdatedDate={ru.legal.lastUpdatedDate}
      >
        <p>
          Адвокатское объединение «Фундация адвокатов Украины» (далее&nbsp;— «мы», «Фундация»)
          уважает вашу приватность и&nbsp;обрабатывает персональные данные в&nbsp;соответствии с
          Законом Украины «О&nbsp;защите персональных данных» №2297-VI от 01.06.2010 и&nbsp;стандартами
          GDPR в&nbsp;части, применимой к&nbsp;посетителям сайта <strong>vash-advokat.org</strong>.
        </p>
        <p>
          Настоящая политика объясняет, какие данные мы&nbsp;собираем, зачем, как долго храним и&nbsp;как
          вы&nbsp;можете воспользоваться своими правами.
        </p>

        <h2>1. Владелец персональных данных</h2>
        <address>
          <strong>Адвокатское объединение «Фундация адвокатов Украины»</strong>
          <br />
          Приказ Министерства юстиции Украины №1076/5 от 19.05.2010
          <br />
          г.&nbsp;Харьков, ул.&nbsp;Рымарская, 19
          <br />
          Email: <a href="mailto:info@vash-advokat.org">info@vash-advokat.org</a>
          <br />
          Телефон: <a href="tel:+380505940785">+380 50 594 07 85</a>
        </address>

        <h2>2. Какие данные мы&nbsp;собираем</h2>
        <h3>2.1. Данные, которые вы&nbsp;предоставляете сами</h3>
        <ul>
          <li>
            <strong>Через форму консультации</strong>&nbsp;— имя, номер телефона, описание ситуации
            (если заполняете поле «сообщение»). Email&nbsp;— по&nbsp;вашему желанию.
          </li>
          <li>
            <strong>Через прямое обращение</strong> (email, телефон, мессенджеры)&nbsp;— данные,
            которые вы&nbsp;самостоятельно указываете в&nbsp;сообщении.
          </li>
          <li>
            <strong>При заключении договора о правовой помощи</strong>&nbsp;— полный набор данных,
            предусмотренный законодательством об адвокатской деятельности. Обработка таких данных
            регулируется отдельным договором и Законом Украины «Об адвокатуре и адвокатской
            деятельности».
          </li>
        </ul>

        <h3>2.2. Данные, собираемые автоматически</h3>
        <ul>
          <li>
            <strong>Технические данные</strong>&nbsp;— IP-адрес, тип браузера, операционная система,
            язык, referer, URL страниц, которые вы&nbsp;просматривали. Собираются сервером
            статического хостинга (GitHub Pages) в&nbsp;стандартных access-логах.
          </li>
          <li>
            <strong>Cookie и&nbsp;аналогичные технологии</strong>&nbsp;— подробно описаны в{" "}
            <Link href="/ru/cookie-politika/">Политике cookie</Link>.
          </li>
          <li>
            <strong>Аналитика</strong>&nbsp;— в&nbsp;будущем сайт может использовать Google Analytics
            (GA4) при&nbsp;условии вашего согласия. До&nbsp;подключения и&nbsp;получения согласия никаких
            аналитических трекеров не&nbsp;устанавливается.
          </li>
        </ul>

        <h2>3. Для&nbsp;чего мы&nbsp;используем данные</h2>
        <ol>
          <li>
            <strong>Оказание юридической консультации</strong> по&nbsp;вашему запросу (ответ на
            обращение, подготовка правовой позиции, заключение договора).
          </li>
          <li>
            <strong>Связь с&nbsp;вами</strong> по&nbsp;вашему запросу (звонок, сообщение, уточняющие
            вопросы).
          </li>
          <li>
            <strong>Выполнение законодательных требований</strong> (документооборот адвоката, реестр
            договоров, отчётность).
          </li>
          <li>
            <strong>Улучшение работы сайта</strong> (анализ технических логов, скорость, ошибки).
          </li>
          <li>
            <strong>Безопасность</strong> (выявление злоупотреблений, DDoS, спам-атак).
          </li>
        </ol>
        <p>
          Мы&nbsp;<strong>не&nbsp;используем</strong> ваши данные для&nbsp;автоматического
          профилирования, рекламного таргетинга или&nbsp;продажи третьим лицам.
        </p>

        <h2>4. Правовое основание обработки</h2>
        <ul>
          <li>
            <strong>Ваше согласие</strong> (когда вы&nbsp;оставляете заявку через форму или&nbsp;подписываетесь
            на&nbsp;рассылку&nbsp;— в&nbsp;будущем).
          </li>
          <li>
            <strong>Исполнение договора</strong> или&nbsp;преддоговорные действия (когда вы&nbsp;становитесь
            клиентом).
          </li>
          <li>
            <strong>Законный интерес</strong> (техническая безопасность сайта, журнал доступа).
          </li>
          <li>
            <strong>Законодательное требование</strong> (адвокатский документооборот, налоговая
            отчётность).
          </li>
        </ul>

        <h2>5. Кому мы&nbsp;передаём данные</h2>
        <p>
          Мы&nbsp;<strong>не&nbsp;продаём</strong> ваши данные и&nbsp;не&nbsp;передаём третьим лицам
          с&nbsp;маркетинговой целью. Передача возможна только:
        </p>
        <ul>
          <li>
            <strong>Адвокатам/юристам Фундации</strong>, работающим с&nbsp;вашим запросом (адвокатская
            тайна, статья&nbsp;22 Закона Украины «Об&nbsp;адвокатуре и&nbsp;адвокатской деятельности»).
          </li>
          <li>
            <strong>Сервис-провайдерам</strong>: GitHub Pages (хостинг), email-сервис (Gmail). Они
            имеют собственные политики конфиденциальности.
          </li>
          <li>
            <strong>Государственным органам</strong> по&nbsp;прямому требованию закона (суды,
            прокуратура, полиция&nbsp;— исключительно в&nbsp;пределах УПК/ГПК/КАС).
          </li>
          <li>
            <strong>Банку / платёжной системе</strong>&nbsp;— при&nbsp;оплате правовых услуг, в&nbsp;пределах
            реквизитов платежа.
          </li>
        </ul>

        <h2>6. Международная передача</h2>
        <p>
          Отдельные сервис-провайдеры (GitHub, Google) могут обрабатывать данные на&nbsp;серверах
          за&nbsp;пределами Украины. Передача осуществляется в&nbsp;соответствии со&nbsp;стандартными
          договорными условиями этих провайдеров. Если вы&nbsp;хотите, чтобы ваши данные
          обрабатывались исключительно в&nbsp;пределах Украины&nbsp;— обратитесь к&nbsp;нам
          альтернативным каналом (телефон, личная встреча).
        </p>

        <h2>7. Сроки хранения</h2>
        <ul>
          <li>
            <strong>Заявки через форму</strong> (без&nbsp;заключения договора)&nbsp;— до&nbsp;12&nbsp;месяцев
            с&nbsp;момента последнего контакта, затем удаляются.
          </li>
          <li>
            <strong>Данные клиентов</strong> (с&nbsp;заключённым договором)&nbsp;— в&nbsp;течение срока,
            установленного законодательством об&nbsp;адвокатской деятельности (обычно 5&nbsp;лет после
            окончания дела или&nbsp;больше, если этого требует закон).
          </li>
          <li>
            <strong>Технические логи сервера</strong>&nbsp;— до&nbsp;30&nbsp;дней.
          </li>
          <li>
            <strong>Cookie</strong>&nbsp;— по&nbsp;длительностям, указанным в{" "}
            <Link href="/ru/cookie-politika/">Политике cookie</Link>.
          </li>
        </ul>

        <h2>8. Ваши права</h2>
        <p>
          В&nbsp;соответствии с&nbsp;Законом Украины «О&nbsp;защите персональных данных» и&nbsp;стандартами
          GDPR вы&nbsp;имеете право:
        </p>
        <ul>
          <li>Получить подтверждение обработки и&nbsp;доступ к&nbsp;своим данным</li>
          <li>Исправить неточные или&nbsp;неполные данные</li>
          <li>Требовать удаления ваших данных («право на&nbsp;забвение»)</li>
          <li>Ограничить обработку</li>
          <li>Перенести данные (data portability)</li>
          <li>Отозвать согласие в&nbsp;любой момент</li>
          <li>
            Подать жалобу в{" "}
            <a href="https://www.ombudsman.gov.ua/" target="_blank" rel="noopener noreferrer">
              Уполномоченного Верховной Рады по&nbsp;правам человека
            </a>
            &nbsp;— ответственного за&nbsp;защиту персональных данных в&nbsp;Украине
          </li>
        </ul>
        <p>
          Реализация прав&nbsp;— бесплатная. Мы&nbsp;отвечаем на&nbsp;запрос в&nbsp;течение 30&nbsp;дней
          (возможно продление до&nbsp;60&nbsp;дней при&nbsp;сложных запросах).
        </p>
        <p>
          Для&nbsp;запроса напишите на{" "}
          <a href="mailto:info@vash-advokat.org">info@vash-advokat.org</a> с&nbsp;темой
          «Запрос по&nbsp;персональным данным» или&nbsp;позвоните по&nbsp;контактному номеру.
        </p>

        <h2>9. Дети</h2>
        <p>
          Сайт не&nbsp;предназначен для&nbsp;лиц младше 16&nbsp;лет. Мы&nbsp;не&nbsp;собираем сознательно
          данные несовершеннолетних. Если вы&nbsp;считаете, что&nbsp;ребёнок передал нам данные без
          разрешения родителей, свяжитесь&nbsp;— мы&nbsp;их&nbsp;удалим.
        </p>

        <h2>10. Защита данных</h2>
        <p>
          Мы&nbsp;применяем технические и&nbsp;организационные меры защиты данных:
        </p>
        <ul>
          <li>HTTPS-шифрование всего трафика сайта</li>
          <li>
            Ограничение доступа к&nbsp;данным клиентов только адвокатам и&nbsp;юристам Фундации
          </li>
          <li>
            Обязательства конфиденциальности для&nbsp;всех сотрудников (адвокатская тайна&nbsp;—
            пожизненно)
          </li>
          <li>Регулярное обновление технических зависимостей сайта</li>
        </ul>
        <p>
          Никакие меры не&nbsp;гарантируют 100% безопасности. В&nbsp;случае выявления утечки данных,
          влияющей на&nbsp;ваши права, мы&nbsp;уведомим вас в&nbsp;течение 72&nbsp;часов.
        </p>

        <h2>11. Изменения этой политики</h2>
        <p>
          Мы&nbsp;можем обновлять эту политику. Актуальная редакция&nbsp;— всегда по&nbsp;этому URL.
          Дата последнего обновления указана в&nbsp;начале страницы. О&nbsp;существенных изменениях
          мы&nbsp;уведомим активных клиентов отдельно.
        </p>

        <h2>12. Контакты для&nbsp;запросов</h2>
        <address>
          <strong>Фундация адвокатов Украины</strong>
          <br />
          Email: <a href="mailto:info@vash-advokat.org">info@vash-advokat.org</a>
          <br />
          Телефон: <a href="tel:+380505940785">+380 50 594 07 85</a>
          <br />
          Адрес: г.&nbsp;Харьков, ул.&nbsp;Рымарская, 19
        </address>
        <p>
          Для&nbsp;формальных жалоб в&nbsp;сфере защиты персональных данных&nbsp;— Уполномоченный
          Верховной Рады по&nbsp;правам человека, департамент по&nbsp;вопросам защиты персональных
          данных.
        </p>
      </LegalPageContent>
    </>
  );
}
