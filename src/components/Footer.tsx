import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FileBadge,
} from "lucide-react";

const services = [
  { href: "/poslugy/shahrajstvo", label: "Шахрайство" },
  { href: "/poslugy/kryminalnyj-zahyst", label: "Кримінальний захист" },
  { href: "/poslugy/vijskove-pravo", label: "Військове право" },
  { href: "/poslugy/neruhomist", label: "Нерухомість" },
  { href: "/poslugy/simejne-pravo", label: "Сімейне право" },
  { href: "/poslugy/dtp", label: "ДТП" },
  { href: "/poslugy/zahyst-biznesu", label: "Захист бізнесу" },
];

const company = [
  { href: "/pro-nas", label: "Про нас" },
  { href: "/abonement", label: "Абонентський договір" },
  { href: "/blog", label: "Блог" },
  { href: "/kontakty", label: "Контакти" },
];

const socials = [
  {
    title: "Facebook",
    href: "#",
    svg: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    title: "Instagram",
    href: "#",
    svg: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    title: "YouTube",
    href: "#",
    svg: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    title: "Telegram",
    href: "#",
    svg: (
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    ),
  },
  {
    title: "TikTok",
    href: "#",
    svg: (
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    ),
  },
  {
    title: "Threads",
    href: "#",
    svg: (
      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.37 34.76.384 9.848 5.063 18.348 13.179 23.937 6.86 4.727 15.684 7.084 24.853 6.644 12.098-.58 21.592-5.179 28.218-13.657 5.028-6.433 8.207-14.756 9.573-25.14 5.716 3.452 9.972 8.003 12.382 13.542 4.085 9.381 4.328 24.793-8.472 37.621-11.254 11.275-24.79 16.138-45.156 16.318-22.593-.2-39.679-7.417-50.785-21.449C33.469 140.534 27.336 119.65 27.12 96c.215-23.65 6.35-44.534 18.228-62.117C56.454 19.83 73.54 12.617 96.133 12.417c22.744.202 40.058 7.455 51.44 21.551 5.614 6.955 9.81 15.465 12.525 25.328l14.7-3.89c-3.238-11.694-8.268-21.933-15.063-30.378C146.158 8.312 125.583-.077 96.19 0h-.114C66.86.077 46.593 8.56 33.236 25.27 18.16 44.16 10.48 70.493 10.217 96l-.002.073c.263 25.507 7.944 51.84 23.019 70.73 13.357 16.71 33.625 25.194 62.81 25.27h.114c24.26-.194 41.697-6.875 56.482-21.642 19.719-19.7 18.585-43.972 12.088-58.907-4.664-10.718-13.515-19.404-25.19-24.536zm-43.89 41.558c-10.164.488-20.74-3.993-21.38-14.065-.467-7.326 5.238-15.502 24.628-16.617 2.16-.124 4.276-.183 6.349-.183 6.27 0 12.137.597 17.463 1.7-1.987 24.327-14.58 28.613-27.06 29.165z" />
    ),
    viewBox: "0 0 192 192",
  },
];

export default function Footer() {
  return (
    <footer
      className="bg-primary-dark text-white/70 pt-16 pb-6 border-t-2 border-accent"
      id="kontakty"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo_mini.png"
              alt="Фундація адвокатів України"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
            <p className="text-sm leading-relaxed max-w-[280px]">
              Адвокатське об&apos;єднання «Фундація адвокатів України». Захист
              та надійність з 2010 року.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-body text-sm font-bold uppercase tracking-wider mb-6">
              Послуги
            </h4>
            <ul className="flex flex-col gap-2 list-none">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-white/60 text-[0.9375rem] no-underline hover:text-accent"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-body text-sm font-bold uppercase tracking-wider mb-6">
              Компанія
            </h4>
            <ul className="flex flex-col gap-2 list-none">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-white/60 text-[0.9375rem] no-underline hover:text-accent"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-body text-sm font-bold uppercase tracking-wider mb-6">
              Контакти
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2 text-[0.9375rem]">
                <Phone size={16} className="text-accent shrink-0 mt-0.5" />
                <a
                  href="tel:+380505940785"
                  className="text-white/80 no-underline hover:text-accent"
                >
                  +380 50 594 07 85
                </a>
              </div>
              <div className="flex items-start gap-2 text-[0.9375rem]">
                <Mail size={16} className="text-accent shrink-0 mt-0.5" />
                <a
                  href="mailto:info@vash-advokat.org"
                  className="text-white/80 no-underline hover:text-accent"
                >
                  info@vash-advokat.org
                </a>
              </div>
              <div className="flex items-start gap-2 text-[0.9375rem]">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span>
                  м. Харків, вул. Римарська, 19
                  <br />
                  м. Київ
                </span>
              </div>
              <div className="flex items-start gap-2 text-[0.9375rem]">
                <Clock size={16} className="text-accent shrink-0 mt-0.5" />
                <span>
                  Пн–Пт: 9:00–18:00
                  <br />
                  Екстрена допомога: 24/7
                </span>
              </div>

              {/* Social icons */}
              <div className="flex gap-3.5 mt-4">
                {socials.map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    title={s.title}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 hover:bg-accent/25 transition-colors"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox={s.viewBox || "0 0 24 24"}
                      fill="rgba(255,255,255,0.7)"
                    >
                      {s.svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.8125rem] text-white/40 text-center md:text-left">
            &copy; 2010–2026 Адвокатське об&apos;єднання «Фундація адвокатів
            України». Свідоцтво №647
          </p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 text-xs text-white/50">
              <ShieldCheck size={14} className="text-accent" /> Рада адвокатів
            </span>
            <span className="flex items-center gap-1 text-xs text-white/50">
              <FileBadge size={14} className="text-accent" /> Наказ Мін&apos;юсту
              №1076/5
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
