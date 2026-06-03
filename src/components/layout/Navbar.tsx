import { useEffect, useState } from "react";
import { Menu, Sprout, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { brand, nav } from "@/data/site";
import { Cta } from "@/components/shared/Cta";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#top" onClick={onClick} className="group flex items-center gap-2.5" aria-label={brand.name}>
      <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        <Sprout className="size-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-medium text-foreground">{brand.name}</span>
        <span className="text-[0.6rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          {brand.discipline}
        </span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fechar o menu mobile ao alargar para desktop (evita estado preso + body bloqueado).
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Wordmark onClick={() => setOpen(false)} />

        <div className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Cta href="#contacto" variant="solid" withArrow className="hidden px-5 py-2.5 sm:inline-flex">
            Falar connosco
          </Cta>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06] lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Painel mobile */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "border-t border-border/60 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[80vh] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-6 sm:px-8">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 50 + 80}ms` : "0ms" }}
              className={cn(
                "font-heading text-2xl font-medium text-foreground/85 transition-all duration-500 hover:text-accent",
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
              )}
            >
              {item.label}
            </a>
          ))}
          <Cta href="#contacto" variant="solid" withArrow onClick={() => setOpen(false)} className="mt-5 w-fit">
            Falar connosco
          </Cta>
        </div>
      </div>
    </header>
  );
}
