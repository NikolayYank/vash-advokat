"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Briefcase,
  Scale,
  Shield,
  Building2,
  Heart,
  ScrollText,
  Car,
  ArrowRight,
  Award,
  Newspaper,
  Tv,
  ShieldCheck,
  FileBadge,
  MapPin,
  Check,
  Minus,
  Lock,
  Menu,
  X,
  Phone,
  Mail,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

/* ===== Scroll reveal hook ===== */
function useReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(
      ".section-header, .pain-card, .step-item, .service-card, .founder, .blog-card, .cta-form, .gold-divider, .award-badge, .trust-numbers, [style*=\"border-top:3px\"]"
    );
    revealEls.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));

    // Stagger delay for grid children
    document
      .querySelectorAll(".steps-grid, .services-grid, .blog-grid")
      .forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
          (child as HTMLElement).style.transitionDelay = i * 0.08 + "s";
        });
      });

    return () => observer.disconnect();
  }, []);
}

/* ===== Counter animation hook ===== */
function useCounters() {
  useEffect(() => {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const text = el.textContent?.trim() || "";
          const match = text.match(/^([\d\s]+)/);
          if (!match) return;
          const target = parseInt(match[1].replace(/\s/g, ""));
          const suffix = text.replace(match[1], "");
          const duration = 1800;
          const start = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * ease);
            el.textContent =
              current.toLocaleString("uk-UA").replace(/,/g, " ") + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document
      .querySelectorAll(".trust-number")
      .forEach((el) => counterObserver.observe(el));
    return () => counterObserver.disconnect();
  }, []);
}

/* ===== Data ===== */

const navLinks = [
  { href: "#poslugy", label: "Послуги" },
  { href: "#pro-nas", label: "Про нас" },
  { href: "#abonement", label: "Абонентський договір" },
  { href: "/blog", label: "Блог" },
  { href: "#kontakty", label: "Контакти" },
];

