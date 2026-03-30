import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NOIR   = ['N', 'O', 'I', 'R'];
const MOTION = ['M', 'O', 'T', 'I', 'O', 'N'];

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // ── Master entrance timeline ─────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Badge slides down
      tl.from('.hero-badge', {
        autoAlpha: 0,
        y: -14,
        duration: 0.8,
        ease: 'power2.out',
      })
        // "NOIR" chars rise from clip wrappers
        .from('.hero-char-line1 .hero-char', {
          y: '105%',
          duration: 1.2,
          stagger: 0.045,
          ease: 'expo.out',
        }, '-=0.3')
        // "MOTION" overlaps
        .from('.hero-char-line2 .hero-char', {
          y: '105%',
          duration: 1.2,
          stagger: 0.04,
          ease: 'expo.out',
        }, '-=0.9')
        // Meta row
        .from('.hero-meta', {
          autoAlpha: 0,
          y: 20,
          duration: 1.0,
          ease: 'power2.inOut',
        }, '-=0.6')
        // CTA buttons stagger
        .from('.hero-cta-item', {
          autoAlpha: 0,
          y: 18,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        }, '-=0.7')
        // Scroll indicator
        .from('.hero-scroll-indicator', {
          autoAlpha: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        }, '-=0.5');

      // Scroll line draws
      gsap.from('.hero-scroll-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.4,
        delay: 2.2,
        ease: 'expo.out',
      });
    }, el);

    // ── Scroll parallax (waits for Lenis → scrollerProxy active) ──
    let scrollCtx: gsap.Context;

    const initParallax = () => {
      scrollCtx = gsap.context(() => {
        // Title lines drift upward — cinematic peel-away
        gsap.to(['.hero-char-line1', '.hero-char-line2'], {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: '55vh top',
            scrub: 1.8,
          },
        });

        // Badge, meta, CTAs fade+lift
        gsap.to(['.hero-badge', '.hero-meta', '.hero-cta'], {
          opacity: 0,
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: '25vh top',
            scrub: 1.2,
          },
        });

        // Scroll indicator vanishes first
        gsap.to('.hero-scroll-indicator', {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: '12vh top',
            scrub: 1,
          },
        });
      }, el);
    };

    if ((window as any).__lenis) {
      initParallax();
    } else {
      window.addEventListener('lenis:ready', initParallax, { once: true });
    }

    return () => {
      ctx.revert();
      scrollCtx?.revert();
      window.removeEventListener('lenis:ready', initParallax);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative z-10 w-full h-full flex flex-col justify-between pt-32 pb-[10vh] px-8 md:px-14"
    >
      {/* ── Eyebrow badge ──────────────────────────────────── */}
      <div className="hero-badge flex items-center gap-3 w-fit">
        <div className="flex items-center gap-2.5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/50" />
          </span>
          <span className="text-[0.56rem] tracking-[0.3em] uppercase text-white/35 font-medium">
            Est. 2016 · Dark Cinematic Studio
          </span>
        </div>
      </div>

      {/* ── Main title ─────────────────────────────────────── */}
      <div className="flex flex-col pointer-events-none">
        {/* Line 1 — NOIR */}
        <div className="hero-char-line1 flex" aria-label="NOIR">
          {NOIR.map((char, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ lineHeight: '0.84', paddingBottom: '0.06em' }}
            >
              <span
                className="hero-char inline-block text-[clamp(5.5rem,17vw,20rem)] font-black tracking-[-0.04em] text-white"
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        {/* Line 2 — MOTION */}
        <div className="hero-char-line2 flex justify-end" aria-label="MOTION">
          {MOTION.map((char, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ lineHeight: '0.84', paddingBottom: '0.06em' }}
            >
              <span
                className="hero-char inline-block text-[clamp(5.5rem,17vw,20rem)] font-black tracking-[-0.04em] text-white"
                style={{
                  // Last 3 chars get outlined treatment — cinematic contrast
                  ...(i >= 3 ? { WebkitTextStroke: '1.5px rgba(255,255,255,0.4)', color: 'transparent' } : {}),
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom row ─────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        {/* Meta */}
        <div className="hero-meta">
          <p className="text-white/20 text-[0.65rem] tracking-[0.28em] uppercase leading-[2] max-w-[220px]">
            Cinematic design<br />Digital experiences<br />Studio · Est. 2016
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-cta flex items-center gap-4 flex-wrap">
          <a
            href="#work"
            className="hero-cta-item inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black text-[0.65rem] tracking-[0.18em] uppercase font-bold hover:bg-white/90 transition-colors duration-300 pointer-events-auto"
            data-cursor-hover
          >
            View Work
            <span>→</span>
          </a>
          <a
            href="#contact"
            className="hero-cta-item inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 text-white/40 text-[0.65rem] tracking-[0.18em] uppercase hover:border-white/30 hover:text-white/70 transition-all duration-400 pointer-events-auto"
            data-cursor-hover
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────── */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-white/15 text-[0.52rem] tracking-[0.3em] uppercase">Scroll</span>
        <div className="hero-scroll-line w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
}
