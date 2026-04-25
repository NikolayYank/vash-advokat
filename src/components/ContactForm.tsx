"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Lock, Clock, Check } from "lucide-react";
import { validateUaPhone } from "@/lib/phone-ua";
import { captureUtm, readUtm } from "@/lib/utm";
import type { Dict, Locale } from "@/lib/i18n";

const WEBHOOK_URL = "https://n8n-defo.space/webhook/advokat-contact";
const COOLDOWN_MS = 30_000;
const COOLDOWN_KEY = "va_form_last_submit";

type State = "idle" | "sending" | "success" | "error";

const THANK_YOU_PATH: Record<Locale, string> = {
  uk: "/thank-you/",
  ru: "/ru/thank-you/",
};

export default function ContactForm({
  dict,
  locale,
}: {
  dict: Dict["ctaFinal"];
  locale: Locale;
}) {
  const [state, setState] = useState<State>("idle");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    captureUtm();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phoneRaw = String(fd.get("phone") || "").trim();
    const honeypot = String(fd.get("company") || "").trim();

    setNameError(null);
    setPhoneError(null);

    let hasError = false;
    if (!name) {
      setNameError(dict.errorNameRequired);
      hasError = true;
    }
    const phoneCheck = validateUaPhone(phoneRaw);
    if (!phoneCheck.valid) {
      if (phoneCheck.reason === "empty") setPhoneError(dict.errorPhoneRequired);
      else if (phoneCheck.reason === "format") setPhoneError(dict.errorPhoneFormat);
      else setPhoneError(dict.errorPhoneOperator);
      hasError = true;
    }
    if (hasError) return;

    try {
      const last = Number(window.localStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        setState("success");
        return;
      }
    } catch {
      // localStorage недоступен — пропускаем
    }

    setState("sending");

    function redirectToThankYou() {
      try {
        window.location.assign(THANK_YOU_PATH[locale]);
      } catch {
        setState("success");
      }
    }

    const payload = {
      name,
      phone: phoneCheck.valid ? phoneCheck.e164 : phoneRaw,
      honeypot,
      page: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      timestamp: new Date().toISOString(),
      utm: readUtm(),
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      try {
        window.localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      } catch {
        // ignore
      }
      form.reset();
      redirectToThankYou();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="cta-success" role="status" aria-live="polite">
        <Check style={{ width: 32, height: 32 }} />
        <h3>{dict.successTitle}</h3>
        <p>{dict.successMessage}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="cta-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder={dict.nameInput}
            autoComplete="name"
            aria-invalid={nameError ? "true" : undefined}
            aria-describedby={nameError ? "name-error" : undefined}
          />
          {nameError && <span id="name-error" className="form-error">{nameError}</span>}
        </div>
        <div className="form-field">
          <input
            type="tel"
            name="phone"
            placeholder={dict.phoneInput}
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={phoneError ? "true" : undefined}
            aria-describedby={phoneError ? "phone-error" : undefined}
          />
          {phoneError && <span id="phone-error" className="form-error">{phoneError}</span>}
        </div>
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="form-honeypot"
      />

      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
        {state === "sending" ? dict.submitSending : dict.submit}
      </button>

      {state === "error" && (
        <div className="form-submit-error" role="alert">
          {dict.errorSubmit}
        </div>
      )}

      <div className="cta-form-note" style={{ flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Lock style={{ width: 14, height: 14 }} /> {dict.noteSecret}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Clock style={{ width: 14, height: 14 }} /> {dict.noteTime}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Check style={{ width: 14, height: 14 }} /> {dict.noteCommitment}
        </span>
      </div>
    </form>
  );
}
