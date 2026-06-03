import { Quote } from "lucide-react";

import { philosophy, brand } from "@/data/site";
import { images } from "@/data/assets";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Secção Filosofia (id="visao") — faixa full-bleed escura de respiração.
 * Citação editorial centrada sobre o jardim zen de Kyoto, em tons inversos
 * (text-paper sobre bg-foreground). Muito vazio "ma", ritmo lento.
 */
export function Philosophy() {
  return (
    <section
      id="visao"
      className="relative isolate overflow-hidden bg-foreground py-24 text-paper md:py-32"
    >
      {/* Fundo: jardim zen muito esbatido + overlay para contraste do texto */}
      <img
        src={images.zenKyoto.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover opacity-[0.16]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-foreground/50" />

      {/* Halos subtis — mesma linguagem do Hero, agora em tom sage/musgo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-sage/10 blur-3xl"
      />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <Quote aria-hidden className="mx-auto size-10 text-sage" />
        </Reveal>

        <Reveal as="span" delay={80} className="eyebrow mt-8 flex items-center justify-center gap-3 text-sage">
          <span aria-hidden className="h-px w-8 bg-sage/50" />
          {philosophy.eyebrow}
          <span aria-hidden className="h-px w-8 bg-sage/50" />
        </Reveal>

        <Reveal delay={160}>
          <blockquote className="mt-7 font-heading text-3xl leading-tight text-balance text-paper italic md:text-4xl lg:text-5xl">
            {philosophy.quote}
          </blockquote>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-9 max-w-2xl leading-relaxed text-pretty text-paper/70">
            {philosophy.body}
          </p>
        </Reveal>

        {/* Hairline + remate da marca */}
        <Reveal delay={320} className="flex justify-center">
          <span aria-hidden className="mt-12 h-px w-12 bg-sage/40" />
        </Reveal>

        <Reveal delay={360}>
          <p className="mt-7 font-heading text-xl text-sage italic md:text-2xl">
            {brand.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
