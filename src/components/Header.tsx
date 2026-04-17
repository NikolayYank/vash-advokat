"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/asset";

const navLinks = [
  { href: "/#poslugy", label: "Послуги" },
  { href: "/#pro-nas", label: "Про нас" },
  { href: "/#abonement", label: "Абонентський договір" },
  { href: "/blog", label: "Блог" },
  { href: "/#kontakty", label: "Контакти" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-6 py-2 lg:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image
            src={asset("/images/logo_mini.png")}
            alt="Фундація адвокатів України"
            width={48}
            height={48}
            className="h-9 lg:h-12 w-auto"
          />
          <div className="font-heading text-[0.95rem] lg:text-[1.1rem] font-semibold text-primary leading-tight">
            Фундація адвокатів
            <small className="block font-body text-[0.6875rem] lg:text-[0.75rem] font-normal text-text-muted">
              Захист та надійність
            </small>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.9375rem] text-text hover:text-primary no-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+380505940785"
            className="font-bold text-text text-[0.9375rem] whitespace-nowrap no-underline hover:text-primary"
          >
            +380 50 594 07 85
          </a>
          <Link
            href="/#konsultaciya"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-accent-warm text-white text-sm font-bold rounded-md no-underline hover:bg-[#9A4408] hover:text-white transition-all duration-200 min-h-[40px]"
          >
            Консультація
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-text bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-6 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text text-[0.9375rem] py-2 no-underline hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
            <a
              href="tel:+380505940785"
              className="font-bold text-text no-underline"
            >
              +380 50 594 07 85
            </a>
            <Link
              href="/#konsultaciya"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-warm text-white font-bold rounded-md no-underline hover:bg-[#9A4408] hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              Консультація
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
