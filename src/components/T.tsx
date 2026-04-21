import { typo, type TypoLang } from "@/lib/typo";

interface Props {
  lang?: TypoLang;
  children: string;
}

/**
 * Обёртка для smart typography. Применяется к новым строкам (не к существующим
 * i18n-словарям — они уже вручную вычитаны).
 *
 *   <h1><T>Захистимо ваші права — професійно і надійно</T></h1>
 *
 * Для блога/MDX — использовать typo() напрямую при pre-процессинге.
 */
export default function T({ lang = "uk", children }: Props) {
  return <>{typo(children, lang)}</>;
}
