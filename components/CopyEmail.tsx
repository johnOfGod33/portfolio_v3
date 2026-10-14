"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyEmailProps = {
  email: string;
  /** Libellés traduits, calculés côté serveur. */
  copyLabel: string;
  copiedLabel: string;
  className?: string;
};

/** Copie l'adresse au clic ; le lien mailto reste disponible à côté. */
export function CopyEmail({
  email,
  copyLabel,
  copiedLabel,
  className,
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={className}
      aria-label={copied ? copiedLabel : copyLabel}
    >
      <span>{email}</span>
      {copied ? (
        <Check size={14} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy size={14} strokeWidth={1.75} aria-hidden="true" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
