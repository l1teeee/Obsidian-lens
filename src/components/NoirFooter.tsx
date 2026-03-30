import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: 'Work',     href: '#work' },
  { label: 'Studio',  href: '#studio' },
  { label: 'Process', href: '#approach' },
  { label: 'Reel',    href: '#reel' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { label: 'IG',  href: '#' },
  { label: 'TW',  href: '#' },
  { label: 'LI',  href: '#' },
  { label: 'DR',  href: '#' },
];

export default function NoirFooter() {
  const ref = useGSAP<HTMLElement>(() => {
    // ── Divider draws in ─────────────────────────────────────
    gsap.fromTo(
      '.footer-divider',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#footer',
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // ── Links row fades up ───────────────────────────────────
    gsap.from('.footer-link', {
      opacity: 0,
      y: 14,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Social links ─────────────────────────────────────────
    gsap.from('.footer-social', {
      opacity: 0,
      y: 10,
      duration: 0.7,
      stagger: 0.07,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Giant wordmark slides up ─────────────────────────────
    gsap.fromTo(
      '.footer-wordmark-inner',
      { y: '30%' },
      {
        y: '0%',
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.footer-wordmark',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // ── Subtle parallax on wordmark while scrolling ──────────
    gsap.to('.footer-wordmark-inner', {
      y: '-8%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // ── Copyright fades in ───────────────────────────────────
    gsap.from('.footer-copy', {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <footer id="footer" ref={ref} className="relative bg-black overflow-hidden pt-24">
      {/* Top divider */}
      <div className="footer-divider mx-8 md:mx-14 h-px bg-white/[0.07]" />

      {/* Nav + socials row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 px-8 md:px-14 py-14">
        {/* Page links */}
        <nav className="flex flex-wrap gap-8">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="footer-link text-[0.62rem] tracking-[0.28em] uppercase text-white/25 hover:text-white transition-colors duration-400"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-7">
          {SOCIALS.map(({ label }) => (
            <button
              key={label}
              type="button"
              className="footer-social text-[0.58rem] tracking-[0.22em] uppercase text-white/20 hover:text-white transition-colors duration-400 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="footer-wordmark overflow-hidden px-4 md:px-10">
        <div
          className="footer-wordmark-inner font-black tracking-[-0.06em] leading-[0.82] select-none"
          style={{
            fontSize: 'clamp(5.5rem, 17vw, 18rem)',
            WebkitTextStroke: '1px rgba(255,255,255,0.07)',
            color: 'transparent',
          }}
          aria-hidden
        >
          NOIR MOTION
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-8 md:px-14 pb-10 pt-10 border-t border-white/[0.05] mt-8">
        <p className="footer-copy text-[0.55rem] tracking-[0.22em] uppercase text-white/15">
          © 2024 Noir Motion Studio. All rights reserved.
        </p>
        <p className="footer-copy text-[0.55rem] tracking-[0.18em] uppercase text-white/10 font-mono">
          Crafted with GSAP · Three.js · Astro
        </p>
      </div>
    </footer>
  );
}
