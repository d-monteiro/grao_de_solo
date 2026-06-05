import { process } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * Secção Processo - timeline vertical zen (5 fases do conceito à execução).
 * Linha hairline contínua, nós na linha e números serif grandes em sage.
 * Mobile: número acima do texto. Desktop: número à esquerda, alinhado à linha.
 */
export function Process() {
  return (
    <section id={process.id} className="relative pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <span aria-hidden className="block h-px w-full bg-border" />
        <SectionHeading
          className="mt-14 md:mt-20"
          eyebrow={process.eyebrow}
          title={process.title}
          lead={process.lead}
        />

        <div className="relative mt-16 md:mt-20">
          {/* Linha vertical hairline - alinhada ao centro dos nós */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] hidden w-px bg-border md:left-[calc(5rem-0.5px)] md:block"
          />

          <ol className="space-y-12 md:space-y-16">
            {process.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 90}>
                <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 md:grid-cols-[5rem_1fr] md:gap-x-10">
                  {/* Coluna do número + nó na linha */}
                  <div className="relative col-start-1 flex items-start">
                    <span
                      aria-hidden
                      className="relative z-10 mt-3 hidden size-3.5 shrink-0 rounded-full bg-secondary ring-4 ring-background md:absolute md:top-3 md:left-[calc(5rem-7px)] md:block"
                    />
                    <span className="font-heading text-5xl leading-none text-secondary tabular-nums md:text-6xl">
                      {step.n}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="col-start-2 flex flex-col">
                    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs tracking-[0.18em] text-primary uppercase">
                      {step.tag}
                    </span>
                    <h3 className="font-heading mt-3 text-xl leading-snug font-medium text-foreground text-balance md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