const servicesList = [
  {
    key: "shahrajstvo",
    Icon: ShieldAlert,
    title: "Шахрайство",
    desc: "Викриття схем, повернення коштів",
    scenarios: "Дзвінки «з\u00A0банку», фейкові договори купівлі-продажу, крипто-сками, фішинг у\u00A0месенджерах, шахрайство з\u00A0нерухомістю.",
    action: "Розбираємо схему, фіксуємо докази, готуємо звернення до\u00A0кіберполіції та\u00A0позови до\u00A0суду — щоб у\u00A0вас були максимальні шанси повернути кошти.",
  },
  {
    key: "kryminalnyj-zahyst",
    Icon: Scale,
    title: "Кримінальний захист",
    desc: "Затримання, обшук, допит, слідство, суд",
    scenarios: "Затримання, обшук вдома чи\u00A0в\u00A0офісі, допит, слідчі дії, обрання запобіжного заходу, суди першої та\u00A0апеляційної інстанцій.",
    action: "Виїжджаємо одразу після дзвінка. Стежимо, щоб\u00A0протокол склали правильно, не\u00A0дозволяємо ставити підписи під\u00A0тиском, представляємо ваші інтереси на\u00A0всіх етапах слідства та\u00A0у\u00A0суді — 24/7, без\u00A0вихідних.",
  },
  {
    key: "vijskove-pravo",
    Icon: Shield,
    title: "Військове право",
    desc: "ТЦК, повістки, відстрочка, мобілізація",
    scenarios: "ТЦК і\u00A0СП, повістки, відстрочка від\u00A0мобілізації, бронювання працівників, оскарження рішень ВЛК, статус УБД.",
    action: "Допомагаємо зібрати і\u00A0правильно оформити документи на\u00A0відстрочку, бронювання чи\u00A0оскарження. Супроводжуємо у\u00A0відносинах із\u00A0ТЦК і\u00A0ВЛК, оскаржуємо незаконні рішення у\u00A0суді.",
  },
  {
    key: "neruhomist",
    Icon: Building2,
    title: "Нерухомість та земля",
    desc: "Купівля, продаж, спори, право власності",
    scenarios: "Купівля чи\u00A0продаж квартири, перевірка документів продавця, спори за\u00A0межі ділянок, оформлення дарування, спадкове майно.",
    action: "Перевіряємо документи продавця ще до\u00A0завдатку, виявляємо ризики угоди, присутні з\u00A0вами під\u00A0час підписання у\u00A0нотаріуса. Захищаємо ваше право власності у\u00A0суді, якщо до\u00A0цього дійде.",
  },
  {
    key: "simejne-pravo",
    Icon: Heart,
    title: "Сімейне право",
    desc: "Розлучення, аліменти, поділ майна",
    scenarios: "Розлучення, поділ майна, аліменти, встановлення батьківства, опіка над\u00A0дітьми, шлюбний договір.",
    action: "Ведемо переговори з\u00A0другою стороною замість вас. Зберігаємо стосунки там, де\u00A0ще можна обійтись без\u00A0суду, і\u00A0представляємо ваші інтереси у\u00A0суді, коли мирне рішення вже неможливе.",
  },
  {
    key: "spadkove-pravo",
    Icon: ScrollText,
    title: "Спадкове право",
    desc: "Спадщина, заповіт, спори спадкоємців",
    scenarios: "Вступ у\u00A0спадщину, складання заповіту, оскарження заповіту, спори між\u00A0спадкоємцями, прийняття чи\u00A0відмова від\u00A0спадщини.",
    action: "Допомагаємо оформити спадщину правильно з\u00A0першого разу — без\u00A0втрати строків. Ведемо переговори з\u00A0іншими спадкоємцями і\u00A0представляємо ваші інтереси у\u00A0нотаріуса та\u00A0суді.",
  },
  {
    key: "dtp",
    Icon: Car,
    title: "ДТП",
    desc: "Від\u00A0протоколу до\u00A0компенсації",
    scenarios: "Складання протоколу, спори зі\u00A0страховою, компенсація шкоди, складні випадки з\u00A0постраждалими, кримінальна відповідальність за\u00A0ДТП.",
    action: "За\u00A0потреби виїжджаємо на\u00A0місце ДТП — стежимо, щоб\u00A0обставини зафіксували коректно. Готуємо претензії до\u00A0страхової, представляємо вас у\u00A0суді щодо компенсації шкоди або у\u00A0кримінальній справі.",
  },
  {
    key: "zahyst-biznesu",
    Icon: Briefcase,
    title: "Захист бізнесу",
    desc: "Перевірки, рейдерство, партнерські спори",
    scenarios: "Податкова перевірка, обшук в\u00A0офісі, рейдерське захоплення, кримінальне переслідування директора, спори між\u00A0партнерами.",
    action: "Адвокат заходить у\u00A0кабінет разом із\u00A0вами під\u00A0час перевірки чи\u00A0обшуку. Контролюємо процедуру, ведемо комунікацію з\u00A0контролюючими органами як\u00A0ваш представник, розробляємо стратегію захисту і\u00A0представляємо інтереси компанії у\u00A0суді.",
  },
];

const steps = [
  {
    n: 1,
    title: "Первинна консультація",
    note: "Безкоштовно · до\u00A030\u00A0хвилин",
    text: "Ви\u00A0розповідаєте ситуацію, ми\u00A0ставимо уточнюючі питання — і\u00A0чесно кажемо, чи\u00A0можемо взятися за\u00A0вашу справу та\u00A0як саме працюємо.",
  },
  {
    n: 2,
    title: "Абонентський договір",
    note: "На\u00A01\u00A0рік",
    text: "Підписуємо договір — і\u00A0весь рік у\u00A0вас є\u00A0свій адвокат: поточні питання консультуємо без\u00A0доплати, екстрена допомога 24/7.",
    hint: "(усі привілеї — у\u00A0блоці нижче)",
  },
  {
    n: 3,
    title: "Аналіз ситуації і\u00A0план дій",
    note: "1–3 робочі дні",
    text: "Збираємо документи, перевіряємо судову практику, формуємо письмову позицію: де\u00A0ризики, які варіанти, скільки часу. Узгоджуємо з\u00A0вами покроковий план.",
  },
  {
    n: 4,
    title: "Постійна робота і\u00A0зв'язок",
    note: "Звіт раз на\u00A0тиждень",
    text: "Ведемо ваші конкретні справи — суди, держоргани, переговори. Дзвоните по\u00A0будь-яких поточних питаннях у\u00A0межах абонементу.",
  },
];

