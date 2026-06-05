import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { submitContact } from "@/services/contact";
import type { ContactInput } from "@/services/contact";

type Status = "idle" | "loading" | "sent" | "mailto" | "error";
type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY: ContactInput = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

/**
 * Lógica do formulário de contacto - separada da UI.
 * Faz validação local mínima, delega a entrega a `submitContact`
 * (Supabase edge function ou fallback mailto) e expõe o estado para o ecrã.
 */
export function useContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    // Limpar o feedback terminal assim que o utilizador volta a escrever.
    setStatus((prev) => (prev === "idle" || prev === "loading" ? prev : "idle"));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Diga-nos como o tratar.";
    if (!values.email.trim()) next.email = "Indique o seu email.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "Esse email não parece válido.";
    if (!values.message.trim()) next.message = "Conte-nos sobre o seu espaço.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("loading");
    const result = await submitContact(values);
    setStatus(result.status);
    if (result.status === "sent" || result.status === "mailto") {
      setValues(EMPTY);
    }
  }

  return { values, status, errors, onChange, onSubmit };
}
