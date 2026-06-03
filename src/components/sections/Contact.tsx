import { Check, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";

import { contact } from "@/data/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { useContactForm } from "@/hooks/useContactForm";

const channels = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Telefone", value: contact.phone, href: `tel:${contact.phoneHref}` },
  {
    icon: MapPin,
    label: "Atelier",
    value: `${contact.address.line1} · ${contact.address.line2}`,
    href: undefined,
  },
] as const;

export function Contact() {
  const { values, status, errors, onChange, onSubmit } = useContactForm();

  return (
    <section id={contact.id} className="relative py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 -z-10 size-[34rem] rounded-full bg-secondary/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <div>
            <SectionHeading eyebrow={contact.eyebrow} title={contact.title} lead={contact.lead} />

            <ul className="mt-10 flex flex-col gap-2">
              {channels.map(({ icon: Icon, label, value, href }, i) => {
                const inner = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/row:bg-primary/15">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="eyebrow text-muted-foreground">{label}</span>
                      <span className="text-base font-medium text-foreground">{value}</span>
                    </span>
                  </>
                );
                return (
                  <Reveal as="li" key={label} delay={i * 80}>
                    {href ? (
                      <a href={href} className="group/row flex items-center gap-4 rounded-2xl py-2 transition-colors hover:text-foreground">
                        {inner}
                      </a>
                    ) : (
                      <div className="group/row flex items-center gap-4 py-2">{inner}</div>
                    )}
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={240}>
              <iframe
                title="Localização — Grão de Solo"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`}
                loading="lazy"
                className="mt-6 h-56 w-full rounded-2xl border border-border grayscale-[0.2]"
              />
            </Reveal>
          </div>

          {/* Formulário */}
          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" value={values.name} onChange={onChange} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="O seu nome" />
                {errors.name && <span id="name-error" role="alert" className="text-sm text-destructive">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={values.email} onChange={onChange} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder="o.seu@email.pt" />
                {errors.email && <span id="email-error" role="alert" className="text-sm text-destructive">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Telefone <span className="font-normal text-muted-foreground/70">(opcional)</span></Label>
                <Input id="phone" name="phone" type="tel" value={values.phone ?? ""} onChange={onChange} autoComplete="tel" placeholder="9XX XXX XXX" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" name="message" value={values.message} onChange={onChange} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Fale-nos do seu espaço e da sua visão…" rows={5} />
                {errors.message && <span id="message-error" role="alert" className="text-sm text-destructive">{errors.message}</span>}
              </div>

              {/* Honeypot anti-bot */}
              <input name="company" value={values.company ?? ""} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" data-lpignore="true" data-1p-ignore className="sr-only" />

              <button
                type="submit"
                disabled={status === "loading"}
                className="group/cta inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 outline-none hover:-translate-y-0.5 hover:bg-moss focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    A enviar…
                  </>
                ) : (
                  <>
                    Enviar mensagem
                    <Send className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                  </>
                )}
              </button>

              {status === "sent" && (
                <p role="status" className="flex items-center gap-2 text-sm text-primary">
                  <Check className="size-4" />
                  Mensagem enviada. Entraremos em contacto em breve.
                </p>
              )}
              {status === "mailto" && (
                <p role="status" className="text-sm text-muted-foreground">
                  Abrimos o seu email — confirme o envio para concluir.
                </p>
              )}
              {status === "error" && (
                <p role="status" className="text-sm text-destructive">
                  Algo correu mal. Tente novamente ou contacte-nos diretamente.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
