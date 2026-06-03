import { Mail, MapPin, Phone, Sprout } from "lucide-react";

import { brand, contact, nav } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Footer — faixa escura final que aterra o site.
 * Verde-noite (bg-foreground) com texto em paper, acentos sage.
 * Repete o vocabulário da Navbar (wordmark) e mantém os hairlines de marca.
 */
export function Footer() {
  const year = new Date();

  return (
    <footer className="bg-foreground text-paper/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Coluna marca */}
          <Reveal className="flex flex-col gap-4">
            <span className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-paper/10 text-sage">
                <Sprout className="size-5" />
              </span>
              <span className="font-heading text-2xl text-paper">{brand.name}</span>
            </span>
            <span className="eyebrow text-sage">{brand.discipline}</span>
            <p className="font-heading max-w-xs text-lg text-paper/75 italic">{brand.closing}</p>
          </Reveal>

          {/* Coluna navegação */}
          <Reveal delay={80} className="flex flex-col">
            <h3 className="eyebrow mb-4 text-paper/70">Navegação</h3>
            <nav className="flex flex-col gap-2.5">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit text-paper/80 transition-colors hover:text-sage"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </Reveal>

          {/* Coluna contacto */}
          <Reveal delay={160} className="flex flex-col">
            <h3 className="eyebrow mb-4 text-paper/70">Contacto</h3>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${contact.email}`}
                className="flex w-fit items-center gap-2.5 text-paper/80 transition-colors hover:text-sage"
              >
                <Mail className="size-4 shrink-0 text-sage" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phoneHref}`}
                className="flex w-fit items-center gap-2.5 text-paper/80 transition-colors hover:text-sage"
              >
                <Phone className="size-4 shrink-0 text-sage" />
                {contact.phone}
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(contact.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-start gap-2.5 text-paper/80 transition-colors hover:text-sage"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-sage" />
                <span>
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Barra inferior */}
        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-sm text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {year.getFullYear()} {brand.name} &middot; {brand.discipline}
          </span>
          <span>Maia &middot; Portugal</span>
        </div>
      </div>
    </footer>
  );
}
