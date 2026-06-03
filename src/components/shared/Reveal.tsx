import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em ms — escalona elementos de uma mesma secção. */
  delay?: number;
  /** Elemento HTML a renderizar (default: div). */
  as?: ElementType;
}

/**
 * Envolve conteúdo numa animação de entrada suave (fade + translate)
 * quando entra no viewport. Lenta e contida — vibe wabi-sabi.
 * Em prefers-reduced-motion o conteúdo aparece imediatamente (via useInView).
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[2px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
