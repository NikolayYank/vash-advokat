// Українські мобільні оператори. Stationary excluded — цільова аудиторія на мобільних.
const UA_MOBILE_CODES = new Set([
  "039", "050", "063", "066", "067", "068", "073", "077", "089",
  "091", "092", "093", "094", "095", "096", "097", "098", "099",
]);

export type PhoneValidation =
  | { valid: true; e164: string; national: string }
  | { valid: false; reason: "empty" | "format" | "operator" };

export function validateUaPhone(raw: string): PhoneValidation {
  if (!raw || !raw.trim()) return { valid: false, reason: "empty" };

  const digits = raw.replace(/\D/g, "");
  let national: string;

  if (digits.length === 12 && digits.startsWith("380")) {
    national = "0" + digits.slice(3);
  } else if (digits.length === 11 && digits.startsWith("80")) {
    national = "0" + digits.slice(2);
  } else if (digits.length === 10 && digits.startsWith("0")) {
    national = digits;
  } else {
    return { valid: false, reason: "format" };
  }

  const code = national.slice(0, 3);
  if (!UA_MOBILE_CODES.has(code)) {
    return { valid: false, reason: "operator" };
  }

  return { valid: true, e164: "+38" + national, national };
}
