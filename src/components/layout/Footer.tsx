import { brand, contact, nav } from "@/data/site";

/**
 * Footer - faixa baixa e compacta que aterra o site sem o sobrecarregar.
 * Verde-noite (bg-foreground), wordmark + navegação + contacto numa só linha.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-paper/70">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <span className="font-heading text-xl text-paper">
            Grão <span className="font-normal italic">de Solo</span>
          </span>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-sage">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-sage">
              {contact.email}
            </a>
            <span aria-hidden className="text-paper/25">·</span>
            <a href={`tel:${contact.phoneHref}`} className="transition-colors hover:text-sage">
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-1 border-t border-paper/15 pt-5 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {year} {brand.name} · {brand.discipline}</span>
          <span>{contact.address.line1} · {contact.address.line2}, Maia</span>
        </div>
      </div>
    </footer>
  );
}
