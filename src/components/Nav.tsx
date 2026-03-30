'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Full bar slides down + blurs in
      gsap.from(el, {
        autoAlpha: 0,
        y: -16,
        duration: 1.1,
        delay: 0.8,
        ease: 'power2.inOut',
        clearProps: 'transform',
      });

      // Logo + links + CTA stagger
      gsap.from('.nav-item', {
        autoAlpha: 0,
        y: -10,
        duration: 0.9,
        delay: 1.1,
        stagger: 0.07,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
      });
    }, el);

    // ── Scroll detection via Lenis (falls back to native) ──
    let cleanup: (() => void) | undefined;

    const initScrollDetection = () => {
      const lenis = (window as any).__lenis;
      const onScroll = ({ scroll }: { scroll: number }) => setScrolled(scroll > 50);
      lenis.on('scroll', onScroll);
      cleanup = () => lenis.off('scroll', onScroll);
    };

    if ((window as any).__lenis) {
      initScrollDetection();
    } else {
      window.addEventListener('lenis:ready', initScrollDetection, { once: true });
    }

    return () => {
      ctx.revert();
      cleanup?.();
      window.removeEventListener('lenis:ready', initScrollDetection);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-14 py-6 transition-all duration-700 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.05]'
          : ''
      }`}
    >
      {/* Logo */}
      <a
        href="/noir"
        className="nav-item text-white text-[0.68rem] tracking-[0.32em] uppercase font-bold"
      >
        NM
      </a>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-9">
        {[['#work', 'Work'], ['#approach', 'Process'], ['#pricing', 'Pricing'], ['#contact', 'Contact']].map(
          ([href, label]) => (
            <li key={label} className="nav-item">
              <a
                href={href}
                className="text-white/30 hover:text-white text-[0.62rem] tracking-[0.28em] uppercase transition-colors duration-400"
              >
                {label}
              </a>
            </li>
          ),
        )}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="nav-item hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/40 text-[0.6rem] tracking-[0.22em] uppercase hover:border-white/30 hover:text-white/70 transition-all duration-400"
        data-cursor-hover
      >
        Start a Project
      </a>
    </nav>
  );
}
