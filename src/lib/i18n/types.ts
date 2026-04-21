import type { ReactNode } from "react";

export type Locale = "uk" | "ru";

export const LOCALES: Locale[] = ["uk", "ru"];
export const DEFAULT_LOCALE: Locale = "uk";

export interface ServiceText {
  title: string;
  desc: string;
  scenarios: ReactNode;
  action: ReactNode;
}

export interface StepText {
  title: ReactNode;
  note: ReactNode;
  text: ReactNode;
  hint?: ReactNode;
}

export interface AbonementFeature {
  strong: ReactNode;
  thin: ReactNode;
}

export interface CompareRow {
  label: string;
  once: ReactNode;
  yearly: ReactNode;
}

export interface AwardCard {
  title: ReactNode;
  text: ReactNode;
}

export interface PartnerBadge {
  icon: string;
  label: ReactNode;
}

export interface PartnerCard {
  image: string;
  imageAlt: string;
  name: string;
  title: ReactNode;
  badges: PartnerBadge[];
  bio: ReactNode[];
  quote?: ReactNode;
  reverse?: boolean;
}

export interface BlogCardPreview {
  href: string;
  img: string;
  tag: string;
  title: string;
  excerpt: ReactNode;
  meta: string;
  metaFull: string;
}

export interface ArticleTocItem {
  id: string;
  label: string;
}

export interface ArticleListing {
  slug: string;
  image: string;
  tag: string;
  title: string;
  excerpt: ReactNode;
  date: string;
  readTime: string;
}

export interface ArticleEntry {
  slug: string;
  tag: string;
  title: string;
  date: string;
  datePublished: string; // ISO 8601
  dateModified: string;  // ISO 8601
  readTime: string;
  author: string;
  image: string;
  coverAlt: string;
  ogImage?: string;
  category: "fraud" | "criminal" | "business" | "general";
  tags: string[];
  metaDescription: string;
  toc: ArticleTocItem[];
  body: ReactNode;
  endBlock: {
    strong: ReactNode;
    text: ReactNode;
    cta: string;
  };
}

export interface AboutFactBadge {
  icon: string;
  label: ReactNode;
}

export interface AboutSection {
  h1: ReactNode;
  lead: ReactNode;
  imageAlt: string;
  credentialsHeader: ReactNode;
  credentials: AboutFactBadge[];
  bioHeader: ReactNode;
  bio: ReactNode[];
  practiceHeader: ReactNode;
  practicePoints: ReactNode[];
  mediaHeader: ReactNode;
  mediaPoints: ReactNode[];
  ctaHeader: ReactNode;
  ctaText: ReactNode;
  ctaButton: string;
}

export interface Dict {
  htmlLang: string;

  meta: {
    homeTitle: string;
    homeDescription: string;
    homeOgTitle: string;
    homeOgDescription: string;
    homeOgLocale: string;
    homeOgImageAlt: string;
    blogListTitle: string;
    blogListDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutOgTitle: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
    cookieTitle: string;
    cookieDescription: string;
    titleTemplate: string;
  };

  header: {
    logoAlt: string;
    logoTitle: ReactNode;
    logoSubtitle: ReactNode;
    nav: { href: string; label: string }[];
    phoneLabel: string;
    ctaLabel: string;
    menuLabel: string;
    langSwitchLabel: string;
    otherLangLabel: string;
    otherLangCode: string;
    backLabel: string;
    blogBackLabel: string;
  };

  hero: {
    eyebrow: string;
    h1: ReactNode;
    subtitle: ReactNode;
    cta: string;
    videoPlayLabel: string;
    videoPosterAlt: string;
  };

  trust: {
    items: { number: string; label: ReactNode }[];
  };

  services: {
    sectionTitle: ReactNode;
    sectionHint: ReactNode;
    situationsLabel: string;
    actionLabel: string;
    items: Record<string, ServiceText>;
  };

  steps: {
    sectionTitle: ReactNode;
    items: StepText[];
  };

  partners: {
    sectionTitle?: ReactNode;
    sectionHint?: ReactNode;
    items: PartnerCard[];
  };

  abonement: {
    eyebrow: string;
    h2: ReactNode;
    lead: ReactNode;
    priceLine: ReactNode;
    priceNote: ReactNode;
    features: AbonementFeature[];
    ctaLabel: ReactNode;
    compareOnceHeader: ReactNode;
    compareYearlyHeader: ReactNode;
    compareRows: CompareRow[];
    compareMobileOnceLabel: string;
    compareMobileYearlyLabel: string;
    compareMobileLabels: {
      cost: string;
      history: string;
      availability: string;
      relationship: string;
      emergency: string;
      panic: string;
    };
  };

  awards: {
    sectionTitle: ReactNode;
    sectionHint: ReactNode;
    cards: AwardCard[];
    badges: { icon: "file" | "scroll" | "shield"; text: ReactNode }[];
  };

  blogPreview: {
    sectionTitle: ReactNode;
    sectionHint: ReactNode;
    cards: BlogCardPreview[];
    allButton: ReactNode;
    subscribeNote: ReactNode;
    readLabel: string;
    readMoreArrow: string;
  };

  ctaFinal: {
    eyebrow: string;
    h2: ReactNode;
    lead: ReactNode;
    nameInput: string;
    phoneInput: string;
    submit: string;
    submitSending: string;
    noteSecret: string;
    noteTime: string;
    noteCommitment: string;
    errorNameRequired: string;
    errorPhoneRequired: string;
    errorPhoneFormat: string;
    errorPhoneOperator: string;
    errorSubmit: ReactNode;
    successTitle: string;
    successMessage: ReactNode;
  };

  footer: {
    brandText: ReactNode;
    servicesHeader: string;
    companyHeader: string;
    contactsHeader: string;
    servicesLinks: { href: string; label: string }[];
    companyLinks: { href: string; label: string }[];
    legalLinks: { href: string; label: string }[];
    addressLines: ReactNode;
    hoursLines: ReactNode;
    copyright: ReactNode;
    badgeCouncil: string;
    badgeOrder: ReactNode;
  };

  legal: {
    breadcrumbRoot: string;
    lastUpdatedLabel: string;
    lastUpdatedDate: string;
    breadcrumbLabel: string;
    privacyTitle: string;
    termsTitle: string;
    cookieTitle: string;
  };

  blogList: {
    h1: string;
    subtitle: ReactNode;
    articles: ArticleListing[];
  };

  articles: Record<string, ArticleEntry>;

  article: {
    tocLabel: string;
    backToBlog: string;
    authorPrefix: string;
    authorCredential: string;
    authorProfilePath: string;
    publishedLabel: string;
    modifiedLabel: string;
    authorBioHeader: string;
    authorBioName: string;
    authorBioTitle: string;
    authorBioLines: ReactNode[];
    authorBioCta: string;
    authorImage: string;
    authorImageAlt: string;
    aiDisclosure: string;
  };

  about: AboutSection;

  notFound: {
    bodyText: ReactNode;
    homeLink: ReactNode;
  };
}
