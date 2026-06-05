import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Margem do root (px). Negativo no fundo dispara um pouco antes. */
  rootMargin?: string;
  /** Fração visível para disparar (0–1). */
  threshold?: number;
  /** Se true, dispara só uma vez e desliga o observer. */
  once?: boolean;
}

/**
 * Observa se um elemento entrou no viewport - base das animações de reveal.
 * Respeita `prefers-reduced-motion`: nesse caso considera sempre visível.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