const blogCards = [
  { href: "/blog/7-oznak-shahrajstva", img: asset("/images/blog_fraud.jpeg"), tag: "Шахрайство", title: "7 ознак шахрайства: як розпізнати і що робити", excerpt: "Чекліст red\u00A0flags, актуальні схеми 2026 і\u00A0покрокові дії, якщо вже обдурили.", meta: "8 хв", metaFull: "Квітень 2026 \u00b7 8 хв читання" },
  { href: "/blog/abonement-yak-pratsuye", img: asset("/images/b2b_shield.jpeg"), tag: "Абонементний договір", title: "Свій адвокат на рік: коли абонемент окуповує себе одним дзвінком", excerpt: "5\u00A0ситуацій, де\u00A0абонемент окуповується одразу. Кому НЕ\u00A0потрібен. Конкретний розрахунок.", meta: "10 хв", metaFull: "Квітень 2026 \u00b7 10 хв читання" },
  { href: "/blog/obshuk-shcho-robyty", img: asset("/images/blog_criminal.jpeg"), tag: "Кримінальне право", title: "Обшук: покрокова інструкція до, під час і після", excerpt: "Що\u00A0зробити заздалегідь, 7\u00A0правил під\u00A0час, чого НЕ\u00A0робити і\u00A0перші 24\u00A0години після.", meta: "12 хв", metaFull: "Квітень 2026 \u00b7 12 хв читання" },
];

const footerServices = [
  { href: "/poslugy/shahrajstvo", label: "Шахрайство" },
  { href: "/poslugy/kryminalnyj-zahyst", label: "Кримінальний захист" },
  { href: "/poslugy/vijskove-pravo", label: "Військове право" },
  { href: "/poslugy/neruhomist", label: "Нерухомість" },
  { href: "/poslugy/simejne-pravo", label: "Сімейне право" },
  { href: "/poslugy/dtp", label: "ДТП" },
  { href: "/poslugy/zahyst-biznesu", label: "Захист бізнесу" },
];

const footerCompany = [
  { href: "/pro-nas", label: "Про нас" },
  { href: "/abonement", label: "Абонентський договір" },
  { href: "/blog", label: "Блог" },
  { href: "/kontakty", label: "Контакти" },
];

const socials = [
  {
    title: "Facebook",
    href: "#",
    svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "Instagram",
    href: "#",
    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "YouTube",
    href: "#",
    svg: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "Telegram",
    href: "#",
    svg: <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "TikTok",
    href: "#",
    svg: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
    viewBox: "0 0 24 24",
  },
  {
    title: "Threads",
    href: "#",
    svg: <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.37 34.76.384 9.848 5.063 18.348 13.179 23.937 6.86 4.727 15.684 7.084 24.853 6.644 12.098-.58 21.592-5.179 28.218-13.657 5.028-6.433 8.207-14.756 9.573-25.14 5.716 3.452 9.972 8.003 12.382 13.542 4.085 9.381 4.328 24.793-8.472 37.621-11.254 11.275-24.79 16.138-45.156 16.318-22.593-.2-39.679-7.417-50.785-21.449C33.469 140.534 27.336 119.65 27.12 96c.215-23.65 6.35-44.534 18.228-62.117C56.454 19.83 73.54 12.617 96.133 12.417c22.744.202 40.058 7.455 51.44 21.551 5.614 6.955 9.81 15.465 12.525 25.328l14.7-3.89c-3.238-11.694-8.268-21.933-15.063-30.378C146.158 8.312 125.583-.077 96.19 0h-.114C66.86.077 46.593 8.56 33.236 25.27 18.16 44.16 10.48 70.493 10.217 96l-.002.073c.263 25.507 7.944 51.84 23.019 70.73 13.357 16.71 33.625 25.194 62.81 25.27h.114c24.26-.194 41.697-6.875 56.482-21.642 19.719-19.7 18.585-43.972 12.088-58.907-4.664-10.718-13.515-19.404-25.19-24.536zm-43.89 41.558c-10.164.488-20.74-3.993-21.38-14.065-.467-7.326 5.238-15.502 24.628-16.617 2.16-.124 4.276-.183 6.349-.183 6.27 0 12.137.597 17.463 1.7-1.987 24.327-14.58 28.613-27.06 29.165z" />,
    viewBox: "0 0 192 192",
  },
];

