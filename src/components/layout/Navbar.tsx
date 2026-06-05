import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { brand, nav } from "@/data/site";
import { Cta } from "@/components/shared/Cta";

function Wordmark({ light, onClick }: { light: boolean; onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={brand.name}
      className={cn(
        "font-heading text-[1.65rem] leading-none font-medium tracking-[-0.01em] transition-colors",
        light ? "text-paper" : "text-foreground",
      )}
    >
      Grão <span className="italic font-normal">de Solo</span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Texto claro enquanto a navbar está transparente sobre o hero escuro.
  const light = !scrolled && !open;

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
        <Wordmark light={light} onClick={() => setOpen(false)} />

        <div className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full",
                light ? "text-paper/85 hover:text-paper" : "text-foreground/80 hover:text-foreground",
              )}
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
            className={cn(
              "flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              light ? "text-paper hover:bg-paper/10" : "text-foreground hover:bg-foreground/[0.06]",
            )}
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
