import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { asset } from "@/lib/asset";

interface HeaderMinimalProps {
  backHref: string;
  backLabel: string;
  sticky?: boolean;
}

export default function HeaderMinimal({
  backHref,
  backLabel,
  sticky = false,
}: HeaderMinimalProps) {
  return (
    <header
      className={`bg-surface border-b border-border py-3 ${sticky ? "sticky top-0 z-50" : ""}`}
    >
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image
            src={asset("/images/logo_mini.png")}
            alt="Фундація адвокатів України"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
          <div className="font-heading text-[0.9375rem] font-semibold text-primary leading-tight">
            Фундація адвокатів
            <small className="block font-body text-[0.6875rem] font-normal text-text-muted">
              Захист та надійність
            </small>
          </div>
        </Link>
        <Link
          href={backHref}
          className="text-[0.8125rem] text-text-muted flex items-center gap-1.5 no-underline hover:text-primary"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </Link>
      </div>
    </header>
  );
}
