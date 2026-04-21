// Smart typography для UA/RU/EN — кириллическая пунктуация высокого класса.
//
// Что делает:
//   • "ёлочки" «...» для UA/RU, "..." для EN
//   • em-dash (—) с узкими неразрывными пробелами (U+202F) вокруг
//   • en-dash (–) в числовых диапазонах
//   • апостроф ʼ (U+02BC) в UA между кириллическими буквами ("під'їзд")
//   • многоточие … (U+2026) вместо трёх точек
//   • неразрывные пробелы (U+00A0) после коротких предлогов и между инициалом/фамилией
//
// Порядок замен важен: апостроф → кавычки → тире → пробелы.

const NBSP = "\u00A0";   // non-breaking space
const NNBSP = "\u202F";  // narrow no-break space
const MDASH = "\u2014";
const NDASH = "\u2013";
const HELLIP = "\u2026";
const MODIFIER_APOSTROPHE = "\u02BC";

// Короткие предлоги, после которых нужен NBSP. Собраны UA+RU, регистр учитывается — только нижний.
const UA_PREPS = ["в", "у", "на", "до", "з", "і", "та", "й", "як", "по", "за", "під", "над", "біля", "для", "від"];
const RU_PREPS = ["в", "у", "на", "до", "с", "и", "к", "у", "от", "из", "за", "под", "над", "для", "при", "по"];
const EN_PREPS = ["a", "an", "the", "of", "in", "on", "at", "to", "for", "and", "or"];

export type TypoLang = "uk" | "ru" | "en";

function prepRegex(preps: string[]): RegExp {
  // \b<prep> <word> → <prep>NBSP<word> (только перед кириллицей для UA/RU, перед буквой для EN)
  const alt = preps.join("|");
  return new RegExp(`\\b(${alt})\\s+(?=[\\p{L}])`, "giu");
}

const UA_PREP_RE = prepRegex(UA_PREPS);
const RU_PREP_RE = prepRegex(RU_PREPS);
const EN_PREP_RE = prepRegex(EN_PREPS);

// Апостроф: между кириллическими буквами (UA: під'їзд, п'ять) — прямой ' → U+02BC
const APOSTROPHE_CYR = /([\p{Script=Cyrillic}])['\u2019]([\p{Script=Cyrillic}])/gu;

// Number range: 1990-2020 → 1990–2020 (en-dash, без пробелов)
const NUM_RANGE = /(\d)\s*-\s*(\d)/g;

// Инициалы: Т. Г. Шевченко → Т.NBSPГ.NBSPШевченко
const INITIAL_SURNAME = /([\p{Lu}])\.\s+([\p{Lu}])\./gu;
const INITIAL_SINGLE = /([\p{Lu}])\.\s+(?=[\p{Lu}][\p{Ll}]+)/gu;

// Число + единица/слово: 10 кг, 2026 року, 15 років
const NUMBER_WORD = /(\d)\s+([\p{L}°])/gu;

function applyQuotes(text: string, lang: TypoLang): string {
  if (lang === "en") {
    // Простая замена "..." → English curly quotes. Если парность сложная — не усложняем.
    let out = text;
    out = out.replace(/"([^"]*)"/g, "\u201C$1\u201D");
    out = out.replace(/'([^']*)'/g, "\u2018$1\u2019");
    return out;
  }
  // UA/RU — «ёлочки» наружные, „лапки" внутренние
  // Простая стратегия: заменяем парные "..." на «...». Вложенные — на „..."
  let out = text;
  // Внешние кавычки
  out = out.replace(/"([^"]*)"/g, (_m, inner) => {
    // Внутри ищем парные '...' или "..." — заменяем на „..."
    const withInner = inner
      .replace(/"([^"]*)"/g, "\u201E$1\u201C")
      .replace(/'([^']*)'/g, "\u201E$1\u201C");
    return `\u00AB${withInner}\u00BB`;
  });
  return out;
}

function applyDashes(text: string): string {
  let out = text;
  // Нормализация --- и -- → em-dash
  out = out.replace(/---/g, MDASH);
  out = out.replace(/(?<=\s)--(?=\s)/g, MDASH);
  // En-dash в числовых диапазонах
  out = out.replace(NUM_RANGE, `$1${NDASH}$2`);
  // " - " → " — " (em-dash с окружением будет обработано ниже nnbsp'ом)
  out = out.replace(/\s-\s/g, ` ${MDASH} `);
  // Узкий nbsp вокруг em-dash (визуально приятнее обычного nbsp)
  out = out.replace(/\s\u2014\s/g, `${NNBSP}${MDASH}${NNBSP}`);
  return out;
}

function applyEllipsis(text: string): string {
  return text.replace(/\.{3,}/g, HELLIP);
}

function applyApostrophe(text: string, lang: TypoLang): string {
  if (lang === "en") return text;
  return text.replace(APOSTROPHE_CYR, `$1${MODIFIER_APOSTROPHE}$2`);
}

function applyNbsp(text: string, lang: TypoLang): string {
  let out = text;
  const prepRe = lang === "uk" ? UA_PREP_RE : lang === "ru" ? RU_PREP_RE : EN_PREP_RE;
  out = out.replace(prepRe, (_m, prep) => `${prep}${NBSP}`);
  out = out.replace(INITIAL_SURNAME, `$1.${NBSP}$2.`);
  out = out.replace(INITIAL_SINGLE, `$1.${NBSP}`);
  out = out.replace(NUMBER_WORD, `$1${NBSP}$2`);
  return out;
}

/**
 * Smart typography для UA/RU/EN строк.
 * Порядок: ellipsis → apostrophe → quotes → dashes → nbsp.
 * Безопасен для повторного вызова — идемпотентен.
 */
export function typo(text: string, lang: TypoLang = "uk"): string {
  if (!text) return text;
  let out = text;
  out = applyEllipsis(out);
  out = applyApostrophe(out, lang);
  out = applyQuotes(out, lang);
  out = applyDashes(out);
  out = applyNbsp(out, lang);
  return out;
}
