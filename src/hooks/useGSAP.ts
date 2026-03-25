import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps a GSAP context around a scoped container ref.
 * All animations created inside `callback` are automatically
 * reverted when the component unmounts.
 *
 * @param callback  Animation setup — all gsap.to/from calls go here.
 * @param deps      Re-run deps (like useEffect). Pass [] to run once on mount.
 * @returns         A ref to attach to the container element used as scope.
 */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  deps: React.DependencyList = [],
) {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    const run = () => {
      ScrollTrigger.refresh();
      ctx = gsap.context(callback, scopeRef.current ?? document.body);
    };

    if ((window as any).__lenis) {
      run();
    } else {
      window.addEventListener('lenis:ready', run, { once: true });
    }

    return () => {
      window.removeEventListener('lenis:ready', run);
      ctx?.revert();
    };
    // Intentional: caller controls deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
