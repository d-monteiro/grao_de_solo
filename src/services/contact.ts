import { contact } from "@/data/site";
import { hasCredentials, supabase } from "@/lib/supabase";

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Honeypot anti-bot — tem de ficar sempre vazio. */
  company?: string;
}

export type ContactResult =
  | { status: "sent" }
  | { status: "mailto" }
  | { status: "error"; message: string };

/** Constrói um link mailto pré-preenchido como fallback de entrega. */
function buildMailto(data: ContactInput): string {
  const subject = `Novo contacto do site — ${data.name}`;
  const body = [
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Telefone: ${data.phone}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openMailto(data: ContactInput): void {
  window.location.href = buildMailto(data);
}

/**
 * Envia uma mensagem de contacto.
 * - Com Supabase ligado: chama a edge function `submit-contact` (grava + notifica).
 * - Sem backend, ou em falha: abre o cliente de email pré-preenchido (nunca perde o lead).
 */
export async function submitContact(data: ContactInput): Promise<ContactResult> {
  // Bot apanhado pelo honeypot — finge sucesso, não envia nada.
  if (data.company && data.company.trim() !== "") {
    return { status: "sent" };
  }

  if (!hasCredentials || !supabase) {
    openMailto(data);
    return { status: "mailto" };
  }

  try {
    const { error } = await supabase.functions.invoke("submit-contact", {
      body: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        message: data.message,
        company: data.company ?? "",
      },
    });
    if (error) throw error;
    return { status: "sent" };
  } catch {
    // Falha de rede/função → não perder o contacto.
    openMailto(data);
    return { status: "mailto" };
  }
}