export default function HomePage() {
  useReveal();
  useCounters();

  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="container">
          <Link href="/" className="header-logo">
            <Image
              src={asset("/images/logo_mini.png")}
              alt="Фундація адвокатів України"
              width={48}
              height={48}
            />
            <div className="header-logo-text">
              Фундація адвокатів
              <small>Захист та надійність</small>
            </div>
          </Link>

          <nav>
            <ul className="header-nav">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <a href="tel:+380505940785" className="header-phone">
              +380 50 594 07 85
            </a>
            <Link
              href="#konsultaciya"
              className="btn btn-primary btn-header-cta"
            >
              Консультація
            </Link>
          </div>

          <button
            className="menu-toggle"
            aria-label="Меню"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X style={{ width: 24, height: 24 }} />
            ) : (
              <Menu style={{ width: 24, height: 24 }} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-menu-nav">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-menu-cta">
              <a href="tel:+380505940785" className="mobile-menu-phone">
                +380 50 594 07 85
              </a>
              <Link href="#konsultaciya" className="btn btn-primary btn-header-cta" onClick={() => setMenuOpen(false)}>
                Консультація
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              Адвокат поруч — до&nbsp;того,<br />
              як&nbsp;він стане потрібен
            </h1>
            <p className="hero-subtitle">
              Розпізнати ризик. Зрозуміти права. Знати, що&nbsp;робити. Без&nbsp;юридичних термінів, без&nbsp;води, без&nbsp;зайвих витрат. Чесно, конкретно і&nbsp;вчасно.
            </p>
          </div>
          <div
            className="hero-photo"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "540px",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <video
                src="https://res.cloudinary.com/dogdcmlqa/video/upload/q_auto/f_auto/v1776365020/video_web_ytrakq.mp4"
                controls
                playsInline
                preload="metadata"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
          <div className="hero-actions">
            <Link href="#konsultaciya" className="btn btn-primary btn-hero">
              Отримати консультацію
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST NUMBERS ===== */}
      <section className="trust-numbers">
        <div className="container">
          <div className="trust-item">
            <div className="trust-number">11 500+</div>
            <div className="trust-label">справ за&nbsp;весь час практики</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">87%</div>
            <div className="trust-label">справ — на&nbsp;користь клієнта</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">38</div>
            <div className="trust-label">років стажу засновника</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">3</div>
            <div className="trust-label">офіси · Харків · Київ · Софія</div>
          </div>
        </div>
      </section>

      <hr className="gold-divider" />

      {/* ===== SERVICES (8 з розкриттям) ===== */}
      <section className="section section-muted" id="poslugy">
        <div className="container">
          <div className="section-header">
            <h2>З&nbsp;якими питаннями до&nbsp;нас приходять</h2>
            <p>Натисніть на&nbsp;тему — побачите ситуації та&nbsp;що&nbsp;робимо</p>
          </div>

          <div
            className="services-grid"
            style={{ alignItems: "start" }}
          >
            {servicesList.map((s, idx) => {
              const isExpanded = expandedService === idx;
              return (
                <div
                  key={s.key}
                  className="service-card"
                  onClick={() => setExpandedService(isExpanded ? null : idx)}
                  style={{
                    cursor: "pointer",
                    flexDirection: "column",
                    alignItems: "stretch",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    boxShadow: isExpanded ? "0 8px 24px rgba(15,30,77,0.12)" : undefined,
                    borderColor: isExpanded ? "var(--color-accent)" : undefined,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <s.Icon className="service-icon" style={{ width: 24, height: 24, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ marginBottom: 4 }}>{s.title}</h3>
                      <p style={{ margin: 0 }}>{s.desc}</p>
                    </div>
                    <ChevronDown
                      style={{
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        color: "var(--color-text-muted)",
                        transition: "transform 0.3s ease",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      maxHeight: isExpanded ? 400 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease, margin-top 0.3s ease, padding-top 0.3s ease",
                      marginTop: isExpanded ? 16 : 0,
                      paddingTop: isExpanded ? 16 : 0,
                      borderTop: isExpanded ? "1px solid var(--color-border)" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-muted)",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      Ситуації
                    </div>
                    <p style={{ margin: "0 0 14px", fontSize: "0.9375rem", lineHeight: 1.55 }}>
                      {s.scenarios}
                    </p>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-accent)",
                        fontWeight: 700,
                        marginBottom: 6,
                      }}
                    >
                      Що ми робимо
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.55 }}>
                      {s.action}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Як проходить робота — від&nbsp;першого дзвінка до&nbsp;результату</h2>
          </div>

          <div className="steps-grid">
            {steps.map((s) => (
              <div
                key={s.n}
                className="step-item"
                style={{ textAlign: "left" }}
              >
                <div
                  className="step-number"
                  style={{ margin: "0 0 var(--space-md) 0" }}
                >
                  {s.n}
                </div>
                <h3 style={{ textAlign: "left", marginBottom: 6 }}>{s.title}</h3>
                <div
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-accent)",
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {s.note}
                </div>
                <p style={{ textAlign: "left" }}>{s.text}</p>
                {"hint" in s && s.hint && (
                  <p
                    style={{
                      textAlign: "left",
                      marginTop: 8,
                      fontSize: "0.8125rem",
                      fontStyle: "italic",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {s.hint}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="section section-muted" id="pro-nas">
        <div className="container">
          <div className="founder">
            <div className="founder-photo">
              <img
                src={asset("/images/ava.jpg")}
                alt="Сергій Сергійович Веприцький — засновник Фундації адвокатів"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  borderRadius: "var(--radius-xl)",
                }}
              />
            </div>
            <div className="founder-info">
              <h2>Сергій Сергійович Веприцький</h2>
              <div className="founder-title">
                Засновник та керівник Фундації адвокатів України
              </div>
              <p>
                Адвокатська практика — 38&nbsp;років. У&nbsp;2010 заснував Фундацію
                адвокатів України. За&nbsp;весь час практики команда провела понад
                11&nbsp;500 справ — від&nbsp;побутових спорів до&nbsp;кримінальних,
                цивільних і&nbsp;бізнесових.
              </p>
              <p>
                Третє покоління адвокатської династії.
              </p>
              <p>
                2013 — орден «Видатний адвокат України», вища відзнака Ради
                адвокатів. Головний редактор правової газети «Захист прав».
                Автор і&nbsp;ведучий ТВ-програми «Людина і&nbsp;Закон».
              </p>

              <blockquote
                className="founder-quote"
            >
                «Більшість юридичних проблем — наслідок незнання, а&nbsp;не&nbsp;злого наміру. Адвокат поруч — це&nbsp;не&nbsp;розкіш, а&nbsp;спокій до&nbsp;того, як&nbsp;щось станеться.»
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEDIA & AWARDS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Те, що&nbsp;про&nbsp;нас можна перевірити</h2>
            <p>Офіційні документи, нагорода від&nbsp;колег і&nbsp;14&nbsp;років публічної роботи в&nbsp;медіа</p>
          </div>

          <div className="awards-grid">
            {/* Award card 1 */}
            <div
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-xl)",
                boxShadow: "var(--shadow-card)",
                textAlign: "left",
                borderTop: "3px solid var(--color-accent)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 0 var(--space-md)",
                  background: "rgba(212,175,55,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Award style={{ width: 32, height: 32, color: "var(--color-accent)" }} />
              </div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "var(--space-sm)" }}>
                Орден «Видатний адвокат України»
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                2013, Рада адвокатів. Вищу відзнаку отримують одиниці адвокатів за всю кар&apos;єру — це підтвердження від колег по цеху, не диплом «за участь»
              </p>
            </div>

            {/* Media card 2 */}
            <div
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-xl)",
                boxShadow: "var(--shadow-card)",
                textAlign: "left",
                borderTop: "3px solid var(--color-primary)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 0 var(--space-md)",
                  background: "rgba(30,58,138,0.08)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Newspaper style={{ width: 32, height: 32, color: "var(--color-primary)" }} />
              </div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "var(--space-sm)" }}>
                Головний редактор «Захист прав»
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                Та сама правова експертиза, що&nbsp;в&nbsp;нашому кабінеті, — у&nbsp;відкритих публікаціях. Якщо хочете перевірити рівень — починайте з&nbsp;газети
              </p>
            </div>

            {/* Media card 3 */}
            <div
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-xl)",
                boxShadow: "var(--shadow-card)",
                textAlign: "left",
                borderTop: "3px solid var(--color-primary)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 0 var(--space-md)",
                  background: "rgba(30,58,138,0.08)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tv style={{ width: 32, height: 32, color: "var(--color-primary)" }} />
              </div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "var(--space-sm)" }}>
                Автор і ведучий «Людина і Закон»
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                Розбираємо в ефірі такі самі ситуації, з якими приходять до нас. Те, що бачите на екрані, — те саме, що отримуєте на консультації
              </p>
            </div>
          </div>

          {/* Official badges row */}
          <div className="official-badges-row">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
              <FileBadge style={{ width: 20, height: 20, color: "var(--color-accent)" }} />
              <span>Реєстр НААУ: свідоцтво №647 (можна перевірити публічно)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
              <ScrollText style={{ width: 20, height: 20, color: "var(--color-accent)" }} />
              <span>Наказ Мін&apos;юсту України №1076/5 від 19.05.2010</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
              <ShieldCheck style={{ width: 20, height: 20, color: "var(--color-accent)" }} />
              <span>Член Ради адвокатів України</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== B2B TEASER ===== */}
      <section className="section section-dark b2b-teaser" id="abonement">
        <div className="container b2b-grid">
          {/* LEFT: description */}
          <div>
            <h2 style={{ color: "var(--color-surface)", marginBottom: "var(--space-md)", lineHeight: 1.2 }}>
              Свій адвокат на&nbsp;рік — за&nbsp;ціною одного разового виклику
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                marginBottom: "var(--space-lg)",
                lineHeight: 1.7,
              }}
            >
              Замість шукати юриста по&nbsp;факту проблеми, мати його заздалегідь — і&nbsp;дзвонити по&nbsp;будь-яких питаннях.
            </p>

            <div style={{ marginBottom: "var(--space-xl)" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  lineHeight: 1.2,
                }}
              >
                Абонентський договір&nbsp;—<br />5&nbsp;000&nbsp;₴
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginTop: 6 }}>
                ≈&nbsp;14&nbsp;грн/день — менше, ніж&nbsp;чашка кави
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: "var(--space-xl)" }}>
              {[
                { strong: "Запитати до\u00A0того, як\u00A0підписати або переказати", thin: " — необмежені консультації до\u00A01\u00A0години щодня" },
                { strong: "Адвокат їде до\u00A0вас, навіть о\u00A0третій ночі", thin: " — екстрена допомога 24/7, без\u00A0вихідних і\u00A0свят" },
                { strong: "Виїзд на\u00A0місце замість «приходьте у\u00A0нас в\u00A0офіс»", thin: " — у\u00A0будь-яке місто, де\u00A0ми\u00A0є" },
                { strong: "Документи, що\u00A0працюють як\u00A0видимий захист", thin: " — пластиковий ордер і\u00A0захисні знаки на\u00A0двері та\u00A0авто" },
              ].map((item) => (
                <li
                  key={item.strong}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.55,
                  }}
                >
                  <Check style={{ width: 18, height: 18, color: "var(--color-accent)", flexShrink: 0, marginTop: 3 }} />
                  <span>
                    <strong style={{ color: "var(--color-surface)" }}>{item.strong}</strong>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.thin}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/blog/abonement-yak-pratsuye"
              className="btn btn-outline btn-section"
            >
              Дізнатися більше <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          </div>

          {/* RIGHT: comparison table */}
          {/* === Desktop comparison table (hidden ≤640px) === */}
          <div className="compare-desktop" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <div className="compare-row compare-header">
              <div style={{ padding: "var(--space-lg)" }} />
              <div style={{ padding: "var(--space-lg)", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Разове<br />звернення</div>
              <div style={{ padding: "var(--space-lg)", textAlign: "center", background: "rgba(212,175,55,0.08)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}><div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)" }}>Абонентський<br />договір</div></div>
            </div>
            <div className="compare-row">
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Вартість</div>
              <div style={{ padding: "12px var(--space-lg)", color: "var(--color-surface)", fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700 }}>від 8 000 &#8372;</div>
              <div style={{ padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 700 }}>5 000 &#8372;/рік</div>
            </div>
            <div className="compare-row">
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Знання вашої історії</div>
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem" }}>Кожен раз з нуля</div>
              <div style={{ padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", fontWeight: 700 }}>Уже знає вашу ситуацію</div>
            </div>
            <div className="compare-row">
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Доступність</div>
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem" }}>Шукаєте вільного юриста</div>
              <div style={{ padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", fontWeight: 700 }}>Свій адвокат на зв&apos;язку</div>
            </div>
            <div className="compare-row">
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Як побудовані стосунки</div>
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem" }}>Разовий проєкт</div>
              <div style={{ padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", fontWeight: 700 }}>Робота вдовгу</div>
            </div>
            <div className="compare-row">
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Екстрена допомога</div>
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.25)" }}><Minus style={{ width: 16, height: 16 }} /></div>
              <div style={{ padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", fontWeight: 700 }}>24/7</div>
            </div>
            <div className="compare-row compare-last">
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem" }}>Дзвінок у момент паніки</div>
              <div style={{ padding: "12px var(--space-lg)", color: "rgba(255,255,255,0.35)", fontSize: "0.8125rem" }}>«Кому ж телефонувати?..»</div>
              <div style={{ padding: "12px var(--space-lg)", background: "rgba(212,175,55,0.05)", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", fontSize: "0.8125rem", fontWeight: 700 }}>«Мій адвокат» — один номер</div>
            </div>
          </div>

          {/* === Mobile comparison cards (shown ≤640px) === */}
          <div className="compare-mobile">
            <div className="compare-card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: "var(--space-md)" }}>Разове звернення</div>
              <div className="compare-card-item"><span className="compare-card-label">Вартість</span><span className="compare-card-value" style={{ color: "var(--color-surface)", fontWeight: 700 }}>від 8 000 ₴</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Історія</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.35)" }}>Кожен раз з нуля</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Доступність</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.35)" }}>Шукаєте вільного юриста</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Стосунки</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.35)" }}>Разовий проєкт</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Екстрена допомога</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.25)" }}>—</span></div>
              <div className="compare-card-item"><span className="compare-card-label">У момент паніки</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.35)" }}>«Кому ж телефонувати?..»</span></div>
            </div>

            <div className="compare-card" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: "var(--space-md)", fontWeight: 700 }}>Абонентський договір</div>
              <div className="compare-card-item"><span className="compare-card-label">Вартість</span><span className="compare-card-value" style={{ color: "var(--color-accent)", fontWeight: 700, fontFamily: "var(--font-heading)", fontSize: "1rem" }}>5 000 ₴/рік</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Історія</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Вже знає вашу ситуацію</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Доступність</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Свій адвокат на зв&apos;язку</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Стосунки</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Робота вдовгу</span></div>
              <div className="compare-card-item"><span className="compare-card-label">Екстрена допомога</span><span className="compare-card-value" style={{ color: "var(--color-accent)", fontWeight: 700 }}>24/7</span></div>
              <div className="compare-card-item"><span className="compare-card-label">У момент паніки</span><span className="compare-card-value" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>«Мій адвокат» — один номер</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Розбираємо реальні ситуації — щоб&nbsp;ви знали, що&nbsp;робити</h2>
            <p>Безкоштовні чеклисти й&nbsp;розбори. Без&nbsp;реєстрації, без&nbsp;«приходьте в&nbsp;офіс»</p>
          </div>

          {/* Desktop grid */}
          <div className="blog-grid blog-grid-desktop">
            {blogCards.map((c) => (
              <Link key={c.href} href={c.href} className="blog-card">
                <div className="blog-card-image">
                  <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-tag">{c.tag}</div>
                  <h3>{c.title}</h3>
                  <div className="blog-card-meta">{c.metaFull}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="blog-scroll">
            {blogCards.map((c) => (
              <Link key={c.href} href={c.href} className="blog-scroll-card">
                <div className="blog-scroll-image">
                  <img src={c.img} alt={c.title} />
                </div>
                <div className="blog-scroll-body">
                  <div className="blog-scroll-tag">{c.tag}</div>
                  <h3 className="blog-scroll-title">{c.title}</h3>
                  <p className="blog-scroll-excerpt">{c.excerpt}</p>
                  <div className="blog-scroll-meta">
                    <span>{c.meta} читання</span>
                    <span className="blog-scroll-arrow">Читати →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-2xl)" }}>
            <Link
              href="/blog"
              className="btn btn-primary btn-section"
            >
              Усі статті та чеклисти <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
            <div style={{ marginTop: 14, color: "var(--color-text-muted)", fontSize: "0.875rem", fontStyle: "italic" }}>
              Або підпишіться: щотижня надсилаємо новий розбір реальної ситуації. Без спаму, відписка одним кліком.
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final" id="konsultaciya">
        <div className="container">
          <h2>
            Розкажіть ситуацію — і&nbsp;ми чесно скажемо, що&nbsp;з&nbsp;нею робити
          </h2>
          <p>
            Адвокат зателефонує за&nbsp;2&nbsp;години, вислухає і&nbsp;скаже: чи&nbsp;беремось,
            з&nbsp;якими ризиками, скільки коштуватиме. Без&nbsp;зобов&apos;язань.
          </p>

          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Ваше ім'я" required />
              <input type="tel" placeholder="Телефон" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Отримати консультацію
            </button>
            <div className="cta-form-note" style={{ flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Lock style={{ width: 14, height: 14 }} /> Адвокатська таємниця
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Clock style={{ width: 14, height: 14 }} /> Передзвонимо за 2 години
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Check style={{ width: 14, height: 14 }} /> Без вашого підпису нічого не починаємо
              </span>
            </div>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="kontakty" style={{ borderTop: "2px solid var(--color-accent)" }}>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={asset("/images/logo_mini.png")} alt="Фундація адвокатів України" />
              <p>
                Адвокатське об&apos;єднання «Фундація адвокатів України». Захист
                та надійність з 2010 року.
              </p>
            </div>

            <div>
              <h4>Послуги</h4>
              <ul className="footer-links">
                {footerServices.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href}>{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Компанія</h4>
              <ul className="footer-links">
                {footerCompany.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href}>{c.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Контакти</h4>
              <div className="footer-contact-item">
                <Phone style={{ width: 16, height: 16 }} />
                <div>
                  <a href="tel:+380505940785" style={{ color: "rgba(255,255,255,0.8)" }}>
                    +380 50 594 07 85
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <Mail style={{ width: 16, height: 16 }} />
                <div>
                  <a href="mailto:info@vash-advokat.org" style={{ color: "rgba(255,255,255,0.8)" }}>
                    info@vash-advokat.org
                  </a>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin style={{ width: 16, height: 16 }} />
                <div>
                  м. Харків, вул. Римарська, 19
                  <br />
                  м. Київ
                </div>
              </div>
              <div className="footer-contact-item">
                <Clock style={{ width: 16, height: 16 }} />
                <div>
                  Пн–Пт: 9:00–18:00
                  <br />
                  Екстрена допомога: 24/7
                </div>
              </div>

              {/* Social links */}
              <div className="footer-socials" style={{ display: "flex", gap: 14, marginTop: "var(--space-lg)" }}>
                {socials.map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    title={s.title}
                    className="footer-social-link"
                    style={{
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      transition: "background 200ms ease",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.25)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox={s.viewBox}
                      fill="rgba(255,255,255,0.7)"
                    >
                      {s.svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; 2010–2026 Адвокатське об&apos;єднання «Фундація адвокатів
              України». Свідоцтво №647
            </p>
            <div className="footer-badges">
              <span className="footer-badge">
                <ShieldCheck style={{ width: 14, height: 14 }} /> Рада адвокатів
              </span>
              <span className="footer-badge">
                <FileBadge style={{ width: 14, height: 14 }} /> Наказ Мін&apos;юсту №1076/5
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
